const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV==='test') {
  console.log('Testing');
  require('dotenv').config({path: './.env.test'});
}else {
  require('dotenv').config();
}

const app = express();
app.use(bodyParser.json());

const users = require('./routes/users');
app.use('/users', users);

const events = require('./routes/events');
app.use('/events', events);

const tickets = require('./routes/tickets');
app.use('/tickets', tickets);

// Error Middleware (ALL errors are handled here)
var errorMiddleware = require('./helpers/error_middleware.js');
app.use(errorMiddleware);

// Connects to DB and starts the server
mongoose.connect(process.env.MONGODB_URI, {useMongoClient:true}, err => {
  if (err) throw err;
  console.log(`DB connected`);

  // Starts the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Ready to go on port ${port}`);
  });
});

module.exports = app;
