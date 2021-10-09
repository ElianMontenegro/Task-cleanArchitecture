import { DeleteTaskById } from "../../domain/usecases";
import { DeleteTaskByIdRepository } from "../protocols";


export class DbDeleteTaskById implements DeleteTaskById{
    constructor(private readonly deleteTaskByIdRepository : DeleteTaskByIdRepository){}
    async delete(id: string): Promise<Boolean>{ 
        return await this.deleteTaskByIdRepository.delete(id)
    }
    
}