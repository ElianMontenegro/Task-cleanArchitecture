import { Hasher } from '@/../../src/data/protocols/cryptography'
import faker from 'faker'

export class HasherSpy implements Hasher{
    transform = faker.datatype.uuid() 
    plainText : string
    async hash(plainText : string): Promise<string>{
        this.plainText = plainText
        return this.transform
    }
}