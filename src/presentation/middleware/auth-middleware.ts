import { AccessDeniedError } from "../errors"
import { forbidden, serverError } from "../helpers"
import { IHttpRequest, IHttpResponse, Middleware } from "../protocols"



export class AuthMiddleware implements Middleware{
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{

        try {
            const { accessToken } = httpRequest.body
            if(!accessToken){
                return forbidden(new AccessDeniedError())
            }
        
        } catch (error) {
            return {
                statusCode : 500,
                body : serverError(new Error)
            }
        }
    }

}
