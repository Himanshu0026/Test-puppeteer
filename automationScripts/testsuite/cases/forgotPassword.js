/***These are the function which has been called in forgotPassword.js and also will be used in other js file as per requirement**********/

'use strict';
var json = require('../../testdata/forgotpasswordData.json');
var config = require('../../../config/config.json');
var  forgotPasswordMethod = require('../methods/forgotPassword.js');
var wait = require('../wait.js');
var forgotPasswordTestcases = module.exports = {};
var ActualMessage="";
var count = 1;
var failedScreenshotsLocation = config.failedScreenShotsLocation+'forgotPassword/';
 
//Method To capture Screenshots If Any Test Case Failed
casper.test.on('fail', function(failure) {
	casper.capture(failedScreenshotsLocation+'forgotPasswordCasesError'+count+'.png');
	count++;
});

//method to test the Reset password with valid username functionality --Test case 1
forgotPasswordTestcases.validUsername = function() {
	
	// this code is to launch application to perform related actions
	forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
		if (!err) { 
			casper.echo("Forgot password page is navigated",'INFO');
			wait.waitForElement('form[name="lost_pw_form"]', casper, function(err, isExists) {
				if(isExists) {
					forgotPasswordMethod.forgotPassword(json['validUserName'].username, json['validUserName'].email, casper, function(err) {
						if (!err) {
							//This is to verify success message after submitting request for reset password with valid username
							wait.waitForElement("div.text-center.bmessage", casper, function(err, isExists) {
								if(isExists) {
									ActualMessage = casper.fetchText('div.text-center.bmessage');
									casper.echo("Actual success message is --> "+ActualMessage,'INFO');
									casper.test.assert(ActualMessage.indexOf(json['validUserName'].ExpectedMessage) > -1,'Same as expected message');
									
									wait.waitForElement('small a[href="/categories"]', casper, function(err, isExists) {
										if(isExists) {
											casper.click('small a[href="/categories"]');
										} else {
											casper.echo('Categories not found','INFO');
										}
									});
								} else {
									casper.test.assert(ActualMessage.indexOf(json['validUserName'].ExpectedMessage) > -1);
								}
							});
						}
					});
				} else {
					casper.echo('lost_pw_form form not found','INFO');
				}
			});
		}
	});
};


//method to test the Reset Password using Valid Email id functionality --Test case 2
forgotPasswordTestcases.validEmail = function() {
	// this code is to launch application to perform related actions
	casper.thenOpen(config.url, function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (!err) {
				casper.echo("Forgot password page is navigated",'INFO');
				wait.waitForElement('form[name="lost_pw_form"]', casper, function(err, isExists) {
					if(isExists) {
						forgotPasswordMethod.forgotPassword(json['validEmailid'].username, json['validEmailid'].email, casper, function(err) {
							if (!err) {
								//This is to verify success message after submitting request for reset password with valid Email id
								wait.waitForElement("div.text-center.bmessage", casper, function(err, isExists) {
									if(isExists) {
										ActualMessage = casper.fetchText('div.text-center.bmessage');
										casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
										casper.test.assert(ActualMessage.indexOf(json['validEmailid'].ExpectedMessage) > -1,'Same as expected message');
										wait.waitForElement('small a[href="/categories"]', casper, function(err, isExists) {
											if(isExists) {
												casper.click('small a[href="/categories"]');
											} else {
												casper.echo('Categories not found','INFO');
											}
										});
									} else {
										casper.test.assert(ActualMessage.indexOf(json['validEmailid'].ExpectedMessage) > -1);
									}
								});
							}
						});
					} else {
						casper.echo('lost_pw_form form not found','INFO');
					}
				});
			}
		});
	});
};


//method to test the Reset Password using InValid Username functionality --Test case 3
forgotPasswordTestcases.invalidUsername = function() {
	// this code is to launch application to perform related actions
	casper.thenOpen(config.url, function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (!err) { 
				casper.echo("Forgot password page is navigated",'INFO');
				wait.waitForElement('form[name="lost_pw_form"]', casper, function(err, isExists) {
					if(isExists) {
						forgotPasswordMethod.forgotPassword(json['InvalidUsername'].username, json['InvalidUsername'].email, casper, function(err) {
							if (!err) {
								//This is to verify success message after submitting request for reset password with invalid username
								wait.waitForElement("div.alert.alert-danger", casper, function(err, isExists) {
									if(isExists) { 
										ActualMessage = casper.fetchText('div.alert.alert-danger');
										casper.echo("Actual error message is --> "+ActualMessage.trim(), 'INFO');
										casper.test.assert(ActualMessage.indexOf(json['InvalidUsername'].ExpectedMessage) > -1,'Same as expected message');	
										casper.echo("Error message in case of invalid username has been verified",'INFO');
										casper.click('input#cancelPassword');
									} else {
										casper.echo("Error Occurred", "ERROR");
									}
								});
							}
						});
					} else {
						casper.echo('lost_pw_form form not found','INFO');
					}
				});
			}
		});
	});
};


//method to test the Reset Password using InValid Email id functionality --Test case 4
forgotPasswordTestcases.invalidEmail = function() {
	// this code is to launch application to perform related actions
	casper.thenOpen(config.url, function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (!err) {
				casper.echo("Forgot password page is navigated",'INFO');
				wait.waitForElement('form[name="lost_pw_form"]', casper, function(err, isExists) {
					if(isExists) {
						forgotPasswordMethod.forgotPassword(json['InvalidEmailid'].username, json['InvalidEmailid'].email, casper, function(err) {
							if (!err) {
								//This is to verify success message after submitting request for reset password with invalid Email
								wait.waitForElement("div.alert.alert-danger", casper, function(err, isExists) {
									if(isExists) { 
										ActualMessage = casper.fetchText('div.alert.alert-danger');
										casper.echo("Actual error message is --> "+ActualMessage.trim(), 'INFO');
										casper.test.assert(ActualMessage.indexOf(json['InvalidEmailid'].ExpectedMessage) > -1,'Same as expected message');	
										casper.echo("Error message in case of invalid username has been verified",'INFO');
									} else {
										casper.echo("Error Occurred", "ERROR");
									}
								});
							}
						});
					} else {
						casper.echo('lost_pw_form form not found','INFO');
					}
				});
			}
		});
	});
};


//method to test the Reset Password by leaving blank Username and Email textfield both functionality --Test case 5
forgotPasswordTestcases.blankUsernameAndEmail = function() {
	// this code is to launch application to perform related actions
	casper.thenOpen(config.url, function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (!err) {
				casper.echo("Forgot password page is navigated",'INFO');
				wait.waitForElement('form[name="lost_pw_form"]', casper, function(err, isExists) {
					if(isExists) {
						forgotPasswordMethod.forgotPassword(json['BlankUsernameAndEmail'].username, json['BlankUsernameAndEmail'].email, casper, function(err) {
							if (!err) {
								//This is to verify success message after submitting request for reset password by leaving blank Username and Email textfield both
								wait.waitForElement('form[name="lost_pw_form"] input[name="member"]', casper, function(err, isExists) {
									if(isExists) { 
										ActualMessage = casper.getElementAttribute('form[name="lost_pw_form"] input[name="member"]', 'data-original-title');	
										casper.echo("Actual error in tooltip --> "+ActualMessage.trim(),'INFO');
										casper.test.assert(ActualMessage.indexOf(json['BlankUsernameAndEmail'].ExpectedMessage) > -1,'Same as expected message');
										casper.echo("Error message is verified while submit request with blank username and email",'INFO');
									} else {
										casper.echo("Error Occurred", "ERROR");
									}
								});
							}
						});
					} else {
						casper.echo('lost_pw_form form not found','INFO');
					}
				});
			}
		});
	});
};


//method to test the Reset Password with valid username and valid Email id with mismatched condition functionality --Test case 6
forgotPasswordTestcases.validUsernameAndEmail = function() {
	// this code is to launch application to perform related actions
	casper.thenOpen(config.url, function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (!err) { 
				casper.echo("Forgot password page is navigated",'INFO');
				wait.waitForElement('form[name="lost_pw_form"]', casper, function(err, isExists) {
					if(isExists) {
						forgotPasswordMethod.forgotPassword(json['ValidUsernameAndEmail'].username, json['ValidUsernameAndEmail'].email, casper, function(err) {
							if (!err) {
								//This is to verify success message after submitting request for reset password with valid Username and Email id
								wait.waitForElement("div.text-center.bmessage", casper, function(err, isExists) {
									if(isExists) {
										ActualMessage = casper.fetchText('div.text-center.bmessage');
										casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
										casper.test.assert(ActualMessage.indexOf(json['ValidUsernameAndEmail'].ExpectedMessage) > -1,'Same as expected message');
										wait.waitForElement('small a[href="/categories"]', casper, function(err, isExists) {
											if(isExists) {
												casper.click('small a[href="/categories"]');
											} else {
												casper.echo('Categories not found','INFO');
											}
										});
									} else {
										casper.test.assert(ActualMessage.indexOf(json['ValidUsernameAndEmail'].ExpectedMessage) > -1);
									}
								});
							}
						});
					} else {
						casper.echo('lost_pw_form form not found','INFO');
					}
				});
			}
		});
	});
};


//method to test the Reset Password with Invalid username and valid Email id functionality--Test case 7
forgotPasswordTestcases.invalidUsernameAndValidEmail = function() {
	// this code is to launch application to perform related actions
	casper.thenOpen(config.url, function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (!err) {
				casper.echo("Forgot password page is navigated",'INFO');
				wait.waitForElement('form[name="lost_pw_form"]', casper, function(err, isExists) {
					if(isExists) {
						forgotPasswordMethod.forgotPassword(json['invalidUsernameAndValidEmail'].username, json['invalidUsernameAndValidEmail'].email, casper, function(err) {
							if (!err) {
								//This is to verify success message after submitting request for reset password with invalid Username and valid Email id
								wait.waitForElement("div.text-center.bmessage", casper, function(err, isExists) {
									if(isExists) {
										ActualMessage = casper.fetchText('div.text-center.bmessage');
										casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
										casper.test.assert(ActualMessage.indexOf(json['invalidUsernameAndValidEmail'].ExpectedMessage) > -1,'Same as expected message');
										wait.waitForElement('small a[href="/categories"]', casper, function(err, isExists) {
											if(isExists) {
												casper.click('small a[href="/categories"]');
											} else {
												casper.echo('Categories not found','INFO');
											}
										});
									} else {
										casper.test.assert(ActualMessage.indexOf(json['invalidUsernameAndValidEmail'].ExpectedMessage) > -1);
									}
								});
							}
						});
					} else {
						casper.echo('lost_pw_form form not found','INFO');
					}
				});
			}
		});
	});
};


//method to test the Reset Password with valid username and Invalid Email id functionality --Test case 8
forgotPasswordTestcases.validUsernameAndInvalidEmail = function() {
	// this code is to launch application to perform related actions
	casper.thenOpen(config.url, function() {
		forgotPasswordMethod.gotoForgotPasswordpage(casper, function(err) {
			if (!err) {
				casper.echo("Forgot password page is navigated",'INFO');
				wait.waitForElement('form[name="lost_pw_form"]', casper, function(err, isExists) {
					if(isExists) {
						forgotPasswordMethod.forgotPassword(json['validUsernameAndInvalidEmail'].username, json['validUsernameAndInvalidEmail'].email, casper, function(err) {
							if (!err) {
								//This is to verify success message after submitting request for reset password with valid Username and invalid Email id
								wait.waitForElement("div.text-center.bmessage", casper, function(err, isExists) {
									if(isExists) {
										ActualMessage = casper.fetchText('div.text-center.bmessage');
										casper.echo("Actual success message is --> "+ActualMessage.trim(),'INFO');
										casper.test.assert(ActualMessage.indexOf(json['validUsernameAndInvalidEmail'].ExpectedMessage) > -1,'Same as expected message');
										wait.waitForElement('small a[href="/categories"]', casper, function(err, isExists) {
											if(isExists) {
												casper.click('small a[href="/categories"]');
											} else {
												casper.echo('Categories not found','INFO');
											}
										});
									} else {
										casper.test.assert(ActualMessage.indexOf(json['validUsernameAndInvalidEmail'].ExpectedMessage) > -1);
									}
								});
							}
						});
					} else {
						casper.echo('lost_pw_form form not found','INFO');
					}
				});
			}
		});
	});
};

