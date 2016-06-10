
//----- This js file covers all the valid and invalid scenarios for forgot functionality from login window comes from home page---------//

'use strict';
var json = require('../testdata/forgotpasswordData.json');
var config = require('../config/config.json');

var forgotpwd = module.exports = {};

forgotpwd.featureTest = function(casper) {
	var screenShotsDir = config.screenShotsLocation + "forgotPwd/";

	// this code is to lauch application to perform related actions
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
	});

	// verify title of the forgot password page
	casper.then(function() {
		forgotpwd.verifyForgotPasswordLink(casper, function(){
			casper.log("Forgot password link is verified");
		});

	});
	//This 3 seconds of wait has been put to load the navigated page to perform next action
	casper.wait(3000);

	//verify forgot password functionality with invalid scenarios and verify error message
	casper.then(function() {
	   this.eachThen(json['invalidInfo'], function(response) {
		casper.log("=========" +JSON.stringify(response.data));
		forgotpwd.forgotPassword(response.data, casper, function() {
			var ActualMessage="";
			var responseData = response.data;
			//This is to verify error message while submitting request for reset password with blank username and Email id
			if(responseData.errorType == "Blank Username and Email") {
					 ActualMessage = casper.getElementAttribute('form[name="lost_pw_form"] input[name="member"]', 'data-original-title');
					if(ActualMessage.trim() == responseData.ExpectedMessage){
						casper.log("Error message is verified while submit request with blank username and email", 'info');
					}else {
						casper.log("Error Occurred", "ERROR");
						casper.capture(screenShotsDir+"Error_BlankData.png");
					}
			//This is to verify error message while submitting request for reset password with invalid username
			}else if(responseData.errorType == "Invalid Username") {
				casper.wait(5000, function() {
					var ActualMessage = casper.fetchText('div.alert.alert-danger');
					if(ActualMessage.trim() == responseData.ExpectedMessage){
						casper.log("Error message in case of invalid username has been verified", 'info');
					}else {
						casper.log("Error Occurred", "error");
						this.capture(screenShotsDir+"Error_invalidUsername.png");
					}
				});
			//This is to verify error message while submitting request for reset password with invalid email id
			} else if(response.data.errorType == "Invalid Email") {
				casper.wait(5000, function() {
					var ActualMessage = casper.fetchText('div.alert.alert-danger');
					if(ActualMessage.trim() == responseData.ExpectedMessage){
						casper.log("Error message in case of invalid Email has been verified", 'info');
					}else {
						casper.log("Error Occurred", "error");
						this.capture(screenShotsDir+"Error_ForgotPasswordwithinvalidEmail.png");
					}
				});
			//This is to verify error message while submitting request for reset password with invalid username and email id
			} else if(response.data.errorType == "Invalid Username and Email") {
				casper.wait(5000, function() {
					var ActualMessage = casper.fetchText('div.alert.alert-danger');
					if(ActualMessage.trim() == responseData.ExpectedMessage){
						casper.log("Error message is verified while submitting request with invalid username and email", 'info');
					}else {
						casper.log("Error Occurred", "ERROR");
						this.capture(screenShotsDir+"Error_invalidUsernameandEmail.png");
					}
				});
			  }
		
		     });
	       });
	});


	/*************** This code has been commented because it is incomplete ******************/
	//verify forgot password functionality with valid scenarios and verify success message
	/*casper.then(function() {
	this.eachThen(json['validinfo'], function(response) {
			casper.log("=========" +JSON.stringify(response.data));
		forgotpwd.forgotPassword(response.data, casper, function() {
		var ActualMessage="";
			var responseData = response.data;
			//This is to verify success message after submitting request for reset password with valid email id
			if(responseData.validationType == "valid email only") {
					casper.waitforSelector("div.text-center.bmessage", 
					function success(){			
						ActualMessage = casper.fetchText('div.text-center.bmessage');
						var ActualMessage1 = casper.fetchText('div.text-center small');
						ActualMessage = ActualMessage.replace(ActualMessage1, "");
						casper.log("******valid username******"+ActualMessage.trim());
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						this.click('small a[href="/categories"]');

						forgotpwd.verifyForgotPasswordLink(casper, function(){
							casper.log("Forgot password link is verified");
						});
					function fail() {
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.capture(screenShotsDir+"Error_validEmail.png");
					});

					/*if(ActualMessage.trim() == responseData.ExpectedMessage){
						casper.log("successful message is verified while submit request with vaild email only, 'info');
						this.click('small a[href="/categories"]');

						forgotpwd.verifyForgotPasswordLink(casper, function(){
							casper.log("Forgot password link is verified");
						});
					}else {
						casper.log("Error Occurred", "ERROR");
						casper.capture(screenShotsDir+"Error_validEmail.png");
					}
			//This is to verify success message after submitting request for reset password with valid username
			}else if(responseData.validationType == "valid username only") {
				casper.wait(5000, function() {
					ActualMessage = casper.fetchText('div.alert.alert-danger');
					casper.log("******invalid username******"+ActualMessage.trim());
					if(ActualMessage.trim() == responseData.ExpectedMessage){
						casper.log("successful message is verified while submit request with vaild username only", 'info');
						this.click('small a[href="/categories"]');
					}else {
						casper.log("Error Occurred", "error");
						this.capture(screenShotsDir+"Error_invalidUsername.png");
					}
				});
			//This is to verify success message after submitting request for reset password with valid username and email id
			} else if(response.data.validationType == "Valid username and email") {
				casper.wait(5000, function() {
					ActualMessage = casper.fetchText('div.alert.alert-danger');
					casper.log("******invalid username******"+ActualMessage.trim());
					if(ActualMessage.trim() == responseData.ExpectedMessage){
						casper.log("successful message is verified while submit request with vaild username and email only", 'info');
						this.click('small a[href="/categories"]');
					}else {
						casper.log("Error Occurred", "error");
						this.capture("ScreenShots/Error_ValidEmailandUsername.png");
					}
				});
			  }
		
		     });
	       });
	});*/


};


/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/

//method to send forgot password request after filling username/email
forgotpwd.forgotPassword = function(data, driver, callback) {
	driver.fill('form[name="lost_pw_form"]', {
		'member' : data.username,
		'email' : data.email	
	}, false); 
	driver.click('input[name="Submit"]');
	return callback();
};

//method to verify forgot password link from home page
forgotpwd.verifyForgotPasswordLink = function(driver, callback) {
	driver.click('#td_tab_login');
	driver.click('#anchor_tab_forget_password');
	driver.wait(7000, function() {
	if(driver.getTitle().indexOf("Lost Your Password?")>=0) {
		casper.log("Lost Your Password page is redirected");
	}else{
		casper.log("Error occurred on forgot Password");
		driver.capture("ScreenShots/ForgotPasswordError.png");
	}
	});
	return callback();

};



