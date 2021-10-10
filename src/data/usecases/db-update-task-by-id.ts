import { UpdateTaskById } from '../../domain/usecases'
import { UpdateTaskRepository } from '../../../src/data/protocols/db'

export class DbUpdateTaskById implements UpdateTaskById{
    constructor(private readonly updateTaskRepository : UpdateTaskRepository){}
    async update(id: string, accountId: string , data : UpdateTaskById.Params): Promise<Boolean>{
        return await this.updateTaskRepository.update(id , accountId, data);
    }
}