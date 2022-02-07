const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const keyboards = require("../../keyboards");

const scene = new Scenes.BaseScene('admin');

scene.enter(ctx => {
    let text = ctx.i18n.t('admin.welcome');
    let keyboard = keyboards.admin.welcome(ctx);
    ctx.reply(text, keyboard);
});

scene.hears(match('keyboards.admin.getDb'), ctx => ctx.scene.enter('admin:getDb'));

scene.hears(match('keyboards.admin.updateDb'), ctx => ctx.scene.enter('admin:updateDb'));

module.exports = scene;