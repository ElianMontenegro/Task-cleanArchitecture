import { LoadAllTaskByUserController } from '../../../src/presentation/controller'
import { notFound, ok, serverError } from '../../../src/presentation/helpers'
import { LoadAllTaskByUserSpy, throwError } from '../mocks' 
import { mockLoadAllTaskResult } from '../../domain/mocks'
import faker from 'faker'

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

    test('Should call loadAllTaskByUser with correct values', async () => {
        const { sut, loadAllTaskByUserSpy} = makeSut()
        const httpRequest = {accountId : faker.datatype.uuid()}
        await sut.handle(httpRequest)
        expect(loadAllTaskByUserSpy.accountId).toEqual(httpRequest.accountId)
    })

    test('Should return a tasks if loadAllTaskByUser return a tasks', async () => {
        const { sut, loadAllTaskByUserSpy } = makeSut()
        const loadAllTaskResult = mockLoadAllTaskResult()
        loadAllTaskByUserSpy.tasks = loadAllTaskResult
        const httpResponse = await sut.handle({accountId : ''})
        expect(httpResponse).toEqual(ok(loadAllTaskResult))
    })

    test('Should return 500 if loadAllTaskByUserSpy throw error', async () => {
        const { sut, loadAllTaskByUserSpy } = makeSut()
        jest.spyOn(loadAllTaskByUserSpy, 'loadByUser').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({accountId : ''})
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})