import faker from "faker";
import { MissingParamError } from "../../../src/presentation/errors";
import { badRequest, ok, serverError } from "../../../src/presentation/helpers";
import { LoginController } from '@/../../src/presentation/controller'
import { IHttpRequest } from "../../../src/presentation/protocols";
import { AuthenticationSpy, throwError  } from "../mocks";

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

    test('Should throw error 500 if AuthenticationSpy throw error', async () => {
        const { sut, mockRequest, authenticationSpy } = makeSut();
        jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
        const promise = await sut.handle(mockRequest)
        expect(promise).toEqual(serverError(new Error()))
    })

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut, authenticationSpy , mockRequest } = makeSut()
        const httpResponse = await sut.handle(mockRequest)
        expect(httpResponse).toEqual(ok(authenticationSpy.result))
      })

})


