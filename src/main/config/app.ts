import express, { Express } from 'express'
import middleware from './middleware'
import routes from './routes'
import swagger from './swagger'
import { config as dotenv } from 'dotenv'
const app : Express = express() 

middleware(app)
routes(app)
swagger(app)
dotenv()
export default app;
