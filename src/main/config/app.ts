import express, { Express } from 'express'
import middleware from './middleware'
import routes from './routes'
const app : Express = express() 

middleware(app)
routes(app)
export default app;