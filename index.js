
const player = require('./src/models/player');
const browserInstance = require('./src/crawler/browserInstance');
const startCrawling = require('./src/crawler/startCrawling')

const playerIds = ['112808379'];


let crawlerInstance = browserInstance.browserInstanceLaunch();

playerIds.forEach((playerId, index) => {
    console.log("init");
    console.log(playerId);
    startCrawling(crawlerInstance, playerId)
})