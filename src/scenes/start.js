const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const keyboards = require("../keyboards");

const scene = new Scenes.BaseScene('start');

scene.enter((ctx) => {
    let text = ctx.i18n.t("choose");
    let keyboard = keyboards.start.main(ctx);
    ctx.reply(text, keyboard);
});

scene.hears(match('keyboards.main.menu'), ctx => ctx.scene.enter('menu:categories'));
scene.hears(match('keyboards.main.basket'), ctx => ctx.scene.enter('basket'));
scene.hears(match('keyboards.main.orders'), ctx => ctx.scene.enter('orders'));
scene.hears(match('keyboards.main.comment'), ctx => ctx.scene.enter('comment'));
scene.hears(match('keyboards.main.settings'), ctx => ctx.scene.enter('settings'));

module.exports = scene;