import { LoadAccountIdByToken } from "../../domain/usecases"
import { Descrypter } from "../protocols"
import { config as dotenv } from 'dotenv'
dotenv()

export class LoadAccountByToken implements LoadAccountIdByToken{
    constructor(private readonly descrypter : Descrypter){}

    async load (accessToken: string): Promise<LoadAccountIdByToken.Result>{
        const accountId = await this.descrypter.descryp(accessToken, process.env.SECRET_ACCESS_TOKEN)
        if(!accountId){
            return null
        }
        return accountId.id
    }
}