
import { MissingParamError } from "../../../src/presentation/errors"
import { badRequest } from "../../../src/presentation/helpers"
import { AddTaskController } from '../../../src/presentation/controller'



describe('AddTaskController', () => {
    test('Should return error if title is not provided', async () =>{
        const sut = new AddTaskController()
        const httpRequest = {
            body : {title : ""}
        }
        const res = await sut.handle(httpRequest)
        expect(res).toEqual(badRequest(new MissingParamError('title')))
    })

    test('Should return error if content is not provided', async () =>{
        const sut = new AddTaskController()
        const httpRequest = {
            body : {
                title : "any_title",
                content : ""
            }
        }
        const res = await sut.handle(httpRequest)
        expect(res).toEqual(badRequest(new MissingParamError('content')))
    })
})