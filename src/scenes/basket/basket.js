const { Scenes } = require('telegraf');
const db = require('../../database');
const keyboards = require('../../keyboards');

const scene = new Scenes.BaseScene('basket');

scene.enter(ctx => {
    const basket = ctx.session.basket;
    let text = ctx.i18n.t('basket.main');
    for (item of basket) {
        text += `\n\n<b>${item.product.name[ctx.i18n.locale()]}</b>`,
        text += `\n${ctx.i18n.t('basket.amount')}: ${item.amount}`;
    }
    let keyboard = keyboards.basket.main(ctx);
    ctx.replyWithHTML(text, keyboard);
});

scene.action('order', async ctx => ctx.scene.enter('basket:order'));

scene.action('cancel', ctx => {
    ctx.session.basket = [];
    ctx.scene.enter('start');
});

module.exports = scene;