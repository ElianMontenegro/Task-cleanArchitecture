import { MissingParamError } from "../errors";
import { badRequest, notFound, ok, serverError } from "../helpers";
import { IHttpRequest, IHttpResponse } from "../protocols";
import { IController } from "../protocols/controller-interface";
import { DeleteTaskById } from '../../domain/usecases'

export class DeleteTaskByIdController implements IController{
    constructor(private readonly deleteTaskById : DeleteTaskById) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const { id } = httpRequest.params
            if(!id){
                return badRequest(new MissingParamError('id'))
            }
            const isDelete = await this.deleteTaskById.delete(id)
            if(!isDelete){
                return notFound(new Error('task not found'))
            }
            return ok(isDelete)
        } catch (error: any) {
            return serverError(error)
        }
    }
    
}