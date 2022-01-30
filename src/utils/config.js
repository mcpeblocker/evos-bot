const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    BOT_TOKEN: process.env.BOT_TOKEN,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    SESSION_TYPE: process.env.SESSION_TYPE,
    DOMAIN: process.env.DOMAIN,
    PORT: process.env.PORT,
    ADMINS: process.env.ADMINS?.split(',') || [],
    MONGO_URI: process.env.MONGO_URI,
};

module.exports = config;