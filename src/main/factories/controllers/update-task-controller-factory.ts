import { UpdateTaskController } from '../../../presentation/controller'
import { makeUpdateTask } from '../usecases'
export const makeUpdateTaskController = (): UpdateTaskController => {
    return new UpdateTaskController(makeUpdateTask())
}