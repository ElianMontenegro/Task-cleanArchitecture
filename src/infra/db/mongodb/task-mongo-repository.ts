import { Collection } from 'mongodb'
import { mongoHelper } from '.'

import { CheckTaskByTitleRepository, AddTaskRepository, LoadAllTaskRepository } from '../../../../src/data/protocols/db/task'
import { AddTask } from '../../../domain/usecases'

export class TaskRepository implements CheckTaskByTitleRepository, AddTaskRepository, LoadAllTaskRepository{
    
  
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

    async add(data : AddTask.Params): Promise<AddTask.Result>{
        const task = await this.makeCollection().insertOne(data)
        return task
   
    }

    async loadAllTaks (): Promise<any>{
        const tasks = await this.makeCollection().find({}).toArray()
        return tasks
    }
    

}