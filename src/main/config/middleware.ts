import { Express } from 'express'
import { bodyParse, cors } from '../middlewares'
 
export default (app : Express): void => {
    app.use(bodyParse)
    app.use(cors)
}