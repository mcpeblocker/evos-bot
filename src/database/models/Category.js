const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        ru: String,
        uz: String,
        en: String,
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;