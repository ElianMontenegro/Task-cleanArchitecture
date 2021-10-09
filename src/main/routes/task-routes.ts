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
    router.get('/load-all-task', AdaptRoute(makeLoadAllTaskController()))
    router.get('/load-all-task-by-user', auth, AdaptRoute(makeLoadAllTaskByUserController()))
    router.delete('/delete-task-by-id/:id', auth, AdaptRoute(makeDeleteTaskByIdController()))
}