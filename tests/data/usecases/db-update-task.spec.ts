import { UpdateTaskRepository } from '../mocks'
import { DbUpdateTaskById } from '../../../src/data/usecases'
import faker from 'faker'

const makeSut = () => {
    const updateTaskParams = {
        id : faker.datatype.uuid(),
        accountId : faker.datatype.uuid()
    }
    const updateTaskRepository = new UpdateTaskRepository()
    const sut = new DbUpdateTaskById(updateTaskRepository)
    return {
        sut,
        updateTaskRepository,
        updateTaskParams
    }
}

describe('DbUpdateTaskById use case', () => {

    test('Should call updateTaskRepository with correct value', async () => {
        const { sut, updateTaskRepository, updateTaskParams } = makeSut()
        await sut.update(updateTaskParams.id, updateTaskParams.accountId)
        expect(updateTaskRepository.id).toBe(updateTaskParams.id)
        expect(updateTaskRepository.accountId).toBe(updateTaskParams.accountId)
    })

    test('Should return true if updateTaskRepository return true', async () => {
        const { sut, updateTaskRepository, updateTaskParams } = makeSut()
        updateTaskRepository.isUpdate = false
        const isUpdate = await sut.update(updateTaskParams.id, updateTaskParams.accountId)
        expect(isUpdate).toBe(false)
    })

})
