import { IController, IHttpRequest, IHttpResponse } from '@/../../src/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/../../src/presentation/helpers'
import { AddAccount, Authentication } from '../../domain/usecases'
import { EmailInUseError } from '../errors'

export class SignUpController implements IController{
    constructor(
        private readonly addAccount : AddAccount,
        private readonly authentication : Authentication
    ){}

    async handle(request: IHttpRequest): Promise<IHttpResponse>{
        try {
            const paramsRequired = ["username", "email", "password", "passwordConfirmation"]
            for (const params of paramsRequired) {
                if (!request.body[params]) {
                    return badRequest(params)
                }
            }
            const { username, email, password } = request.body
            const isValid = await this.addAccount.add({
                username,
                email,
                password
            })
            
            if (!isValid) {
                return forbidden(new EmailInUseError())
            }

            const authenticationModel = await this.authentication.auth({
                email,
                password
            })
            return ok(authenticationModel)

        } catch (error: any) {
            return {
                statusCode: 500,
                body: serverError(error)
            }
        }
    }
}

