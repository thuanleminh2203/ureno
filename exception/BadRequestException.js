const { ERROR_CODE_BAD_REQUEST } = require("../constant/AppConstant");

class BadRequestException extends Error {  
    constructor (message,code = ERROR_CODE_BAD_REQUEST) {
      super(message)
      this.name = 'BadRequestException'
      this.code = code
      Error.captureStackTrace(this, this.constructor);
    }
  }

  module.exports = BadRequestException