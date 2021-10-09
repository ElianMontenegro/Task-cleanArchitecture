import { DbDeleteTaskById } from '../../../data/usecases'
import { TaskMongoRepository } from '../../../infra/db/mongodb'

export const makeDbDeleteTaskById = () => {
    const taskMongoRepository = new TaskMongoRepository()
    return  new DbDeleteTaskById(taskMongoRepository)
}