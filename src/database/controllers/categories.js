const { Category } = require("../models")

// create Category
const create = async (data) => {
    const category = new Category(data);
    return await category.save();
};

const getMany = async (conditions = {}) => {
    return await Category.find(conditions);
};

const getById = async (id) => {
    return await Category.findById(id);
};

module.exports = {
    create,
    getMany,
    getById
};