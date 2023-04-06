import { Inject, Service } from 'typedi'
import prisma from 'app/helpers/client'
import { Prisma } from '@prisma/client'
import 'reflect-metadata'

import { ContentApiService } from './content.api.service'
import { MainApiService } from './main.api.service'
import { NotiType, Notification } from 'app/models'
import moment from 'moment'
import { NotifierCollectorFactory } from 'app/helpers/notification'

@Service()
export class NotificationsService {
  constructor(
    private contentApiService: ContentApiService,
    private mainApiService: MainApiService,
  ) {}
  async create(body: Notification) {
    //create notification object
    const noti_obj_id = await this.create_notification_object(body)

    //create notification change (store actor)
    await this.create_notification_change(noti_obj_id, body.actor_id)

    //get notifier id list (who to notify)
    const fac = new NotifierCollectorFactory(body.entity_id, this.mainApiService)
    const notiCollector = fac.createNotifierCollector(body.entity_type_id)
    const notifiers = await notiCollector.fetchNotifier()
    //create notification (notifying who) (for each notiflier )
    const p = notifiers.map(async notifier_id => {
      try {
        const noti_id = await this.create_notification(noti_obj_id, notifier_id)
        //send notification
        // await sendnotification(notifier_id, template)
        //update notification status
        await this.update_notification(noti_id)
      } catch (err) {
        console.log(err)
      }
    })

    await Promise.all(p)
  }

  async create_notification_object(body: Notification) {
    const { data } = await this.contentApiService.useApi().post('/notification-objects', {
      entity_type: NotiType[body.entity_type_id],
      entity_id: body.entity_id,
      status: true,
    })

    return data.id
  }

  async create_notification_change(obj_id, actor_id) {
    const result = await this.contentApiService.useApi().post('/notification-changes', {
      notification_object: obj_id,
      actor_id: actor_id,
    })

    console.log('result', result)

    return result
  }

  async create_notification(obj_id, notifier_id) {
    const { data } = await this.contentApiService.useApi().post('/notification', {
      notification_object: obj_id,
      notifier_id: notifier_id,
      status: false,
    })

    return data.id
  }

  async update_notification(noti_id) {
    const { data } = await this.contentApiService
      .useApi()
      .put('/notification/' + noti_id, {
        status: true,
      })

    return data.id
  }
}
