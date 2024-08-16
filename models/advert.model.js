const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 10, maxlength: 50},
    content: {type: String, required: true, minlength: 20, maxlength: 1000},
    date: {type: Date, required: true, default: Date.now },
    image: {type: String, required: true},
    price: {type: String, required: true},
    location: {type: String, required: true},
    user: {type: String, required: true, ref: 'User'}

});

module.exports = mongoose.model('Advert', advertSchema);