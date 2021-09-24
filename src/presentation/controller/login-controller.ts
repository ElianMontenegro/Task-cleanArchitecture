import { MissingParamError } from "../../../src/presentation/errors";
import { badRequest, ok, serverError, unauthorized } from "../../../src/presentation/helpers";
import { IHttpRequest, IHttpResponse } from "../../../src/presentation/protocols";
import { IController } from '../../../src/presentation/protocols/controller-interface'
import { Authentication } from '../../domain/usecases'



export class LoginController implements IController{

    constructor (private readonly authentication : Authentication) {

    }
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const { email, password } = httpRequest.body
            if(!email){
                return badRequest(new MissingParamError("email"))
            }
            if(!password){
                return badRequest(new MissingParamError("password"))
            }

            const authenticationModel = await this.authentication.auth({email, password})
            if (!authenticationModel) {
                return unauthorized()
            }
            
            return ok(authenticationModel)
        } catch (error: any) {
            return serverError(error)
        }
    } 

}
