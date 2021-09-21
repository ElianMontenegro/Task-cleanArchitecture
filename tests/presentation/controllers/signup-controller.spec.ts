import { IController, IHttpRequest, IHttpResponse } from '@/../../src/presentation/protocols'
import { badRequest } from '@/../../src/presentation/helpers'
export class SignUpController implements IController{
    async handle(request: IHttpRequest): Promise<IHttpResponse>{
        try {
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
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
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
    test("Should return badRequest Error if email is not provided",async () => {
        const sut = new SignUpController()
        const httpRequest = {
            body : {
                username: "any_username",
                email: ""
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest("email"))
    })
    test("Should return badRequest Error if password is not provided",async () => {
        const sut = new SignUpController()
        const httpRequest = {
            body : {
                username: "any_username",
                email: "any_email",
                password: ""
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest("password"))
    })
    test("Should return badRequest Error if paswordConfirm is not provided",async () => {
        const sut = new SignUpController()
        const httpRequest = {
            body : {
                username: "any_username",
                email: "any_email",
                password: "any_password",
                paswordConfirm: ""
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest("paswordConfirm"))
    })
})