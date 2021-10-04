import { LoadAccountByToken } from "../../../data/usecases";
import { LoadAccountIdByToken } from "../../../domain/usecases";
import { JwtAdapter } from "../../../infra/cryptography";


export const makeLoadAccountIdByToken = (): LoadAccountIdByToken => {
    const jwtAdapter = new JwtAdapter()
    return new LoadAccountByToken(jwtAdapter)
}