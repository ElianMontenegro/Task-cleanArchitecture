export const signupParamsSchema = {
    type : 'object', 
    properties : {
        username : {
            type : 'string',
        },
        email : {
            type : 'string',
            format : 'email'
        },
        password : {
            type : 'string',
            format : 'password'
        },
        passwordConfirmation : {
            type : 'string',
            format : 'password'
        }
    }
}