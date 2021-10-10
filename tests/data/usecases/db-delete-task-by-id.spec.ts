import { DbDeleteTaskById } from '../../../src/data/usecases'
import { DeleteTaskByIdRepositorySpy } from '../mocks'
import faker from 'faker'


const makeSut = () => {
    const deleteTaskParams = {
        id : faker.datatype.uuid(),
        accountId : faker.datatype.uuid()
    }
    const deleteTaskByIdRepositorySpy = new DeleteTaskByIdRepositorySpy()
    const sut = new DbDeleteTaskById(deleteTaskByIdRepositorySpy)
    return {
        sut,
        deleteTaskByIdRepositorySpy,
        deleteTaskParams
    }
}


describe('DeleteTaskById', () => {
    test('Should call deleteTaskByIdRepository with correct param', async () => {
        const { sut, deleteTaskByIdRepositorySpy, deleteTaskParams } = makeSut()
        await sut.delete(deleteTaskParams.id, deleteTaskParams.accountId)
        expect(deleteTaskByIdRepositorySpy.id).toBe(deleteTaskParams.id)
        expect(deleteTaskByIdRepositorySpy.accountId).toBe(deleteTaskParams.accountId)
    })

    test('Should return true if deleteTaskByIdRepository return true', async () => {
        const { sut, deleteTaskParams } = makeSut()
        const isDelete = await sut.delete(deleteTaskParams.id, deleteTaskParams.accountId)
        expect(isDelete).toBe(true)
    })

    test('Should return false if deleteTaskByIdRepository return false', async () => {
        const { sut, deleteTaskByIdRepositorySpy, deleteTaskParams } = makeSut()
        deleteTaskByIdRepositorySpy.result = false
        const isDelete = await sut.delete(deleteTaskParams.id, deleteTaskParams.accountId)
        expect(isDelete).toBe(false)
    })
})