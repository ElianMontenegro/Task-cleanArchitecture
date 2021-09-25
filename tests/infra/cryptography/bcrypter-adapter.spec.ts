import { BcrypterAdapter } from '../../../src/infra/cryptography'
import { throwError } from '../../presentation/mocks/index' 
import bcrypt, { hash } from 'bcrypt'


jest.mock('bcrypt', () => ({
    async hash (): Promise<string>{
        return 'hash'
    }
}))

const salt = 10


describe('bcrypter adapter',() => {
    
    describe('hash()', () => {
        test('Should return a valid hash on hash success', async () => {
            const sut = new BcrypterAdapter(salt)
            const hash = await sut.hash('any_value')
            expect(hash).toBe('hash')
        })

        test('Should call hash with correct values', async () => {
            const sut = new BcrypterAdapter(salt)
            const hashSpy = jest.spyOn(bcrypt, 'hash')
            await sut.hash('any_value')
            expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
        })

        test('Should throw error if hash throw error', async () => {
            const sut = new BcrypterAdapter(salt)
            jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
            const promise = sut.hash('any_value')
            await expect(promise).rejects.toThrow()
        })
    })
   
})