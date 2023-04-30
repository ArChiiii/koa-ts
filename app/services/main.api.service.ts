import axios, { AxiosInstance } from 'axios'

import { Service } from 'typedi'

@Service()
export default class MainApiService {
  api: AxiosInstance

  createApi() {
    // Here we set the base URL for all requests made to the api
    this.api = axios.create({
      baseURL: process.env.MAIN_URL,
    })
    return this.api
  }

  useApi() {
    if (!this.api) {
      this.createApi()
    }
    return this.api
  }
}
