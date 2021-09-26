import { DbAuthentication } from '@/../../src/data/usecases/db-authentication'
import { LoadAccountByEmailRepositorySpy, HashCompareSpy, JwtAdapterSpy } from '../mocks'
import { mockAuthenticationParams } from "../../domain/mocks/mock-account"
import { throwError } from '../../presentation/mocks'

type SutTypes = {
    sut : DbAuthentication
    loadAccountByEmailRepositorySpy : LoadAccountByEmailRepositorySpy
    hashCompareSpy : HashCompareSpy
    jwtAdapterSpy : JwtAdapterSpy
}


const makeSut = () : SutTypes =>{
    const jwtAdapterSpy = new JwtAdapterSpy()
    const hashCompareSpy = new HashCompareSpy()
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashCompareSpy, jwtAdapterSpy, jwtAdapterSpy)
    return {
        sut,
        loadAccountByEmailRepositorySpy,
        hashCompareSpy,
        jwtAdapterSpy
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

    test('Should throw error if HashComparer throws error', async () => {
        const { sut, hashCompareSpy } = makeSut()
        jest.spyOn(hashCompareSpy, 'compare').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
      })

    test('Should call jwtAdapterSpy with correct params', async () => {
        const { sut, jwtAdapterSpy, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        await sut.auth(authenticationParams)
        expect(jwtAdapterSpy.email).toBe(authenticationParams.email)
        expect(jwtAdapterSpy.id).toBe(loadAccountByEmailRepositorySpy.result.id)
    })

    test('Should return null if jwtAdapterSpy return null', async () => {
        const { sut, jwtAdapterSpy } = makeSut()
        jwtAdapterSpy.AccessToken = null
        jwtAdapterSpy.RefreshToken = null
        const token = await sut.auth(mockAuthenticationParams())
        expect(token.accessToken).toBeNull()
        expect(token.refreshToken).toBeNull()
    })

    test('Should throw error if jwtAdapterSpy accessToken() throws error', async () => {
        const { sut, jwtAdapterSpy } = makeSut()
        jest.spyOn(jwtAdapterSpy, 'accessToken').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
      })

      test('Should throw error if jwtAdapterSpy refreshToken() throws error', async () => {
        const { sut, jwtAdapterSpy } = makeSut()
        jest.spyOn(jwtAdapterSpy, 'refreshToken').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
      })
})