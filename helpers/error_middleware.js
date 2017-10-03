module.exports = function errorHandler(err, req, res, next) {
  var APIError = require('../models/APIError.js');
  var APIResponse = require('../models/APIResponse.js');

  if (err.name == "APIError") {
      /*
       * Remove Error's `stack` property. We don't want
       * users to see this at the production env
       */
      if (req.app.get('env') !== 'development') {
          delete err.stack;
      }

      var j = new APIResponse(false, err.errorCode, err.message, null);
      return res.status(err.statusCode).json(j);
  }

  if (err.status == 400 && err.name == 'SyntaxError') {
    var j = new APIResponse(false, 400, null, "Malformed JSON");
    return res.status(err.statusCode).json(j);
  }

  next(err);
};
