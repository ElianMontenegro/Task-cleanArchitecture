import { badRequest } from '@/../../src/presentation/helpers'
import { SignUpController } from '@/../../src/presentation/controller'
import faker, { fake } from 'faker'


const makeSut = () => {
    const mockRequest = {
        body: {
            username : faker.name.findName(),
            email: faker.internet.email(),
            password : faker.internet.password(),
            passwordConfirmation: faker.internet.password()
        }
    }
    const sut = new SignUpController()
    return {
        mockRequest,
        sut
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
})