const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const db = require("../../database");
const keyboards = require("../../keyboards");

const scene = new Scenes.WizardScene(
    'menu:categories',
    async (ctx) => {
        const categories = await db.controllers.categories.getMany();
        ctx.wizard.state.categories = categories;
        let text = ctx.i18n.t('choose');
        let keyboard = keyboards.menu.categories(ctx, categories);
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        const categories = ctx.wizard.state.categories;
        const category = categories.find(c => c.name[ctx.i18n.locale()] === ctx.message.text);
        if (!category) {
            return ctx.scene.reenter();
        }
        ctx.session.category = category;
        ctx.scene.enter('menu:subcategories');
    }
);

scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('start'));

module.exports = scene;