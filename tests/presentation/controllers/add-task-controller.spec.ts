
import { MissingParamError } from "../../../src/presentation/errors"
import { badRequest } from "../../../src/presentation/helpers"
import { IController, IHttpRequest, IHttpResponse } from "../../../src/presentation/protocols"

export class AddTaskController implements IController {

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        const paramsRequired = ["title", "content"]
        for (const params of paramsRequired) {
            if(!httpRequest.body[params]){
                return badRequest(new MissingParamError(params))
            }
        }
    }
    
}


describe('AddTaskController', () => {
    test('Should return error if title is not provided', async () =>{
        const sut = new AddTaskController()
        const httpRequest = {
            body : {title : ""}
        }
        const res = await sut.handle(httpRequest)
        expect(res).toEqual(badRequest(new MissingParamError('title')))
    })
})