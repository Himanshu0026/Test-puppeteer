'use strict';
var json = require('../../testdata/loginData.json');
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/forumLogin.js');
var forumLoginTests = module.exports = {};

forumLoginTests.invalidPassword = function() {
	
	forumLoginMethod.loginToApp(json['InvalidPassowrd'].username, json['InvalidPassowrd'].password, casper, function(err){
		if(!err){
			casper.echo('login with valid username and invalid password and verify error message', 'INFO');
			casper.waitForSelector('form[name="frmLogin"] [role="alert"]', function() {
				var errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
				errorMessage = errorMessage.trim();
				if(errorMessage && errorMessage!= '')
					forumLoginMethod.verifyErrorMsg(errorMessage, 'The password you entered is incorrect.', 'invalidPassword', casper, function() {});
			});
		}
	});

};
