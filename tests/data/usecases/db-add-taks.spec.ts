import { DbAddTask } from '../../../src/data/usecases'
import { mockAddTaskParams } from '../../domain/mocks'
import { CheckTaskByTitleRepositorySpy, AddTaskRepositorySpy } from '../mocks'
import { throwError } from '../../presentation/mocks'



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

    test('Should return a task if addTask on success', async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        const httpResponse = await sut.add(mockAddTaskParams())
        expect(addAccountRepositorySpy.result).toEqual({
            insertedId : httpResponse.insertedId,
        })
    })

    test('Should throw error if addAccountRepositorySpy throw error', async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddTaskParams())
        await expect(promise).rejects.toThrowError()
    })

})