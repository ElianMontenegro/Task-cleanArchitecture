import { DbUpdateTaskById } from '../../../data/usecases'
import { TaskMongoRepository } from '../../../infra/db/mongodb'
export const makeUpdateTask = ():DbUpdateTaskById => {
    const taskMongoRepository = new TaskMongoRepository()
    return new DbUpdateTaskById(taskMongoRepository)
}