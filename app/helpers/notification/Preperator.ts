interface INotificationPreperator {
  entity: Post
  prepare(): NotificationData
}

import { NotiType, Post, NotificationData } from 'app/models'
import moment from 'moment'

export class NotificationPreperatorFactory {
  public entity: Post

  FactoryObject = {
    like_car_post: () => new LikeCarPostNotificationPreperator(this.entity),
    sell_car_post: () => new SellCarPostNotificationPreperator(this.entity),
  }

  constructor(entity) {
    this.entity = entity
  }

  public generate(entity_type_id: NotiType): INotificationPreperator {
    return this.FactoryObject[entity_type_id]()
  }
}

class LikeCarPostNotificationPreperator implements INotificationPreperator {
  public entity: Post
  constructor(entity) {
    this.entity = entity
  }
  prepare(): NotificationData {
    return {
      heading: 'Someone liked your post',
      title: this.entity.name,
      message: '',
      img_key: this.entity.imgs[0],
      entity_id: this.entity.post_id.toString(),

      route_url: '/tabs/search-car/car-post/' + this.entity.post_id,
      created_at: moment().unix().toString(),
    }
  }
}

class SellCarPostNotificationPreperator implements INotificationPreperator {
  public entity: Post
  constructor(entity) {
    this.entity = entity
  }
  prepare(): NotificationData {
    return {
      heading: 'Your saved car has been sold',
      title: this.entity.name,
      message: '',
      img_key: this.entity.imgs[0],
      entity_id: this.entity.post_id.toString(),
      route_url: '/tabs/search-car/car-post/' + this.entity.post_id,
      created_at: moment().unix().toString(),
    }
  }
}
