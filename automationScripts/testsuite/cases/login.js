'use strict';
var json = require('../../testdata/loginData.json');
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var forumLoginTests = module.exports = {};
var loginWait=require('../methods/login.js');
var errorMessage = "";
//Test case for login to application with invalid password and verify error message

forumLoginTests.invalidPassword = function() {
	
	forumLoginMethod.loginToApp(json['InvalidPassowrd'].username, json['InvalidPassowrd'].password, casper, function(err){
		if(!err){
			casper.echo('login with valid username and invalid password and verify error message', 'INFO');
			loginWait.waitElement('form[name="frmLogin"] [role="alert"]',casper,function(err,data){
				if(isExists) {
					var errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						forumLoginMethod.verifyErrorMsg(errorMessage, 'The password you entered is incorrect.', 	'invalidPassword', casper, function() {});
				}
			});
		}
	});

};


	

//Test case for login to application with invalid username and verify error message
/*forumLoginTests.invalidUsername= function(){

	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json['InvalidUsername'].username, json['InvalidUsername'].password, casper, function(err){
			if(!err) {
				casper.echo('login with invalid username and password and verify error message', 'INFO');
				casper.waitForSelector('form[name="frmLogin"] [role="alert"]', function success() {
					this.test.assertExists('form[name="frmLogin"] [role="alert"]');
					errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						forumLoginMethod.verifyErrorMsg(errorMessage, 'There is no account with the username you specified.', 'invalidUsername', casper, function() {});
				}, function fail() {
					casper.echo('Alert Msg Not Found On Login Form', 'ERROR');
				});
			}
		});
	});
};

//Test case for login to application by leaving blank username and password and verify error message
forumLoginTests.blankUsernamePassword=function(){
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json['BlankField'].username, json['BlankField'].password, casper, function(err){
			if(!err) {
				casper.echo('login by leaving blank username and password and verify error message', 'INFO');
				casper.waitForSelector('form[name="frmLogin"] [role="alert"]', function success() {
					this.test.assertExists('form[name="frmLogin"] [role="alert"]');
					errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						forumLoginMethod.verifyErrorMsg(errorMessage, 'You must enter your username or email address.', 'blankEmailPassword', casper, function() {});
				}, function fail() {
					casper.echo('Alert Msg Not Found On Login Form', 'ERROR');
				});
			}
		});
	});
};*/







