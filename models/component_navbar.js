const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const componentNavbarSchema = new Schema({
    name: String,
    menu_items: Array({
        id: String,
        name: String,
        child: String,
        link: String
    })
});

module.exports = mongoose.model('components', componentNavbarSchema);