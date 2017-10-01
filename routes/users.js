const User = require("../models/user");
const APIResponse = require("../models/APIResponse");

// Get all Users
function get(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return next(err);

    var response = new APIResponse(true, 200, null, users);
    res.status(200).json(response);
  });
}

// Create new User
function post(req, res, next) {
  const u = new User(req.body);
  u.save((err, user) => {
    if (err) return next(err);

    var response = new APIResponse(true, 200, null, user);
    res.status(201).json(response);
  });
}

// Get User by ID
function getById(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);

    var response = new APIResponse(true, 200, null, user);
    res.status(200).json(response);
  });
}

// Delete and User by ID
function deleteById(req, res, next) {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);

    var response = new APIResponse(true, 200, null, null);
    res.status(200).json(response);
  });
}

module.exports = (() => {
  const express = require("express");
  const router = express.Router();

  router
    .route("/")
    .get(get)
    .post(post);

  router
    .route("/:id")
    .get(getById)
    .delete(deleteById);

  return router;
})();
