/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';

var config = require('../../../config/config.json');
var registerTests = require('../cases/register.js');
var forumRegister = module.exports = {};

/**************************All Fields Required Validation****************************/

forumRegister.featureTest = function(casper, test) {
       
	//Handling 'Alert' While Submitting The Form
	casper.on('remote.alert', function(message) {
		var expectedErrorMsg = "Please provide a signature.";
		casper.test.assertEquals(message, expectedErrorMsg);
		this.capture(screenShotsDir + 'Error_RegisterWithsignature.png');
	});

	casper.start(config.url, function() {

		casper.echo("Title of the page :"+this.getTitle(), 'INFO');

		//Getting 'User Accounts' Field Value If, Enabled, Then Filling Data For Testing
		registerTests.userAccountsEnable();

		//Verify register to application by leaving blank username and verify error message
		registerTests.blankUsername();

		//Verify register to application by leaving blank email and verify error message
		registerTests.blankEmail();

		//Verify register to application by leaving blank password and verify error message
		registerTests.blankPassword();
		
		//Verify register to application by existing username and verify error message
		registerTests.existUsername();
		
		//Verify register to application by existing email and verify error message
		registerTests.existEmail();

		//Verify register to application by leaving blank im-id and verify error message
		registerTests.blankImId();

		//Verify register to application by leaving blank birthday and verify error message
		registerTests.blankBirthday();
		
		//Verify register to application by invalid email and verify error message
		registerTests.invalidEmail();

		//Verify register to application by leaving blank signature and verify error message
		//registerTests.blankSignature();

		//Verify register to application by existing username and email and verify error message
		registerTests.existUsernameEmail();

		//Verify register to application by valid data and verify error message
		registerTests.validInfo();

	});

};

