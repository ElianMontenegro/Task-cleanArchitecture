import { Middleware } from "../../presentation/protocols";
import { NextFunction, Request, Response } from "express";


export const adapterMiddleware = (middleware : Middleware) => {
    return async (req : Request, res : Response, next : NextFunction ) => {
        const httpRequest = {
            accessToken : req.headers["authorization"]
        }
        const httpResponse = await middleware.handle(httpRequest)
        if(httpResponse.statusCode = 200){
            // Object.assign(req, httpResponse.body)
            req.accountId = httpResponse.body
            next()
        }
        res.status(httpResponse.statusCode).json({
            error: httpResponse.body.message
        })
    }
}
