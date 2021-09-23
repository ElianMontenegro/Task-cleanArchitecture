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
                const accessToken = await this.accessToken.encrypt(account.id);
                const refreshToken = await this.refreshToken.encrypt(account.id, authenticationParams.email);
                return {
                    accessToken : accessToken,
                    refreshToken : refreshToken
                }
            }
        } 
        return null as any
    }
    
}
