'use strict';
var backEndRegisterJSON = require('../../testdata/backEndRegisterData.json');
var registerMethod = require('../methods/register.js');
var backEndregisterMethodMethod = require('../methods/backEndRegistration.js');
var backEndregisterMethodTests = module.exports = {};
var wait = require('../wait.js');

//Test Case for Register With Valid Information.

backEndregisterMethodTests.validInfo = function() {

	//Login To Forum BackEnd 
	casper.echo('*****************************Case1**********************************','INFO');
	casper.echo('Register User With Valid Information','INFO');
	registerMethod.loginToForumBackEnd(casper, casper.test, function(err) {
		if(!err){
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			//Clicking On 'New User' Tab Under Users 
			wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper, function(err, isExists) {	
				if(!err){
					if(isExists) {
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a[href="/tool/members/mb/addusers"]');
						casper.click('div#ddUsers a[href="/tool/members/mb/addusers"]');
						wait.waitForElement('form[name="frmAddUser"]', casper, function(err, isExists) {	
							if(!err){
								if(isExists) {
									//Registering New User
									backEndregisterMethodMethod.registerToBackEnd(backEndRegisterJSON['validInfo'], casper, function(err) {
										if (!err) {
											wait.waitForVisible('div#ajax-msg-top', casper, function(err, isVisible){
												if(!err){
													if(isVisible){
														casper.echo('Thank you for registering....','INFO');
													}else{
														casper.echo('User Does Not Registered Successfully','ERROR');
													}
												}
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

backEndregisterMethodTests.blankUserName = function() {
	casper.then(function(){
		casper.echo('*****************************Case2********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Blank User Name','INFO');
		backEndregisterMethodMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.blankUserName, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
			}
		});
	});
};

//Test Case for Verifying Error Messages While User Registering With With Blank Email Id.

backEndregisterMethodTests.blankEmailId = function() {
	casper.then(function(){
		casper.echo('*****************************Case3********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Blank Email Id','INFO');
		backEndregisterMethodMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.blankUserEmail, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
			}
		});
	});
};



//Test Case for Verifying Error Messages While User Registering With Existing User Name.

backEndregisterMethodTests.existingUserName = function() {
	casper.then(function(){
		casper.echo('*****************************Case4************************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Existing UserName','INFO');
		backEndregisterMethodMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.existingUserName, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
			}
		});
	});
};

//Test Case for Registering User with Existing EmailId.
backEndregisterMethodTests.existingEmailId = function() {
	casper.then(function(){
		casper.echo('*****************************Case5************************************','INFO');
		casper.echo('User Registered With Existing EmailId','INFO');
		backEndregisterMethodMethod.registerToBackEnd(backEndRegisterJSON['existingEmailId'], casper, function(err) {
			if (!err) {
				wait.waitForVisible('div#ajax-msg-top', casper, function(err, isVisible){
					if(!err){
						if(isVisible){
							casper.echo('Thank you for registering....','INFO');
						}else{
							casper.echo('User Does Not Registered Successfully','ERROR');
						}
					}
				});
			} 
		});
	});
};

//Test Case for Verifying Error Messages While User Registering With Invalid Email Id.

backEndregisterMethodTests.invalidEmailId= function() {
	casper.then(function(){
		casper.echo('*****************************Case6***********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Invalid Email Id','INFO');
		backEndregisterMethodMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.invalidEmailId, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]'); 
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('a[href^="/tool/members/mb/usergroup"]');
				casper.click('a[href^="/tool/members/mb/usergroup"]');
				//Deleting User and Logout from Backend
				wait.waitForElement('form#frmChangeUsersGroup', casper, function(err, isExists) {	
					if(!err){
						if(isExists) {
							casper.fill('form#frmChangeUsersGroup', {
								'member' : backEndRegisterJSON['validInfo'].uname
							}, true);
							wait.waitForElement('a#delete_user', casper, function(err, isExists) {	
								if(!err){
									if(isExists) {
										casper.click('a#delete_user');
										casper.test.assertExists('a[data-tooltip-elm="ddAccount"]');
										casper.click('a[data-tooltip-elm="ddAccount"]');
										casper.test.assertExists('a[href="/tool/members/login?action=logout"]');
										casper.click('a[href="/tool/members/login?action=logout"]');
										wait.waitForElement('form[name="frmLogin"]', casper, function(err, isExists) {	
											if(!err){
												if(isExists) {
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


