import express, { Express } from 'express'
import middleware from './middleware'
import routes from './routes'
import { config as dotenv } from 'dotenv'
const app : Express = express() 

middleware(app)
routes(app)
dotenv()
export default app;
