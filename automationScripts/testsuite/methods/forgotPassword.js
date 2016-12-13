/***These are the function which has been called in forgotPassword.js and also will be used in other js file as per requirement**********/
'use strict';
var forumLoginMethod = require('./login.js');
var config = require('../../../config/config.json');
var forgotPasswordMethod = module.exports = {};
var count = 1;
var failedScreenshotsLocation = config.failedScreenShotsLocation+'forgotPassword/';
 
//Method To capture Screenshots If Any Test Case Failed
casper.test.on('fail', function(failure) {
	casper.capture(failedScreenshotsLocation+'forgotPasswordMethodError'+count+'.png');
	count++;
});

//method to send forgot password request after filling username/email form
forgotPasswordMethod.forgotPassword = function(username, email, driver, callback) {
	driver.fill('form[name="lost_pw_form"]', {
		'member' : username,
		'email' : email	
	}, false); 
	driver.click('input[name="Submit"]');
	return callback(null);
};


//method to verify forgot password link from home page
forgotPasswordMethod.gotoForgotPasswordpage = function(driver, callback) {
	try {
		driver.test.assertExists('#td_tab_login');
		driver.click('#td_tab_login');
		driver.click('#anchor_tab_forget_password');
	} catch(e) {
		driver.test.assertDoesntExist('#td_tab_login');
		forumLoginMethod.logoutFromApp(driver, function() {
			driver.assertExists('#td_tab_login');
			driver.click('#td_tab_login');
			driver.click('#anchor_tab_forget_password');
		});
	}
	return callback(null);
};

