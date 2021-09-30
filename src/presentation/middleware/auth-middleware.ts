import { AccessDeniedError } from "../errors"
import { forbidden, serverError } from "../helpers"
import { IHttpRequest, IHttpResponse, Middleware } from "../protocols"
import { LoadAccountByToken } from '../../domain/usecases'


export class AuthMiddleware implements Middleware{

    constructor(private readonly loadAccountByToken : LoadAccountByToken){}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{

        try {
            const { accessToken } = httpRequest.body
            if(accessToken){
                const account = await this.loadAccountByToken.load(accessToken)
            }
            return forbidden(new AccessDeniedError())
        
        } catch (error) {
            return {
                statusCode : 500,
                body : serverError(new Error)
            }
        }
    }

}
