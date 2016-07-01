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
		this.log('alert message: ' + message, 'info');
		var expectedErrorMsg = "Please provide a signature.";
		test.assertEquals(message, expectedErrorMsg);
		this.log('Alert message is verified when user try to edit with without signature', 'info');
	});

	//Open Forum URL And Get Title 
	casper.start(config.url, function() {
		try {
			this.test.assertTitle('Automation Forum');
		} catch (e) {
			this.log('Title does not match', 'error');
		}
		this.log('Title of the page : ' +this.getTitle(), 'info');
	});

	//Login To App
	casper.then(function() {
		this.test.assertExists('#td_tab_login');
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.log('User logged-in successfully', 'info');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
			});
		});
	});

	//Clicking On User's Icon To Display User's Drop-down For Editing Profile
	casper.then(function() {
		this.test.assertExists('.default-user');
		this.click('.default-user');
		this.log('clicked on users icon successfully', 'info');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'userIcon.png');
		});	
	}); 

	//Clicking On 'Edit Profile' link
	casper.then(function() {
		this.test.assertExists('a[href^="/register/register?edit="]');
		this.click('a[href^="/register/register?edit="]');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'useredit_form.png');
			this.log('clicked on user edit profile link successfully', 'info');
		});
	});

	//Fill Blank/Invalid Data On Edit Profile Page And Verifying Errors
	casper.then(function() {
		this.eachThen(json['invalidDataForEditProfile'], function(response) {
			casper.log('Response Data : ' +JSON.stringify(response.data), 'info');
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
					casper.log('some error occurred on updating edirt profile', 'info');
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
					this.log('Actual Success Message : '+successMessage.trim(), 'info');
					this.log('Ecpected Success Message : '+json.validDataForEditProfile.expectedSuccessMsg, 'info');
					test.assertEquals(successMessage.trim(),json.validDataForEditProfile.expectedSuccessMsg);
					this.log('Success message is verified when user try to edit with valid data', 'info');
					casper.wait(5000,function(){
						this.capture(screenShotsDir+ 'updatedEditProfile.png');
						this.log('Profile Updated Successfully', 'info');
					});
				} catch (e) {
					this.log('success message not found', 'error');
				}
			});
		});
	});

	//Clicking On User's 'Account Settings' link For Editing User's Account Setting
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register?action=preferences&userid="]');
			this.click('a[href^="/register?action=preferences&userid="]');
			this.log('clicked on users account settings link successfully', 'info');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'userAccountSetting_form.png');
			});
		} catch (e) {
			this.log('account setting link not found', 'error');
		}
	});

	//Fill Blank/Invalid Data On Account Setting Page And Verifying Errors
	casper.then(function() {
			this.eachThen(json['invalidDataForAccount'], function(response) {
			casper.log('Response Data : ' +JSON.stringify(response.data), 'info');
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
					this.log('Actual Success Message : '+successMessage.trim(), 'info');
					this.log('Ecpected Success Message : '+json.validDataForEditAccount.expectedSuccessMsg, 'info');
					test.assertEquals(successMessage.trim(),json.validDataForEditAccount.expectedSuccessMsg);
					this.log('Success message is verified when user try to edit account setting and preferences with valid data', 'info');
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'updatedAccountSetting.png');
						this.log('account setting updated successfully', 'info');
					});
				} catch (e) {
					this.log('Success message not found', 'error');
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
				casper.log('Successfully logout from forum', 'info');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'logout.png');
				});
			});
		} catch (e) {
			casper.log('logout button not found', 'error');
		}
	});
};
/**************************Back-end  Field Validation********************************/
editProfile.customFieldsTest = function(casper, test) {

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.log('alert message: ' + message, 'info');
		var expectedErrorMsg = 'Please provide a signature.';
		test.assertEquals(message, expectedErrorMsg);
		this.log('Alert message is verified when user try to edit with without signature', 'info');
	});

	//Login To Forum BackEnd
	forumRegister.loginToForumBackEnd(casper, test, function() {
		casper.log('Logged-in successfully from back-end', 'info');		
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
			this.log('Successfully Open Default Registration Options.....', 'info');
		});
	});

	//Set Different Value For 'Full Name' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.log('/*************************VERIFYING ALL CASES OF FULL NAME********************', 'info');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.log('REOPEN Default Registration Options', 'info');
			});
	
			casper.log('Response Data : ' +JSON.stringify(response.data), 'info');
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
						casper.log('loaded edit profile page', 'info');	
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
								casper.log('FULL NAME TASK COMPLETED', 'info');
							});
						});
					});
				});
			});
		});
	});

	//Set Different Value For 'Instant Messaging' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.log('/*************************VERIFYING ALL CASES OF INSTANT MESSAGING********************', 'info');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.log('REOPEN Default Registration Options', 'info');
			});
	
			casper.log('Response Data : ' +JSON.stringify(response.data), 'info');
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
						casper.log('loaded edit profile page', 'info');	
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
									casper.log('Processing to registration on forum.....', 'info');
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
								casper.log('INSTANT MESSAGING TASK COMPLETED', 'info');
							});
						});
					});
				});
			});
		});
	});

	//Set Different Value For 'Birthday' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.log('/*************************VERIFYING ALL CASES OF BIRTH DAY********************', 'info');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.log('REOPEN Default Registration Options', 'info');
			});
	
			casper.log('Response Data : ' +JSON.stringify(response.data), 'info');
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
						casper.log('loaded edit profile page', 'info');	
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
								casper.log('BIRTHDAY TASK COMPLETED','info');
							});
						});
					});
				});
			});
		});
	});

	//Set Different Value For 'Signature' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Edit Profile
	casper.then(function() {
		casper.log('/*************************VERIFYING ALL CASES OF SIGNATURE********************', 'info');
		this.eachThen(json['setDefaultBackendSetting'], function(response) {
			casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.log('REOPEN Default Registration Options', 'info');
			});
	
			casper.log('Response Data : ' +JSON.stringify(response.data), 'info');
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
						casper.log('loaded edit profile page', 'info');	
						casper.capture(screenShotsDir + 'birthday_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
						if (responseData.visibility == '1') {
						test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
						} else {
							test.assertExists('form[name="PostTopic"] div.sign-container');
							if (responseData.required == '1') {
								editToProfile(json['signatureBlankData'], casper, function() {});
							} else {
								editToProfile(json['signatureBlankData'], casper, function() {
									casper.log('Processing to registration on forum with blank signature.....', 'info');
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
								casper.log('SIGNATURE TASK COMPLETED');
							});
						});
					});
				});
			});
		});
	});
	
	//Login To Front-End 
	casper.thenOpen(config.url, function() {
		casper.log('/*************************VERIFYING ALL ERROR/SUCCESS MESSAGES FOR ACCOUNT SETTING ON EDIT PROFILE PAGE********************', 'info');
		loginToFrontEnd(casper, function() {
			casper.log('Loaded edit profile Page', 'info');
		});
	});

	//Clicking On User's 'Account Settings' link For Editing User's Account Setting
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register?action=preferences&userid="]');
			this.click('a[href^="/register?action=preferences&userid="]');
			this.log('clicked on users account settings link successfully', 'info');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'userAccountSetting_form.png');
			});
		} catch (e) {
			this.log('account setting link not found', 'info');
		}
	});

	//Fill Blank/Invalid Data On Account Setting Page And Verifying Errors
	casper.then(function() {
			this.eachThen(json['invalidDataForAccount'], function(response) {
			casper.log('Response Data : ' +JSON.stringify(response.data), 'info');
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
						this.log('account setting updated successfully', 'info');
					});
				} catch (e) {
					this.log('Success message not found', 'info');
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
				casper.log('Successfully logout from forum', 'info');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'logout.png');
				});
			});
		} catch (e) {
			casper.log('logout button not found', 'info');
		}
	});
};

/*****************************************PRIVATE METHODS****************************************/

//Method For Login To Front-end And Move To Edit Profile Page
var loginToFrontEnd = function(driver, callback) {

	//Login To App
	driver.then(function() {
		this.test.assertExists('#td_tab_login');
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, driver, function() {
			driver.log('User logged-in successfully', 'info');
			driver.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
			});
		});

	});

	//Clicking On User's Icon To Display User's Drop-down For Editing Profile
	driver.then(function() {
			this.test.assertExists('.default-user');
			this.click('.default-user');
			this.log('clicked on users icon successfully', 'info');
			driver.wait(5000, function() {
				this.capture(screenShotsDir+ 'userIcon.png');
			});
	}); 

	//Clicking On 'Edit Profile' link
	driver.then(function() {
			this.test.assertExists('a[href^="/register/register?edit="]');
			this.click('a[href^="/register/register?edit="]');
			this.log('clicked on user edit profile link successfully', 'info');
			driver.wait(5000, function() {
				this.capture(screenShotsDir+ 'useredit_form.png');
return callback();
			});
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
		driver.test.assertExists('div#usrPwd .change-value');
		driver.click('div#usrPwd .change-value');
		driver.wait(5000, function() {
			this.sendKeys('div.editable-input input[type="password"]', userData.upass, {reset: true});
			this.click('div.editable-buttons button[type="submit"]');
			return callback();
		});
	} else if (userData.email == '') {
		driver.test.assertExists('div#usrEmail .change-value');
		driver.click('div#usrEmail .change-value');
		driver.wait(5000, function() {
			driver.sendKeys('div.editable-input input[class="form-control input-small"]', userData.email, {reset: true});
			this.click('div.editable-buttons button[type="submit"]');
			return callback();
		});
	} else if (userData.email == 'xxxxxxxxxx'){
		driver.test.assertExists('div#usrEmail .change-value');
		driver.click('div#usrEmail .change-value');
		driver.wait(5000, function() {
			driver.sendKeys('div.editable-input input[class="form-control input-small"]', userData.email, {reset: true});
			this.click('div.editable-buttons button[type="submit"]');
			return callback();
		});
	} else {
		driver.test.assertExists('div#usrPwd .change-value');
		driver.click('div#usrPwd .change-value');
		driver.wait(5000, function() {
			this.sendKeys('div.editable-input input[type="password"]', userData.upass, {reset: true});
			this.click('div.editable-buttons button[type="submit"]');
			driver.test.assertExists('div#usrEmail .change-value');
			driver.click('div#usrEmail .change-value');
			driver.wait(5000, function() {
				driver.sendKeys('div.editable-input input[class="form-control input-small"]', userData.email, {reset: true});
				this.click('div.editable-buttons button[type="submit"]');
				driver.wait(5000, function () {
					this.click('button.btn.btn-primary')
					return callback();		
				});
			
			});
		});
	}	
};

//Method For Verifying Error Message On Edit Profile/Account Setting Page After Submitting Form
var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver) {
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.log('Error message is verified when user try to edit with "' +msgTitle+'"', 'info');
	} else {
		driver.log("Error Message Is Not Correct", 'info');
	}
	driver.capture(screenShotsDir + 'Error_OnEdit' +msgTitle+ '.png');
};

//Method For Verifying Success Message On Edit Profile Page/Account Setting page After Submitting Form
var verifySuccessMsg = function(successMessage, expectedSuccessMsg, msgTitle, driver) {
	if((successMessage == expectedSuccessMsg) || (successMessage.indexOf(expectedSuccessMsg) > -1)) {
		driver.log('Success message is verified when user try to edit with "' +msgTitle+'"', 'info');
	} else {
		driver.log("Error Message Is Not Correct", 'info');
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
				this.log('Successfully logout from forum', 'info');
			});
		});
		return callback();
	});
};
