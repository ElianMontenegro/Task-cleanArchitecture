import { BcrypterAdapter } from '../../../src/infra/cryptography'
import bcrypt, { hash } from 'bcrypt'


jest.mock('bcrypt', () => ({
    async hash (): Promise<string>{
        return 'hash'
    }
}))

const salt = 10


describe('bcrypter adapter',() => {
    
    describe('hash()', () => {
        test('Should call hash with correct values', async () => {
            const sut = new BcrypterAdapter(salt)
            const hashSpy = jest.spyOn(bcrypt, 'hash')
            await sut.hash('any_value')
            expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
        })
    })
   
})