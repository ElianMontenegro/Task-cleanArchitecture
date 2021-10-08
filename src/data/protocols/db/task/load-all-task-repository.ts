import { LoadAllTask } from "../../../../domain/usecases";

export interface LoadAllTaskRepository {
    loadAllTaks: () => Promise<Array<LoadAllTask.Result>>
}