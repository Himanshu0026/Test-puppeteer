const timeout = 90000
// typingSpeed value is set for wait time between keystrokes. Simulates realistic typing.
const typingSpeed = 50
const expect = require('expect-puppeteer')
const config = require('../config/config.json')
const loginBackendSel = require('../selector/loginBackendSelector.js')

describe(
  'Member Title',
  () => {
    let page
    beforeAll(async () => {
      jest.setTimeout(timeout)
      page = await global.__BROWSER__.newPage()
      await page.goto(config.backEndUrl)
    }, timeout)

    afterEach(async () => {
      await page.waitFor(1000)
    })

    afterAll(async () => {
      await page.close()
    })

    it('add/edit/delete Member Title', async () => {
      // Login Backend
      await page.waitForSelector(loginBackendSel.username);
      await page.type(loginBackendSel.username, 'beta18');
      await page.type(loginBackendSel.password, 'test');
      await page.click(loginBackendSel.login_Submit_Button);
      await page.waitForSelector(loginBackendSel.login_Toggle_Button)
      //User tab open and click on titles
      await page.waitForSelector(loginBackendSel.user_tab)
      await page.click(loginBackendSel.user_tab)
      await page.waitForSelector(loginBackendSel.user_tab_title)
      await page.waitFor(100)
      await page.click(loginBackendSel.user_tab_title)
      //add
      await page.waitForSelector(loginBackendSel.addMembertitle_button)
      await page.click(loginBackendSel.addMembertitle_button)
      await page.waitFor(1000)
      await page.type(loginBackendSel.newTitle, "Junior")
      await page.type(loginBackendSel.postCount, "0")
      await page.waitFor(1000)
      await page.click(loginBackendSel.saveTitleButton)
      await page.waitForSelector('.fullborder.text.memberTitleField')
      await expect(page).toMatch("Junior")
      //edit
      await page.waitForSelector('.fullborder.text.memberTitleField')
      let row = await expect(page).toMatchElement('tr', { text: 'Junior', timeout: 3000 })
      await expect(row).toClick('td:nth-child(4) a:nth-child(1)')
      await page.waitForSelector(loginBackendSel.newTitle)
      await page.keyboard.down('Control')
      await page.keyboard.press('KeyA')
      await page.keyboard.up('Control')
      await page.keyboard.press('Backspace')
      await page.type(loginBackendSel.newTitle, 'Senior')
      await page.waitFor(1000)
      await page.click(loginBackendSel.saveTitleButton)
      await expect(page).toMatch('Senior')
      //delete
      await page.waitForSelector('.fullborder.text.memberTitleField')
      row = await expect(page).toMatchElement('tbody > tr', { text: 'Senior', timeout: 3000 })
      await expect(row).toClick('td:nth-child(4) a:nth-child(2)')
      await expect(page).toMatch('Senior', { visible: false })
    })
  },
  timeout
)