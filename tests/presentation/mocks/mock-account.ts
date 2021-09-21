import { AddAccount, Authentication} from '@/../../src/domain/usecases'
import faker from "faker"

export class AddAccountSpy implements AddAccount{
    params: AddAccount.Params
    result = true
    async add(params: AddAccount.Params): Promise<AddAccount.Result> {
        this.params = params
        return this.result
    }
} 

export class AutheticationSpy implements Authentication{
    params: Authentication.Params
    result = {
        accessToken: faker.datatype.uuid(),
        refreshToken: faker.datatype.uuid()
    }
    
    async auth (params: Authentication.Params): Promise<Authentication.Result> {
        this.params = params
        return this.result
    }
}