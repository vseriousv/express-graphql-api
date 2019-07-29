const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advantageSchema = new Schema({
      images: String,
      title: String,
      item1: String,
      item11: String,
      item111: String,
      item2: String,
      item22: String,
      item222: String,
      item3: String,
      item33: String,
      item333: String,
      item4: String,
      item44: String,
      item444: String
});

module.exports = mongoose.model('advantage', advantageSchema);
