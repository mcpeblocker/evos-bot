const { Scenes } = require("telegraf");
const { match } = require('telegraf-i18n');
const db = require("../../database");
const keyboards = require("../../keyboards");

const scene = new Scenes.WizardScene(
    'menu:products',
    async (ctx) => {
        const category = ctx.session.category;
        const products = await db.controllers.products.getMany({ category });
        ctx.wizard.state.products = products;
        let text = ctx.i18n.t('choose');
        let keyboard = keyboards.menu.products(ctx, products);
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        const products = ctx.wizard.state.products;
        const product = products.find(p => p.name[ctx.i18n.locale()] === ctx.message.text);
        if (!product) {
            return ctx.scene.reenter();
        }
        ctx.session.product = product;
        ctx.scene.enter('menu:product');
    }
);

scene.hears(match('keyboards.common.back'), ctx => ctx.scene.enter('menu:categories'));

module.exports = scene;