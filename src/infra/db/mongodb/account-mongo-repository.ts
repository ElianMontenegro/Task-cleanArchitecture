import { mongoHelper } from '.'
import { CheckAccountByEmailRepository } from '../../../data/protocols'

export class AccountMongoRepository implements CheckAccountByEmailRepository{
    async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result>{
        const accountCollection = mongoHelper.getCollection('accounts') 
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