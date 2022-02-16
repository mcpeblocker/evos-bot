const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    deliveryTime: Date,
    phone: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'click', 'payme']
    },
    status: {
        type: String,
        enum: ['new', 'accepted', 'cancelled', 'delivered'],
        default: 'new'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;