const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    title: String,
    type: String,
    context_1: String,
    context_2: String
});

module.exports = mongoose.model('Contacts', contactSchema);