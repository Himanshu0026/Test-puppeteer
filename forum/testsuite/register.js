/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';
var utils = require('./utils.js');
var forumLogin = require('./forum_login.js');
var json = require('../testdata/registerData.json');
var config = require('../config/config.json');

var forumRegister = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'register/';

/**************************All Fields Required Validation****************************/

forumRegister.featureTest = function(casper, test) {

	//Login To Forum BackEnd 
	casper.start(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			
			//Clicking On "General" Tab Under Settings 
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function success() {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
				casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
				casper.echo('Successfully open forum settings form.....', 'INFO');
				
				//Getting 'User Accounts' Field Value, If, Enabled, Then Filling Data For Testing
				casper.waitForSelector('#REQreg', function success() {
					utils.enableorDisableCheckbox('REQreg', true, casper, function() {
						casper.echo("User Accounts Checkbox Has Been Enabled For Registered User", 'INFO');
					});
					test.assertExists('.button.btn-m.btn-blue');
					this.click('.button.btn-m.btn-blue');
				}, function fail() {
					this.echo('ERROR OCCURRED', 'ERROR');
				});
			}, function fail() {
				this.echo('ERROR OCCURRED', 'ERROR');
			});
			
		});
	});
	
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		test.assertExists('.pull-right a[href="/register/register"]');
		this.click('.pull-right a[href="/register/register"]');
		this.echo('Successfully open register form.....', 'INFO');
	//});
			
	//casper.then(function() {
		this.eachThen(json['invalidInfo'], function(response) {
			casper.log('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			forumRegister.registerToApp(response.data, casper, function() {
				var errorMessage = '';
				var msgTitle = '';
				var expectedErrorMsg = '';
				if (response.data.expectedErrorMsg)
					expectedErrorMsg = response.data.expectedErrorMsg;
				if (response.data.uname == '') {
					errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="member"]', 'data-original-title');
					msgTitle = 'BlankUsername';
				} else if (response.data.uemail == '') {
					errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
					msgTitle = 'BlankEmail';
				} else if (response.data.upass == '') {
					errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="pw"]', 'data-original-title');
					msgTitle = 'BlankPassword';
				} else if (response.data.imID == '') {
					try {
						test.assertExists('form[name="PostTopic"] input[name="imID"]');
						errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
						msgTitle = 'BlankIM_ID';
					} catch(e) {
						test.assertDoesntExist('form[name="PostTopic"] input[name="imID"]');
					}
				} else if (response.data.birthday == '') {
					try {
						test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
						errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
						msgTitle = 'BlankBirthday';
					} catch(e) {
						test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
					}
				} else if (response.data.errorType == 'existWithName') {
					casper.wait('5000', function() {
						errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
						expectedErrorMsg = responseData.errorMsg1+ '"' +responseData.uname+ '"' +responseData.errorMsg2; 
						msgTitle = 'ExistUsername';
					});
				} else if (response.data.errorType == 'existWithEmail') {
					casper.wait('5000', function() {
						errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
						msgTitle = 'ExistEmail';
					});
				} else if (response.data.errorType == 'existWithUsernameAndEmail') {
					casper.wait('5000', function() {
						errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
						msgTitle = 'ExistUsernameAndEmail';
					});
				} else if (response.data.errorType == 'invalidBirthday') {
					casper.wait('5000', function() {
						try {
							test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
							errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
						} catch(e) {
							test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
							errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
							expectedErrorMsg = 'It looks like you already have a forum account!';
						}
						msgTitle = 'InvalidBday';
					});
				} else if (response.data.errorType == 'invalidEmail') {
					errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
					msgTitle = 'InvalidEmail';
				}

				//Called Method For Verifying Error Messages
				casper.wait('3000', function() {
					if(errorMessage && errorMessage != "") {
						verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper);
					}
				});
			});
		});
		
		//Fill Valid Data On Registration Form
		casper.then(function() {
			forumRegister.registerToApp(json['validInfo'], casper, function() {
				casper.echo('Processing to registration on forum.....', 'INFO');
				forumRegister.redirectToLogout(casper, test, function() {});
			});
		});
	
		//Handling 'Alert' While Submitting The Form
		casper.on('remote.alert', function(message) {
			var expectedErrorMsg = "Please provide a signature.";
			test.assertEquals(message, expectedErrorMsg);
			this.capture(screenShotsDir + 'Error_RegisterWithsignature.png');
		});
	});
};

/**************************registerWithSettings Field Validation****************************/

forumRegister.registerWithSettings = function(casper, test) {
	
	casper.echo('*************FULL NAME FIELD SETTINGS FROM BACKEND*******************');
	
	//Login To Forum BackEnd 
	casper.start(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});
	
	//Clicking On 'Fields' Tab Under Users 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/fields"]');
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
	});
	
	//Redirecting To 'Default Registration Options' Page
	casper.then(function() {
		test.assertExists('a[href="/tool/members/mb/fields?action=default_registration_option"]');
		this.click('a[href="/tool/members/mb/fields?action=default_registration_option"]');
	});
		
	//Getting Screenshot After Clicking On "General" Tab Under Settings 
	casper.wait(5000,function(){
		this.echo('Successfully Open Default Registration Options.....', 'INFO');
		this.capture(screenShotsDir + 'Default_Registration_Options.png');
	});
	
	//Set Different Value For 'Full Name' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Register Form
	casper.then(function() {
		this.eachThen(json['setValueOnRegister'], function(response) {
			var backurl = 'https://' +config.backendCred.uname+ '.websitetoolbox.com/';
			var settingsUrl = backurl+ 'tool/members/mb/fields?action=default_registration_option';
			this.thenOpen(settingsUrl, function() {
				this.capture(screenShotsDir + 'Default_Registration_Options_then.png');
				this.echo('REOPEN Default Registration Options.....', 'INFO');
			});
			
			this.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			this.then(function() {
				this.fillSelectors('form[name="posts"]', {
					'select[name="required_name"]' :  responseData.required,
					'select[name="visiblity_name"]' :  responseData.visibility
				}, false);
        		});
			
			this.then(function() {
				test.assertExists('form[name="posts"] button');
				this.click('form[name="posts"] button');
			});

			this.then(function() {
				this.wait(5000,function(){
					this.capture(screenShotsDir + 'fullName_'+responseData.required+'_'+responseData.visibility+'.png');
					var fronturl = config.url+ 'register/register';
					this.thenOpen(fronturl, function() {
						this.capture(screenShotsDir + 'fullName_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
						if (responseData.visibility == '1') {
							test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
						} else {
							test.assertExists('form[name="PostTopic"] input[name="name"]');
							if (responseData.required == '1') {
								forumRegister.registerToApp(json['fullnameData'], casper, function() {
									var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="name"]', 'data-original-title');
									if(errorMsg && errorMsg != "") {
										verifyErrorMsg(errorMsg, responseData.expectedErrorMsg, 'blankFullNameWithRequired', casper);
									}
								});
							} else {
								forumRegister.registerToApp(json['fullnameData'], casper, function() {
									casper.echo('Processing to registration on forum.....', 'INFO');
								});
						
								this.wait(5000,function(){
									this.capture(screenShotsDir + 'register_submit.png');
									forumRegister.redirectToLogout(casper, test, function() {
										casper.echo('FULL NAME TASK COMPLETED........', 'INFO');
									});
								});
						
							}
						}
					});
				});
			});
		});
	});
	
	//Set Different Value For 'Instant Messaging' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Register Form
	casper.then(function() {
		this.eachThen(json['setValueOnRegister'], function(response) {
			var backurl = 'https://' +config.backendCred.uname+ '.websitetoolbox.com/';
			var settingsUrl = backurl+ 'tool/members/mb/fields?action=default_registration_option';
			this.thenOpen(settingsUrl, function() {
				this.echo('REOPEN Default Registration Options.....', 'INFO');
			});
	
			this.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			this.then(function() {
				this.fillSelectors('form[name="posts"]', {
					'select[name="required_imType"]' :  responseData.required,
					'select[name="visiblity_imType"]' :  responseData.visibility
				}, false);
        		});
			
			this.then(function() {
				test.assertExists('form[name="posts"] button');
				this.click('form[name="posts"] button');
			});

			this.wait(5000,function(){
				this.capture(screenShotsDir + 'imType_'+responseData.required+'_'+responseData.visibility+'.png');
				var fronturl = config.url+ 'register/register';
				this.thenOpen(fronturl, function() {
					this.capture(screenShotsDir + 'imType_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
					if (responseData.visibility == '1') {
						test.assertDoesntExist('form[name="PostTopic"] input[name="imType"]');
					} else {
						this.fillSelectors('form[name="PostTopic"]', {
							'select[name="imType"]' :  'Google'
						}, false);
						test.assertExists('form[name="PostTopic"] input[name="imID"]');
						if (responseData.required == '1') {
							forumRegister.registerToApp(json['imIdBlankData'], casper, function() {
								var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
								if(errorMsg && errorMsg != "") {
									verifyErrorMsg(errorMsg, "Please enter your screen name.", 'blankImIDWithRequired', casper);
								}
							});
						} else {
							forumRegister.registerToApp(json['imIdBlankData'], casper, function() {
								//var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
								//verifyErrorMsg(errorMsg, 'Please enter your screen name.', 'BlankIM_ID', casper);
								casper.echo('Processing to registration on forum.....', 'INFO');
							});
							
							forumRegister.registerToApp(json['imIdData'], casper, function() {
								casper.echo('Processing to registration on forum.....', 'INFO');
							});
							
							this.wait(5000,function(){
								this.capture(screenShotsDir + 'register_submit.png');
								forumRegister.redirectToLogout(casper, test, function() {
									casper.echo('IM-ID  TASK COMPLETED........', 'INFO');
								});
							});
							
						}
					}
				});
			});
		});
	});
	
	//Set Different Value For 'Birthday' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Register Form
	casper.then(function() {
		this.eachThen(json['setValueOnRegister'], function(response) {
			var backurl = 'https://' +config.backendCred.uname+ '.websitetoolbox.com/';
			var settingsUrl = backurl+ 'tool/members/mb/fields?action=default_registration_option';
			this.thenOpen(settingsUrl, function() {
				this.echo('REOPEN Default Registration Options.....', 'INFO');
			});
	
			this.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			this.then(function() {
				this.fillSelectors('form[name="posts"]', {
					'select[name="required_dob"]' :  responseData.required,
					'select[name="visiblity_dob"]' :  responseData.visibility
				}, false);
        		});
			
			this.then(function() {
				test.assertExists('form[name="posts"] button');
				this.click('form[name="posts"] button');
			});

			this.wait(5000,function(){
				this.capture(screenShotsDir + 'dob_'+responseData.required+'_'+responseData.visibility+'.png');
				var fronturl = config.url+ 'register/register';
				this.thenOpen(fronturl, function() {
					this.capture(screenShotsDir + 'dob_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
					if (responseData.visibility == '1') {
						test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
					} else {
						test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
						if (responseData.required == '1') {
							forumRegister.registerToApp(json['dobBlankData'], casper, function() {
								var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
								if(errorMsg && errorMsg != "") {
									verifyErrorMsg(errorMsg, 'Please enter birthday.', 'blankDobWithRequired', casper);
								}
							});
						} else {
							forumRegister.registerToApp(json['dobBlankData'], casper, function() {
								casper.echo('Processing to registration on forum with blank dob.....', 'INFO');
							});
							
							forumRegister.registerToApp(json['dobData'], casper, function() {
								casper.echo('Processing to registration on forum without blank dob.....', 'INFO');
							});
							
							this.wait(5000,function(){
								this.capture(screenShotsDir + 'register_submit.png');
								forumRegister.redirectToLogout(casper, test, function() {
									casper.echo('BIRTHDAY TASK COMPLETED........', 'INFO');
								});
							});
						}
					}
				});
			});
		});
	});
	
	//Set Different Value For 'Signature' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Register Form
	casper.then(function() {
		this.eachThen(json['setValueOnRegister'], function(response) {
			var backurl = 'https://' +config.backendCred.uname+ '.websitetoolbox.com/';
			var settingsUrl = backurl+ 'tool/members/mb/fields?action=default_registration_option';
			this.thenOpen(settingsUrl, function() {
				this.echo('REOPEN Default Registration Options.....', 'INFO');
			});
	
			this.echo('Response Data : ' +JSON.stringify(response.data), 'INFO');
			var responseData = response.data;
			this.then(function() {
				this.fillSelectors('form[name="posts"]', {
					'select[name="required_signature"]' :  responseData.required,
					'select[name="visiblity_signature"]' :  responseData.visibility
				}, false);
        		});
			
			this.then(function() {
				test.assertExists('form[name="posts"] button');
				this.click('form[name="posts"] button');
			});

			this.wait(5000,function(){
				this.capture(screenShotsDir + 'signature_'+responseData.required+'_'+responseData.visibility+'.png');
				var fronturl = config.url+ 'register/register';
				this.thenOpen(fronturl, function() {
					this.capture(screenShotsDir + 'signature_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
					if (responseData.visibility == '1') {
						test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
					} else {
						test.assertExists('form[name="PostTopic"] div.sign-container');
						if (responseData.required == '1') {
							forumRegister.registerToApp(json['signatureBlankData'], casper, function() {});
						} else {
							forumRegister.registerToApp(json['signatureBlankData'], casper, function() {
								casper.echo('Processing to registration on forum with blank signature.....', 'INFO');
							});
							
							forumRegister.registerToApp(json['signatureData'], casper, function() {
								casper.echo('Processing to registration on forum without blank signature.....', 'INFO');
							});
							
							this.wait(5000,function(){
								this.capture(screenShotsDir + 'register_submit.png');
								forumRegister.redirectToLogout(casper, test, function() {
									casper.echo('SIGNATURE TASK COMPLETED........', 'INFO');
								});
							});
						}
					}
				});
			});
		});
	});
	
	casper.thenOpen(config.backEndUrl, function() {
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Handling 'Alert' While Submitting The Form
	casper.on('remote.alert', function(message) {
		var expectedErrorMsg = "Please provide a signature.";
		test.assertEquals(message, expectedErrorMsg);
		this.capture(screenShotsDir + 'Error_RegisterWithsignature.png');
	});
};


/************************************PRIVATE METHODS***********************************/

//Login To Forum Back End

forumRegister.loginToForumBackEnd = function(driver, test, callback) {
		
	//Click On Login Link 
	try{
		test.assertDoesntExist('a#navLogin');
	}catch(e){
	driver.then(function() {
		driver.wait(7000, function(){
			test.assertExists('a#navLogin');
			this.click('a#navLogin');
			this.echo('Successfully open login form.....', 'INFO');
		});
	});
	
	//Getting Screenshot After Clicking On 'Login' Link  
	
	driver.wait(7000, function() {
		this.capture(screenShotsDir + 'login_form.png');
	});
	
	//Filling Username/Password On Login Form
	
	driver.then(function() {
		fillDataToLogin(config.backendCred, driver, function() {
			driver.echo('Proccessing to login on forum back end....', 'INFO');
			
		});
	});

	//Getting Screenshot After Submitting 'Login' Form From Backend
	
	driver.wait(5000,function(){
		this.capture(screenShotsDir + 'login_submit.png');
	});
	}
	return callback();
};


//Method For Filling Data In Login Form(Back end)

var fillDataToLogin = function(data, driver, callback) {
	driver.fill('form[name="frmLogin"]', {
		'username' : data.uname,
		'password' : data.upass,
	}, false);
	driver.test.assertExists('form[name="frmLogin"] button');
	driver.click('form[name="frmLogin"] button');
	return callback();
};


//Method For Filling Data In Registration Form

forumRegister.registerToApp = function(data, driver, callback) {
	driver.fill('form[name="PostTopic"]', {
		'member' : data.uname,
		'email': data.uemail,
		'pw' : data.upass
	}, false);
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="name"]');
		driver.fill('form[name="PostTopic"]', {
			'name' : data.fullName,
			'name_private' : true
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="imID"]');
		driver.fill('form[name="PostTopic"]', {
			'imID' : data.imID
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="imID"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] div.sign-container');
		driver.fill('form[name="PostTopic"]', {
			'signature' : data.usignature
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] div.sign-container');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
		driver.sendKeys('input[name="birthDatepicker"]', data.birthday, {reset : true});
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="rules_checkbox"]');
		utils.enableorDisableCheckbox('rules_checkbox', true, driver, function() {
			casper.echo("Rules Checkbox Has Been Enabled For User", 'INFO');
		});
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="rules_checkbox"]');
	}
	
	/*driver.evaluate(function() {         
		document.querySelector('form[name="PostTopic"]').action = '/register/create_account?apikey=4XXhjFbE6fBhmfFwGWkmjgPIN4UKBFDYdSWGcR4q';     
	});*/
	driver.test.assertExists('form[name="PostTopic"] button');
	driver.click('form[name="PostTopic"] button');
	return callback();
};

//Method For Verifying Error Message On Registration Form After Submitting Form

var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver) {
	driver.echo("errorMessage : " +errorMessage, 'INFO');
	driver.echo("expectedErrorMsg : " +expectedErrorMsg, 'INFO');
	driver.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
	driver.capture(screenShotsDir + 'Error_RegisterWith' +msgTitle+ '.png');
};

//Logout To Forum Front End

forumRegister.redirectToLogout = function(driver, test, callback) {
	try {
		test.assertExists('div.bmessage');
		var message = driver.fetchText('div.bmessage');
		var successMsg = message.substring(0, message.indexOf('<'));
		var expectedSuccessMsg = json['validInfo'].expectedSuccessMsg;
		test.assertEquals(successMsg.trim(), expectedSuccessMsg.trim());
		driver.echo('Successfully done registration on forum.....', 'INFO');
		
		//Clicking On 'Back To Category' Link 

		driver.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.echo('Successfully back to category', 'INFO');
		});

		//Getting Screenshot After Clicking On 'Back To Category' Link  

		driver.wait(5000, function() {
			this.capture(screenShotsDir + 'backToCategory.png');
		});
		
		//Click On Logout Link

		driver.then(function() {
			forumLogin.logoutFromApp(driver, function(){
				driver.echo('Successfully logout from application', 'INFO');
			});

			//Getting Screenshot After Clicking On 'Logout' Link  

			this.wait(5000, function() {
				this.capture(screenShotsDir + 'logout.png');
			});
		});
	} catch(e) {
		try {
			test.assertExists('#registerEditProfile div[role="alert"]');
			var errorMessage = driver.fetchText('#registerEditProfile div[role="alert"]');
			var expectedErrorMsg = "It looks like you already have a forum account!";
			driver.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
			driver.echo('USER ALREADY REGISTERED ON FORUM.....', 'INFO');
			return callback();
		} catch(e1) {
			driver.echo('Successfully done registration on forum.....', 'INFO');
			
			//Click On Logout Link

			driver.then(function() {
				forumLogin.logoutFromApp(driver, function(){
					driver.echo('Successfully logout from application', 'INFO');
				});

				//Getting Screenshot After Clicking On 'Logout' Link  

				this.wait(5000, function() {
					this.capture(screenShotsDir + 'logout.png');
				});
			});
		}
	}
	return callback();
};

