import { MissingParamError, DataInUseError } from "../errors"
import { badRequest, ok, serverError } from "../helpers"
import { IController, IHttpRequest, IHttpResponse } from "../protocols"
import { CheckTaskByTitle, AddTask } from '../../data/protocols/db'


export class AddTaskController implements IController {
    constructor (
        private readonly checkTaskByTitle : CheckTaskByTitle,
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
            const exist = await this.checkTaskByTitle.checkByTitle(title)
            if(exist){
                return badRequest(new DataInUseError('title'))
            }
            const task = await this.addTask.add({ title, content, accountId })
            return ok(task)
        } catch (error: any) {
            return serverError(error)
        }
    }
    
}