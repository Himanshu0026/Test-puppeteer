
//----- This js file covers all the valid and invalid scenarios for forgot functionality from login window comes from home page---------//

'use strict';
var json = require('../testdata/forgotpasswordData.json');
var config = require('../config/config.json');

var forgotpwd = module.exports = {};

forgotpwd.featureTest = function(casper, test) {
	var screenShotsDir = config.screenShotsLocation + "forgotPwd/";
	var ActualMessage="";

	// this code is to launch application to perform related actions
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
	});

	// verify title of the forgot password page
	casper.then(function() {
		forgotpwd.gotoForgotPasswordpage(casper, function(){
			casper.wait(3000, function(){
				test.assert(this.getTitle().indexOf("Lost Your Password?")>=0);
				casper.echo("Forgot password link is verified", 'info');
			});
		});
	});

	//verify forgot password functionality with invalid scenarios and verify error message
	casper.then(function() {
	   this.eachThen(json['invalidInfo'], function(response) {
		casper.echo("=========" +JSON.stringify(response.data));
		forgotpwd.forgotPassword(response.data, casper, function() {

			var responseData = response.data;
			//This is to verify error message while submitting request for reset password with blank username and Email id
			if(responseData.errorType == "Blank Username and Email") {
				casper.waitForSelector('form[name="lost_pw_form"] input[name="member"]',
					function success(){
						ActualMessage = casper.getElementAttribute('form[name="lost_pw_form"] input[name="member"]', 'data-original-title');	
						casper.echo("Actual error in tooltip --> "+ActualMessage.trim());			
						test.assertEquals(ActualMessage.trim(),responseData.ExpectedMessage);
						casper.echo("Error message is verified while submit request with blank username and email");
					}, function fail(){
						casper.echo("Error Occurred", "ERROR");
						casper.capture(screenShotsDir+"Error_BlankData.png");
				});
			casper.capture(screenShotsDir+"BlankData.png");

			//This is to verify error message while submitting request for reset password with invalid username
			}else if(responseData.errorType == "Invalid Username") {
				casper.waitForSelector('div.alert.alert-danger',
					function success(){
						ActualMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Actual error message is --> "+ActualMessage.trim());
						casper.capture(screenShotsDir+"invalidUsername.png");				
						test.assertEquals(ActualMessage.trim(),responseData.ExpectedMessage);
						casper.echo("Error message in case of invalid username has been verified");
					}, function fail(){
						casper.echo("Error Occurred", "ERROR");
						casper.capture(screenShotsDir+"Error_invalidUsername.png");
				});

			//This is to verify error message while submitting request for reset password with invalid email id
			} else if(response.data.errorType == "Invalid Email") {
				casper.waitForSelector('div.alert.alert-danger',
					function success(){
						ActualMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Actual error message is --> "+ActualMessage.trim());
						casper.capture(screenShotsDir+"invalidEmail.png");				
						test.assertEquals(ActualMessage.trim(),responseData.ExpectedMessage);
						casper.echo("Error message in case of invalid Email has been verified");
					}, function fail(){
						casper.echo("Error Occurred", "ERROR");
						casper.capture(screenShotsDir+"Error_invalidEmail.png");
				});


			//This is to verify error message while submitting request for reset password with invalid username and email id
			} else if(response.data.errorType == "Invalid Username and Email") {
				casper.waitForSelector('div.alert.alert-danger',
					function success(){
						ActualMessage = casper.fetchText('div.alert.alert-danger');
						casper.echo("Actual error message is --> "+ActualMessage.trim());
						casper.capture(screenShotsDir+"invalidUsernameandEmail.png");				
						test.assertEquals(ActualMessage.trim(),responseData.ExpectedMessage);
						casper.echo("Error message is verified while submitting request with invalid username and email");
					}, function fail(){
						casper.echo("Error Occurred", "ERROR");
						casper.capture(screenShotsDir+"Error_invalidUsernameandEmail.png");
				});
				
			  }
		
		     });
	       });
	});

	casper.thenOpen(config.url);
	// verify title of the forgot password page
	casper.then(function() {
		forgotpwd.gotoForgotPasswordpage(casper, function(){
			casper.echo("Forgot password page is navigated");
		});
	});

	//verify forgot password functionality with valid scenarios and verify success message
	casper.then(function() {
	this.eachThen(json['validinfo'], function(response) {
			casper.echo("=======>>" +JSON.stringify(response.data));
		forgotpwd.forgotPassword(response.data, casper, function() {
			var responseData = response.data;
			//This is to verify success message after submitting request for reset password with valid email id
			if(responseData.validationType == "valid email only") {
					casper.waitForSelector("div.text-center.bmessage", 
					function success(){			
						ActualMessage = casper.fetchText('div.text-center.bmessage');
						var ActualMessage1 = casper.fetchText('div.text-center small');
						ActualMessage = ActualMessage.replace(ActualMessage1, "");
						casper.echo("Actual success message is --> "+ActualMessage.trim());
						casper.capture(screenShotsDir+"validEmail.png");
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.waitForSelector('small a[href="/categories"]', function() {
							this.click('small a[href="/categories"]');
						});
						casper.waitForSelector('#startTopic', function() {
							forgotpwd.gotoForgotPasswordpage(casper, function(){
								casper.echo("Forgot password page navigated");
							});
						});
					},function fail() {
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.capture(screenShotsDir+"Error_validEmail.png");
					});
					

			//This is to verify success message after submitting request for reset password with valid username
			}else if(responseData.validationType == "valid username only") {
				casper.waitForSelector("div.text-center.bmessage", 
					function success(){			
						ActualMessage = casper.fetchText('div.text-center.bmessage');
						var ActualMessage1 = casper.fetchText('div.text-center small');
						ActualMessage = ActualMessage.replace(ActualMessage1, "");
						casper.echo("Actual success message is --> "+ActualMessage.trim());
						casper.capture(screenShotsDir+"validusername.png");
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.waitForSelector('small a[href="/categories"]', function() {
							this.click('small a[href="/categories"]');
						});
						casper.waitForSelector('#startTopic', function() {
							forgotpwd.gotoForgotPasswordpage(casper, function(){
								casper.echo("Forgot password page is navigated");	
							});
						});
					},function fail() {
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.capture(screenShotsDir+"Error_validusername.png");
					});
					

			//This is to verify success message after submitting request for reset password with valid username and email id
			} else if(response.data.validationType == "valid username and email") {
				casper.waitForSelector("div.text-center.bmessage", 
					function success(){			
						ActualMessage = casper.fetchText('div.text-center.bmessage');
						var ActualMessage1 = casper.fetchText('div.text-center small');
						ActualMessage = ActualMessage.replace(ActualMessage1, "");
						casper.echo("Actual success message is --> "+ActualMessage.trim());
						casper.capture(screenShotsDir+"ValidEmailandUsername.png");
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.waitForSelector('small a[href="/categories"]', function() {
							this.click('small a[href="/categories"]');
						});
						casper.waitForSelector('#startTopic', function() {
							forgotpwd.gotoForgotPasswordpage(casper, function(){
								casper.echo("Forgot password page navigated");
							});
						});
					},function fail() {
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.capture(screenShotsDir+"Error_ValidEmailandUsername.png");
					});
					casper.capture(screenShotsDir+"ValidEmailandUsername.png");
			
			   //This is to verify success message after submitting request for reset password with valid username and invalid Email	
			  } else if(response.data.validationType == "valid username and invalid email") {
				casper.waitForSelector("div.text-center.bmessage", 
					function success(){			
						ActualMessage = casper.fetchText('div.text-center.bmessage');
						var ActualMessage1 = casper.fetchText('div.text-center small');
						ActualMessage = ActualMessage.replace(ActualMessage1, "");
						casper.echo("Actual success message is --> "+ActualMessage.trim());
						casper.capture(screenShotsDir+"validUsernameinvalidEmail.png");
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.waitForSelector('small a[href="/categories"]', function() {
							this.click('small a[href="/categories"]');
						});
						casper.waitForSelector('#startTopic', function() {
							forgotpwd.gotoForgotPasswordpage(casper, function(){
								casper.echo("Forgot password page navigated");
							});
						});
					},function fail() {
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.capture(screenShotsDir+"Error_validUsernameinvalidEmail.png");
					});

			//This is to verify success message after submitting request for reset password with invalid username and valid Email						
			  } else if(response.data.validationType == "invalid username and valid email") {
				casper.waitForSelector("div.text-center.bmessage", 
					function success(){			
						ActualMessage = casper.fetchText('div.text-center.bmessage');
						var ActualMessage1 = casper.fetchText('div.text-center small');
						ActualMessage = ActualMessage.replace(ActualMessage1, "");
						casper.echo("Actual success message is --> "+ActualMessage.trim());
						casper.capture(screenShotsDir+"ValidEmailInvalidUsername.png");
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.waitForSelector('small a[href="/categories"]', function() {
							this.click('small a[href="/categories"]');
						});
					},function fail() {
						test.assertEquals(ActualMessage.trim(), responseData.ExpectedMessage);
						casper.capture(screenShotsDir+"Error_ValidEmailInvalidUsername.png");
					});	
			  } 
		
		     });
	       });
	});
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
forgotpwd.gotoForgotPasswordpage = function(driver, callback) {
	driver.click('#td_tab_login');
	driver.click('#anchor_tab_forget_password');
	return callback();

};



