const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const db = require('../../database');
const keyboards = require('../../keyboards');

const scene = new Scenes.WizardScene(
    'basket:addresses',
    async (ctx) => {
        const addresses = await db.controllers.addresses.getByUser(ctx.session.user._id);
        ctx.scene.state.addresses = addresses;
        let text;
        if (!addresses?.length) {
            return ctx.scene.enter('basket:location');
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
        ctx.scene.enter('basket:order');
    }
);

scene.hears(match('keyboard.menu.location'), ctx => ctx.scene.enter('basket:location'));
// scene.on('location', ctx => ctx.scene.enter('basket:location'));

module.exports = scene;
