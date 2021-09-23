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
        return {
            statusCode: 200,
            body : ""
        }
    } 

}

describe('LoginController ', () => {
    test('Should return badRequest Error if email is not provided', async () => {
        const sut = new LoginController();
        const httpRequest = {
            body: {
                email : "",
                password : ""
            }
        }
        const auth = await sut.handle(httpRequest)
        expect(auth).toEqual(badRequest(new MissingParamError("email")))
    })
})
