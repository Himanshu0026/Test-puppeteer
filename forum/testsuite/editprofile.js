/****This script is dedicated for editing user's profile and account setting on the forum. It covers testing of edit user's profile and account setting page with all defined validations****/
'use strict';
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var json = require('../testdata/editData.json');
var config = require('../config/config.json');

var editProfile = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'editProfile/';
/**************************All Fields Required Validation****************************/

editProfile.featureTest = function(casper, test) {

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified', 'INFO');
	});
	
	//Open Forum URL And Get Title 
	casper.start(config.url, function() {
		try {
			this.test.assertTitle('forum12');
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		} catch (e) {
			this.echo('Title does not match', 'ERROR');
		}
	});

	//Registering A user
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.loginData, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('user registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]');
		}	
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.echo('User logged-in successfully', 'INFO');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
			});
		});
	});

	//Clicking On User's Icon To Display User's Drop-down For Editing Profile
	casper.then(function() {
		try { 
			test.assertExists('.default-user');
			this.click('.default-user');
			this.echo('clicked on users icon successfully', 'INFO');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'userIcon.png');
			});
		} catch (e) {
			test.assertDoesntExist('.default-user');
		}	
	}); 

	//Clicking On 'Edit Profile' link
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register?edit="]');
			this.click('a[href^="/register/register?edit="]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'useredit_form.png');
				this.echo('clicked on user edit profile link successfully', 'INFO');
			});
		} catch (e) {
			test.assertDoesntExist('a[href^="/register/register?edit="]');
		}
	});

	//Fill Blank/Invalid Data On Edit Profile Page And Verifying Errors
	casper.then(function() {
		this.eachThen(json['invalidDataForEditProfile'], function(response) {
			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			editToProfile(responseData, casper, function() {
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
				verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper, function() {});
			});
		});
	});

	//Edit Valid Data On User's Edit Profile Page
	casper.then(function() {
		editToProfile(json.validDataForEditProfile, casper, function(){
			casper.then(function() {
                                try {
					test.assertExists('#moderator-panel div[role="alert"]');
					var successMessage = this.fetchText('#moderator-panel div[role="alert"]');
					this.echo('Actual Success Message : '+successMessage.trim(), 'INFO');
					this.echo('Ecpected Success Message : '+json.validDataForEditProfile.expectedSuccessMsg, 'INFO');
					test.assertEquals(successMessage.trim(),json.validDataForEditProfile.expectedSuccessMsg);
					this.echo('Success message is verified when user try to edit with valid data', 'INFO');
					casper.wait(5000,function(){
						this.capture(screenShotsDir+ 'updatedEditProfile.png');
						this.echo('Profile Updated Successfully', 'INFO');
					});
				} catch (e) {
					test.assertDoesntExist('#moderator-panel div[role="alert"]');
				}
			});
		});
	});

	//Clicking On User's 'Account Settings' link For Editing User's Account Setting
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register?action=preferences&userid="]');
			this.click('a[href^="/register?action=preferences&userid="]');
			this.echo('clicked on users account settings link successfully', 'INFO');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'userAccountSetting_form.png');
			});
		} catch (e) {
			test.assertDoesntExist('a[href^="/register?action=preferences&userid="]');
		}
	});

	//Fill Blank/Invalid Data On Account Setting Page And Verifying Errors
	casper.then(function() {
			this.eachThen(json['invalidDataForAccount'], function(response) {
			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			editAccountSetting(responseData, casper, function() {
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
			});
		});
	});

	// This Is Used To Reload The Current Page
	casper.then(function(){
		this.reload();
	});

	//Editing user's Account Setting With Valid Data	
	casper.then(function() {
		editAccountSetting(json.validDataForEditAccount, casper, function() {
			casper.wait(3000, function() {

				this.capture(screenShotsDir+ '11.png');
				try {
					test.assertExists('div.alert.alert-success.text-center');
					var successMessage = this.fetchText('div.alert.alert-success.text-center');
					if(successMessage && successMessage != '' )
					verifySuccessMsg(successMessage, json.validDataForEditAccount.expectedSuccessMsg, 'validAccountSetting', casper, function() {
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ 'updatedAccountSetting.png');
							this.echo('account setting updated successfully', 'INFO');
						});
					});
				}catch(e) {
					test.assertDoesntExist('div.alert.alert-success.text-center');
				}
			});
			
		});
	});

	//Clicking On Logout Link
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
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

	//Open Back-End URL And Get Title
	casper.start(config.backEndUrl, function() {
		try {
			test.assertTitle('Website Toolbox - Account Login');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		}catch(e) {
			this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
		}
	});


	//Set Different Value For 'Full Name' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.echo('/*************************VERIFYING ALL CASES OF FULL NAME********************', 'INFO');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			//Open Back-End URL And Get Title
			casper.thenOpen(config.backEndUrl, function() {
				try {
					test.assertTitle('Website Toolbox - Account Login');
					this.echo('Title of the page :' +this.getTitle(), 'INFO');
				}catch(e) {
					this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
				}
			});

			//Login To Forum BackEnd
			casper.then(function() {
				forumRegister.loginToForumBackEnd(casper, test, function() {
					casper.wait(5000, function() {
						this.echo('Logged-in successfully from back-end', 'INFO');
					});		
				});
			}); 

			//Clicking On 'Users' Tab Under Settings 
			casper.then(function() {
				try {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					try {
						test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
						this.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
						casper.wait(5000, function() {
							this.capture(screenShotsDir + 'forum_default_reg.png');
						});
					}catch(e) {
						test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
					}
				}catch(e) {
					test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				}
			});
	
			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			casper.then(function() {
				this.fillSelectors('form[name="posts"]', {
					'select[name="required_name"]' :  responseData.required,
					'select[name="visiblity_name"]' :  responseData.visibility
				}, false);
        		});
			
			casper.then(function() {
				try {
					test.assertExists('form[name="posts"] button');
					this.click('form[name="posts"] button');
					casper.wait(5000, function() {
						try {
							test.assertExists('a[href="/tool/members/login?action=logout"]');
							this.click('a[href="/tool/members/login?action=logout"]');
						}catch(e) {
							test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
						}
					});
				}catch(e) {
					test.assertDoesntExist('form[name="posts"] button');
				}
			});

			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'fullName_'+responseData.required+'_'+responseData.visibility+'.png');
				this.thenOpen(config.url, function() {
					loginToFrontEnd(casper, function() {
						casper.echo('loaded edit profile page', 'INFO');	
						casper.capture(screenShotsDir + 'fullName_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
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
									editToProfile(json.blankFullnameData, casper, function() {
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
									});
								} else {
									editToProfile(json.fullnameData, casper, function() {
										try {
											test.assertExists('#moderator-panel div[role="alert"]');
											var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
											if(successMessage && successMessage != "") {
												verifySuccessMsg(successMessage, 'Your settings have been updated.', 'fullNameWithRequired', 		casper, function() {});
											}
										}catch(e) {
											test.assertDoesntExist('#moderator-panel div[role="alert"]');
										}
									});
								}
							}catch(e) {
								test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
								casper.echo('Full Name Field Is Disabled From Back-End', 'ERROR');
							}
						}
						casper.wait(5000,function(){
							this.capture(screenShotsDir + 'register_submit.png');
							forumRegister.redirectToLogout(casper, test, function() {
								casper.echo('FULL NAME TASK COMPLETED','INFO');					
							});
						});
					});
				});
			});
		});
	});

	//Set Different Value For 'Instant Messaging' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.echo('/*************************VERIFYING ALL CASES OF INSTANT MESSAGING********************', 'INFO');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			//Open Back-End URL And Get Title
			casper.thenOpen(config.backEndUrl, function() {
				try {
					test.assertTitle('Website Toolbox - Account Login');
					this.echo('Title of the page :' +this.getTitle(), 'INFO');
				}catch(e) {
					this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
				}
			});

			//Login To Forum BackEnd
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');		
			}); 

			//Clicking On 'Users' Tab Under Settings 
			casper.then(function() {
				try {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					try {
						test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
						this.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
						casper.wait(5000, function() {
							this.capture(screenShotsDir + 'forum_default_reg.png');
						});
					}catch(e) {
						test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
					}
				}catch(e) {
					test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				}
			});

			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			casper.then(function() {
				this.fillSelectors('form[name="posts"]', {
					'select[name="required_imType"]' :  responseData.required,
					'select[name="visiblity_imType"]' :  responseData.visibility
				}, false);
        		});
			
			casper.then(function() {
				try {
					test.assertExists('form[name="posts"] button');
					this.click('form[name="posts"] button');
					casper.wait(5000, function() {
						try {
							test.assertExists('a[href="/tool/members/login?action=logout"]');
							this.click('a[href="/tool/members/login?action=logout"]');
						}catch(e) {
							test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
						}
					});
				}catch(e) {
					test.assertDoesntExist('form[name="posts"] button');
				}
			});

			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'instantMessaging_'+responseData.required+'_'+responseData.visibility+'.png');
				this.thenOpen(config.url, function() {
					loginToFrontEnd(casper, function() {
						casper.echo('loaded edit profile page', 'INFO');	
						casper.capture(screenShotsDir + 'instantMessaging_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
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
									editToProfile(json['imIdBlankData'], casper, function() {
										var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
										if(errorMsg && errorMsg!= '')
										verifyErrorMsg(errorMsg, "Please enter your screen name.", 'blankImIDWithRequired', casper, function() {});
									});
								} else {
									editToProfile(json['imIdBlankData'], casper, function() {
										var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
										if(errorMsg && errorMsg!= '')
										verifyErrorMsg(errorMsg, 'Please enter your screen name.', 'BlankIM_ID', casper, function() {});
										casper.echo('Processing to registration on forum.....', 'INFO');
									});
									editToProfile(json['imIdData'], casper, function() {
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
									});
								}
							}catch(e) {
								test.assertDoesntExist('form[name="PostTopic"] input[name="imID"]');
								casper.echo('Instant Messaging Field Is Disabled From Back-End', 'ERROR');
							}
						}
						casper.wait(5000,function(){
							this.capture(screenShotsDir + 'register_submit.png');
							forumRegister.redirectToLogout(casper, test, function() {
								casper.echo('INSTANT MESSAGING TASK COMPLETED','INFO');					
							});
						});
					});
				});
			});
		});
	});

	//Set Different Value For 'Birthday' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.echo('/*************************VERIFYING ALL CASES OF BIRTH DAY********************', 'INFO');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			//Open Back-End URL And Get Title
			casper.thenOpen(config.backEndUrl, function() {
				try {
					test.assertTitle('Website Toolbox - Account Login');
					this.echo('Title of the page :' +this.getTitle(), 'INFO');
				}catch(e) {
					this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
				}
			});

			//Login To Forum BackEnd
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');		
			}); 

			//Clicking On 'Users' Tab Under Settings 
			casper.then(function() {
				try {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					try {
						test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
						this.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
						casper.wait(5000, function() {
							this.capture(screenShotsDir + 'forum_default_reg.png');
						});
					}catch(e) {
						test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
					}
				}catch(e) {
					test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				}
			});

			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			casper.then(function() {
				this.fillSelectors('form[name="posts"]', {
					'select[name="required_dob"]' :  responseData.required,
					'select[name="visiblity_dob"]' :  responseData.visibility
				}, false);
        		});
			
			casper.then(function() {
				try {
					test.assertExists('form[name="posts"] button');
					this.click('form[name="posts"] button');
					casper.wait(5000, function() {
						try {
							test.assertExists('a[href="/tool/members/login?action=logout"]');
							this.click('a[href="/tool/members/login?action=logout"]');
						}catch(e) {
							test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
						}
					});
				}catch(e) {
					test.assertDoesntExist('form[name="posts"] button');
				}
			});

			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'birthday_'+responseData.required+'_'+responseData.visibility+'.png');
				this.thenOpen(config.url, function() {
					loginToFrontEnd(casper, function() {
						casper.echo('loaded edit profile page', 'INFO');	
						casper.capture(screenShotsDir + 'birthday_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
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
									editToProfile(json['dobBlankData'], casper, function() {
										var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
										if(errorMsg && errorMsg!= '')
										verifyErrorMsg(errorMsg, 'Please enter birthday.', 'blankDobWithRequired', casper, function() {});
									});
								} else {
									editToProfile(json['dobBlankData'], casper, function() {
										var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
										if(errorMsg && errorMsg!= '')
										verifyErrorMsg(errorMsg, 'Please enter birthday.', 'blankDobWithRequired', casper, function() {});
									});
							
									editToProfile(json['dobData'], casper, function() {
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
									});
								}
							}catch(e) {
								test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
								casper.echo('Birthday Field Is Disabled From Back-End', 'ERROR');
							}
						}
						casper.wait(5000,function(){
							this.capture(screenShotsDir + 'register_submit.png');
							forumRegister.redirectToLogout(casper, test, function() {
								casper.echo('BIRTHDAY TASK COMPLETED','INFO');					
							});
						});
					});
				});
			});
		});
	});

	//Set Different Value For 'Signature' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.echo('/*************************VERIFYING ALL CASES OF SIGNATURE********************', 'INFO');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			//Open Back-End URL And Get Title
			casper.thenOpen(config.backEndUrl, function() {
				try {
					test.assertTitle('Website Toolbox - Account Login');
					this.echo('Title of the page :' +this.getTitle(), 'INFO');
				}catch(e) {
					this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
				}
			});

			//Login To Forum BackEnd
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');		
			}); 

			//Clicking On 'Users' Tab Under Settings 
			casper.then(function() {
				try {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					try {
						test.assertExists('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
						this.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
						casper.wait(5000, function() {
							this.capture(screenShotsDir + 'forum_default_reg.png');
						});
					}catch(e) {
						test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
					}
				}catch(e) {
					test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				}
			});

			casper.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			casper.then(function() {
				this.fillSelectors('form[name="posts"]', {
					'select[name="required_signature"]' :  responseData.required,
					'select[name="visiblity_signature"]' :  responseData.visibility
				}, false);
        		});
			
			casper.then(function() {
				try {
					test.assertExists('form[name="posts"] button');
					this.click('form[name="posts"] button');
					casper.wait(5000, function() {
						try {
							test.assertExists('a[href="/tool/members/login?action=logout"]');
							this.click('a[href="/tool/members/login?action=logout"]');
						}catch(e) {
							test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
						}
					});
				}catch(e) {
					test.assertDoesntExist('form[name="posts"] button');
				}
			});

			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'birthday_'+responseData.required+'_'+responseData.visibility+'.png');
				this.thenOpen(config.url, function() {
					loginToFrontEnd(casper, function() {
						casper.echo('loaded edit profile page', 'INFO');	
						casper.capture(screenShotsDir + 'birthday_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
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
									editToProfile(json['signatureBlankData'], casper, function() {
								
	});
								} else {
									editToProfile(json['signatureBlankData'], casper, function() {
										casper.echo('Processing to registration on forum with blank signature.....', 'INFO');
									});
							
									editToProfile(json['signatureData'], casper, function() {
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
									});
								}
							}catch(e) {
								test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
							}
						}
						casper.wait(5000,function(){
							this.capture(screenShotsDir + 'register_submit.png');
							forumRegister.redirectToLogout(casper, test, function() {
								casper.echo('SIGNATURE TASK COMPLETED', 'INFO');
							});
						});
					});
				});
			});
		});
	});

	//Open Front_end URL and Get Title
	casper.thenOpen(config.url, function() {
		try {
			test.assertTitle('forum12');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		}catch(e) {
			this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
		}
	});
	
	//Registering A user
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('user registered successfully', 'INFO');
						forumRegister.redirectToLogout(casper, test, function() {
							casper.wait(5000, function() {});
						});
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]');
		}	
	});
		
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		try {
			test.assertTitle('Website Toolbox - Account Login');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		}catch(e) {
			this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
		}	
	});

	//Login To Forum BackEnd
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');		
		});
	});
	
	//Changing Permission From Back-End
	casper.then(function() {
		disableUserNameForRegisteredUser(casper, casper.test, function() {
			casper.echo('permission changed for registered user', 'INFO');
		});		
	});
	
	//Open Front_end URL and Get Title
	casper.thenOpen(config.url, function() {
		try {
			test.assertTitle('forum12');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		}catch(e) {
			this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
		}
	});

	//Login To App And Verify User Name Visibility On Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						this.test.assertExists('a.default-user ');
						this.click('a.default-user ');
						try {
							this.test.assertExists('span li a[href^="/register?action=preferences"]');
							this.click('span li a[href^="/register?action=preferences"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'profile.png');
								casper.then(function() {
									try {
										test.assertExists('div#usrName .change-value');
									}catch(e) {
										test.assertDoesntExist('div#usrName .change-value');
									} 
								});				
							});
						}catch(e) {
							test.assertDoesntExist('span li a[href^="/register?action=preferences"]');
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user ');
					}						
				});
			});
			casper.then(function() {
				try {
					test.assertExists('.default-user');
					forumRegister.redirectToLogout(casper, test, function() {
						casper.wait(5000, function() {
							casper.echo('USer Name invisibility verified', 'INFO');
						});
					});
				}catch(e) {
					test.assertDoesntExist('.default-user');													
				}			
			});
		});
	});

	//Open Front_end URL and Get Title
	casper.thenOpen(config.url, function() {
		try {
			test.assertTitle('forum12');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		}catch(e) {
			this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
		}
	});
	
	//Registering A user
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('user registered successfully', 'INFO');
						forumRegister.redirectToLogout(casper, test, function() {
							casper.wait(5000, function() {});
						});
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]');
		}	
	});

	//Open Back-End URL And Change 'Edit Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			try {
				test.assertTitle('Website Toolbox - Account Login');
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
			}catch(e) {
				this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
			}
		});

		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.wait(5000, function() {
					disableEditOwnProfileForRegisteredUser(casper, casper.test, function() {
						casper.echo('permission changed for registered user', 'INFO');
				
					});
				});		
			});
		});
	});

	//Open Front_end URL and Get Title
	casper.thenOpen(config.url, function() {
		try {
			test.assertTitle('forum12');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		}catch(e) {
			this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
		}
	});
	
	//Registering A user
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('user registered successfully', 'INFO');
						forumRegister.redirectToLogout(casper, test, function() {
							casper.wait(5000, function() {});
						});
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]');
		}	
	});

	//Open Back-End URL And Change 'Incisible Mode' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			try {
				test.assertTitle('Website Toolbox - Account Login');
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
			}catch(e) {
				this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
			}
		});

		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.wait(5000, function() {
					disableInvisibleModeForRegisteredUser(casper, casper.test, function() {
						casper.echo('permission changed for registered user', 'INFO');
				
					});
				});		
			});
		});
	});

	//Open Front_end URL and Get Title
	casper.thenOpen(config.url, function() {
		try {
			test.assertTitle('forum12');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		}catch(e) {
			this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
		}
	});

	//Login To App And Verify User Name Visibility On Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						this.test.assertExists('a.default-user ');
						this.click('a.default-user ');
						try {
							this.test.assertExists('span li a[href^="/register?action=preferences"]');
							this.click('span li a[href^="/register?action=preferences"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'profile.png');	
								try {
									test.assertExists('#INVS');
								}catch(e) {
									test.assertDoesntExist('#INVS');
								}			
							});
						}catch(e) {
							test.assertDoesntExist('span li a[href^="/register?action=preferences"]');
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user ');
					}						
				});
			});
			casper.then(function() {
				try {
					test.assertExists('.default-user');
					forumRegister.redirectToLogout(casper, test, function() {
						casper.wait(5000, function() {
							casper.echo('Invisible Mode Invisibility verified', 'INFO');
						});
					});
				}catch(e) {
					test.assertDoesntExist('.default-user');													
				}			
			});
		});
	});

	//Open Front_End URL and Get Title
	casper.thenOpen(config.url, function() {
		try {
			test.assertTitle('forum12');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		}catch(e) {
			this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
		}
	});
	
	//Registering A user
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('user registered successfully', 'INFO');
						forumRegister.redirectToLogout(casper, test, function() {
							casper.wait(5000, function() {});
						});
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]');
		}	
	});

	//Open Back-End URL And Change 'Invisible Mode' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			try {
				test.assertTitle('Website Toolbox - Account Login');
				this.echo('Title of the page :' +this.getTitle(), 'INFO');
			}catch(e) {
				this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
			}
		});

		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.wait(5000, function() {
					disableCustomUserTitleForRegisteredUser(casper, casper.test, function() {
						casper.echo('permission changed for registered user', 'INFO');
				
					});
				});		
			});
		});
	});

	//Open Front_end URL and Get Title
	casper.thenOpen(config.url, function() {
		try {
			test.assertTitle('forum12');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		}catch(e) {
			this.echo(this.getTitle()+' Title Does Not Match' , 'ERROR');
		}
	});

	//Login To App And Verify User Name Visibility On Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						this.test.assertExists('a.default-user ');
						this.click('a.default-user ');
						try {
							this.test.assertExists('span li a[href^="/register/register?edit"]');
							this.click('span li a[href^="/register/register?edit"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'profile.png');	
								try {
									test.assertExists('div#custom_user_title .form-text.align-top.editable.editable-click');
								}catch(e) {
									test.assertDoesntExist('div#custom_user_title .form-text.align-top.editable.editable-click');
								}			
							});
						}catch(e) {
							test.assertDoesntExist('span li a[href^="/register?action=preferences"]');
						}
					}catch(e) {
						test.assertDoesntExist('a.default-user ');
					}						
				});
			});
			casper.then(function() {
				try {
					test.assertExists('.default-user');
					forumRegister.redirectToLogout(casper, test, function() {
						casper.wait(5000, function() {
							casper.echo('Custom User Title Invisibility Verified', 'INFO');
						});
					});
				}catch(e) {
					test.assertDoesntExist('.default-user');													
				}			
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
			forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, driver, function() {
				driver.echo('User logged-in successfully', 'INFO');
				driver.wait(5000, function() {
					this.capture(screenShotsDir+ 'loggedIn_user.png');
				});
			});
		} catch(e) {
			this.test.assertDoesntExist('#td_tab_login');
		}

	});

	//Clicking On User's Icon To Display User's Drop-down For Editing Profile
	driver.then(function() {
		try {
			this.test.assertExists('.default-user');
			this.click('.default-user');
			this.echo('clicked on users icon successfully', 'INFO');
			driver.wait(5000, function() {
				this.capture(screenShotsDir+ 'userIcon.png');
			});
		} catch (e) {
			this.test.assertDoesntExist('.default-user');
		}
	}); 

	//Clicking On 'Edit Profile' link
	driver.then(function() {
		try {
			this.test.assertExists('a[href^="/register/register?edit="]');
			this.click('a[href^="/register/register?edit="]');
			this.echo('clicked on user edit profile link successfully', 'INFO');
			driver.wait(5000, function() {
				this.capture(screenShotsDir+ 'useredit_form.png');
return callback();
			});
		} catch (e) {
			this.test.assertDoesntExist('a[href^="/register/register?edit="]');
		}
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
	return callback();
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
	driver.wait(3000, function() {
		driver.then(function() {
			driver.test.assertExists('form[action="/register"] button[name="submit"]');
			this.click('form[action="/register"] button[name="submit"]');
			driver.wait(3000, function() {
				return callback();
			});
		});
	});
};

//Method For Editing User's Account Settings
var editAccountSetting = function(userData, driver, callback) {
	try {
		driver.test.assertExists('div#usrName .change-value');
		driver.click('div#usrName .change-value');
		driver.wait(5000, function() {
			this.capture(screenShotsDir+ '1.png');
			this.test.assertExists('div.editable-input input[maxlength="25"]');
			this.sendKeys('div.editable-input input[maxlength="25"]', userData.new_username, {reset: true});
			this.click('div.editable-buttons button[type="submit"]');
			this.then(function() {
			   	 this.on('remote.alert', testAlert2);
			});
			driver.wait(5000, function() {
				this.capture(screenShotsDir+ '2.png');
				
				driver.then(function() {
					this.removeListener('remote.alert', testAlert2);
				});

				if(userData.new_username == 'hs1234') {
					return callback();			
				} else if(userData.new_username == '') {
					return callback();
				}
				
				try {
		
					driver.test.assertExists('div#usrPwd .change-value');
					driver.click('div#usrPwd .change-value');
					try {
						driver.wait(5000, function() {
						this.capture(screenShotsDir+ '3.png');
						this.sendKeys('div.editable-input input[type="password"]', userData.upass, {reset: true});
						this.click('div.editable-buttons button[type="submit"]');
						if(userData.upass == '') {
							return callback();			
						}
						try {
							driver.test.assertExists('div#usrEmail .change-value');
							driver.click('div#usrEmail .change-value');
							driver.wait(5000, function() {
								this.capture(screenShotsDir+ '4.png');
								driver.sendKeys('div.editable-input input[class="form-control input-small"]', userData.email, {reset: true});
								this.click('div.editable-buttons button[type="submit"]');
								this.then(function() {
									this.on('remote.alert', testAlert3);
								});
								driver.wait(5000, function () {
									driver.then(function() {
										this.removeListener('remote.alert', testAlert2);
									});
									if(userData.email == '') {
										return callback();			
									}else if (userData.email == 'xxxxxxxxxx') {
										return callback();
									} else if(userData.email == 'hs@wt.com') {
										return callback();
									}
									this.capture(screenShotsDir+ '5.png');
									try {
										this.test.assertExists('#INVS');
										this.click('#INVS');
									} catch (e) {
										this.test.assertDoesntExist('#INVS');
									}
									this.test.assertExists('#option2');
									this.click('#option2');
									this.test.assertExists('#opt1');
									this.click('#opt1');
									this.test.assertExists('#sEML');
									this.click('#sEML', {checked : true});
									this.click('button.btn.btn-primary');
									return callback();		
								});
			
							});
						} catch (e) {
							driver.test.assertDoesntExist('div#usrEmail .change-value');
						}
					});
					} catch (e) {
						driver.test.assertDoesntExist('div#usrEmail .change-value');
					}
				} catch (e) {
					driver.test.assertDoesntExist('div#usrPwd .change-value');
				}
			});
		});
		
	}catch(e) {
		driver.test.assertDoesntExist('div#usrName .change-value');
	}	
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
	driver.capture(screenShotsDir + 'Error_OnEdit' +msgTitle+ '.png');
	return callback();
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
	driver.capture(screenShotsDir + 'Success_OnEdit' +msgTitle+ '.png');
	return callback();
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
			driver.wait(5000,function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				//Clicking On 'Change Permissions' Link With Respect To 'Regostered Users'  
				driver.then(function() {
					var grpName = this.evaluate(function(){
						for(var i=1; i<=7; i++) {
							var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
							if (x1.innerText == 'Registered Users') {
								var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
								return x2;
							}
						}
					});
					this.click('a[href="'+grpName+'"]');
					this.wait(5000,function(){
						this.capture(screenShotsDir + 'group_registred.png');
						try {
							test.assertExists('#change_username');
							utils.enableorDisableCheckbox('change_username', false, driver, function() {
								driver.echo('checkbox is unchecked', 'INFO');
								driver.capture(screenShotsDir+ 'checked.png');			
							});
							try {
								test.assertExists('button.button.btn-m.btn-blue');
								this.click('button.button.btn-m.btn-blue');
								driver.wait(5000, function() {
									this.capture(screenShotsDir+ 'updatedChangePermission.png');
									try {
										test.assertExists('font[color="red"]');
										var successMsg = this.fetchText('font[color="red"]');
										var expectedSuccessMsg = 'Your user group settings have been updated.';
										verifySuccessMsg(successMsg, expectedSuccessMsg, 'userNameWithUnchecked', driver, function() {
											driver.capture(screenShotsDir+ 'success.png');
											editProfile.makeRegisteredUser(driver, driver.test, function() {
												casper.echo('user group changed to registered user', 'INFO');
												return callback();					
											});
										});
									}catch(e) {
										test.assertDoesntExist('font[color="red"]');
									}
								});
							}catch(e) {
								test.assertDoesntExist('button.button.btn-m.btn-blue');
							}
							
						}catch(e) {
							test.assertDoesntExist('#change_username');
						}
					});
				});
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
			driver.wait(5000, function() {
				try {
					this.test.assertExists('#autosuggest');
					this.sendKeys('#autosuggest', 'hs1234', {keepFocus: true});
					this.click('#autosuggest');
					this.page.sendEvent("keypress", this.page.event.key.Enter);
					driver.wait(3000, function() {
						driver.then(function() {
							this.fillSelectors('form[name="ugfrm"]', {
								'select[name="usergroupid"]' :  '20237477'
							}, true);
						});
						driver.wait(3000, function() {
							this.capture(screenShotsDir + 'popUp.png');
							test.assertExists('a[href="/tool/members/login?action=logout"]');
							driver.click('a[href="/tool/members/login?action=logout"]');
							return callback();
						});
					});
				}catch(e) {
					this.test.assertDoesntExist('#autosuggest');
				}
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
			driver.wait(5000,function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
				driver.then(function() {
					var grpName = this.evaluate(function(){
						for(var i=1; i<=7; i++) {
							var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
							if (x1.innerText == 'Registered Users') {
								var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
								return x2;
							}
						}
					});
					this.click('a[href="'+grpName+'"]');
					this.wait(5000,function(){
						this.capture(screenShotsDir + 'group_registered.png');
						try {
							test.assertExists('#allow_invisible');
							utils.enableorDisableCheckbox('allow_invisible', false, driver, function() {
								driver.echo('checkbox is unchecked', 'INFO');
								driver.capture(screenShotsDir+ 'checked.png');			
							});
							try {
								test.assertExists('button.button.btn-m.btn-blue');
								this.click('button.button.btn-m.btn-blue');
								driver.wait(5000, function() {
									this.capture(screenShotsDir+ 'updatedChangePermission.png');
									try {
										test.assertExists('font[color="red"]');
										var successMsg = this.fetchText('font[color="red"]');
										var expectedSuccessMsg = 'Your user group settings have been updated.';
										verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedEditOwnProfile', driver, function() {
											driver.capture(screenShotsDir+ 'success.png');
											editProfile.makeRegisteredUser(driver, driver.test, function() {
												casper.echo('user group changed to registered user', 'INFO');
												return callback();					
											});
										});
									}catch(e) {
										test.assertDoesntExist('font[color="red"]');
									}
								});
							}catch(e) {
								test.assertDoesntExist('button.button.btn-m.btn-blue');
							}
							
						}catch(e) {
							test.assertDoesntExist('#allow_invisible');
						}
					});
				});
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
			driver.wait(5000,function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
				driver.then(function() {
					var grpName = this.evaluate(function(){
						for(var i=1; i<=7; i++) {
							var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
							if (x1.innerText == 'Registered Users') {
								var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
								return x2;
							}
						}
					});
					this.click('a[href="'+grpName+'"]');
					this.wait(5000,function(){
						this.capture(screenShotsDir + 'group_registered.png');
						try {
							test.assertExists('#edit_profile');
							utils.enableorDisableCheckbox('edit_profile', false, driver, function() {
								driver.echo('checkbox is unchecked', 'INFO');
								driver.capture(screenShotsDir+ 'checked.png');			
							});
							try {
								test.assertExists('button.button.btn-m.btn-blue');
								this.click('button.button.btn-m.btn-blue');
								driver.wait(5000, function() {
									this.capture(screenShotsDir+ 'updatedChangePermission.png');
									try {
										test.assertExists('font[color="red"]');
										var successMsg = this.fetchText('font[color="red"]');
										var expectedSuccessMsg = 'Your user group settings have been updated.';
										verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedEditOwnProfile', driver, function() {
											driver.capture(screenShotsDir+ 'success.png');
											editProfile.makeRegisteredUser(driver, driver.test, function() {
												casper.echo('user group changed to registered user', 'INFO');
												return callback();					
											});
										});
									}catch(e) {
										test.assertDoesntExist('font[color="red"]');
									}
								});
							}catch(e) {
								test.assertDoesntExist('button.button.btn-m.btn-blue');
							}
							
						}catch(e) {
							test.assertDoesntExist('#edit_profile');
						}
					});
				});
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
			driver.wait(5000,function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
				driver.then(function() {
					var grpName = this.evaluate(function(){
						for(var i=1; i<=7; i++) {
							var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
							if (x1.innerText == 'Registered Users') {
								var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
								return x2;
							}
						}
					});
					this.click('a[href="'+grpName+'"]');
					this.wait(5000,function(){
						this.capture(screenShotsDir + 'group_registered.png');
						try {
							test.assertExists('#allow_customtitle');
							utils.enableorDisableCheckbox('allow_customtitle', false, driver, function() {
								driver.echo('checkbox is unchecked', 'INFO');
								driver.capture(screenShotsDir+ 'checked.png');			
							});
							try {
								test.assertExists('button.button.btn-m.btn-blue');
								this.click('button.button.btn-m.btn-blue');
								driver.wait(5000, function() {
									this.capture(screenShotsDir+ 'updatedChangePermission.png');
									try {
										test.assertExists('font[color="red"]');
										var successMsg = this.fetchText('font[color="red"]');
										var expectedSuccessMsg = 'Your user group settings have been updated.';
										verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedEditOwnProfile', driver, function() {
											driver.capture(screenShotsDir+ 'success.png');
											editProfile.makeRegisteredUser(driver, driver.test, function() {
												casper.echo('user group changed to registered user', 'INFO');
												return callback();					
											});
										});
									}catch(e) {
										test.assertDoesntExist('font[color="red"]');
									}
								});
							}catch(e) {
								test.assertDoesntExist('button.button.btn-m.btn-blue');
							}
							
						}catch(e) {
							test.assertDoesntExist('#edit_profile');
						}
					});
				});
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};
