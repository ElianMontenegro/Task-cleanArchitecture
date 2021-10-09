
export interface DeleteTaskById {
    delete: (id : string) => Promise<Boolean>
}