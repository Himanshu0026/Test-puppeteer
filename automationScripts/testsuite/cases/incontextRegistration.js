'use strict.';
var forumLoginMethod = require('../methods/login.js');
var pollMethod = require('../methods/poll.js');
var topicMethod = require('../methods/topic.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var utils = require('../utils.js');
var loginJSON = require('../../testdata/loginData.json');
var topicJSON = require('../../testdata/topic.json');
var pollJSON = require('../../testdata/poll.json');
var registerTests = require('../cases/register.js');
var incontextRegistrationTests = module.exports = {};

//inContext Registration from Login Page with new  Registration
incontextRegistrationTests.doRegistrationFromLoginPage = function() {
	casper.thenOpen(config.url , function() {
		utils.info('Case 14[ inContext Registration from Login Page with new  Registration ]');
		this.waitForSelector('a[href="/register/login"]', function() {
			this.click('a[href="/register/login"]');
    }).waitForText('Create an account', function() {
			this.click('#user_login a[href="/register/register"]');
		}).waitForSelector('form[name="PostTopic"]', function() {
      registerTests.registrationWithValidInfo();
    });
	});
};

// Incontext New Registration from reply post With Create Account
incontextRegistrationTests.doRegistrationFromReplyPostWithCreateAccount = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 18[Incontext New Registration from reply post With Create Account]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'other_post_replies', true);
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
		this.click('form[name="posts"] a.topic-title');
    }).waitForSelector('#posts-list', function() {
     this.evaluate(function() {
			 document.querySelector('#sub_post_reply').click();
     });
    }).waitUntilVisible('#guest_user', function() {
      this.click('#guest_user');
		}).waitUntilVisible('#login_register_modal', function() {
			this.test.assertTextExists('Create Account', 'Create Account appears on the page');
			this.test.assertTextExists('Log In', 'Log In appears on the page');
		});
	});
};

// Do Registeration when User Account is OFF
incontextRegistrationTests.doRegistrationWhenUserAccountOff = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 27 [ Do Registeration when User Account is OFF ]');
  }).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'General');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
  }).waitForSelector('#frmForumSettings', function() {
    backEndregisterMethod.enableDisableUserAccounts(false);
  }).thenOpen(config.url, function() {
    this.test.assertNotVisible('#forum_header_fixed a[href="/register/register"]', 'Register not visible');
  }).thenOpen(config.backEndUrl , function() {
  }).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'General');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableUserAccounts(true);
	/*}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function() {
		casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewUsers('Pending Email Verification');
	}).then(function() {
		backEndregisterMethod.editUserActions('Pending Email Verification', 'Delete', 'all');*/
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndregisterMethod.enableDisableEmailAddressVerification(false);
	});
};
