import { CheckTaskByTitle, AddTask } from '../../../src/data/protocols'
import faker from 'faker'
export class CheckTaskByTitleSpy implements CheckTaskByTitle{
    title : string
    result = false
    async checkByTitle(title: string): Promise<Boolean>{
        this.title = title
        return this.result
    }
}

export class AddTaskSpy implements AddTask {
    title : string 
    content : string
    accountId : string
    result = {
        id : faker.datatype.uuid(),
        title : faker.name.title(),
        content : faker.lorem.words(),
        accountId : faker.datatype.uuid()
    }
    async add(dataTask: AddTask.Params): Promise<AddTask.Result>{
        this.title = dataTask.title
        this.content = dataTask.content
        this.accountId = dataTask.accountId
        return this.result
    }
    
}