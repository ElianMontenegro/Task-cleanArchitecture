import { IHttpResponse, IHttpRequest } from './'

export interface Middleware<T = any> {
    handle: (httpRequest: T) => Promise<IHttpResponse>
}