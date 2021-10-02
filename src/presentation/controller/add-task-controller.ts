import { MissingParamError } from "../errors"
import { badRequest } from "../helpers"
import { IController, IHttpRequest, IHttpResponse } from "../protocols"


export class AddTaskController implements IController {

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        const paramsRequired = ["title", "content", "accountId"]
        for (const params of paramsRequired) {
            if(!httpRequest.body[params]){
                return badRequest(new MissingParamError(params))
            }
        }
    }
    
}