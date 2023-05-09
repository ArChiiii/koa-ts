import { NotificationData } from 'app/models/notification'
import type { messaging } from 'firebase-admin'
import * as admin from 'firebase-admin'
import { Service } from 'typedi'

@Service()
export default class FcmService {
  messaging: messaging.Messaging

  constructor() {
    this.messaging = admin.messaging()
  }

  async sendNotification(token: string, notiData: NotificationData) {
    const { heading, title } = notiData

    const data_message: messaging.Message = {
      token,
    }

    const noti_message: messaging.Message = {
      // notification: {
      //   title: heading,
      //   body: title,
      // },
      data: { ...notiData },

      token,
    }

    try {
      // await this.messaging.send(data_message)
      await this.messaging.send(noti_message)
    } catch (err) {
      console.log(err)
    }
  }
}
