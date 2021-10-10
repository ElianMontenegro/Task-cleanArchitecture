import { UpdateTaskById } from '../../../../domain/usecases'
export interface UpdateTaskRepository {
    update: (id : string, accountId : string,  data : UpdateTaskById.Params) => Promise<Boolean>
}

