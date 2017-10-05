const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const should = chai.should();

chai.use(chaiHttp);

/* 
 * Clear all users before tests starts 
 */
describe("Tickets", () => {
  before(done => {
    Ticket.remove({}, () => {
      done();
    });
  });

  /*
  *  Test /POST to events
  */
  describe("/POST & GET Ticket", () => {

    // Save a new Event for this Ticket
    const e = new Event({"name" : "My Event", "date" : "2019-10-10T00:25:00"});
    e.save();
    let ticket;
    

    it("it should CREATE and RETURN a new ticket", done => {
      console.log(e._id);

      var ticketJSON = { name: "Pista", 
                         event: e._id,
                         price: 120.0,
                         image: "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg" };

      chai
        .request(server)
        .post("/tickets")
        .send(ticketJSON)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.an("object");
          res.body.data.should.have.property("name").equal("Pista");
          res.body.data.should.have.property("_id");
          ticket = res.body.data;
          done();
        });
    });

    it("it should GET all tickets by a given event", done => {
      chai
        .request(server)
        .get("/tickets?event="+e._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.an("array");
          res.body.data.length.should.be.equal(1);
          res.body.data[0]._id.should.be.equal(ticket._id);
          done();
        });
    });
  });

  // /*
  //  * Test GET /events/event_id
  //  */

  // describe("GET /events/:event_id", () => {
  //   it("it should get an event by the given ID", done => {
  //     const eventJSON = { name: "Minha festa legal", 
  //                         date: "2017-10-10T00:00:00" };
                          
  //     const event = new Event(eventJSON);

  //     event.save((err, e) => {
  //       chai
  //         .request(server)
  //         .get(`/events/${e._id}`)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.an("object");
  //           res.body.data.should.have.property("date");
  //           res.body.data.should.have.property("name");
  //           done();
  //         });
  //     });
  //   });
  // });
});
