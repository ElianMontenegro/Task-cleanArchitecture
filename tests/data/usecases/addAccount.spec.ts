import { AddAccount } from "@/../../src/domain/usecases"
import { mockAddAccountParams } from "../../domain/mocks/mock-account"
export class DbAddAccount implements AddAccount{
    async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
        return true
    }
}





describe("DbAddAccount Usecase", () => {
    test("Should return true on success", async () => {
        const sut = new DbAddAccount()
        const isValid = await sut.add(mockAddAccountParams())
        expect(isValid).toBe(true)
    })
})