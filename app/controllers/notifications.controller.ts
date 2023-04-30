import {
  BadRequestError,
  Post,
  JsonController,
  BodyParam,
  Get,
  Body,
} from 'routing-controllers'
import { NotificationsService } from '../services'
import { Service } from 'typedi'
import { Notification } from 'app/models'

@JsonController()
@Service()
export class notificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get('/notifications')
  async query() {
    return []
  }

  @Post('/notification')
  async create(@Body() body: Notification) {
    // if (!name) {
    //   throw new BadRequestError('username is required')
    // }
    return await this.notificationsService.create(body)
  }
}
