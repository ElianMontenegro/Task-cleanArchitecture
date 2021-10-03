import { AddTask } from '../../../../domain/usecases'

export interface AddTaskRepository {
    add: (data : AddTaskRepository.Params) => Promise<AddTaskRepository.Result>
}

export namespace AddTaskRepository {
    export type Params = AddTask.Params
    export type Result = AddTask.Result
}