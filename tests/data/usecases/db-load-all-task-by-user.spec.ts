import { DbLoadAllTaskByUser } from '../../../src/data/usecases'
import { LoadAllTaskByUserRepositorySpy } from '../mocks'

const makeSut = () => {
    const loadAllTaskByUserRepositorySpy = new LoadAllTaskByUserRepositorySpy()
    const sut = new DbLoadAllTaskByUser(loadAllTaskByUserRepositorySpy)
    return {
        sut, 
        loadAllTaskByUserRepositorySpy
    }
}


describe('LoadAllTaskByUser use cases', () => {
    test('Should return null if loadAllTaskByUserRepositorySpy return null ', async () => {
        const { sut, loadAllTaskByUserRepositorySpy } = makeSut()
        loadAllTaskByUserRepositorySpy.result = null
        const tasks = await sut.loadByUser('')
        expect(tasks).toBeNull()
    })
})