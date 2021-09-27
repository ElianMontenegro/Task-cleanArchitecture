export const loginPath = {
    post : {
        tags : ['Login'],
        summary : 'API to authenticate user',
        description :  'this route can be used by all users',
        requestBody : {
            required : true,
            content : {
                'application/json' : {
                    schema : {
                        $ref : '#/schemas/loginParams'
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
            '401' : {
                $ref : '#/components/unauthorized'
            },
            '500' : {
                $ref : '#/components/serverError'
            }
        }
    }
}