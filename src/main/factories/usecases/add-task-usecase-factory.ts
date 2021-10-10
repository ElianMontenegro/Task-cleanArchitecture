import { DbAddTask } from "../../../data/usecases"
import { TaskMongoRepository } from '../../../infra/db/mongodb'

export const makeDbAddTask = (): DbAddTask => {
    const taskRepository = new TaskMongoRepository()
    const addTask = new DbAddTask(taskRepository, taskRepository)
    return addTask
}