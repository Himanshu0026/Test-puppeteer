/****This script is dedicated for editing user's profile and account setting on the forum. It covers testing of edit user's profile and account setting page with all defined validations****/
'use strict';
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var json = require('../testdata/editData.json');
var config = require('../config/config.json');

var editProfile = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'editProfile/';
/**************************All Fields Required Validation****************************/

editProfile.featureTest = function(casper, test) {

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = "Please provide a signature.";
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified when user try to edit without signature', 'INFO');
	});

	//Open Forum URL And Get Title 
	casper.start(config.url, function() {
		try {
			this.test.assertTitle('Automation Forum');
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		} catch (e) {
			this.echo('Title does not match', 'ERROR');
		}
		this.log('Title of the page : ' +this.getTitle(), 'info');
	});

	//Login To App
	casper.then(function() {
		this.test.assertExists('#td_tab_login');
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
			this.test.assertExists('.default-user');
			this.click('.default-user');
			this.echo('clicked on users icon successfully', 'INFO');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'userIcon.png');
			});
		} catch (e) {
			this.test.assertDoesntExist('.default-user');
		}	
	}); 

	//Clicking On 'Edit Profile' link
	casper.then(function() {
		try {
			this.test.assertExists('a[href^="/register/register?edit="]');
			this.click('a[href^="/register/register?edit="]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'useredit_form.png');
				this.echo('clicked on user edit profile link successfully', 'INFO');
			});
		} catch (e) {
			this.test.assertDoesntExist('a[href^="/register/register?edit="]');
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
				if(errorMessage && errorMessage != '') {
					verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper);
				} else {
					casper.echo('some error occurred on updating edirt profile', 'INFO');
				}
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
					this.echo('success message not found', 'ERROR');
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
				if (responseData.upass == '') {
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
				
				if (errorMessage && errorMessage != '') {
					verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper);
				} else {
					casper.echo('some error occurred on updating account setting', 'INFO');
				}
					
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
					this.echo('Actual Success Message : '+successMessage.trim(), 'INFO');
					this.echo('Ecpected Success Message : '+json.validDataForEditAccount.expectedSuccessMsg, 'INFO');
					test.assertEquals(successMessage.trim(),json.validDataForEditAccount.expectedSuccessMsg);
					this.echo('Success message is verified when user try to edit account setting and preferences with valid data', 'INFO');
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'updatedAccountSetting.png');
						this.echo('account setting updated successfully', 'INFO');
					});
				} catch (e) {
					this.echo('Success message not found', 'ERROR');
				}
			});
			
		});
	});

	//Clicking On Logout Link
	casper.then(function() {
		try {
			test.assertExists('button.dropdown-toggle span.caret');
			try {
				test.assertExists('#logout');
				forumLogin.logoutFromApp(casper, function() {
					casper.echo('Successfully logout from forum', 'INFO');
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'logout.png');
					});
				});
			} catch (e) {
				test.assertDoesntExist('#logout');
			}
		} catch (e) {
			test.assertDoesntExist('button.dropdown-toggle span.caret');
		}
	});
};

/**************************Back-end  Field Validation********************************/

editProfile.customFieldsTest = function(casper, test) {

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified when user try to edit with without signature', 'INFO');
	});

	//Login To Forum BackEnd
	forumRegister.loginToForumBackEnd(casper, test, function() {
		casper.echo('Logged-in successfully from back-end', 'INFO');		
	}); 

	//Clicking On 'Users' Tab Under Settings 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/fields"]');
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
		casper.wait(5000,function(){
			this.capture(screenShotsDir + 'forum_settings.png');
		});
	});

	//Redirecting To 'Default Registration Options' Page
	casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
		casper.wait(5000,function(){
			this.capture(screenShotsDir + 'Default_Registration_Options.png');
			this.echo('Successfully Open Default Registration Options.....', 'INFO');
		});
	});

	//Set Different Value For 'Full Name' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.echo('/*************************VERIFYING ALL CASES OF FULL NAME********************', 'INFO');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.echo('REOPEN Default Registration Options', 'INFO');
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
				test.assertExists('form[name="posts"] button');
				this.click('form[name="posts"] button');
			});

			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'fullName_'+responseData.required+'_'+responseData.visibility+'.png');
				this.thenOpen(config.url, function() {
					loginToFrontEnd(casper, function() {
						casper.echo('loaded edit profile page', 'INFO');	
						casper.capture(screenShotsDir + 'fullName_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
						if (responseData.visibility == '1') {
							test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
						} else {
							test.assertExists('form[name="PostTopic"] input[name="name"]');
							if (responseData.required == '1') {
								editToProfile(json.blankFullnameData, casper, function() {
									test.assertExists('#moderator-panel div[role="alert"]');
									var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
									if(successMessage && successMessage != "") {
										verifySuccessMsg(successMessage, 'Your settings have been updated.', 'blankFullNameWithRequired', casper);
									}
								});
							} else {
								editToProfile(json.fullnameData, casper, function() {
									test.assertExists('#moderator-panel div[role="alert"]');
									var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
									if(successMessage && successMessage != "") {
										verifySuccessMsg(successMessage, 'Your settings have been updated.', 'fullNameWithRequired', casper);
									}
								});
							}
						}
						casper.wait(5000,function(){
							this.capture(screenShotsDir + 'register_submit.png');
							redirectToLogout(casper, test, function() {
								casper.echo('FULL NAME TASK COMPLETED', 'INFO');
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
			casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.echo('REOPEN Default Registration Options', 'INFO');
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
				test.assertExists('form[name="posts"] button');
				this.click('form[name="posts"] button');
			});

			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'instantMessaging_'+responseData.required+'_'+responseData.visibility+'.png');
				this.thenOpen(config.url, function() {
					loginToFrontEnd(casper, function() {
						casper.echo('loaded edit profile page', 'INFO');	
						casper.capture(screenShotsDir + 'instantMessaging_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
						if (responseData.visibility == '1') {
							test.assertDoesntExist('form[name="PostTopic"] input[name="imType"]');
						} else {
							casper.fillSelectors('form[name="PostTopic"]', {
								'select[name="imType"]' :  'Google'
							}, false);
							test.assertExists('form[name="PostTopic"] input[name="imID"]');
							if (responseData.required == '1') {
								editToProfile(json['imIdBlankData'], casper, function() {
									var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
									if(errorMsg && errorMsg != "") {
										verifyErrorMsg(errorMsg, "Please enter your screen name.", 'blankImIDWithRequired', casper);
									}
								});
							} else {
								editToProfile(json['imIdBlankData'], casper, function() {
									var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
									verifyErrorMsg(errorMsg, 'Please enter your screen name.', 'BlankIM_ID', casper);
									casper.echo('Processing to registration on forum.....', 'INFO');
								});
								editToProfile(json['imIdData'], casper, function() {
									test.assertExists('#moderator-panel div[role="alert"]');
									var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
									if(successMessage && successMessage != "") {
										verifySuccessMsg(successMessage, 'Your settings have been updated.', 'successIM_ID', casper);
									}
								});
							}
						}
						casper.wait(5000,function(){
							this.capture(screenShotsDir + 'register_submit.png');
							redirectToLogout(casper, test, function() {
								casper.echo('INSTANT MESSAGING TASK COMPLETED', 'INFO');
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
			casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.echo('REOPEN Default Registration Options', 'INFO');
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
				test.assertExists('form[name="posts"] button');
				this.click('form[name="posts"] button');
			});

			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'birthday_'+responseData.required+'_'+responseData.visibility+'.png');
				this.thenOpen(config.url, function() {
					loginToFrontEnd(casper, function() {
						casper.echo('loaded edit profile page', 'INFO');	
						casper.capture(screenShotsDir + 'birthday_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
						if (responseData.visibility == '1') {
							test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
						} else {
							test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
							if (responseData.required == '1') {
								editToProfile(json['dobBlankData'], casper, function() {
									var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
									if(errorMsg && errorMsg != "") {
										verifyErrorMsg(errorMsg, 'Please enter birthday.', 'blankDobWithRequired', casper);
									}
								});
							} else {
								editToProfile(json['dobBlankData'], casper, function() {
									var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
									if(errorMsg && errorMsg != "") {
										verifyErrorMsg(errorMsg, 'Please enter birthday.', 'blankDobWithRequired', casper);
									}
								});
							
								editToProfile(json['dobData'], casper, function() {
									test.assertExists('#moderator-panel div[role="alert"]');
									var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
									if(successMessage && successMessage != "") {
										verifySuccessMsg(successMessage, 'Your settings have been updated.', 'successWithBirthday', casper);
									}
								});
							}
						}
						casper.wait(5000,function(){
							this.capture(screenShotsDir + 'register_submit.png');
							redirectToLogout(casper, test, function() {
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
			casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.echo('REOPEN Default Registration Options', 'INFO');
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
				test.assertExists('form[name="posts"] button');
				this.click('form[name="posts"] button');
			});

			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'birthday_'+responseData.required+'_'+responseData.visibility+'.png');
				this.thenOpen(config.url, function() {
					loginToFrontEnd(casper, function() {
						casper.echo('loaded edit profile page', 'INFO');	
						casper.capture(screenShotsDir + 'birthday_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
						if (responseData.visibility == '1') {
						test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
						} else {
							test.assertExists('form[name="PostTopic"] div.sign-container');
							if (responseData.required == '1') {
								editToProfile(json['signatureBlankData'], casper, function() {});
							} else {
								editToProfile(json['signatureBlankData'], casper, function() {
									casper.echo('Processing to registration on forum with blank signature.....', 'INFO');
								});
							
								editToProfile(json['signatureData'], casper, function() {
									test.assertExists('#moderator-panel div[role="alert"]');
									var successMessage = casper.fetchText('#moderator-panel div[role="alert"]');
									if(successMessage && successMessage != "") {
										verifySuccessMsg(successMessage, 'Your settings have been updated.', 'fullNameWithRequired', casper);
									}
								});
							}
						}
						casper.wait(5000,function(){
							this.capture(screenShotsDir + 'register_submit.png');
							redirectToLogout(casper, test, function() {
								casper.echo('SIGNATURE TASK COMPLETED', 'INFO');
							});
						});
					});
				});
			});
		});
	});
	
	//Login To Front-End 
	casper.thenOpen(config.url, function() {
		casper.echo('/*************************VERIFYING ALL ERROR/SUCCESS MESSAGES FOR ACCOUNT SETTING ON EDIT PROFILE PAGE********************', 'INFO');
		loginToFrontEnd(casper, function() {
			casper.echo('Loaded edit profile Page', 'INFO');
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
			this.echo('account setting link not found', 'INFO');
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
				if (responseData.upass == '') {
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
				
				if (errorMessage && errorMessage != '') {
					verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper);
				} else {
					casper.log('some error occurred on updating account setting', 'info');
				}
					
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
					if(successMessage && successMessage != "") {
						verifySuccessMsg(successMessage, 'Your preferences have been updated successfully.', 'editAccount', casper);
					}
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'updatedAccountSetting.png');
						this.echo('account setting updated successfully', 'INFO');
					});
				} catch (e) {
					this.echo('Success message not found', 'INFO');
				}
			});
			
		});
	});

	//Clicking On Logout Link
	casper.then(function() {
		try {
			test.assertExists('button.dropdown-toggle span.caret');
			test.assertExists('#logout');
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from forum', 'INFO');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'logout.png');
				});
			});
		} catch (e) {
			casper.echo('logout button not found', 'INFO');
		}
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
				//this.sendKeys('#signature', '', {keepFocus: true,reset: true});
				return callback();
			});
		});
	});
};

//Method For Editing User's Account Settings
var editAccountSetting = function(userData, driver, callback) {
	if (userData.upass == '') {
		try {
			driver.test.assertExists('div#usrPwd .change-value');
			driver.click('div#usrPwd .change-value');
			driver.wait(5000, function() {
				this.sendKeys('div.editable-input input[type="password"]', userData.upass, {reset: true});
				this.click('div.editable-buttons button[type="submit"]');
				return callback();
			});
		} catch (e) {
			driver.test.assertDoesntExist('div#usrPwd .change-value');
		}
	} else if (userData.email == '') {
		try {
			driver.test.assertExists('div#usrEmail .change-value');
			driver.click('div#usrEmail .change-value');
			driver.wait(5000, function() {
				driver.sendKeys('div.editable-input input[class="form-control input-small"]', userData.email, {reset: true});
				this.click('div.editable-buttons button[type="submit"]');
				return callback();
			});
		} catch (e) {
			driver.test.assertDoesntExist('div#usrEmail .change-value');
		}
	} else if (userData.email == 'xxxxxxxxxx'){
		driver.test.assertExists('div#usrEmail .change-value');
		driver.click('div#usrEmail .change-value');
		driver.wait(5000, function() {
			driver.sendKeys('div.editable-input input[class="form-control input-small"]', userData.email, {reset: true});
			this.click('div.editable-buttons button[type="submit"]');
			return callback();
		});
	} else {
		try {
			driver.test.assertExists('div#usrPwd .change-value');
			driver.click('div#usrPwd .change-value');
			try {
				driver.wait(5000, function() {
				this.sendKeys('div.editable-input input[type="password"]', userData.upass, {reset: true});
				this.click('div.editable-buttons button[type="submit"]');
				try {
					driver.test.assertExists('div#usrEmail .change-value');
					driver.click('div#usrEmail .change-value');
					driver.wait(5000, function() {
						driver.sendKeys('div.editable-input input[class="form-control input-small"]', userData.email, {reset: true});
						this.click('div.editable-buttons button[type="submit"]');
						driver.wait(5000, function () {
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
	}	
};

//Method For Verifying Error Message On Edit Profile/Account Setting Page After Submitting Form
var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver) {
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'INFO');
	}
	driver.capture(screenShotsDir + 'Error_OnEdit' +msgTitle+ '.png');
};

//Method For Verifying Success Message On Edit Profile Page/Account Setting page After Submitting Form
var verifySuccessMsg = function(successMessage, expectedSuccessMsg, msgTitle, driver) {
	if((successMessage == expectedSuccessMsg) || (successMessage.indexOf(expectedSuccessMsg) > -1)) {
		driver.echo('Success message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'INFO');
	}
	driver.capture(screenShotsDir + 'Success_OnEdit' +msgTitle+ '.png');
};

//Logout To Forum Front End
var redirectToLogout = function(driver, test, callback) {
	driver.then(function() {
		this.test.assertExists('button.dropdown-toggle span.caret');
		this.test.assertExists('#logout');
		forumLogin.logoutFromApp(driver, function() {
			driver.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
				this.echo('Successfully logout from forum', 'INFO');
			});
		});
		return callback();
	});
};
