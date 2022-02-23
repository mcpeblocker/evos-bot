const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const keyboards = require('../../keyboards');
const { updateDb } = require("../../utils/excel");
const axios = require('axios').default;

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
        if (!file) return ctx.scene.reenter();
        const { href: link } = await ctx.telegram.getFileLink(file.file_id);
        const { data } = await axios.get(link, { responseType: 'arraybuffer' });
        await updateDb(data, success => {
            if (!success) {
                let text = ctx.i18n.t('error');
                ctx.reply(text);
                ctx.scene.enter('admin');
                return
            }
            let text = ctx.i18n.t('admin.updateDb.success');
            ctx.reply(text);
            ctx.scene.enter('admin');
        });
    }
);

scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('admin'));

module.exports = scene;