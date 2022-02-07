const { Scenes } = require("telegraf");
const keyboards = require('../../keyboards');

const scene = new Scenes.WizardScene(
    'admin:updateDb',
    (ctx) => {
        let text = ctx.i18n.t('admin.updateDb.send');
        let keyboard = keyboards.common.back(ctx);
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        let file = ctx.message?.document;
        console.log(file);
        let text = ctx.i18n.t('admin.updateDb.success');
        ctx.reply(text);
        ctx.scene.enter('admin');
    }
);

module.exports = scene;