export interface UpdateTaskRepository {
    update: (id : string, accountId : string) => Promise<Boolean>
}