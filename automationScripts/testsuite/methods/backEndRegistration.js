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

//Method For Verifying Error Message On Registration Form After Submitting Form

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
