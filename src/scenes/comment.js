const { Scenes } = require("telegraf");
const keyboards = require("../keyboards");
const { copyToAdmins } = require("../utils/send");

const scene = new Scenes.WizardScene(
    'comment',
    (ctx) => {
        let text = ctx.i18n.t('comment.write');
        let keyboard = keyboards.common.back(ctx);
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        let comment = ctx.message?.text;
        if (!comment) {
            return ctx.scene.reenter();
        }
        await copyToAdmins(ctx);
        let text = ctx.i18n.t('comment.done');
        ctx.reply(text);
        ctx.scene.enter('start');
    }
);

module.exports = scene;