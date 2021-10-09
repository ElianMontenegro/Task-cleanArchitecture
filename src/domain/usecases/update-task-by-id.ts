export interface UpdateTaskById {
    update: (id : string, accountId : string) => Promise<Boolean>
}