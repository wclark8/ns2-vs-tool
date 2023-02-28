const Player = require('../models/Player');

async function gatherPlayerRounds(browserInstance, page, name) {
        let browser;
        try {
            playerInfo.player = new Player(name);
            browser = await browserInstance;
            await playerInfo.gatherAllRounds(browser, page);
        } catch(err) {
            console.log("Could not resolve the browser instance => ", err);
        }
}

module.exports = gatherPlayerRounds;