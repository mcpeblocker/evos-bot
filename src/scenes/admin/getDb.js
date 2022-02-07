const { Scenes } = require("telegraf");
const db = require("../../database");
const excel = require('../../utils/excel');

const scene = new Scenes.BaseScene('admin:getDb');

scene.enter(async (ctx) => {
    const categories = await db.controllers.categories.getMany();
    const products = await db.controllers.products.getMany({}, { path: 'category' });
    const orders = await db.controllers.orders.getMany({}, { path: 'user' });
    const users = await db.controllers.users.getMany();

    const data = await excel.generateDb({
        categories,
        products,
        orders,
        users
    });

    ctx.replyWithDocument({ source: data, filename: 'baza.xlsx' })
});

module.exports = scene;