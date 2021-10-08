
export interface LoadAllTaskByUserRepository {
    loadAllTaksByUser: (id : string) => Promise<any>
}