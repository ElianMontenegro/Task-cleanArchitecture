import request from 'supertest'
import app from '../../../src/main/config/app'

describe('body parse', () => {
    test('Should parse body as json', async () => {
        app.post('/body-parse', (req, res) => {
            res.send(req.body)
        })
        await request(app)
            .post('/body-parse')
            .send({name : "elian"})
            .expect({name : "elian"})
    })
})
