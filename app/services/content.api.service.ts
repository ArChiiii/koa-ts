import axios, { AxiosInstance } from 'axios'

import { Service } from 'typedi'

@Service()
export class ContentApiService {
  api: AxiosInstance

  createApi() {
    // Here we set the base URL for all requests made to the api
    this.api = axios.create({
      baseURL: process.env.CONTENT_URL,
    })

    // We set an interceptor for each request to
    // include Bearer token to the request if user is logged in
    this.api.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${process.env.CONTENT_API_KEY}`

      return config
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
