import { forbidden, ok, serverError } from '../../../src/presentation/helpers'
import { AccessDeniedError } from '../../../src/presentation/errors'
import { AuthMiddleware } from '../../../src/presentation/middleware'
import { LoadAccountIdByTokenSpy, throwError } from '../mocks'



type SutType = {
    sut : AuthMiddleware
    httpRequest : any
    loadAccountIdByTokenSpy : LoadAccountIdByTokenSpy
}

const makeSut = (): SutType => {
    const httpRequest = {
        accessToken: 'any_token' 
    }
    const loadAccountIdByTokenSpy = new LoadAccountIdByTokenSpy()
    const sut = new AuthMiddleware(loadAccountIdByTokenSpy)
    return {
        sut,
        httpRequest,
        loadAccountIdByTokenSpy
    }
}


describe('AuthMiddleware', () => {
    test('Should return 403 if no authorization in header', async () => {
        const { sut, httpRequest }= makeSut()
        httpRequest.accessToken = ''
        const httpResponse  = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should call LoadAccountByToken with correct accessToken', async () => {
        const { sut, loadAccountIdByTokenSpy, httpRequest }= makeSut()
        await sut.handle(httpRequest)
        expect(loadAccountIdByTokenSpy.accessToken).toBe(httpRequest.accessToken)
    })

    test('Should return null if LoadAccountByToken return null', async () => {
        const { sut, loadAccountIdByTokenSpy, httpRequest }= makeSut()
        loadAccountIdByTokenSpy.result = null
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should return 200 if LoadAccountByToken return an account', async () => {
        const { sut, loadAccountIdByTokenSpy, httpRequest }= makeSut()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toEqual(ok({accountId : loadAccountIdByTokenSpy.result}).statusCode)
    })

    test('Should return 500 if LoadAccountByToken throw', async () => {
        const { sut, loadAccountIdByTokenSpy, httpRequest }= makeSut()
        jest.spyOn(loadAccountIdByTokenSpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(new Error))
    })
})

