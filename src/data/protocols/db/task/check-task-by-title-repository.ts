export interface CheckTaskByTitleRepository {
    checkByTitle: (title : string) => Promise<Boolean>
}