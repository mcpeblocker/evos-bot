const { Scenes } = require("telegraf");
const db = require("../../database");
const { getOrderText } = require("../../utils/send");

const scene = new Scenes.BaseScene('orders');

scene.enter(async ctx => {
    const orders = await db.controllers.orders.getByUser(ctx.session.user._id);
    if (orders.length < 1) {
        let text = ctx.i18n.t('empty');
        ctx.reply(text);
    } else {
        for (let order of orders) {
            let text = await getOrderText(order);
            ctx.replyWithHTML(text);
        };
    }
    ctx.scene.enter('start');
})

module.exports = scene;