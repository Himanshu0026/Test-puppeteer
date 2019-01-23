/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict.';

var config = require('../../../config/config.json');
var utils = require('../utils.js');
var registerJSON = require('../../testdata/registerData.json');
var registerTests = require('../cases/register.js');
var forumLoginMethod = require('../methods/login.js');
var register = module.exports = {};

register.featureTest = function() {

		casper.start(config.backEndUrl, function() {

			utils.info(" Title of the page :"+this.getTitle());
			forumLoginMethod.loginToForumBackEnd();

		}).then(function() {
			utils.setNewTheme();
		}).then(function() {

		// Test case to set up all the backend setting for registration task
		registerTests.registrationBackendSetting();

		//2.Test case to verify registration with user name blank data
		registerTests.registrationWithInvalidData(registerJSON.blankUsername, 'Blank Username');

		//3.Test case to verify registration with Email blank data
		registerTests.registrationWithInvalidData(registerJSON.blankEmail, 'Blank Email');

		//4.Test case to verify registration with password blank data
		registerTests.registrationWithInvalidData(registerJSON.blankPassword, 'Blank Password');

		//5.Test case to verify registration with existing user name
		registerTests.registrationWithInvalidData(registerJSON.existingUsername, 'Existing Username');

		//6.Test case to verify registration with existing user name
		registerTests.registrationWithInvalidData(registerJSON.existingEmail, 'Existing Email');

		//7.Test case to Registration with instant message screen blank
		registerTests.blankSreenMessage(registerJSON.blankScreen);

		//8.Test case to Registration with Invalid date of Birth
		registerTests.invalidBirthdayDate(registerJSON.invalidBirthday);

		//9.Test case to Registration with Invalid Email Address
		registerTests.registrationWithInvalidData(registerJSON.invalidEmail, 'Invalid Email');

		//10.Test case to verify with disable new registration
		registerTests.disabledNewRegistration();

		//11.Test case to verify with enable new registration
		registerTests.enabledNewRegistration();

		//1.Test case to verify registration with valid data and verify message
		registerTests.registrationWithValidInfo();

		//47.Test case to verify Registration when Email address verification- Disabled And Approve new registrations- Enable
		registerTests.registrationForDisabledEmailAndEnableApproveNewRegistration();

		//create user in pending approvval and delete it.
		registerTests.deletePendingApproveUser();

		//49.Test case to verify Registration when Email address verification- Disabled And Approve new registrations- Disabled
		registerTests.registrationForDisabledEmailAndDisabledApproveNewRegistration();

	});
};
