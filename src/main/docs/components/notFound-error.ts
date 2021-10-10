export const notFound = {
    description : 'not found',
    content : {
        'application/json' : {
            schema : {
                $ref : '#/schemas/error'
            }
        }
    }
}