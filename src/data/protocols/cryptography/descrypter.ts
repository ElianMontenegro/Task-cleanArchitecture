
export interface Descrypter {
    descryp: (token : string, secret : string) => Promise<any>
}