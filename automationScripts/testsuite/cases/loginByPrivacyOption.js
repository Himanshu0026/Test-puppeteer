'use strict.';
var config = require('../../../config/config.json');
var json = require('../../testdata/backEndRegisterData.json');
var loginJSON = require('../../testdata/loginData.json');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var loginByPrivacyOptionTests = module.exports = {};

//Enable "Force Guest Login/ Privacy Private" option to check Incontext Login to Guest User from Backend
loginByPrivacyOptionTests.enablePrivacyOption = function() {
	utils.info('Case 1[Enable "Force Guest Login/ Privacy Private" option to check Incontext Login to Guest User from Backend]');
	casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndregisterMethod.setPrivacy('private');
	});
};

//Check login while launching app
loginByPrivacyOptionTests.doLogin = function() {
	casper.thenOpen(config.url ,function() {
		utils.info('Case 2[Check login while launching app]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//Check Login from Topic option in side menu
loginByPrivacyOptionTests.doLoginByTopic = function() {
	casper.thenOpen(config.url ,function() {
		utils.info('Case 3[Check Login from Topic option in side menu]');
		this.waitForSelector('i.icon.icon-menu', function() {
			this.click('i.icon.icon-menu');
			this.test.assertSelectorHasText('li#latest_topics_show', 'Topics');
			this.click('li#latest_topics_show a');
			this.then(function(){
				forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
			});
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//Check Login from Members option is side menu
loginByPrivacyOptionTests.doLoginByMember = function() {
	casper.thenOpen(config.url ,function() {
		utils.info('Case 4[Check Login from Members option in side menu]');
		this.waitForSelector('i.icon.icon-menu', function() {
			this.click('i.icon.icon-menu');
			this.test.assertSelectorHasText('li#members_list_show', 'Members');
			this.click('li#members_list_show a');
			this.then(function(){
				forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
			});
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//Check Login from Calender option is side menu
loginByPrivacyOptionTests.doLoginByCalender=function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 5[Check Login from Calender option is side menu]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableCalender(true);
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
		}).then(function() {
			backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_calendar', true);
		}).then(function() {
			backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
		}).then(function() {
			backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_messageboard', true);
		});
	}).thenOpen(config.url ,function() {
		this.waitForSelector('i.icon.icon-menu', function() {
			this.click('i.icon.icon-menu');
			this.test.assertSelectorHasText('a[href="/calendar"]', 'Calendar');
			this.evaluate(function() {
				document.querySelector('li a[href="/calendar"]').click();
			});
		}).waitForSelector('i.glyphicon.glyphicon-plus', function() {
			this.click('i.glyphicon.glyphicon-plus');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//Check Login from Donate option in side menu
loginByPrivacyOptionTests.doLoginByDonate=function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 6[Check Login from Donate option is side menu]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Paid+Access"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Paid Access');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Paid+Access"]');
		backEndregisterMethod.setPaidAccess(json.enablePaidAccess);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('i.icon.icon-menu', function() {
			this.click('i.icon.icon-menu');
			this.test.assertSelectorHasText('a#paid_access_donate_link', 'Donate');
			this.click('a#paid_access_donate_link');
			this.waitUntilVisible('form[name="frmLogin"]', function() {
				forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
			});
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};
