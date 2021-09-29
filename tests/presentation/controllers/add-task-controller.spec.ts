import { MissingParamError } from "../../../src/presentation/errors"
import { badRequest } from "../../../src/presentation/helpers"
import { AddTaskController } from '../../../src/presentation/controller'
import faker from 'faker'

const makeSut = () => {
    const httpRequest = {
        body : {
            title : faker.name.title(),
            content : faker.lorem.words()
        }
    }
    const sut = new AddTaskController()
    return {
        sut,
        httpRequest
    }
}


describe('AddTaskController', () => {
    test('Should return error if title is not provided', async () =>{
        const { sut, httpRequest } = makeSut()
        httpRequest.body.title = ""       
        const res = await sut.handle(httpRequest)
        expect(res).toEqual(badRequest(new MissingParamError('title')))
    })

    test('Should return error if content is not provided', async () =>{
        const { sut, httpRequest } = makeSut()
        httpRequest.body.content = ""
        const res = await sut.handle(httpRequest)
        expect(res).toEqual(badRequest(new MissingParamError('content')))
    })
})