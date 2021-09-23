import { MissingParamError } from "../../../src/presentation/errors";
import { badRequest } from "../../../src/presentation/helpers";
import { IHttpRequest, IHttpResponse } from "../../../src/presentation/protocols";
import { IController } from '../../../src/presentation/protocols/controller-interface'




export class LoginController implements IController{
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        const { email, password } = httpRequest.body
        if(!email){
            return badRequest(new MissingParamError("email"))
        }
        if(!password){
            return badRequest(new MissingParamError("password"))
        }
        return {
            statusCode: 200,
            body : ""
        }
    } 

}
