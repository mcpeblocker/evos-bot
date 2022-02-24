require('dotenv').config();
require('./database');

const bot = require('./core/bot');
const session = require('./core/session');
const i18n = require('./core/i18n');
const stage = require('./scenes');
const startBot = require('./utils/startBot');
const auth = require('./middlewares/auth');
const checkSession = require('./middlewares/checkSession');
const { handlePostActions } = require('./keyboards/order');
const logger = require('./utils/logger');

bot.use(session);
bot.use(i18n.middleware());
bot.use(checkSession);
bot.use(auth);
bot.use(stage.middleware());

bot.start(ctx => ctx.scene.enter('start'));
bot.command('admin', ctx => ctx.scene.enter('admin'));

handlePostActions(bot);

bot.catch((err, ctx) => {
    console.log(err);
    logger.error(err.message, { error: err });
    if (ctx.chat.type === "private") {
        ctx.reply(ctx.i18n.t('error'));
    }
});

startBot(bot);
