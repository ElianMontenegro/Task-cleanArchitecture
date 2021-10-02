export interface CheckTaskByTitle {
    checkByTitle: (title : string) => Promise<Boolean>
}