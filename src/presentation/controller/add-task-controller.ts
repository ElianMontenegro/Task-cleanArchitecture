import { MissingParamError, DataInUseError } from "../errors"
import { badRequest, ok, serverError } from "../helpers"
import { IController, IHttpRequest, IHttpResponse } from "../protocols"
import { AddTask } from '../../domain/usecases'

export class AddTaskController implements IController {
    constructor (
        private readonly addTask : AddTask

    ) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const { title, content } = httpRequest.body
            const accountId = httpRequest.accountId
            const paramsRequired = ["title", "content", "accountId"]
            for (const params of paramsRequired) {
                if(!httpRequest.body[params]){
                    return badRequest(new MissingParamError(params))
                }
            }
            const task = await this.addTask.add({ title, content, accountId })
            if(!task){
                return badRequest(new DataInUseError('title'))
            }
            return ok(task)
        } catch (error: any) {
            return serverError(error)
        }
    }
    
}