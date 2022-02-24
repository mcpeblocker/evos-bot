const db = require("../database");

module.exports = async (ctx, next) => {
    let user = ctx.session.user;
    if (user) return next();
    if (!ctx.from) return;
    user = await db.controllers.users.getByUserId(ctx.from.id);
    if (!user) {
        user = {
            userId: ctx.from.id,
            name: `${ctx.from.first_name} ${ctx.from.last_name || ""}`,
            language: ctx.session.language || "ru"
        };
        user = await db.controllers.users.create(user);
    }
    ctx.session.user = user;
    // ctx.i18n.locale(user.language);
    return next();
}