import { badRequest, forbidden, ok, serverError } from '@/../../src/presentation/helpers'
import { SignUpController } from '@/../../src/presentation/controller'
import { IHttpRequest } from '@/../../src/presentation/protocols'
import { AddAccountSpy, throwError, AuthenticationSpy } from '../mocks'
import faker from 'faker'
import { DataInUseError, InvalidParamError, MissingParamError } from '../../../src/presentation/errors'

type SutTypes = {
    sut: SignUpController
    mockRequest : IHttpRequest
    addAccountSpy : AddAccountSpy
    authenticationSpy : AuthenticationSpy
}

const makeSut = (): SutTypes => {
    const password = faker.internet.password()
    const mockRequest = {
        body: {
            username : faker.name.findName(),
            email: faker.internet.email(),
            password : password,
            passwordConfirmation: password
        }
    }
    const authenticationSpy = new AuthenticationSpy()
    const addAccountSpy = new AddAccountSpy()
    const sut = new SignUpController(addAccountSpy, authenticationSpy)
    return {
        mockRequest,
        sut,
        addAccountSpy,
        authenticationSpy
    }
}




describe("SignUpController", () => {
    test("Should return badRequest Error if username is not provided",async () => {
        const { sut, mockRequest } = makeSut()
        mockRequest.body.username = ""
        const httpResponse = await sut.handle(mockRequest);
        expect(httpResponse).toEqual(badRequest(new MissingParamError("username")))
    })
    test("Should return badRequest Error if email is not provided",async () => {
        const { sut, mockRequest } = makeSut()
        mockRequest.body.email = ""
        const httpResponse = await sut.handle(mockRequest);
        expect(httpResponse).toEqual(badRequest(new MissingParamError("email")))
    })
    test("Should return badRequest Error if password is not provided",async () => {
        const { sut, mockRequest } = makeSut()
        mockRequest.body.password = ""
        const httpResponse = await sut.handle(mockRequest);
        expect(httpResponse).toEqual(badRequest(new MissingParamError("password")))
    })
    test("Should return badRequest Error if passwordConfirmation is not provided",async () => {
        const { sut, mockRequest } = makeSut()
        mockRequest.body.passwordConfirmation = ""
        const httpResponse = await sut.handle(mockRequest);
        expect(httpResponse).toEqual(badRequest(new MissingParamError("passwordConfirmation")))
    })

    test("Should return badRequest Error if password and passwordConfirmation do not match",async () => {
        const { sut, mockRequest } = makeSut()
        mockRequest.body.passwordConfirmation = "different_password"
        const httpResponse = await sut.handle(mockRequest);
        expect(httpResponse).toEqual(badRequest(new InvalidParamError("password")))
    })

    test('Should return 500 if AddAccount throws error', async () => {
        const { sut, addAccountSpy , mockRequest } = makeSut()
        jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest)
        expect(httpResponse.body).toEqual(serverError(new Error()))
    })

    test('Should call AddAccount with correct params', async () => {
        const { sut, addAccountSpy , mockRequest } = makeSut()
        await sut.handle(mockRequest)
        expect(addAccountSpy.params).toEqual({
            username: mockRequest.body.username,
            email: mockRequest.body.email,
            password: mockRequest.body.password
        })
    })

    test('Should return 403 if addAccount return false', async () => {
        const { sut, addAccountSpy , mockRequest } = makeSut()
        addAccountSpy.result = false
        const Response = await sut.handle(mockRequest)
        expect(Response).toEqual(forbidden(new DataInUseError('email')))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut, authenticationSpy , mockRequest } = makeSut()
        const Response = await sut.handle(mockRequest)
        expect(Response).toEqual(ok(authenticationSpy.result))
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy, mockRequest} = makeSut()
        await sut.handle(mockRequest)
        expect(authenticationSpy.params).toEqual({
          email: mockRequest.body.email,
          password: mockRequest.body.password
        })
    })

    test('Should return 500 if Authentication throws', async () => {
        const { sut, authenticationSpy, mockRequest } = makeSut()
        jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest)
        expect(httpResponse.body).toEqual(serverError(new Error()))
    })


})
