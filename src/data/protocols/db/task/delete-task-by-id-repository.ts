
export interface DeleteTaskByIdRepository {
    delete: (id : string, accountId : string) => Promise<Boolean>
}