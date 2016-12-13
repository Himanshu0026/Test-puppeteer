'use strict';
var json = require('../../testdata/loginData.json');
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var forumLoginTests = module.exports = {};
var wait=require('../wait.js');
var errorMessage = "";
var count = 1;
var failedScreenshotsLocation = config.failedScreenShotsLocation+'login/';
 
//Method To capture Screenshots If Any Test Case Failed
casper.test.on('fail', function(failure) {
	casper.capture(failedScreenshotsLocation+'loginCasesError'+count+'.png');
	count++;
});

//Test case for login to application with valid valid username and password then logout from application
forumLoginTests.validCredential=function(){
	forumLoginMethod.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(err){
		if(!err) {
			casper.echo('login by valid username and password and verify error message', 'INFO');
			wait.waitForElement('a.default-user', casper , function(err, isExists) {
				if(isExists) {
					casper.test.assertDoesntExist('#td_tab_login');
					casper.echo('User has been successfuly login to application', 'INFO');
					forumLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							casper.echo('Successfully logout from application', 'INFO');
					});
				}else{
					casper.echo('User not logged-in element a.default-user not found','ERROR');
				}
			});
		}
	});
};


//Test case for login to application with invalid username and verify error message
forumLoginTests.invalidUsername= function(){
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json['InvalidUsername'].username, json['InvalidUsername'].password, casper, function(err){
			if(!err) {
				casper.echo('login with invalid username and password and verify error message', 'INFO');
				wait.waitForElement('form[name="frmLogin"] [role="alert"]', casper , function(err , isExists) {
					if(isExists) {
						errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
						errorMessage = errorMessage.trim();
						if(errorMessage && errorMessage!= '')
						forumLoginMethod.verifyErrorMsg(errorMessage, 'There is no account with the username you specified.', 'invalidUsername', casper, function(err) {
							if(!err)
								casper.echo('Error message is verified with expected message', 'INFO');
						});
					}else{
						casper.echo('Alert not found on login form element form[name="frmLogin"] [role="alert"]','ERROR');	
					}
				});
			}
		});
	});
};


//Test case for login to application with invalid password and verify error message
forumLoginTests.invalidPassword = function() {
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json['InvalidPassowrd'].username, json['InvalidPassowrd'].password, casper, function(err){
			if(!err){
				casper.echo('login with valid username and invalid password and verify error message', 'INFO');
				wait.waitForElement('form[name="frmLogin"] [role="alert"]', casper , function(err, isExists){
					if(isExists) {
						var errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
						errorMessage = errorMessage.trim();
						if(errorMessage && errorMessage!= '')
							forumLoginMethod.verifyErrorMsg(errorMessage, 'The password you entered is incorrect.', 'invalidPassword', casper, function(err) {
							if(!err)
								casper.echo('Error message is verified with expected message', 'INFO');
						});
					}else{
						casper.echo('Alert  not found  on login form element form[name="frmLogin"] [role="alert"]','ERROR');	
					}
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
				wait.waitForElement('form[name="frmLogin"] [role="alert"]', casper, function(err, isExists) {
					if(isExists) {
						errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
						errorMessage = errorMessage.trim();
						if(errorMessage && errorMessage!= '')
							forumLoginMethod.verifyErrorMsg(errorMessage, 'You must enter your username or email address.', 'blankEmailPassword', casper, function(err) {
								if(!err)
									casper.echo('Error message is verified with expected message', 'INFO');
							});
					}else{
						casper.echo('Alert  not found  on login form element form[name="frmLogin"] [role="alert"]','ERROR');	
					}
				});
			}
		});
	});
};


//Test case for login to application by leaving password field blank and verify error message
forumLoginTests.blankPassword=function(){
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json['BlankPassword'].username, json['BlankPassword'].password, casper, function(err){
			if(!err) {
				casper.echo('login by leaving blank username and password and verify error message', 'INFO');
				wait.waitForElement('form[name="frmLogin"] [role="alert"]', casper, function(err, isExists) {
					if(isExists) {
						errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
						errorMessage = errorMessage.trim();
						if(errorMessage && errorMessage!= '')
							forumLoginMethod.verifyErrorMsg(errorMessage, 'You must enter your password.', 'blankEmailPassword', casper, function(err) {
						if(!err)
							casper.echo('Error message is verified with expected message', 'INFO');
					    });
					}else{
						casper.echo('Alert  not found  on login form element form[name="frmLogin"] [role="alert"]','ERROR');	
					}
				});
			}
		});
	});
};


//Test case for login to application with valid valid email and password then logout from application
forumLoginTests.validEmail=function(){
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(json['ValidEmail'].username, json['ValidEmail'].password, casper, function(err){
			if(!err) {
				casper.echo('login by validEmail and password and verify error message', 'INFO');
				wait.waitForElement('a.default-user', casper , function(err, isExists) {
					if(isExists) {
						casper.test.assertDoesntExist('#td_tab_login');
						casper.echo('User has been successfuly login to application', 'INFO');
						forumLoginMethod.logoutFromApp(casper, function(err){
							if(!err)
								casper.echo('Successfully logout from application', 'INFO');
						});
					 }else{
						casper.echo('User not logged-in element a.default-user not found','ERROR');
					 }
				});
			}
		});
	});
};








