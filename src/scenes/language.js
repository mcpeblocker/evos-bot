const { Scenes } = require("telegraf");
const keyboards = require("../keyboards");

const scene = new Scenes.WizardScene(
    'language',
    (ctx) => {
        ctx.i18n.locale("uz");
        let text = ctx.i18n.t("language") + "\n";
        ctx.i18n.locale("ru");
        text += ctx.i18n.t("language") + "\n";
        ctx.i18n.locale("en");
        text += ctx.i18n.t("language");
        let keyboard = keyboards.common.language;
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    (ctx) => {
        let lang = ctx.message?.text;
        let languages = [
            { name: "uz", text: "🇺🇿 O'zbek" },
            { name: "ru", text: "🇷🇺 Русский" },
            { name: "en", text: "🇺🇸 English" },
        ];
        lang = languages.find(language => language.text === lang)?.name;
        if (!lang) {
            return ctx.scene.reenter();
        }
        ctx.i18n.locale(lang);
        ctx.session.language = lang;
        ctx.scene.enter('start');
    }
);

module.exports = scene;