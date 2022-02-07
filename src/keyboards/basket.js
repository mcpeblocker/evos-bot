const { Markup } = require("telegraf");

exports.main = (ctx) => Markup.inlineKeyboard([
    [Markup.button.callback(ctx.i18n.t('keyboards.basket.order'), 'order')],
    [Markup.button.callback(ctx.i18n.t('keyboards.basket.cancel'), 'cancel')]
])

exports.phone = (ctx) => Markup.inlineKeyboard([
    Markup.button.contactRequest(ctx.i18n.t('keyboards.order.phone'))
])

exports.payment = (ctx) => {
    let methods = ["💵 Naqd", "💳 Click", "📱 Payme"];
    return Markup.keyboard([
        methods,
        [ctx.i18n.t('keyboards.common.back')]
    ])
}