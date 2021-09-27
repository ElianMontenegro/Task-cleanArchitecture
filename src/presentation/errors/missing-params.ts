export class MissingParamError extends Error {
    constructor (private paramName : string) {
      super(`Missing param: ${paramName}`)
      this.name = `MissingParamError: ${paramName}`
    }
}