import { mockAddAccountParams } from "../../domain/mocks/mock-account"
import { HasherSpy } from '../mocks/mock-cryptography'
import { DbAddAccount } from '../../../src/data/usecases'
import { throwError } from '../../presentation/mocks'
import { CheckAccountByEmailRepositorySpy, AddAccountRepositorySpy } from '../mocks/mock-db-account'

type SuTypes = {
    sut : DbAddAccount,
    hasherSpy : HasherSpy
    checkAccountByEmailRepositorySpy : CheckAccountByEmailRepositorySpy,
    addAccountRepositorySpy : AddAccountRepositorySpy
}

const makeSut = (): SuTypes  =>{
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const hasherSpy = new HasherSpy()
    const sut = new DbAddAccount(hasherSpy, checkAccountByEmailRepositorySpy, addAccountRepositorySpy)
    return {
        sut,
        hasherSpy,
        checkAccountByEmailRepositorySpy,
        addAccountRepositorySpy
    }
}


describe("DbAddAccount Usecase", () => {
    test("Should return true on success", async () => {
        const { sut } = makeSut()
        const isValid = await sut.add(mockAddAccountParams())
        expect(isValid).toBe(true)
    })

    test("Should call Hasher with correct plainText", async () => {
        const { sut, hasherSpy } = makeSut()
        const addAccountParams = mockAddAccountParams()
        await sut.add(addAccountParams)
        expect(hasherSpy.plainText).toBe(addAccountParams.password)
    })

    test("Should throw a error of Hasher throws ", async () => {
        const { sut, hasherSpy } = makeSut()
        jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test("Should return false if CheckAccountByEmailRepository return true", async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        checkAccountByEmailRepositorySpy.result = true
        const isValid = await sut.add(mockAddAccountParams())
        expect(isValid).toBe(false)
    })

    test("Should call CheckAccountByEmailRepository with correct email", async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        const accountParams = mockAddAccountParams()
        await sut.add(accountParams)
        expect(checkAccountByEmailRepositorySpy.email).toBe(accountParams.email)
    })

    test("Should retrun false if AddAccountRepository return false", async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        addAccountRepositorySpy.result = false
        const isValid = await sut.add(mockAddAccountParams())
        expect(isValid).toBe(false)
    })

    test("Should throw error if AddAccountRepository throw error", async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })


})