const puppeteer = require('puppeteer-extra');
const {executablePath} = require('puppeteer')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

async function browserInstanceLaunch() {
	puppeteer.use(StealthPlugin())
    let browser;
	try {
		console.log("Opening the browser......");
		if (process.env.NODE_ENV === 'local') {
			browser = await puppeteer.launch({
				headless: true,
				executablePath: executablePath(),
				args: ["--disable-setuid-sandbox", "--no-sandbox"],
				'ignoreHTTPSErrors': true,
				defaultViewport: null,
			});
		} else {
			browser = await puppeteer.connect({
			   browserWSEndpoint: 'wss://chrome.browserless.io?token=' + process.env.BROWSERLESS_TOKEN + '&timeout=1000000000'
			 });
		}

	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
    browserInstanceLaunch
}