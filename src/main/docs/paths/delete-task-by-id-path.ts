export const DeleteTaskByIdPath = {
    delete : {
        tags : ['Tasks'],
        summary : 'Api to delete task by id',
        description : 'this route can be used if you are authenticated',
        security: [{
            bearerAuth : []
        }], 
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
                description : 'task deleted', 
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