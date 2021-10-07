export const loadAllTaskSchema = {
    type : 'object',
    properties : {
        _id : {
            type : 'string'
        },
        title : {
            type : 'string'
        },
        content : {
            type : 'string'
        },
        accountId : {
            type : 'string'
        }
    }
}