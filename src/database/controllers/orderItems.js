const { OrderItem } = require("../models")

const create = async (data) => {
    const orderItem = new OrderItem(data);
    return await orderItem.save();
};

const getMany = async (conditions) => {
    return await OrderItem.find(conditions);
};

const getByOrder = async (order) => {
    return await OrderItem.find({ order }).populate('product');
};

module.exports = {
    create,
    getMany,
    getByOrder
};