const { Address } = require("../models")

const create = async (data) => {
    const address = new Address(data);
    return await address.save();
}

// get all addresses
const getMany = async (conditions = {}) => {
    return await Address.find(conditions);
}

// get single address by user
const getByUser = async (user) => {
    return await Address.findOne({ user });
}

module.exports = {
    create,
    getMany,
    getByUser
};