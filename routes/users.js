const User = require('../models/user');

// Get all Users
function get(req, res, next) {
  res.send();
};

// Create new User
function post(req, res, next) {
  const u = new User(req.body);
  u.save((err, user) => {
    if (err) next(err);

    res.status(201).send(user);
  });
};

module.exports.get = get;
module.exports.post = post;