const { Subategory } = require("../models");
const Subcategory = require("../models/Subcategory");

// create Subcategory
const create = async (data) => {
    const subcategory = new Subcategory(data);
    return await subcategory.save();
};

const getMany = async (conditions = {}) => {
    return await Subcategory.find(conditions);
};

const getById = async (id) => {
    return await Subcategory.findById(id);
};

module.exports = {
    create,
    getMany,
    getById
};