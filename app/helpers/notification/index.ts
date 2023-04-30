interface INotifierCollector {
  entity: Post
  fetchNotifier(): string[]
}

import { NotiType, Post } from 'app/models'
import { AxiosInstance } from 'axios'

export class NotifierCollectorFactory {
  public entity: Post

  FactoryObject = {
    like_car_post: () => new LikeCarPostNotifierCollector(this.entity),
  }

  constructor(entity) {
    this.entity = entity
  }

  public createNotifierCollector(entity_type_id: NotiType): INotifierCollector {
    return this.FactoryObject[entity_type_id]()
  }
}

class LikeCarPostNotifierCollector implements INotifierCollector {
  public entity: Post
  constructor(entity) {
    this.entity = entity
  }
  fetchNotifier(): string[] {
    return [this.entity.dealerID]
  }
}
