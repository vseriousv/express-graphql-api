const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productionportfoliocartSchema = new Schema({
      img: String,
      header: String,
      text: String,
      url: String
});

module.exports = mongoose.model('productionportfoliocart', productionportfoliocartSchema);
