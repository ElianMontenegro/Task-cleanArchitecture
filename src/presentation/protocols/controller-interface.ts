import { IHttpRequest, IHttpResponse } from './http-interface'

export interface Controller {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}