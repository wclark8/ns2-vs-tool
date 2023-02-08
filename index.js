
const player = require('./src/models/Player');
const browserInstance = require('./src/crawler/browserInstance');
const startCrawling = require('./src/crawler/startCrawling')

//const playerIds = ['141267840', '68545390'];
const playerIds = ['27140047', '68545390'];
//const playerIds = ['27140047', '83076348'];
//const playerIds = ['98744814', '112370'];


let crawlerInstance = browserInstance.browserInstanceLaunch();

startCrawling(crawlerInstance, playerIds);