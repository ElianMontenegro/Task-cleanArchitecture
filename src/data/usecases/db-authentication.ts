import { Authentication  } from "../../domain/usecases"
import { LoadAccountByEmailRepository, HashCompare, AccessToken, RefreshToken } from "../protocols"

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository : LoadAccountByEmailRepository,
        private readonly hashCompare : HashCompare,
        private readonly accessToken : AccessToken,
        private readonly refreshToken : RefreshToken
    ) {}

    async auth(authenticationParams: Authentication.Params): Promise<Authentication.Result>{
        const account = await this.loadAccountByEmailRepository.load(authenticationParams.email)
        if(account){
            const isValid = await this.hashCompare.compare(authenticationParams.password, account.password)
            if (isValid) {
                const accessToken = await this.accessToken.accessToken(account.id, "secret", 300);
                const refreshToken = await this.refreshToken.refreshToken(account.id, authenticationParams.email, "secretRefresh", 1999);
                return {
                    accessToken : accessToken,
                    refreshToken : refreshToken
                }
            }
        } 
        return null
    }
    
}
