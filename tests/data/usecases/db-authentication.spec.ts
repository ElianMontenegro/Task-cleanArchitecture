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

    test('Should call jwtAdapterSpy with correct params', async () => {
        const { sut, jwtAdapterSpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        await sut.auth(authenticationParams)
        expect(jwtAdapterSpy.email).toBe(authenticationParams.email)
    })

    test('Should return null if jwtAdapterSpy return null', async () => {
        const { sut, jwtAdapterSpy } = makeSut()
        jwtAdapterSpy.token = null
        const token = await sut.auth(mockAuthenticationParams())
        expect(token.accessToken).toBeNull()
        expect(token.refreshToken).toBeNull()
    })
})