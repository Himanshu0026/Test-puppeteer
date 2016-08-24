
//----- This js file covers all the valid and invalid scenarios for login functionlaity from home page---------//

'use strict';
var json = require('../testdata/loginData.json');
var config = require('../config/config.json');

var forumLogin = module.exports = {};
var screenShotsDir = config.screenShotsLocation + "login/";
forumLogin.featureTest = function(casper, test) {
	
	var errorMessage = "";
	// this is to lauch application to perform related actions
	casper.start(config.url, function() {
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
	});
	
	//test case for login to application with invalid password and verify error message
	casper.then(function(){
		forumLogin.loginToApp(json['InvalidPassowrd'].username, json['InvalidPassowrd'].password, casper, function(){
			casper.echo('login with valid username and invalid password and verify error message', 'INFO');
			casper.then(function() {
				this.capture(screenShotsDir+ '11.png');
				test.assertExists('form[name="frmLogin"] [role="alert"]');
				errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
				errorMessage = errorMessage.trim();
				if(errorMessage && errorMessage!= '')
					verifyErrorMsg(errorMessage, 'The password you entered is incorrect.', 'invalidPassword', casper, function() {});
			});
		});
	});
	
	//test case for login to application with invalid username and verify error message
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['InvalidUsername'].username, json['InvalidUsername'].password, casper, function(){
			casper.echo('login with invalid username and password and verify error message', 'INFO');
			casper.then(function() {
				this.capture(screenShotsDir+ '11.png');
				test.assertExists('form[name="frmLogin"] [role="alert"]');
				errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
				errorMessage = errorMessage.trim();
				if(errorMessage && errorMessage!= '')
					verifyErrorMsg(errorMessage, 'There is no account with the username you specified.', 'invalidUsername', casper, function() {});
			});
		});
	});

	//test case for login to application by leaving blank username and password and verify error message
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['BlankField'].username, json['BlankField'].password, casper, function(){
			casper.echo('login by leaving blank username and password and verify error message', 'INFO');
			casper.then(function() {
				this.capture(screenShotsDir+ '11.png');
				test.assertExists('form[name="frmLogin"] [role="alert"]');
				errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
				errorMessage = errorMessage.trim();
				if(errorMessage && errorMessage!= '')
					verifyErrorMsg(errorMessage, 'You must enter your username or email address.', 'blankEmailPassword', casper, function() {});
			});
		});
	});

	//test case for login to application by leaving password field blank and verify error message
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['BlankPassword'].username, json['BlankPassword'].password, casper, function(){
			casper.echo('Login by leaving blank username and password and verify error message', 'INFO');
			casper.then(function() {
				this.capture(screenShotsDir+ '11.png');
				test.assertExists('form[name="frmLogin"] [role="alert"]');
				errorMessage = casper.fetchText('form[name="frmLogin"] [role="alert"]');
				errorMessage = errorMessage.trim();
				if(errorMessage && errorMessage!= '')
					verifyErrorMsg(errorMessage, 'You must enter your password.', 'blankPassword', casper, function() {});
			});
		});
	});

	//test case for login to application with valid valid username and password then logout from application
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(){
			casper.then(function() {
				casper.capture(screenShotsDir+"1.png");
				test.assertDoesntExist('#td_tab_login');
				casper.echo('User has been successfuly login to application', 'INFO'); 
				casper.then(function(){
					forumLogin.logoutFromApp(casper, function(){
						casper.echo('Successfully logout from application', 'INFO');
					});
				});	
			});
		});
	});
	
	//test case for login to application with valid valid email and password then logout from application
	casper.thenOpen(config.url);
	casper.then(function(){
		forumLogin.loginToApp(json['ValidEmail'].username, json['ValidEmail'].password, casper, function(){
			casper.then(function() {
				test.assertDoesntExist('#td_tab_login');
				casper.echo('User has been successfuly login to application', 'INFO'); 
				casper.then(function(){
					forumLogin.logoutFromApp(casper, function(){
						casper.echo('Successfully logout from application', 'INFO');
					});
				});
			});
		});
	});
};


/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/

// method for login to application by passing username and password
forumLogin.loginToApp = function(username, password, driver,callback) {
	driver.echo("username : " +username+ " & password : " +password);
	try{
		driver.test.assertExists('#td_tab_login');
		driver.click('#td_tab_login');
		driver.then(function() {});
		driver.fill('form[name="frmLogin"]', {
			'member': username,
			'pw' : password
		}, false);
		
		try {
			driver.test.assertExists('form[name="frmLogin"] input[type="submit"]');
			driver.click('form[name="frmLogin"] input[type="submit"]');
		}catch(e) {
			driver.test.assertExists('form[name="frmLogin"] button[type="submit"]');
			driver.click('form[name="frmLogin"] button[type="submit"]');
		}
		driver.capture(screenShotsDir+ 'afterSubmit.png');
	}catch(e) {
		driver.echo("The user is already logged-in.", 'INFO');
	}	 
	
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

//Method For Verifying Error Message On Edit Profile/Account Setting Page After Submitting Form
var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	driver.capture(screenShotsDir + 'Error_OnEdit' +msgTitle+ '.png');
	return callback();
};



