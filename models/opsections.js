const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opsectionsSchema = new Schema({
    section_id: String,
    name: String,
    text: String,
    classNameActive: String,
    valueCart: Array({
        img: String,
        hCart: String,
        pText: String
    }),
    className: String
});

module.exports = mongoose.model('opsection', opsectionsSchema);
