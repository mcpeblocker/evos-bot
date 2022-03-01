const { Markup } = require("telegraf");

const confirmLocation = (ctx) => Markup.keyboard([
    [
        ctx.i18n.t('keyboards.menu.confirmLocation.no'),
        ctx.i18n.t('keyboards.menu.confirmLocation.yes'),
    ],
    [ctx.i18n.t('keyboards.common.back')],
]).resize();

const addresses = (ctx, addresses) => {
    let keyboard = [ctx.i18n.t('keyboards.menu.location')];
    for (let address of addresses) {
        keyboard.push(address.name);
    }
    keyboard.push(ctx.i18n.t('keyboards.common.back'));
    return Markup.keyboard(keyboard).resize();
};

const categories = (ctx, categories) => {
    let keyboard = [];
    let row = [];
    for (let category of categories) {
        if (row.length === 2) {
            keyboard.push(row);
            row = [];
        }
        row.push(category.name[ctx.i18n.locale()]);
    }
    if (row.length) keyboard.push(row);
    keyboard.push([ctx.i18n.t('keyboards.common.back')]);
    return Markup.keyboard(keyboard).resize();
}

const subcategories = (ctx, subcategories) => {
    let keyboard = [];
    let row = [];
    for (let category of subcategories) {
        if (row.length === 2) {
            keyboard.push(row);
            row = [];
        }
        row.push(category.name[ctx.i18n.locale()]);
    }
    if (row.length) keyboard.push(row);
    keyboard.push([ctx.i18n.t('keyboards.common.back')]);
    return Markup.keyboard(keyboard).resize();
}

const products = (ctx, products) => {
    let keyboard = [];
    let row = [];
    for (let product of products) {
        if (row.length === 2) {
            keyboard.push(row);
            row = [];
        }
        row.push(product.name[ctx.i18n.locale()]);
    }
    if (row.length) keyboard.push(row);
    keyboard.push([ctx.i18n.t('keyboards.common.back')]);
    return Markup.keyboard(keyboard).resize();
}

const product = (ctx, product) => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback("➖", "dec"),
            Markup.button.callback(ctx.scene.state.amount, "amount"),
            Markup.button.callback("➕", "inc"),
        ],
        [Markup.button.callback(ctx.i18n.t('keyboards.product.save'), 'save')]
    ])
}

module.exports = {
    confirmLocation,
    addresses,
    categories,
    subcategories,
    products,
    product
};