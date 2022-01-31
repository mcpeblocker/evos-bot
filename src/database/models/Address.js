const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;