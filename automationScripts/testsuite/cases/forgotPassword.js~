/***These are the function which has been called in forgotPassword.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var  forgotPasswordMethod = require('../methods/forgotPassword.js');
var wait = require('../wait.js');
var forgotPasswordTestcases = module.exports = {};

//method to test the Reset password with valid username functionality --Test case 1
forgotPasswordTestcases.resetPasswordUsingValidUsername = function() {
	var screenShotsDir = config.screenShotsLocation + "forgotPassword/";
	var ActualMessage="";
	// this code is to launch application to perform related actions
	casper.then(function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else { 
				casper.echo("Forgot password page is navigated",'INFO');
				casper.then(function() {
					forgotPasswordMethod.forgotPassword(json['validUserName'].username, json['validUserName'].email, casper, function(err) {
						if (!err) {
							//This is to verify success message after submitting request for reset password with valid username
							wait.waitForElement("div.text-center.bmessage", casper, function(err, isExist) {
								if(isExist) {
									ActualMessage = casper.fetchText('div.text-center.bmessage');
									var ActualMessage1 = casper.fetchText('div.text-center small');
									ActualMessage = ActualMessage.replace(ActualMessage1, "");
									casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
									casper.capture(screenShotsDir+"validusername.png");
									casper.test.assert(ActualMessage.indexOf(json['validUserName'].ExpectedMessage) > -1,'Same as expected message');
									wait.waitForElement('small a[href="/categories"]', casper, function(err, isExist) {
										if(isExist) {
											casper.click('small a[href="/categories"]');
											return null;
										} else {
											casper.echo('Categories not found','INFO')
										}
									});
								} else {
									casper.test.assert(ActualMessage.indexOf(json['validUserName'].ExpectedMessage) > -1);
									casper.capture(screenShotsDir+"Error_validusername.png");
								}
							});
						}
					});
				});
			}
		});
	});
};


//method to test the Reset Password using Valid Email id functionality --Test case 2
forgotPasswordTestcases.resetPasswordUsingValidEmailid = function() {
	var screenShotsDir = config.screenShotsLocation + "forgotPassword/";
	var ActualMessage="";
	// this code is to launch application to perform related actions
	casper.then(function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else { 
				casper.echo("Forgot password page is navigated",'INFO');
				casper.then(function() {
					forgotPasswordMethod.forgotPassword(json['validEmailid'].username, json['validEmailid'].email, casper, function(err) {
						if (!err) {
							//This is to verify success message after submitting request for reset password with valid Email id
							wait.waitForElement("div.text-center.bmessage", casper, function(err, isExist) {
								if(isExist) {
									ActualMessage = casper.fetchText('div.text-center.bmessage');
									var ActualMessage1 = casper.fetchText('div.text-center small');
									ActualMessage = ActualMessage.replace(ActualMessage1, "");
									casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
									casper.capture(screenShotsDir+"validEmail.png");
									casper.test.assert(ActualMessage.indexOf(json['validEmailid'].ExpectedMessage) > -1,'Same as expected message');
									wait.waitForElement('small a[href="/categories"]', casper, function(err, isExist) {
										if(isExist) {
											casper.click('small a[href="/categories"]');
											return null;
										} else {
											casper.echo('Categories not found','INFO')
										}
									});
								} else {
									casper.test.assert(ActualMessage.indexOf(json['validEmailid'].ExpectedMessage) > -1);
									casper.capture(screenShotsDir+"Error_validEmailid.png");
								}
							});
						}
					});
				});
			}
		});
	});
};

//method to test the Reset Password using InValid Username functionality --Test case 3

forgotPasswordTestcases.resetPasswordUsingInvalidUsername = function() {
	var screenShotsDir = config.screenShotsLocation + "forgotPassword/";
	var ActualMessage="";
	// this code is to launch application to perform related actions
	casper.then(function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else { 
				casper.echo("Forgot password page is navigated",'INFO');
				casper.then(function() {
					forgotPasswordMethod.forgotPassword(json['InvalidUsername'].username, json['InvalidUsername'].email, casper, function(err) {
						if (!err) {
							//This is to verify success message after submitting request for reset password with invalid username
							wait.waitForElement("div.alert.alert-danger", casper, function(err, isExist) {
								if(isExist) { 
									ActualMessage = casper.fetchText('div.alert.alert-danger');
									casper.echo("Actual error message is --> "+ActualMessage.trim(), 'INFO');
									casper.capture(screenShotsDir+"invalidUsername.png");			
									casper.test.assert(ActualMessage.indexOf(json['InvalidUsername'].ExpectedMessage) > -1,'Same as expected message');	
									casper.echo("Error message in case of invalid username has been verified",'INFO');
									return null;
								} else {
									casper.echo("Error Occurred", "ERROR");
									casper.capture(screenShotsDir+"Error_invalidUsername.png");
								}
							});
						}
					});
				});
			}
		});
	});
};

//method to test the Reset Password using InValid Email id functionality --Test case 4
forgotPasswordTestcases.resetPasswordUsingInvalidEmailid = function() {
	var screenShotsDir = config.screenShotsLocation + "forgotPassword/";
	var ActualMessage="";
	// this code is to launch application to perform related actions
	casper.then(function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else { 
				casper.echo("Forgot password page is navigated",'INFO');
				casper.then(function() {
					forgotPasswordMethod.forgotPassword(json['InvalidEmailid'].username, json['InvalidEmailid'].email, casper, function(err) {
						if (!err) {
							//This is to verify success message after submitting request for reset password with invalid Email
							wait.waitForElement("div.alert.alert-danger", casper, function(err, isExist) {
								if(isExist) { 
									ActualMessage = casper.fetchText('div.alert.alert-danger');
									casper.echo("Actual error message is --> "+ActualMessage.trim(), 'INFO');
									casper.capture(screenShotsDir+"invalidEmail.png");			
									casper.test.assert(ActualMessage.indexOf(json['InvalidEmailid'].ExpectedMessage) > -1,'Same as expected message');	
									casper.echo("Error message in case of invalid username has been verified",'INFO');
									return null;
								} else {
									casper.echo("Error Occurred", "ERROR");
									casper.capture(screenShotsDir+"Error_invalidEmailid.png");
								}
							});
						}
					});
				});
			}
		});
	});
};

//method to test the Reset Password by leaving blank Username and Email textfield both functionality --Test case 5
forgotPasswordTestcases.resetPasswordUsingBlankUsernameandEmail = function() {
	var screenShotsDir = config.screenShotsLocation + "forgotPassword/";
	var ActualMessage="";
	// this code is to launch application to perform related actions
	casper.then(function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else { 
				casper.echo("Forgot password page is navigated",'INFO');
				casper.then(function() {
					forgotPasswordMethod.forgotPassword(json['BlankUsernameAndEmail'].username, json['BlankUsernameAndEmail'].email, casper, function(err) {
						if (!err) {
							//This is to verify success message after submitting request for reset password by leaving blank Username and Email textfield both
							wait.waitForElement('form[name="lost_pw_form"] input[name="member"]', casper, function(err, isExist) {
								if(isExist) { 
									ActualMessage = casper.getElementAttribute('form[name="lost_pw_form"] input[name="member"]', 'data-original-title');	
									casper.echo("Actual error in tooltip --> "+ActualMessage.trim(),'INFO');
									//casper.capture(screenShotsDir+"BlankData.png");			
									casper.test.assert(ActualMessage.indexOf(json['BlankUsernameAndEmail'].ExpectedMessage) > -1,'Same as expected message');
									casper.echo("Error message is verified while submit request with blank username and email",'INFO');
									return null;
								} else {
									casper.echo("Error Occurred", "ERROR");
									casper.capture(screenShotsDir+"Error_BlankData.png");
								}
							});
							casper.capture(screenShotsDir+"BlankData.png");
						}
					});
				});
			}
		});
	});
};

//method to test the Reset Password with valid username and valid Email id with mismatched condition functionality --Test case 6
forgotPasswordTestcases.resetPasswordUsingValidUsernameandEmailid = function() {
	var screenShotsDir = config.screenShotsLocation + "forgotPassword/";
	var ActualMessage="";
	// this code is to launch application to perform related actions
	casper.then(function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else { 
				casper.echo("Forgot password page is navigated",'INFO');
				casper.then(function() {
					forgotPasswordMethod.forgotPassword(json['ValidUsernameAndEmail'].username, json['ValidUsernameAndEmail'].email, casper, function(err) {
						if (!err) {
							//This is to verify success message after submitting request for reset password with valid Username and Email id
							wait.waitForElement("div.text-center.bmessage", casper, function(err, isExist) {
								if(isExist) {
									ActualMessage = casper.fetchText('div.text-center.bmessage');
									var ActualMessage1 = casper.fetchText('div.text-center small');
									ActualMessage = ActualMessage.replace(ActualMessage1, "");
									casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
									casper.capture(screenShotsDir+"validUsernameandEmail.png");
									casper.test.assert(ActualMessage.indexOf(json['ValidUsernameAndEmail'].ExpectedMessage) > -1,'Same as expected message');
									wait.waitForElement('small a[href="/categories"]', casper, function(err, isExist) {
										if(isExist) {
											casper.click('small a[href="/categories"]');
											return null;
										} else {
											casper.echo('Categories not found','INFO')
										}
									});
								} else {
									casper.test.assert(ActualMessage.indexOf(json['ValidUsernameAndEmail'].ExpectedMessage) > -1);
									casper.capture(screenShotsDir+"Error_validUsernameandEmailid.png");
								}
							});
						}
					});
				});
			}
		});
	});
};

//method to test the Reset Password with Invalid username and valid Email id functionality--Test case 7
forgotPasswordTestcases.resetPasswordUsingInvalidUsernameandValidEmailid = function() {
	var screenShotsDir = config.screenShotsLocation + "forgotPassword/";
	var ActualMessage="";
	// this code is to launch application to perform related actions
	casper.then(function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else { 
				casper.echo("Forgot password page is navigated",'INFO');
				casper.then(function() {
					forgotPasswordMethod.forgotPassword(json['invalidUsernameAndValidEmail'].username, json['invalidUsernameAndValidEmail'].email, casper, function(err) {
						if (!err) {
							//This is to verify success message after submitting request for reset password with invalid Username and valid Email id
							wait.waitForElement("div.text-center.bmessage", casper, function(err, isExist) {
								if(isExist) {
									ActualMessage = casper.fetchText('div.text-center.bmessage');
									var ActualMessage1 = casper.fetchText('div.text-center small');
									ActualMessage = ActualMessage.replace(ActualMessage1, "");
									casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
									casper.capture(screenShotsDir+"invalidUsernameAndValidEmail.png");
									casper.test.assert(ActualMessage.indexOf(json['invalidUsernameAndValidEmail'].ExpectedMessage) > -1,'Same as expected message');
									wait.waitForElement('small a[href="/categories"]', casper, function(err, isExist) {
										if(isExist) {
											casper.click('small a[href="/categories"]');
											return null;
										} else {
											casper.echo('Categories not found','INFO')
										}
									});
								} else {
									casper.test.assert(ActualMessage.indexOf(json['invalidUsernameAndValidEmail'].ExpectedMessage) > -1);
									casper.capture(screenShotsDir+"Error_invalidUsernameAndValidEmail.png");
								}
							});
						}
					});
				});
			}
		});
	});
};

//method to test the Reset Password with valid username and Invalid Email id functionality --Test case 8
forgotPasswordTestcases.resetPasswordUsingValidUsernameandInvalidEmailid = function() {
	var screenShotsDir = config.screenShotsLocation + "forgotPassword/";
	var ActualMessage="";
	// this code is to launch application to perform related actions
	casper.then(function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else { 
				casper.echo("Forgot password page is navigated",'INFO');
				casper.then(function() {
					forgotPasswordMethod.forgotPassword(json['validUsernameAndInvalidEmail'].username, json['validUsernameAndInvalidEmail'].email, casper, function(err) {
						if (!err) {
							//This is to verify success message after submitting request for reset password with valid Username and invalid Email id
							wait.waitForElement("div.text-center.bmessage", casper, function(err, isExist) {
								if(isExist) {
									ActualMessage = casper.fetchText('div.text-center.bmessage');
									var ActualMessage1 = casper.fetchText('div.text-center small');
									ActualMessage = ActualMessage.replace(ActualMessage1, "");
									casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
									casper.capture(screenShotsDir+"validUsernameAndInvalidEmail.png");
									casper.test.assert(ActualMessage.indexOf(json['validUsernameAndInvalidEmail'].ExpectedMessage) > -1,'Same as expected message');
									wait.waitForElement('small a[href="/categories"]', casper, function(err, isExist) {
										if(isExist) {
											casper.click('small a[href="/categories"]');
											return null;
										} else {
											casper.echo('Categories not found','INFO')
										}
									});
								} else {
									casper.test.assert(ActualMessage.indexOf(json['validUsernameAndInvalidEmail'].ExpectedMessage) > -1);
									casper.capture(screenShotsDir+"Error_validUsernameAndInvalidEmail.png");
								}
							});
						}
					});
				});
			}
		});
	});
};

