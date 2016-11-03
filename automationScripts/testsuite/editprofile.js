/****This script is dedicated for editing user's profile and account setting on the forum. It covers testing of edit user's profile and account setting page with all defined validations****/
'use strict';
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var json = require('../testdata/editData.json');
var config = require('../../config/config.json');

var editProfile = module.exports = {};
editProfile.errors = [];
var screenShotsDir = config.screenShotsLocation + 'editProfile/';
/**************************All Fields Required Validation****************************/

editProfile.featureTest = function(casper, test) {

	casper.start();
	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified', 'INFO');
	});
	
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		editProfile.errors.push(msg);
	});
	
	//Login To Forum BackEnd
	casper.then(function() {
		editProfile.removeShortAnswerFields(casper, casper.test, function(err) {
		});
		
	});
	
	//Open Forum URL And Register A user And Move To Edit Profile Page 
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.loginData, casper, function(err) {
							if(!err) {
								casper.echo('user registered successfully', 'INFO');
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									forumLogin.loginToApp(json.loginData.uname, json.loginData.upass, casper, function(err) {
										if(!err) {
											casper.echo('User logged-in successfully', 'INFO');
											casper.waitForSelector('.default-user', function() {
												this.click('.default-user');
												this.echo('clicked on users icon successfully', 'INFO');
												this.click('a[href^="/register/register?edit="]');
												this.echo('clicked on user edit profile link successfully', 'INFO');
											}, function fail() {
										
											});
										}else {
											casper.echo('Error : '+err, 'INFO');
										}
									});
								}, function fail() {
									casper.thenOpen(config.url, function() {
										this.echo('Title of the page : ' +this.getTitle(), 'INFO');
										forumRegister.redirectToLogout(casper, test, function(err) {
											casper.waitForSelector('a[href^="/register/login"]', function success() {
												forumLogin.loginToApp(json.loginData.uname, json.loginData.upass, casper, function(err) {
													if(!err) {
														casper.echo('User logged-in successfully', 'INFO');
														casper.waitForSelector('.default-user', function() {
															this.click('.default-user');
															this.echo('clicked on users icon successfully', 'INFO');
															this.click('a[href^="/register/register?edit="]');
															this.echo('clicked on user edit profile link successfully', 'INFO');
															casper.waitForSelector('form[action="/register"]', function success() {
															}, function fail() {
															
															});
														}, function fail() {
										
														});
													}else {
														casper.echo('Error : '+err, 'INFO');
													}
												});								
											});
										});
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});
					}, function fail() {
					
					});
				}, function fail() {
				
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Fill Blank/Invalid Data On Edit Profile Page And Verifying Errors
	casper.then(function() {
		this.eachThen(json['invalidDataForEditProfile'], function(response) {
			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			editToProfile(responseData, casper, function(err) {
				if(!err) {
					var errorMessage = '';
					var msgTitle = '';
					if (responseData.expectedErrorMsg)
						var expectedErrorMsg = responseData.expectedErrorMsg;
					if (responseData.imID == '') {
						errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
						msgTitle = 'BlankScreenName';
					} else if (responseData.birthday == '') {
						errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
						msgTitle = 'BlankBirthDay';
					} 
					//Called Method For Verifying Error Messages
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper, function(err) {});
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});

	//Edit Valid Data On User's Edit Profile Page
	casper.then(function() {
		editToProfile(json.validDataForEditProfile, casper, function(err){
			if(!err) {
				casper.waitForSelector('#moderator-panel div[role="alert"]', function success() {
					var successMessage = this.fetchText('#moderator-panel div[role="alert"]');
					var expectedSuccessMsg = json.validDataForEditProfile.expectedSuccessMsg;
					this.echo('Actual Success Message : '+successMessage.trim(), 'INFO');
					this.echo('Ecpected Success Message : '+json.validDataForEditProfile.expectedSuccessMsg, 'INFO');
					if((successMessage == expectedSuccessMsg) || (successMessage.indexOf(expectedSuccessMsg) > -1)) {
						casper.echo('Success message is verified when user try to edit with valid data', 'INFO');
					} else {
						casper.echo("Success Message Is Not Correct", 'ERROR');
					}
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Clicking On User's 'Account Settings' link For Editing User's Account Setting
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register?action=preferences&userid="]');
			this.click('a[href^="/register?action=preferences&userid="]');
			this.echo('clicked on users account settings link successfully', 'INFO');
		} catch (e) {
			test.assertDoesntExist('a[href^="/register?action=preferences&userid="]');
		}
	});

	//Fill Blank/Invalid Data On Account Setting Page And Verifying Errors
	casper.then(function() {
		this.eachThen(json['invalidDataForAccount'], function(response) {
			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			editAccountSetting(responseData, casper, function(err) {
				if(!err) {
					var errorMessage = '';
					var msgTitle = '';
					var expectedErrorMsg = '';
					if (responseData.expectedErrorMsg)
						expectedErrorMsg = responseData.expectedErrorMsg;
					if (responseData.new_username == '') {
						errorMessage = casper.fetchText('div.editable-error-block.help-block');
						msgTitle = 'BlankUserName';
					}else if (responseData.upass == '') {
						errorMessage = casper.fetchText('div.editable-error-block.help-block');
						msgTitle = 'BlankPassword';
					} else if (responseData.email == '') {
						errorMessage = casper.fetchText('div.editable-error-block.help-block');
						msgTitle = 'BlankEmail';
					} else if (responseData.email == 'xxxxxxxxxx') {
						errorMessage = casper.fetchText('div.editable-error-block.help-block');
						msgTitle = 'InvalidEmail';
					} 

					//Called Method For Verifying Error Messages
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper, function() {});
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});

	//Editing user's Account Setting With Valid Data	
	casper.then(function() {
		editAccountSetting(json.validDataForEditAccount, casper, function(err) {
			if(!err) {
				casper.waitForSelector('div.alert.alert-success.text-center', function success() {
					var successMessage = this.fetchText('div.alert.alert-success.text-center');
					if(successMessage && successMessage != '' )
						verifySuccessMsg(successMessage, json.validDataForEditAccount.expectedSuccessMsg, 'validAccountSetting', casper, function() {
							casper.echo('account setting updated successfully', 'INFO');
						});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
			
		});
	});
};

/**************************Back-end  Field Validation********************************/

editProfile.customFieldsTest = function(casper, test) {

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified', 'INFO');
	});
	
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		editProfile.errors.push(msg);
	});
	
	casper.start();

	//Open Front_end URL and Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
		
	});

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			test.assertExists('a[href="/tool/members/login?action=logout"]');
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum BackEnd
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				disableUserNameForRegisteredUser(casper, casper.test, function(err) {
					casper.echo('permission changed for registered user', 'INFO');
				});
			}, function fail() {
				casper.echo('ERROR OCCURRED', 'ERROR');
			});
		});
		
	});
	
	//Open Front End URL And Move to Account Setting Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('a.default-user ', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('a.default-user ');
								casper.waitForSelector('span li a[href^="/register?action=preferences"]', function success() {
									this.click('span li a[href^="/register?action=preferences"]');
									casper.waitForSelector('form.form-horizontal', function success() {
										try {
											test.assertExists('div#usrName .change-value');
										}catch(e) {
											test.assertDoesntExist('div#usrName .change-value');
										} 
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});				
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Front End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form.form-horizontal', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
			
		});
	});

	//Open Forum Backend URL And Get Title 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			test.assertExists('a[href="/tool/members/login?action=logout"]');
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permission From back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					disableEditOwnProfileForRegisteredUser(casper, casper.test, function(err) {
						casper.echo('permission changed for registered user', 'INFO');
			
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Front End URL and Regsiter A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form.form-horizontal', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Forum Backend URL And Get Title 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permissions From back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					disableInvisibleModeForRegisteredUser(casper, casper.test, function(err) {
						casper.echo('permission changed for registered user', 'INFO');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Front End URL And Move To Account Setting page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			casper.waitForSelector('a#td_tab_login', function success() {
				forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
					if(!err) {
						casper.waitForSelector('a.default-user ', function success() {
							casper.echo('User logged-in successfully', 'INFO');
							this.click('a.default-user ');
							this.click('span li a[href^="/register?action=preferences"]');
							casper.waitForSelector('form.form-horizontal', function() {
								try {
									test.assertExists('#INVS');
								}catch(e) {
									test.assertDoesntExist('#INVS');
								}			
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			}, function fail() {
				casper.echo('ERROR OCCURRED', 'ERROR');
			});
		});
	});

	//Open Front End URL And Register A user
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form.form-horizontal', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//Open Forum Backend URL And Get Title 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permissions From Back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.waitForSelector('div#my_account_forum_menu', function success() {
				disableCustomUserTitleForRegisteredUser(casper, casper.test, function(err) {
					casper.echo('permission changed for registered user', 'INFO');
			
				});
			}, function fail() {
				casper.echo('ERROR OCCURRED', 'ERROR');
			});		
		});
	});

	//Open Front End URL And Move To Edit Profile Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			casper.waitForSelector('a#td_tab_login', function success() {
				forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
					if(!err) {
						casper.waitForSelector('a.default-user', function success() {
							casper.echo('User logged-in successfully', 'INFO');
							this.click('a.default-user ');
							this.click('span li a[href^="/register/register?edit"]');
							casper.waitForSelector('div#custom_user_title .form-text.align-top.editable.editable-click', function success() {
								try {
									test.assertExists('div#custom_user_title .form-text.align-top.editable.editable-click');
								}catch(e) {
									test.assertDoesntExist('div#custom_user_title .form-text.align-top.editable.editable-click');
								}			
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			}, function fail() {
				casper.echo('ERROR OCCURRED', 'ERROR');
			});
		});
	});
};

/**************************Back-end Full Name Field Validation ********************************/

editProfile.fullNameFieldsTest = function(casper, test) {

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified', 'INFO');
	});
	
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		editProfile.errors.push(msg);
	});
	
	casper.start();
	//Set Different Value For 'Full Name' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.echo('/*************************VERIFYING ALL CASES OF FULL NAME********************', 'INFO');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			casper.thenOpen(config.backEndUrl, function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
				try {
					this.click('a[href="/tool/members/login?action=logout"]');
				}catch(e) {
					test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
				}
			});
			casper.then(function() {
				forumRegister.loginToForumBackEnd(casper, test, function(err) {
					if(!err) {
						casper.waitForSelector('div#my_account_forum_menu', function success() {
							this.echo('Logged-in successfully from back-end', 'INFO');
							test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
							this.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
							casper.waitForSelector('form[name="posts"]', function success() {
								try {
									this.fillSelectors('form[name="posts"]', {
										'select[name="required_name"]' :  responseData.required,
										'select[name="visiblity_name"]' :  responseData.visibility
									}, false);
									test.assertExists('form[name="posts"] button');
									this.click('form[name="posts"] button');
									casper.waitForSelector('font[color="red"]', function success() {
										var successMessage = this.fetchText('font[color="red"]').trim();
										if(successMessage && successMessage != '' )
											verifySuccessMsg(successMessage, 'Your profile fields have been updated.', 'DefaultRegistrationOptions', casper, function() {});
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('form[name="posts"] button');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			}); 
			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			casper.thenOpen(config.url, function() {
				this.echo('Title of the page : ' +this.getTitle(), 'INFO');
				forumRegister.redirectToLogout(casper, test, function(err) {
					if(!err) {
						casper.waitForSelector('a[href^="/register/register"]', function success() {
							loginToFrontEnd(casper, function(err) {
								if(!err) {
									casper.waitForSelector('form.form-horizontal', function success() {
										casper.echo('loaded edit profile page', 'INFO');	
										if (responseData.visibility == '1') {
											try {
												test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
											}catch(e) {
												test.assertExists('form[name="PostTopic"] input[name="name"]');
												casper.echo('Full Name Field Is Enabled From Back-End', 'ERROR');
											}
										} else {
											try {
												test.assertExists('form[name="PostTopic"] input[name="name"]');
												if (responseData.required == '1') {
													editToProfile(json.blankFullnameData, casper, function(err) {
														if(!err) {
															try {
																test.assertExists('#moderator-panel div[role="alert"]');
																var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
																if(successMessage && successMessage != "") {
																	verifySuccessMsg(successMessage, 'Your settings have been updated.', 'blankFullNameWithRequired', 	casper, function() {
																	});
																}
															}catch(e) {
																test.assertDoesntExist('#moderator-panel div[role="alert"]');
															}
														}else {
															casper.echo('Error : '+err, 'INFO');
														}
													});
												} else {
													editToProfile(json.fullnameData, casper, function(err) {
														if(!err) {
															try {
																test.assertExists('#moderator-panel div[role="alert"]');
																var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
																if(successMessage && successMessage != "") {
																	verifySuccessMsg(successMessage, 'Your settings have been updated.', 'fullNameWithRequired', 		casper, function() {});
																}
															}catch(e) {
																test.assertDoesntExist('#moderator-panel div[role="alert"]');
															}
														}else {
															casper.echo('Error : '+err, 'INFO');
														}
													});
												}
											}catch(e) {
												test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
												casper.echo('Full Name Field Is Disabled From Back-End', 'ERROR');
											}
										}
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}else {
									casper.echo('Error : '+err, 'INFO');
								}
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {

					} 
				});
			});
		});
	});
};

/**************************Back-end Instant Message Field Validation ********************************/

editProfile.instantMsgFieldsTest = function(casper, test) {

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified', 'INFO');
	});
	
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		editProfile.errors.push(msg);
	});
	
	casper.start();
	//Set Different Value For 'Instant Messaging' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.echo('/*************************VERIFYING ALL CASES OF INSTANT MESSAGING********************', 'INFO');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			casper.thenOpen(config.backEndUrl, function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
				try {
					this.click('a[href="/tool/members/login?action=logout"]');
				}catch(e) {
					test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
				}
			});
			casper.then(function() {
				forumRegister.loginToForumBackEnd(casper, test, function(err) {
					if(!err) {
						casper.waitForSelector('div#my_account_forum_menu', function success() {
							this.echo('Logged-in successfully from back-end', 'INFO');
							test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
							this.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
							casper.waitForSelector('form[name="posts"]', function success() {
								try {
									this.fillSelectors('form[name="posts"]', {
										'select[name="required_imType"]' :  responseData.required,
										'select[name="visiblity_imType"]' :  responseData.visibility
									}, false);
									test.assertExists('form[name="posts"] button');
									this.click('form[name="posts"] button');
									casper.waitForSelector('font[color="red"]', function success() {
										var successMessage = this.fetchText('font[color="red"]').trim();
										if(successMessage && successMessage != '' )
											verifySuccessMsg(successMessage, 'Your profile fields have been updated.', 'DefaultRegistrationOptions', casper, function() {});
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('form[name="posts"] button');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});  

			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			casper.thenOpen(config.url, function() {
				this.echo('Title of the page : ' +this.getTitle(), 'INFO');
				forumRegister.redirectToLogout(casper, test, function(err) {
					if(!err) {
						casper.waitForSelector('a[href^="/register/register"]', function success() {
							loginToFrontEnd(casper, function(err) {
								if(!err) {
									casper.waitForSelector('form.form-horizontal', function success() {
										casper.echo('loaded edit profile page', 'INFO');	
										if (responseData.visibility == '1') {
											try {
												test.assertDoesntExist('form[name="PostTopic"] input[name="imType"]');
											}catch(e) {
												test.assertExists('form[name="PostTopic"] input[name="imType"]');
												casper.echo('Instant Messaging Field Is Enabled From Back-End', 'ERROR');
											}
										} else {
											try {
												test.assertExists('form[name="PostTopic"] input[name="imID"]');
												casper.fillSelectors('form[name="PostTopic"]', {
													'select[name="imType"]' :  'Google'
												}, false);
												if (responseData.required == '1') {
													editToProfile(json['imIdBlankData'], casper, function(err) {
														if(!err) {
															var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
															if(errorMsg && errorMsg!= '')
																verifyErrorMsg(errorMsg, "Please enter your screen name.", 'blankImIDWithRequired', casper, function() {});
														}else {
															casper.echo('Error : '+err, 'INFO');
														}
													});
												} else {
													editToProfile(json['imIdBlankData'], casper, function(err) {
														if(!err) {
															var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
															if(errorMsg && errorMsg!= '')
																verifyErrorMsg(errorMsg, 'Please enter your screen name.', 'BlankIM_ID', casper, function() {});
															casper.echo('Processing to registration on forum.....', 'INFO');
														}else {
															casper.echo('Error : '+err, 'INFO');
														}
													});
													editToProfile(json['imIdData'], casper, function(err) {
														if(!err) {
															try {
																test.assertExists('#moderator-panel div[role="alert"]');
																var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
																if(successMessage && successMessage != "") {
																	verifySuccessMsg(successMessage, 'Your settings have been updated.', 'successIM_ID', casper, function() {
																	});
																}
															}catch(e) {
																test.assertDoesntExist('#moderator-panel div[role="alert"]');
															}
														}else {
															casper.echo('Error : '+err, 'INFO');
														}
													});
												}
											}catch(e) {
												test.assertDoesntExist('form[name="PostTopic"] input[name="imID"]');
												casper.echo('Instant Messaging Field Is Disabled From Back-End', 'ERROR');
											}
										}
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}else {
									casper.echo('Error : '+err, 'INFO');
								}
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {

					}
				});
			});
		});
	});
};

/**************************Back-end Birthday Field Validation ********************************/

editProfile.birthdayFieldsTest = function(casper, test) {

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified', 'INFO');
	});
	
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		editProfile.errors.push(msg);
	});
	
	casper.start();
	//Set Different Value For 'Birthday' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.echo('/*************************VERIFYING ALL CASES OF BIRTH DAY********************', 'INFO');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			casper.thenOpen(config.backEndUrl, function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
				try {
					this.click('a[href="/tool/members/login?action=logout"]');
				}catch(e) {
					test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
				}
			});
			casper.then(function() {
				forumRegister.loginToForumBackEnd(casper, test, function(err) {
					if(!err) {
						casper.waitForSelector('div#my_account_forum_menu', function success() {
							casper.echo('Logged-in successfully from back-end', 'INFO');
							test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
							this.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
							casper.waitForSelector('form[name="posts"]', function success() {
								try {
									this.fillSelectors('form[name="posts"]', {
										'select[name="required_dob"]' :  responseData.required,
										'select[name="visiblity_dob"]' :  responseData.visibility
									}, false);
									test.assertExists('form[name="posts"] button');
									this.click('form[name="posts"] button');
									casper.waitForSelector('font[color="red"]', function success() {
										var successMessage = this.fetchText('font[color="red"]').trim();
										if(successMessage && successMessage != '' )
											verifySuccessMsg(successMessage, 'Your profile fields have been updated.', 'DefaultRegistrationOptions', casper, function() {});
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('form[name="posts"] button');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			}); 

			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			casper.thenOpen(config.url, function() {
				this.echo('Title of the page : ' +this.getTitle(), 'INFO');
				forumRegister.redirectToLogout(casper, test, function(err) {
					if(!err) {
						casper.waitForSelector('a[href^="/register/register"]', function success() {
							loginToFrontEnd(casper, function(err) {
								if(!err) {
									casper.waitForSelector('form.form-horizontal', function success() {
										casper.echo('loaded edit profile page', 'INFO');	
										if (responseData.visibility == '1') {
											try {
												test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
											}catch(e) {
												test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
												casper.echo('Instant Messaging Field Is Enabled From Back-End', 'ERROR');
											}
										} else {
											try {
												test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
												if (responseData.required == '1') {
													editToProfile(json['dobBlankData'], casper, function(err) {
														if(!err) {
															var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
															if(errorMsg && errorMsg!= '')
																verifyErrorMsg(errorMsg, 'Please enter birthday.', 'blankDobWithRequired', casper, function() {});
														}else {
															casper.echo('Error : '+err, 'INFO');
														}
													});
												} else {
													editToProfile(json['dobBlankData'], casper, function(err) {
														if(!err) {
															var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
															if(errorMsg && errorMsg!= '')
																verifyErrorMsg(errorMsg, 'Please enter birthday.', 'blankDobWithRequired', casper, function() {});
														}else {
															casper.echo('Error : '+err, 'INFO');
														}
													});
						
													editToProfile(json['dobData'], casper, function(err) {
														if(!err) {
															try {
																test.assertExists('#moderator-panel div[role="alert"]');
																var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
																if(successMessage && successMessage != "") {
																	verifySuccessMsg(successMessage, 'Your settings have been updated.', 'successWithBirthday', casper, function() {
																	});
																}
															}catch(e) {
																test.assertDoesntExist('#moderator-panel div[role="alert"]');
															}
														}else {
															casper.echo('Error : '+err, 'INFO');
														}
													});
												}
											}catch(e) {
												test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
												casper.echo('Birthday Field Is Disabled From Back-End', 'ERROR');
											}
										}
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}else {
									casper.echo('Error : '+err, 'INFO');
								}
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {

					}
				});
			});
		});
	});
};

/**************************Back-end Signature Field Validation ********************************/

editProfile.signatureFieldsTest = function(casper, test) {

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified', 'INFO');
	});
	
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		editProfile.errors.push(msg);
	});
	
	casper.start();
	//Set Different Value For 'Signature' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.echo('/*************************VERIFYING ALL CASES OF SIGNATURE********************', 'INFO');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			casper.thenOpen(config.backEndUrl, function() {
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
				try {
					this.click('a[href="/tool/members/login?action=logout"]');
				}catch(e) {
					test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
				}
			});
			casper.then(function() {
				forumRegister.loginToForumBackEnd(casper, test, function(err) {
					if(!err) {
						casper.waitForSelector('div#my_account_forum_menu', function success() {
							casper.echo('Logged-in successfully from back-end', 'INFO');
							test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
							this.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
							casper.waitForSelector('form[name="posts"]', function success() {
								try {
									this.fillSelectors('form[name="posts"]', {
										'select[name="required_signature"]' :  responseData.required,
										'select[name="visiblity_signature"]' :  responseData.visibility
									}, false);
									test.assertExists('form[name="posts"] button');
									this.click('form[name="posts"] button');
									casper.waitForSelector('font[color="red"]', function success() {
										var successMessage = this.fetchText('font[color="red"]').trim();
										if(successMessage && successMessage != '' )
											verifySuccessMsg(successMessage, 'Your profile fields have been updated.', 'DefaultRegistrationOptions', casper, function() {});
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('form[name="posts"] button');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			}); 
			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			casper.thenOpen(config.url, function() {
				this.echo('Title of the page : ' +this.getTitle(), 'INFO');
				forumRegister.redirectToLogout(casper, test, function(err) {
					if(!err) {
						casper.waitForSelector('a[href^="/register/register"]', function success() {
							loginToFrontEnd(casper, function(err) {
								if(!err) {
									casper.waitForSelector('form.form-horizontal', function success() {
										casper.echo('loaded edit profile page', 'INFO');	
										if (responseData.visibility == '1') {
											try {
												test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
											}catch(e) {
												test.assertExists('form[name="PostTopic"] div.sign-container');
												casper.echo('Birthday Field Is Enabled From Back-End', 'ERROR');
											}
										} else {
											try {
												test.assertExists('form[name="PostTopic"] div.sign-container');
												if (responseData.required == '1') {
													editToProfile(json['signatureBlankData'], casper, function(err) {
										
							
													});
												} else {
													editToProfile(json['signatureBlankData'], casper, function(err) {
														casper.echo('Processing to registration on forum with blank signature.....', 'INFO');
													});
						
													editToProfile(json['signatureData'], casper, function(err) {
														if(!err) {
															try {
																test.assertExists('#moderator-panel div[role="alert"]');
																var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
																if(successMessage && successMessage != "") {
																	verifySuccessMsg(successMessage, 'Your settings have been updated.', 'fullNameWithRequired', casper, function() {
																	});
																}
															}catch(e) {
																test.assertDoesntExist('#moderator-panel div[role="alert"]');
															}
														}else {
															casper.echo('Error : '+err, 'INFO');
														}
													});
												}
											}catch(e) {
												test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
											}
										}
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}else {
									casper.echo('Error : '+err, 'INFO');
								}
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}else {
						casper.echo('Error : '+err, 'INFO');
					}
				});
			});
		});
	});
};

/*****************************************PRIVATE METHODS****************************************/

//Method For Login To Front-end And Move To Edit Profile Page
var loginToFrontEnd = function(driver, callback) {

	//Login To App
	driver.then(function() {
		try {
			this.test.assertExists('#td_tab_login');
			forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, driver, function(err) {
				if(!err) {
					driver.echo('User logged-in successfully', 'INFO');
					driver.waitForSelector('.default-user', function success() {
						this.click('.default-user');
						this.echo('clicked on users icon successfully', 'INFO');
						this.test.assertExists('a[href^="/register/register?edit="]');
						this.click('a[href^="/register/register?edit="]');
						this.echo('clicked on user edit profile link successfully', 'INFO');
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}else {
					driver.echo('Error : '+err, 'ERROR');
				}
			});
		} catch(e) {
			this.test.assertDoesntExist('#td_tab_login');
		}
		return callback(null);

	});
};

//Method For Login To Forum Backend
var loginToForumBackEnd = function(data, driver, callback) {
	driver.fill('form[name="frmLogin"]', {
		'username' : data.uname,
		'password' : data.upass,
	}, false);
	driver.test.assertExists('form[name="frmLogin"] button');
	driver.click('form[name="frmLogin"] button');
	return callback(null);
};

//Method For Editing User's Edit Profile
var editToProfile = function(userData, driver, callback) {

	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="name"]');
		driver.fill('form[name="PostTopic"]', {
			'name' : userData.fullName,
			'name_private' : true
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
	}

	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="imType"]');
		driver.fill('form[name="PostTopic"]', {
			'imType' : userData.imType
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="imType"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="imID"]');
		driver.fill('form[name="PostTopic"]', {
			'imID' : userData.imID,
			'imType' : userData.imType
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="imID"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] div.sign-container');
		driver.fill('form[name="PostTopic"]', {
			'signature' : userData.signature
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
		driver.sendKeys('input[name="birthDatepicker"]', userData.birthday, {reset : true});
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
	}
	
	driver.wait(5000, function() {
		driver.test.assertExists('form[action="/register"] button[type="submit"]');
		this.click('form[action="/register"] button[type="submit"]');
		driver.then(function() {
			return callback(null);
		});
	});
	
};

//Method For Editing User's Account Settings
var editAccountSetting = function(userData, driver, callback) {
	driver.echo("...................." +JSON.stringify(userData));
	//driver.test.assertExists('div#usrName .change-value');
	driver.then(function() {
		this.reload();
	});
	driver.waitForSelector('div#usrName', function success() {
	driver.mouse.move('div#usrName');
	driver.waitForSelector('div#usrName .change-value', function success() {
		driver.click('div#usrName .change-value');
		driver.waitForSelector('div.editable-input input[maxlength="25"]', function success() {
			this.sendKeys('div.editable-input input[maxlength="25"]', userData.new_username, {reset: true});
						
			this.click('div.editable-buttons button[type="submit"]');
			driver.then(function() {
				this.on('remote.alert', testAlert2);
				driver.wait(5000, function() {
					this.removeListener('remote.alert', testAlert2);
					if(userData.new_username == 'hs1234' || userData.new_username == '') {
						return callback(null);			
					}
					driver.then(function() {
						driver.test.assertExists('div#usrPwd .change-value');
						driver.mouse.move('div#usrPwd');
						driver.waitForSelector('div#usrPwd .change-value', function success() {
							driver.click('div#usrPwd .change-value');
							driver.waitForSelector('div.editable-input input[type="password"]', function success() {
								this.sendKeys('div.editable-input input[type="password"]', userData.upass, {reset: true});
								this.click('div#usrPwd div.editable-buttons button[type="submit"]');
								driver.wait(1000, function() {
									if(userData.upass == '') {
										return callback(null);			
									}
									driver.test.assertExists('div#usrEmail .change-value');
									driver.mouse.move('div#usrEmail');
									driver.waitForSelector('div#usrEmail .change-value', function success() {
										driver.click('div#usrEmail .change-value');
										driver.waitForSelector('div.editable-input input', function success() {
											driver.sendKeys('div.editable-input input', userData.email, {reset: true});
											this.click('form.form-inline.editableform div.editable-buttons button[type="submit"]');
											this.then(function() {
												this.on('remote.alert', testAlert3);
											});
											driver.wait(5000, function() {
												if(userData.email == '' || userData.email == 'xxxxxxxxxx' || userData.email == 'hs@wt.com') {
													driver.then(function() {
														this.removeListener('remote.alert', testAlert3);
														return callback(null);													
													});
												} else {
													driver.click('form[name="PostTopic"] button[type="submit"]');
													return callback(null);
												}
											});
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					});
				});
			});
		}, function fail() {
			casper.echo('ERROR OCCURRED', 'ERROR');
		});
	}, function fail() {
		casper.echo('ERROR OCCURRED', 'ERROR');
	});
}, function fail() {
	casper.echo('ERROR OCCURRED', 'ERROR');	
});
	
};

//Method For Verifying Error Message On Edit Profile/Account Setting Page After Submitting Form
var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

//Method For Verifying Success Message On Edit Profile Page/Account Setting page After Submitting Form
var verifySuccessMsg = function(successMessage, expectedSuccessMsg, msgTitle, driver, callback) {
	driver.echo('Actual Success message : '+successMessage, 'INFO');
	driver.echo('Expected Success message : '+expectedSuccessMsg, 'INFO');
	if((successMessage == expectedSuccessMsg) || (successMessage.indexOf(expectedSuccessMsg) > -1)) {
		driver.echo('Success message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Success Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};

function testAlert2(message) {
	casper.echo('message : '+message, 'INFO');
	casper.test.assertEquals(message, 'Error: hs1234 is already taken.');
	casper.echo('Alert message is verified', 'INFO');
};

function testAlert3(message) {
	casper.echo('message : '+message, 'INFO');
	casper.test.assertEquals(message, 'Error: The account "hs1234" has the same email address. Users are not permitted to have multiple accounts with the same email address.');
	casper.echo('Alert message is verified', 'INFO');
};

//Method For Enabling "UserName" Permission For Registered User
var disableUserNameForRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Registered Users') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				driver.click('a[href="'+grpName+'"]');
				driver.waitForSelector('#change_username', function success() {
					try {
						utils.enableorDisableCheckbox('change_username', false, driver, function(err) {
							driver.echo('checkbox is unchecked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							driver.waitForSelector('font[color="red"]', function success() {
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'userNameWithUnchecked', driver, function() {
									editProfile.makeRegisteredUser(driver, driver.test, function() {
										casper.echo('user group changed to registered user', 'INFO');
										return callback(null);					
									});
								});
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}
						
					}catch(e) {
						test.assertDoesntExist('#change_username');
					}
				}, function fail() {

				});
			}, function fail() {

			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Making A User Registered From back-End
editProfile.makeRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('#autosuggest', function success() {
				//this.sendKeys('#autosuggest', 'hs1234', {keepFocus: true});
				driver.sendKeys('input[name="member"]', 'hs1234', {reset : true});
				this.click('#autosuggest');
				this.page.sendEvent("keypress", this.page.event.key.Enter);
				driver.waitForSelector('form[name="ugfrm"]', function success() {
					if(this.evaluate(function () {return document.getElementById('20237477').checked;})) {           
					}else {
						this.fillSelectors('form[name="ugfrm"]', {
							'input[type="checkbox"]' :  '20237477'
						}, true);    
					}
					//this.click('input[id="20237479"]');
					//driver.click('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close');
					return callback(null);
				}, function fail() {
					driver.echo('ERROR OCCURRED', 'ERROR');
				});
			}, function fail() {
				driver.echo('ERROR OCCURRED', 'ERROR');
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Disabling "Edit Own Profile" Permission For Registered User
var disableInvisibleModeForRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Registered Users') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				var id = grpName.split('=');
				var id = id[2];
				this.click('a[data-tooltip-elm="ugManage'+id+'"]');
				this.click('a[href="'+grpName+'"]');
				driver.waitForSelector('#allow_invisible', function success() {
					try {
						test.assertExists('#allow_invisible');
						utils.enableorDisableCheckbox('allow_invisible', false, driver, function() {
							driver.echo('checkbox is unchecked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							driver.waitForSelector('font[color="red"]', function success() {
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedEditOwnProfile', driver, function() {
									editProfile.makeRegisteredUser(driver, driver.test, function() {
										casper.echo('user group changed to registered user', 'INFO');
										return callback(null);					
									});
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}
						
					}catch(e) {
						test.assertDoesntExist('#allow_invisible');
					}
				}, function fail() {

				});
			}, function fail() {

			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Disabling "Invisible Mode" Permission For Registered User
var disableEditOwnProfileForRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Registered Users') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				var id = grpName.split('=');
				var id = id[2];
				this.click('a[data-tooltip-elm="ugManage'+id+'"]');
				this.click('a[href="'+grpName+'"]');
				driver.waitForSelector('#edit_profile', function success() {
					try {
						test.assertExists('#edit_profile');
						utils.enableorDisableCheckbox('edit_profile', false, driver, function() {
							driver.echo('checkbox is unchecked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							driver.waitForSelector('font[color="red"]', function success() {
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedEditOwnProfile', driver, function() {
									editProfile.makeRegisteredUser(driver, driver.test, function() {
										casper.echo('user group changed to registered user', 'INFO');
										return callback(null);					
									});
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}
						
					}catch(e) {
						test.assertDoesntExist('#edit_profile');
					}
				}, function fail() {

				});
			}, function fail() {

			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

var disableCustomUserTitleForRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Registered Users') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				var id = grpName.split('=');
				var id = id[2];
				this.click('a[data-tooltip-elm="ugManage'+id+'"]');
				this.click('a[href="'+grpName+'"]');
				driver.waitForSelector('#allow_customtitle', function success() {
					try {
						test.assertExists('#allow_customtitle');
						utils.enableorDisableCheckbox('allow_customtitle', false, driver, function() {
							driver.echo('checkbox is unchecked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							driver.waitForSelector('font[color="red"]', function success() {
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedEditOwnProfile', driver, function() {
									editProfile.makeRegisteredUser(driver, driver.test, function() {
										casper.echo('user group changed to registered user', 'INFO');
										return callback(null);					
									});
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}
						
					}catch(e) {
						test.assertDoesntExist('#edit_profile');
					}
				}, function fail() {

				});
			}, function fail() {

			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method To Remove Short Answer Field
editProfile.removeShortAnswerFields = function(driver, test, callback) {
	//Open Back-End URL And Get Title
	driver.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			test.assertExists('a[href="/tool/members/login?action=logout"]');
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum BackEnd
	driver.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				driver.echo('Logged-in successfully from back-end', 'INFO');
				driver.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					test.assertExists('div#ddUsers a[href="/tool/members/mb/fields"]');
					this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
					driver.waitForSelector('form[name="posts"]', function success() {
						this.click('form#custom_fields_table input');
						this.click('form#custom_fields_table button');
						driver.waitForSelector('p:nth-child(4)', function success() {
							this.capture('demo.png');
							var msg = this.fetchText('p:nth-child(4)');
							this.echo('Success Message: '+msg, 'INFO');
							this.echo('all custom profile fields have been deleted', 'INFO');
						}, function fail() {
					
						});
					}, function fail() {
				
					});
				}, function fail() {
					driver.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				driver.echo('Error : '+err, 'ERROR');
			}
		});
		
	});
	return callback(null);
};
