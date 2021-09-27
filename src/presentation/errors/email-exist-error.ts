export class EmailInUseError extends Error {
    constructor () {
      super('EmailInUseError: The received email is already in use')
      this.name = 'EmailInUseError: The received email is already in use'
    }
  }