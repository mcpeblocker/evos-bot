const { Scenes } = require('telegraf');
const { match } = require('telegraf-i18n');
const db = require('../../database');
const keyboards = require('../../keyboards');
const format = require('../../utils/format');
const { postOrder } = require('../../utils/send');

const scene = new Scenes.WizardScene(
    'basket:order',
    (ctx) => {
        if (!ctx.session.address) {
            return ctx.scene.enter('basket:addresses');
        }
        ctx.wizard.state.address = ctx.session.address;
        let text = ctx.i18n.t('order.phone');
        let keyboard = keyboards.basket.phone(ctx);
        ctx.replyWithHTML(text, keyboard);
        ctx.wizard.next();
    },
    (ctx) => {
        let phone = null;
        if (ctx.message.contact) {
            phone = ctx.message.contact.phone_number;
        } else {
            phone = ctx.message.text
        }
        phone = format.phone(phone);
        ctx.wizard.state.phone = phone;
        let text = ctx.i18n.t('order.payment');
        let keyboard = keyboards.basket.payments(ctx);
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        const methods = {"💵 Naqd": "cash", "💳 Click": "click", "📱 Payme": "payme"};
        let method = methods[ctx.message.text];
        if (!method) return ctx.scene.reenter();
        ctx.wizard.state.paymentMethod = method;

        // save to db
        ctx.wizard.state.user = ctx.session.user;
        const order = await db.controllers.orders.create(ctx.wizard.state);
        for (item of ctx.session.basket) {
             await db.controllers.orderItems.create({...item, order});
        }
        await postOrder(ctx, order);
        let text = ctx.i18n.t('order.success');
        ctx.reply(text);
        ctx.session.basket = [];
        ctx.session.address = null;
        ctx.scene.enter('start');
    },
)

scene.hears(match('keyboards.common.back'), ctx => {
    ctx.session.address = null;
    ctx.scene.enter('basket');
});

module.exports = scene;