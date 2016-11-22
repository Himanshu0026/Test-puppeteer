'use strict';

var registerMethod=module.exports = {};
var json = require('../../testdata/registerData.json');
var screenShotsDir = config.screenShotsLocation + 'register/';



/************************************PRIVATE METHODS***********************************/

//Login To Forum Back End

registerMethod.loginToForumBackEnd = function(driver, test, callback) {
		
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
	return callback(null);
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

registerMethod.registerToApp = function(data, driver, callback) {
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

registerMethod.verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
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

registerMethod.redirectToLogout = function(driver, test, callback) {
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


