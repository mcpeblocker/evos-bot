const { Scenes } = require("telegraf");
const keyboards = require("../../keyboards");

const scene = new Scenes.BaseScene('menu:product');

scene.enter(async ctx => {
    const product = ctx.session.product;
    let lang = ctx.i18n.locale();
    let text = product.name[lang];
    text += `\n${product.description[lang]}`;
    text += `\n${ctx.i18n.t('product.price')}: ${product.price}`;
    ctx.scene.state.amount = 0;
    let keyboard = keyboards.menu.product(ctx);
    ctx.reply(text, keyboard);
});

scene.action("inc", (ctx) => {
    ctx.scene.state.amount += 1;
    let keyboard = keyboards.menu.product(ctx);
    ctx.editMessageReplyMarkup(keyboard.reply_markup);
});

scene.action("dec", (ctx) => {
    ctx.scene.state.amount -= 1;
    let keyboard = keyboards.menu.product(ctx);
    ctx.editMessageReplyMarkup(keyboard.reply_markup);
});

scene.action('save', (ctx) => {
    ctx.session.basket = [
        ...(ctx.session.basket || []),
        {   
            amount: ctx.scene.state.amount,
            product: ctx.session.product
        }
    ];
    ctx.session.product = null;
    ctx.scene.enter('menu:products');
})

// scene.action("back", ctx => ctx.scene.enter('menu:products'))

module.exports = scene;