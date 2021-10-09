import { CheckTaskByTitleRepository, AddTaskRepository, LoadAllTaskRepository, LoadAllTaskByUserRepository, DeleteTaskByIdRepository } from '../../../src/data/protocols'
import { AddTask } from '../../../src/domain/usecases'
import { mockLoadAllTaskResult } from '../../domain/mocks'
import faker from 'faker'


export class CheckTaskByTitleRepositorySpy implements CheckTaskByTitleRepository {
    title : string
    result = false
    async checkByTitle (title: string): Promise<Boolean>{
        this.title = title
        return this.result
    }
}

export class AddTaskRepositorySpy implements AddTaskRepository{
    title : string
    content : string
    accountId : string
    result = {
        insertedId: faker.datatype.uuid()
    }
    async add(data: AddTask.Params): Promise<AddTask.Result>{
        this.title = data.title
        this.content = data.content
        this.accountId = data.accountId

        return this.result
    }
    
}

export class LoadAllTaskRepositorySpy implements LoadAllTaskRepository{
    result = mockLoadAllTaskResult()
    async loadAllTaks(): Promise<any>{
        return this.result
    }
}

export class LoadAllTaskByUserRepositorySpy implements LoadAllTaskByUserRepository{
    id : string
    result = mockLoadAllTaskResult()
    async loadAllTaksByUser(id : string): Promise<any>{
        this.id = id
        return this.result
    }
}

export class DeleteTaskByIdRepositorySpy implements DeleteTaskByIdRepository{
    id : string
    result = true
    async delete(id: string): Promise<boolean>{
        this.id = id
        return this.result
    }

}

