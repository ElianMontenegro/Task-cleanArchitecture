export interface LoadAllTask {
    load : () => Promise<LoadAllTask.Result>
}

export namespace LoadAllTask {
    export type Result = {
        id : string,
        title : string,
        content : string,
        accountId : string
    }
}
