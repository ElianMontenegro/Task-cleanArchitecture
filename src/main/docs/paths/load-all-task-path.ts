export const LoadAllTaskPath = {
    get : {
        tags : ['Tasks'],
        summary : 'API to get all tasks',
        description : 'this route can be use all users',
        responses : {
            '200' : {
                description : 'new task created successfully',
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