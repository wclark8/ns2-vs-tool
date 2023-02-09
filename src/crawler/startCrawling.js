//const gatherPlayerRounds = require('./gatherPlayerRounds');

const Player = require('../models/Player')
const playerMatchup = require('./functions/playerMatchup');

async function startCrawling(browserInstance, payload) {
    let browser;
    let playerResults = [];
    try {
        browser = await browserInstance;
        for (playerId of payload.playerIds) {
            let url = 'https://ns2panel.com/player/' + playerId
            playerResults.push(await scraperObject.scraper(browser, url));
        }


        const results = playerMatchup(playerResults[0], playerResults[1]);
        
        console.log(playerResults[0].name + " wins: " + results.playerOneWinsCount);
        console.log(playerResults[1].name + " wins: " + results.playerTwoWinsCount);
        console.log("Joint wins: " + results.jointWinsCount);
        console.log("Joint losses: " + results.jointLosesCount);
        console.log("Draws: " + results.draws);

        await browser.close();
        
        //return results, make them nice later

        return results;

    } catch(err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

const scraperObject = {
	async scraper(browser, url) {

       const player = new Player();

		let page = await browser.newPage();
		console.log(`Navigating to ${url}...`);
		await page.goto(url, {
            waitUntil: "domcontentloaded"
        });
        
        //await page render? maybe cus template serving its fine...
        //wait for table header anyways
       await page.waitForSelector('head > meta:nth-child(3)');

       async function getInitPlayerMetadata() {
           const playerName = await page.$$eval('head > meta', playerMetaData => {
               playerMetaData = playerMetaData[0];
               let metadata = playerMetaData.content.split('\n', 2);
               return metadata[0];
           });
           
           player.name = playerName;
       }

        
        //scrape current page
        async function scrapePlayerCurrentPage() {
            // cur round win
            let getRowInfo = await page.$$eval('body > div:nth-child(2) > div > div > div.py-10 > main > div > div.mt-4 > div.flex.flex-col.mb-4 > div > div > div > table > tbody > tr', row => {
    
                return row.map(r => {
                    let winStatus = r.querySelector('td:nth-child(6)').textContent; // strip newline and whitespace TODO: SWITCH TO INNERTEXT TO AVOID SANI
                    winStatus = winStatus.replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, "").trim();
                    let roundId = r.querySelector('td:nth-child(7) > div > a').href; // extract id
                    let team = r.querySelector('td:nth-child(5) > div > div > span').innerText;
                    return { roundId, winStatus, team }
                 })
            });
    
            for (let rounds of getRowInfo) {
                player.addRound(rounds.roundId, rounds.winStatus, rounds.team)
            }
            
                    let nextRoundsButtonAvailable = false;
                    try {
                        const nextRoundsButton = await page.$$eval('body > div:nth-child(2) > div > div > div.py-10 > main > div > div.mt-4 > nav > a:nth-child(2)', elements => {
                            return elements.map(e => e.textContent.includes('Next'))
                        });
                        nextRoundsButtonAvailable = nextRoundsButton.length == 0 ? false : true;
                    } catch (err) {
                        // "this should never happen"
                        nextRoundsButtonAvailable = false;
                    }

                    if(nextRoundsButtonAvailable) {
                        try {
                            await page.click('body > div:nth-child(2) > div > div > div.py-10 > main > div > div.mt-4 > nav > a:nth-child(2)')
                        } catch (err) {
                            nextRoundsButtonAvailable = false;
                        }
                        return scrapePlayerCurrentPage();
                    }
        }

        if (!player.name) {
            getInitPlayerMetadata();
        }

        await scrapePlayerCurrentPage();
                
        return player
}
}

module.exports = startCrawling;