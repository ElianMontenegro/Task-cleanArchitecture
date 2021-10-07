import { DbLoadAllTask } from '../../../src/data/usecases'
import { LoadAllTaskRepositorySpy } from '../mocks'
 import { mockLoadAllTaskResult } from '../../domain/mocks'

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
        loadAllTaskRepositorySpy.result = null
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
})