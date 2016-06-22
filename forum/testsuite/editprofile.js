/****This script is dedicated for editing user's profile and account setting on the forum. It covers testing of edit user's profile and account setting page with all defined validations****/
'use strict';
var forumLogin = require('./forum_login.js');
var json = require('../testdata/editData.json');
var config = require('../config/config.json');

var editProfile = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'editProfile/';

editProfile.featureTest = function(casper, test) {
	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.log('alert message: ' + message, 'info');
		var expectedErrorMsg = "Please provide a signature.";
		test.assertEquals(message, expectedErrorMsg);
		this.log('Alert message is verified when user try to edit with without signature', 'info');
	});

	//Method For Loading "User's Field" under settings From Backend
	/*casper.start( config.backEndUrl, function () {
		test.assertTitle('Website Toolbox');
		this.log('Title of the page :' +this.getTitle(), 'info');
		casper.then(function() {
			openBackEndFieldSetttings(casper, test, function() {
				casper.log('Loaded "Fields" under "Users" on settings from backend', 'info');		
			});
		});
	});*/
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		try {
			test.assertTitle('Automation Forum');
		} catch (e) {
			this.log('Title does not match', 'error');
		}
		this.log('Title of the page : ' +this.getTitle(), 'info');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.log('User logged-in successfully', 'info');
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
			this.log('clicked on users icon successfully', 'info');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'userIcon.png');
			});
		} catch (e) {
			this.log('Please check userName or Password. You may have entered either userName or password wrong', 'error');
		}
	}); 

	//Clicking On 'Edit Profile' link
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register?edit="]');
			this.click('a[href^="/register/register?edit="]');
			this.log('clicked on user edit profile link successfully', 'info');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'useredit_form.png');
			});
		} catch (e) {
			this.log('edit profile link not found. Please check user name or password', 'error');
		}
	});

	//Editing Upload Avatar On User's Edit Profile Page
	/*casper.then(function() {
		test.assertExist('a#attachAvatar.linkAvatarProfile');
	});*/

	//Fill Blank/Invalid Data On Edit Profile Page And Verifying Errors
	casper.then(function() {
		try {
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
		} catch (e) {
			this.log('please change some of the settings from backend', 'error');
		}
	
	});	

	// This Is Used To Reload The Current Page
	casper.then(function(){
		this.reload();
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

/************************************PRIVATE METHODS***********************************/

//Method for opening user's field from backend setting
var openBackEndFieldSetttings = function(driver, test, callback) {
	
	//Open Forum Backend URL And Get Title 
	/*driver.start(config.backEndUrl, function() {
		this.log('Title of the page :' +driver.getTitle(), 'info');
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox', driver.getTitle());
		
	});*/
	
	//Click On Login Link 
	driver.then(function() {
		test.assertExists('a#navLogin');
		this.click('a#navLogin');
		driver.wait(5000, function() {
			this.capture(screenShotsDir + 'login_form.png');
			this.log('Successfully open login form.....', 'info');
		});
	});  
	//Filling Username/Password On Login Form
	driver.then(function() {
		loginToForumBackEnd(json.backEndInfo, casper, function() {
			driver.wait(5000,function(){
				this.capture(screenShotsDir + 'login_submit.png');
				driver.log('Successfully login on forum back end....', 'info');
			});
		});
	});

	//Clicking On "Users" Tab Under Settings 
	driver.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/fields"]');
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
	});
	
	driver.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
		driver.wait(5000,function(){
			this.capture(screenShotsDir + 'Default_Registration_Options.png');
			this.log('Successfully Open Default Registration Options.....', 'info');
		});
	});
	return callback();
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
	driver.test.assertExists('#edit_signature .text-muted');
	driver.click('#edit_signature .text-muted');
	driver.fill('form[action="/register"]', {
		'name': userData.fullName,
        'imType': userData.imType,
		'imID': userData.imID,
		'signature' : userData.signature
		
    	}, false);
	driver.sendKeys('input[id=birthDatepicker]', userData.birthday, {reset: true});
	driver.wait(3000, function() {
		driver.then(function() {
			driver.test.assertExists('form[action="/register"] button[name="submit"]');
			this.click('form[action="/register"] button[name="submit"]');
			driver.wait(3000, function() {
				this.sendKeys('#signature', '', {keepFocus: true,reset: true});
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
		driver.log("Error Message Is Not Correct", 'error');
	}
	driver.capture(screenShotsDir + 'Error_OnEdit' +msgTitle+ '.png');
};
