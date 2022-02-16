const { Scenes } = require('telegraf');
const { match } = require('telegraf-i18n');
const db = require('../../database');
const keyboards = require('../../keyboards');

const scene = new Scenes.BaseScene('basket');

scene.enter(ctx => {
    const basket = ctx.session.basket;
    let text = ctx.i18n.t('basket.main');
    if (!basket?.length) {
        text = ctx.i18n.t('basket.empty');
        ctx.reply(text);
        return ctx.scene.enter('start');
    }
    for (item of basket) {
        text += `\n\n<b>${item.product.name[ctx.i18n.locale()]}</b>`,
        text += `\n${ctx.i18n.t('basket.amount')}: ${item.amount}`;
    }
    let keyboard = keyboards.basket.main(ctx);
    ctx.replyWithHTML(text, keyboard);
});

scene.hears(match('keyboards.basket.order'), async ctx => ctx.scene.enter('basket:order'));

scene.hears(match('keyboards.basket.cancel'), ctx => {
    ctx.session.basket = [];
    ctx.scene.enter('start');
});

scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('start'));

module.exports = scene;