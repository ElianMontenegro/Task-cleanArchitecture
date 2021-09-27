import { Hasher, HashCompare } from '../../data/protocols'
import bcrypt from 'bcrypt'

export class BcrypterAdapter implements Hasher, HashCompare{
    constructor(private readonly salt : number){}
    
    async hash(plaintext: string): Promise<string> {
        const valueHash = await bcrypt.hash(plaintext, this.salt)
        return valueHash
    }

    async compare(plainText: string, hashText: string): Promise<Boolean>{
        const isValid = await bcrypt.compare(plainText, hashText);
        return isValid
    }
}
