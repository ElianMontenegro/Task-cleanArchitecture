import { mongoHelper, AccountMongoRepository } from '../../../../src/infra/db/mongodb';
import { mockAddAccountParams } from '../../../domain/mocks/mock-account'
import { Collection } from 'mongodb'
import faker from 'faker';


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
            const sut = new AccountMongoRepository();
            const accountParams = mockAddAccountParams()
            await accountCollection.insertOne(accountParams)
            const isValid = await sut.checkByEmail(accountParams.email)
            expect(isValid).toBe(true)
        })

        test('Should return true if email exist in database', async ()=> {
            const sut = new AccountMongoRepository();
            const isValid = await sut.checkByEmail(faker.internet.email())
            expect(isValid).toBe(false)
        })

    })
   
})