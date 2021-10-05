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
                .set('Authorization', accessToken)
                .expect("Content-Type", /json/)
                .send(mockAddTaskParams())
                .expect(200)
        })
    })
})

