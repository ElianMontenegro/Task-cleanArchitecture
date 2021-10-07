import { LoadAllTaskSpy } from '../mocks/mock-task'
import { LoadAllTaskController } from '../../../src/presentation/controller'
import { notFound } from '../../../src/presentation/helpers'

const makeSut = () => {
    const loadAllTaskSpy = new LoadAllTaskSpy()
    const sut = new LoadAllTaskController(loadAllTaskSpy)

    return {
        sut,
        loadAllTaskSpy
    }
}


describe('LoadAllTaskController', () => {
    test('Should return 404 tasks not found' , async () => {
        const { sut, loadAllTaskSpy } = makeSut()
        loadAllTaskSpy.tasks = null
        const response  = await sut.handle({})
        expect(response).toEqual(notFound(new Error('there are not tasks')))
    })
})