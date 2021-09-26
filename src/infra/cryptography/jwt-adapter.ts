import { AccessToken, RefreshToken } from '../../../src/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements AccessToken, RefreshToken {

    async accessToken (id: string, secret : string, expiresIn : any): Promise<string>{
        const token = jwt.sign({ id : id }, secret , { expiresIn: expiresIn });
        return token
    }

    async refreshToken (id: string, email : string, secret : string, expiresIn : any): Promise<string>{
        const token = jwt.sign({ id : id, email: email}, secret , { expiresIn: expiresIn });
        return token
    }
    
}

