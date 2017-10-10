'use strict.';
var json = require('../../testdata/loginData.json');
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var forumLoginTests = module.exports = {};
var utils = require('../utils.js');

//Test case for login to application with valid valid username and password then logout from application
forumLoginTests.validCredential = function() {
	utils.info('Case 1 [login by valid username and password and verify error message]');
	casper.then(function() {
    forumLoginMethod.loginToApp(json.ValidCredential.username, json.ValidCredential.password);
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//Test case for login to application with invalid username and verify error message
forumLoginTests.invalidUsername = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 2[login with invalid username and password and verify error message]');
	}).then(function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(json.InvalidUsername.username, json.InvalidUsername.password);
	}).waitForText('There is no account with the username you specified.');
};

//Test case for login to application with invalid password and verify error message
forumLoginTests.invalidPassword = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 3 [login with valid username and invalid password and verify error message]');
	}).then(function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(json.InvalidPassowrd.username, json.InvalidPassowrd.password);
	}).waitForText('The password you entered is incorrect.');
};

//Test case for login to application by leaving blank username and password and verify error message
forumLoginTests.blankUsernamePassword = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 4[login by leaving blank username and password and verify error message]');
	}).then(function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(json.BlankField.username, json.BlankField.password);
	}).waitForText('You must enter your username or email address.');
};

//Test case for login to application by leaving password field blank and verify error message
forumLoginTests.blankPassword = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 5[login by leaving blank username and password and verify error message]');
	}).then(function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(json.BlankPassword.username, json.BlankPassword.password);
	}).waitForText('You must enter your password.');
};

//Test case for login to application with valid valid email and password then logout from application
forumLoginTests.validEmail = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 6[login by validEmail and password and verify error message]');
	}).then(function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(json.ValidEmail.username, json.ValidEmail.password);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};
