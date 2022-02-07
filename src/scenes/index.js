const { Scenes } = require("telegraf");

const stage = new Scenes.Stage([
    require('./start'),
    ...require('./menu'),
    require('./comment'),
    require('./settings'),
    require('./language'),
    ...require('./admin'),
]);

module.exports = stage;