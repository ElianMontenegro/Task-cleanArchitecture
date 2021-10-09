import { badRequest, ok } from '../../../src/presentation/helpers/http-helpers'
import { MissingParamError } from '../../../src/presentation/errors'
import { DeleteTaskByIdController } from '../../../src/presentation/controller'
import { DeleteTaskByIdSpy } from '../mocks'
import faker from 'faker'

const makeSut = () => {
    const httpRequest = {
        params : { id : faker.datatype.uuid() }
    }
    const deleteTaskByIdSpy = new DeleteTaskByIdSpy()
    const sut = new DeleteTaskByIdController(deleteTaskByIdSpy)
    return  {
        sut,
        httpRequest,
        deleteTaskByIdSpy
    }
}

describe(' DeleteTaskById ', () => {
    test('Should return if id is not provided', async () => {
        const { sut, httpRequest } = makeSut()
        httpRequest.params.id = ''
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
    })

    test('Should call deleteTaskByIdSpy with coorect param', async () => {
        const { sut, httpRequest, deleteTaskByIdSpy } = makeSut()
        await sut.handle(httpRequest)
        expect(deleteTaskByIdSpy.id).toEqual(httpRequest.params.id)
    })

    test('Should return 200 deleteTaskByIdSpy if task was delete', async () => {
        const { sut, httpRequest, deleteTaskByIdSpy } = makeSut()
        const httpResponses = await sut.handle(httpRequest)
        expect(httpResponses.statusCode).toEqual(ok(httpResponses).statusCode)
    })

})