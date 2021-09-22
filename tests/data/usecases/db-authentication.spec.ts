import { DbAuthentication } from '@/../../src/data/usecases/db-authentication'
import { LoadAccountByEmailRepositorySpy } from '../mocks/mock-db-account'
import { mockAuthenticationParams } from "../../domain/mocks/mock-account"
import { throwError } from '../../presentation/mocks'

type SutTypes = {
    sut : DbAuthentication
    loadAccountByEmailRepositorySpy : LoadAccountByEmailRepositorySpy
}


const makeSut = () : SutTypes =>{
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
    return {
        sut,
        loadAccountByEmailRepositorySpy
    }
}


describe('Db Authentication', () => {
    test('Should call loadAccountByEmailRepository with correct params', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        await sut.auth(authenticationParams)
        expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
    })

    test('Should throw error if loadAccountByEmailRepository throw error', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByEmailRepositorySpy, "load").mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        loadAccountByEmailRepositorySpy.result = null
        const model = await sut.auth(mockAuthenticationParams())
        expect(model).toBeNull()
      })
})