import { mongoHelper, AccountMongoRepository } from '../../../../src/infra/db/mongodb';
import { mockAddAccountParams } from '../../../domain/mocks/mock-account'
import { Collection } from 'mongodb'
import faker from 'faker';


const makeSut = () => {
    return new AccountMongoRepository();
}


let accountCollection : Collection
describe('AccountRepository', () => {
    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL)
    })

    beforeEach(async () => {
        accountCollection = mongoHelper.getCollection('accounts')
        accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })

    describe('checkByEmail()', () => {

        test('Should return true if email exist in database', async ()=> {
            const sut = makeSut()
            const accountParams = mockAddAccountParams()
            await accountCollection.insertOne(accountParams)
            const isValid = await sut.checkByEmail(accountParams.email)
            expect(isValid).toBe(true)
        })

        test('Should return true if email exist in database', async ()=> {
            const sut = makeSut()
            const isValid = await sut.checkByEmail(faker.internet.email())
            expect(isValid).toBe(false)
        })

    })

    
    describe('load()', () => {

        test('Should return an account on success', async ()=> {
            const sut = makeSut()
            const accountParams = mockAddAccountParams()
            await accountCollection.insertOne(accountParams)
            const account = await sut.load(accountParams.email)
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.username).toBe(accountParams.username)
            expect(account.password).toBe(accountParams.password)
        })

    })

    describe('add()', () => {

        test('Should return true if account was success create', async ()=> {
            const sut = makeSut()
            const isValid = await sut.add(mockAddAccountParams())
            expect(isValid).toBe(true)
        })

    })
   
})