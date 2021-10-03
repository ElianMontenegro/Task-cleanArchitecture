import { AddTask } from '../../../src/domain/usecases'
import { mockAddTaskParams } from '../../domain/mocks'
import { CheckTaskByTitleRepository, AddTaskRepository } from '../../../src/data/protocols'
import { CheckTaskByTitleRepositorySpy, AddTaskRepositorySpy } from '../mocks'

export class DbAddTask implements AddTask {
    constructor(
        private readonly checkTaskByTitleRepository : CheckTaskByTitleRepository,
        private readonly addTaskRepository : AddTaskRepository
    ) {}
    async add (dataTask: AddTask.Params): Promise<AddTask.Result>{
        const isExist = await this.checkTaskByTitleRepository.checkByTitle(dataTask.title)
        if(!isExist){
            const account = await this.addTaskRepository.add(dataTask)
            if(account){
                return account
            }
        }
        return null
    }

}

const makeSut = () =>  {
    const addAccountRepositorySpy = new AddTaskRepositorySpy()
    const checkTaskByTitleRepositorySky = new CheckTaskByTitleRepositorySpy()
    const sut = new DbAddTask(checkTaskByTitleRepositorySky, addAccountRepositorySpy)
    return{
        sut,
        checkTaskByTitleRepositorySky,
        addAccountRepositorySpy
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

    test('Should return null if addTask not create task', async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        addAccountRepositorySpy.result = null
        const httpResponse = await sut.add(mockAddTaskParams())
        expect(httpResponse).toBeNull()
    })

})