import { DbLoadAllTaskByUser } from '../../../data/usecases'
import { TaskMongoRepository } from '../../../infra/db/mongodb'

export const makeLoadAllTaskByUser = (): DbLoadAllTaskByUser => {
    const taskMongoRepository = new TaskMongoRepository()
    const loadAllTaskByUser = new DbLoadAllTaskByUser(taskMongoRepository)
    return loadAllTaskByUser
}