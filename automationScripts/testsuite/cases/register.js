'use strict.';
var registerJSON = require('../../testdata/registerData.json');
var config = require('../../../config/config.json');
var registerMethod = require('../methods/register.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var utils = require('../utils.js');
var registerTests = module.exports = {};

// Test case to set up all the backend setting for registration task
registerTests.registrationBackendSetting = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Test case to set up all the backend setting for registration task');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_messageboard', true);
		});
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/fields"]', function() {
	 this.test.assertSelectorHasText('#ddUsers', 'Profile Fields');
	 this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
 	}).waitForText('Default Profile Fields',function() {
		var setOptions = {"fullName" : "", "instantMessaging" : "", "birthday" : "", "signature" : "", "avatar" : "",
		 "visiblity_name_registration" : "Yes",
		 "visiblity_imType_registration" : "Yes", "visiblity_dob_registration" : "Yes",
		 "visiblity_signature_registration" : "Yes", "visiblity_avatar_registration" : "Yes"};
		 backEndForumRegisterMethod.changeDefaultRegistrationOptions(setOptions);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(true);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(false);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableHumanVerification(false);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableNewRegistrations(true);
	});
};

// 2,3,4,5,6,9. Test case to verify registration with user name  blank data
registerTests.registrationWithInvalidData = function(data, testcase) {
	casper.thenOpen(config.url ,function() {
		utils.info(' Test case [To verify registration with '+testcase+']');
		casper.test.assertExists('#forum_header_fixed a[href="/register/register"]');
		casper.click('#forum_header_fixed a[href="/register/register"]');
	}).waitForSelector('form[name="PostTopic"]', function() {
		registerMethod.registerToApp(data);
	}).waitForText(data.expectedErrorMsg);
};

//7.test case to verify registration with instant message screen blank
registerTests.blankSreenMessage = function(data) {
	casper.thenOpen(config.url ,function() {
		utils.info(' Test case 7 [To verify registration with instant message screen blank]');
		this.test.assertExists('#forum_header_fixed a[href="/register/register"]');
		this.click('#forum_header_fixed a[href="/register/register"]');
	}).waitForSelector('form[name="PostTopic"]', function() {
		this.fillSelectors('form[name="PostTopic"]', {
			'select[name="imType"]': "Google"
		}, false);
	}).waitUntilVisible('input[name="imID"]', function() {
		registerMethod.registerToApp(data);
	}).waitForText(data.expectedErrorMsg);
};

//8.Test case to registration with Invalid date of Birth
registerTests.invalidBirthdayDate = function(data) {
	casper.thenOpen(config.url ,function() {
		utils.info(' Test case 8 [To verify registration with Invalid date of Birth]');
		casper.test.assertExists('#forum_header_fixed a[href="/register/register"]');
		casper.click('#forum_header_fixed a[href="/register/register"]');
	}).waitForSelector('form[name="PostTopic"]', function() {
		var date = casper.evaluate(function() {
			var currentDate = new Date();
			var day = currentDate.getDate();
			var month = currentDate.getMonth() + 1;
			var year = currentDate.getFullYear();
			var bdaydate = month + "/" + day + "/" + year;
			return bdaydate;
		});
		casper.test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]', ' Birth day picker exists');
		casper.sendKeys('input[name="birthDatepicker"]', date, {reset : true});
	}).then(function() {
		registerMethod.registerToApp(data);
	}).waitForText(data.expectedErrorMsg);
};

//10.Test case to verify with disable new registration
registerTests.disabledNewRegistration = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test Case 10 [To verify with disable new registration]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableNewRegistrations(false);
	}).thenOpen(config.url, function() {
		this.test.assertNotVisible('#forum_header_fixed a[href="/register/register"]', 'Register not visible');
	});
};

//11.Test case to verify with enable new registration
registerTests.enabledNewRegistration = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test Case 11 [To verify with enable new registration]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableNewRegistrations(true);
	}).thenOpen(config.url, function() {
		this.test.assertVisible('#forum_header_fixed a[href="/register/register"]',' Register visible');
	});
};

//1.Test case to verify registration with valid data and verify message
registerTests.registrationWithValidInfo = function() {
	var randomUser="";
	casper.thenOpen(config.url ,function() {
		utils.info(' Test case 1.[To verify registration with valid data and verify message]');
		casper.test.assertExists('#forum_header_fixed a[href="/register/register"]');
		casper.click('#forum_header_fixed a[href="/register/register"]');
	}).waitForSelector('form[name="PostTopic"]', function() {
		var uname = Math.random().toString(36).substring(7);
		randomUser = {
			"uname" : uname,
			"uemail" : uname+ "@wt.com",
			"upass" : uname,
			"fullName" : "18",
			"imID" : "18",
			"birthday" : "04/12/1991",
			"usignature" : "This is my signature" + uname,
			"namePrivate" : true,
			"expectedSuccessMsg" : "Thank you for registering! Please check your email for instructions on how to begin using your account."
		};
		registerMethod.registerToApp(randomUser);
	}).waitForText(randomUser.expectedErrorMsg, function() {
		registerMethod.redirectToLogout();
	});
};

//28.Test case to verify registration for different formats
registerTests.registrationForDifferentUserNameFormat = function(data, format) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test Case [To verify registration for '+data.testcase+' format]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.changeUserNameFormat(format);
	}).thenOpen(config.url, function() {
		casper.test.assertExists('#forum_header_fixed a[href="/register/register"]');
		casper.click('#forum_header_fixed a[href="/register/register"]');
	}).waitForSelector('form[name="PostTopic"]', function() {
		registerMethod.registerToApp(data.invalidInput);
	}).waitForText(data.invalidInput.expectedMsg, function() {
		this.reload(function() {
			registerMethod.registerToApp(data.validInput);
		}).waitForText(data.validInput.expectedMsg, function() {
			registerMethod.redirectToLogout();
		});
	});
};

//47.Test case to verify Registration when Email address verification- Disabled And Approve new registrations- Enable
registerTests.registrationForDisabledEmailAndEnableApproveNewRegistration = function() {
	var randomUser="";
	casper.thenOpen(config.backEndUrl, function() {
			utils.info(' Test Case 47 [To verify Registration when Email address verification- Disabled And Approve new registrations- Enable');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(false);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(true);
	}).thenOpen(config.url ,function() {
		casper.test.assertExists('#forum_header_fixed a[href="/register/register"]');
		casper.click('#forum_header_fixed a[href="/register/register"]');
	}).waitForSelector('form[name="PostTopic"]', function() {
		var uname = Math.random().toString(36).substring(7);
		randomUser = {
			"uname" : uname,
			"uemail" : uname+ "@wt.com",
			"upass" : uname,
			"fullName" : "18",
			"imID" : "18",
			"birthday" : "04/12/1991",
			"usignature" : "This is my signature" + uname,
			"namePrivate" : true,
			"expectedSuccessMsg" : "Thank you for registering! Your account will need to be approved before you have full access to the forums. You will be notified via email once your account has been reviewed."
		};
		registerMethod.registerToApp(randomUser);
	}).waitForText(randomUser.expectedErrorMsg, function() {
		registerMethod.redirectToLogout();
	});
};

//49.Test case to verify Registration when Email address verification- Disabled And Approve new registrations- Disabled
registerTests.registrationForDisabledEmailAndDisabledApproveNewRegistration = function() {
	var randomUser="";
	casper.thenOpen(config.backEndUrl, function() {
			utils.info(' Test Case 49 [To verify Registration when Email address verification- Disabled And Approve new registrations- Disable');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(false);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(false);
	}).thenOpen(config.url ,function() {
		casper.test.assertExists('#forum_header_fixed a[href="/register/register"]');
		casper.click('#forum_header_fixed a[href="/register/register"]');
	}).waitForSelector('form[name="PostTopic"]', function() {
		var uname = Math.random().toString(36).substring(7);
		randomUser = {
			"uname" : uname,
			"uemail" : uname+ "@wt.com",
			"upass" : uname,
			"fullName" : "18",
			"imID" : "18",
			"birthday" : "04/12/1991",
			"usignature" : "This is my signature" + uname,
			"namePrivate" : true,
			"expectedSuccessMsg" : ""
		};
		registerMethod.registerToApp(randomUser);
	}).waitForSelector('ul.nav.pull-right span.caret', function() {
		registerMethod.redirectToLogout();
	});
};

//50.Test case to verify Registration when Email address verification- Enabled And Approve new registrations- Enabled
registerTests.registrationForEnabledEmailAndEnabledApproveNewRegistration = function() {
	var randomUser="";
	casper.thenOpen(config.backEndUrl, function() {
			utils.info(' Test Case 50 [To verify Registration when Email address verification- Enabled And Approve new registrations- Enabled');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function() {
		casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndForumRegisterMethod.viewUsers('Pending Email Verification');
	}).then(function() {
		backEndForumRegisterMethod.editUserActions('Pending Email Verification', 'Delete', 'all');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(true);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(true);
	}).thenOpen(config.url ,function() {
		casper.test.assertExists('#forum_header_fixed a[href="/register/register"]');
		casper.click('#forum_header_fixed a[href="/register/register"]');
	}).waitForSelector('form[name="PostTopic"]', function() {
		var uname = Math.random().toString(36).substring(7);
		randomUser = {
			"uname" : uname,
			"uemail" : uname+ "@wt.com",
			"upass" : uname,
			"fullName" : "18",
			"imID" : "18",
			"birthday" : "04/12/1991",
			"usignature" : "This is my signature" + uname,
			"namePrivate" : true,
			"expectedSuccessMsg" : "Thank you for registering! Please check your email for instructions on how to begin using your account."
		};
		registerMethod.registerToApp(randomUser);
	}).waitForText(randomUser.expectedErrorMsg, function() {
		registerMethod.redirectToLogout();
	});
};
