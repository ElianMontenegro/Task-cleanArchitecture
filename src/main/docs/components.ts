import { badRequest, unauthorized, serverError, forbidden, bearerAuth, notFound } from './components/index'

export default {
    securitySchemes: {
        bearerAuth: bearerAuth
    },
    badRequest,
    unauthorized,
    serverError,
    forbidden,
    bearerAuth,
    notFound
}