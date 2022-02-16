const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const db = require("../../database");
const keyboards = require("../../keyboards");

const scene = new Scenes.WizardScene(
    'menu:subcategories',
    async (ctx) => {
        const subcategories = await db.controllers.subcategories.getMany({ category: ctx.session.category._id });
        ctx.wizard.state.subcategories = subcategories;
        let text = ctx.i18n.t('choose');
        let keyboard = keyboards.menu.subcategories(ctx, subcategories);
        ctx.reply(text, keyboard);
        return ctx.wizard.next();
    },
    async (ctx) => {
        const subcategories = ctx.wizard.state.subcategories;
        const subcategory = subcategories.find(c => c.name[ctx.i18n.locale()] === ctx.message.text);
        if (!subcategory) {
            return ctx.scene.reenter();
        }
        ctx.session.subcategory = subcategory;
        ctx.scene.enter('menu:products');
    }
);

scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('menu:categories'));

module.exports = scene;