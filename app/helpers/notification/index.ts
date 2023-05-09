interface INotifierCollector {
  entity: Post
  fetchNotifier(notiService: NotificationsService): string[]
}

import { NotificationsService } from 'app/services/notifications.service'
import { NotiType, Post } from 'app/models'

export { NotificationPreperatorFactory } from './Preperator'

export class NotifierCollectorFactory {
  public entity: Post

  FactoryObject = {
    like_car_post: () => new LikeCarPostNotifierCollector(this.entity),
    sell_car_post: () => new SellCarPostNotifierCollector(this.entity),
  }

  constructor(entity) {
    this.entity = entity
  }

  public generate(entity_type_id: NotiType): INotifierCollector {
    return this.FactoryObject[entity_type_id]()
  }
}

class LikeCarPostNotifierCollector implements INotifierCollector {
  public entity: Post
  constructor(entity) {
    this.entity = entity
  }
  fetchNotifier(notiService): string[] {
    return [this.entity.dealerID]
  }
}

class SellCarPostNotifierCollector implements INotifierCollector {
  public entity: Post
  constructor(entity) {
    this.entity = entity
  }
  fetchNotifier(notiService): string[] {
    const notifiers = notiService.storeService.fetchUserbyPostID(this.entity.post_id)
    return notifiers
  }
}
