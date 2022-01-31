const { Scenes } = require("telegraf");

const scene = new Scenes.WizardScene(
    'menu:addresses',
    (ctx) => {
        // TODO: get addresses from db
    }
);

module.exports = scene;