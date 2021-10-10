export const UpdateTaskPath = {
    put : {
        tags : ['Tasks'],
        summary : 'API to update task by id',
        description : 'this route can be used if you are authenticated',
        security: [{
            bearerAuth : []
        }], 
        requestBody : {
            required : true,
            content : {
                'application/json' : {
                    schema : {
                        $ref : '#/schemas/addTaskParams'
                    }
                }
            }
        },
        parameters: [{
            in: 'path',
            name: 'id',
            description: 'ID task',
            required: true,
            schema: {
              type: 'string'
            }
        }],
        responses : {
            '200' : {
                description : 'task update', 
            },
            '404' : {
                $ref : '#/components/notFound'
            },
            '500' : {
                $ref : '#/components/serverError'
            }
        }
    }
}