/*jshint esversion: 6 */
const puppeteer = require('puppeteer');

class BrowserSession {
  async setup() {
    this.browser = await puppeteer.launch(
      process.env.DEBUG
      ? {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
        devtools: true,
        slowMo: 500,
      }
      : {}
      );
    this.page = await this.browser.newPage();
    this.page.emulate({
      viewport: {
        width: 1024,
        height: 1024
      },
      userAgent: ''
    });
  }

  async teardown() {
    this.browser.close();
  }
}

module.exports = new BrowserSession();
