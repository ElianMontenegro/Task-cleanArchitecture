import { mongoHelper } from '../../../src/infra/db/mongodb'
import { Collection } from 'mongodb'
import { mockAddTaskParams } from '../../domain/mocks'
import request from 'supertest'
import app from '../../../src/main/config/app'

let taskCollection : Collection

describe('Task Routes', () => {

    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL)
    })

    beforeEach(async() => {
        taskCollection = mongoHelper.getCollection('tasks')
        await taskCollection.deleteMany({})
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })


    describe('addTask Route', () => {
        test('Should retrun 200 if task was created successfully', async () => {
            app.post('/api/add-task', (req, res) => {
                res.send(req.body)
            })
            await request(app)
                .post('/api/add-task')
                .expect("Content-Type", /json/)
                .send(mockAddTaskParams())
                .expect(200)
        })
    })
})

