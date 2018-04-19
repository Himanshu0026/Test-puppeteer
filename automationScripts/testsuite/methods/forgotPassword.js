/***These are the function which has been called in forgotPassword.js and also will be used in other js file as per requirement**********/
'use strict.';
var forumLoginMethod = require('./login.js');
var utils = require('../utils.js');
var forgotPasswordMethod = module.exports = {};

//method to verify forgot password link from home page
forgotPasswordMethod.gotoForgotPasswordPage = function(username, email) {
	if (casper.visible('#td_tab_login')) {
    utils.info('Login button visible!');
		casper.click('#td_tab_login');
		casper.evaluate(function() {
			document.querySelector('#anchor_tab_forget_password').click();
		});
		//casper.click('#anchor_tab_forget_password');
  } else {
    utils.info('Login button is not visible!');
		forumLoginMethod.logoutFromApp();
		casper.then(function() {
			forgotPasswordMethod.gotoForgotPasswordPage();
		});
  }

	casper.waitForSelector('form[name="lost_pw_form"]', function(){
		this.fill('form[name="lost_pw_form"]', {
			'member' : username,
			'email' : email
		}, false);
		this.click('input[name="Submit"]');
	});
};
