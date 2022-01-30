const { Markup } = require("telegraf");

const back = ctx => Markup.keyboard([
    [ctx.i18n.t('keyboards.common.back')]
]).resize();

const language = Markup.keyboard([
    ["🇺🇿 O'zbek", "🇷🇺 Русский", "🇺🇸 English"],
]).resize();

module.exports = {
    back,
    language,
};