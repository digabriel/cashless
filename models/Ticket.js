const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const TicketSchema = new Schema({
    name: {type: String,  required: true},
    event: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
    price: {type: Number, required: true},
    image: {type: String}
});

TicketSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Ticket', TicketSchema);