/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';
var forumLogin = require('./forum_login.js');
var json = require('../testdata/registerData.json');
var config = require('../config/config.json');

var forumRegister = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'register/';

forumRegister.featureTest = function(casper, test) {

	//Open Forum Backend URL And Get Title 
	
	casper.start(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox', this.getTitle());
		this.echo('Title of the page :' +this.getTitle(), 'info');
	});
	
	//Click On Login Link 

	casper.then(function() {
		test.assertExists('a#navLogin');
		this.click('a#navLogin');
		this.echo('Successfully open login form.....', 'info');
	});
	
	//Getting Screenshot After Clicking On 'Login' Link  
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'login_form.png');
	});
	
	//Filling Username/Password On Login Form
	
	casper.then(function() {
		loginToForumBackEnd(json['backEndInfo'], casper, function() {
			casper.echo('Successfully login on forum back end....', 'info');
		});
	});

	//Getting Screenshot After Submitting 'Login' Form From Backend
	
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'login_submit.png');
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
							errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
							msgTitle = 'BlankIM_ID';
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
			
			this.then(function() {
				try {
					test.assertExists('div.bmessage');
					var message = this.fetchText('div.bmessage');
					var successMsg = message.substring(0, message.indexOf('<'));
					var expectedSuccessMsg = json['validInfo'].expectedSuccessMsg;
					test.assertEquals(successMsg.trim(), expectedSuccessMsg.trim());
					casper.echo('Successfully done registration on forum.....', 'info');
					
					//Clicking On 'Back To Category' Link 

					casper.then(function() {
						test.assertExists('a[href="/categories"]');
						this.click('a[href="/categories"]');
						this.echo('Successfully back to category', 'info');
					});

					//Getting Screenshot After Clicking On 'Back To Category' Link  

					casper.wait(5000, function() {
						this.capture(screenShotsDir + 'backToCategory.png');
					});
					
					//Click On Logout Link

					casper.then(function() {
						forumLogin.logoutFromApp(casper, function(){
							casper.echo('Successfully logout from application', 'info');
						});

						//Getting Screenshot After Clicking On 'Logout' Link  

						this.wait(5000, function() {
							casper.capture(screenShotsDir + 'logout.png');
						});
					});
				} catch(e) {
					test.assertExists('#registerEditProfile div[role="alert"]');
					var errorMessage = casper.fetchText('#registerEditProfile div[role="alert"]');
					var expectedErrorMsg = "Error: It looks like you already have a forum account!";
					test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
					casper.echo('USER ALREADY REGISTERED ON FORUM.....', 'info');
				}
			});
		} else {
			test.assertDoesntExist('.pull-right a[href="/register/register"]');
		}
	});
};


/************************************PRIVATE METHODS***********************************/

//Method For Filling Data In Login Form(Back end)

var loginToForumBackEnd = function(data, driver, callback) {
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
	driver.fill('form[action="/register/create_account"]', {
		'member' : data.uname,
		'email': data.uemail,
		'pw' : data.upass,
		'name' : data.fullName,
		'name_private' : true,
		'imID' : data.imID,
		'signature' : data.usignature
	}, false);
	driver.sendKeys('input[name="birthDatepicker"]', data.birthday, {reset : true});
	driver.test.assertExists('form[action="/register/create_account"] button');
	driver.click('form[action="/register/create_account"] button');
	return callback();
};

//Method For Verifying Error Message On Registration Form After Submitting Form

var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver) {
	driver.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
	driver.capture(screenShotsDir + 'Error_RegisterWith' +msgTitle+ '.png');
};

