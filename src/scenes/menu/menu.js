const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const keyboards = require("../../keyboards");

const scene = new Scenes.BaseScene('menu');

scene.enter((ctx) => {
    let text = ctx.i18n.t('menu.location');
    let keyboard = keyboards.menu.location(ctx);
    ctx.reply(text, keyboard);
});

scene.on('location', ctx => ctx.scene.enter('menu:location'))

scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('start'));
scene.hears(match('keyboards.menu.addresses'), ctx => ctx.scene.enter('menu:addresses'));

module.exports = scene;