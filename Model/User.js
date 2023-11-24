const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    pins: {
        type: Array
    },
    info: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

const Item = mongoose.model('User', schema);

module.exports = Item