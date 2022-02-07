const { User } = require("../models")

const getMany = async (contitions = {}) => {
    return await User.find(contitions);
};

const getByUserId = async (userId) => {
    return await User.findOne({ userId });
};

const create = async (data) => {
    const user = new User(data);
    return await user.save();
};

module.exports = {
    getMany,
    getByUserId,
    create
};