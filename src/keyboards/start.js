const { Markup } = require("telegraf");

const main = (ctx) => Markup.keyboard([
    [ctx.i18n.t('keyboards.main.menu')],
    [ctx.i18n.t('keyboards.main.orders')],
    [ctx.i18n.t('keyboards.main.comment'),ctx.i18n.t('keyboards.main.settings')],
]).resize();

module.exports = {
    main
};