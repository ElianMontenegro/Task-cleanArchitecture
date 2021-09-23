import { DbAuthentication } from '@/../../src/data/usecases/db-authentication'
import { LoadAccountByEmailRepositorySpy, HashCompareSpy } from '../mocks'
import { mockAuthenticationParams } from "../../domain/mocks/mock-account"
import { throwError } from '../../presentation/mocks'

type SutTypes = {
    sut : DbAuthentication
    loadAccountByEmailRepositorySpy : LoadAccountByEmailRepositorySpy
    hashCompareSpy : HashCompareSpy
}


const makeSut = () : SutTypes =>{
    const hashCompareSpy = new HashCompareSpy()
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashCompareSpy)
    return {
        sut,
        loadAccountByEmailRepositorySpy,
        hashCompareSpy
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

    test('Should return null if hashCompareSpy returns null', async () => {
        const { sut, hashCompareSpy } = makeSut()
        hashCompareSpy.isValid = null
        const model = await sut.auth(mockAuthenticationParams())
        expect(model).toBeNull()
    })
})