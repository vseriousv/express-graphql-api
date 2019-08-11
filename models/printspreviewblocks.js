const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const printspreviewblockSchema = new Schema({
      imgid: String,
      opsectionid: String,
      titlepage: String,
      subtext_1: String,
      subtext_2: String,
      subtext_3: String,
      button_1: String,
      url_btn_1: String,
      button_2: String,
      url_btn_2: String,
      url: String,
});

module.exports = mongoose.model('printspreviewblock', printspreviewblockSchema);
