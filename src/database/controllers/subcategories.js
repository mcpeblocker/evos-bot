const { Subcategory } = require("../models");

// create Subcategory
const create = async (data) => {
    const subcategory = new Subcategory(data);
    return await subcategory.save();
};

const getMany = async (conditions = {}, populations) => {
    return await Subcategory.find(conditions).populate(populations);
};

const getById = async (id) => {
    return await Subcategory.findById(id);
};

module.exports = {
    create,
    getMany,
    getById
};