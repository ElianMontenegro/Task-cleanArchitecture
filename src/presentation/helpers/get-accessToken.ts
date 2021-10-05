import { Request }  from 'express'
let accessToken : string
let token : string
export const getToken = (req : Request) => {
    accessToken = req.headers["authorization"],
    token = accessToken && accessToken.split(" ")[1]
    return token
}
 