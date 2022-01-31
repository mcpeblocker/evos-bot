const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        ru: String,
        uz: String,
        en: String,
    },
    description: {
        ru: String,
        uz: String,
        en: String,
    },
    price: Number,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;