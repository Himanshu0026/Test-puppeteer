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

		//28.Test case to verify registration for Uppercase letters from A-Z only format
		registerTests.registrationForDifferentUserNameFormat(registerJSON.upperCaseLettersOnly, "^[A-Z]+$");

		//29.Test case to verify registration for Uppercase letters from A-Z including space
		registerTests.registrationForDifferentUserNameFormat(registerJSON.upperCaseLettersIncludingSpace, "^[A-Z ]+$");

		//30.Test case to verify registration for lowercase letters from A-Z including space
		registerTests.registrationForDifferentUserNameFormat(registerJSON.lowerCaseLettersIncludingSpace, "^[a-z ]+$");

		//31.Test case to verify registration for lowercase letters from A-Z only format
		registerTests.registrationForDifferentUserNameFormat(registerJSON.lowerCaseLettersOnly, "^[a-z]+$");

		//32.Test case to verify registration for Uppercase and lowercase letters from A-Z
		registerTests.registrationForDifferentUserNameFormat(registerJSON.lowerAndUpperCaseLetters, "^[a-zA-Z]+$");

		//33.Test case to verify registration for alphaNumeric characters only
		registerTests.registrationForDifferentUserNameFormat(registerJSON.alphaNumericCharactersOnly, "^[a-zA-Z0-9]+$");

		//35.Test case to verify registration for Uppercase and lowercase letters from A-Z including space
		registerTests.registrationForDifferentUserNameFormat(registerJSON.lowerAndUpperCaseLettersIncludingSpace, "^[a-zA-Z ]+$");

		//36,37.Test case to verify registration for Uppercase and lowercase letters from A-Z including underscore
		registerTests.registrationForDifferentUserNameFormat(registerJSON.lowerAndUpperCaseLettersIncludingUnderscore, "^[a-zA-Z_]+$");

		//38,39.Test case to verify registration for Alphanumeric charecter inculding space
		registerTests.registrationForDifferentUserNameFormat(registerJSON.alphaNumericCharacterIncludingSpace, "^[a-zA-Z0-9 ]+$");

		//40,41.Test case to verify registration for Alphanumeric charecter inculding space and under score
		registerTests.registrationForDifferentUserNameFormat(registerJSON.alphaNumericCharacterIncludingSpaceAndUnderscore, "^[a-zA-Z_0-9 ]+$");

		//42,43.Test case to verify registration for A custom regular expression
		registerTests.registrationForDifferentUserNameFormat(registerJSON.customRegularExpression, "regexp");

		//44.Test case to verify registration All Character And Any Format
		registerTests.registrationForDifferentUserNameFormat(registerJSON.allCharacterAndAnyFormat, "");

		//50.Test case to verify Registration when Email address verification- Enabled And Approve new registrations- Enabled
		registerTests.registrationForEnabledEmailAndEnabledApproveNewRegistration();

		//47.Test case to verify Registration when Email address verification- Disabled And Approve new registrations- Enable
		registerTests.registrationForDisabledEmailAndEnableApproveNewRegistration();

		//49.Test case to verify Registration when Email address verification- Disabled And Approve new registrations- Disabled
		registerTests.registrationForDisabledEmailAndDisabledApproveNewRegistration();

	});
};
