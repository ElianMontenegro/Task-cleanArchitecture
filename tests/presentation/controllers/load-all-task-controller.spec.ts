import { LoadAllTaskSpy } from '../mocks/mock-task'
import { LoadAllTaskController } from '../../../src/presentation/controller'
import { notFound, ok, serverError } from '../../../src/presentation/helpers'
import { throwError } from '../mocks' 
import faker from 'faker'

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

    test('Should return 200 if there are tasks' , async () => {
        const { sut, loadAllTaskSpy } = makeSut()
        loadAllTaskSpy.tasks = {tasks : [
            {
                id : faker.datatype.uuid(),
                title : faker.name.title(),
                content : faker.random.words(10),
                accountId: faker.datatype.uuid()
            }
        ]}
        const response  = await sut.handle({})
        expect(response).toEqual(ok(loadAllTaskSpy.tasks))
    })

    test('Should return 500 loadAllTaskSpy throw error' , async () => {
        const { sut, loadAllTaskSpy } = makeSut()
        jest.spyOn(loadAllTaskSpy, 'load').mockImplementationOnce(throwError)
        const response  = await sut.handle({})
        expect(response).toEqual(serverError(new Error()))
    })
})