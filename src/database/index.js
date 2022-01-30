const mongoose = require('mongoose');
const config = require('../utils/config');

mongoose.connect(config.MONGO_URI, (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
});

module.exports = {
    controllers: require('./controllers'),
    models: require('./models')
}