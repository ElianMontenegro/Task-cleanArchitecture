
export interface DeleteTaskByIdRepository {
    delete: (id : string) => Promise<Boolean>
}