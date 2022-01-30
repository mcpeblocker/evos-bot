const config = require("./config")

exports.copyToAdmins = async (ctx) => {
    for (admin of config.ADMINS) {
        try {
            await ctx.forwardMessage(parseInt(admin));
        } catch (e) { }
    }
    return true;
}