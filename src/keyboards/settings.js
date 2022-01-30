const { Markup } = require("telegraf");

module.exports = ctx => Markup.keyboard([
    [ctx.i18n.t('keyboards.settings.language')],
    [ctx.i18n.t('keyboards.common.back')]
]).resize();