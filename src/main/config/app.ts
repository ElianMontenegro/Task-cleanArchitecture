import express, { Express } from 'express'
import middleware from './middleware'
const app : Express = express() 

middleware(app)
export default app;