import { loginParamsSchema, accountSchema, errorSchema, signupParamsSchema }from './schemas/index'

export default {
    loginParams : loginParamsSchema,
    account : accountSchema,
    error : errorSchema,
    signupParams : signupParamsSchema
}