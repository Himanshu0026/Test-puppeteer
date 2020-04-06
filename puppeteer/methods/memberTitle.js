const browser = require('../browser.js')
const loginBackendSel = require('../selector/loginBackendSelector.js')
const expect = require('expect-puppeteer')

class memberTitleMethods {
  async addMemberTitle(memberTitle, numberOfPosts) {
    await browser.page.waitForSelector(loginBackendSel.addMembertitle_button)
    await browser.page.click(loginBackendSel.addMembertitle_button)
    await browser.page.waitFor(1000)
    await browser.page.type(loginBackendSel.newTitle, memberTitle)
    await browser.page.type(loginBackendSel.postCount, numberOfPosts)
    await browser.page.waitFor(1000)
    await browser.page.click(loginBackendSel.saveTitleButton)
    await browser.page.waitForSelector('.fullborder.text.memberTitleField')
    await expect(browser.page).toMatch(memberTitle)
  }
  async editMemberTitle(memberTitle, newMemberTitle) {
    await browser.page.waitForSelector('.fullborder.text.memberTitleField')
    const row = await expect(browser.page).toMatchElement('tr', { text: memberTitle, timeout: 3000 })
    await expect(row).toClick('td:nth-child(4) a:nth-child(1)')
    await browser.page.waitForSelector(loginBackendSel.newTitle)
    await browser.page.keyboard.down('Control')
    await browser.page.keyboard.press('KeyA')
    await browser.page.keyboard.up('Control')
    await browser.page.keyboard.press('Backspace')
    await browser.page.type(loginBackendSel.newTitle, newMemberTitle)
    await browser.page.waitFor(1000)
    await browser.page.click(loginBackendSel.saveTitleButton)
    await expect(browser.page).toMatch(newMemberTitle)
  }
  async deleteMemberTitle(memberTitle) {
    await browser.page.waitForSelector('.fullborder.text.memberTitleField')
    const row = await expect(browser.page).toMatchElement('tbody > tr', { text: memberTitle, timeout: 3000 })
    await expect(row).toClick('td:nth-child(4) a:nth-child(2)')
    await expect(browser.page).toMatch(memberTitle, { visible: false })
  }
}
module.exports = new memberTitleMethods()