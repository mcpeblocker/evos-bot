const TelegrafI18n = require('telegraf-i18n');
const path = require('path');

const i18n = new TelegrafI18n({
    directory: path.join(__dirname, '../../locales'),
    useSession: true,
});

module.exports = i18n;