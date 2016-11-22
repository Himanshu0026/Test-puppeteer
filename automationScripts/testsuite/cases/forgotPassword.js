/***These are the function which has been called in forgotPassword.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var  forgotPasswordMethod = require('../methods/forgotPassword.js');
var forgotPasswordTestcases = module.exports = {};

//method to test the Reset password with valid username functionality
forgotPasswordTestcases.resetPasswordUsingValidUsername = function() {
	var screenShotsDir = config.screenShotsLocation + "forgotPassword/";
	var ActualMessage="";
	// this code is to launch application to perform related actions
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
		casper.then(function() {
			forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
				if (err) {
					casper.echo("Error Occurred In Callback", "ERROR");
				} else { 
					casper.echo("Forgot password page is navigated");
					casper.then(function() {
						forgotPasswordMethod.forgotPassword(json['validUserName'].username, json['validUserName'].email, casper, function(err) {
							if (!err) {
								//This is to verify success message after submitting request for reset password with valid username
								forgotPasswordMethod.waitForElement("div.text-center.bmessage", casper, function(err, isExist) {
									if(isExist) {
										ActualMessage = casper.fetchText('div.text-center.bmessage');
										var ActualMessage1 = casper.fetchText('div.text-center small');
										ActualMessage = ActualMessage.replace(ActualMessage1, "");
										casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
										casper.capture(screenShotsDir+"validusername.png");
										casper.test.assert(ActualMessage.indexOf(json['validUserName'].ExpectedMessage) > -1,'Same as expected message');
										casper.waitForSelector('small a[href="/categories"]', function() {
											this.click('small a[href="/categories"]');
										});
									} else {
										test.assert(ActualMessage.indexOf(responseData.ExpectedMessage) > -1);
										casper.capture(screenShotsDir+"Error_validusername.png");
									}
								});
							}
						});
					});
				}
			});
		});
	});
};

