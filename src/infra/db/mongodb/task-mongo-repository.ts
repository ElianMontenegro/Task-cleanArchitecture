import { Collection } from 'mongodb'
import { mongoHelper } from '.'

import { CheckTaskByTitleRepository } from '../../../../src/data/protocols/db/task'

export class TaskRepository implements CheckTaskByTitleRepository{
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

}