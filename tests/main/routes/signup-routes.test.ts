import { mongoHelper } from '../../../src/infra/db/mongodb'
import request from 'supertest'
import app from '../../../src/main/config/app'
import { Collection } from 'mongodb'
import faker from 'faker'
import bcrypt from 'bcrypt'


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
        await accountCollection.deleteMany({})
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

        test('Should return 403 on signup', async () => {
            await accountCollection.insertOne(user)
            await request(app)
                .post('/api/signup')
                .expect("Content-Type", /json/)
                .send(user)
                .expect(403)
        })
    })

    describe('login route', () => {
        
        test('Should return 200 on login', async () => {
            const hashPassword = await bcrypt.hash("12345", 10)
            user.password = hashPassword
            await accountCollection.insertOne(user)
            await request(app)
                .post('/api/login')
                .expect('Content-Type', /json/)
                .send({ email : user.email, password : "12345" })
                .expect(200)
        })

        test('Should return 401 on login', async () => {
            await request(app)
                .post('/api/login')
                .expect('Content-Type', /json/)
                .send({ email : user.email , password : user.password })
                .expect(401)
        })

    })
})