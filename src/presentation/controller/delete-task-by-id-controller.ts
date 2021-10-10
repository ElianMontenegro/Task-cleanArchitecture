import { MissingParamError } from "../errors";
import { badRequest, notFound, ok, serverError } from "../helpers";
import { IHttpRequest, IHttpResponse , IController } from "../protocols";
import { DeleteTaskById } from '../../domain/usecases'

export class DeleteTaskByIdController implements IController{
    constructor(private readonly deleteTaskById : DeleteTaskById) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const { accountId } = httpRequest
            const { id } = httpRequest.params
            if(!id){
                return badRequest(new MissingParamError('id'))
            }
            const isDelete = await this.deleteTaskById.delete(id, accountId)
            if(!isDelete){
                return notFound(new Error('task not found'))
            }
            return ok(isDelete)
        } catch (error: any) {
            return serverError(error)
        }
    }
    
}