import { Collection } from 'mongodb'
import { mongoHelper } from '.'

import { CheckTaskByTitleRepository, AddTaskRepository } from '../../../../src/data/protocols/db/task'
import { AddTask } from '../../../domain/usecases'

export class TaskRepository implements CheckTaskByTitleRepository, AddTaskRepository{
  
    taskCollection : Collection
    makeCollection = () => {
        this.taskCollection = mongoHelper.getCollection('tasks')
        return this.taskCollection
    }

    async checkByTitle(title: string): Promise<Boolean>{
        const task = await this.makeCollection().findOne({title},
        {
            projection : {
                _id : 1
            }
        })
        
        return task !== null
    }

    async add(data : AddTask.Params):  Promise<AddTask.Result>{
        const task = await this.makeCollection().insertOne(data)
        return task   
    }
    

}