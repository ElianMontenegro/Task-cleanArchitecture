import { BcrypterAdapter } from '../../../src/infra/cryptography'
import { throwError } from '../../presentation/mocks/index' 
import bcrypt from 'bcrypt'


jest.mock('bcrypt', () => ({
    async hash (): Promise<string>{
        return 'hash'
    },
    async compare (): Promise<boolean>{
        return true
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

    describe('compare()', () => {
        test('Should return true if compare successe', async () => {
            const sut = makeSut()
            const isValid = await sut.compare('any_value', 'any_valueHash')
            expect(isValid).toBe(true)
        })

        test('Should call compare with correct values', async () => {
            const sut = makeSut()
            const compareSpy = jest.spyOn(bcrypt, 'compare')
            await sut.compare('any_value', 'any_valueHash')
            expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_valueHash')
        })

        
        test('Should throw error if compare throw error', async () => {
            const sut = makeSut()
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
            const promise = sut.compare('any_value', 'any_valueHash')
            await expect(promise).rejects.toThrow()
        })
    })
   
})