export const addTaskPath = {
    post : {
        security: [{
            bearerAuth : []
        }],  
        tags : ['Tasks'],
        summary : 'API to create a task',
        description : 'this route can be used if you are authenticated',       
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
        responses : {
            '200' : {
                description : 'new task created successfully',
                content : {
                    'application/json' : {
                        schema : {
                            $ref : '#/schemas/task'
                        }
                    }
                } 
            },
            '400' : {
                $ref : '#/components/badRequest'
            },
            '401' : {
                $ref : '#/components/unauthorized'
            },
            '500' : {
                $ref : '#/components/serverError'
            }

        }
    }
}