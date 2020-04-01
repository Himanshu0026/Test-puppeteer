/*jshint esversion: 6 */
const config = require('../config/config.json');
const browser = require('../puppeteer/browser.js');
const profilePage = require('./main/profilePage.js');

describe("setup browser", () => {
  beforeEach(async () => {
    jest.setTimeout(loginSel.NETWORK_TIMEOUT);
    await browser.setup();
  });

  afterEach(async () => {
    await browser.teardown();
  });

  describe("setup ViewPort", () => {
    beforeEach(async () => {
      await browser.page.goto(config.url, { waitUntil: "networkidle2" } );
    });
  });

  describe("test method called", () => {
    profilePage.profilePage();
  });
});
