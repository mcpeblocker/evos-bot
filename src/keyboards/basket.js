const { Markup } = require("telegraf");

exports.main = (ctx) => Markup.keyboard([
    [ctx.i18n.t('keyboards.basket.order')],
    [ctx.i18n.t('keyboards.basket.cancel')],
    [ctx.i18n.t('keyboards.common.back')]
]).resize();

exports.phone = (ctx) => Markup.keyboard([
    Markup.button.contactRequest(ctx.i18n.t('keyboards.order.phone'))
]).resize();

exports.payments = (ctx) => {
    let methods = ["💵 Naqd", "💳 Click", "📱 Payme"];
    return Markup.keyboard([
        methods,
        [ctx.i18n.t('keyboards.common.back')]
    ]).resize();
}

exports.location = (ctx) => Markup.keyboard([
    [Markup.button.locationRequest(ctx.i18n.t('keyboards.menu.location'))],
    [Markup.button.text(ctx.i18n.t('keyboards.common.back'))]
]).resize();