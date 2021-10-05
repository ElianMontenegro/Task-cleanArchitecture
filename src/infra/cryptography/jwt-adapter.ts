import { AccessToken, RefreshToken, Descrypter } from '../../../src/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements AccessToken, RefreshToken, Descrypter {
 
    async accessToken (id: string, secret : string, expiresIn : any): Promise<string>{
        const token = jwt.sign({ id : id }, secret , { expiresIn: expiresIn });
        return token
    }

    async refreshToken (id: string, email : string, secret : string, expiresIn : any): Promise<string>{
        const token = jwt.sign({ id : id, email: email}, secret , { expiresIn: expiresIn });
        return token
    }

    async descryp (token: string, secret : string): Promise<any>{
        return jwt.verify(token, secret) 
    }  
}

