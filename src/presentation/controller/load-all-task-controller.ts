import { LoadAllTask } from "../../domain/usecases";
import { notFound, ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";

export class LoadAllTaskController implements IController {
    constructor(private readonly loadAllTask : LoadAllTask){}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const tasks = await this.loadAllTask.load()
            if(!tasks){
                return notFound(new Error('there are not tasks'))
            }
            return ok(tasks)
        } catch (error: any) {
            return serverError(error)
        }
    }
}

