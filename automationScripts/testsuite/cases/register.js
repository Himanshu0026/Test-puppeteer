'use strict';
var json = require('../../testdata/registerData.json');
var config = require('../../../config/config.json');
var registerMethod = require('../methods/register.js');
var wait = require('../wait.js');
var registerTests=module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'register/';



//Getting 'User Accounts' Field Valu If, Enabled, Then Filling Data For Testing
registerTests.userAccountsEnable  = function() {

	casper.echo('******************** case-1 ************************');
	casper.echo('Getting User Accounts Field Valu If, Enabled, Then Filling Data For Testing');
	casper.echo('********************************************');
	//Login To Forum BackEnd 
	registerMethod.loginToForumBackEnd(casper, casper.test, function() {
		casper.echo('Successfully Login To Forum Back End...........', 'INFO');
                //casper.thenOpen(config.backendCred, function() {
			//Clicking On "General" Tab Under Settings 
			wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
						casper.test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
						casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
						casper.echo('Successfully open forum settings form.....', 'INFO');
						//Getting 'User Accounts' Field Value, If, Enabled, Then Filling Data For Testing
						wait.waitForElement('#REQreg', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									utils.enableorDisableCheckbox('REQreg', true, casper, function(err) {
										if (!err){
											casper.echo("User Accounts Checkbox Has Been Enabled For Registered User", 'INFO');
											casper.test.assertExists('.button.btn-m.btn-blue');
											casper.click('.button.btn-m.btn-blue');
										}	
									});	
								} else {
									casper.echo('User Accounts Checkbox Not Found', 'ERROR');
								}	
							}
						});
					} else {
						casper.echo('Setting Link Not Found', 'ERROR');
					}
				}
			});
                //});
	});
	
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
			if(!err){
				if(isExist) {
					casper.test.assertExists('.pull-right a[href="/register/register"]');
					casper.click('.pull-right a[href="/register/register"]');
					casper.echo('Successfully open register form.....', 'INFO');
				} else {
					casper.echo('User didn\'t not found any register link', 'ERROR');
				}
			}
		});
	});
		
}


//test case for register to application by leaving blank username and verify error message
registerTests.blankUsername = function() {
	casper.then(function() {
		casper.echo('******************** case-2 ************************');
		casper.echo('test case for register to application by leaving blank username and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['blankUsername'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank username and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '1.png');
				wait.waitForElement('form[name="PostTopic"] input[name="member"]', casper, function(err, isExist){ 
					 if(!err){
						 if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="member"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter a username.', 'blankUsername', casper, function() {});
						} else {
							casper.echo('postTopic form  Not Found', 'ERROR');
						}
					}
				});
			}
		});	
	}); 	
}


//test case for register to application by leaving blank email and verify error message
registerTests.blankEmail = function() {
	casper.then(function() {
		casper.echo('******************** case-3 ************************');
		casper.echo('test case for register to application by leaving blank email and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['blankEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank email and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '2.png');
				wait.waitForElement('form[name="PostTopic"] input[name="email"]', casper, function(err, isExist){ 
				 if(!err){
						 if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter your email address.', 'blankEmail', casper, function() {});	
						} else {
								casper.echo('postTopic form  Not Found', 'ERROR');
					   }
					}
				});
			}				
		});
	});
}


//test case for register to application by leaving blank password and verify error message
registerTests.blankPassword = function() {
	casper.then(function() {
		casper.echo('******************** case-4 ************************');
		casper.echo('test case for register to application by leaving blank password and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['blankPassword'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank password and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '3.png');
				wait.waitForElement('form[name="PostTopic"] input[name="pw"]', casper, function(err, isExist){ 
					 if(!err){
						 if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="pw"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter a password.', 'blankPassword', casper, function() {});
						} else {
							casper.echo('postTopic form  Not Found', 'ERROR');
						}
					}
				});
			}				
		});
	});
}


//test case for register to application by existing username and verify error message
registerTests.existUsername = function() {		
	casper.then(function() {
		casper.echo('******************** case-5 ************************');
		casper.echo('test case for register to application by existing username and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['existUsername'], casper, function(err){
			if(!err) {
				casper.echo('register by existing username and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '7.png');
				wait.waitForElement('#registerEditProfile div[role="alert"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'The username "35" has already been taken.', 'existWithName', casper, function() {});
						} else {
							casper.capture(screenShotsDir+ '77.png');
							var pageJson = JSON.parse(casper.getPageContent());
							var message = pageJson.message;
							casper.echo(message, 'INFO');
							casper.thenOpen(config.url, function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
								wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('.pull-right a[href="/register/register"]');
											casper.click('.pull-right a[href="/register/register"]');
											casper.echo('Successfully open register form.....', 'INFO');
										} else {
											casper.echo('User didn\'t not found any register link', 'ERROR');
										}
									}
								});
							});
						}
					}
				});
			}
		});
	});
}


//test case for register to application by existing email and verify error message
registerTests.existEmail = function() {
	casper.then(function() {
		 casper.echo('******************** case-6 ************************');
		 casper.echo('test case for register to application by existing email and verify error message');
		 casper.echo('********************************************');
		 registerMethod.registerToApp(json['existEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by existing email and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '8.png');
				wait.waitForElement('#registerEditProfile div[role="alert"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'It looks like you are already registered', 'existEmail', casper, function() {});
						} else {
							casper.capture(screenShotsDir+ '88.png');
							var pageJson = JSON.parse(casper.getPageContent());
							var message = pageJson.message;
							casper.echo(message, 'INFO');
							casper.thenOpen(config.url, function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
								wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('.pull-right a[href="/register/register"]');
											casper.click('.pull-right a[href="/register/register"]');
											casper.echo('Successfully open register form.....', 'INFO');
										} else {
											casper.echo('User didn\'t not found any register link', 'ERROR');
										}
									}
								});
							});
						}
					}
				});
			}
		});
	});
}



//test case for register to application by leaving blank im-id and verify error message
registerTests.blankImId = function() {
	casper.then(function() {
		casper.echo('******************** case-7 ************************');
		casper.echo('test case for register to application by leaving blank im-id and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['blankImId'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank im-id and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '4.png');
				wait.waitForElement('form[name="PostTopic"] input[name="imID"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter your screen name.', 'blankImId', casper, function() {});
						} else {
							casper.echo('IM-ID field doesn\'t exists..', 'ERROR');
							casper.capture(screenShotsDir+ '44.png');
							var pageJson = JSON.parse(casper.getPageContent());
							var message = pageJson.message;
							casper.echo(message, 'INFO');
							casper.thenOpen(config.url, function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
								wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('.pull-right a[href="/register/register"]');
											casper.click('.pull-right a[href="/register/register"]');
											casper.echo('Successfully open register form.....', 'INFO');
										} else {
											casper.echo('User didn\'t not found any register link', 'ERROR');
										}
									}
								});
							});
						}
					}
				});
			}	
		});
	});
}


//test case for register to application by leaving blank birthday and verify error message
registerTests.blankBirthday = function() {
	casper.then(function() {
		casper.echo('******************** case-8 ************************');
		casper.echo('test case for register to application by leaving blank birthday and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['blankBirthday'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank birthday and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '5.png');
				wait.waitForElement('form[name="PostTopic"] input[name="birthDatepicker"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
								errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter birthday.', 'blankBirthday', casper, function() {});
						} else {
							casper.echo('Birthday field doesn\'t exists..', 'ERROR');
							casper.capture(screenShotsDir+ '55.png');
							var pageJson = JSON.parse(casper.getPageContent());
							var message = pageJson.message;
							casper.echo(message, 'INFO');
							casper.thenOpen(config.url, function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
								wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('.pull-right a[href="/register/register"]');
											casper.click('.pull-right a[href="/register/register"]');
											casper.echo('Successfully open register form.....', 'INFO');
										} else {
											casper.echo('User didn\'t not found any register link', 'ERROR');
										}
									}
								});
							});
						}
					}
				});
			}
		});
	});
}


//test case for register to application by invalid email and verify error message
registerTests.invalidEmail = function() {
	casper.then(function() {
		casper.echo('******************** case-9 ************************');
		casper.echo('test case for register to application by invalid email and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['invalidEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by invalid email and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '10.png');
				wait.waitForElement('form[name="PostTopic"] input[name="email"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'You entered an invalid email address.', 'invalidEmail', casper, function() {});
						} else {
							casper.capture(screenShotsDir+ '1010.png');
							var pageJson = JSON.parse(casper.getPageContent());
							var message = pageJson.message;
							casper.echo(message, 'INFO');
							casper.thenOpen(config.url, function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
								wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('.pull-right a[href="/register/register"]');
											casper.click('.pull-right a[href="/register/register"]');
											casper.echo('Successfully open register form.....', 'INFO');
										} else {
											casper.echo('User didn\'t not found any register link', 'ERROR');
										}
									}
								});
							});
						}
					}
				});
			}
		});
	});
}


//test case for register to application by leaving blank signature and verify error message
registerTests.blankSignature = function() {
	casper.then(function() {
		casper.echo('******************** case-10 ************************');
		casper.echo('test case for register to application by leaving blank signature and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['blankSignature'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank signature and verify error message', 'INFO');
				//casper.capture(screenShotsDir+ '6.png');
			}
		});
	});	
}




//test case for register to application by existing username and email and verify error message
registerTests.existUsernameEmail= function() {
	casper.then(function() {
		casper.echo('******************** case-11 ************************');
		casper.echo('test case for register to application by existing username and email and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['existUsernameEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by existing username and email and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '9.png');
				wait.waitForElement('#registerEditProfile div[role="alert"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'It looks like you already have a forum account! A forum account for that username and email address combination already exists!', 'existUsernameEmail', casper, function() {});
						} else {
							casper.capture(screenShotsDir+ '99.png');
							var pageJson = JSON.parse(casper.getPageContent());
							var message = pageJson.message;
							casper.echo(message, 'INFO');
							casper.thenOpen(config.url, function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
								wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('.pull-right a[href="/register/register"]');
											casper.click('.pull-right a[href="/register/register"]');
											casper.echo('Successfully open register form.....', 'INFO');
										} else {
											casper.echo('User didn\'t not found any register link', 'ERROR');
										}
									}
								});
							});
						}
					}
				});
			}
		});
	});
}





//test case for register to application by valid data and verify error message
registerTests.validInfo= function() {
	casper.then(function() {
		casper.echo('******************** case-12 ************************');
		casper.echo('test case for register to application by valid data and verify error message');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['validInfo'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
			registerMethod.redirectToLogout(casper, casper.test, function() {});
		});
	});
}






	





