export interface RefreshToken {
    encrypt: (id : string, email : string) => Promise<string>
}