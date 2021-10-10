import { 
    loginParamsSchema, 
    accountSchema, 
    errorSchema, 
    signupParamsSchema, 
    taskSchema, 
    addTaskParamsSchema,
    loadAllTaskSchema
}from './schemas/index'

export default {
    loginParams : loginParamsSchema,
    account : accountSchema,
    error : errorSchema,
    signupParams : signupParamsSchema,
    task : taskSchema,
    addTaskParams : addTaskParamsSchema,
    loadAllTask : loadAllTaskSchema
}