const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    userId: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        default: 'ru'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;