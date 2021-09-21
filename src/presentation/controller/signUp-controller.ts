import { IController, IHttpRequest, IHttpResponse } from '@/../../src/presentation/protocols'
import { badRequest } from '@/../../src/presentation/helpers'

export class SignUpController implements IController{
    async handle(request: IHttpRequest): Promise<IHttpResponse>{
        try {
            const paramsRequired = ["username", "email", "password", "passwordConfirmation"]
            for (const params of paramsRequired) {
                if (!request.body[params]) {
                    return badRequest(params)
                }
            }
            return {
                statusCode: 200,
                body: ""
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}
