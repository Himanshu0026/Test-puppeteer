'use strict.';
var wait = require('../wait.js');
var forumLoginMethod = require('../methods/login.js');
var registerMethod = require('./register.js');
var utils = require('../utils.js');
var defaultOptionMethod=module.exports = {};
defaultOptionMethod.jsErrors = [];
var errorMessage = "";


//1.Method For Filling Data In Default Registration Options
defaultOptionMethod.registerBackUrl= function(id, jsonData, casper, callback) {
	casper.thenOpen(config.backEndUrl, function() {
		try {
			casper.test.assertExists('a[href="/tool/members/login?action=logout"]');
			casper.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			casper.test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err){
				utils.log(' Successfully Login To Forum Back End', 'INFO');

				wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper, function(err, isExist) {
					if(!err){
						if(isExist) {
							casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.test.assertExists(' div.tooltipMenu.text a[title="Specify the default behavior of profile fields and preferences"]');
							casper.click(' div.tooltipMenu.text a[title="Specify the default behavior of profile fields and preferences"]');
							utils.log(' Successfully open Default Option page', 'INFO');
							wait.waitForElement(id, casper, function(err, isExist) {
								if(!err){
									if(isExist) {
										defaultOptionMethod.defaultRegistrationOptionsField(id, jsonData, casper, function(err){
											if(!err){
												wait.waitForElement('p[align="center"] font[color="red"]', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															casper.test.assertExists('p[align="center"] font[color="red"]');
															var message = casper.fetchText('p[align="center"] font[color="red"]');
															message=message.trim();
															var expectedErrorMsg = 'Your profile fields have been updated.';
															registerMethod.verifyErrorMsg(message, expectedErrorMsg, 'Field update message ', casper, function(err) {
																if(!err){
																	wait.waitForElement('div#account_sub_menu a[data-tooltip-elm="ddAccount"]', casper, function(err, isExists) {
																		if(!err){
																			if(isExists) {
																				casper.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
																				casper.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
																				forumLoginMethod.backEndLogout(casper, function(err) {
																					if(!err){
																						utils.log(' Successfully Logout From Backend', 'INFO');
																					}
																				});
																			}else {
																				utils.log(' Account link not found', 'ERROR');
																			}
																		}
																	});
																}
															});
														} else {
															utils.log(' Default registration message not generated', 'ERROR');
														}
													}
												});
											}
										});
									} else {
										utils.log(' Default registration form not found', 'ERROR');
									}
								}
							});
						} else {
							utils.log(' Setting Link Not Found', 'ERROR');
						}
					}
				});
			}
		});
		casper.then(function(){
			return callback(null);
		});
    });
};

//2.Method For Filling Data In Default Registration Options
defaultOptionMethod.defaultRegistrationOptionsField = function(id, data, driver, callback) {
	try {
		driver.test.assertExists('form[name="posts"] select[name="required_name"]');
		if (id == 'form[name="posts"] select[name="required_name"]') {
			driver.fill('form[name="posts"]', {
				'required_name' : data.required,
				'visiblity_name' : data.visiblity,
			}, false);
		} else {
			driver.fill('form[name="posts"]', {
				'required_name' : 0,
				'visiblity_name' : 1,
			}, false);
		}
	} catch(e) {
		driver.test.assertDoesntExist('form[name="posts"] select[name="required_name"]');
	}

	try {
		driver.test.assertExists('form[name="posts"] select[name="required_imType"]');
		if (id == 'form[name="posts"] select[name="required_imType"]') {
			driver.fill('form[name="posts"] ', {
				'required_imType' : data.required,
				'visiblity_imType' : data.visiblity,
			}, false);
		} else {
			driver.fill('form[name="posts"] ', {
				'required_imType' : 0,
				'visiblity_imType' : 1,
			}, false);
		}
	} catch(e) {
		driver.test.assertDoesntExist('form[name="posts"] select[name="required_imType"]');
	}

	try {
		driver.test.assertExists('form[name="posts"] select[name="required_dob"]');
		if (id == 'form[name="posts"] select[name="required_dob"]') {
			driver.fill('form[name="posts"] ', {
				'required_dob' : data.required,
				'visiblity_dob' : data.visiblity,
			}, false);
		} else {
			driver.fill('form[name="posts"] ', {
				'required_dob' : 0,
				'visiblity_dob' : 1,
			}, false);
		}
	} catch(e) {
		driver.test.assertDoesntExist('form[name="posts"] select[name="required_dob"]');
	}

	try {
		driver.test.assertExists('form[name="posts"] select[name="required_signature"]');
		if (id == 'form[name="posts"] select[name="required_signature"]') {
			driver.fill('form[name="posts"] ', {
				'required_signature' : data.required,
				'visiblity_signature' : data.visiblity,
			}, false);
		} else {
			driver.fill('form[name="posts"] ', {
				'required_signature' : 0,
				'visiblity_signature' : 1,
			}, false);
		}
	} catch(e) {
		driver.test.assertDoesntExist('form[name="posts"] select[name="required_signature"]');
	}
	driver.wait(3000, function(){
		driver.test.assertExists('form[name="posts"] button');
		driver.click('form[name="posts"] button');
		return callback(null);
	});
};

//3.Method For Filling Data In Edit Profile Page Options
defaultOptionMethod.filldataEditProfile = function(data, driver, callback) {

	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="name"]');
		driver.fill('form[name="PostTopic"]', {
			'name' : data.value,
			'name_private': data.checkbox
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="name"]');
	}


	try {
		driver.test.assertExists('form[name="PostTopic"] select[name="imType"]');
		driver.fill('form[name="PostTopic"] ', {
			'imType' : data.value,
			'imID' : data.value
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] select[name="imType"]');
	}


	try {
		driver.test.assertExists('form[name="PostTopic"] input[name="birthDatepicker"]');
		driver.fill('form[name="PostTopic"] ', {
			'birthDatepicker' : data.value
		}, false);
	} catch(e) {
		driver.test.assertDoesntExist('form[name="PostTopic"] input[name="birthDatepicker"]');
	}


	try {
		driver.test.assertExists('a#edit_signature');
		 driver.wait(2000,function(){
			driver.test.assertExists('a#edit_signature small');
			driver.click('a#edit_signature small');
			wait.waitForElement('#signature_ifr', casper, function(err,isExist){
				if(!err){
					if(isExist) {
						casper.withFrame('signature_ifr', function() {
							casper.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});
							casper.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
							casper.sendKeys('#tinymce', data.value);
						});
					}else {
						utils.log(' signature body contain not found', 'ERROR');
					}
				}
			});
		});
	} catch(e) {
		driver.test.assertDoesntExist('a#edit_signature');
	}

	driver.test.assertExists('button[name="submit"]');
	driver.click('button[name="submit"]');
	driver.wait(2000, function(){
		var message;
		try {
			driver.test.assertExists('div.alert.alert-success.text-center');
			message = driver.fetchText('div.alert.alert-success.text-center');
			message = message.trim();
			if(message && message!== '')
			registerMethod.verifyErrorMsg(message, 'Your settings have been updated.', 'Edit Profile Page message', casper, function(err) {
				if(!err) {
					 return callback(null);
	 			 }
			});

		} catch(e) {
			driver.test.assertDoesntExist('div.alert.alert-success.text-center');

		}

		try {
			driver.test.assertExists('input.form-control.show-datepicker.input-error.error-tooltip');
			message = driver.evaluate(function(){
				var x2 = document.querySelector('#birthDatepicker').getAttribute('data-original-title');
				return x2;
			});
			message = message.trim();
			if(message && message!== '')
			registerMethod.verifyErrorMsg(message, 'Please enter birthday.', 'Edit Profile Page message', casper, function(err) {
				if(!err) {
				     return callback(null);
 			    	}
			});
		} catch(e) {
			driver.test.assertDoesntExist('input.form-control.show-datepicker.input-error.error-tooltip');
		}


		try {
			driver.test.assertExists('#imID');
			message = driver.evaluate(function(){
				var x2 = document.querySelector('#imID').getAttribute('data-original-title');
				return x2;
			});
			message = message.trim();
		  if(message && message!== '')
			registerMethod.verifyErrorMsg(message, 'Please enter your screen name', 'Edit Profile Page message', casper, function(err) {
				if(!err) {
					 return callback(null);
				 }
			 });
		} catch(e) {
			driver.test.assertDoesntExist('#imID');
		}

		try {
			driver.test.assertExists('#imType');
			message = driver.evaluate(function(){
				var x2 = document.querySelector('#imType').getAttribute('data-original-title');
				return x2;
			});
			message = message.trim();
			if(message && message!== '')
			registerMethod.verifyErrorMsg(message, 'Please enter Instant Messaging agent.', 'Edit Profile Page message', casper, function(err) {
				if(!err) {
					 return callback(null);
				}
			});
		} catch(e) {
			driver.test.assertDoesntExist('#imType');
			return callback(null);

		}
		return callback(null);
	});

};

//4.Method for Backend Setting(enable user)
defaultOptionMethod.enableUser= function(username, userType, driver, callback) {
	casper.thenOpen(config.backEndUrl, function() {
		try {
			casper.test.assertExists('a[href="/tool/members/login?action=logout"]');
			casper.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			casper.test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			 if(!err){
				utils.log(' Logged-in successfully from back-end', 'INFO');
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(!err){
						if(isExists) {
							casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
							casper.test.assertExists('div#ddUsers div a:nth-child(1)');
							casper.click('div#ddUsers div a:nth-child(1)');
							wait.waitForElement('input#autosuggest', casper, function(err, isExists) {
								if(!err){
									if(isExists) {
										casper.test.assertExists('#autosuggest');
										casper.sendKeys('#autosuggest', username, {keepFocus: true});
										casper.click('#autosuggest');
										casper.page.sendEvent("keypress", casper.page.event.key.Enter);
										casper.waitForSelector('form[name="ugfrm"]', function success(){
											var userName = casper.evaluate(function(userType){
												for(var i=2;i<6;i++){
													var x1 = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') label');
													if (x1.innerText == userType) {
														var x3 = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') input').getAttribute('value');
														return x3;
													}
												}
											}, userType);
											utils.log(' userName : ' + userName, 'INFO');
											casper.wait(2000, function(){
												casper.fillSelectors('form[name="ugfrm"]', {
													'input[type="checkbox"]' : userName
												}, true);
												casper.test.assertExists('button[title="Close"]');
												casper.click('button[title="Close"]');
												wait.waitForElement('div#account_sub_menu a[data-tooltip-elm="ddAccount"]', casper, function(err, isExists) {
													if(!err){
														if(isExists) {
															casper.test.assertExists('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
															casper.click('div#account_sub_menu a[data-tooltip-elm="ddAccount"]');
															forumLoginMethod.backEndLogout(casper, function(err) {
																if(!err){
																	utils.log(' Successfully Logout From Backend', 'INFO');
																	return callback(null);
																}
															});
														}else {
															utils.log(' Account link not found', 'ERROR');
														}
													}
												});
											});
										}, function fail(){
											utils.log(' form not found', 'ERROR');
										});
									} else {
										utils.log(' Change a Users User Group textbox not found', 'ERROR');
									}
								}
							});
						} else {
							utils.log(' Backend Menu not found', 'ERROR');
						}
					}
				});
			}
		});
	});
};
