const axios = require('axios');
const config = require('./config');
const logger = require('./logger');

const reverse = async (lat, lng) => {
    const params = {
        key: config.GEOAPI_KEY,
        location: `${lat},${lng}`,
    }
    try {
        const res = await axios.get('http://open.mapquestapi.com/geocoding/v1/reverse', { params })
        let location = res.data.results[0].locations[0];
        // let name = `${location.adminArea3}, ${location.adminArea4 || ""}, ${location.adminArea5}, ${location.adminArea6}, ${location.street}`;
        let name = location.adminArea3 || "";
        name += location.adminArea4 ? `, ${location.adminArea4}` : "";
        name += location.adminArea5 ? `, ${location.adminArea5}` : "";
        name += location.adminArea6 ? `, ${location.adminArea6}` : "";
        name += location.street ? `, ${location.street}` : "";
        return name;
    } catch (err) {
        logger.error(err.message);
        return null;
    }
};

module.exports = { reverse };