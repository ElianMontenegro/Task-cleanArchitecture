import { AddAccount } from "../../domain/usecases"
import { Hasher, CheckAccountByEmailRepository, AddAccountRepository } from '../protocols'

export class DbAddAccount implements AddAccount{
    constructor (
        private readonly hasher : Hasher,
        private readonly checkAccountByEmailRepository : CheckAccountByEmailRepository,
        private readonly addAccountRepository : AddAccountRepository
    ){}
    async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
        const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email);
        let isValid = false
        if(!exists){
            const hasherPassword = await this.hasher.hash(accountData.password);
            isValid = await this.addAccountRepository.add({...accountData, password : hasherPassword})
        }
        return isValid
    }
}