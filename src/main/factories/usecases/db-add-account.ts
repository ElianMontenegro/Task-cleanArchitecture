import { DbAddAccount } from "../../../data/usecases"
import { BcrypterAdapter } from "../../../infra/cryptography"
import { AccountMongoRepository } from "../../../infra/db/mongodb"

export const makeAddAccount = (): DbAddAccount => {
    const salt = 10
    const accountMongoRepository = new  AccountMongoRepository()
    const bcrypterAdapter = new BcrypterAdapter(salt)
    const dbAddAccount = new DbAddAccount(bcrypterAdapter, accountMongoRepository, accountMongoRepository)
    return dbAddAccount
}