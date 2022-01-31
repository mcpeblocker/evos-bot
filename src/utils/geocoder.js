const axios = require('axios');
const config = require('./config');
const logger = require('./logger');

const reverse = async (lat, lng) => {
    const params = {
        access_key: config.GEOAPI_KEY,
        query: `${lat},${lng}`,
    }

    try {
        const res = await axios.get('http://api.positionstack.com/v1/reverse', { params })
        return res.data.data;
    } catch (err) {
        logger.error(err.message);
        return null;
    }
};

module.exports = { reverse };