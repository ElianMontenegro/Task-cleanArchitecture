import { AuthMiddleware } from "../../../presentation/middleware";
import { Middleware } from "../../../presentation/protocols";
import { makeLoadAccountIdByToken } from '../usecases'

export const makeAuthMiddleware = (): Middleware => {
    return new AuthMiddleware(makeLoadAccountIdByToken())
}


