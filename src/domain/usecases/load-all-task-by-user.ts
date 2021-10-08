
export interface LoadAllTaskByUser {
    loadByUser : (accountId : string) => Promise<LoadAllTaskByUser.Result>
}

export namespace LoadAllTaskByUser {
    export type Result = {
        id : string,
        title : string,
        content : string,
        accountId : string
    }
}
