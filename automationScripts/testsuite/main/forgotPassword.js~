
//----- This js file covers all the valid and invalid Test scenarios for forgot Password functionality from login window comes from home page---------//

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var forgotPasswordMethod = require('../methods/forgotPassword.js');
var forgotPasswordTestcases = require('../cases/forgotPassword.js');
var forgotPassword = module.exports = {};

forgotPassword.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
		
		forgotPasswordTestcases.resetPasswordUsingValidUsername(); // call method to Reset password with valid user name
	
		forgotPasswordTestcases.resetPasswordUsingValidEmailid(); // call method to Reset password with valid email id
		
		forgotPasswordTestcases.resetPasswordUsingInvalidUsername(); // call method to Reset password with Invalid user name
		
		forgotPasswordTestcases.resetPasswordUsingInvalidEmailid(); // call method to Reset password with Invalid email id
		
		forgotPasswordTestcases.resetPasswordUsingBlankUsernameandEmail(); // call method to Reset password by leaving blank Username and Email textfield both //
		
		forgotPasswordTestcases.resetPasswordUsingValidUsernameandEmailid(); // call method to Reset Password with valid username and valid Email id with mismatched condition //
		
		forgotPasswordTestcases.resetPasswordUsingInvalidUsernameandValidEmailid(); // call method to Reset Password with Invalid username and valid Email id //
		
		forgotPasswordTestcases.resetPasswordUsingValidUsernameandInvalidEmailid(); // call method to Reset Password with Valid username and Invalid Email id //
		
	});
};





