interface INotifierCollector {
  entity_id: string
  fetchNotifier(): Promise<string[]>
}

import { NotiType } from 'app/models'
import { AxiosInstance } from 'axios'

export class NotifierCollectorFactory {
  public api_service: AxiosInstance
  public entity_id: string
  constructor(entity_id, api_service) {
    this.entity_id = entity_id
    this.api_service = api_service
  }

  public createNotifierCollector(entity_type_id: NotiType): INotifierCollector {
    switch (entity_type_id) {
      case NotiType.like_car_post:
        return new LikeCarPostNotifierCollector(this.entity_id, this.api_service)
        break
    }
  }
}

class LikeCarPostNotifierCollector implements INotifierCollector {
  public entity_id: string
  public api_service: AxiosInstance
  constructor(entity_id, api_service) {
    this.entity_id = entity_id
    this.api_service = api_service
  }
  async fetchNotifier(): Promise<string[]> {
    const { data } = await this.api_service.get('/car-post/' + this.entity_id)
    return [data.dealerID]
  }
}
