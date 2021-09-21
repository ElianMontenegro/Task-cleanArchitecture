import { AddAccount } from '@/../../src/domain/usecases/add-account'


export class AddAccountSpy implements AddAccount{
    params: AddAccount.Params
    result = true
    async add(params: AddAccount.Params): Promise<AddAccount.Result> {
        this.params = params
        return this.result
    }
} 