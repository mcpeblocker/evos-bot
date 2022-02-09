const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        ru: String,
        uz: String,
        en: String,
    },
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;