const { Product } = require("../models")

const create = async (data) => {
    const product = new Product(data);
    return await product.save();
};

const getMany = async (conditions = {}) => {
    return await Product.find(conditions);
};

const getByCategory = async (category) => {
    return await Product.find({ category });
};

module.exports = {
    create,
    getMany,
    getByCategory
};