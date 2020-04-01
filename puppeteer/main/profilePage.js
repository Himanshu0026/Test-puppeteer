const profileTest = require('../testsuite_modules/profilePage.js')
const profileInfo =require('../userdata/profilePage_Info.json');

class profilePageTest{
	profilePage() {
		describe("profile page", () => {
			//Verify Share option on all post tab.
			//Verify Edit option on all post tab.
			//Verify Delete option on all post tab.
			//Verify Member active on the profile page
			profileTest.shareEditDeleteAdmin(profileInfo.strMsg.anyMsg);
		});
	}
}
module.exports = new profilePageTest();
