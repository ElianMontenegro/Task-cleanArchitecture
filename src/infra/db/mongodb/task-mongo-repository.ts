import { Collection, ObjectId } from 'mongodb'
import { mongoHelper } from '.'
import { 
    CheckTaskByTitleRepository, 
    AddTaskRepository, 
    LoadAllTaskRepository, 
    LoadAllTaskByUserRepository, 
    DeleteTaskByIdRepository,
    UpdateTaskRepository
} 
from '../../../../src/data/protocols/db/task'

import { AddTask, UpdateTaskById } from '../../../domain/usecases'

export class TaskMongoRepository implements CheckTaskByTitleRepository, 
                                            AddTaskRepository, 
                                            LoadAllTaskRepository, 
                                            LoadAllTaskByUserRepository,
                                            DeleteTaskByIdRepository, 
                                            UpdateTaskRepository{
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

    async delete(id: string, accountId : string): Promise<Boolean>{
        const tasks = await this.makeCollection().deleteOne({"_id": new ObjectId(id), accountId : accountId})
        if(tasks.deletedCount === 1){
            return true
        }
        return false
    }

    async update(id: string, accountId : string, data : UpdateTaskById.Params): Promise<Boolean>{
        const tasks = await this.makeCollection().findOneAndUpdate({ _id : id, accountId : accountId }, data)
        console.log(tasks);
        
        if(tasks.ok === 1){
            return true
        }
        return false
    }
}