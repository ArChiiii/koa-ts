import axios, { AxiosInstance } from 'axios'

import { Service } from 'typedi'

@Service()
export class MainApiService {
  api: AxiosInstance

  createApi() {
    // Here we set the base URL for all requests made to the api
    this.api = axios.create({
      baseURL: process.env.MAIN_URL,
    })
    // this.api.interceptors.request.use(config => {
    //   config.headers = {
    //     ...config.headers,
    //   }

    //   return config
    // })

    return this.api
  }

  useApi() {
    if (!this.api) {
      this.createApi()
    }
    return this.api
  }
}
