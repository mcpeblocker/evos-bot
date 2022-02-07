const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const db = require("../../database");
const keyboards = require("../../keyboards");
const geocoder = require('../../utils/geocoder');

const scene = new Scenes.WizardScene(
    'menu:location',
    async (ctx) => {
        let location = ctx.message.location;
        if (!location) return ctx.scene.enter('menu');
        const name = await geocoder.reverse(location.latitude, location.longitude);
        if (!name){
            let text = ctx.i18n.t('error');
            ctx.reply(text);
            return ctx.scene.enter('menu');
        }
        location.name = name;
        location.user = ctx.session.user._id;
        ctx.wizard.state.location = location;
        let text = ctx.i18n.t('menu.confirmLocation', { name: name || '' });
        let keyboard = keyboards.menu.confirmLocation(ctx);
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text === ctx.i18n.t('keyboards.menu.confirmLocation.no')) {
            ctx.scene.enter('menu');
        } else if (ctx.message.text === ctx.i18n.t('keyboards.menu.confirmLocation.yes')) {
            let { location } = ctx.wizard.state;
            await db.controllers.addresses.create(location);
            ctx.scene.enter('menu:categories');
        }
    }
);

scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('menu'));

module.exports = scene;