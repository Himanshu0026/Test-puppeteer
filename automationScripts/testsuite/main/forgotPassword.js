
//----- This js file covers all the valid and invalid Test scenarios for forgot Password functionality from login window comes from home page---------//

'use strict';
var config = require('../../../config/config.json');
var forgotPasswordTestcases = require('../cases/forgotPassword.js');
var forgotPassword = module.exports = {};

forgotPassword.featureTest = function(casper, test) {
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
		
		forgotPasswordTestcases.validUsername(); // call method to Reset password with valid user name
	
		forgotPasswordTestcases.validEmailid(); // call method to Reset password with valid email id
		
		forgotPasswordTestcases.invalidUsername(); // call method to Reset password with Invalid user name
		
		forgotPasswordTestcases.invalidEmailid(); // call method to Reset password with Invalid email id
		
		forgotPasswordTestcases.blankUsernameandEmail(); // call method to Reset password by leaving blank Username and Email textfield both //
		
		forgotPasswordTestcases.validUsernameandEmailid(); // call method to Reset Password with valid username and valid Email id with mismatched condition //
		
		forgotPasswordTestcases.invalidUsernameandValidEmailid(); // call method to Reset Password with Invalid username and valid Email id //
		
		forgotPasswordTestcases.validUsernameandInvalidEmailid(); // call method to Reset Password with Valid username and Invalid Email id //
		
	});
};





