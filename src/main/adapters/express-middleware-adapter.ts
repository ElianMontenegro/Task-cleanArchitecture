import { Middleware } from "../../presentation/protocols";
import { NextFunction, Request, Response } from "express";
import { getToken } from '../../presentation/helpers'

export const adapterMiddleware = (middleware : Middleware) => {
    return async (req : Request, res : Response, next : NextFunction ) => {
        const httpRequest = {
            accessToken : getToken(req)
        }
        const httpResponse = await middleware.handle(httpRequest)
        if(httpResponse.statusCode == 200){
            Object.assign(req, httpResponse.body)
            return next()
        }
        res.status(httpResponse.statusCode).json({
            error: httpResponse.body.message
        })
    }
}
