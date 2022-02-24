const ExcelJS = require('exceljs');
const { Stream } = require('stream');
const logger = require('./logger');
const db = require('../database');
const { Category, Subcategory, Product } = db.models;

exports.generateDb = async ({
    categories,
    subcategories,
    products,
    orders,
    users
}) => {
    const workbook = new ExcelJS.Workbook();

    // categories
    const categoriesSheet = workbook.addWorksheet('Kategoriyalar');
    categoriesSheet.columns = [
        { header: 'T/r', key: 'number', width: 5 },
        { header: 'Nomi(uz)', key: 'name_uz', width: 30 },
        { header: 'Nomi(ru)', key: 'name_ru', width: 30 },
        { header: 'Nomi(en)', key: 'name_en', width: 30 },
    ];
    categories.forEach((category, index) => {
        category.number = index + 1;
        category.name_uz = category.name.uz;
        category.name_ru = category.name.ru;
        category.name_en = category.name.en;
        categoriesSheet.addRow(category);
    });
    categoriesSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    // subcategories
    const subcategoriesSheet = workbook.addWorksheet('Sub-Kategoriyalar');
    subcategoriesSheet.columns = [
        { header: 'T/r', key: 'number', width: 5 },
        { header: 'Nomi(uz)', key: 'name_uz', width: 30 },
        { header: 'Nomi(ru)', key: 'name_ru', width: 30 },
        { header: 'Nomi(en)', key: 'name_en', width: 30 },
        { header: 'Rasm', key: 'image', width: 10 },
        { header: 'Kategoriya(uz)', key: "category_uz", width: 20 },
        { header: 'Kategoriya(ru)', key: "category_ru", width: 20 },
        { header: 'Kategoriya(en)', key: "category_en", width: 20 },
    ];
    subcategories.forEach((subcategory, index) => {
        subcategory.number = index + 1;
        subcategory.name_uz = subcategory.name.uz;
        subcategory.name_ru = subcategory.name.ru;
        subcategory.name_en = subcategory.name.en;
        subcategory.category_uz = subcategory.category.name.uz;
        subcategory.category_ru = subcategory.category.name.ru;
        subcategory.category_en = subcategory.category.name.en;
        subcategoriesSheet.addRow(subcategory);
    });
    subcategoriesSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    // products
    const productsSheet = workbook.addWorksheet('Mahsulotlar');
    productsSheet.columns = [
        { header: 'T/r', key: 'number', width: 5 },
        { header: 'Nomi(uz)', key: 'name_uz', width: 30 },
        { header: 'Nomi(ru)', key: 'name_ru', width: 30 },
        { header: 'Nomi(en)', key: 'name_en', width: 30 },

        { header: "Ma'lumot(uz)", key: 'description_uz', width: 30 },
        { header: "Ma'lumot(ru)", key: 'description_ru', width: 30 },
        { header: "Ma'lumot(en)", key: 'description_en', width: 30 },
        { header: "Narxi", key: 'price', width: 10 },
        { header: 'Rasm', key: 'image', width: 10 },
        { header: 'Sub-Kategoriya(uz)', key: "subcategory_uz", width: 20 },
        { header: 'Sub-Kategoriya(ru)', key: "subcategory_ru", width: 20 },
        { header: 'Sub-Kategoriya(en)', key: "subcategory_en", width: 20 },
    ];
    products.forEach((product, index) => {
        product.number = index + 1;

        // i18n names
        product.name_uz = product.name.uz;
        product.name_ru = product.name.ru;
        product.name_en = product.name.en;

        // i18n descriptions
        product.description_uz = product.description.uz;
        product.description_ru = product.description.ru;
        product.description_en = product.description.en;
        product.subcategory_uz = product.subcategory.name.uz;
        product.subcategory_ru = product.subcategory.name.ru;
        product.subcategory_en = product.subcategory.name.en;
        productsSheet.addRow(product);
    });
    productsSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    // orders
    const ordersSheet = workbook.addWorksheet('Buyurtmalar');
    ordersSheet.columns = [
        { header: 'T/r', key: 'number', width: 5 },
        { header: 'Telefon', key: 'phone', width: 30 },
        { header: "Manzil", key: 'address_name', width: 40 },
        { header: "To'lov turi", key: 'paymentMethod', width: 10 },
        // { header: "Yetkazib berish vaqti", key: 'deliveryTime', width: 10 },
        { header: 'Holati', key: 'status', width: 15 },
    ];
    let statuses = {
        "new": "Yangi",
        "accepted": "Qabul qilingan",
        "cancelled": "Bekor qilingan",
        "delivered": "Yetkazib berilgan"
    }
    orders.forEach((order, index) => {
        order.number = index + 1;
        order.status = statuses[order.status];
        order.address_name = order.address.name
        ordersSheet.addRow(order);
    });
    ordersSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    // users
    const usersSheet = workbook.addWorksheet('Foydalanuvchilar');
    usersSheet.columns = [
        { header: 'T/r', key: 'number', width: 10 },
        { header: 'Nomi', key: 'name', width: 30 },
        { header: 'Til', key: 'language', width: 5 },
    ];
    users.forEach((user, index) => {
        user.number = index + 1;
        usersSheet.addRow(user);
    });
    usersSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    return await workbook.xlsx.writeBuffer();
}

exports.updateDb = async (data, cb) => {
    let workbook = new ExcelJS.Workbook();
    const stream = new Stream.Readable();
    stream.push(data);
    stream.push(null);
    workbook.xlsx.read(stream).then(async workbook => {
        const categoriesSheet = workbook.getWorksheet('Kategoriyalar');
        const subcategoriesSheet = workbook.getWorksheet('Sub-Kategoriyalar');
        const productsSheet = workbook.getWorksheet('Mahsulotlar');

        if (!categoriesSheet || !subcategoriesSheet || !productsSheet) {
            return cb(false);
        }

        // categories
        let categories = [];
        categoriesSheet.eachRow(row => {
            if (row.number > 1) {
                categories.push({
                    name: {
                        uz: row.getCell(2).value,
                        ru: row.getCell(3).value,
                        en: row.getCell(4).value
                    }
                });
            }
        }
        );

        await Category.deleteMany({});
        await Category.insertMany(categories);


        // do the same for others at once
        let subcategories = [];

        // subcategoriesSheet.eachRow(async row => {
        for (let i = 0; i < subcategoriesSheet.rowCount; i++) {
            let row = subcategoriesSheet.getRow(i + 1);
            if (row.number > 1) {
                let category = await Category.findOne({
                    'name.uz': row.getCell(6).value,
                    'name.ru': row.getCell(7).value,
                    'name.en': row.getCell(8).value
                }).select('_id')
                if (!category) {
                    logger.warn('Category not found');
                    return cb(false);
                    // return { success: true, message: 'Kategoriya topilmadi' }
                };
                subcategories.push({
                    name: {
                        uz: row.getCell(2).value,
                        ru: row.getCell(3).value,
                        en: row.getCell(4).value
                    },
                    image: row.getCell(5).value?.text || row.getCell(5).value,
                    category: category._id
                });
            }
        }
        // }
        await Subcategory.deleteMany({});
        await Subcategory.insertMany(subcategories);


        let products = [];
        // productsSheet.eachRow(async row => {
        for (let i = 0; i < productsSheet.rowCount; i++) {
            let row = productsSheet.getRow(i + 1);
            if (row.number > 1) {
                let subcategory = await Subcategory.findOne({
                    'name.uz': row.getCell(10).value,
                    'name.ru': row.getCell(11).value,
                    'name.en': row.getCell(12).value
                }).select('_id')
                if (!subcategory) {
                    if (!row.getCell(10).value || !row.getCell(11).value || !row.getCell(12).value) {
                        continue;
                    }
                    logger.warn('Subcategory not found');
                    return cb(false);
                    // return { success: true, message: 'Sub-Kategoriya topilmadi' }
                };
                products.push({
                    name: {
                        uz: row.getCell(2).value,
                        ru: row.getCell(3).value,
                        en: row.getCell(4).value
                    },
                    description: {
                        uz: row.getCell(5).value,
                        ru: row.getCell(6).value,
                        en: row.getCell(7).value
                    },
                    price: parseInt(row.getCell(8).value),
                    image: row.getCell(9).value.text || row.getCell(9).value,
                    subcategory: subcategory._id
                })
            }
        }
        // })

        await Product.deleteMany({});
        await Product.insertMany(products);

        cb(true);
    })
}