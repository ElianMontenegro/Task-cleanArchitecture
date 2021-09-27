import { Express } from 'express'
import { bodyParse } from '../middlewares'
 
export default (app : Express): void => {
    app.use(bodyParse)
}