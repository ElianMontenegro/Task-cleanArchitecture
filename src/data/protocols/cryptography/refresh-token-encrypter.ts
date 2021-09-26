export interface RefreshToken {
    refreshToken: (id : string, email : string, secret: string, expiresIn : any) => Promise<string>
}