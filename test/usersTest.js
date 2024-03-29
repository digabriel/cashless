const mongoose = require("mongoose");
const User = require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const should = chai.should();

chai.use(chaiHttp);

/* 
 * Clear all users before tests starts 
 */
describe("Users", () => {
  before(done => {
    User.remove({}, () => {
      done();
    });
  });

  /*
  *  Test /POST to users
  */
  describe("/POST users", () => {
    it("it should CREATE and RETURN a new user", done => {
      var userJSON = { email: "dimas@dimasgabriel.net", password: "123456" };
      chai
        .request(server)
        .post("/users")
        .send(userJSON)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.an("object");
          res.body.data.should.have.property("user");
          res.body.data.should.have.property("auth");

          res.body.data.auth.should.have.property("access-token");
          res.body.data.auth.should.have.property("refresh-token");
          res.body.data.auth.should.have.property("expiration_date");

          res.body.data.user.should.have.property("_id");
          done();
        });
    });

    it("it should not CREATE two users with the same email address", done => {
      var userJSON = { email: "dimas@dimasgabriel.net", password: "123456" };
      chai
        .request(server)
        .post("/users")
        .send(userJSON)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  /*
   * Test User Auth
   */
  describe("POST /users/auth", () => {
    it("it should authenticate an User with email and password", done => {
      var userJSON = { email: "dimas@dimasgabriel.net", password: "123456" };

      chai
        .request(server)
        .post("/users/auth")
        .send(userJSON)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.an("object");
          res.body.data.should.have.property("user");
          res.body.data.should.have.property("auth");

          res.body.data.auth.should.have.property("access-token");
          res.body.data.auth.should.have.property("refresh-token");
          res.body.data.auth.should.have.property("expiration_date");

          res.body.data.user.should.have.property("_id");
          done();
        });
    });

    it("it should not authenticate an User with wrong password", done => {
      var userJSON = { email: "dimas@dimasgabriel.net", password: "1236" };

      chai
        .request(server)
        .post("/users/auth")
        .send(userJSON)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.an("object");
          res.body.should.have.property("errorMessage");
          done();
        });
    });
  });

  /* 
   * Test GET /users
   */
  describe("GET /users", () => {
    it("it should GET all the users", done => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.an("array");
          res.body.data.length.should.be.equal(1);
          done();
        });
    });
  });

  /*
   * Test GET /users/user_id
   */

  describe("GET /users/:user_id", () => {
    it("it should get an user by the given ID", done => {
      const user = User({ email: "testuser@email.com", password: "123456" });
      user.save((err, u) => {
        chai
          .request(server)
          .get(`/users/${u._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.data.should.have.property("email");
            res.body.data.should.have.property("password");
            done();
          });
      });
    });
  });

  /*
   * Test DELETE /users/user_id
   */
  describe("DELETE /users/:user_id", () => {
    it("it should DELETE and user by the given Id", done => {
      const user = User({ email: "testuser2@email.com", password: "123456" });
      user.save((err, u) => {
        chai
          .request(server)
          .delete(`/users/${u._id}`)
          .end((err, res) => {
            res.should.have.status(200);

            chai
              .request(server)
              .get(`/users/${u._id}`)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });
      });
    });
  });
});
