const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const keyboards = require("../keyboards");

const scene = new Scenes.BaseScene('settings');

scene.enter(ctx => {
    let text = ctx.i18n.t('choose');
    let keyboard = keyboards.settings(ctx);
    ctx.reply(text, keyboard);
});

scene.hears(match('keyboards.settings.language'), ctx => ctx.scene.enter('language'));
scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('start'));

module.exports = scene;