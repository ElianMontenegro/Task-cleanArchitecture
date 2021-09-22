import { mockAddAccountParams } from "../../domain/mocks/mock-account"
import { HasherSpy } from '../mocks/mock-cryptography'
import { DbAddAccount } from '../../../src/data/usecases'

type SuTypes = {
    sut : DbAddAccount,
    hasherSpy : HasherSpy
}

const makeSut = (): SuTypes  =>{
    const hasherSpy = new HasherSpy()
    const sut = new DbAddAccount(hasherSpy)
    return {
        sut,
        hasherSpy
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
})