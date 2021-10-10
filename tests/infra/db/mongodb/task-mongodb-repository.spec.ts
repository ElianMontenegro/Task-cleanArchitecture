import { Collection } from 'mongodb'
import { mongoHelper } from '../../../../src/infra/db/mongodb'
import { mockAddTaskParams } from '../../../domain/mocks'
import { TaskMongoRepository } from '../../../../src/infra/db/mongodb'

const makeSut = () => {
    return new TaskMongoRepository()
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

    describe('add', () => {
        test('Should return a task if added successfully', async () => {
            const sut = makeSut()
            const task = await sut.add(mockAddTaskParams())
            expect(true).toBe(task.insertedId !== null)
        })

    })

    describe('loadAllTask', () => {
        test('Should return a tasks', async () => {
            const sut = makeSut()
            const addTaskParams = mockAddTaskParams()
            await taskCollection.insertOne(addTaskParams)
            const task = await sut.loadAllTaks()
            expect(task).toEqual([addTaskParams])
        })

        test('Should return array empty', async () => {
            const sut = makeSut()
            const task = await sut.loadAllTaks()
            expect(task).toEqual([])
        })

    })

    describe('loadAllTaskByUser', () => {
        test('Should return a tasks', async () => {
            const sut = makeSut()
            const addTaskParams = mockAddTaskParams()
            await taskCollection.insertOne(addTaskParams)
            const task = await sut.loadAllTaksByUser(addTaskParams.accountId)
            expect(task).toEqual([addTaskParams])
        })

        test('Should return array empty', async () => {
            const sut = makeSut()
            const addTaskParams = mockAddTaskParams()
            const task = await sut.loadAllTaksByUser(addTaskParams.accountId)
            expect(task).toEqual([])
        })

    })

    describe('deleteTaskById', () => {
        test('Should return true if was success', async () => {
            const sut = makeSut()
            const addTaskParams = mockAddTaskParams()
            const newTask : any = await taskCollection.insertOne(addTaskParams)
            const task = await sut.delete(newTask.insertedId, addTaskParams.accountId)
            expect(task).toBe(true)
        })

        test('Should return false if was not success', async () => {
            const sut = makeSut()
            const addTaskParams = mockAddTaskParams()
            const task = await sut.delete('6161dfa17faa6a3c6ee50b7f', addTaskParams.accountId)
            expect(task).toBe(false)
        })

    })

    describe('UpdateTask', () => {
        test('Should return true if was success', async () => {
            const sut = makeSut()
            const addTaskParams = mockAddTaskParams()
            const newTask : any = await taskCollection.insertOne(addTaskParams)
            const modifideTaskParams = {title : 'new title', content : 'new content'}
            const task = await sut.update(newTask.insertedId, addTaskParams.accountId , modifideTaskParams)
            expect(task).toBe(true)
        })

        test('Should return false if was not success', async () => {
            const sut = makeSut()
            const addTaskParams = mockAddTaskParams()
            const modifideTaskParams = {title : 'new title', content : 'new content'}
            const task = await sut.update('6161dfa17faa6a3c6ee50b7f', addTaskParams.accountId, modifideTaskParams)
            expect(task).toBe(false)
        })

    })

    

})