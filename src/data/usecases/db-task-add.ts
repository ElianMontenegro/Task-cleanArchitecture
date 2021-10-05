import { AddTask } from "../../domain/usecases"
import { AddTaskRepository, CheckTaskByTitleRepository } from "../protocols"


export class DbAddTask implements AddTask {
    constructor(
        private readonly checkTaskByTitleRepository : CheckTaskByTitleRepository,
        private readonly addTaskRepository : AddTaskRepository
    ) {}
    async add (dataTask: AddTask.Params): Promise<AddTask.Result>{
        const isExist = await this.checkTaskByTitleRepository.checkByTitle(dataTask.title)
        if(!isExist){
            const account = await this.addTaskRepository.add(dataTask)
            if(account){
                return account
            }
        }
        return null
    }

}