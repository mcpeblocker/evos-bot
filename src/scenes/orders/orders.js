const { Scenes } = require("telegraf");
const db = require("../../database");
const { getOrderText } = require("../../utils/send");
const dayjs = require('dayjs');

const scene = new Scenes.BaseScene('orders');

scene.enter(async ctx => {
    let orders = await db.controllers.orders.getByUser(ctx.session.user._id);
    if (orders.length < 1) {
        let text = ctx.i18n.t('empty');
        ctx.reply(text);
    } else {
        orders = orders.sort((o1, o2) => new Date(o2.date) - new Date(o1.date));
        for (let order of orders) {
            // filter orders by status and date
            if (
                (['delivered', 'cancelled'].includes(order.status))
                &&
                (dayjs(order.date).isBefore(dayjs().subtract(1, 'month')))
            ) continue;
            
            let text = await getOrderText(order);
            ctx.replyWithHTML(text);
            break;
        };
    }
    ctx.scene.enter('start');
})

module.exports = scene;