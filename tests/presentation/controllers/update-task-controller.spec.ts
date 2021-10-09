import { UpdateTaskController } from '../../../src/presentation/controller'
import { badRequest } from '../../../src/presentation/helpers'
import { MissingParamError } from '../../../src/presentation/errors'
import { UpdateTaskByIdSpy } from '../mocks'

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
})