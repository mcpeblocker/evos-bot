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
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;