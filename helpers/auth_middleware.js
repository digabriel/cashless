module.exports = function(req, res, next) {
  var jwt = require('jsonwebtoken');
  var config = require('../config.js');

  var token = req.headers['access-token'];
  if (!token) {
      return res.status(403).json({
        success: false,
        code: 403,
        message: 'No access-token provided',
        data: null
      })
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {

        if (err.name == 'TokenExpiredError') {
          return res.status(401).json({
            success: false,
            code: 1401,
            message: 'access-token expired',
            data: null
          })

        }else {
          return res.status(401).json({
            success: false,
            code: 401,
            message: 'Invalid access-token',
            data: null
          })
        }
    }

    req.token = decoded;
    next();
  });
};
