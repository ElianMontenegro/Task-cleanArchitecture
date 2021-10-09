import { Collection } from 'mongodb'
import { mongoHelper } from '.'
import { 
    CheckTaskByTitleRepository, 
    AddTaskRepository, 
    LoadAllTaskRepository, 
    LoadAllTaskByUserRepository, 
    DeleteTaskByIdRepository 
} 
from '../../../../src/data/protocols/db/task'

import { AddTask } from '../../../domain/usecases'

export class TaskMongoRepository implements CheckTaskByTitleRepository, 
                                            AddTaskRepository, 
                                            LoadAllTaskRepository, 
                                            LoadAllTaskByUserRepository,
                                            DeleteTaskByIdRepository
                                            {
   
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
    
    async loadAllTaksByUser (id: string):  Promise<any>{
        const tasks = await this.makeCollection().find({accountId : id}).toArray()
        return tasks
    }

    async delete(id: string): Promise<Boolean>{
        const tasks = await this.makeCollection().deleteOne({ _id : id})
        if(tasks.deletedCount === 1){
            return true
        }
        return false
    }

}