const Ticket = require("../models/Ticket");
const CRUD = require("../models/CRUD_helpers");

// Create new Ticket
async function post(req, res, next) {
  const t = new Ticket(req.body);
  CRUD.create(t, res, next);
}

async function get(req, res, next) {
  CRUD.readList(Ticket, req.query, res, next);
}

module.exports = (() => {
  const express = require("express");
  const router = express.Router();

  router
    .route("/")
    .post(post)
    .get(get);

  return router;
})();
