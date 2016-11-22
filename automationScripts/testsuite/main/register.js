/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';

var config = require('../../../config/config.json');
var registerTests = require('../cases/register.js');
var registerMethod = require('../methods/register.js');
var forumRegister = module.exports = {};


/**************************All Fields Required Validation****************************/

forumRegister.featureTest = function(casper, test) {
   casper.start(config.backEndUrl, function() {
   
        //Getting 'User Accounts' Field Valu If, Enabled, Then Filling Data For Testing
         registerTests.userAccountsEnable();
		 
	//});
	//casper.then(function() {
	 //test case for register to application by leaving blank username and verify error message
	     registerTests.blankUsername();
	});

};

