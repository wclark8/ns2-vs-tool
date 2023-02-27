const puppeteer = require('puppeteer-extra');
const {executablePath} = require('puppeteer')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

async function browserInstanceLaunch() {
	puppeteer.use(StealthPlugin())
    let browser;
	try {
	    console.log("Opening the browser......");
	    /*browser = await puppeteer.launch({
	        headless: true,
			executablePath: executablePath(),
	        args: ["--disable-setuid-sandbox", "--no-sandbox"],
	        'ignoreHTTPSErrors': true,
			defaultViewport: null,
	    }); */

		 browser = await puppeteer.connect({
			browserWSEndpoint: 'wss://chrome.browserless.io?token=3f40c62a-205a-4655-8687-a70e559892df'
		  });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
    browserInstanceLaunch
}