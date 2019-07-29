const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mpslideSchema = new Schema({
  name: String,
  image: String,
  firstHeader: String,
  secondHeader:String,
  button: String,
  url: String
});

module.exports = mongoose.model('Mpslide', mpslideSchema);
