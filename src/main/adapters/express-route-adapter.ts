import { IController, IHttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const AdaptRoute = (controller : IController) => {
    return async (req: Request, res: Response) => {
        const httpRequest : IHttpRequest = {
            body : req.body,
            accountId : req.accountId
        }
        const httpResponse = await controller.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}
