const { Order } = require("../models")

const create = async (data) => {
    const order = new Order(data);
    return await order.save();
};

const getOne = async (id) => {
    return await Order.findById(id).populate('address user');
};

const getMany = async (conditions, population = {}) => {
    return await Order.find(conditions).populate(population);
};

const getByUser = async (user) => {
    return await Order.find({ user }).populate('address user');
};

const updateStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(id, { $set: { status } }).populate('address user');
}

module.exports = {
    create,
    getOne,
    getMany,
    updateStatus,
    getByUser
};