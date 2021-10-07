import { Router } from "express";
import { AdaptRoute } from "../adapters/express-route-adapter";
import { makeAddTaskController, makeLoadAllTaskController } from "../factories";
import { auth } from "../middlewares";


export default (router : Router): void => {
    router.post('/add-task', auth, AdaptRoute(makeAddTaskController()))
    router.get('/load-all-task', AdaptRoute(makeLoadAllTaskController()))
}