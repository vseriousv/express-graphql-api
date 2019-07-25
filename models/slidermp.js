const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slidermpSchema = new Schema({
    name: String,
    image: String,
    FirstHeader: String,
    SecondHeader: String,
    button: String,
    url: String
});

module.exports = mongoose.model('Slidermp', slidermpSchema);
