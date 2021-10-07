import { LoadAllTaskController } from "../../../presentation/controller"
import { makeLoadAllTask } from '../usecases'

export const makeLoadAllTaskController = () => {
    const loadAllTaskController = new LoadAllTaskController(makeLoadAllTask())
    return loadAllTaskController
}