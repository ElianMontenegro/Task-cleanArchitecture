import { LoadAllTask } from "../../domain/usecases";
import { LoadAllTaskRepository } from '../../data/protocols'

export class DbLoadAllTask implements LoadAllTask{
    constructor(private readonly loadAllTaskRepository : LoadAllTaskRepository){}
    async load(): Promise<any>{
        const tasks = this.loadAllTaskRepository.loadAllTaks() 
        if(tasks){
            return tasks
        }
        return null
    }
}