import { AddTask } from '../../../src/domain/usecases'
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