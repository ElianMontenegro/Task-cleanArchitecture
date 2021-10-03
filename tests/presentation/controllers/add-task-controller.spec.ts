import { DataInUseError, MissingParamError } from "../../../src/presentation/errors"
import { badRequest, ok } from "../../../src/presentation/helpers"
import { AddTaskController } from '../../../src/presentation/controller'
import { CheckTaskByTitleSpy, AddTaskSpy } from '../mocks'
import { IHttpRequest } from "../../../src/presentation/protocols"

import faker from 'faker'

type TypeSub = {
    sut : AddTaskController
    httpRequest : IHttpRequest
    checkTaskByTitleSpy : CheckTaskByTitleSpy,
    addTaskSpy : AddTaskSpy
}

const makeSut = (): TypeSub => {
    const httpRequest = {
        body : {
            id : faker.datatype.uuid(),
            title : faker.name.title(),
            content : faker.lorem.words(),
            accountId : faker.datatype.uuid()
        }
    }
    const addTaskSpy = new AddTaskSpy()
    const checkTaskByTitleSpy = new CheckTaskByTitleSpy()
    const sut = new AddTaskController(checkTaskByTitleSpy, addTaskSpy)
    return {
        sut,
        httpRequest,
        checkTaskByTitleSpy,
        addTaskSpy
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

    test('Should if valid credentials are provided', async () => {
        const { sut, httpRequest, addTaskSpy } = makeSut()
        const response = await sut.handle(httpRequest)
        expect(response).toEqual(ok(addTaskSpy.result))
    })

    
})