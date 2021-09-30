import { IHttpResponse, IHttpRequest } from './'

export interface Middleware {
    handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}