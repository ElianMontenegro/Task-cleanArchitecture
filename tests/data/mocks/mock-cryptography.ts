import { Hasher, HashCompare } from '@/../../src/data/protocols'
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