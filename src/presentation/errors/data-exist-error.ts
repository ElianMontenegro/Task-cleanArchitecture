export class DataInUseError extends Error {
    constructor (param : string) {
      super(`${param}InUseError: The received ${param} is already in use `)
      this.name = `${param}InUseError: The received ${param} is already in use`
    }
  }