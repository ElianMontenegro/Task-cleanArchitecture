import { LoadAllTaskByUser } from '../../domain/usecases'
import { LoadAllTaskByUserRepository } from '../protocols'

export class DbLoadAllTaskByUser implements LoadAllTaskByUser{
    constructor (private readonly loadAllTaskByUserRepository : LoadAllTaskByUserRepository){}
    async loadByUser(accountId: string): Promise<LoadAllTaskByUser.Result>{
        const tasks = await this.loadAllTaskByUserRepository.loadAllTaksByUser(accountId)
        if(tasks){
            return tasks
        }
        return null
    }
}