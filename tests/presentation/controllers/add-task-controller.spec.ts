import { DataInUseError, MissingParamError } from "../../../src/presentation/errors"
import { badRequest } from "../../../src/presentation/helpers"
import { AddTaskController } from '../../../src/presentation/controller'
import { CheckTaskByTitleSpy } from '../mocks'
import { IHttpRequest } from "../../../src/presentation/protocols"

import faker from 'faker'

type TypeSub = {
    sut : AddTaskController
    httpRequest : IHttpRequest
    checkTaskByTitleSpy : CheckTaskByTitleSpy
}

const makeSut = (): TypeSub => {
    const httpRequest = {
        body : {
            title : faker.name.title(),
            content : faker.lorem.words(),
            accountId : faker.datatype.uuid()
        }
    }
    const checkTaskByTitleSpy = new CheckTaskByTitleSpy()
    const sut = new AddTaskController(checkTaskByTitleSpy)
    return {
        sut,
        httpRequest,
        checkTaskByTitleSpy
    }
}


describe('AddTaskController', () => {

    test('Should return error if title is not provided', async () =>{
        const { sut, httpRequest } = makeSut()
        httpRequest.body.title = ""       
        const response = await sut.handle(httpRequest)
        expect(response).toEqual(badRequest(new MissingParamError('title')))
    })

    test('Should return error if content is not provided', async () =>{
        const { sut, httpRequest } = makeSut()
        httpRequest.body.content = ""
        const response = await sut.handle(httpRequest)
        expect(response).toEqual(badRequest(new MissingParamError('content')))
    })

    test('Should return error if accountId is not provided', async () =>{
        const { sut, httpRequest } = makeSut()
        httpRequest.body.accountId = ""
        const response = await sut.handle(httpRequest)
        expect(response).toEqual(badRequest(new MissingParamError('accountId')))
    })    

    test('Should return error if task name is already exist', async () => {
        const { sut, httpRequest, checkTaskByTitleSpy } = makeSut()
        checkTaskByTitleSpy.result = true
        const response = await sut.handle(httpRequest)
        expect(response).toEqual(badRequest(new DataInUseError('title')))
    })

    
})