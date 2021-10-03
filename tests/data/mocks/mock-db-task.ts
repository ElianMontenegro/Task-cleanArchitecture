import { CheckTaskByTitleRepository } from '../../../src/data/protocols'

export class CheckTaskByTitleRepositorySpy implements CheckTaskByTitleRepository {
    title : string
    result = false
    async checkByTitle (title: string): Promise<Boolean>{
        this.title = title
        return this.result
    }
}