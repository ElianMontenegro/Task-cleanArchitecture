import { Router } from "express";
import { AdaptRoute } from "../adapters/express-route-adapter";
import { 
    makeAddTaskController, 
    makeLoadAllTaskController, 
    makeLoadAllTaskByUserController,
    makeDeleteTaskByIdController
} from "../factories";
import { auth } from "../middlewares";


export default (router : Router): void => {
    router.post('/add-task', auth, AdaptRoute(makeAddTaskController()))
    router.get('/all-task', AdaptRoute(makeLoadAllTaskController()))
    router.get('/tasks', auth, AdaptRoute(makeLoadAllTaskByUserController()))
    router.delete('/task/:id', auth, AdaptRoute(makeDeleteTaskByIdController()))
}