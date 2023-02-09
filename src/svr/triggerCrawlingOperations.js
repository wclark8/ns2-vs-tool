const browserInstance = require('../crawler/browserInstance');
const startCrawling = require('../crawler/startCrawling')

async function triggerCrawlingOperations(playerIds) {
    
    console.log("log out payload");
    console.log(playerIds);

    let crawlerInstance = browserInstance.browserInstanceLaunch();
    
    return startCrawling(crawlerInstance, playerIds);
}

module.exports = triggerCrawlingOperations;