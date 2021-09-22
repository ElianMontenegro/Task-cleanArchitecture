import { AddAccount } from "../../domain/usecases"
import { Hasher } from '../protocols/cryptography'

export class DbAddAccount implements AddAccount{
    constructor (
        private readonly hasher : Hasher
    ){}
    async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
        const hasherPassword = await this.hasher.hash(accountData.password);
        return true
    }
}