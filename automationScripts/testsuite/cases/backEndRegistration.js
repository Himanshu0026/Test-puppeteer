'use strict';
var backEndRegisterJSON = require('../../testdata/backEndRegisterData.json');
var forumRegister = require('../register.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var backEndForumRegisterTests = module.exports = {};
var wait = require('../wait.js');

//Test Case for Register With Valid Information.

backEndForumRegisterTests.validInfo = function() {

	//Login To Forum BackEnd 
	casper.echo('*****************************Case1**********************************','INFO');
	casper.echo('Register User With Valid Information','INFO');
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
									//Registering New User
									backEndForumRegisterMethod.registerToBackEnd(backEndRegisterJSON['validInfo'], casper, function(err) {
										if (!err) {
											casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo('Thank you for registering....','INFO');
												},function fail(){
													casper.echo('User Does Not Registered Successfully','ERROR');
											});
										} 
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
};

//Test Case for Verifying Error Messages While User Registering With Blank User Name.

backEndForumRegisterTests.blankUserName = function() {
	casper.then(function(){
		casper.echo('*****************************Case2********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Blank User Name','INFO');
		backEndForumRegisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.blankUserName, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
			}
		});
	});
};

//Test Case for Verifying Error Messages While User Registering With With Blank Email Id.

backEndForumRegisterTests.blankEmailId = function() {
	casper.then(function(){
		casper.echo('*****************************Case3********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Blank Email Id','INFO');
		backEndForumRegisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.blankUserEmail, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
			}
		});
	});
};



//Test Case for Verifying Error Messages While User Registering With Existing User Name.

backEndForumRegisterTests.existingUserName = function() {
	casper.then(function(){
		casper.echo('*****************************Case4************************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Existing UserName','INFO');
		backEndForumRegisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.existingUserName, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
			}
		});
	});
};

//Test Case for Registering User with Existing EmailId.
backEndForumRegisterTests.existingEmailId = function() {
	casper.then(function(){
		casper.echo('*****************************Case5************************************','INFO');
		casper.echo('User Registered With Existing EmailId','INFO');
		backEndForumRegisterMethod.registerToBackEnd(backEndRegisterJSON['existingEmailId'], casper, function(err) {
			if (!err) {
				casper.waitUntilVisible('div#ajax-msg-top', function success() {
					casper.echo('Thank you for registering....','INFO');
					},function fail(){
						casper.echo('User Does Not Registered Successfully','ERROR');
				});
			} 
		});
	});
};

//Test Case for Verifying Error Messages While User Registering With Invalid Email Id.

backEndForumRegisterTests.invalidEmailId= function() {
	casper.then(function(){
		casper.echo('*****************************Case6***********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Invalid Email Id','INFO');
		backEndForumRegisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.invalidEmailId, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]'); 
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('a[href^="/tool/members/mb/usergroup"]');
				casper.click('a[href^="/tool/members/mb/usergroup"]');
				//Deleting User and Logout from Backend
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
										wait.waitForElement('form[name="frmLogin"]', casper, function(err, isExist) {	
											if(!err){
												if(isExist) {
													casper.echo('Logout Succesfully......','INFO')
												} else {
													casper.echo('Unable to logout successfully', 'ERROR');
												}	
											}
										});
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
			}
		});
	});
};


