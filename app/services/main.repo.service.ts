import axios, { AxiosInstance } from 'axios'

import { Service } from 'typedi'
import MainApiService from './main.api.service'
@Service()
export class MainRepoService {
  constructor(private mainApiService: MainApiService) {}

  async fetchPost(post_id) {
    const result = await this.mainApiService.useApi().get('/car-post/' + post_id)
    const { data } = result
    if (data.success) {
      return data.data
    }
  }
}
