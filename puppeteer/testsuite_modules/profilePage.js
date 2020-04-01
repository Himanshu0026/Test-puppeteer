const browser = require('../browser.js');
const profileSel=require('../selector/profileSelector.js');
const profileInfo =require('../userdata/profilePage_Info.json');
const profileMethod=require('../methods/profilePage.js');
const loginTest = require('../methods/login.js');

class Profile {
  async shareEditDeleteAdmin(anyEditing) {
    describe("Profile Page Admin User", () => {
      test('Verify User\'s Last Active Status and Share/Edit/Delete option on all post tab. With Admin User.', async () => {
        await loginTest.loginToApp(profileInfo.adminUser.username,profileInfo.adminUser.password);
        for (let i=0; i<2; i++) {
          await profileMethod.postCreate(i,1)
        }
        await browser.page.waitFor(1000);
        await profileMethod.profileOpen();
        await browser.page.waitForSelector(profileSel.lastActive, {visible: true});
        await profileMethod.postShare();
        await browser.page.waitFor(1000)
        await profileMethod.postEdit(anyEditing);
        await browser.page.waitFor(1000)
        await profileMethod.postDelete();
      });
    });
  }
}
module.exports = new Profile();
