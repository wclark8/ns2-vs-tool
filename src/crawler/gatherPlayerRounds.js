const Player = require('../models/Player');

const TABLE_SELECTOR = 'body > div:nth-child(2) > div > div > div.py-10 > main > div > div.mt-4 > div.flex.flex-col.mb-4 > div > div > div > table > tbody'

const TABLE_ROW_WIN_SELECTOR = 'div > span'

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


function extractWin(element) {

}

module.exports = gatherPlayerRounds;