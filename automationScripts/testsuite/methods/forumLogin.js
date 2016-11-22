/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict';
var forumLoginMethod = module.exports = {};
var errorMessage = "";

// method for login to application by passing username and password
forumLoginMethod.loginToApp = function(username, password, driver, callback) {
	driver.echo("username : " +username+ " & password : " +password);
	try {
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
	} catch(e) {
		driver.echo("The user is already logged-in.", 'INFO');
	}	 
	
	return callback(null);
};

//method for logout from application
forumLoginMethod.logoutFromApp = function(driver, callback) {
	try {
		driver.test.assertExists('ul.nav.pull-right span.caret');
		driver.click('ul.nav.pull-right span.caret');
		try {
			driver.test.assertExists('#logout');
			driver.click('#logout');
		}catch(e) {
			driver.test.assertDoesntExist('#logout');
		}
	}catch(e) {
		driver.test.assertDoesntExist('ul.nav.pull-right span.caret');
	}
	return callback(null);
};

//Method For Verifying Error Message On Edit Profile/Account Setting Page After Submitting Form
forumLoginMethod.verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

