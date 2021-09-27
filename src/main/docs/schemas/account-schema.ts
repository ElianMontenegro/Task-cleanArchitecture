export const accountSchema = {
    type : 'object',
    properties : {
        accessToken : {
            type : 'string',
            format : 'byte',
            description : 'JWT'
        },
        refreshToken : {
            type : 'string',
            format : 'byte',
            description : 'JWT'
        }
    }
}