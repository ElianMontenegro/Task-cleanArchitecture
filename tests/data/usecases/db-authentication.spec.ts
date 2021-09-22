import { DbAuthentication } from '@/../../src/data/usecases/db-authentication'
import { LoadAccountByEmailRepositorySpy } from '../mocks/mock-db-account'
import { mockAuthenticationParams } from "../../domain/mocks/mock-account"

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
})