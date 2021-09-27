export const signupPath = {
    post : {
        summary : 'API to create an user',
        description : 'this route can be used by all users',
        tags : ['Login'],
        requestBody : {
            required : true,
            content : {
                'application/json' : {
                    schema : {
                        $ref : '#/schemas/signupParams'
                    }
                }
            }
        },
        responses : {
            '200' : {
                description : 'success',
                content : {
                    'application/json' : {
                        schema : {
                            $ref : '#/schemas/account'
                        }
                    }
                } 
            },
            '400' : {
                $ref : '#/components/badRequest'
            },
            '403' : {
                $ref : '#/components/forbidden'
            },
            '500' : {
                $ref : '#/components/serverError'
            }
        }
    }
}