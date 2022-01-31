const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger');

mongoose.connect(config.MONGO_URI, (err) => {
    if (err) throw err;
    logger.info('Connected to MongoDB');
});

module.exports = {
    controllers: require('./controllers'),
    models: require('./models')
}