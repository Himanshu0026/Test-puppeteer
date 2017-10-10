/***These are the function which has been called in forgotPassword.js and also will be used in other js file as per requirement**********/

'use strict.';
var json = require('../../testdata/forgotpasswordData.json');
var forgotPasswordMethod = require('../methods/forgotPassword.js');
var utils = require('../utils.js');
var forgotPasswordTestcases = module.exports = {};

//method to test the Reset password with valid username functionality --Test case 1
forgotPasswordTestcases.validUsername = function() {
	casper.then(function() {
		utils.info('Test the Reset password with valid username functionality --Test case 1');
		forgotPasswordMethod.gotoForgotPasswordPage(json.validUserName.username, json.validUserName.email);
	}).waitForText(json.validUserName.ExpectedMessage);
};

//method to test the Reset Password using Valid Email id functionality --Test case 2
forgotPasswordTestcases.validEmail = function() {
	casper.then(function() {
		utils.info('Test the Reset Password using Valid Email id functionality --Test case 2');
		forgotPasswordMethod.gotoForgotPasswordPage(json.validEmailid.username, json.validEmailid.email);
	}).waitForText(json.validEmailid.ExpectedMessage);
};

//method to test the Reset Password using InValid Username functionality --Test case 3
forgotPasswordTestcases.invalidUsername = function() {
	casper.then(function() {
		utils.info('Test the Reset Password using InValid Username functionality --Test case 3');
		forgotPasswordMethod.gotoForgotPasswordPage(json.InvalidUsername.username, json.InvalidUsername.email);
	}).waitForSelector('div.alert.alert-danger', function() {
		this.test.assertExists('div.alert.alert-danger');
		this.test.assertSelectorHasText('div.alert.alert-danger', json.InvalidUsername.ExpectedMessage);
	});
};

//method to test the Reset Password using InValid Email id functionality --Test case 4
forgotPasswordTestcases.invalidEmail = function() {
	casper.then(function() {
		utils.info('Test the Reset Password using InValid Email id functionality --Test case 4');
		forgotPasswordMethod.gotoForgotPasswordPage(json.InvalidEmailid.username, json.InvalidEmailid.email);
	}).waitForSelector('div.alert.alert-danger', function() {
		this.test.assertExists('div.alert.alert-danger');
		this.test.assertSelectorHasText('div.alert.alert-danger', json.InvalidEmailid.ExpectedMessage);
	});
};

//method to test the Reset Password by leaving blank Username and Email textfield both functionality --Test case 5
forgotPasswordTestcases.blankUsernameAndEmail = function() {
	casper.then(function() {
		utils.info('Test the Reset Password by leaving blank Username and Email textfield both functionality --Test case 5');
		forgotPasswordMethod.gotoForgotPasswordPage(json.BlankUsernameAndEmail.username, json.BlankUsernameAndEmail.email);
	}).then(function() {
		this.test.assertEquals(this.getElementAttribute('form[name="lost_pw_form"] input[name="member"]', 'data-original-title'), json.BlankUsernameAndEmail.ExpectedMessage, 'Message verified');
	});
};

//method to test the Reset Password with valid username and valid Email id with mismatched condition functionality --Test case 6
forgotPasswordTestcases.validUsernameAndEmail = function() {
	casper.then(function() {
		utils.info('Test the Reset Password with valid username and valid Email id with mismatched condition functionality --Test case 6');
		forgotPasswordMethod.gotoForgotPasswordPage(json.ValidUsernameAndEmail.username, json.ValidUsernameAndEmail.email);
	}).waitForText(json.ValidUsernameAndEmail.ExpectedMessage);
};

//method to test the Reset Password with Invalid username and valid Email id functionality--Test case 7
forgotPasswordTestcases.invalidUsernameAndValidEmail = function() {
	casper.then(function() {
		utils.info('Test the Reset Password with Invalid username and valid Email id functionality--Test case 7');
		forgotPasswordMethod.gotoForgotPasswordPage(json.invalidUsernameAndValidEmail.username, json.invalidUsernameAndValidEmail.email);
	}).waitForText(json.invalidUsernameAndValidEmail.ExpectedMessage);
};

//method to test the Reset Password with valid username and Invalid Email id functionality --Test case 8
forgotPasswordTestcases.validUsernameAndInvalidEmail = function() {
	casper.then(function() {
		utils.info('Test the Reset Password with valid username and Invalid Email id functionality --Test case 8');
		forgotPasswordMethod.gotoForgotPasswordPage(json.validUsernameAndInvalidEmail.username, json.validUsernameAndInvalidEmail.email);
	}).waitForText(json.validUsernameAndInvalidEmail.ExpectedMessage);
};
