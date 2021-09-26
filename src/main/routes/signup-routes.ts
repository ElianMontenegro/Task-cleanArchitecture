import { Router } from "express";
import { AdaptRoute } from "../adapters/express-route-adapter";
import { makeLoginController, makeSignupController } from "../factories";


export default (router : Router): void => {
    router.post('login', AdaptRoute(makeLoginController()))
    router.post('signup', AdaptRoute(makeSignupController()))
}