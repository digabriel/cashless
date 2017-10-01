const User = require("../models/user");
const APIResponse = require("../models/APIResponse");

// Get all Users
async function get(req, res, next) {
  try {
    const users = await User.find({});
    const response = new APIResponse(true, 200, null, users);
    res.status(200).json(response);
  }catch (err) {
    next(err);
  }
}

// Create new User
async function post(req, res, next) {
  const u = new User(req.body);

  try {
    const user = await u.save();
    const response = new APIResponse(true, 200, null, user);
    res.status(201).json(response);
  }catch (err) {
    next(err);
  }
}

// Get User by ID
async function getById(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    const response = new APIResponse(true, 200, null, user);
    res.status(200).json(response);
  }catch (err) {
    next(err);
  }
}

// Delete and User by ID
async function deleteById(req, res, next) {
  try {
    await User.findByIdAndRemove(req.params.id);
    const response = new APIResponse(true, 200, null, null);
    res.status(200).json(response);
  }catch (err) {
    next(err);
  }
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
