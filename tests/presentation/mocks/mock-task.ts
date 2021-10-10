import { AddTask, LoadAllTask, LoadAllTaskByUser, DeleteTaskById, UpdateTaskById } from '../../../src/domain/usecases'
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
    accountId : string
    isDelete = true
    async delete(id: string, accountId : string): Promise<Boolean>{
        this.accountId = accountId
        this.id = id
        return this.isDelete
    }

}

export class UpdateTaskByIdSpy implements UpdateTaskById{
    id : string
    accountId : string
    title : string
    content : string
    isUpdate = true
    async update(id: string, accountId : string, data : UpdateTaskById.Params): Promise<Boolean>{
        this.title = data.title
        this.content = data.content
        this.accountId = accountId
        this.id = id
        return this.isUpdate
    }

}