export interface AddTask {
    add: (dataTask : AddTask.Params) => Promise<AddTask.Result>
}

export namespace AddTask {
    export type Params = {
        title : string,
        content : string,
        accountId : string
    }
    export type Result = {
        insertedId : any
    }
}