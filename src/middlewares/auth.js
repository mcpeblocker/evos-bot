const users = [];

module.exports = (ctx, next) => {
    let user = ctx.session.user;
    if (user) return next();
    user = users.find(user => user.id === ctx.from.id);
    if (user) {
        ctx.session.user = user;
        return next();
    }
    user = {
        id: ctx.from.id,
        language: ctx.session.language || "uz"
    };
    users.push(user);
    ctx.session.user = user;
    return next();
}