import { Hasher, HashCompare, AccessToken, RefreshToken, Descrypter } from '@/../../src/data/protocols'
import faker from 'faker'

export class HasherSpy implements Hasher{
    transform = faker.datatype.uuid() 
    plainText : string
    async hash(plainText : string): Promise<string>{
        this.plainText = plainText
        return this.transform
    }
}

export class HashCompareSpy implements HashCompare{
    plainText : string
    hashText : string
    isValid  = true

    async compare(plainText: string, hashText: string): Promise<boolean>{
        this.plainText = plainText
        this.hashText = hashText
        return this.isValid
    }
    
}

export class JwtAdapterSpy implements AccessToken, RefreshToken{
    id : string
    email : string
    AccessToken = faker.datatype.uuid()
    RefreshToken = faker.datatype.uuid()
    async accessToken(id: string, secret: string, expiresIn: any):  Promise<string>{
        this.id = id
        return this.AccessToken
    }

    async refreshToken(id: string, email: string, secret: string, expiresIn: any):  Promise<string>{
        this.id = id
        this.email = email
        return this.RefreshToken
    }


}

export class DescrypterSpy implements Descrypter {
    ciphertext : string
    plainText = faker.datatype.uuid()
    async descryp (ciphertext: string): Promise<string>{
        this.ciphertext = ciphertext
        return this.plainText
    }
    
}

