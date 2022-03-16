class BadRequestException extends Error {  
    constructor (message) {
      super(message)
      this.name = 'BadRequestException'
      Error.captureStackTrace(this, this.constructor);
    }
  }

  module.exports = BadRequestException