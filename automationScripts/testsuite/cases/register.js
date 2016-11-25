'use strict';
var json = require('../../testdata/registerData.json');
var config = require('../../../config/config.json');
var utils = require('../utils.js');
var registerMethod = require('../methods/register.js');
var wait = require('../wait.js');
var registerTests = module.exports = {};

//Getting 'User Accounts' Field Value If, Enabled, Then Filling Data For Testing
registerTests.userAccountsEnable  = function() {

	casper.echo('******************** case-1 ************************', 'INFO');
	casper.echo('Getting User Accounts Field Value If, Enabled, Then Filling Data For Testing', 'INFO');
	casper.echo('********************************************', 'INFO');
	 
	 //Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			casper.test.assertExists('a[href="/tool/members/login?action=logout"]');
			casper.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			casper.test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});
	//Login To Forum BackEnd
	casper.then(function() {
		registerMethod.loginToForumBackEnd(casper, casper.test, function(err) {
			 if(!err){
				casper.echo('Logged-in successfully from back-end', 'INFO');
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/fields"]');
							casper.click('div#ddUsers a[href="/tool/members/mb/fields"]');
							wait.waitForElement('form[name="posts"]', casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										casper.click('form#custom_fields_table input');
										casper.click('form#custom_fields_table button');
										wait.waitForElement('p:nth-child(4)', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													
													var msg = casper.fetchText('p:nth-child(4)');
													casper.echo('Success Message: '+msg, 'INFO');
													casper.echo('all custom profile fields have been deleted', 'INFO');
												}else{
												casper.echo('Message is not generated Found', 'ERROR');
												}
											}
										});
									}else{
										casper.echo('custom_fields Not Found', 'ERROR');
									}
								}
							});
							casper.then(function() {
								casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
								casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
								casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
								casper.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
								wait.waitForElement('div.heading', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.fill('form[name="posts"]', {
												'required_name' : 1,
												'required_imType' : 1,
												'required_dob' : 1,
												'required_signature' : 1
											}, true);
											casper.click('form[name="posts"] button');
											wait.waitForElement('font[color="red"]', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														var successMsg = casper.fetchText('font[color="red"]');
														casper.echo('success message : '+successMsg, 'INFO');
														casper.echo('success message is verified', 'INFO');
													}else{
														 casper.echo('Message is not generated Found', 'ERROR');
													}
												}
											});
										}else{
										     casper.echo('Default_registration_option Link Not Found', 'ERROR');
										}
									}
								});				
							});		
						} else {
							casper.echo('Account Forum Menu Not Found', 'ERROR');
						}
					}
			    });
			}
		});
	});
	//Login To Forum BackEnd
	casper.thenOpen(config.backEndUrl, function() {
	    casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		registerMethod.loginToForumBackEnd(casper, casper.test, function(err) {
			 if(!err){
				casper.echo('Successfully Login To Forum Back End...........', 'INFO');
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
			}        
		});
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
		casper.echo('******************** case-2 ************************', 'INFO');
		casper.echo('test case for register to application by leaving blank username and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerMethod.registerToApp(json['blankUsername'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank username and verify error message', 'INFO');
				wait.waitForElement('form[name="PostTopic"] input[name="member"]', casper, function(err, isExist){ 
					 if(!err){
						 if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="member"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter a username.', 'blankUsername', casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
									}
								});
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
		casper.echo('******************** case-3 ************************', 'INFO');
		casper.echo('test case for register to application by leaving blank email and verify error message', 'INFO');
		casper.echo('********************************************');
		registerMethod.registerToApp(json['blankEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank email and verify error message', 'INFO');
				wait.waitForElement('form[name="PostTopic"] input[name="email"]', casper, function(err, isExist){ 
				 if(!err){
						 if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter your email address.', 'blankEmail', casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
									}
								});	
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
		casper.echo('******************** case-4 ************************', 'INFO');
		casper.echo('test case for register to application by leaving blank password and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerMethod.registerToApp(json['blankPassword'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank password and verify error message', 'INFO');
				wait.waitForElement('form[name="PostTopic"] input[name="pw"]', casper, function(err, isExist){ 
					 if(!err){
						 if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="pw"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter a password.', 'blankPassword', casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
									}
								});
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
		casper.echo('******************** case-5 ************************', 'INFO');
		casper.echo('test case for register to application by existing username and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerMethod.registerToApp(json['existUsername'], casper, function(err){
			if(!err) {
				casper.echo('register by existing username and verify error message', 'INFO');
				wait.waitForElement('#registerEditProfile div[role="alert"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'The username "35" has already been taken.', 'existWithName', casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
									}
								});
						} else {
							
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
		 casper.echo('******************** case-6 ************************', 'INFO');
		 casper.echo('test case for register to application by existing email and verify error message', 'INFO');
		 casper.echo('********************************************', 'INFO');
		 registerMethod.registerToApp(json['existEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by existing email and verify error message', 'INFO');
				wait.waitForElement('#registerEditProfile div[role="alert"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'It looks like you are already registered', 'existEmail', casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
									}
								});
						} else {
						
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
		casper.echo('******************** case-7 ************************', 'INFO');
		casper.echo('test case for register to application by leaving blank im-id and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerMethod.registerToApp(json['blankImId'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank im-id and verify error message', 'INFO');
				wait.waitForElement('form[name="PostTopic"] input[name="imID"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter your screen name.', 'blankImId', casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
									}
								});
						} else {
							casper.echo('IM-ID field doesn\'t exists..', 'ERROR');
							
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
		casper.echo('******************** case-8 ************************', 'INFO');
		casper.echo('test case for register to application by leaving blank birthday and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerMethod.registerToApp(json['blankBirthday'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank birthday and verify error message', 'INFO');
				wait.waitForElement('form[name="PostTopic"] input[name="birthDatepicker"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
								errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter birthday.', 'blankBirthday', casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
									}
								});
						} else {
							casper.echo('Birthday field doesn\'t exists..', 'ERROR');
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
		casper.echo('******************** case-9 ************************', 'INFO');
		casper.echo('test case for register to application by invalid email and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerMethod.registerToApp(json['invalidEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by invalid email and verify error message', 'INFO');
				wait.waitForElement('form[name="PostTopic"] input[name="email"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'You entered an invalid email address.', 'invalidEmail', casper, function(err) {
									if(!err) {
										casper.echo('Verified error message successfully', 'INFO');
									}
								});
						} else {
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
		casper.echo('******************** case-10 ************************', 'INFO');
		casper.echo('test case for register to application by leaving blank signature and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerMethod.registerToApp(json['blankSignature'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank signature and verify error message', 'INFO');
			}
		});
	});	
}




//test case for register to application by existing username and email and verify error message
registerTests.existUsernameEmail= function() {
	casper.then(function() {
		casper.echo('******************** case-11 ************************', 'INFO');
		casper.echo('test case for register to application by existing username and email and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerMethod.registerToApp(json['existUsernameEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by existing username and email and verify error message', 'INFO');
				wait.waitForElement('#registerEditProfile div[role="alert"]', casper, function(err, isExist){ 
					if(!err){
						if(isExist) {
							var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'It looks like you already have a forum account! A forum account for that username and email address combination already exists!', 'existUsernameEmail', casper, function() {});
						} else {
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
		casper.echo('******************** case-12 ************************', 'INFO');
		casper.echo('test case for register to application by valid data and verify error message', 'INFO');
		casper.echo('********************************************', 'INFO');
		registerMethod.registerToApp(json['validInfo'], casper, function(err) {
			if(!err) {
				casper.echo('Processing to registration on forum.....', 'INFO');
				registerMethod.redirectToLogout(casper, casper.test, function(err) {
					if(!err) {
						casper.echo('User logout successfully', 'INFO');
					}
				});
			}
		});
	});
}






	





