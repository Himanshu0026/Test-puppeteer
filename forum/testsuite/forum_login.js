
//----- This js file covers all the valid and invalid scenarios for login functionlaity from home page---------//

'use strict';
var json = require('../testdata/loginData.json');
var config = require('../config/config.json');

var forumLogin = module.exports = {};

forumLogin.featureTest = function(casper, test) {
	var screenShotsDir = config.screenShotsLocation + "login/";
	var errorMessage = "";
	// this is to lauch application to perform related actions
	casper.start(config.url, function() {
		casper.echo("Title of the page :"+this.getTitle());
	});
	
	//test case for login to application with invalid password and verify error message
	casper.then(function(){
		forumLogin.loginToApp(json['InvalidPassowrd'].username, json['InvalidPassowrd'].password, casper, function(){
			casper.echo("login with valid username and invalid password and verify error message");
			casper.waitForSelector('form[name="frmLogin"] [role="alert"]',
				function success(){
					errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
					this.echo("Actual error message  --> "+errorMessage.trim());
					test.assertEquals(errorMessage.trim(),json['InvalidPassowrd'].ExpectedErrorMessage);
					casper.echo('Error message is verified when user try to login with invalid password', 'info');
				}, function fail() {
					casper.capture(screenShotsDir+"Error_InvalidPassowrd.png");
			});	
		});
	});

	//test case for login to application with invalid username and verify error message
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['InvalidUsername'].username, json['InvalidUsername'].password, casper, function(){
			casper.echo("login with invalid username and password and verify error message");
			casper.waitForSelector('form[name="frmLogin"] [role="alert"]',
			function success(){
				errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
				this.echo("Actual error message --> "+errorMessage.trim());
				test.assertEquals(errorMessage.trim(),json['InvalidUsername'].ExpectedErrorMessage);
				casper.echo('Error message is verified when user try to login with invalid username');
			}, function fail() {
				casper.capture(screenShotsDir+"Error_InvalidUsername.png");
			});
		});
	});

	//test case for login to application by leaving blank username and password and verify error message
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['BlankField'].username, json['BlankField'].password, casper, function(){
			casper.echo("login by leaving blank username and password and verify error message");
			casper.waitForSelector('form[name="frmLogin"] [role="alert"]',
			function success(){
				errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
				this.echo("Actual error message --> "+errorMessage.trim());
				test.assertEquals(errorMessage.trim(),json['BlankField'].ExpectedErrorMessage);
				casper.echo('Error message is verified when user try to login with blank data');
			}, function fail() {
				casper.capture(screenShotsDir+"Error_BlankField.png");
			});
		});
	});

	//test case for login to application by leaving password field blank and verify error message
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['BlankPassword'].username, json['BlankPassword'].password, casper, function(){
			casper.echo("Login by leaving blank username and password and verify error message");
			casper.waitForSelector('form[name="frmLogin"] [role="alert"]',
			function success(){
				errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
				this.echo("Actual error message --> "+errorMessage.trim());
				test.assertEquals(errorMessage.trim(),json['BlankPassword'].ExpectedErrorMessage);
				casper.echo('Error message is verified when user try to login with blank data');
			}, function fail() {
				casper.capture(screenShotsDir+"Error_BlankPassword.png");
			});
		});
	});

	//test case for login to application with valid valid username and password then logout from application
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(){
			casper.wait(3000, function() {
			test.assertDoesntExist('#td_tab_login');
			casper.echo("User has been successfuly login to application"); });
			casper.wait(3000, function(){
				forumLogin.logoutFromApp(casper, function(){
					casper.echo("Successfully logout from application");
				});
			});	
		});
	});
	
	//test case for login to application with valid valid email and password then logout from application
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['ValidEmail'].username, json['ValidEmail'].password, casper, function(){
			casper.wait(3000, function() {
			test.assertDoesntExist('#td_tab_login');
			casper.echo("User has been successfuly login to application"); });
			casper.wait(3000, function(){
				forumLogin.logoutFromApp(casper, function(){
					casper.echo("Successfully logout from application");
				});
			});
		});
	});
};


/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/

// method for login to application by passing username and password
forumLogin.loginToApp = function(username, password, driver,callback) {
	try{	
		driver.click('#td_tab_login');
		driver.fill('form[name="frmLogin"]', {
			'member': username,
			'pw' : password
		}, false); //incase of true, it will submit the form and for false, it will not submit form

       	 	driver.click('form[name="frmLogin"] button');
	}catch(err){
		driver.test.assertDoesntExist('#td_tab_login');
	};
	return callback();
};

//method for logout from application
forumLogin.logoutFromApp = function(driver, callback) {
	try {
		driver.test.assertExists('button.dropdown-toggle span.caret');
		driver.click('button.dropdown-toggle span.caret');
		try {
			driver.test.assertExists('#logout');
			driver.click('#logout');
		}catch(e) {
			driver.test.assertDoesntExist('#logout');
		}
	}catch(e) {
		driver.test.assertDoesntExist('button.dropdown-toggle span.caret');
	}
	return callback();
};



