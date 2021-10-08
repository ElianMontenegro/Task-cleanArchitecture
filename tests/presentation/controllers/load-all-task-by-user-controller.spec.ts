import { LoadAllTaskByUserController } from '../../../src/presentation/controller'
import { notFound } from '../../../src/presentation/helpers'
import { LoadAllTaskByUserSpy } from '../mocks' 

const makeSut = () => {
    const loadAllTaskByUserSpy = new LoadAllTaskByUserSpy()
    const sut = new LoadAllTaskByUserController(loadAllTaskByUserSpy)
    return {
        sut,
        loadAllTaskByUserSpy
    }
}

describe('LoadAllTaskByUserController', () => {
    test('Should return null if loadAllTaskByUser return null', async () => {
        const { sut, loadAllTaskByUserSpy } = makeSut()
        loadAllTaskByUserSpy.tasks = null
        const httpResponse = await sut.handle({accountId : ''})
        expect(httpResponse).toEqual(notFound(new Error('there are not tasks')))
    })
})