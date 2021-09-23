export interface AccessToken {
    encrypt: (id : string, email? : string) => Promise<string>
}