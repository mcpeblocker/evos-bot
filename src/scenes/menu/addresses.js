const { Scenes } = require("telegraf");
const db = require('../../database');
const keyboards = require('../../keyboards');

const scene = new Scenes.WizardScene(
    'menu:addresses',
    async (ctx) => {
        const addresses = await db.controllers.addresses.getByUser(ctx.session.user._id);
        ctx.scene.state.addresses = addresses;
        let text;
        if (!addresses?.length) {
            text = ctx.i18n.t('menu.address.empty');
            ctx.reply(text);
            return ctx.scene.enter('menu');
        }
        text = ctx.i18n.t('choose');
        let keyboard = keyboards.menu.addresses(ctx, addresses);
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    (ctx) => {
        const name = ctx.message?.text;
        if (!name) return ctx.scene.reenter();
        const address = ctx.scene.state.addresses?.find(a => a.name === name);
        if (!address) return ctx.scene.reenter();
        ctx.session.address = address;
        ctx.scene.enter('menu:categories');
    }
);

module.exports = scene;