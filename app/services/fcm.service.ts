import { NotificationData } from 'app/models/notification'
import type { messaging } from 'firebase-admin'
import * as admin from 'firebase-admin'
import moment from 'moment'
import { Service } from 'typedi'

@Service()
export default class FcmService {
  messaging: messaging.Messaging

  constructor() {
    this.messaging = admin.messaging()
  }

  async sendNotification(
    token: string,
    heading: string,
    title: string,
    message: string,
    img_url: string,
    route_url: string,
  ) {
    const notiData: NotificationData = {
      heading,
      title,
      message,
      img_url,
      route_url,
      created_at: moment().unix().toString(),
    }

    const data_message: messaging.Message = {
      data: { ...notiData },
      token,
    }

    const noti_message: messaging.Message = {
      notification: {
        title: heading,
        body: title,
      },
      token,
    }

    try {
      await this.messaging.send(data_message)
      await this.messaging.send(noti_message)
    } catch (err) {
      console.log(err)
    }
  }
}
