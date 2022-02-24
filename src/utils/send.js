const { Markup } = require('telegraf');
const db = require("../database");
const config = require("./config");

exports.copyToAdmins = async (ctx) => {
    for (let admin of config.ADMINS) {
        try {
            await ctx.forwardMessage(parseInt(admin));
        } catch (e) { }
    }
    return true;
}

let statuses = {
    'new': "🆕 Yangi",
    'accepted': "✅ Qabul qilingan",
    'cancelled': '🛑 Bekor qilingan',
    'delivered': '🚚 Yetkazilgan'
};
let methods = {
    'cash': '💰 Naqd',
    'click': '🔂 Click',
    'payme': '📱 Payme'
};

const postKeyboard = (order) => {
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

exports.postOrder = async (ctx, order) => {
    let text = await getOrderText(order);
    const keyboard = postKeyboard(order);
    ctx.telegram.sendMessage(config.CHANNEL_ID, text, { parse_mode: 'HTML', ...keyboard });
}

const getOrderText = async order => {
    let text = `<a href="tg://user?id=${order.user.userId}">Foydalanuvchi</a>\n<b>Telefon:</b> <code>${order.phone}</code>\n<b>Manzil:</b> ${order.address.name}\n<b>To'lov turi:</b> ${methods[order.paymentMethod]}\n<b>Holati:</b> ${statuses[order.status]}\n<b>Mahsulotlar:</b>\n`;
    const items = await db.controllers.orderItems.getByOrder(order._id);
    if (items.length < 1) {
        text += "📭 Bo'sh";
    } else {
        for (let i in items) {
            let item = items[i];
            text += `\n${+i + 1}. ${item.product?.name?.ru || "Noma'lum mahsulot"} - <i>x${item.amount}</i>`;
        }
    }

    text += `\n<b>Summa:</b> ${items.reduce((acc, cur) => acc += cur.amount * cur.product.price, 0)}`;

    return text;
};

exports.getOrderText = getOrderText;