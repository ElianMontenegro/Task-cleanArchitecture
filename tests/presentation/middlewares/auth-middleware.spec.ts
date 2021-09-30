import { forbidden, serverError } from '../../../src/presentation/helpers'
import { AccessDeniedError } from '../../../src/presentation/errors'
import { AuthMiddleware } from '../../../src/presentation/middleware'

type SutType = {
    sut : AuthMiddleware
}

const makeSut = (): SutType => {
    const sut = new AuthMiddleware()
    return {
        sut
    }
}


describe('AuthMiddleware', () => {
    test('Should return 403 if no authorization in header', async () => {
        const { sut }= makeSut()
        const httpResponse  = await sut.handle({ body : {}})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
})

