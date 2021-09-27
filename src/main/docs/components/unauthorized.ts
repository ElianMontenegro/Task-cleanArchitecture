export const unauthorized = {
    description : 'invalid credentials',
    content : {
        'application/json' : {
            schema : {
                $ref : '#/schemas/error'
            }
        }
    }
}