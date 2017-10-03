const mongoose = require("mongoose");
const Event = require("../models/Event");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const should = chai.should();

chai.use(chaiHttp);

/* 
 * Clear all users before tests starts 
 */
describe("Events", () => {
  before(done => {
    Event.remove({}, () => {
      done();
    });
  });

  /*
  *  Test /POST to events
  */
  describe("/POST Event", () => {
    it("it should CREATE and RETURN a new event", done => {
      var eventJSON = { name: "Minha festa legal", 
                       date: "2017-10-10T00:00:00" };

      chai
        .request(server)
        .post("/events")
        .send(eventJSON)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.an("object");
          res.body.data.should.have.property("name").equal("Minha festa legal");
          res.body.data.should.have.property("_id");
          done();
        });
    });
  });

  /* 
   * Test GET /events
   */
  describe("GET /events", () => {
    it("it should GET all the events", done => {
      chai
        .request(server)
        .get("/events")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.an("array");
          res.body.data.length.should.be.equal(1);
          done();
        });
    });
  });

  /*
   * Test GET /events/event_id
   */

  describe("GET /events/:event_id", () => {
    it("it should get an event by the given ID", done => {
      const eventJSON = { name: "Minha festa legal", 
                          date: "2017-10-10T00:00:00" };
                          
      const event = new Event(eventJSON);

      event.save((err, e) => {
        chai
          .request(server)
          .get(`/events/${e._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.data.should.have.property("date");
            res.body.data.should.have.property("name");
            done();
          });
      });
    });
  });

//   /*
//    * Test DELETE /users/user_id
//    */
//   describe("DELETE /users/:user_id", () => {
//     it("it should DELETE and user by the given Id", done => {
//       const user = User({ email: "testuser2@email.com", password: "123456" });
//       user.save((err, u) => {
//         chai
//           .request(server)
//           .delete(`/users/${u._id}`)
//           .end((err, res) => {
//             res.should.have.status(200);

//             chai
//               .request(server)
//               .get(`/users/${u._id}`)
//               .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//               });
//           });
//       });
//     });
//   });
});
