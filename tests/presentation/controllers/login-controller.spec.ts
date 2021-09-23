import faker from "faker";
import { MissingParamError } from "../../../src/presentation/errors";
import { badRequest } from "../../../src/presentation/helpers";
import { LoginController } from '@/../../src/presentation/controller'

const makeSut = () => {
    const mockRequest = {
        body: {
            email: faker.internet.email(),
            password :  faker.internet.password(),
        }
    }
    const sut = new LoginController();
    return {
        sut,
        mockRequest
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
})
