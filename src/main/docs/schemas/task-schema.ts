export const taskSchema = {
    type : 'object',
    properties : {
        acknowledged : {
            type : 'boolean'
        },
        insertedId : {
            type : 'string'
        }
    }
}