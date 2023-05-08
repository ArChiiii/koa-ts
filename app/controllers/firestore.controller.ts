import {
  BadRequestError,
  Post,
  JsonController,
  BodyParam,
  Get,
  Body,
  Param,
} from 'routing-controllers'
import { FirestoreService } from '../services'
import { Service } from 'typedi'

@JsonController()
@Service()
export class firestoresController {
  constructor(private firestoresService: FirestoreService) {}

  @Get('/firestore/fetch_user/:post_id')
  async query(@Param('post_id') post_id: string) {
    return this.firestoresService.fetchUserbyPostID(post_id)
  }
}
