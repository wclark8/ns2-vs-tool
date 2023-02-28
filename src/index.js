require('dotenv').config();
let argv = require('minimist')(process.argv.slice(2));

const startServer = require('./svr/server')
const triggerCrawlingOperations = require('./svr/triggerCrawlingOperations')

async function init() {
    if (process.env.NODE_ENV === 'local' || argv.env === 'local') {
        try {
            const playerIds = [argv.player1, argv.player2]
            await triggerCrawlingOperations(playerIds);
        } catch(err) {
            console.log('missing playerids')
        }
    } else {
        await startServer();
    }
}

init();

module.exports =  triggerCrawlingOperations;