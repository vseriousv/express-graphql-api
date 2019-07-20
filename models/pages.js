const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagesSchema = new Schema({
    name: String,
    text: String,
    sectionID: String,
    url: String
});

module.exports = mongoose.model('Pages', pagesSchema);