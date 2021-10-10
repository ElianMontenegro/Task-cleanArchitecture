export interface UpdateTaskById {
    update: (id : string, accountId : string, data : UpdateTaskById.Params) => Promise<Boolean>
}

export namespace UpdateTaskById {
    export type Params = {
        title : string,
        content : string
    }
}