import { forbidden, serverError } from '../../../src/presentation/helpers'
import { AccessDeniedError } from '../../../src/presentation/errors'
import { IHttpRequest, IHttpResponse, Middleware } from '../../../src/presentation/protocols'

export class AuthMiddleware implements Middleware{
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{

        try {
            const { accessToken } = httpRequest.body
            if(!accessToken){
                return forbidden(new AccessDeniedError())
            }
        
        } catch (error) {
            return {
                statusCode : 500,
                body : serverError(new Error)
            }
        }
    }

}


describe('AuthMiddleware', () => {
    test('Should return 403 if no authorization in header', async () => {
        const sut = new AuthMiddleware()
        const httpResponse  = await sut.handle({ body : {}})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
})

