import { badRequest, serverError } from '@/../../src/presentation/helpers'
import { SignUpController } from '@/../../src/presentation/controller'
import { IHttpRequest } from '@/../../src/presentation/protocols'
import { AddAccountSpy, throwError } from '../mocks'
import faker from 'faker'

type SutTypes = {
    sut: SignUpController
    mockRequest : IHttpRequest
    addAccountSpy : AddAccountSpy
}

const makeSut = (): SutTypes => {
    const mockRequest = {
        body: {
            username : faker.name.findName(),
            email: faker.internet.email(),
            password : faker.internet.password(),
            passwordConfirmation: faker.internet.password()
        }
    }
    const addAccountSpy = new AddAccountSpy()
    const sut = new SignUpController(addAccountSpy)
    return {
        mockRequest,
        sut,
        addAccountSpy
    }
}




describe("SignUpController", () => {
    test("Should return badRequest Error if username is not provided",async () => {
        const { sut, mockRequest } = makeSut()
        mockRequest.body.username = ""
        const httpResponse = await sut.handle(mockRequest);
        expect(httpResponse).toEqual(badRequest("username"))
    })
    test("Should return badRequest Error if email is not provided",async () => {
        const { sut, mockRequest } = makeSut()
        mockRequest.body.email = ""
        const httpResponse = await sut.handle(mockRequest);
        expect(httpResponse).toEqual(badRequest("email"))
    })
    test("Should return badRequest Error if password is not provided",async () => {
        const { sut, mockRequest } = makeSut()
        mockRequest.body.password = ""
        const httpResponse = await sut.handle(mockRequest);
        expect(httpResponse).toEqual(badRequest("password"))
    })
    test("Should return badRequest Error if passwordConfirmation is not provided",async () => {
        const { sut, mockRequest } = makeSut()
        mockRequest.body.passwordConfirmation = ""
        const httpResponse = await sut.handle(mockRequest);
        expect(httpResponse).toEqual(badRequest("passwordConfirmation"))
    })

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountSpy , mockRequest } = makeSut()
        jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest)
        expect(httpResponse.body).toEqual(serverError(new Error()))
    })
})
