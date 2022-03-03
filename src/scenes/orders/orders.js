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
        // filter orders that aren't delivered and issued in a month
        // orders = orders.filter(order => {
        //     if (['delivered', 'cancelled'].includes(order.status)) return false;
        //     if (dayjs(order.date).isBefore(dayjs().subtract(1, 'month'))) return false;
        //     return true;
        // });
        for (let order of orders) {
            // filter orders by status and date
            if (
                (['delivered', 'cancelled'].includes(order.status))
                &&
                (dayjs(order.date).isBefore(dayjs().subtract(1, 'month')))
            ) continue;

            let text = await getOrderText(order);
            ctx.replyWithHTML(text);
        };
    }
    ctx.scene.enter('start');
})

module.exports = scene;