const { Order } = require("../models")

const create = async (data) => {
    const order = new Order(data);
    return await order.save();
};

const getMany = async (conditions, population = {}) => {
    return await Order.find(conditions).populate(population);
};

const getByUser = async (conditions) => {
    return await Order.find({ user });
};

module.exports = {
    create,
    getMany,
    getByUser
};