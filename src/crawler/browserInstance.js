const puppeteer = require('puppeteer-extra');
const {executablePath} = require('puppeteer')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

async function browserInstanceLaunch() {
	puppeteer.use(StealthPlugin())
    let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: true,
			executablePath: executablePath(),
	        args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true,
			defaultViewport: null,
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
    browserInstanceLaunch
}