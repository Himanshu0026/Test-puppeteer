'use strict';
var backEndRegisterJSON = require('../../testdata/backEndRegisterData.json');
var config = require('../../../config/config.json');
var forumRegister = require('../register.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var backEndForumRegisterTests = module.exports = {};
var wait = require('../wait.js');

//Method To Verifying Error Messages While User Registering With Blank User Name.

backEndForumRegisterTests.VerifyingErrorMessagesWithBlankUserName = function() {

	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
	});

	//Login To Forum BackEnd 
	casper.start(config.backEndUrl, function() {
		this.echo("Title of the page :"+this.getTitle(), 'INFO');
		casper.echo('*****************************Case1**********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Blank User Name','INFO');
		forumRegister.loginToForumBackEnd(casper, casper.test, function(err) {
			if(!err){
				casper.echo('Successfully Login To Forum Back End...........', 'INFO');
				//Clicking On 'New User' Tab Under Users 
				wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper, function(err, isExist) {	
					if(!err){
						if(isExist) {
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/addusers"]');
							casper.click('div#ddUsers a[href="/tool/members/mb/addusers"]');
							wait.waitForElement('form[name="frmAddUser"]', casper, function(err, isExist) {	
								if(!err){
									if(isExist) {
										//Calling Method To Verify Error Message.
										backEndForumRegisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.blankUserName, casper, function(err) {
											if(!err){}
										});
									} else {
										casper.echo('Form  to register user is not visible in 5 seconds','ERROR');
									}	
								}
							});
						} else {
							casper.echo('Selector not found...........', 'ERROR');
						}	
					}
				});
			}
		});
	});
};

//Method To Verifying Error Messages While User Registering With Blank User Email Id.

backEndForumRegisterTests.VerifyingErrorMessagesWithBlankUserEmail = function() {

	casper.then(function(){
		casper.echo('*****************************Case2********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Blank EmailId','INFO');
		backEndForumRegisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.blankUserEmail, casper, function(err) {
			if(!err){}
		});
	});
};

//Method To Verifying Error Messages While User Registering With Existing User Name.

backEndForumRegisterTests.VerifyingErrorMessagesWithExistingUserName = function() {

	casper.then(function(){
		casper.echo('*****************************Case3************************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Existing UserName','INFO');
		backEndForumRegisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.existingUserName, casper, function(err) {
			if(!err){}
		});
	});
};

//Method To Verifying Error Messages While User Registering With Invalid Email Id.

backEndForumRegisterTests.VerifyingErrorMessagesWithInvalidEmailId= function() {

	casper.then(function(){
		casper.echo('*****************************Case4***********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Invalid Email Id','INFO');
		backEndForumRegisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.invalidEmailId, casper, function(err) {
			if(!err){}
		});
	});
};

//Method To Register User With Valid Information..
backEndForumRegisterTests.registerToBackEndWithValidInfo = function() {

	casper.then(function(){
		casper.echo('*****************************Case5**********************************','INFO');
		casper.echo('Register User With Valid Information','INFO');
		backEndForumRegisterMethod.registerToBackEnd(backEndRegisterJSON['validInfo'], casper, function(err) {
			if (!err) {
				//Deleting User And Logout From Application
				casper.waitUntilVisible('div#ajax-msg-top', function success() {
					casper.echo('User Registered Successfully....','INFO');
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]'); 
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					casper.test.assertExists('a[href^="/tool/members/mb/usergroup"]');
					casper.click('a[href^="/tool/members/mb/usergroup"]');
					wait.waitForElement('form#frmChangeUsersGroup', casper, function(err, isExist) {	
						if(!err){
							if(isExist) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : backEndRegisterJSON['validInfo'].uname
								}, true);
								wait.waitForElement('a#delete_user', casper, function(err, isExist) {	
									if(!err){
										if(isExist) {
											casper.click('a#delete_user');
											casper.test.assertExists('a[data-tooltip-elm="ddAccount"]');
											casper.click('a[data-tooltip-elm="ddAccount"]');
											casper.test.assertExists('a[href="/tool/members/login?action=logout"]');
											casper.click('a[href="/tool/members/login?action=logout"]');
										} else {
											casper.echo('Delete User Button Not Visible in 5 seconds', 'ERROR');
										}	
									}
								});
							} else {
								casper.echo('Change User Group Permission Not Found', 'ERROR');
							}	
						}
					});
					},function fail(){
						casper.echo('User Does Not Registered Successfully','ERROR');
				});
			} 
		});
	});
};
