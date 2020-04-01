/*jshint esversion: 6 */
const browser = require('../browser.js');
const config = require('../config/config.json');
const loginSel=require('../selector/loginSelector.js');
const utilsTest =require('../utils.js');

class login {
  async loginToApp(usernameinfo, passwordinfo) {
    await browser.page.goto(config.url, { timeout: 0, waitUntil: "networkidle0" });
    await browser.page.waitForSelector(loginSel.login_Button, {visible: true});
    utilsTest.click(loginSel.login_Button);
    await browser.page.waitForSelector(loginSel.username, {visible: true});
    await browser.page.type(loginSel.username, usernameinfo);
    await browser.page.type(loginSel.password, passwordinfo);
    utilsTest.click(loginSel.login_Submit_Button);
    await browser.page.waitFor(1200);
    await browser.page.waitForSelector(loginSel.login_Toggle_Button, {visible: true});
  }

  async logoutToApp(){
    await browser.page.waitForSelector(loginSel.login_Toggle_Button, {visible: true});
    utilsTest.click(loginSel.login_Toggle_Button);
    await browser.page.waitForSelector(loginSel.logout_Button, {visible: true});
    utilsTest.click(loginSel.logout_Button);
    let logout = await page.$eval(loginSel.login_Button, el => (el ? true : false));
    expect(logout).toBe(true);
  }

  async moveToPostlistingPage(){
    let sel=uploadSel.reply_Sel;
    await browser.page.waitForSelector(sel, {visible: true});
    await browser.page.waitFor(3000);
    utilsTest.click(uploadSel.reply_Sel);
    await browser.page.waitFor(3000);
    await browser.page.waitForSelector(uploadSel.post_Button_Sel, {visible: true});
    let postbutton = await browser.page.$eval(uploadSel.post_Button_Sel, el => (el ? true : false));
    expect(postbutton).toBe(true);
  }
}
module.exports = new login();
