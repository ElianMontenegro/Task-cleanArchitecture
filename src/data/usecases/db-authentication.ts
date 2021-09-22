import { Authentication } from "../../domain/usecases"
import { LoadAccountByEmailRepository } from "../protocols"


export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository : LoadAccountByEmailRepository
    ) {}
    async auth(authenticationParams: Authentication.Params): Promise<Authentication.Result>{
        const account = this.loadAccountByEmailRepository.load(authenticationParams.email)
        return {
            accessToken : "",
            refreshToken : ""
        }
    }
    
}
