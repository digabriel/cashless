module.exports = function APIError(message, errorCode, statusCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message;
  this.statusCode = statusCode || 500;
  this.errorCode = errorCode || 500;
};

require("util").inherits(module.exports, Error);
