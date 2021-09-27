import { LoginController } from "../../../presentation/controller"
import { makeAuthentication } from '../index'

export const makeLoginController = (): LoginController => {
    const loginController = new LoginController(makeAuthentication())
    return loginController
}