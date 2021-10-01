export interface LoadAccountIdByToken {
    load: (accessToken : string) => Promise<LoadAccountIdByToken.Result>
}

export namespace LoadAccountIdByToken {
    export type Result = {
        id : string
    }
}