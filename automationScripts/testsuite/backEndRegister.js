/****This script is dedicated for Back End new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';
var forumRegister = require('./register.js');
var backEndRegisterJSON = require('../testdata/backEndRegisterData.json');
var config = require('../../config/config.json');

var backEndForumRegister = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'backEndRegister/';

/**************************All Fields Required Validation****************************/

backEndForumRegister.featureTest = function(casper, test) {
	
	//Login To Forum BackEnd 
	casper.start(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			//Clicking On 'New User' Tab Under Users 
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function success(){
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/addusers"]');
				this.click('div#ddUsers a[href="/tool/members/mb/addusers"]');
				
				//Fill Invalid Data For User Registration And Handle Errors 
				this.eachThen(backEndRegisterJSON['invalidInfo'], function(response) {
					casper.log('Response Data : ' +JSON.stringify(response.data), 'INFO');
					var responseData = response.data;
					registerToBackEnd(response.data, casper, function(err) {
						if (err) {
							casper.echo("Error Occurred In Callback", "ERROR");
						} else {
							var errorMessage = '';
							var msgTitle = '';
							var expectedErrorMsg = '';
							if (response.data.expectedErrorMsg)
								expectedErrorMsg = response.data.expectedErrorMsg;
							if (response.data.uname == '') {
								errorMessage = casper.fetchText('.tooltip p');
								msgTitle = 'BlankUsername';
							} else if (response.data.uemail == '') {
								errorMessage = casper.fetchText('.tooltip p');
								msgTitle = 'BlankEmail';
							} else if (response.data.errorType == 'existWithName') {
								casper.wait(1000, function() {
									errorMessage = casper.fetchText('div[role="dialog"] div[id^="ui-id-"]');
									expectedErrorMsg = responseData.expectedErrorMsg+ '"' +responseData.uname+ '".';
									msgTitle = 'ExistUsername';
								});
							} else if (response.data.errorType == 'invalidEmail') {
								errorMessage = casper.fetchText('.tooltip p');
								msgTitle = 'InvalidEmail';
							}

							//Called Method For Verifying Error Messages
		
							casper.then(function() {
								if(errorMessage && errorMessage != "") {
									verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper);
								}
							});
						}
					});
				});
			}, function fail(){
				this.echo('Selector not found...........', 'ERROR');
			});
		});
	});
	
	//Fill Valid Data On Registration Form
	
	casper.then(function() {
		registerToBackEnd(backEndRegisterJSON['validInfo'], casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else {
				casper.echo('Processing to registration on forum back end.....', 'INFO');
				//Handling Logout And Redirecting To The Respective Page
				redirectToBackEndLogout(casper, test, function() {});
			}
		});
	});
};

/************************************PRIVATE METHODS***********************************/

//Method For Filling Data In Registration Form

var registerToBackEnd = function(data, driver, callback) {
	driver.fill('form[name="frmAddUser"]', {
		'member' : data.uname,
		'pw' : data.upass,
		'email' : data.uemail,
		'note' : data.pNote
	}, false);
	
	driver.test.assertExists('form[name="frmAddUser"] button');
	driver.click('form[name="frmAddUser"] button');
	return callback(null);
};

//Logout To Forum Back End

var redirectToBackEndLogout = function(driver, test, callback) {
	try {
		test.assertExists('div.ui-dialog');
		var errorMessage = driver.fetchText('div.ui-dialog div[id^="ui-id-"]');
		var expectedErrorMsg = "There is already a user registered with the username ";
		test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
	} catch(e) {
		test.assertDoesntExist('div.ui-dialog');
		test.assertDoesntExist('.tooltip p');
		driver.click('a[href="/tool/members/login?action=logout"]');
	}
};

//Method For Verifying Error Message On Registration Form After Submitting Form

var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver) {
	driver.echo('errorMessage : ' +errorMessage, 'INFO');
	driver.echo('expectedErrorMsg : ' +expectedErrorMsg, 'INFO');
	driver.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
	driver.capture(screenShotsDir + 'Error_RegisterWith' +msgTitle+ '.png');
	try {
		driver.test.assertExists('div.ui-dialog');
		driver.click('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only');
	} catch(e) {
		driver.test.assertDoesntExist('div.ui-dialog');
	}
};
