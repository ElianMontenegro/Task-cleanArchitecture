
export interface IHttpRequest {
    body?: any,
    accountId?: any,
    params?: any
}


export interface IHttpResponse{
    statusCode: number;
    body: any;
}