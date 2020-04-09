/*jshint esversion: 6 */
const config = require('../config/config.json');
const browser = require('../puppeteer/browser.js');
const loginSel = require('./selector/loginSelector.js');
const expect = require('expect-puppeteer')

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
      await browser.page.goto(config.url, { waitUntil: "networkidle2" });
    });
  });

 it('add delete membertitle', async () => {
    await browser.page.goto('https://beta18.websitetoolbox.com/tool/members/login');
    await browser.page.waitFor('input[name="username"]');
    await browser.page.type('input[name="username"]', 'beta18');
    await browser.page.type('input[name="password"]', 'test');
    await browser.page.click('.button.btn-m.btn-blue');
    await browser.page.waitForSelector('a[data-tooltip-elm="ddAccount"]');
    await browser.page.waitForSelector('a[data-tooltip-elm="ddUsers"]')
    await browser.page.click('a[data-tooltip-elm="ddUsers"]')
    await browser.page.waitForSelector('a[href = "/tool/members/mb/titles"]')
    await browser.page.waitFor(100)
    await browser.page.click('a[href = "/tool/members/mb/titles"]')
    //add
    await browser.page.waitForSelector('a[href="titles?action=edit"]')
    await browser.page.click('a[href="titles?action=edit"]')
    await browser.page.waitFor(1000)
    await browser.page.type('input[name="title"]', 'JUNIOR MEMBER')
    await browser.page.type('input[name="min_posts"]', '15')
    await browser.page.waitFor(1000)
    await browser.page.click('.button.btn-m.btn-blue')
    await browser.page.waitForSelector('.fullborder.text.memberTitleField')
    await expect(browser.page).toMatch('JUNIOR MEMBER')
    //edit
    await browser.page.waitForSelector('.fullborder.text.memberTitleField')
    let row = await expect(browser.page).toMatchElement('tr', { text: 'JUNIOR MEMBER', timeout: 3000 })
    await expect(row).toClick('td:nth-child(4) a:nth-child(1)')
    await browser.page.waitForSelector('input[name="title"]')
    await browser.page.keyboard.down('Control')
    await browser.page.keyboard.press('KeyA')
    await browser.page.keyboard.up('Control')
    await browser.page.keyboard.press('Backspace')
    await browser.page.type('input[name="title"]', 'JUNIOR USER')
    await browser.page.waitFor(1000)
    await browser.page.click('.button.btn-m.btn-blue')
    await expect(browser.page).toMatch('JUNIOR USER')
    //delete
    await browser.page.waitForSelector('.fullborder.text.memberTitleField')
    row = await expect(browser.page).toMatchElement('tbody > tr', { text: 'JUNIOR USER', timeout: 3000 })
    await expect(row).toClick('td:nth-child(4) a:nth-child(2)')
    await expect(browser.page).toMatch('JUNIOR USER', { visible: false })
  });
});
