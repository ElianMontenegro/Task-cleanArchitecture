import { AddTask, LoadAllTask, LoadAllTaskByUser, DeleteTaskById } from '../../../src/domain/usecases'
import faker from 'faker'

export class AddTaskSpy implements AddTask {
    title : string 
    content : string
    accountId : string
    result = {
        insertedId : faker.datatype.uuid(),
    }
    async add(dataTask: AddTask.Params): Promise<AddTask.Result>{
        this.title = dataTask.title
        this.content = dataTask.content
        this.accountId = dataTask.accountId
        return this.result
    }
    
}

export class LoadAllTaskSpy implements LoadAllTask {
    tasks : any
    async load(): Promise<any>{
        return this.tasks
    }
}

export class LoadAllTaskByUserSpy implements LoadAllTaskByUser {
    accountId : string
    tasks : any
    async loadByUser(accountId : string): Promise<any>{
        this.accountId = accountId
        return this.tasks
    }
}

export class DeleteTaskByIdSpy implements DeleteTaskById{
    id : string
    isDelete = true
    async delete(id: string): Promise<Boolean>{
        this.id = id
        return this.isDelete
    }

}