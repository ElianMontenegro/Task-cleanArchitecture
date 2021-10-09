import { UpdateTaskController } from '../../../src/presentation/controller'
import { badRequest } from '../../../src/presentation/helpers'
import { MissingParamError } from '../../../src/presentation/errors'

import faker from 'faker'
const makeSut = () => {
    const httpRequest = {
        params : { id : faker.datatype.uuid() },
        accountId : faker.datatype.uuid()
    }
    const sut = new UpdateTaskController()
    return {
        sut,
        httpRequest
    }
}

describe('UpdateTaskController', () => {
    test('Should return error if id is not provided', async () => {
        const { sut, httpRequest } = makeSut()
        httpRequest.params.id = ''
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
   })
})