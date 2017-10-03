class APIResponse {
  constructor(status, code, errorMessage, data) {
    this.status = status;
    this.code = code;
    this.errorMessage = errorMessage;
    this.data = data;
  }
}

module.exports = APIResponse;