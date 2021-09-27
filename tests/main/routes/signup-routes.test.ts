import { mongoHelper } from '../../../src/infra/db/mongodb'
import request from 'supertest'
import app from '../../../src/main/config/app'
import { Collection } from 'mongodb'
import faker, { fake } from 'faker'

let accountCollection : Collection

const password = faker.internet.password()
const user = {
    username : faker.name.findName(),
    email : faker.internet.email(),
    password : password,
    passwordConfirmation : password
}


describe('Login routes', () => {
    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL)
    })

    beforeEach(async () => {
        accountCollection = mongoHelper.getCollection('accounts')
        accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })

    describe('signup route', () => {
        test('Should return 200 on signup', async () => {
            await request(app)
                .post('/api/signup')
                .expect("Content-Type", /json/)
                .send(user)
                .expect(200)
        })

        test('Should return 403 if email already exists', async () => {
            await accountCollection.insertOne(user)
            await request(app)
                .post('/api/signup')
                .expect("Content-Type", /json/)
                .send(user)
                .expect(403)
        })
    })
})