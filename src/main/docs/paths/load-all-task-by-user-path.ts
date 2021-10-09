export const LoadAllTaskByUserPath = {
    get : {
        tags : ['Tasks'],
        summary: 'Api to get all task by user',
        description : 'this route can be used if you are authenticated',
        security: [{
            bearerAuth : []
        }], 
        responses : {
            '200' : {
                description : 'tasks by user',
                content : {
                    'application/json' : {
                        schema : {
                            $ref : '#/schemas/loadAllTask'
                        }
                    }
                } 
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