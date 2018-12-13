'use strict.';
var backEndRegisterJSON = require('../../testdata/backEndRegisterData.json');
var forumLoginMethod = require('../methods/login.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var registerMethod = require('../methods/register.js');
var utils = require('../utils.js');
var backEndregisterTests = module.exports = {};

//Test Case for Verifying Error Messages While User Registering With Blank User Name.
backEndregisterTests.doRegister = function() {
	var uname="";
	var blankUserPassword="";
	var validInfo="";
	utils.info('Case1[Verifying Error Messages While User Registering With Blank User Name]');
	casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function() {
		casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
  }).waitForSelector('div#ddUsers a[href="/tool/members/mb/addusers"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'New User');
		this.click('div#ddUsers a[href="/tool/members/mb/addusers"]');
		backEndregisterMethod.addUser(backEndRegisterJSON.blankUserName);
	}).waitForText('Please enter a username.', function() {
		utils.info('Case2[Verifying Error Messages While User Registering With Blank Email Id]');
		backEndregisterMethod.addUser(backEndRegisterJSON.blankUserEmail);
	}).waitForText('Please enter an email address.', function() {
		utils.info('Case3[Verifying Error Messages While User Registering With Invalid Email Id]');
		backEndregisterMethod.addUser(backEndRegisterJSON.invalidEmailId);
	}).waitForText('You entered an invalid email address.', function() {
		utils.info('Case 4[User Registered With Blank Password]');
		registerMethod.getUname(function(username){
			uname=username;
		});
	}).then(function(){
		blankUserPassword = {
			"uname" : uname,
			"upass" : "",
			"uemail" : uname+ "@wt.com",
			"pNote" : "This is my personal note blank password"
		};
	}).then(function(){
		backEndregisterMethod.addUser(blankUserPassword);
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Thank you for registering....');
    } else {
			utils.info(' User Does Not Registered Successfully');
		}
	}).then(function() {
		utils.info('Case 5[Register User With Valid Information]');
		registerMethod.getUname(function(username){
			uname=username;
		});
	}).then(function(){
		//var uname = Math.random().toString(36).substring(7);
		validInfo = {
			"uname" : uname,
			"upass" : "1234",
			"uemail" : uname+ "@wt.com",
			"pNote" : "This is my personal note with valid info.."
		};
	}).then(function(){
		backEndregisterMethod.addUser(validInfo);
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' Thank you for registering....');
    } else {
			utils.info(' User Does Not Registered Successfully');
		}
	}).then(function() {
		utils.info('Case 6[Verifying Error Messages While User Registering With Existing UserName]');
		backEndregisterMethod.addUser(backEndRegisterJSON.existingUserName);
	}).waitForSelector(('div.jQAlertDlg.ui-dialog-content.ui-widget-content'), function() {
		this.test.assertTextExists('There is already a user registered ', 'Page contains "There is already a user registered " : so identification done');
		this.click('button[title="Close"]');
	}).then(function() {
		utils.info('Case 7[User Registered With Existing EmailId]');
		backEndregisterMethod.addUser(backEndRegisterJSON.existingEmailId);
	}).waitForSelector(('div.jQAlertDlg.ui-dialog-content.ui-widget-content'), function() {
		this.test.assertTextExists('There is already a user registered ', 'Page contains "There is already a user registered " : so identification done');
		this.click('button[title="Close"]');
	});
};

//Test Case for Inviting User By a Valid Email.
backEndregisterTests.validInvitation = function() {
	utils.info('Case 8[Inviting User By a Email]');
	casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function() {
		casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
  }).waitForSelector('div#ddUsers a[href="/tool/members/mb/addusers?action=invite"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Invite');
		this.click('div#ddUsers a[href="/tool/members/mb/addusers?action=invite"]');
		var uname = Math.random().toString(36).substring(7);
		var email=uname+ '@gmail.com';
		backEndregisterMethod.inviteUser(email);
	}).waitUntilVisible('div#ajax-msg-top', function() {
		if (this.visible('div#ajax-msg-top')) {
      utils.info(' User Invited Successfully....');
    } else {
			utils.info(' User is not invited Successfully');
		}
	}).then(function() {
		utils.info('Case 9[Invite User By Enter Invalid Address]');
		backEndregisterMethod.inviteUser(backEndRegisterJSON.invalidInvite);
	}).waitForSelector(('div.jQAlertDlg.ui-dialog-content.ui-widget-content'), function() {
		this.test.assertTextExists('The following email addresses are invalid: ', 'Page contains "The following email addresses are invalid: " : so identification done');
		this.click('button[title="Close"]');
	}).then(function() {
		forumLoginMethod.logoutFromForumBackEnd();
	});
};
