import { LoadAllTaskByUser } from "../../../../domain/usecases";

export interface LoadAllTaskByUserRepository {
    loadAllTaksByUser: (id : string) => Promise<Array<LoadAllTaskByUser.Result>>
}