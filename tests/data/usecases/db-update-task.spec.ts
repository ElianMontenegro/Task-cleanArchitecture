import { UpdateTaskRepository } from '../mocks'
import { DbUpdateTaskById } from '../../../src/data/usecases'
import faker from 'faker'

const makeSut = () => {
    const updateTaskParams = {
        id : faker.datatype.uuid(),
        accountId : faker.datatype.uuid(),
        data : { title : faker.name.title(), content : faker.random.words(15) }
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
        await sut.update(updateTaskParams.id, updateTaskParams.accountId, updateTaskParams.data)
        expect(updateTaskRepository.id).toBe(updateTaskParams.id)
        expect(updateTaskRepository.accountId).toBe(updateTaskParams.accountId)
        expect(updateTaskRepository.data).toEqual(updateTaskParams.data)
    })

    test('Should return false if updateTaskRepository return false', async () => {
        const { sut, updateTaskRepository, updateTaskParams } = makeSut()
        updateTaskRepository.isUpdate = false
        const isUpdate = await sut.update(updateTaskParams.id, updateTaskParams.accountId, updateTaskParams.data)
        expect(isUpdate).toBe(false)
    })

    test('Should return true if updateTaskRepository return true', async () => {
        const { sut, updateTaskRepository, updateTaskParams } = makeSut()
        const isUpdate = await sut.update(updateTaskParams.id, updateTaskParams.accountId, updateTaskParams.data)
        expect(isUpdate).toBe(true)
    })
})
