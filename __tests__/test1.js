const timeout = 90000
// typingSpeed value is set for wait time between keystrokes. Simulates realistic typing.
const typingSpeed = 50

describe(
  'Check Login',
  () => {
    let page
    beforeAll(async () => {
      jest.setTimeout(timeout)
      page = await global.__BROWSER__.newPage()
      await page.goto('https://beta18.websitetoolbox.com/')
    }, timeout)

    afterEach(async () => {
      await page.waitFor(1000)
    })

    afterAll(async () => {
      await page.close()
    })

    it('check login', async () => {
      /*login*/
      await page.click("#td_tab_login")
      await page.waitFor(2000);

      /*inputs*/
      await page.type('#inputEmail3', "qwerty");
      await page.type("#inputPassword3", "qwerty");
      await page.waitFor(2000);
      await page.click('button[type="Submit"]');

    })

    it('check profile', async () => {
      /*profile dropdown*/
      await page.click('.container .nav .pull-right .dropdown-toggle');
      await page.waitFor(1000);
      //await page.click('li.pull-right.user-panel span:nth-child(2)');


      /*profile open*/
      await page.click("#user-nav-panel-profile");
      await page.waitFor(2000);

      /*retrive profile name and compare*/
      const element = await page.$("#memberName");
      const text = await page.evaluate(element => element.textContent, element);

      /*logout*/
      await page.click('.container .nav .pull-right .dropdown-toggle');
      await page.waitFor(1000);
      await page.click("#logout");
      /*confrim user name*/
      if (text == "qwerty")
        console.log("ok")
      //await page.click("a#deleteAccountDialog i.glyphicon.glyphicon-trash");
      //await page.click("#deleteAccount");


      /*confirm logout ande exit*/
      if (await page.waitForSelector('#td_tab_login', { visible: true })) {
        console.log("out")
      }
    })

  },
  timeout
)