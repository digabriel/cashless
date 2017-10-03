const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const EventSchema = new Schema({
    name: {type: String,  required: true},
    date: {type: Date, required: true},
});

EventSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Event', EventSchema);