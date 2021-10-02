import { CheckTaskByTitle } from '../../../src/data/protocols'

export class CheckTaskByTitleSpy implements CheckTaskByTitle{
    title : string
    result = false
    async checkByTitle(title: string): Promise<Boolean>{
        this.title = title
        return this.result
    }
}