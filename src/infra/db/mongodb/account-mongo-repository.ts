import { Collection } from 'mongodb'
import { mongoHelper } from '.'
import { CheckAccountByEmailRepository, LoadAccountByEmailRepository, AddAccountRepository } from '../../../data/protocols'
import { AddAccount } from '../../../domain/usecases'

export class AccountMongoRepository implements CheckAccountByEmailRepository, LoadAccountByEmailRepository, AddAccountRepository{
  
    accountCollection : Collection
    makeCollection = () =>{
        this.accountCollection = mongoHelper.getCollection('accounts')
        return  this.accountCollection
    }

    async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result>{
        const account = await this.makeCollection().findOne({
            email
        },{
            projection: {
                _id: 1
            }
        })
        return account !== null
    }

    async load(email: string): Promise<LoadAccountByEmailRepository.Result>{
        const account = await this.makeCollection().findOne({
            email
        },{
            projection: {
                _id : 1,
                username : 1,
                password : 1
            }
        })
        return {
            id : account._id,
            username : account.username,
            password : account.password
        }
    }

    async add (data: AddAccount.Params): Promise<AddAccount.Result>{
        const account = await this.makeCollection().insertOne(data)
        return account.insertedId !== null
    }
} 