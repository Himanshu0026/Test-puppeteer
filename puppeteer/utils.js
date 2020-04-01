/*jshint esversion: 6 */
const browser = require('../puppeteer/browser.js');

class utils {
	async click(data){
		await browser.page.click(data);
	}
}

module.exports = new utils();
