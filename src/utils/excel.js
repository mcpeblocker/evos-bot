const ExcelJS = require('exceljs');

exports.generateDb = async ({
    categories,
    products,
    orders,
    users
}) => {
    const workbook = new ExcelJS.Workbook();

    // categories
    const categoriesSheet = workbook.addWorksheet('Kategoriyalar');
    categoriesSheet.columns = [
        { header: 'T/r', key: 'id', width: 10 },
        { header: 'Nomi(uz)', key: 'name.uz', width: 30 },
        { header: 'Nomi(ru)', key: 'name.ru', width: 30 },
        { header: 'Nomi(en)', key: 'name.en', width: 30 },
        { header: 'Rasm', key: 'image', width: 10},
    ];
    categories.forEach((category, index) => {
        category.id = index + 1;
        categoriesSheet.addRow(category);
    });
    categoriesSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    // products
    const productsSheet = workbook.addWorksheet('Mahsulotlar');
    productsSheet.columns = [
        { header: 'T/r', key: 'id', width: 10 },
        { header: 'Nomi(uz)', key: 'name.uz', width: 30 },
        { header: 'Nomi(ru)', key: 'name.ru', width: 30 },
        { header: 'Nomi(en)', key: 'name.en', width: 30 },

        { header: "Ma'lumot(uz)", key: 'desription.uz', width: 30 },
        { header: "Ma'lumot(ru)", key: 'desription.ru', width: 30 },
        { header: "Ma'lumot(en)", key: 'desription.en', width: 30 },
        { header: "Narxi", key: 'price', width: 10 },
        { header: 'Rasm', key: 'image', width: 10 },
        { header: 'Kategoriya', key: "category", width: 20 },
    ];
    products.forEach((product, index) => {
        product.id = index + 1;
        product.category = product.category.name;
        productsSheet.addRow(product);
    });
    productsSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    // orders
    const ordersSheet = workbook.addWorksheet('Buyurtmalar');
    ordersSheet.columns = [
        { header: 'T/r', key: 'id', width: 10 },
        { header: 'Telefon', key: 'phone', width: 30 },
        { header: "To'lov turi", key: 'paymentMethod', width: 20 },
        { header: "Yetkazib berish vaqti", key: 'deliveryTime', width: 10 },
        { header: 'Holati', key: 'status', width: 10 },
    ];
    let statuses = {
        "new": "Yangi",
        "accepted": "Qabul qilingan",
        "cancelled": "Bekor qilingan",
        "delivered": "Yetkazib berilgan"
    }
    orders.forEach((order, index) => {
        order.id = index + 1;
        order.status = statuses[order.status];
        ordersSheet.addRow(order);
    });
    ordersSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    // users
    const usersSheet = workbook.addWorksheet('Foydalanuvchilar');
    usersSheet.columns = [
        { header: 'T/r', key: 'id', width: 10 },
        { header: 'Nomi', key: 'name', width: 30 },
        { header: 'Til', key: 'language', width: 10 },
    ];
    users.forEach((user, index) => {
        user.id = index + 1;
        usersSheet.addRow(user);
    });
    usersSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

    return await workbook.xlsx.writeBuffer();
}