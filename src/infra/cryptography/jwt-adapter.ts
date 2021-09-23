import { AccessToken, RefreshToken } from '../../../src/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements AccessToken, RefreshToken {
    private readonly secret : string
    private readonly  expiresIn : any

    constructor(secret : string, expiresIn : any){
        this.secret = secret
        this.expiresIn = expiresIn
    }

    async encrypt (id: string, email?: string | undefined): Promise<string>{
        const token = jwt.sign({ id : id, email : email }, this.secret , { expiresIn: this.expiresIn });
        return token
    }
    
}

