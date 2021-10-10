import { DeleteTaskByIdController } from '../../../presentation/controller'
import { makeDbDeleteTaskById } from '../usecases'
export const makeDeleteTaskByIdController = () : DeleteTaskByIdController => {
    return new DeleteTaskByIdController(makeDbDeleteTaskById())
}