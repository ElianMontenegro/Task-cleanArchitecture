import { CheckAccountByEmailRepository } from '../../../src/data/protocols/db/account'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository{
    email : string
    result : CheckAccountByEmailRepository.Result
    async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result>{
        this.email
        return this.result
    }
    
}