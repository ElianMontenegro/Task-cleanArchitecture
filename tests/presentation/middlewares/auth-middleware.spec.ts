import { forbidden, serverError } from '../../../src/presentation/helpers'
import { AccessDeniedError } from '../../../src/presentation/errors'
import { AuthMiddleware } from '../../../src/presentation/middleware'
import { IHttpRequest } from '../../../src/presentation/protocols'
import { LoadAccountByToken } from '../../../src/domain/usecases'

class LoadAccountByTokenSpy implements LoadAccountByToken {
    accessToken = 'any_token'
    id : any
    async load (accessToken: string): Promise<LoadAccountByToken.Result>{
        this.accessToken = accessToken
        return this.id
    }

}

type SutType = {
    sut : AuthMiddleware
    httpRequest : IHttpRequest
    loadAccountByTokenSpy : LoadAccountByTokenSpy
}

const makeSut = (): SutType => {
    const httpRequest = {
        body :  { accessToken: 'any_token' }
    }
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const sut = new AuthMiddleware(loadAccountByTokenSpy)
    return {
        sut,
        httpRequest,
        loadAccountByTokenSpy
    }
}


describe('AuthMiddleware', () => {
    test('Should return 403 if no authorization in header', async () => {
        const { sut, httpRequest }= makeSut()
        httpRequest.body = {}
        const httpResponse  = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should call LoadAccountByToken with correct accessToken', async () => {
        const { sut, loadAccountByTokenSpy, httpRequest }= makeSut()
        await sut.handle(httpRequest)
        expect(loadAccountByTokenSpy.accessToken).toBe(httpRequest.body.accessToken)
    })
})

