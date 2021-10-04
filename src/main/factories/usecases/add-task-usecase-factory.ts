import { DbAddTask } from "../../../data/usecases"
import { TaskRepository } from '../../../infra/db/mongodb'

export const makeDbAddTask = (): DbAddTask => {
    const taskRepository = new TaskRepository()
    const addTask = new DbAddTask(taskRepository, taskRepository)
    return addTask
}