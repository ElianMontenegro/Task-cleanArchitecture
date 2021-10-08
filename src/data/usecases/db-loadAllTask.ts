import { LoadAllTask } from "../../domain/usecases";
import { LoadAllTaskRepository } from '../../data/protocols'

export class DbLoadAllTask implements LoadAllTask{
    constructor(private readonly loadAllTaskRepository : LoadAllTaskRepository){}
    async load(): Promise<Array<LoadAllTask.Result>>{
        const tasks = await this.loadAllTaskRepository.loadAllTaks() 
        if(tasks.length !== 0){
            return tasks
        }
        return null
    }
}