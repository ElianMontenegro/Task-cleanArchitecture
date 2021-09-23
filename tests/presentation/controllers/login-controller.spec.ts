import faker from "faker";
import { MissingParamError } from "../../../src/presentation/errors";
import { badRequest } from "../../../src/presentation/helpers";
import { LoginController } from '@/../../src/presentation/controller'




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
    test('Should return badRequest Error if password is not provided', async () => {
        const sut = new LoginController();
        const httpRequest = {
            body: {
                email : faker.internet.email(),
                password : ""
            }
        }
        const auth = await sut.handle(httpRequest)
        expect(auth).toEqual(badRequest(new MissingParamError("password")))
    })
})
