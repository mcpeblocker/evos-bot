const { User } = require("../models")

const getUsers = async (contitions = {}) => {
    return await User.find(contitions);
};

const getUserById = async (id) => {
    return await User.findById({ id });
};

const createUser = async (data) => {
    const user = new User(data);
    return await user.save();
};

module.exports = {
    getUsers,
    getUserById,
    createUser
};