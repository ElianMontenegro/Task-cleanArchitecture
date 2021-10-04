import { Collection } from 'mongodb'
import { mongoHelper } from '../../../../src/infra/db/mongodb'
import { mockAddTaskParams } from '../../../domain/mocks'
import { TaskRepository } from '../../../../src/infra/db/mongodb'

const makeSut = () => {
    return new TaskRepository()
}


let taskCollection : Collection;
describe('TaskRepository', () => {

    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL)
    })

    beforeEach(async () => {
        taskCollection = mongoHelper.getCollection('tasks')
        taskCollection.deleteMany({})
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })

    describe('checkByTitle', () => {
        test('Should Return true if task title already exist in database', async () => {
            const sut = makeSut()
            const addTaskParams = mockAddTaskParams()
            await taskCollection.insertOne(addTaskParams)
            const isExist = await sut.checkByTitle(addTaskParams.title)
            expect(isExist).toBe(true)
        })

        test('Should Return false if task title not exist in database', async () => {
            const sut = makeSut()
            const addTaskParams = mockAddTaskParams()
            const isExist = await sut.checkByTitle(addTaskParams.title)
            expect(isExist).toBe(false)
        })
    })

})