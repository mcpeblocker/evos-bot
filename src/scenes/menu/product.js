const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const keyboards = require("../../keyboards");

const scene = new Scenes.BaseScene('menu:product');

scene.enter(async ctx => {
    const product = ctx.session.product;
    let lang = ctx.i18n.locale();
    let text = `<b>${product.name[lang]}</b>`;
    text += `\n${product.description[lang]}`;
    text += `\n${ctx.i18n.t('menu.product.price')}: ${product.price}`;
    ctx.scene.state.amount = 1;
    let keyboard = keyboards.common.back(ctx);
    ctx.replyWithPhoto(product.image, keyboard);
    keyboard = keyboards.menu.product(ctx);
    ctx.replyWithHTML(text, keyboard);
});

scene.action("inc", (ctx) => {
    ctx.scene.state.amount += 1;
    let keyboard = keyboards.menu.product(ctx);
    ctx.editMessageReplyMarkup(keyboard.reply_markup);
});

scene.action("dec", (ctx) => {
    if (ctx.scene.state.amount === 1) {
        return ctx.answerCbQuery(ctx.i18n.t('menu.product.fill'));
    }
    ctx.scene.state.amount -= 1;
    let keyboard = keyboards.menu.product(ctx);
    ctx.editMessageReplyMarkup(keyboard.reply_markup);
});

scene.action('save', (ctx) => {
    ctx.deleteMessage();
    let basket = ctx.session.basket || [];
    let index = basket.findIndex(item => item.product._id == ctx.session.product._id);
    if (index >= 0) {
        basket[index].amount += ctx.scene.state.amount;
    } else {
        basket.push({
            amount: ctx.scene.state.amount,
            product: ctx.session.product
        });
    }
    ctx.session.basket = basket;
    ctx.session.product = null;
    ctx.session.category = null;
    ctx.session.subcategory = null;
    ctx.scene.enter('menu:categories');
})

scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('menu:products'));

module.exports = scene;