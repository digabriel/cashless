const User = require("../models/User");
const APIResponse = require("../models/APIResponse");
const APIError = require("../models/APIError");
const CRUD = require("../models/CRUD_helpers");
const bcrypt = require("bcryptjs");

// Get all Users
async function get(req, res, next) {
  CRUD.readList(User, {}, res, next);
};

// Create new User
async function post(req, res, next) {
  const u = new User(req.body);
  const pass = u.password;

  // Hashing user password
  u.password = await bcrypt.hash(pass, 10);

  try {
    await u.save();

    // Generate access-token and refresh-token
    const json = await User.auth(u.email, pass);

    const response = new APIResponse(true, 201, null, json);
    res.status(201).json(response);
  }catch(_) {
    const err = new APIError("Can create this User", 400, 400);
    next(err);
  }
};

// Get User by ID
async function getById(req, res, next) {
  CRUD.read(User, req.params.id, res, next);
};

// Delete and User by ID
async function deleteById(req, res, next) {
  CRUD.delete(User, req.params.id, res, next);
};

// Auth User
async function auth(req, res, next) {
  try {
    const json = await User.auth(req.body.email, req.body.password);

    const response = new APIResponse(true, 200, null, json);
    res.status(200).json(response);

  }catch(err) {
    const response = new APIResponse(false, 403, err, null);
    res.status(403).json(response);
  }
};

module.exports = (() => {
  const express = require("express");
  const router = express.Router();

  router.route("/")
    .get(get)
    .post(post);

  router.route("/:id")
    .get(getById)
    .delete(deleteById);

  router.route("/auth")
    .post(auth);
    
  return router;
})();
