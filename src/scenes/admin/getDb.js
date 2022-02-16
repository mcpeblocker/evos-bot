const { Scenes } = require("telegraf");
const db = require("../../database");
const excel = require('../../utils/excel');

const scene = new Scenes.BaseScene('admin:getDb');

scene.enter(async (ctx) => {
    const categories = await db.controllers.categories.getMany();
    const subcategories = await db.controllers.subcategories.getMany({}, 'category');
    const products = await db.controllers.products.getMany({}, 'subcategory');
    const orders = await db.controllers.orders.getMany({}, { path: 'user address' });
    const users = await db.controllers.users.getMany();

    const data = await excel.generateDb({
        categories,
        subcategories,
        products,
        orders,
        users
    });

    ctx.replyWithDocument({ source: data, filename: 'baza.xlsx' })
});

module.exports = scene;