
export interface DeleteTaskById {
    delete: (id : string, accountId : string) => Promise<Boolean>
}