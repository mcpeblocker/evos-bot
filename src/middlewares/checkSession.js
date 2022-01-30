module.exports = (ctx,next) => {
    if (!ctx.session) {
        ctx.session = {};
    };
    return next();
}