//const gatherPlayerRounds = require('./gatherPlayerRounds');

const Player = require('../models/player')

async function startCrawling(browserInstance, playerId) {
    let browser;
    try {
        browser = await browserInstance;
        scraperObject.url = 'https://ns2panel.com/player/' + playerId
        await scraperObject.scraper(browser, playerId);
    } catch(err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

const scraperObject = {
	url: '',
    player: new Player(),
	async scraper(browser) {
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url, {
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
           
           scraperObject.player.name = playerName;
       }

        
        //scrape current page
        async function scrapePlayerCurrentPage() {
            // cur round win
            let getRowInfo = await page.$$eval('body > div:nth-child(2) > div > div > div.py-10 > main > div > div.mt-4 > div.flex.flex-col.mb-4 > div > div > div > table > tbody > tr', row => {
    
                return row.map(r => {
                    let winStatus = r.querySelector('td:nth-child(6)').textContent; // strip newline and whitespace
                    winStatus = winStatus.replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, "").trim();
                    let roundId = r.querySelector('td:nth-child(7) > div > a').href; // extract id
                    return { roundId, winStatus }
                 })
            });
    
            for (let rounds of getRowInfo) {
                scraperObject.player.addRound(rounds.roundId, rounds.winStatus)
            }
            
                    let nextRoundsButtonAvailable = false;
                    try {
                        const nextRoundsButton = await page.$$eval('body > div:nth-child(2) > div > div > div.py-10 > main > div > div.mt-4 > nav > a', element => element.find(element => element.textContent.includes('Next')));
                        nextRoundsButtonAvailable = true;
                    } catch (err) {
                        nextRoundsButtonAvailable = false;
                    }

                    if(nextRoundsButtonAvailable) {
                        await page.click('body > div:nth-child(2) > div > div > div.py-10 > main > div > div.mt-4 > nav > a:nth-child(2)')
                        return scrapePlayerCurrentPage();
                    }
        }

        if (!scraperObject.player.name) {
            getInitPlayerMetadata();
        }

        await scrapePlayerCurrentPage();
        
        console.log(scraperObject.player.rounds);

        await browser.close();
}
}

module.exports = startCrawling;