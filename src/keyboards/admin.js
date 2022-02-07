const { Markup } = require("telegraf");

exports.welcome = (ctx) => Markup.keyboard([
    [ctx.i18n.t('keyboards.admin.getDb')],
    [ctx.i18n.t('keyboards.admin.updateDb')],
]).resize();