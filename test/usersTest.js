const mongoose = require("mongoose");
const User = require("../models/user");
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
          res.body.data.should.have.property("email").equal("dimas@dimasgabriel.net");
          res.body.data.should.have.property("_id");
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
