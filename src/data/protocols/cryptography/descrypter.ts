
export interface Descrypter {
    descryp: (token : string) => Promise<string>
}