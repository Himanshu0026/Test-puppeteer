
'use strict';
//----- This js file covers all the valid and invalid scenarios for login functionlaity from home page---------//

var json = require('../testdata/loginData.json');
var config = require('../config/config.json');

var forumLogin = module.exports = {};

forumLogin.featureTest = function(casper) {
	var screenShotsDir = config.screenShotsLocation + "login/";
	// this code is to lauch application to perform related actions
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
	});
	
	//test case for login to application with invalid password and verify error message
	casper.then(function(){
		forumLogin.loginToApp(json['InvalidPassowrd'].username, json['InvalidPassowrd'].password, casper, function(){
			casper.log("*****login with valid username and invalid password and verify error message*****");
		});
	});

	//This 3 seconds of wait has been put to load the page
	casper.wait(3000);
	casper.then(function() {
		var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
		this.echo(errorMessage.indexOf(json['InvalidPassowrd'].ExpectedErrorMessage));
		    	this.echo(errorMessage.trim());
			//casper.assert(true, (errorMessage.trim() == json['InvalidPassowrd'].ExpectedErrorMessage));
			if(errorMessage.trim() == json['InvalidPassowrd'].ExpectedErrorMessage){
				this.echo('Error message is verified when user try to login with invalid password');
			}else{
				casper.log("Error occurred", 'ERROR');
				// code to take screenshot in case of failed test case
				this.capture(screenShotsDir + "ErrorOnInvalidPassword.png");
			}
	});

	//test case for login to application with invalid username and verify error message
	casper.thenOpen(json['url']);
	casper.then(function(){
		forumLogin.loginToApp(json['InvalidUsername'].username, json['InvalidUsername'].password, casper, function(){
			casper.log("*****login with invalid username and password and verify error message*****");
		});
	});

	//This 3 seconds of wait has been put to load the required element on the page
	casper.wait(3000);
	casper.then(function() {
		var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
			this.echo(errorMessage);
			if(errorMessage.trim() == json['InvalidUsername'].ExpectedErrorMessage){
				this.echo('Error message is verified when user try to login with invalid username');
			}else{
				casper.log("Error occurred", 'ERROR');
				// code to take screenshot in case of failed test case
				this.capture(screenShotsDir + "Error_ErrorOnInvalidUsername.png");
			}
	});

	//test case for login to application by leaving blank username and password and verify error message
	casper.thenOpen(json['url']);
	casper.then(function(){
		forumLogin.loginToApp(json['BlankField'].username, json['BlankField'].password, casper, function(){
			casper.log("*****login by leaving blank username and password and verify error message*****");
		});
	});

	//This 3 seconds of wait has been put to load the required element on the page
	casper.wait(3000);
	casper.then(function() {
		var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
			this.echo(errorMessage);
			if(errorMessage.trim() == json['BlankField'].ExpectedErrorMessage){
				this.echo('Error message is verified when user try to login with blank data');
			}else{
				casper.log("Error occurred", 'ERROR');
				// code to take screenshot in case of failed test case
				this.capture(screenShotsDir + "Error_LoginwithBlankfield.png");
			}
	});

	//test case for login to application by leaving password field blank and verify error message
	casper.thenOpen(json['url']);
	casper.then(function(){
		forumLogin.loginToApp(json['BlankPassword'].username, json['BlankPassword'].password, casper, function(){
			casper.log("*****login by leaving blank username and password and verify error message*****");
		});
	});
	//This 3 seconds of wait has been put to load the required element on the page
	casper.wait(3000);
	casper.then(function() {
		var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
			this.echo(errorMessage);
			if(errorMessage.trim() == json['BlankPassword'].ExpectedErrorMessage){
				this.echo('Error message is verified when user try to login with blank password');
			}else{
				casper.log("Error occurred", 'ERROR');
				// code to take screenshot in case of failed test case
				this.capture(screenShotsDir + "Error_LoginwithBlankPassword.png");
			}
	});

	//test case for login to application with valid valid username and password then logout from application
	casper.thenOpen(json['url']);
	casper.then(function(){
		forumLogin.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(){
			casper.log("User has been successfully login to application");
		});
	});

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(){
			casper.log("Successfully logout from application");
		});
	});

	//test case for login to application with valid valid email and password then logout from application
	casper.thenOpen(json['url']);
	casper.then(function(){
		forumLogin.loginToApp(json['ValidEmail'].username, json['ValidEmail'].password, casper, function(){
			casper.log("User has been successfuly login to application");
		});
	});
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(){
			casper.log("Successfully logout from application");
		});
	});
};


/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/

// method for login to application by passing username and password
forumLogin.loginToApp = function(username, password, driver,callback) {
	driver.click('#td_tab_login');
	driver.fill('form[name="frmLogin"]', {
		'member': username,
		'pw' : password
	}, false); //incase of true, it will submit the form and for false, it will not submit form

        driver.click('form[name="frmLogin"] button');
	return callback();
};

//method for logout from application
forumLogin.logoutFromApp = function(driver, callback) {
	driver.click('button.dropdown-toggle span.caret');
	driver.click('#logout');
	return callback();
};



