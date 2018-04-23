/***These are the function which has been called in ooScript.js and also will be used in other js file as per requirement**********/

'use strict.';
var registerMethod = require('../methods/register.js');
var utils = require('../utils.js');
var thumpsUpDownJSON = require('../../testdata/thumpsUpDown.json');
var topicJSON = require('../../testdata/topic.json');
var loginJSON = require('../../testdata/loginData.json');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var topicMethod = require('../methods/topic.js');
var forumLoginMethod = require('../methods/login.js');
var ooScriptTestcases = module.exports = {};

ooScriptTestcases.registrationBackendSetting = function() {
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
   }).then(function() {
     this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'Security');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
    backEndForumRegisterMethod.changeUserNameFormat("");
	}).then(function() {
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(false);
	}).then(function() {
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(false);
	}).then(function() {
		backEndForumRegisterMethod.enableDisableHumanVerification(false);
  }).then(function() {
		backEndForumRegisterMethod.enableDisableNewRegistrations(true);
	});
};

// method to register two user neha and isneha
ooScriptTestcases.registerUserTOLogin = function() {
	casper.thenOpen(config.backEndUrl, function() {
    utils.info('Test case to register all the users');
	}).eachThen(thumpsUpDownJSON.infoToRegisterUser, function(response) {
		var responseData = response.data;
		registerMethod.registerMember(responseData);
	});
};

ooScriptTestcases.createNewTopic = function() {
  casper.thenOpen(config.url, function() {
    utils.info('Test case to create a topic');
    this.test.assertExists('#inline_search_box', 'Search bar present');
    forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
  }).waitForSelector('#topics a[href="/post/printadd"]', function() {
    this.test.assertSelectorHasText('div#topics', 'Start New Topic');
    this.click('#topics a[href="/post/printadd"]');
    topicMethod.createTopic(topicJSON.newTopic);
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};
