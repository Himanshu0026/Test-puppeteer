/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';
var utils = require('./utils.js');
var forumLogin = require('./forum_login.js');
var json = require('../testdata/registerData.json');
var config = require('../../config/config.json');

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
					utils.enableorDisableCheckbox('REQreg', true, casper, function(err) {
						if (!err)
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
		this.waitForSelector('.pull-right a[href="/register/register"]', function success() {
			test.assertExists('.pull-right a[href="/register/register"]');
			this.click('.pull-right a[href="/register/register"]');
			this.echo('Successfully open register form.....', 'INFO');
		}, function fail() {
			this.echo('User didn\'t not found any register link', 'Error');
		});
	});
	
	//test case for register to application by leaving blank username and verify error message
	casper.then(function() {
		forumRegister.registerToApp(json['blankUsername'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank username and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '1.png');
				casper.waitForSelector('form[name="PostTopic"] input[name="member"]', function success() {
					var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="member"]', 'data-original-title');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, 'Please enter a username.', 'blankUsername', casper, function() {});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
		
	//test case for register to application by leaving blank email and verify error message
	casper.then(function() {
		forumRegister.registerToApp(json['blankEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank email and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '2.png');
				casper.waitForSelector('form[name="PostTopic"] input[name="email"]', function success() {
					var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, 'Please enter your email address.', 'blankEmail', casper, function() {});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
		
	//test case for register to application by leaving blank password and verify error message
	casper.then(function() {
		forumRegister.registerToApp(json['blankPassword'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank password and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '3.png');
				casper.waitForSelector('form[name="PostTopic"] input[name="pw"]', function success() {
					var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="pw"]', 'data-original-title');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, 'Please enter a password.', 'blankPassword', casper, function() {});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//test case for register to application by leaving blank im-id and verify error message
	casper.then(function() {
		forumRegister.registerToApp(json['blankImId'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank im-id and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '4.png');
				casper.waitForSelector('form[name="PostTopic"] input[name="imID"]', function success() {
					var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, 'Please enter your screen name.', 'blankImId', casper, function() {});
				}, function fail() {
					casper.echo('IM-ID field doesn\'t exists..', 'ERROR');
					casper.capture(screenShotsDir+ '44.png');
					var pageJson = JSON.parse(this.getPageContent());
					var message = pageJson.message;
					casper.echo(message, 'INFO');
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						this.waitForSelector('.pull-right a[href="/register/register"]', function success() {
							test.assertExists('.pull-right a[href="/register/register"]');
							this.click('.pull-right a[href="/register/register"]');
							this.echo('Successfully open register form.....', 'INFO');
						}, function fail() {
							this.echo('User didn\'t not found any register link', 'Error');
						});
					});
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//test case for register to application by leaving blank birthday and verify error message
	casper.then(function() {
		forumRegister.registerToApp(json['blankBirthday'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank birthday and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '5.png');
				casper.waitForSelector('form[name="PostTopic"] input[name="birthDatepicker"]', function success() {
					var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, 'Please enter birthday.', 'blankBirthday', casper, function() {});
				}, function fail() {
					casper.echo('Birthday field doesn\'t exists..', 'ERROR');
					casper.capture(screenShotsDir+ '55.png');
					var pageJson = JSON.parse(this.getPageContent());
					var message = pageJson.message;
					casper.echo(message, 'INFO');
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						this.waitForSelector('.pull-right a[href="/register/register"]', function success() {
							test.assertExists('.pull-right a[href="/register/register"]');
							this.click('.pull-right a[href="/register/register"]');
							this.echo('Successfully open register form.....', 'INFO');
						}, function fail() {
							this.echo('User didn\'t not found any register link', 'Error');
						});
					});
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//test case for register to application by leaving blank signature and verify error message
	
	casper.then(function() {
		forumRegister.registerToApp(json['blankSignature'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank signature and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '6.png');
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//test case for register to application by existing username and verify error message
	casper.then(function() {
		forumRegister.registerToApp(json['existUsername'], casper, function(err){
			if(!err) {
				casper.echo('register by existing username and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '7.png');
				casper.waitForSelector('#registerEditProfile div[role="alert"]', function success() {
					var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, 'The username "35" has already been taken.', 'existWithName', casper, function() {});
				}, function fail() {
					casper.capture(screenShotsDir+ '77.png');
					var pageJson = JSON.parse(this.getPageContent());
					var message = pageJson.message;
					casper.echo(message, 'INFO');
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						this.waitForSelector('.pull-right a[href="/register/register"]', function success() {
							test.assertExists('.pull-right a[href="/register/register"]');
							this.click('.pull-right a[href="/register/register"]');
							this.echo('Successfully open register form.....', 'INFO');
						}, function fail() {
							this.echo('User didn\'t not found any register link', 'Error');
						});
					});
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//test case for register to application by existing email and verify error message
	casper.then(function() {
		forumRegister.registerToApp(json['existEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by existing email and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '8.png');
				casper.waitForSelector('#registerEditProfile div[role="alert"]', function success() {
					var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, 'It looks like you are already registered', 'existEmail', casper, function() {});
				}, function fail() {
					casper.capture(screenShotsDir+ '88.png');
					var pageJson = JSON.parse(this.getPageContent());
					var message = pageJson.message;
					casper.echo(message, 'INFO');
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						this.waitForSelector('.pull-right a[href="/register/register"]', function success() {
							test.assertExists('.pull-right a[href="/register/register"]');
							this.click('.pull-right a[href="/register/register"]');
							this.echo('Successfully open register form.....', 'INFO');
						}, function fail() {
							this.echo('User didn\'t not found any register link', 'Error');
						});
					});
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//test case for register to application by existing username and email and verify error message
	casper.then(function() {
		forumRegister.registerToApp(json['existUsernameEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by existing username and email and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '9.png');
				casper.waitForSelector('#registerEditProfile div[role="alert"]', function success() {
					var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, 'It looks like you already have a forum account! A forum account for that username and email address combination already exists!', 'existUsernameEmail', casper, function() {});
				}, function fail() {
					casper.capture(screenShotsDir+ '99.png');
					var pageJson = JSON.parse(this.getPageContent());
					var message = pageJson.message;
					casper.echo(message, 'INFO');
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						this.waitForSelector('.pull-right a[href="/register/register"]', function success() {
							test.assertExists('.pull-right a[href="/register/register"]');
							this.click('.pull-right a[href="/register/register"]');
							this.echo('Successfully open register form.....', 'INFO');
						}, function fail() {
							this.echo('User didn\'t not found any register link', 'Error');
						});
					});
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//test case for register to application by invalid email and verify error message
	casper.then(function() {
		forumRegister.registerToApp(json['invalidEmail'], casper, function(err){
			if(!err) {
				casper.echo('register by invalid email and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '10.png');
				casper.waitForSelector('form[name="PostTopic"] input[name="email"]', function success() {
					var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
					errorMessage = errorMessage.trim();
					if(errorMessage && errorMessage!= '')
						verifyErrorMsg(errorMessage, 'You entered an invalid email address.', 'invalidEmail', casper, function() {});
				}, function fail() {
					casper.capture(screenShotsDir+ '1010.png');
					var pageJson = JSON.parse(this.getPageContent());
					var message = pageJson.message;
					casper.echo(message, 'INFO');
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						this.waitForSelector('.pull-right a[href="/register/register"]', function success() {
							test.assertExists('.pull-right a[href="/register/register"]');
							this.click('.pull-right a[href="/register/register"]');
							this.echo('Successfully open register form.....', 'INFO');
						}, function fail() {
							this.echo('User didn\'t not found any register link', 'Error');
						});
					});
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//test case for register to application by valid data and verify error message
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
	driver.then(function(){
		return callback(null);
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
	
	var actionValue = driver.evaluate(function() {   
		document.querySelector('form[name="PostTopic"]').setAttribute('action', '/register/create_account?apikey=4XXhjFbE6fBhmfFwGWkmjgPIN4UKBFDYdSWGcR4q&type=json');
		return document.querySelector('form[name="PostTopic"]').getAttribute('action');     
	});
	
	driver.test.assertExists('form[name="PostTopic"] button');
	driver.click('form[name="PostTopic"] button');
	return callback(null);		
};

//Method For Verifying Error Message On Registration Form After Submitting Form

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
			return callback(null);
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
	return callback(null);
};

