const mongoose = require('mongoose');
const User = require('../models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const should = chai.should();

chai.use(chaiHttp);

/* 
 * Clear all users before tests starts 
 */
describe('Users', () => {
  before((done) => {
    User.remove({}, () => {
      done();
    });
  });

  /*
  *  Test /GET all users
  */

  describe('/POST users', () => {
    it('it should CREATE and RETURN a new user', (done) => {
      var userJSON = {"email" : "dimas@dimasgabriel.net", "password" : "123456"};
      chai.request(server)
        .post('/users')
        .send(userJSON)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('email').equal('dimas@dimasgabriel.net');
          res.body.should.have.property('_id');
          done();
        });
    });

    it('it should not CREATE two users with the same email address', (done) => {
      var userJSON = {"email" : "dimas@dimasgabriel.net", "password" : "123456"};
      chai.request(server)
        .post('/users')
        .send(userJSON)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  // describe('/GET users', () => {
  //   it('it should GET all the users', (done) => {
  //     chai.request(server)
  //       .get('/users')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.an('array');
  //         res.body.length.should.be.eql(1);
  //         done();
  //       });
  //   });
  // });

});