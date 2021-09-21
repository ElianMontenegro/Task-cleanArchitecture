import { IController, IHttpRequest, IHttpResponse } from '@/../../src/presentation/protocols'
import { badRequest } from '@/../../src/presentation/helpers'
export class SignUpController implements IController{
    async handle(request: IHttpRequest): Promise<IHttpResponse>{
        const paramsRequired = ["username", "email", "password", "paswordConfirm"]
        for (const params of paramsRequired) {
            if (!request.body[params]) {
                return badRequest(params)
            }
        }
        return {
            statusCode: 200,
            body: ""
        }
    }
}



describe("SignUpController", () => {
    test("Should return badRequest Error if username is not provided",async () => {
        const sut = new SignUpController()
        const httpRequest = {
            body : {
                username: ""
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest("username"))
    })
})