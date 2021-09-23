
export interface HashCompare {
    compare: (plainText: string, hashText: string) => Promise<Boolean>
}