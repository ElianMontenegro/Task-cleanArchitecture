import { DbDeleteTaskById } from '../../../src/data/usecases'
import { DeleteTaskByIdRepositorySpy } from '../mocks'



const makeSut = () => {
    const deleteTaskByIdRepositorySpy = new DeleteTaskByIdRepositorySpy()
    const sut = new DbDeleteTaskById(deleteTaskByIdRepositorySpy)
    return {
        sut,
        deleteTaskByIdRepositorySpy
    }
}


describe('DeleteTaskById', () => {
    test('Should call deleteTaskByIdRepository with correct param', async () => {
        const { sut, deleteTaskByIdRepositorySpy } = makeSut()
        await sut.delete('id-123456789')
        expect(deleteTaskByIdRepositorySpy.id).toBe('id-123456789')
    })

    test('Should return true if deleteTaskByIdRepository return true', async () => {
        const { sut } = makeSut()
        const isDelete = await sut.delete('id-123456789')
        expect(isDelete).toBe(true)
    })

    test('Should return false if deleteTaskByIdRepository return false', async () => {
        const { sut, deleteTaskByIdRepositorySpy } = makeSut()
        deleteTaskByIdRepositorySpy.result = false
        const isDelete = await sut.delete('id-123456789')
        expect(isDelete).toBe(false)
    })
})