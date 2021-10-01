import { LoadAccountIdByToken } from "../../domain/usecases"
import { Descrypter } from "../protocols"


export class LoadAccountByToken implements LoadAccountIdByToken{
    constructor(private readonly descrypter : Descrypter){}

    async load (accessToken: string): Promise<LoadAccountIdByToken.Result>{
        const accountId = await this.descrypter.descryp(accessToken)
        if(!accountId){
            return null
        }
        return { id : accountId}
    }
}