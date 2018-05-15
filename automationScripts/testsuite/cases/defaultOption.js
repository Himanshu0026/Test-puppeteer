'use strict.';
var registerTests = require('./register.js');
var defaultOptionJSON = require('../../testdata/defaultOptionData.json');
var registerJSON = require('../../testdata/registerData.json');
var forumLoginMethod = require('../methods/login.js');
var registerMethod = require('../methods/register.js');
var defaultOptionMethod = require('../methods/defaultOption.js');
var wait = require('../wait.js');
var utils = require('../utils.js');
var defaultOptionTest = module.exports = {};
var errorMessage = '';
var count = 1;
var jsErrorsCount = 1;
var failedScreenshotsLocation = config.failedScreenShotsLocation+'defaultOptions/';

//Method To capture Screenshots If Any Test Case Failed
casper.test.on('fail', function(failure) {
	casper.capture(failedScreenshotsLocation + 'defaultOptions' + count + '.png');
	count++;
});

//Method To Verify JS Errors
casper.on("page.error", function(msg, trace) {
	var str = msg;
	str = str.match('TypeError:');
	if(str) {
		msg = msg + ' at line ' + trace[0].line + ' in ' + trace[0].function + ' function occurred in ' + trace[0].file + ' file';
		casper.capture(failedScreenshotsLocation + 'javaScriptErrors/jsError' + jsErrorsCount + '.png');
		jsErrorsCount++;
		defaultOptionMethod.jsErrors.push(msg);
		utils.log(' Error : ' + msg, 'ERROR');
	}
});

/************************  1.Back-end registration Setting    ****************************/

//Create Admin User
defaultOptionTest.createAdminUser = function() {
	casper.thenOpen(config.url, function() {
		utils.log(' *******************************************', 'INFO');
		utils.log(' 2.1 Admin user(registration for Admin user)', 'INFO');
		utils.log(' *******************************************', 'INFO');
		forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
			if(!err) {
				wait.waitForElement('div.alert.alert-danger.text-center', casper, function(err, isExist) {
					if(!err) {
						if(isExist) {
							var errorMessage = casper.fetchText('div.alert.alert-danger.text-center');
							errorMessage = errorMessage.trim();
							utils.log('errorMessage : ' + errorMessage, 'INFO');
							if(errorMessage && errorMessage === '') {
								if(errorMessage == 'There is no account with the username you specified.') {
									casper.click('a[href="/register/register"]');
									utils.log(' Successfully open register form.....', 'INFO');
									casper.wait(3000, function(){
										registerMethod.registerToApp(defaultOptionJSON.validInfo, casper, function(err) {
											if(!err) {
												utils.log(' Processing to registration on forum.....', 'INFO');
												registerMethod.redirectToLogout(casper, casper.test, function(err) {
													if(!err) {
														defaultOptionMethod.enableUser('sangita', 'Administrators', casper, function(err){
															if(err){
																utils.log(' Administrator User Enabled', 'INFO');
															}

														});

													}

												});

											}

										});

									});
								}
							} else {
								utils.log(' ' + defaultOptionJSON.adminLogin.username + ' Already Registered', 'INFO');
							}
						}
					}
				});
			}
		});
	});
};


/************************   2.Front end Edit profile Page with  Full Name blank data  ****************************/


//1..Back end Full Name deafult "Yes", Required "Edit Page Only"  front end Edit Profile Page  with Full name  blank data
defaultOptionTest.fullNameBlankDataEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-1 *********************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Full name  blank data', 'INFO');
		utils.log(' Test case for Back end deafult "Yes", Required "Edit Page Only" ', 'INFO');
		utils.log(' ***************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//2.Back end Full Name deafult "Yes", Required "Visible"  front end Edit Profile  with Full name  blank data
defaultOptionTest.fullNameBlankDataVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-2 **************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Full name  blank data', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Visible" ', 'INFO');
		utils.log(' ***********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//3.Back end Full Name deafult "Yes", Required "Hidden"  front end Edit Profile Page  with Full name  blank data
defaultOptionTest.fullNameBlankDataHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-3 **************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Full name  blank data', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Hidden"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' user login sucessul', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//4.Back end Full Name deafult "No", Required "Edit Profile page only "  front end Edit Profile  with Full name  blank data
defaultOptionTest.fullNameBlankDataEditProfilepageonlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-4 ********************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Full name  blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Edit Profile page only"', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//5.Back end Full Name deafult "No", Required "Visible"  front end Edit Profile Page with Full name  blank data
defaultOptionTest.fullNameBlankDataVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-5 **************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Full name  blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Visible"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//6.Back end Full Name deafult "No", Required "Hidden"  front end Edit Profile Page with with Full name  blank data
defaultOptionTest.fullNameBlankDataHiddenNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-6 **************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Full name  blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Hidden" ', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};


/************************   .3.Front end Edit profile Page with  Birthday  blank data blank data****************************/


//7.Back end Birthday  deafult "Yes", Required "Edit Page Only"  Front end Edit profile Page with  Birthday  blank data blank data
defaultOptionTest.birthdayBlankDataEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' *************************** case-7 ******************************', 'INFO');
		utils.log(' Front end Edit profile Page with  Birthday  blank data blank data', 'INFO');
		utils.log(' Test case for Back end deafult "Yes", Required "Edit Page Only" ', 'INFO');
		utils.log(' ***************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
												defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
													if(!err){
														wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
															if(!err){
																if(isExist) {
																	forumLoginMethod.logoutFromApp(casper, function(err){
																		if (!err){
																			utils.log(' Successfully logout from application', 'INFO');
																		}
																	});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//8.Back end Birthday  deafult "Yes", Required "Visible"  Front end Edit profile Page with  Birthday  blank data blank data
defaultOptionTest.birthdayBlankDataVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-8 *************************************', 'INFO');
		utils.log(' Front end Edit profile Page with  Birthday  blank data blank data', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Visible" ', 'INFO');
		utils.log(' *****************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//9.Back end Birthday  deafult "Yes", Required "Hidden" Front end Edit profile Page with  Birthday  blank data blank data
defaultOptionTest.birthdayBlankDataHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-9 *************************************', 'INFO');
		utils.log(' Front end Edit profile Page with  Birthday  blank data blank data', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Hidden"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//10.Back end Birthday  deafult "No", Required "Edit Profile page only "  Front end Edit profile Page with  Birthday  blank data blank data
defaultOptionTest.birthdayBlankDataEditProfilepageonlyNo = function() {
	casper.then(function() {
		utils.log(' ******************** case-10 ************************************', 'INFO');
		utils.log(' Front end Edit profile Page with  Birthday  blank data blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Registration Page Only"', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//11.Back end Birthday  deafult "No", Required "Visible" Front end Edit profile Page with  Birthday  blank data blank data
defaultOptionTest.birthdayBlankDataVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-11 ************************************', 'INFO');
		utils.log(' Front end Edit profile Page with  Birthday  blank data blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Visible"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//12.Back end Birthday  deafult "No", Required "Hidden" Front end Edit profile Page with  Birthday  blank data blank data
defaultOptionTest.birthdayBlankDataHiddenNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-12 ************************************', 'INFO');
		utils.log(' Front end Edit profile Page with  Birthday  blank data blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Hidden" ', 'INFO');
		utils.log(' *****************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};


/************************   4.Front end Edit profile Page with Instant Messaging blank data  ****************************/


//13.Back end Instant Messaging  deafult "Yes", Required "Edit Page Only" Front end Edit profile Page with Instant Messaging blank data
defaultOptionTest.instantMessageBlankDataEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************************* case-13 *******************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Instant Message blank data ***********', 'INFO');
		utils.log(' Test case for Back end deafult "Yes", Required "Registration Page Only"', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//14.Back end Instant Messaging deafult "Yes", Required "Visible"  Front end Edit profile Page with Instant Messaging blank data
defaultOptionTest.instantMessageBlankDataVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-14 ******************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Instant Message blank data', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Visible" ', 'INFO');
		utils.log(' ***********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//15.Back end Instant Messaging  deafult "Yes", Required "Hidden"  Front end Edit profile Page with Instant Messaging blank data
defaultOptionTest.instantMessageBlankDataHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-15 ******************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Instant Message blank data', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Hidden"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});

};

//16.Back end Instant Messaging  deafult "No", Required "Edit Profile page only " Front end Edit profile Page with Instant Messaging blank data
defaultOptionTest.instantMessageBlankDataEditProfilepageonlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-16 ********************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Instant Message blank data  ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Registration Page Only"', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//17.Back end Instant Messaging  deafult "No", Required "Visible" Front end Edit profile Page with Instant Messaging blank data
defaultOptionTest.instantMessageBlankDataVisibleNo = function() {
	casper.then(function(){
		utils.log(' ********************   case-17     ************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Instant Message blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Visible"', 'INFO');
		utils.log(' ***********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err) {
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err) {
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//18.Back end Instant Messaging  deafult "No", Required "Hidden" Front end Edit profile Page with Instant Messaging blank data
defaultOptionTest.instantMessageBlankDataHiddenNo = function() {
	casper.then(function(){
		utils.log(' *******************     case-18     ************************', 'INFO');
		utils.log(' Front end Edit Profile Page with Instant Message blank data ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Hidden" ', 'INFO');
		utils.log(' ************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};


/************************   5.Front end Edit profile Page with  Signature   ****************************/


//19.Back end Signature   deafult "Yes", Required "Edit Page Only"  Front end Edit profile Page with  Signature
defaultOptionTest.signatureBlankDataEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************************** case-19 *******************************', 'INFO');
		utils.log(' Front end Edit profile Page with  Signature ****************************', 'INFO');
		utils.log(' Test case for Back end deafult "Yes", Required "Registration Page Only" ', 'INFO');
		utils.log(' ************************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//20.Back end Signature  deafult "Yes", Required "Visible" Front end Edit profile Page with  Signature
defaultOptionTest.signatureBlankDataVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-20 ***************', 'INFO');
		utils.log(' Front end Edit profile Page with  Signature ', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Visible" ', 'INFO');
		utils.log(' ***********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//21.Back end Signature   deafult "Yes", Required "Hidden"  Front end Edit profile Page with  Signature
defaultOptionTest.signatureBlankDataHiddenYes= function() {
	casper.then(function(){
		utils.log(' ******************** case-21 ***************', 'INFO');
		utils.log(' Front end Edit profile Page with  Signature ', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Hidden"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});

};

//22.Back end Signature   deafult "No", Required "Edit Profile page only "  Front end Edit profile Page with  Signature
defaultOptionTest.signatureBlankDataEditProfilepageonlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-22 ***************', 'INFO');
		utils.log(' Front end Edit profile Page with  Signature ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Registration Page Only"', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//23.Back end Signature   deafult "No", Required "Visible" Front end Edit profile Page with  Signature
defaultOptionTest.signatureBlankDataVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-23 ***************', 'INFO');
		utils.log(' Front end Edit profile Page with  Signature ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Visible"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//24.Back end Signature   deafult "No", Required "Hidden"Front end Edit profile Page with  Signature
defaultOptionTest.signatureBlankDataHiddenNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-24 ***************', 'INFO');
		utils.log(' Front end Edit profile Page with  Signature ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Hidden" ', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
									wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
												casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											defaultOptionMethod.filldataEditProfile(defaultOptionJSON.editProfile, casper, function(err) {
												if(!err){
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});

};


/*********************************************************************************************/
 /*** 2. Back end Setting with Default Registration Options and Verify front End**/
 /******************************************************************************************/

/************************   6.Front end Edit profile Page with Full Name Enable/Disable ****************************/


//25.Verify full name back end Default Value "No" Required "Hidden" Front end Edit profile Page Full Name Disable
defaultOptionTest.fullNameEditDisableHiddenNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-25 ******************************', 'INFO');
		utils.log('  Fornt End Edit profile Page Full Name Enable/Disable      ', 'INFO');
		utils.log(' Test case for Back end Default Value "No" Required "Hidden"', 'INFO');
		utils.log(' ***********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
															wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
										casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
										casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
										casper.test.assertDoesntExist('#inputname');
										utils.log(' Full Name  text not found', 'INFO');
										wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err){
															utils.log(' Successfully logout from application', 'INFO');
														}
													});
												}else {
													utils.log(' dropdown-toggle button not found', 'ERROR');
												}
											}
										});
									}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//26.Verify full name back end Default Value "No"Required "Registration Page "Front end Edit profile Page  Full nameull name Disable
defaultOptionTest.fullNameEditDisableRegistrationPageNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-26 ***********************', 'INFO');
		utils.log(' Fornt End Edit profile Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "No"Required "Registration Page " ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
																wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
										casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
										casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
										casper.test.assertDoesntExist('#inputname');
										utils.log(' Full Name  text not found', 'INFO');
										wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
											if(!err){
												if(isExist) {
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err){
															utils.log(' Successfully logout from application', 'INFO');
														}
													});
												}else {
													utils.log(' dropdown-toggle button not found', 'ERROR');
												}
											}
										});
									}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//27.verify Full name back end Default value "No"Required "Visible"Front end Edit profile Page  Full Name Enable
defaultOptionTest.fullNameEditEnableVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-27 ************************', 'INFO');
		utils.log(' Fornt End Edit profile Page  Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default value "No"Required "Visible" ', 'INFO');
		utils.log(' ************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="inputname"]');
											var message = casper.fetchText('label[for="inputname"]');
											message = message.trim();
											if(message && message!== '')
											registerMethod.verifyErrorMsg(message, 'UsernameFull Name', 'Edit Profile Page Field', casper, function(err) {
												if(!err) {
													wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
														if(!err){
															if(isExist) {
																forumLoginMethod.logoutFromApp(casper, function(err){
																	if (!err){
																		utils.log(' Successfully logout from application', 'INFO');
																	}
																});
															}else {
																utils.log(' dropdown-toggle button not found', 'ERROR');
															}
														}
													});
												}
											 });
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//28.verify Full Name Back End Default Value "NO"Required "Edit Page Only"Front End Edit Profile  Page Full Name Enable
defaultOptionTest.fullNameEditDisableEditPageOnlyNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-28 ***********************', 'INFO');
		utils.log(' Fornt End Edit profile Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "NO"Required "Edit Page Only" ', 'INFO');
		utils.log(' *******************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="inputname"]');
											var message = casper.fetchText('label[for="inputname"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//29.Verify Full Name Back End Default Value ''Yes" Required "Hidden" Front End Edit profile Page  Full Name Disable
defaultOptionTest.fullNameEditDisableHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-29 ***********************', 'INFO');
		utils.log(' Fornt End Edit profile Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Hidden" ', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('#inputname');
											utils.log(' Full Name  text not found', 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//30.verify Full Name Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Full Name Enable
defaultOptionTest.fullNameEditEnableVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-30 ***********************', 'INFO');
		utils.log(' Fornt End Edit profile Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Visible" ', 'INFO');
		utils.log(' **************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="inputname"]');
											var message = casper.fetchText('label[for="inputname"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//31.verify Full Name Back End Default Value "Yes" Required "Register page Only" Fornt End Edit profile Page  Full Name Disable
defaultOptionTest.fullNameEditDisableRegistrationPageYes= function() {
	casper.then(function(){
		utils.log(' ******************** case-31 ************************', 'INFO');
		utils.log(' Fornt End Edit profile Page  Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Register page Only"  ', 'INFO');
		utils.log(' **************************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				 if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							 if(isExist) {
								 casper.click('ul.nav.pull-right span.caret');
								 casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								 casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								 wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											 casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											 casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											 casper.test.assertDoesntExist('#inputname');
											 utils.log(' Full Name  text not found', 'INFO');
											 wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
												utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								 utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//32.verify Full Name Back End Default Value "Yes" Required "Edit Page Only" Fornt End Edit profile Page  Full Name Enable
defaultOptionTest.fullNameEditEnableEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-32 ***********************', 'INFO');
		utils.log(' Fornt End Edit profile Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Edit Page Only" ', 'INFO');
		utils.log(' *********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="inputname"]');
											var message = casper.fetchText('label[for="inputname"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};


/************************   7.Front end Edit profile Page with Birthday Picker Enable/Disable  ****************************/


//33.Verify Birthday Picker Back End Default Value "No" Required "Hidden" Front end Edit page Birthday Picker Disable
defaultOptionTest.birthdayPickerEditDisableHiddenNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-33 ******************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE BIRTHDAY ENABLE/DISABLE ******', 'INFO');
		utils.log(' Test case for Back end Default Value "No" Required "Hidden"', 'INFO');
		utils.log(' ***********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('#birthDatepicker');
											utils.log(' Text birthDatepicker not found', 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
												utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//34.Verify Birthday Picker Back End Default Value "No"Required "Registration Page "Front end Edit profile Page  Birthday Picker Disable
defaultOptionTest.birthdayPickerEditDisableRegistrationPageNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-34 ******************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  BIRTHDAY ENABLE/DISABLE *****************', 'INFO');
		utils.log(' Test case for Back end Default Value "No"Required "Registration Page " ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('#birthDatepicker');
											utils.log(' Text birthDatepicker not found', 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
												utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//35.verify Birthday Picker Back End end Default value "No"Required "Visible"Front end Edit profile Page  Birthday Picker Enable
defaultOptionTest.birthdayPickerEditEnableVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-35 *******************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE BIRTHDAY ENABLE/DISABLE *******', 'INFO');
		utils.log(' Test case for Back end Default value "No"Required "Visible" ', 'INFO');
		utils.log(' ************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											 casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											 casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											 casper.test.assertExists('label[for="bd_month"]');
											 var message = casper.fetchText('label[for="bd_month"]');
											 utils.log("message : "+message, 'INFO');
											 wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//36.verify Birthday Picker Back End Default Value "NO"Required "Edit Page Only"Front End Edit Profile  Page Birthday Picker Disable
defaultOptionTest.birthdayPickerEditDisableEditPageOnlyNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-36 **************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  BIRTHDAY ENABLE/DISABLE *************', 'INFO');
		utils.log(' Test case for Back end Default Value "NO"Required "Edit Page Only" ', 'INFO');
		utils.log(' *******************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
														wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="bd_month"]');
											var message = casper.fetchText('label[for="bd_month"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//37.Verify Birthday Picker Back End Default Value ''Yes" Required "Hidden" Front Edit profile Page  Birthday Picker Disable
defaultOptionTest.birthdayPickerEditDisableHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-37 ********************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  BIRTHDAY ENABLE/DISABLE *******', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Hidden" ', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('#birthDatepicker');
											utils.log(' Text birthDatepicker not found', 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//38.verify Birthday Picker Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Birthday Picker Enable
defaultOptionTest.birthdayPickerEditEnableVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-38 *********************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  BIRTHDAY ENABLE/DISABLE ********', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Visible" ', 'INFO');
		utils.log(' **************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="bd_month"]');
											var message = casper.fetchText('label[for="bd_month"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//39.verify Birthday Picker Back End Default Value "Yes" Required "Register page Only" Fornt End Edit profile Page  Birthday Picker Disable
defaultOptionTest.birthdayPickerEditDisableRegistrationPageYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-39 *********************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  BIRTHDAY ENABLE/DISABLE ********************', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Register page Only"  ', 'INFO');
		utils.log(' **************************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
			 if(!err) {
				 utils.log(' User login successfully ', 'INFO');
				 wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
					 if(!err){
						 if(isExist) {
							 casper.click('ul.nav.pull-right span.caret');
							 casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
							 casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('#birthDatepicker');
											utils.log(' Text birthDatepicker not found', 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											 utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								 utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//40.verify Birthday Picker Back End Default Value "Yes" Required "Edit Page Only" Fornt End Edit profile Page  Birthday Picker Enable
defaultOptionTest.birthdayPickerEditEnableEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-40 ***************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  BIRTHDAY ENABLE/DISABLE **************', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Edit Page Only" ', 'INFO');
		utils.log(' *********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
						if(isExist) {
							casper.click('ul.nav.pull-right span.caret');
							casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
							casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
									wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="bd_month"]');
											var message = casper.fetchText('label[for="bd_month"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};



/************************   8.Front end Edit profile Page with Signature Enable/Disable ****************************/


//41.Verify Signature Back End Default Value "No" Required "Hidden" Front end Edit profile Page  Signature Disable
defaultOptionTest.signatureEditDisableHiddenNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-41 ****************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE SIGNATURE ENABLE/DISABLE****', 'INFO');
		utils.log(' Test case for Back end Default Value "No" Required "Hidden"', 'INFO');
		utils.log(' ***********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('label[for="signature"]');
											utils.log(' label Signature not found', 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//42.Verify Signature Back End Default Value "No"Required "Registration Page "Front end Edit profile Page  Signature Disable
defaultOptionTest.signatureEditDisableRegistrationPageNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-42 ******************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  SIGNATURE ENABLE/DISABLE*****************', 'INFO');
		utils.log(' Test case for Back end Default Value "No"Required "Registration Page " ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('label[for="signature"]');
											utils.log(' label Signature not found', 'INFO');
											wait.waitForTime(3000 , casper , function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
														utils.log(' Successfully logout from application', 'INFO');
													}
												});
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//43.verify Signature Back End end Default value "No"Required "Visible"Front end Edit profile Page Signature Enable
defaultOptionTest.signatureEditEnableVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-43 *******************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  SIGNATURE ENABLE/DISABLE***** ', 'INFO');
		utils.log(' Test case for Back end Default value "No"Required "Visible" ', 'INFO');
		utils.log(' ************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="signature"]');
											var message = casper.fetchText('label[for="signature"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForTime(3000 , casper , function() {
												forumLoginMethod.logoutFromApp(casper, function(err){
													if (!err){
														utils.log(' Successfully logout from application', 'INFO');
													}
												});
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//44.verify Signature Back End Default Value "NO"Required "Edit Page Only"Front End Edit profile Page  Signature Disable
defaultOptionTest.signatureEditDisableEditProfilepageonlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-44 **************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  SIGNATURE ENABLE/DISABLE*************', 'INFO');
		utils.log(' Test case for Back end Default Value "NO"Required "Edit Page Only" ', 'INFO');
		utils.log(' *******************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				  utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="signature"]');
											var message = casper.fetchText('label[for="signature"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
																 });
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//45.Verify Signature Back End Default Value ''Yes" Required "Hidden" Front End Edit profile Page  Signature Disable
defaultOptionTest.signatureEditDisableHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-45 ********************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  SIGNATURE ENABLE/DISABLE*******', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Hidden" ', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('label[for="signature"]');
											utils.log(' label Signature not found', 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err){
														utils.log(' Successfully logout from application', 'INFO');
														}
														});
													}else {
													utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
										utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//46.verify Signature Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Signature Enable
defaultOptionTest.signatureEditEnableVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-46 *************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  SIGNATURE ENABLE/DISABLE', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Visible" ', 'INFO');
		utils.log(' **************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="signature"]');
											var message = casper.fetchText('label[for="signature"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err){
															utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
													utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
										utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//47.verify Signature Back End Default Value "Yes" Required "Register page Only" Fornt Edit profile Page  Signature Disable
defaultOptionTest.signatureEditDisableRegistrationPageYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-47 *************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  SIGNATURE ENABLE/DISABLE', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Register page Only"  ', 'INFO');
		utils.log(' **************************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				  utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('label[for="signature"]');
											utils.log(' label Signature not found', 'INFO');
												wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
													  forumLoginMethod.logoutFromApp(casper, function(err){
														   if (!err){
															utils.log(' Successfully logout from application', 'INFO');
														   }
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							 }else {
								 utils.log(' dropdown-toggle button not found', 'ERROR');
							 }
						 }
					 });
				 }
			 });
		 });
	});
};

//48.verify Signature Back End Default Value "Yes" Required "Edit Page Only" Fornt End Registration Page Signature Enable
defaultOptionTest.signatureEditEnableEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-48 ****************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  SIGNATURE ENABLE/DISABLE************** ', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Edit Page Only" ', 'INFO');
		utils.log(' *********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
			   utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="signature"]');
											var message = casper.fetchText('label[for="signature"]');
											utils.log("message : "+message, 'INFO');
														wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};


/************************   9.Front end Edit profile Page with Instant Message Enable/Disable  ****************************/


//49.Verify Instant Message  Back End Default Value "No" Required "Hidden" Front end Edit page Instant Message Disable
defaultOptionTest.instantMessageEditDisableHiddenNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-49 ******************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  INSTANTMESSAGE ENABLE/DISABLE', 'INFO');
		utils.log(' Test case for Back end Default Value "No" Required "Hidden"', 'INFO');
		utils.log(' ***********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('label[for="imType"]');
											utils.log(' label Instant Messaging not found', 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//50.Verify Instant Message  Back End Default Value "No"Required "Registration Page "Front end Edit profile Page Instant Message  Disable
defaultOptionTest.instantMessageEditDisableRegistrationPageNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-50 ******************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE INSTANTMESSAGE ENABLE/DISABLE*************', 'INFO');
		utils.log(' Test case for Back end Default Value "No"Required "Registration Page " ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
									wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
										if(!err){
											if(isExist) {
												casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
												casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
												casper.test.assertDoesntExist('label[for="imType"]');
												utils.log(' label Instant Messaging not found', 'INFO');
												wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
													if(!err){
														if(isExist) {
															forumLoginMethod.logoutFromApp(casper, function(err){
																if (!err){
																	utils.log(' Successfully logout from application', 'INFO');
																}
															});
														}else {
															utils.log(' dropdown-toggle button not found', 'ERROR');
														}
													}
												});
											}else {
												utils.log(' Edit Profile page not found', 'ERROR');
											}
										}
									});
								}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//51.verify Instant Message  Back End end Default value "No"Required "Visible"Front end Edit profile Page Instant Message Enable
defaultOptionTest.instantMessageEditEnableVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-51 *******************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  INSTANTMESSAGE ENABLE/DISABL**', 'INFO');
		utils.log(' Test case for Back end Default value "No"Required "Visible" ', 'INFO');
		utils.log(' ************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="imType"]');
											var message = casper.fetchText('label[for="imType"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//52.verify Instant Message  Back End Default Value "NO"Required "Edit Page Only"Front End Edit Profile  Page Instant Message  Disable
defaultOptionTest.instantMessageEditDisableEditProfile = function() {
	casper.then(function(){
		utils.log(' ******************** case-52 **************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE INSTANTMESSAGE ENABLE/DISABLE*********', 'INFO');
		utils.log(' Test case for Back end Default Value "NO"Required "Edit Page Only" ', 'INFO');
		utils.log(' *******************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="imType"]');
											var message = casper.fetchText('label[for="imType"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//53.Verify Instant Message  Back End Default Value ''Yes" Required "Hidden" Front End Edit profile Page  Instant Message  Disable
defaultOptionTest.instantMessageEditDisableHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-53 ********************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE INSTANTMESSAGE ENABLE/DISABLE***', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Hidden" ', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertDoesntExist('label[for="imType"]');
											utils.log(' label Instant Messaging not found', 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//54.verify Instant Message  Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Instant Message  Enable
defaultOptionTest.instantMessageEditEnableVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-54 *********************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE  INSTANTMESSAGE ENABLE/DISABLE***', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Visible" ', 'INFO');
		utils.log(' **************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="imType"]');
											var message = casper.fetchText('label[for="imType"]');
											utils.log("message : "+message, 'INFO');
											wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//55.verify Instant Message  Back End Default Value "Yes" Required "Register page Only" Fornt Edit profile Page  Instant Message  Disable
defaultOptionTest.instantMessageEditDisableRegistrationPageYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-55 *********************************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE INSTANTMESSAGE ENABLE/DISABLE****************', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Register page Only"  ', 'INFO');
		utils.log(' **************************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			 utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			 forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				 if(!err) {
					 utils.log(' User login successfully ', 'INFO');
					 wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						 if(!err){
							 if(isExist) {
								 casper.click('ul.nav.pull-right span.caret');
								 casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								 casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								 wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									 if(!err){
										if(isExist) {
											 casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											 casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											 casper.test.assertDoesntExist('label[for="imType"]');
											 utils.log(' label Instant Messaging not found', 'INFO');
											 wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
													forumLoginMethod.logoutFromApp(casper, function(err){
														if (!err){
															utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
										}else {
											 utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
							 utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};

//56.verify Instant Message  Back End Default Value "Yes" Required "Edit Page Only" Fornt End Edit profile Page  Instant Message  Enable
defaultOptionTest.instantMessageEnableEditPage = function() {
	casper.then(function(){
		utils.log(' ******************** case-56 ***********************************', 'INFO');
		utils.log(' FRONT END EDITE PROFILE PAGE INSTANTMESSAGE ENABLE/DISABLE******', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Edit Page Only" ', 'INFO');
		utils.log(' *********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(defaultOptionJSON.adminLogin.username, defaultOptionJSON.adminLogin.password, casper, function(err){
				if(!err) {
					utils.log(' User login successfully ', 'INFO');
					wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
						if(!err){
							if(isExist) {
								casper.click('ul.nav.pull-right span.caret');
								casper.test.assertExists('span.pull-right.user-nav-panel li:nth-child(4) a');
								casper.click('span.pull-right.user-nav-panel li:nth-child(4) a');
								wait.waitForElement('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a', casper, function(err, isExist) {
									if(!err){
										if(isExist) {
											casper.test.assertExists('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.click('div#moderator-panel div:nth-child(2) ul li:nth-child(1) a');
											casper.test.assertExists('label[for="imType"]');
											var message = casper.fetchText('label[for="imType"]');
											utils.log("message : "+message, 'INFO');
								            		wait.waitForElement('ul.nav.pull-right span.caret', casper, function(err, isExist) {
												if(!err){
													if(isExist) {
														forumLoginMethod.logoutFromApp(casper, function(err){
															if (!err){
																utils.log(' Successfully logout from application', 'INFO');
															}
														});
													}else {
														utils.log(' dropdown-toggle button not found', 'ERROR');
													}
												}
											});
									    }else {
											utils.log(' Edit Profile page not found', 'ERROR');
										}
									}
								});
							}else {
								utils.log(' dropdown-toggle button not found', 'ERROR');
							}
						}
					});
				}
			});
		});
	});
};


/******************************************************************************************************************************************/
 /*** 3.Back end Setting with Default Registration Options and Verify front end Registration with respected to blank data **/
 /****************************************************************************************************************************************/

/************************   10.Front end Registration with Full name  blank data  ****************************/

//57.Back end Full Name deafult "Yes", Required "Registration Page Only"  front end Registration with with Full name  blank data
defaultOptionTest.fullNameBlankDataRegistrationPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-57 ********************', 'INFO');
		utils.log(' Front end Registration with Full name  blank data', 'INFO');
		utils.log(' Test case for Back end deafult "Yes", Required "Registration Page Only" ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form', 'INFO');
						registerTests.blankUsername();
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//58.Back end Full Name deafult "Yes", Required "Visible"  front end Registration with with Full name  blank data
defaultOptionTest.fullNameBlankDataRegistrationVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-58 ********************', 'INFO');
		utils.log(' Front end Registration with Full name  blank data', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Visible"   ', 'INFO');
		utils.log(' *************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.blankUsername();
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
}

//59.Back end Full Name deafult "Yes", Required "Hidden"  front end Registration with with Full name  blank data
defaultOptionTest.fullNameBlankDataRegistrationHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-59 ********************', 'INFO');
		utils.log(' Front end Registration with Full name  blank data', 'INFO');
		utils.log('    Test case for deafult "Yes", Required "Hidden" ', 'INFO');
		utils.log(' *************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//60.Back end Full Name deafult "No", Required "Registration Page Only"  front end Registration with with Full name  blank data
defaultOptionTest.fullNameBlankDataRegistrationPageOnlyNo = function() {
	casper.then(function(){
		utils.log(' ********************     Case-60     ************************', 'INFO');
		utils.log(' Front end Registration with Full name  blank data        ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Registration Page Only"', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//61.Back end Full Name deafult "No", Required "Visible"  front end Registration with with Full name  blank data
defaultOptionTest.fullNameBlankDataRegistrationVisibleNo= function() {
	casper.then(function(){
		utils.log(' **************** case-61 ************************', 'INFO');
		utils.log(' Front end Registration with Full name  blank data', 'INFO');
		utils.log('   Test case for deafult "No", Required "Visible"'  , 'INFO');
		utils.log(' *************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//62.Back end Full Name deafult "No", Required "Hidden"  front end Registration with with Full name  blank data
defaultOptionTest.fullNameBlankDataRegistrationHiddenNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-62 ********************', 'INFO');
		utils.log(' Front end Registration with Full name  blank data', 'INFO');
		utils.log('   Test case for deafult "No", Required "Hidden"   ', 'INFO');
		utils.log(' *************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};


/************************   11.Front end Registration with  Birthday  blank data  ****************************/

//63.Back end Birthday deafult "Yes", Required "Registration Page Only"  front end Registration with  Birthday  blank data
defaultOptionTest.birthdayBlankDataRegistrationPageOnlyYes = function() {
	casper.then(function(){
		utils.log('  *************************case-63**************************************', 'INFO');
		utils.log(' Front end Registration with  Birthday  blank data *********************', 'INFO');
		utils.log(' Test case for Back end deafult "Yes", Required "Registration Page Only" ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							registerMethod.registerToApp(registerJSON.blankBirthday, casper, function(err){
								if(!err) {
									utils.log(' register by leaving blank birthday and verify error message', 'INFO');
									wait.waitForElement('form[name="PostTopic"] input[name="birthDatepicker"]', casper, function(err, isExist){
										if(!err){
											if(isExist) {
												var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
												errorMessage = errorMessage.trim();
												if(errorMessage && errorMessage!== '')
												registerMethod.verifyErrorMsg(errorMessage, 'Please enter birthday.', 'blankBirthday', casper, function(err) {
													if(!err) {
														utils.log(' Verified error message successfully', 'INFO');
													}
												});
											} else {
												utils.log(' Birthday field doesn\'t exists..', 'ERROR');
											}
										}
									});
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//64.Back end Birthday deafult "Yes", Required "Visible"  front end Registration with with Birthday  blank data
defaultOptionTest.birthdayBlankDataRegistrationVisibleYes= function() {
	casper.then(function(){
		utils.log(' ******************** case-64 ********************', 'INFO');
		utils.log(' Front end Registration with  Birthday  blank data', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Visible" ', 'INFO');
		utils.log(' ***********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							registerMethod.registerToApp(registerJSON.blankBirthday, casper, function(err){
								if(!err) {
									utils.log(' register by leaving blank birthday and verify error message', 'INFO');
									wait.waitForElement('form[name="PostTopic"] input[name="birthDatepicker"]', casper, function(err, isExist){
										if(!err){
											if(isExist) {
												var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
												errorMessage = errorMessage.trim();
												if(errorMessage && errorMessage!== '')
												registerMethod.verifyErrorMsg(errorMessage, 'Please enter birthday.', 'blankBirthday', casper, function(err) {
													if(!err) {
														utils.log(' Verified error message successfully', 'INFO');
													}
												});
											} else {
												utils.log(' Birthday field doesn\'t exists..', 'ERROR');
											}
										}
									});
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//65.Back end Birthday deafult "Yes", Required "Hidden"  front end Registration with with Birthday  blank data
defaultOptionTest.birthdayBlankDataRegistrationHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-65 ********************', 'INFO');
		utils.log(' Front end Registration with  Birthday  blank data', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Hidden"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});

};

//66.Back end Birthday deafult "No", Required "Registration Page Only"  front end Registration with with Birthday  blank data
defaultOptionTest.birthdayBlankDataRegistrationPageOnlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-66  *******************', 'INFO');
		utils.log(' Front end Registration with  Birthday  blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Registration Page Only"', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//67.Back end Birthday deafult "No", Required "Visible"  front end Registration with with Birthday  blank data
defaultOptionTest.birthdayBlankDataRegistrationVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-67 ********************', 'INFO');
		utils.log(' Front end Registration with  Birthday  blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Visible"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//68.Back end Birthday  deafult "No", Required "Hidden"  front end Registration with with Birthday  blank data
defaultOptionTest.birthdayBlankDataRegistrationHiddenNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-68 ********************', 'INFO');
		utils.log(' Front end Registration with  Birthday  blank data', 'INFO');
		utils.log(' Test case for deafult "No", Required "Hidden" ', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};


/************************   12.Front end Registration with  Signature  blank data ****************************/

//69.Back end Signature deafult "Yes", Required "Registration Page Only"  front end Registration with with Signature  blank data
defaultOptionTest.signatureBlankDataRegistrationPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' *************************** case-69***********************************', 'INFO');
		utils.log(' Front end Registration with  Signature  blank data *******************', 'INFO');
		utils.log(' Test case for Back end deafult "Yes", Required "Registration Page Only"', 'INFO');
		utils.log(' **********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('form[name="PostTopic"]');
							registerMethod.registerToApp(registerJSON.blankSignature, casper, function(err){
								if(!err) {
									utils.log(' register by leaving blank signature and verify error message', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//70.Back end Signature deafult "Yes", Required "Visible"  front end Registration with with Signature  blank data
defaultOptionTest.signatureBlankDataRegistrationVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-70 **********************', 'INFO');
		utils.log(' Front end Registration with  Signature  blank data ', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Visible" ', 'INFO');
		utils.log(' ***********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('form[name="PostTopic"]');
							registerMethod.registerToApp(registerJSON.blankSignature, casper, function(err){
								if(!err) {
									utils.log(' register by leaving blank signature and verify error message', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//71.Back end Signature  deafult "Yes", Required "Hidden"  front end Registration with with Signature  blank data
defaultOptionTest.signatureBlankDataRegistrationHiddenYes= function() {
	casper.then(function(){
		utils.log(' ******************** case-71 **********************', 'INFO');
		utils.log(' Front end Registration with  Signature  blank data ', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Hidden"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//72.Back end Signature  deafult "No", Required "Registration Page Only"  front end Registration with with Signature   blank data
defaultOptionTest.signatureBlankDataRegistrationPageOnlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-22 **********************', 'INFO');
		utils.log(' Front end Registration with  Signature  blank data ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Registration Page Only"', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//73.Back end Signature  deafult "No", Required "Visible"  front end Registration with with Signature   blank datdefaultOptionJSON
defaultOptionTest.signatureBlankDataRegistrationVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-73 ****** ***************', 'INFO');
		utils.log(' Front end Registration with  Signature  blank data ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Visible"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//74.Back end Signature  deafult "No", Required "Hidden"  front end Registration with with Signature   blank data
defaultOptionTest.signatureBlankDataRegistrationHiddenNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-74 **********************', 'INFO');
		utils.log(' Front end Registration with  Signature  blank data ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Hidden" ', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};


/************************   13.Front end Registration with Instant Message blank data  ****************************/


//75.Back end Instant Message  deafult "Yes", Required "Registration Page Only"  front end Registration with Instant Message blank data
defaultOptionTest.instantMessageBlankDataRegistrationPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************************** case-75 ******************************', 'INFO');
		utils.log(' Front end Registration with Instant Message blank data ****************', 'INFO');
		utils.log(' Test case for Back end deafult "Yes", Required "Registration Page Only" ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('form[name="PostTopic"]');
							registerMethod.registerToApp(registerJSON.blankImId, casper, function(err){
								if(!err) {
									utils.log(' register by leaving blank im-id and verify error message', 'INFO');
									wait.waitForElement('form[name="PostTopic"] input[name="imID"]', casper, function(err, isExist){
										if(!err){
											if(isExist) {
												var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
												errorMessage = errorMessage.trim();
												if(errorMessage && errorMessage!== '')
													registerMethod.verifyErrorMsg(errorMessage, 'Please enter your screen name.', 'blankImId', casper, function(err) {
														if(!err) {
															utils.log(' Verified error message successfully', 'INFO');
														}
													});
											} else {
												utils.log(' IM-ID field doesn\'t exists..', 'ERROR');
											}
										}
									});
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//76.Back end Instant Message deafult "Yes", Required "Visible"  front end Registration with Instant Message   blank data
defaultOptionTest.instantMessageBlankDataRegistrationVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-76   ************************', 'INFO');
		utils.log(' Front end Registration with Instant Message blank data ', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Visible" ', 'INFO');
		utils.log(' ***********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('form[name="PostTopic"]');
							registerMethod.registerToApp(registerJSON.blankImId, casper, function(err){
								if(!err) {
									utils.log(' register by leaving blank im-id and verify error message', 'INFO');
									wait.waitForElement('form[name="PostTopic"] input[name="imID"]', casper, function(err, isExist){
										if(!err){
											if(isExist) {
												var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
												errorMessage = errorMessage.trim();
												if(errorMessage && errorMessage!== '')
													registerMethod.verifyErrorMsg(errorMessage, 'Please enter your screen name.', 'blankImId', casper, function(err) {
														if(!err) {
															utils.log(' Verified error message successfully', 'INFO');
														}
													});
											} else {
												utils.log(' IM-ID field doesn\'t exists..', 'ERROR');
											}
										}
									});
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//77.Back end Instant Message deafult "Yes", Required "Hidden"  front end Registration with Instant Message   blank data
defaultOptionTest.instantMessageBlankDataRegistrationHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-77 **************************', 'INFO');
		utils.log(' Front end Registration with Instant Message blank data ', 'INFO');
		utils.log(' Test case for deafult "Yes", Required "Hidden"', 'INFO');
		utils.log(' *********************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//78.Back end Instant Message  deafult "No", Required "Registration Page Only"  front end Registration with Instant Message  blank data
defaultOptionTest.instantMessageBlankDataRegistrationPageOnlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-78 **************************', 'INFO');
		utils.log(' Front end Registration with Instant Message blank data ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Registration Page Only"', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//79.Back end Instant Message  deafult "No", Required "Visible"  front end Registration with Instant Message  blank data
defaultOptionTest.instantMessageBlankDataRegistrationVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-79 **************************', 'INFO');
		utils.log(' Front end Registration with Instant Message blank data ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Visible"', 'INFO');
		utils.log(' *******************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};

//80.Back end Instant Message  deafult "No", Required "Hidden"  front end Registration with  Instant Message   blank data
defaultOptionTest.instantMessageBlankDataRegistrationHiddenNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-80 **************************', 'INFO');
		utils.log(' Front end Registration with Instant Message blank data ', 'INFO');
		utils.log(' Test case for deafult "No", Required "Hidden" ', 'INFO');
		utils.log(' ********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' defaultOptionMethod of registerBackUrl', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						registerTests.validInfo(function(err) {
							if(!err){
								utils.log(' registerTests of validInfo run ', 'INFO');
							}
						});
					}else{
						 utils.log(' Register  Link Not Found', 'ERROR');
					}
				}
			});
		});
	});
};


/******************************************************************************************************************************************/
 /*** 4.Back end Setting with Default Registration Options and Verify front End  Registration page Field Disable/Enable **/
 /****************************************************************************************************************************************/

/************************   14.Front end Registration with  Full Name Enable/Disable ****************************/


//81.Verify full name back end Default Value "No" Required "Hidden" Front end Registration page Full Name Disable
defaultOptionTest.fullNameDisableHiddenNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-81 ***********************', 'INFO');
		utils.log(' Front End Registration Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "No" Required "Hidden"', 'INFO');
		utils.log(' ***********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="inputname"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//82.Verify full name back end Default Value "No"Required "Registerationpage Only"Front end Registration page Full name Enable
defaultOptionTest.fullNameEnableRegistrationPageNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-82 ***********************', 'INFO');
		utils.log(' Front End Registration Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "No"Required "Registration Page " ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('label[for="inputname"]');
							var message = casper.fetchText('label[for="inputname"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Full Name', 'Field Full name', casper, function(err) {
								if(!err) {

								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//83.verify Full name back end Default value "No"Required "Visible"Front end Registration Page Full Name Registration Page Full Name Enable
defaultOptionTest.fullNameEnableVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-83 ***********************', 'INFO');
		utils.log(' Front End Registration Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default value "No"Required "Visible" ', 'INFO');
		utils.log(' ************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('label[for="inputname"]');
							var message = casper.fetchText('label[for="inputname"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Full Name', 'Field Full name', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//84.verify Full Name Back End Default Value "NO"Required "Edit Page Only"Front EndRegistration Page Full Name Disable
defaultOptionTest.fullNameDisableEditProfilepageonlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-84 ***********************', 'INFO');
		utils.log(' Front End Registration Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "NO"Required "Edit Page Only" ', 'INFO');
		utils.log(' *******************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="inputname"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//85.Verify Full Name Back End Default Value ''Yes" Required "Hidden" Front End Registration Page Full Name Disable
defaultOptionTest.fullNameDisableHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-85 ***********************', 'INFO');
		utils.log(' Front End Registration Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Hidden" ', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="inputname"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//86.verify Full Name Back End Default Value "Yes" Required "Visible" Fornt End Registration Page Full Name Enable
defaultOptionTest.fullNameEnableVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-86 ***********************', 'INFO');
		utils.log(' Front End Registration Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Visible" ', 'INFO');
		utils.log(' **************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('label[for="inputname"]');
							var message = casper.fetchText('label[for="inputname"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Full Name', 'Field Full name', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//87.verify Full Name Back End Default Value "Yes" Required "Register page Only" Fornt End Registration Page Full Name Enable
defaultOptionTest.fullNameEnableRegistrationPageYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-87 ***********************', 'INFO');
		utils.log(' Front End Registration Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Register page Only"  ', 'INFO');
		utils.log(' **************************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('label[for="inputname"]');
							var message = casper.fetchText('label[for="inputname"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Full Name', 'Field Full name', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//88.verify Full Name Back End Default Value "Yes" Required "Edit Page Only" Fornt End Registration Page Full Name Disable
defaultOptionTest.fullNameEnableEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-88 ***********************', 'INFO');
		utils.log(' Front End Registration Page Full Name Enable/Disable', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Edit Page Only" ', 'INFO');
		utils.log(' *********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_name"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="inputname"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};


/************************ 15.Front end Registration page BirthdayPicker Disable/Enable  ****************************/


//89.verify Birthday Picker Back End Default Value "No" Required "Hidden" Fornt End Registration Page BirthdayPicker Disable
defaultOptionTest.birthdayPickerDisableHiddenNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-89 ******************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE BIRTHDAY ENABLE/DISABLE *******', 'INFO');
		utils.log(' Test case for Back end Default Value "No" Required "Hidden"', 'INFO');
		utils.log(' ***********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updatedg', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="bd_month"]');
							var message = casper.fetchText('label[for="bd_month"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Birthday', 'Field Birthday', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//90.verify Birthday Picker Back End Default Value "No" Required "Visible" Fornt End Registration Page BirthdayPicker Enable
defaultOptionTest.birthdayPickerEnableVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-90 *******************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE BIRTHDAY ENABLE/DISABLE ********', 'INFO');
		utils.log(' Test case for Back end Default value "No"Required "Visible" ', 'INFO');
		utils.log(' ************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExist('label[for="bd_month"]');
							var message = casper.fetchText('label[for="bd_month"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Birthday', 'Field Birthday', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//91.verify Birthday Picker Back End Default Value "No" Required "RegistrationPage Only" Fornt End Registration Page BirthdayPicker Enable
defaultOptionTest.birthdayPickerEnableRegistrationPageNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-91 ******************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE BIRTHDAY ENABLE/DISABLE *******************', 'INFO');
		utils.log(' Test case for Back end Default Value "No"Required "Registration Page " ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('label[for="bd_month"]');
							var message = casper.fetchText('label[for="bd_month"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Birthday', 'Field Birthday', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//92.verify Birthday Picker Back End Default Value "No" Required "Edit Page Only" Fornt End Registration Page BirthdayPicker Disable
defaultOptionTest.birthdayPickerDisableEditPageOnlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-92 **************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE BIRTHDAY ENABLE/DISABLE****************', 'INFO');
		utils.log(' Test case for Back end Default Value "NO"Required "Edit Page Only" ', 'INFO');
		utils.log(' *******************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
		utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="bd_month"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//93.verify Birthday Picker Back End Default Value "Yes" Hidden" Fornt End Registration Page BirthdayPicker Disable
defaultOptionTest.birthdayPickerDisableHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-93 ********************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE BIRTHDAY ENABLE/DISABLE**********', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Hidden" ', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
			   utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		 casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="bd_month"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//94.verify Birthday Picker Back End Default Value "Yes"  Required "Visible" Fornt End Registration Page BirthdayPicker Enable
defaultOptionTest.birthdayPickerEnableVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-94 *********************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE BIRTHDAY ENABLE/DISABLE***********', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Visible" ', 'INFO');
		utils.log(' **************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		  casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('label[for="bd_month"]');
							var message = casper.fetchText('label[for="bd_month"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Birthday', 'Field Birthday', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//95.verify Birthday Picker Back End Default Value "Yes" Register Page Only" Fornt End Registration Page BirthdayPicker Enable
defaultOptionTest.birthdayPickerDisableRegistrationPageYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-95 *********************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE BIRTHDAY ENABLE/DISABLE***********************', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Register page Only"  ', 'INFO');
		utils.log(' **************************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		 casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExist('label[for="bd_month"]');
							var message = casper.fetchText('label[for="bd_month"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Birthday', 'Field Birthday', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//96.verify Birthday Picker Back End Default Value "Yes" Edit Page Only" Fornt End Registration Page BirthdayPicker Disable
defaultOptionTest.birthdayPickerDisableEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-96 ****************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE BIRTHDAY ENABLE/DISABLE *****************', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Edit Page Only" ', 'INFO');
		utils.log(' *********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_dob"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
			   utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		 casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="bd_month"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};



/************************   16.Front end Registration page Signature  Disable/Enable  ****************************/


//97.verify Signature Back End Default Value "No" Required "Hidden" Fornt End Registration Page Signature Disable
defaultOptionTest.signatureDisableHiddenNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-97 ******************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  SIGNATURE ENABLE/DISABLE******', 'INFO');
		utils.log(' Test case for Back end Default Value "No" Required "Hidden"', 'INFO');
		utils.log(' ***********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="signature"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//98.verify Signature Back End Default Value "No" Required "Visible" Fornt End Registration Page  Signature Enable
defaultOptionTest.signatureEnableVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-98 *******************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  SIGNATURE ENABLE/DISABLE*******', 'INFO');
		utils.log(' Test case for Back end Default value "No"Required "Visible" ', 'INFO');
		utils.log(' ************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('label[for="signature"]');
							var message = casper.fetchText('label[for="signature"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Signature', 'Field signature', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//99.verify Signature Back End Default Value "No" Required "RegistrationPage Only" Fornt End Registration Page Signature Enable
defaultOptionTest.signatureDisableRegistrationPageNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-99 ******************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  SIGNATURE ENABLE/DISABLE*  ***************', 'INFO');
		utils.log(' Test case for Back end Default Value "No"Required "Registration Page " ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('label[for="signature"]');
							var message = casper.fetchText('label[for="signature"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Signature', 'Field signature', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//100.verify Signature Back End Default Value "No" Required "Edit Page Only" Fornt End Registration Page Signature  Disable
defaultOptionTest.signatureDisableEditProfilepageonlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-100 *************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  SIGNATURE ENABLE/DISABLE  ************', 'INFO');
		utils.log(' Test case for Back end Default Value "NO"Required "Edit Page Only" ', 'INFO');
		utils.log(' *******************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="signature"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//101.verify Signature Back End Default Value "Yes" Hidden" Fornt End Registration Page Signature Disable
defaultOptionTest.signatureDisableHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-101 *******************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  SIGNATURE ENABLE/DISABLE********', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Hidden" ', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="signature"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//102.verify Signature Back End Default Value "Yes" Required "Visible" Fornt End Edit Profile  Page Full Name Enable
defaultOptionTest.signatureEnableVisibleYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-102 ********************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  SIGNATURE ENABLE/DISABLE*********', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Visible" ', 'INFO');
		utils.log(' **************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
			   utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExists('label[for="signature"]');
							var message = casper.fetchText('label[for="signature"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Signature', 'Field signature', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//103.verify Signature Back End Default Value "Yes" Register Page Only" Fornt End Registration Page Signature Enable
defaultOptionTest.signatureEnableRegistrationPageYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-103 ********************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  SIGNATURE ENABLE/DISABLE*********************', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Register page Only"  ', 'INFO');
		utils.log(' **************************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				 utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExist('label[for="signature"]');
							var message = casper.fetchText('label[for="signature"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Signature', 'Field signature', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//104.verify Signature Back End Default Value "Yes" Edit Page Only" Fornt End Registration Page Signature  Disable
defaultOptionTest.signatureDisableEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-104 ***************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE SIGNATURE ENABLE/DISABLE*****************', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Edit Page Only" ', 'INFO');
		utils.log(' *********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_signature"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		  casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="signature"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

/************************  17.Front end Registration page InstantMessage Disable/Enable  ****************************/


//105.verify Instant Message Back End Default Value "No" Required "Hidden" Fornt End Registration Page InstantMessage Disable
defaultOptionTest.instantMessageDisableHiddenNo= function() {
	casper.then(function(){
		utils.log(' ******************** case-105 *****************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  INSTANTMESSAGE ENABLE/DISABLE ', 'INFO');
		utils.log(' Test case for Back end Default Value "No" Required "Hidden"', 'INFO');
		utils.log(' ***********************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setHiddenValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		 casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="imType"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//106.verify Instant Message Back End Default Value "No" Required "Visible" Fornt End Registration Page  Instant Message Enable
defaultOptionTest.instantMessageEnableVisibleNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-106 ******************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE INSTANT MESSAGE ENABLE/DISABLE *', 'INFO');
		utils.log(' Test case for Back end Default value "No"Required "Visible" ', 'INFO');
		utils.log(' ************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setVisibleValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExist('label[for="imType"]');
							var message = casper.fetchText('label[for="imType"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Instant Messaging', 'Field Instant Messaging', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//107.verify Instant Message  Back End Default Value "No" Required "RegistrationPage Only" Fornt End Registration Page Instant Message  Enable
defaultOptionTest.instantMessageEnableRegistrationPageNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-107 *****************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  INSTANTMESSAGE ENABLE/DISABLE*   *********', 'INFO');
		utils.log(' Test case for Back end Default Value "No"Required "Registration Page " ', 'INFO');
		utils.log(' ***********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setRegistrationValueOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertExist('label[for="imType"]');
							var message = casper.fetchText('label[for="imType"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Instant Messaging', 'Field Instant Messaging', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//108.verify Instant Message  Back End Default Value "No" Required "Edit Page Only" Fornt End Registration Page Instant Message Disable
defaultOptionTest.instantMessageDisableEditProfilepageonlyNo = function() {
	casper.then(function(){
		utils.log(' ******************** case-108 *************************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  INSTANTMESSAGE ENABLE/DISABLE   ******', 'INFO');
		utils.log(' Test case for Back end Default Value "NO"Required "Edit Page Only" ', 'INFO');
		utils.log(' *******************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setSettingsOff, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		 casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form.....', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="imType"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//109.verify Instant Message  Back End Default Value "Yes" Hidden" Fornt End Registration Page Instant Message Disable
defaultOptionTest.instantMessageDisableHiddenYes = function() {
	casper.then(function(){
		utils.log(' ******************** case-109 *******************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE  INSTANTMESSAGE ENABLE/DISABLE***', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Hidden" ', 'INFO');
		utils.log(' *************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setHiddenValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		 casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form', 'INFO');
						wait.waitForTime(3000 , casper , function() {
							casper.test.assertDoesntExist('label[for="imType"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//110.verify Instant Message  Back End Default Value "Yes"  Required "Visible" Fornt End Registration Page Instant Message  Enable
defaultOptionTest.instantMessageEnableVisibleYes = function() {
	casper.then(function(){
		utils.log(' **************************** case-110 ************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE INSTANTMESSAGE ENABLE/DISABLE*****', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Visible" ', 'INFO');
		utils.log(' ***************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setVisibleValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form', 'INFO');
						wait.waitForTime(3000, casper , function() {
							casper.test.assertExist('label[for="imType"]');
							var message = casper.fetchText('label[for="imType"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Instant Messaging', 'Field Instant Messaging', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//111.verify Instant Message  Back End Default Value "Yes" Register Page Only" Fornt End Registration Page Instant Message Enable
defaultOptionTest.instantMessageDisableRegistrationPageYes = function() {
	casper.then(function(){
		utils.log(' ****************************** case-111 *******************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE INSTANTMESSAGE ENABLE/DISABLE', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Register page Only"  ', 'INFO');
		utils.log(' **************************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setRegistrationValueOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form', 'INFO');
						wait.waitForTime(3000, casper , function() {
							casper.test.assertExist('label[for="imType"]');
							var message = casper.fetchText('label[for="imType"]');
							message = message.trim();
							if(message && message!== '')
							registerMethod.verifyErrorMsg(message, 'Instant Messaging', 'Field Instant Messaging', casper, function(err) {
								if(!err) {
									utils.log(' registerMethod verifyErrorMsg run successfully', 'INFO');
								}
							});
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};

//112.verify Instant Message Back End Default Value "Yes" Edit Page Only" Fornt End Registration Page Instant Message Disable
defaultOptionTest.instantMessageEnableEditPageOnlyYes = function() {
	casper.then(function(){
		utils.log(' *************************** case-112 ******************************', 'INFO');
		utils.log(' FRONT END REGISTRATION PAGE INSTANT MESSAGE ENABLE/DISABLE', 'INFO');
		utils.log(' Test case for Back end Default Value "Yes" Required "Edit Page Only" ', 'INFO');
		utils.log(' *********************************************************************', 'INFO');
		defaultOptionMethod.registerBackUrl('form[name="posts"] select[name="required_imType"]', defaultOptionJSON.setSettingsOn, casper, function(err) {
			if(!err){
				utils.log(' Default Options Page Settings Have Been Updated', 'INFO');
			}
		});
		casper.thenOpen(config.url, function() {
			utils.log(' Title of the page : ' + this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a');
						casper.click('.pull-right a');
						utils.log(' Successfully open register form', 'INFO');
						wait.waitForTime(3000, casper , function() {
							casper.test.assertDoesntExist('label[for="imType"]');
						});
					} else {
						utils.log(' User didn\'t not found any register link', 'ERROR');
					}
				}
			});
		});
	});
};
