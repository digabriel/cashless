const User = require("../models/User");
const APIResponse = require("../models/APIResponse");
const CRUD = require("../models/CRUD_helpers");
const bcrypt = require("bcryptjs");

// Get all Users
async function get(req, res, next) {
  CRUD.readList(User, {}, res, next);
}

// Create new User
async function post(req, res, next) {
  const u = new User(req.body);

  // Hashing user password
  u.password = bcrypt.hashSync(u.password);
  
  CRUD.create(u, res, next);
}

// Get User by ID
async function getById(req, res, next) {
  CRUD.read(User, req.params.id, res, next);
}

// Delete and User by ID
async function deleteById(req, res, next) {
  CRUD.delete(User, req.params.id, res, next);
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
