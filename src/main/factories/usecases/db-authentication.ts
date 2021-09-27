import { DbAuthentication } from "../../../data/usecases/db-authentication"
import { JwtAdapter, BcrypterAdapter } from "../../../infra/cryptography"
import { AccountMongoRepository } from "../../../infra/db/mongodb"

export const makeAuthentication = (): DbAuthentication => {
    const salt = 10;
    const bcrypterAdapter = new BcrypterAdapter(salt)
    const jwtAdapter = new JwtAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    const authentication = new DbAuthentication(accountMongoRepository, bcrypterAdapter, jwtAdapter, jwtAdapter)
    return authentication
}