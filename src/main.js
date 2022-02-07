require('dotenv').config();
require('./database');

const bot = require('./core/bot');
const session = require('./core/session');
const i18n = require('./core/i18n');
const stage = require('./scenes');
const startBot = require('./utils/startBot');
const auth = require('./middlewares/auth');
const checkSession = require('./middlewares/checkSession');

bot.use(session);
bot.use(i18n.middleware());
bot.use(checkSession);
bot.use(auth);
bot.use(stage.middleware());

bot.start(ctx => ctx.scene.enter('start'));
bot.command('admin', ctx => ctx.scene.enter('admin'));

startBot(bot);
