'use strict';
var backEndRegisterJSON = require('../../testdata/backEndRegisterData.json');
var registerMethod = require('../methods/register.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var backEndregisterTests = module.exports = {};
var wait = require('../wait.js');

//Test Case for Register With Valid Information.

backEndregisterTests.validInfo = function() {

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
									backEndregisterMethod.registerToBackEnd(backEndRegisterJSON['validInfo'], casper, function(err) {
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

backEndregisterTests.blankUserName = function() {
	casper.then(function(){
		casper.echo('*****************************Case2********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Blank User Name','INFO');
		backEndregisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.blankUserName, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
			}
		});
	});
};

//Test Case for Verifying Error Messages While User Registering With With Blank Email Id.

backEndregisterTests.blankEmailId = function() {
	casper.then(function(){
		casper.echo('*****************************Case3********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Blank Email Id','INFO');
		backEndregisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.blankUserEmail, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
			}
		});
	});
};

//Test Case for Registering User With Blank Password.

backEndregisterTests.blankPassword = function() {
	casper.then(function(){
		casper.echo('*****************************Case4************************************','INFO');
		casper.echo('User Registered With Blank Password ','INFO');
		backEndregisterMethod.registerToBackEnd(backEndRegisterJSON['blankUserPassword'], casper, function(err) {
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

//Test Case for Verifying Error Messages While User Registering With Existing User Name.

backEndregisterTests.existingUserName = function() {
	casper.then(function(){
		casper.echo('*****************************Case5************************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Existing UserName','INFO');
		backEndregisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.existingUserName, casper, function(err) {
			if(!err){
				casper.echo('Message Verified Successfully','INFO');
			}
		});
	});
};

//Test Case for Registering User with Existing EmailId.
backEndregisterTests.existingEmailId = function() {
	casper.then(function(){
		casper.echo('*****************************Case6************************************','INFO');
		casper.echo('User Registered With Existing EmailId','INFO');
		backEndregisterMethod.registerToBackEnd(backEndRegisterJSON['existingEmailId'], casper, function(err) {
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

backEndregisterTests.invalidEmailId= function() {
	casper.then(function(){
		casper.echo('*****************************Case7***********************************','INFO');
		casper.echo('Verifying Error Messages While User Registering With Invalid Email Id','INFO');
		backEndregisterMethod.verifyErrorMsgWithInvalidInfo(backEndRegisterJSON.invalidEmailId, casper, function(err) {
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
							//Deleting User i.e Register With Valid Information.
							backEndregisterMethod.deleteUser(backEndRegisterJSON['validInfo'],casper,function(err){
								if(!err){
									casper.echo('User Register With Valid Information Deleted Successfully','INFO');			
									casper.reload(function(){
										//Deleting User i.e Register With Blank Password.
										backEndregisterMethod.deleteUser(backEndRegisterJSON['blankUserPassword'],casper,function(err){
											if(!err){
												casper.echo('User Register With Blank User Password  Deleted Successfully','INFO');	
												casper.reload(function(){
													//Deleting User i.e Register With Existing Email Id And Logout from Backend.
													backEndregisterMethod.deleteUser(backEndRegisterJSON['existingEmailId'],casper,function(err){
														if(!err){
															casper.echo('User Register With Existing Email Id Deleted Successfully','INFO');	
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
														}
													});
												});	
											}
										});
									});			
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


