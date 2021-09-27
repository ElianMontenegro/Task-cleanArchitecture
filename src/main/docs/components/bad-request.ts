
export const badRequest = {
    description : 'invalid request',
    content : {
        'application/json' : {
            schema : {
                $ref : '#/schemas/error'
            }
        }
    }
}