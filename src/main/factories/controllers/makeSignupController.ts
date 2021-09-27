import { SignUpController } from "../../../presentation/controller"
import { makeAuthentication, makeAddAccount } from '../usecases'

export const makeSignupController = (): SignUpController => {
    const signUpController = new SignUpController(makeAddAccount(), makeAuthentication())
    return signUpController
}