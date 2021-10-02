import { AccessDeniedError } from "../errors"
import { forbidden, ok, serverError } from "../helpers"
import { IHttpRequest, IHttpResponse, Middleware } from "../protocols"
import { LoadAccountIdByToken } from '../../domain/usecases'


export class AuthMiddleware implements Middleware{

    constructor(private readonly loadAccountIdByToken : LoadAccountIdByToken){}

    async handle(httpRequest: AuthMiddleware.Request): Promise<IHttpResponse>{
        try {
            const { accessToken } = httpRequest
            if(accessToken){
                const account = await this.loadAccountIdByToken.load(accessToken)
                if(account){
                    return ok({ accountId: account.id })
                }
            }
            return forbidden(new AccessDeniedError())
        
        } catch (error: any) {
            return serverError(error)
        }
    }
}

export namespace AuthMiddleware {
    export type Request = {
        accessToken : string
    }
}