import { LoadAllTaskByUserController } from '../../../presentation/controller'
import { makeLoadAllTaskByUser } from '../usecases'

export const makeLoadAllTaskByUserController = () : LoadAllTaskByUserController => {
    const loadAllTaskByUserController = new LoadAllTaskByUserController(makeLoadAllTaskByUser())
    return loadAllTaskByUserController
}