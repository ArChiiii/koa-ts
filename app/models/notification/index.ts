import { IsEnum } from 'class-validator'

export enum NotiType {
  create_car_post = 1,
  delete_car_post,
  update_car_post,
  like_car_post,
  send_message,
  sell_car_post,
}
export class Notification {
  @IsEnum(NotiType)
  entity_type_id: NotiType
  entity_id: string
  actor_id: string
}

export class NotificationData {
  heading: string
  title: string
  message: string
  img_key: string
  route_url: string
  entity_id: string
  created_at: string //second since spoch
}
