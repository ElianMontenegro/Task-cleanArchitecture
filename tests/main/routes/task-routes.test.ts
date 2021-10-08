import { mongoHelper } from '../../../src/infra/db/mongodb'
import { Collection } from 'mongodb'
import { mockAddTaskParams } from '../../domain/mocks'
import request from 'supertest'
import app from '../../../src/main/config/app'

import jwt from 'jsonwebtoken'
import { config as dotenv } from 'dotenv'
dotenv()

let taskCollection : Collection
let accountCollection : Collection


const mockDecodifyAccessToken = async (token : string): Promise<any> => {
    const accessToken = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN) 
    return accessToken
}

const mockAccessToken = async (): Promise<string> => {
    const user = await accountCollection.insertOne({
        username : "elian",
        email : "email_491@gmail.com",
        password : "123456789"
    })
    const id = user.insertedId.toHexString()
    const accessToken = jwt.sign({id}, process.env.SECRET_ACCESS_TOKEN)
    return accessToken
}


describe('Task Routes', () => {

    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL)
    })

    beforeEach(async() => {
        taskCollection = mongoHelper.getCollection('tasks')
        await taskCollection.deleteMany({})
        accountCollection = mongoHelper.getCollection('accounts')
        await taskCollection.deleteMany({})
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })


    describe('addTask Route', () => {
        test('Should retrun 200 if task was created successfully', async () => {
            const accessToken = await mockAccessToken()
            await request(app)
                .post('/api/add-task')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect("Content-Type", /json/)
                .send(mockAddTaskParams())
                .expect(200)
        })

        test('Should retrun 403 if accessToken is not provided', async () => {
            await request(app)
                .post('/api/add-task')
                .expect("Content-Type", /json/)
                .send(mockAddTaskParams())
                .expect(403)
        })
    })

    describe('loadAllTask Route', () => {
        test('Should retrun 200 if return tasks array', async () => {
            const addTaskParams = mockAddTaskParams()
            await taskCollection.insertOne(addTaskParams)
            await request(app)
                .get('/api/load-all-task')
                .expect("Content-Type", /json/)
                .expect(200)
        })

        test('Should retrun 404 if return array empty of tasks', async () => {
            await request(app)
                .get('/api/load-all-task')
                .expect("Content-Type", /json/)
                .expect(404)
        })
    })

    describe('loadAllTaskByUser Route', () => {
        test('Should retrun 200 if return tasks array', async () => {
            const accessToken = await mockAccessToken()
            const decode = await mockDecodifyAccessToken(accessToken)
            const addTaskParams = mockAddTaskParams()
            addTaskParams.accountId = decode.id
            await taskCollection.insertOne(addTaskParams)
            await request(app)
                .get('/api/load-all-task-by-user')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect("Content-Type", /json/)
                .expect(200)
        })

        test.skip('Should retrun 404 if return array empty of tasks', async () => {
            await request(app)
                .get('/api/load-all-task')
                .expect("Content-Type", /json/)
                .expect(404)
        })
    })
})

