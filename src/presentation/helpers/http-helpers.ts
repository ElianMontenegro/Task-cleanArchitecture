import { IHttpResponse } from '../protocols'
import { ServerError, UnauthorizedError, MissingParamError } from '../errors'

export const badRequest = (param: string): IHttpResponse => ({
  statusCode: 400,
  body: new MissingParamError(param).message
})

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error
})

export const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack!)
})

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null
})