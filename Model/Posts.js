const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userInfo: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    pins: {
        type: [Object],
        default: []
    },
    date: {
        type: Date,
        default: new Date()
    }
});

const Posts = mongoose.model('Post', schema);

module.exports = Posts