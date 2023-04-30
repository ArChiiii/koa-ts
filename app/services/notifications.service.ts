import { Inject, Service } from 'typedi'
import prisma from 'app/helpers/client'
import { Prisma } from '@prisma/client'
import 'reflect-metadata'

import ContentApiService from './content.api.service'
import FcmService from './fcm.service'
import { NotiType, Notification, Post } from 'app/models'
import moment from 'moment'
import { NotifierCollectorFactory } from 'app/helpers/notification'
import FirestoreService from './firestore.service'
import MainRepoService from './main.repo.service'
import { plainToInstance } from 'class-transformer'
@Service()
export class NotificationsService {
  constructor(
    private contentApiService: ContentApiService,
    private mainRepoService: MainRepoService,
    private storeService: FirestoreService,
    private fcmService: FcmService,
  ) {}
  async create(body: Notification) {
    //create notification
    console.log(body)
    const noti_obj_id = await this.create_notification_object(body)

    //create notification change (store actor)
    await this.create_notification_change(noti_obj_id, body.actor_id)

    //fetch the post
    const result = await this.mainRepoService.fetchPost(body.entity_id)
    const post = plainToInstance(Post, result)
    console.log(post)

    //get notifier id list (who to notify)
    const fac = new NotifierCollectorFactory(post)
    const notiCollector = fac.createNotifierCollector(body.entity_type_id)
    const notifiers = await notiCollector.fetchNotifier()
    console.log(notifiers)

    //create notification (notifying who) (for each notiflier )
    const p = notifiers.map(async notifier_id => {
      try {
        const noti_id = await this.create_notification(noti_obj_id, notifier_id)
        const fcm_token = await this.storeService.getFcmToken(notifier_id)
        //send notification
        await this.fcmService.sendNotification(
          fcm_token,
          'Someone liked your post',
          post.name,
          'Go to have a look right now',
          '/tabs/search-car/car-post/' + post.post_id,
          post.imgs[0],
        )

        //update notification status
        await this.update_notification(noti_id)
      } catch (err) {
        console.log(err)
      }
    })

    await Promise.all(p)
  }

  async create_notification_object(body: Notification) {
    try {
      const result = await this.contentApiService.useApi().post('/notification-objects', {
        data: {
          entity_type: NotiType[body.entity_type_id],
          entity_id: `${body.entity_id}`,
          status: true,
        },
      })
      const { data } = result
      return data.data.id
    } catch (err) {
      console.log(err)
    }
  }

  async create_notification_change(obj_id, actor_id) {
    const result = await this.contentApiService.useApi().post('/notification-changes', {
      data: {
        notification_object: obj_id,
        actor_id: actor_id,
      },
    })

    return result
  }

  async create_notification(obj_id, notifier_id) {
    const { data } = await this.contentApiService.useApi().post('/notifications', {
      data: {
        notification_object: obj_id,
        notifier_id: notifier_id,
        status: false,
      },
    })

    return data.data.id
  }

  async update_notification(noti_id) {
    const { data } = await this.contentApiService
      .useApi()
      .put('/notifications/' + noti_id, {
        data: {
          status: true,
        },
      })

    return data.id
  }
}
