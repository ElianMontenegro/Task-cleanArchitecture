import { AddTaskController } from "../../../presentation/controller";
import { makeDbAddTask } from '../usecases'

export const makeAddTaskController = ():AddTaskController => {
    const addTaskController = new AddTaskController(makeDbAddTask())
    return addTaskController
}