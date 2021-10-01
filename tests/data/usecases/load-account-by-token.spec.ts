import  { LoadAccountIdByToken } from '../../../src/domain/usecases'
import { DescrypterSpy } from '../mocks'
import { Descrypter } from '@/../../src/data/protocols'
import faker from 'faker'


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

type SutType = {
    sut : LoadAccountByToken,
    descrypterSpy : DescrypterSpy
}

const makeSut = (): SutType => {
    const descrypterSpy = new DescrypterSpy()
    const sut = new LoadAccountByToken(descrypterSpy)
    return {
        descrypterSpy,
        sut
    }
}


let token : any
describe('LoadAccountByToken', () => {

    beforeEach(() => {
        token = faker.datatype.uuid()
    })

    test('Should call DescrypterSpy with correct value', async () => {
        const { sut, descrypterSpy} = makeSut()
        await sut.load(token)
        expect(descrypterSpy.ciphertext).toEqual(token)
    })
})