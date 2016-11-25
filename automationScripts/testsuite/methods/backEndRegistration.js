/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict';

var backEndForumRegisterMethod = module.exports = {};
var wait = require('../wait.js');

//Method For Filling Data In Registration Form

backEndForumRegisterMethod.registerToBackEnd = function(data, driver, callback) {
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

backEndForumRegisterMethod.redirectToBackEndLogout = function(driver, test, callback) {
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
	return callback(null);
};

//Method For Verifying Error Message On Registration Form After Submitting Form.

backEndForumRegisterMethod.verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver,callback) {
	driver.echo('errorMessage : ' +errorMessage, 'INFO');
	driver.echo('expectedErrorMsg : ' +expectedErrorMsg, 'INFO');
	driver.test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
	try {
		driver.test.assertExists('div.ui-dialog');
		driver.click('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only');
	} catch(e) {
		driver.test.assertDoesntExist('div.ui-dialog');
	}
	return callback(null);
};

//Common Method For Verifying Error Message While User Registering with Any Invalid Information.

backEndForumRegisterMethod.verifyErrorMsgWithInvalidInfo = function(data, driver, callback) {
	backEndForumRegisterMethod.registerToBackEnd(data, driver, function(err) {
		if (!err) {
			var errorMessage;
			var msgTitle;
			var expectedErrorMsg;
			if (data.expectedErrorMsg)
				expectedErrorMsg = data.expectedErrorMsg;
			if (data.uname == '') {
				errorMessage = driver.fetchText('.tooltip p');
				msgTitle = 'BlankUsername';
			} else if (data.uemail == '') {
				wait.waitForTime(1000, driver, function(err){
					if(!err){
						errorMessage = driver.fetchText('.tooltip p');
						msgTitle = 'BlankEmail';
					}
				});
			} else if (data.errorType == 'existWithName') {
				wait.waitForTime(1000, driver, function(err){
					if(!err){
						errorMessage = driver.fetchText('div[role="dialog"] div[id^="ui-id-"]');
						expectedErrorMsg = data.expectedErrorMsg+ '"' +data.uname+ '".';
						msgTitle = 'ExistUsername';
					}
				});
			} else if (data.errorType == 'invalidEmail') {
				errorMessage = driver.fetchText('.tooltip p');
				msgTitle = 'InvalidEmail';
			}
			//Call Method For Verifying Error Messages
			driver.then(function() {
				 if(errorMessage && errorMessage != "") {
					backEndForumRegisterMethod.verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, driver,function(err){
						if(!err){
							return callback(null);
						}
					});
				}
			});
		} 
	});
};

//Method For Deleting User.

backEndForumRegisterMethod.deleteUser = function(data, driver, callback) {
	driver.fill('form#frmChangeUsersGroup', {
		'member' : data.uname
	}, true);
	wait.waitForElement('a#delete_user', driver, function(err, isExists) {	
		if(!err){
			if(isExists) {
				driver.click('a#delete_user');
				wait.waitForTime(2000, driver, function(err){
					if(!err){
						return callback(null);
					}
				});
			} else {
				driver.echo('Delete User Button Not Visible in 5 seconds', 'ERROR');
			}	
		}
	});
};

