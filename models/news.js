const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    title: String,
    description: String,
    text: String,
    tags: String,
    dateTimeCreate: String,
    dateTimeUpdate: String,
    authorID: String
});

module.exports = mongoose.model('New', newSchema);
