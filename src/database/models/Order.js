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
        enum: ['new', 'accepted', 'canceled', 'delivered']
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;