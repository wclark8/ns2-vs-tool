require('dotenv').config();
let argv = require('minimist')(process.argv.slice(2));

const startServer = require('./svr/server')
const triggerCrawlingOperations = require('./svr/triggerCrawlingOperations')

//const playerIds = ['141267840', '68545390'];
//const playerIds = ['27140047', '68545390'];
//playerIds = ['485365623', '68545390'];

//const playerIds = ['27140047', '83076348'];
//const playerIds = ['98744814', '112370'];
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