const Event = require("../models/Event");
const CRUD = require("../models/CRUD_helpers");

// Get all Events
async function get(req, res, next) {
  CRUD.readList(Event, {}, res, next);
}

// Create new Event
async function post(req, res, next) {
  const e = new Event(req.body);
  CRUD.create(e, res, next);
}

// Get Event by ID
async function getById(req, res, next) {
  CRUD.read(Event, req.params.id, res, next);
}

// // Delete and User by ID
// async function deleteById(req, res, next) {
//   CRUD.delete(User, req.params.id, res, next);
// }

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
//     .delete(deleteById);

  return router;
})();
