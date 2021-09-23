import { mongoHelper } from '../../../../src/infra/db/mongodb';
import { mockAddAccountParams } from '../../../domain/mocks/mock-account'
import { CheckAccountByEmailRepository } from '../../../../src/data/protocols'
import { Collection } from 'mongodb'

export class AccountMongoRepository implements CheckAccountByEmailRepository{
    async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result>{
        accountCollection = mongoHelper.getCollection('accounts') 
        const account = await accountCollection.findOne({
            email
        },{
            projection: {
                _id : 1,
                username : 1,
                password : 1
            }
        })
        return account !== null
    }

    
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


    test('Should return true if email exist in database', async ()=> {
        const sut = new AccountMongoRepository();
        const accountParams = mockAddAccountParams()
        await accountCollection.insertOne(accountParams)
        const isValid = await sut.checkByEmail(accountParams.email)
        expect(isValid).toBe(true)
    })
})