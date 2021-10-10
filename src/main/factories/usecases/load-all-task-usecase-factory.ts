import { DbLoadAllTask } from "../../../data/usecases"
import { TaskMongoRepository } from "../../../infra/db/mongodb"


export const makeLoadAllTask = () => {
    const taskMongoRepository = new TaskMongoRepository()
    const loadAllTask = new DbLoadAllTask(taskMongoRepository)
    return loadAllTask
}