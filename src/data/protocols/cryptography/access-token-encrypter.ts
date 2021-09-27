export interface AccessToken {
    accessToken: (id : string, secret: string, expiresIn : any) => Promise<string>
}