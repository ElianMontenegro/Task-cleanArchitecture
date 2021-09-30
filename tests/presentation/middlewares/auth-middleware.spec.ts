import { forbidden, ok, serverError } from '../../../src/presentation/helpers'
import { AccessDeniedError } from '../../../src/presentation/errors'
import { AuthMiddleware } from '../../../src/presentation/middleware'
import { IHttpRequest } from '../../../src/presentation/protocols'
import { LoadAccountByTokenSpy, throwError } from '../mocks'



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

    test('Should return null if LoadAccountByToken return null', async () => {
        const { sut, loadAccountByTokenSpy, httpRequest }= makeSut()
        loadAccountByTokenSpy.result = null
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should return 200 if LoadAccountByToken return an account', async () => {
        const { sut, loadAccountByTokenSpy, httpRequest }= makeSut()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(ok({accountId : loadAccountByTokenSpy.result.id}))
    })

    test('Should return 500 if LoadAccountByToken throw', async () => {
        const { sut, loadAccountByTokenSpy, httpRequest }= makeSut()
        jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(new Error))
    })
})

