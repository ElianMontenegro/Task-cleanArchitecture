import faker from "faker";
import { MissingParamError } from "../../../src/presentation/errors";
import { badRequest } from "../../../src/presentation/helpers";
import { LoginController } from '@/../../src/presentation/controller'
import { IHttpRequest } from "../../../src/presentation/protocols";
import { AuthenticationSpy } from "../mocks/mock-account";

type SutTypes = {
    sut : LoginController,
    mockRequest : IHttpRequest,
    authenticationSpy : AuthenticationSpy
}


const makeSut = (): SutTypes => {
    const mockRequest = {
        body: {
            email: faker.internet.email(),
            password :  faker.internet.password(),
        }
    }
    const authenticationSpy = new AuthenticationSpy()
    const sut = new LoginController(authenticationSpy);
    return {
        sut,
        mockRequest,
        authenticationSpy
    }
}


describe('LoginController ', () => {

    test('Should return badRequest Error if email is not provided', async () => {
        const { sut, mockRequest } = makeSut();
        mockRequest.body.email = ""
        const auth = await sut.handle(mockRequest)
        expect(auth).toEqual(badRequest(new MissingParamError("email")))
    })

    test('Should return badRequest Error if password is not provided', async () => {
        const { sut, mockRequest } = makeSut();
        mockRequest.body.password = ""
        const auth = await sut.handle(mockRequest)
        expect(auth).toEqual(badRequest(new MissingParamError("password")))
    })

    test('Should call AuthenticationSpy with corret params', async () => {
        const { sut, mockRequest, authenticationSpy } = makeSut();
        await sut.handle(mockRequest)
        expect(authenticationSpy.params).toEqual(mockRequest.body)
    })

})
