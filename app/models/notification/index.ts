import { IsEnum } from 'class-validator'

export enum NotiType {
  create_car_post = 1,
  delete_car_post,
  update_car_post,
  like_car_post,
  send_message,
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
  img_url: string
  route_url: string
  created_at: string //second since spoch
}
