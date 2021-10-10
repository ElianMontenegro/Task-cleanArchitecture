import { DbLoadAllTask } from '../../../src/data/usecases'
import { LoadAllTaskRepositorySpy } from '../mocks'
import { mockLoadAllTaskResult } from '../../domain/mocks'
import { throwError } from '../../presentation/mocks'

const makeSut = () => {
    const loadAllTaskRepositorySpy = new LoadAllTaskRepositorySpy()
    const sut = new DbLoadAllTask(loadAllTaskRepositorySpy)
    return {
        sut, 
        loadAllTaskRepositorySpy
    }
}


describe('LoadAllTask use cases', () => {
    test('Should return null if LoadAllTaskRepositorySpy return null', async () => {
        const { sut, loadAllTaskRepositorySpy } = makeSut()
        loadAllTaskRepositorySpy.result = []
        const tasks = await sut.load()
        expect(tasks).toBeNull()
    })

    test('Should return a tasks if LoadAllTaskRepositorySpy return a tasks', async () => {
        const { sut, loadAllTaskRepositorySpy } = makeSut()
        const loadAllTaskResult = mockLoadAllTaskResult()
        loadAllTaskRepositorySpy.result = loadAllTaskResult
        const tasks = await sut.load()
        expect(tasks).toEqual(loadAllTaskResult)
    })

    test('Should throw error LoadAllTaskRepositorySpy throw error', async () => {
        const { sut, loadAllTaskRepositorySpy } = makeSut()
        jest.spyOn(loadAllTaskRepositorySpy, 'loadAllTaks').mockImplementationOnce(throwError)
        const tasks = sut.load()
        await expect(tasks).rejects.toThrowError()
    })
})