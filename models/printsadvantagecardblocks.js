const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const printsadvantagecardblockSchema = new Schema({
      title: String,
      cart_1_img: String,
      cart_1_header: String,
      cart_1_text: String,
      cart_2_img: String,
      cart_2_header: String,
      cart_2_text: String,
      cart_3_img: String,
      cart_3_header: String,
      cart_3_text: String,
      url: String
});

module.exports = mongoose.model('printsadvantagecardblock', printsadvantagecardblockSchema);
