import { AddTask } from '../../../src/domain/usecases'
import { mockAddTaskParams } from '../../domain/mocks'
import { CheckTaskByTitleRepository } from '../../../src/data/protocols'
import { CheckTaskByTitleRepositorySpy } from '../mocks'

export class DbAddTask implements AddTask {
    constructor(private readonly checkTaskByTitleRepository : CheckTaskByTitleRepository) {}
    async add (dataTask: AddTask.Params): Promise<AddTask.Result>{
        const isExist = await this.checkTaskByTitleRepository.checkByTitle(dataTask.title)
        if(!isExist){
      
        }
        return null
    }

}

const makeSut = () =>  {
    const checkTaskByTitleRepositorySky = new CheckTaskByTitleRepositorySpy()
    const sut = new DbAddTask(checkTaskByTitleRepositorySky)
    return{
        sut,
        checkTaskByTitleRepositorySky
    }
}

describe('AddTask usecase', () => {
    test('Should Return null if checkTaskByTitle return true', async () => {
        const { sut, checkTaskByTitleRepositorySky } = makeSut()
        checkTaskByTitleRepositorySky.result = true
        const httpResponse = await sut.add(mockAddTaskParams())
        expect(httpResponse).toBeNull()
    })

    test('Should call checkTaskByTitle with correct value', async () => {
        const { sut, checkTaskByTitleRepositorySky } = makeSut()
        const AddTaskParams = mockAddTaskParams()
        await sut.add(AddTaskParams)
        expect(checkTaskByTitleRepositorySky.title).toBe(AddTaskParams.title)
    })
})