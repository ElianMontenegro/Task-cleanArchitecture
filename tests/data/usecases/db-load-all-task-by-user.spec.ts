import { DbLoadAllTaskByUser } from '../../../src/data/usecases'
import { mockLoadAllTaskResult } from '../../domain/mocks'
import { LoadAllTaskByUserRepositorySpy } from '../mocks'
import faker from 'faker'
const makeSut = () => {
    const id = faker.datatype.uuid()
    const loadAllTaskByUserRepositorySpy = new LoadAllTaskByUserRepositorySpy()
    const sut = new DbLoadAllTaskByUser(loadAllTaskByUserRepositorySpy)
    return {
        sut, 
        loadAllTaskByUserRepositorySpy,
        id
    }
}


describe('LoadAllTaskByUser use cases', () => {
    test('Should return null if loadAllTaskByUserRepositorySpy return null', async () => {
        const { sut, loadAllTaskByUserRepositorySpy, id } = makeSut()
        loadAllTaskByUserRepositorySpy.result = null
        const tasks = await sut.loadByUser(id)
        expect(tasks).toBeNull()
    })

    test('Should return a tasks if LoadAllTaskRepositorySpy return a tasks', async () => {
        const { sut, loadAllTaskByUserRepositorySpy, id } = makeSut()
        const loadAllTaskResult = mockLoadAllTaskResult()
        loadAllTaskByUserRepositorySpy.result = loadAllTaskResult
        const tasks = await sut.loadByUser(id)
        expect(tasks).toEqual(loadAllTaskResult)
    })
})