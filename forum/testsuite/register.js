/****This script is dedicated for new user registration on the forum. It covers testing of registration page with all defined validations****/

var forumLogin = require('./forum_login.js');
var json = require('../testdata/registerData.json');
var config = require('../config/config.json');


var forumRegister = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'register/';

forumRegister.featureTest = function(casper) {
	
	"use strict";
	
	//Open Forum URL And Get Title 

	casper.start(config.url, function() {
		this.log('Title of the page :' +this.getTitle(), 'info');
	});
	
	//Click On Register Link 

	casper.then(function() {
		this.click('.pull-right a');
		this.log('Successfully open register form.....', 'info');
	});
	
	//Getting Screenshot After Clicking On 'Register' Link  
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'register_form.png');
	});
	
	//Fill Blank/Invalid Data On Registration Form And Verifying Errors
		
	casper.then(function() {
		this.eachThen(json['invalidInfo'], function(response) {
			casper.log('Response Data : ' +JSON.stringify(response.data), 'info');
			var responseData = response.data;
			registerToApp(response.data, casper, function() {
				var errorMessage = '';
				var msgTitle = '';
				if (response.data.expectedErrorMsg)
					var expectedErrorMsg = response.data.expectedErrorMsg;
				if (response.data.uname == '') {
					errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="member"]', 'data-original-title');
					msgTitle = 'BlankUsername';
				} else if (response.data.uemail == '') {
					errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
					msgTitle = 'BlankEmail';
				} else if (response.data.upass == '') {
					errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="pw"]', 'data-original-title');
					msgTitle = 'BlankPassword';
				} else if (response.data.fullName == '') {
					errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="name"]', 'data-original-title');
					msgTitle = 'BlankFullname';
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
					verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper);
				});
			});
		});
	});   
	
	//Fill Valid Data On Registration Form
		
	casper.then(function() {
		registerToApp(json['validInfo'], casper, function() {
			casper.log('Successfully registered on forum....', 'info');
		});
	});

	//Getting Screenshot After Submitting 'Register' Form  
	
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'register_submit.png');
	});
	
	//Verify For Email Verification Message
	
	casper.then(function() {
		var pendingEmailStatus = this.exists('div.bmessage');
		if (pendingEmailStatus) {
			var message = this.fetchText('div.bmessage');
			var successMsg = message.substring(0, message.indexOf('<'));
			var expectedSuccessMsg = json['validInfo'].expectedSuccessMsg;
			if(successMsg.trim() == expectedSuccessMsg.trim()) {
				this.log('**Error message is verified when user successfully registered**' , 'info');
			} else {
				this.log('**Error : Error Message Is Not Correct**', 'info');
			}
			
			//Clicking On 'Back To Category' Link 
			
			this.then(function() {
				casper.click('a[href="/categories"]');
				casper.log('Successfully back to category', 'info');
			});
			
			//Getting Screenshot After Clicking On 'Back To Category' Link  
			
			this.wait(5000, function() {
				casper.capture(screenShotsDir + 'backToCategory.png');
			});
		} 
	});
	
	//Click On Logout Link
	
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(){
			casper.log('Successfully logout from application', 'info');
		});
			
		//Getting Screenshot After Clicking On 'Logout' Link  
		
		this.wait(5000, function() {
			casper.capture(screenShotsDir + 'logout.png');
		});
	});
};


/************************************PRIVATE METHODS***********************************/

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
	driver.click('form[action="/register/create_account"] button');
	return callback();
};

//Method For Verifying Error Message On Registration Form After Submitting Form

var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver) {
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.log('**Error message is verified when user try to register with ' +msgTitle, 'info');
	} else {
		driver.log("**Error : Error Message Is Not Correct**", 'info');
	}
	driver.capture(screenShotsDir + 'Error_RegisterWith' +msgTitle+ '.png');
};

