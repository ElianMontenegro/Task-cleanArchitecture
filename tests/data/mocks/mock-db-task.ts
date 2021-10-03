import { CheckTaskByTitleRepository, AddTaskRepository } from '../../../src/data/protocols'
import { AddTask } from '../../../src/domain/usecases'
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
        id: faker.datatype.uuid(),
        title: faker.name.title(),
        content: faker.lorem.words(),
        accountId : faker.datatype.uuid()
    }
    async add(data: AddTask.Params): Promise<AddTask.Result>{
        this.title = data.title
        this.content = data.content
        this.accountId = data.accountId

        return this.result
    }
    
}