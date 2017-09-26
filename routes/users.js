const User = require('../models/user');

// Get all Users
function get(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return next(err);

    res.status(200).json(users);
  });
};

// Create new User
function post(req, res, next) {
  const u = new User(req.body);
  u.save((err, user) => {
    if (err) return next(err);

    res.status(201).json(user);
  });
};

// Get User by ID
function getById(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);

    res.status(200).json(user);
  });
}

module.exports = (() => {
  const express = require('express');
  const router = express.Router();
  
  router.route('/')
    .get(get)
    .post(post);

  router.route('/:id')
    .get(getById);

  return router;
})();