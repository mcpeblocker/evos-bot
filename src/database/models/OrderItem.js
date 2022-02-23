const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    amount: Number,
    product: Object,
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;