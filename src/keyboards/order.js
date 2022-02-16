const { Markup } = require("telegraf");
const db = require("../database");
const { getOrderText } = require("../utils/send");

const post = (order) => {
    return Markup.inlineKeyboard([
        [Markup.button.callback("📍", `location_${order._id}`)],
        [
            Markup.button.callback("🆕", `status_${order._id}_new`),
            Markup.button.callback("✅", `status_${order._id}_accepted`),
            Markup.button.callback("🛑", `status_${order._id}_cancelled`),
            Markup.button.callback("🚚", `status_${order._id}_delivered`),
        ]
    ])
};

let statuses = {
    'new': {
        "uz": "🆕 Yangi",
        "ru": "🆕 Новое",
        "en": "🆕 New",
    },
    'accepted': {
        "uz": "✅ Qabul qilingan",
        "ru": "✅ Принято",
        "en": "✅ Accepted",
    },
    'cancelled': {
        "uz": '🛑 Bekor qilingan',
        "ru": '🛑 Отменено',
        "en": '🛑 Cancelled',
    },
    'delivered': {
        "uz": '🚚 Yetkazilgan',
        "ru": '🚚 Доставлено',
        "en": '🚚 Delivered',
    }
};

const handlePostActions = (bot) => {
    bot.action(/location_(.+)/, async ctx => {
        let id = ctx.match[1];
        const order = await db.controllers.orders.getOne(id);
        ctx.replyWithLocation(order.address.latitude, order.address.longitude);
    });

    bot.action(/status_(.+)_(.+)/, async ctx => {
        const id = ctx.match[1];
        const status = ctx.match[2];
        const order = await db.controllers.orders.updateStatus(id, status);
        order.status = status;
        let text = await getOrderText(order);
        const keyboard = post(order);
        ctx.editMessageText(text, { parse_mode: 'HTML', ...keyboard });
        let lang = ctx.i18n.locale();
        ctx.i18n.locale(order.user.language || lang);
        text = ctx.i18n.t('order.changedStatus', { status: statuses[status][order.user.language || "ru"] })
        ctx.i18n.locale(lang);
        ctx.telegram.sendMessage(order.user.userId, text)
    });
}

module.exports = {
    post,
    handlePostActions
}