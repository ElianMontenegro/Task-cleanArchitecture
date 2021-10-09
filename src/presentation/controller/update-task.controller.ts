import { MissingParamError } from "../errors";
import { badRequest, notFound, ok, serverError } from "../helpers";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { UpdateTaskById } from '../../domain/usecases'


export class UpdateTaskController implements IController {
    constructor(private readonly updateTaskById : UpdateTaskById){}
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const { id } = httpRequest.params
            const { accountId } = httpRequest
            if (!id) {
                return badRequest(new MissingParamError('id'))
            }
            const task = await this.updateTaskById.update(id, accountId)
            if(!task){
                return notFound(new Error('tasks not found'))
            }
            return ok(task)
        } catch (error: any) {
            return serverError(error)
        }
    }
    
}