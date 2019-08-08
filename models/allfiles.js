const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allfilesSchema = new Schema({
    name: String,
    type: String,
    path: String
});

module.exports = mongoose.model('Allfile', allfilesSchema);
