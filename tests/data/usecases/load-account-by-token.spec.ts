import { LoadAccountByToken } from '../../../src/data/usecases'
import { DescrypterSpy } from '../mocks'
import faker from 'faker'

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

    test('Should return null if DescrypterSpy return null', async () => {
        const { sut, descrypterSpy} = makeSut()
        descrypterSpy.plainText = null
        const account = await sut.load(token)
        expect(account).toBeNull()
    })

})


