const config = require('../config/config.json')
const browser = require('../browser.js')
const backend = require('../methods/loginBackend.js')
const loginBackendSel = require('../selector/loginBackendSelector.js')
const memberTitleMethod = require('../methods/memberTitle.js')

class memberTitle {
  async modifyMemberTitle(memberTitle, numberofposts, newMemberTitle) {
    describe('add/edit/delete member Title', () => {
      test('add/edit/delete member Title', async () => {
        await backend.loginToBackend(config.backendCred.uname, config.backendCred.upass)
        await browser.page.waitForSelector(loginBackendSel.user_tab)
        await browser.page.click(loginBackendSel.user_tab)
        await browser.page.waitForSelector(loginBackendSel.user_tab_title)
        await browser.page.waitFor(100)
        await browser.page.click(loginBackendSel.user_tab_title)
        await memberTitleMethod.addMemberTitle(memberTitle, numberofposts)
        await memberTitleMethod.editMemberTitle(memberTitle, newMemberTitle)
        await memberTitleMethod.deleteMemberTitle(newMemberTitle)
      })
    })
  }
}
module.exports = new memberTitle()