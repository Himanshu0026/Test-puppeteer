const browser = require('../browser.js');
const config = require('../config/config.json');
const loginBackendSel = require('../selector/loginBackendSelector.js');

class loginBackend{
  async loginToBackend(usernameinfo, passwordinfo)    {       
    await browser.page.goto(config.backEndUrl, { timeout: 0, waitUntil: "networkidle0" });      
    await browser.page.waitFor(loginBackendSel.username);
    await browser.page.type(loginBackendSel.username, usernameinfo);
    await browser.page.type(loginBackendSel.password, passwordinfo);
    await browser.page.click(loginBackendSel.login_Submit_Button);
    await browser.page.waitForSelector(loginBackendSel.login_Toggle_Button);
  }
  async logoutFromBackend()   {
    await browser.page.waitForSelector(loginBackendSel.login_Toggle_Button);
    await browser.page.click(loginBackendSel.login_Toggle_Button);
    await browser.page.waitForSelector(loginBackendSel.logout_Button);
    await browser.page.click(loginBackendSel.logout_Button);
  }
}
module.exports = new loginBackend();
