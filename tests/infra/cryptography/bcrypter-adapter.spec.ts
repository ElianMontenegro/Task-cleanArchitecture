import { BcrypterAdapter } from '../../../src/infra/cryptography'
import { throwError } from '../../presentation/mocks/index' 
import bcrypt, { hash } from 'bcrypt'


jest.mock('bcrypt', () => ({
    async hash (): Promise<string>{
        return 'hash'
    }
}))

const salt = 10

const makeSut = () => {
    return new BcrypterAdapter(salt)
}

describe('bcrypter adapter',() => {
    
    describe('hash()', () => {
        test('Should return a valid hash on hash success', async () => {
            const sut = makeSut()
            const hash = await sut.hash('any_value')
            expect(hash).toBe('hash')
        })

        test('Should call hash with correct values', async () => {
            const sut = makeSut()
            const hashSpy = jest.spyOn(bcrypt, 'hash')
            await sut.hash('any_value')
            expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
        })

        test('Should throw error if hash throw error', async () => {
            const sut = makeSut()
            jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
            const promise = sut.hash('any_value')
            await expect(promise).rejects.toThrow()
        })
    })
   
})