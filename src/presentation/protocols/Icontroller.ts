import { IHttpResponse } from './'

export interface Controller<T = any> {
    handle: (httpRequest: T) => Promise<IHttpResponse>
}