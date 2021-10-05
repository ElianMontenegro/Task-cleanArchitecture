import { loginParamsSchema, accountSchema, errorSchema, signupParamsSchema, taskSchema, addTaskParamsSchema }from './schemas/index'

export default {
    loginParams : loginParamsSchema,
    account : accountSchema,
    error : errorSchema,
    signupParams : signupParamsSchema,
    task : taskSchema,
    addTaskParams : addTaskParamsSchema
}