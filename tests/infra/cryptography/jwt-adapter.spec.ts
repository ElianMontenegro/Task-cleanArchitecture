import { throwError } from '../../presentation/mocks'
import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/cryptography'
import faker from 'faker'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string>{
        return 'any_token'
    }
    
}))



const makeSut = () => {
    const accessTokenParams = {
        id : faker.datatype.uuid(),
        secret : faker.random.word(),
        expiresIn : 200
    }
    const sut = new JwtAdapter()
    return {
        sut,
        accessTokenParams
    }
}


describe('JwtAdapter', () => {
    describe('signAccessToken', () => {
        test('Should call AccessToken with correct value' , async () => {
            const { sut, accessTokenParams } = makeSut()
            const signSpy = jest.spyOn(jwt, 'sign')
            await sut.accessToken(accessTokenParams.id , accessTokenParams.secret, accessTokenParams.expiresIn)
            expect(signSpy).toHaveBeenCalledWith({ id : accessTokenParams.id } , accessTokenParams.secret, { expiresIn : accessTokenParams.expiresIn })
        })

        test('Should return a token if on sign success' , async () => {
            const { sut, accessTokenParams } = makeSut()
            const accessToken = await sut.accessToken(accessTokenParams.id , accessTokenParams.secret, accessTokenParams.expiresIn)
            expect(accessToken).toBe('any_token')
        })

        test('Should throw error if sign throw error' , async () => {
            const { sut, accessTokenParams } = makeSut()
            jest.spyOn(jwt, 'sign').mockImplementation(throwError)
            const accessToken = sut.accessToken(accessTokenParams.id , accessTokenParams.secret, accessTokenParams.expiresIn)
            await expect(accessToken).rejects.toThrowError()
        })
    })
})

