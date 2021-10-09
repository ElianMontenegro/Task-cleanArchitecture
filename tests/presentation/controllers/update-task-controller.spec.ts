import { UpdateTaskController } from '../../../src/presentation/controller'
import { badRequest, notFound, ok, serverError } from '../../../src/presentation/helpers'
import { MissingParamError } from '../../../src/presentation/errors'
import { throwError, UpdateTaskByIdSpy } from '../mocks'

import faker from 'faker'
const makeSut = () => {
    const httpRequest = {
        params : { id : faker.datatype.uuid() },
        accountId : faker.datatype.uuid()
    }
    const updateTaskByIdSpy = new UpdateTaskByIdSpy()
    const sut = new UpdateTaskController(updateTaskByIdSpy)
    return {
        sut,
        httpRequest,
        updateTaskByIdSpy
    }
}

describe('UpdateTaskController', () => {
    test('Should return error if id is not provided', async () => {
        const { sut, httpRequest } = makeSut()
        httpRequest.params.id = ''
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })

    test('Should call updateTaskByIdSpy with correct values', async () => {
        const { sut, httpRequest, updateTaskByIdSpy } = makeSut()
        await sut.handle(httpRequest)
        expect(updateTaskByIdSpy.id).toEqual(httpRequest.params.id)
        expect(updateTaskByIdSpy.accountId).toEqual(httpRequest.accountId)
    })

    test('Should throw error if updateTaskByIdSpy throw error', async () => {
        const { sut, httpRequest, updateTaskByIdSpy } = makeSut()
        jest.spyOn(updateTaskByIdSpy, 'update').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return not found if updateTaskByIdSpy return false', async () => {
        const { sut, httpRequest, updateTaskByIdSpy } = makeSut()
        updateTaskByIdSpy.isUpdate = false
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(notFound(new Error('tasks not found')))
    })

    test('Should return ok if updateTaskByIdSpy return true', async () => {
        const { sut, httpRequest, updateTaskByIdSpy } = makeSut()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toEqual(ok(httpResponse).statusCode)
    })
})