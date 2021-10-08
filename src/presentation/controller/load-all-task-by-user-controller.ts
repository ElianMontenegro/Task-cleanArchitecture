import { IHttpResponse, IHttpRequest } from "../protocols";
import { Controller } from "../protocols/Icontroller";
import { LoadAllTaskByUser } from '../../domain/usecases'
import { notFound, ok, serverError } from "../helpers";

export class LoadAllTaskByUserController implements Controller{
    constructor(private readonly loadAllTaskByUser : LoadAllTaskByUser){}
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const { accountId } = httpRequest
            const tasks = await this.loadAllTaskByUser.loadByUser(accountId) 
            if (!tasks) {
                return notFound(new Error('there are not tasks'))
            }
            return ok(tasks)
        } catch (error : any) {
            return serverError(error)
        }
    }

}

export namespace LoadAllTaskByUserController {
    export type Request = {
        accountId : string
    }
}