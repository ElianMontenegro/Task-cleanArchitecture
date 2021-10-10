import { Router } from "express";
import { AdaptRoute } from "../adapters/express-route-adapter";
import { 
    makeAddTaskController, 
    makeLoadAllTaskController, 
    makeLoadAllTaskByUserController,
    makeDeleteTaskByIdController,
    makeUpdateTaskController
} from "../factories";
import { auth } from "../middlewares";


export default (router : Router): void => {
    router.post('/add-task', auth, AdaptRoute(makeAddTaskController()))
    router.get('/all-task', AdaptRoute(makeLoadAllTaskController()))
    router.get('/tasks', auth, AdaptRoute(makeLoadAllTaskByUserController()))
    router.delete('/delete-task/:id', auth, AdaptRoute(makeDeleteTaskByIdController()))
    router.put('/update-task/:id', auth, AdaptRoute(makeUpdateTaskController()))
}