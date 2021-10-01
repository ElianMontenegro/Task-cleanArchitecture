import { throwError } from '../../presentation/mocks'
import jwt, { verify } from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/cryptography'
import faker from 'faker'


jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string>{
        return 'any_token'
    },
    async verify (): Promise<string>{
        return 'any_value'
    }
    
}))


const makeSut = () => {
    const tokenParams = {
        id : faker.datatype.uuid(),
        email : faker.internet.email(),
        secret : faker.random.word(),
        expiresIn : 200
    }
    const sut = new JwtAdapter()
    return {
        sut,
        tokenParams
    }
}


describe('JwtAdapter', () => {
    describe('AccessToken', () => {
        test('Should call AccessToken with correct value' , async () => {
            const { sut, tokenParams } = makeSut()
            const signSpy = jest.spyOn(jwt, 'sign')
            await sut.accessToken(tokenParams.id , tokenParams.secret, tokenParams.expiresIn)
            expect(signSpy).toHaveBeenCalledWith({ id : tokenParams.id } , tokenParams.secret, { expiresIn : tokenParams.expiresIn })
        })

        test('Should return a token if on sign success' , async () => {
            const { sut, tokenParams } = makeSut()
            const accessToken = await sut.accessToken(tokenParams.id , tokenParams.secret, tokenParams.expiresIn)
            expect(accessToken).toBe('any_token')
        })

        test('Should throw error if sign throw error' , async () => {
            const { sut, tokenParams } = makeSut()
            jest.spyOn(jwt, 'sign').mockImplementation(throwError)
            const accessToken = sut.accessToken(tokenParams.id , tokenParams.secret, tokenParams.expiresIn)
            await expect(accessToken).rejects.toThrowError()
        })
    })

    describe('descrypter', () => {
        test('Should call descrypter with correct value', async () => {
            const { sut } = makeSut()
            const verifySpy = jest.spyOn(jwt, 'verify')
            await sut.descryp('any_token', 'any_secret')
            expect(verifySpy).toHaveBeenCalledWith('any_token', 'any_secret')
        })

        test('Should return a value on verify success', async () => {
            const { sut } = makeSut()
            const value = await sut.descryp('any_token', 'any_secret')
            expect(value).toBe('any_value')
        })
    })

    
})

