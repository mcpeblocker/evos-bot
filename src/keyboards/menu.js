const { Markup } = require("telegraf");

const location = (ctx) => Markup.keyboard([
    [Markup.button.locationRequest(ctx.i18n.t('keyboards.menu.location'))],
    [ctx.i18n.t('keyboards.menu.addresses'), ctx.i18n.t('keyboards.common.back')],
]).resize();

const confirmLocation = (ctx) => Markup.keyboard([
    [
        ctx.i18n.t('keyboards.menu.confirmLocation.no'),
        ctx.i18n.t('keyboards.menu.confirmLocation.yes'),
    ],
    [ctx.i18n.t('keyboards.common.back')],
]).resize();

module.exports = {
    location,
    confirmLocation,
};