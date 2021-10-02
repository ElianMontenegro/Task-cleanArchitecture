import { MissingParamError, DataInUseError } from "../errors"
import { badRequest } from "../helpers"
import { IController, IHttpRequest, IHttpResponse } from "../protocols"
import { CheckTaskByTitle } from '../../data/protocols/db'

export class AddTaskController implements IController {
    constructor (private readonly checkTaskByTitle : CheckTaskByTitle) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        const { title, content } = httpRequest.body
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
    }
    
}