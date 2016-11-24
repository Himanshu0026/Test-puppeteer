/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';

var config = require('../../../config/config.json');
var registerTests = require('../cases/register.js');
var registerMethod = require('../methods/register.js');
var forumRegister = module.exports = {};

/**************************All Fields Required Validation****************************/

forumRegister.featureTest = function(casper, test) {
  
   
	//Getting 'User Accounts' Field Valu If, Enabled, Then Filling Data For Testing
	 registerTests.userAccountsEnable();
	 
	//test case for register to application by leaving blank username and verify error message
	  registerTests.blankUsername();

	//test case for register to application by leaving blank email and verify error message
	 registerTests.blankEmail();
	
	//test case for register to application by leaving blank password and verify error message
	 registerTests.blankPassword();
	 
	//test case for register to application by leaving blank im-id and verify error message
	 registerTests.blankImId();
	
	//test case for register to application by leaving blank birthday and verify error message
	  registerTests.blankBirthday();
	
	//test case for register to application by leaving blank signature and verify error message
	 registerTests.blankSignature();
	
	//test case for register to application by existing username and verify error message
	 registerTests.existUsername();
	 
	//test case for register to application by existing email and verify error message
	 registerTests.existEmail();
	
	//test case for register to application by existing username and email and verify error message
	 registerTests.existUsernameEmail();
	
	//test case for register to application by invalid email and verify error message
	 registerTests.invalidEmail();
	
	//test case for register to application by valid data and verify error message
	  registerTests.validInfo();

};

