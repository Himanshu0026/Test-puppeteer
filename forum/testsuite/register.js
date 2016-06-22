/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';
var forumLogin = require('./forum_login.js');
var json = require('../testdata/registerData.json');
var config = require('../config/config.json');

var forumRegister = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'register/';

/**************************All Fields Required Validation****************************/

forumRegister.featureTest = function(casper, test) {

	//Login To Forum BackEnd 
	
	loginToForumBackEnd(casper, test, function() {
		casper.echo('Successfully Login To Forum Back End...........', 'Info');
	});
	
	//Clicking On "General" Tab Under Settings 
	
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		this.echo('Successfully open forum settings form.....', 'info');
	});
	
	//Getting Screenshot After Clicking On "General" Tab Under Settings 
	
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'forum_settings.png');
	});
	
	//Getting 'User Accounts' Field Value, If, Enabled, Then Filling Data For Testing
		
	casper.then(function(){
		test.assertExists('#REQreg');
		var element = this.evaluate(function () {
			return document.getElementById('REQreg').checked;
		});
		if(element) {
			this.thenOpen(config.url, function() {
				test.assertTitle('Automation Forum', this.getTitle());
				this.echo('Title of the page :' +this.getTitle(), 'info');
				test.assertExists('.pull-right a[href="/register/register"]');
				this.click('.pull-right a[href="/register/register"]');
				this.echo('Successfully open register form.....', 'info');
			});
			
			this.wait(5000, function() {
				this.capture(screenShotsDir + 'register_form.png');
			});
			
			this.then(function() {
				this.eachThen(json['invalidInfo'], function(response) {
					casper.log('Response Data : ' +JSON.stringify(response.data), 'info');
					var responseData = response.data;
					registerToApp(response.data, casper, function() {
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
							errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
							msgTitle = 'BlankBirthday';
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
								errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
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
			});
			
			//Handling 'Alert' While Submitting The Form
	
			this.on('remote.alert', function(message) {
				var expectedErrorMsg = "Please provide a signature.";
				test.assertEquals(message, expectedErrorMsg);
				this.capture(screenShotsDir + 'Error_RegisterWithsignature.png');
			});
			
			//Fill Valid Data On Registration Form
	
			this.then(function() {
				registerToApp(json['validInfo'], casper, function() {
					//test.assertDoesntExist('form[action="/register/create_account"] button');
					casper.echo('Processing to registration on forum.....', 'info');
				});
			});

			//Getting Screenshot After Submitting 'Register' Form  

			this.wait(5000,function(){
				this.capture(screenShotsDir + 'register_submit.png');
			});
			
			//Handling Logout And Redirecting To The Respective Page
			
			this.then(function() {
				redirectToLogout(casper, test, function() {});
			});
		} else {
			test.assertDoesntExist('.pull-right a[href="/register/register"]');
		}
	});
};

/**************************Full Name Field Validation****************************/

forumRegister.customFieldsTest = function(casper, test) {
	
	casper.echo('*************OPEN FIELDS SETTING PAGE FROM BACKEND*******************');
	
	//Login To Forum BackEnd 
	
	loginToForumBackEnd(casper, test, function() {
		casper.echo('Successfully Login To Forum Back End...........', 'Info');
	});
	
	//Clicking On 'General' Tab Under Settings 
	
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/fields"]');
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
	});
	
	//Redirecting To 'Default Registration Options' Page
	
	casper.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
		this.echo('Successfully Open Default Registration Options.....', 'info');
	});
	
	//Getting Screenshot After Clicking On "General" Tab Under Settings 
	
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'Default_Registration_Options.png');
	});
	
	//Set Different Value For 'Full Name' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Register Form
	
	/*casper.then(function() {
		this.eachThen(json['setValueOnRegister'], function(response) {
			this.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.echo('REOPEN Default Registration Options.....', 'info');
			});
	
			this.echo('Response Data : ' +JSON.stringify(response.data), 'info');
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

			this.wait(5000,function(){
				this.capture(screenShotsDir + 'fullName_'+responseData.required+'_'+responseData.visibility+'.png');
				this.thenOpen("http://automation.websitetoolbox.com/register/register", function() {
					this.capture(screenShotsDir + 'fullName_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
					if (responseData.visibility == '1') {
						test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
					} else {
						test.assertExists('form[name="PostTopic"] input[name="name"]');
						if (responseData.required == '1') {
							registerToApp(json['fullnameData'], casper, function() {
								var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="name"]', 'data-original-title');
								if(errorMsg && errorMsg != "") {
									verifyErrorMsg(errorMsg, responseData.expectedErrorMsg, 'blankFullNameWithRequired', casper);
								}
							});
						} else {
							registerToApp(json['fullnameData'], casper, function() {
								casper.echo('Processing to registration on forum.....', 'info');
							});
							
							this.wait(5000,function(){
								this.capture(screenShotsDir + 'register_submit.png');
								redirectToLogout(casper, test, function() {
									casper.echo('FULL NAME TASK COMPLETED........');
								});
							});
							
						}
					}
				});
			});
		});
	});*/
	
	//Set Different Value For 'Instant Messaging' Field On 'Default Registration Options' Page And Get Result On Forum Front End And Then Fill Data On Register Form
	
	casper.then(function() {
		this.eachThen(json['setValueOnRegister'], function(response) {
			this.thenOpen('https://www.websitetoolbox.com/tool/members/mb/fields?action=default_registration_option', function() {
				this.echo('REOPEN Default Registration Options.....', 'info');
			});
	
			this.echo('Response Data : ' +JSON.stringify(response.data), 'info');
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
				this.thenOpen("http://automation.websitetoolbox.com/register/register", function() {
					this.capture(screenShotsDir + 'imType_required_'+responseData.required+'visibility_'+responseData.visibility+'.png');
					if (responseData.visibility == '1') {
						test.assertDoesntExist('form[name="PostTopic"] input[name="imType"]');
					} else {
						this.fillSelectors('form[name="PostTopic"]', {
							'select[name="imType"]' :  'Google'
						}, false);
						test.assertExists('form[name="PostTopic"] input[name="imID"]');
						if (responseData.required == '1') {
							registerToApp(json['imIdBlankData'], casper, function() {
								var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
								test.error("errorMsg : " +errorMsg);
								if(errorMsg && errorMsg != "") {
									verifyErrorMsg(errorMsg, "Please enter your screen name.", 'blankImIDWithRequired', casper);
								}
							});
						} else {
							registerToApp(json['imIdBlankData'], casper, function() {
								var errorMsg = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
								verifyErrorMsg(errorMsg, 'Please enter your screen name.', 'BlankIM_ID', casper);
								casper.echo('Processing to registration on forum.....', 'info');
							});
							
							registerToApp(json['imIdData'], casper, function() {
								casper.echo('Processing to registration on forum.....', 'info');
							});
							
							this.wait(5000,function(){
								this.capture(screenShotsDir + 'register_submit.png');
								redirectToLogout(casper, test, function() {
									casper.echo('IM-ID  TASK COMPLETED........');
								});
							});
							
						}
					}
				});
			});
		});
	});
};


/************************************PRIVATE METHODS***********************************/

//Login To Forum Back End

var loginToForumBackEnd = function(driver, test, callback) {
	
	//Open Forum Backend URL And Get Title 
	
	driver.start(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox', this.getTitle());
		this.echo('Title of the page :' +this.getTitle(), 'info');
	});
	
	//Click On Login Link 

	driver.then(function() {
		test.assertExists('a#navLogin');
		this.click('a#navLogin');
		this.echo('Successfully open login form.....', 'info');
	});
	
	//Getting Screenshot After Clicking On 'Login' Link  
	
	driver.wait(5000, function() {
		this.capture(screenShotsDir + 'login_form.png');
	});
	
	//Filling Username/Password On Login Form
	
	driver.then(function() {
		fillDataToLogin(json['backEndInfo'], driver, function() {
			driver.echo('Successfully login on forum back end....', 'info');
		});
	});

	//Getting Screenshot After Submitting 'Login' Form From Backend
	
	driver.wait(5000,function(){
		this.capture(screenShotsDir + 'login_submit.png');
	});
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

var registerToApp = function(data, driver, callback) {
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
		driver.test.assertExists('form[name="PostTopic"] input[name="signature"]');
		driver.fill('form[name="PostTopic"]', {
			'signature' : data.usignature
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="signature"]');
	}
	
	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
		driver.sendKeys('input[name="birthDatepicker"]', data.birthday, {reset : true});
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
	}
	
	driver.test.assertExists('form[action="/register/create_account"] button');
	driver.click('form[action="/register/create_account"] button');
	return callback();
};

//Method For Verifying Error Message On Registration Form After Submitting Form

var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver) {
	driver.echo("errorMessage : " +errorMessage);
	driver.echo("expectedErrorMsg : " +expectedErrorMsg);
	driver.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
	driver.capture(screenShotsDir + 'Error_RegisterWith' +msgTitle+ '.png');
};

//Logout To Forum Back End

var redirectToLogout = function(driver, test, callback) {
	try {
		test.assertExists('div.bmessage');
		var message = this.fetchText('div.bmessage');
		var successMsg = message.substring(0, message.indexOf('<'));
		var expectedSuccessMsg = json['validInfo'].expectedSuccessMsg;
		test.assertEquals(successMsg.trim(), expectedSuccessMsg.trim());
		driver.echo('Successfully done registration on forum.....', 'info');
		
		//Clicking On 'Back To Category' Link 

		driver.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.echo('Successfully back to category', 'info');
		});

		//Getting Screenshot After Clicking On 'Back To Category' Link  

		driver.wait(5000, function() {
			this.capture(screenShotsDir + 'backToCategory.png');
		});
		
		//Click On Logout Link

		driver.then(function() {
			forumLogin.logoutFromApp(driver, function(){
				driver.echo('Successfully logout from application', 'info');
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
			var expectedErrorMsg = "Error: It looks like you already have a forum account!";
			test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
			driver.echo('USER ALREADY REGISTERED ON FORUM.....', 'info');
		} catch(e1) {
			driver.echo('Successfully done registration on forum.....', 'error');
		}
	}
	return callback();
};

