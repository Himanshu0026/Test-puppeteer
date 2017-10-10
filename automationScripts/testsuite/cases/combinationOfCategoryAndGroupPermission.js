/***These are the function which has been called in Combination of category and group permission and also will be used in other js file as per requirement**********/

'use strict.';
var combinationOfCategoryAndGroupPermissionsJSON = require('../../testdata/combinationOfCategoryAndGroupPermission.json');
var config = require('../../../config/config.json');
var combinationOfCategoryAndGroupPermissionsMethod = require('../methods/combinationOfCategoryAndGroupPermission.js');
var forumLoginMethod = require('../methods/login.js');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var wait = require('../wait.js');
var category_Id;
var subCategory_Id;
var combinationOfCategoryAndGroupPermissionsTestcases = module.exports = {};

// method to enable view forum for unregistered User
combinationOfCategoryAndGroupPermissionsTestcases.enableViewForumForUnregisterdUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Unregistered / Not Logged In',function(err) {
							if(!err) {
								combinationOfCategoryAndGroupPermissionsMethod.enableViewforum(function(err) {
									if(!err) {
										utils.log(' enableViewForum method called ','INFO');
									}
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
};

// method to register users neha, isneha, isneha12 and isneha13
combinationOfCategoryAndGroupPermissionsTestcases.registerUserTOLogin = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		//method to Disable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(function(err) {
			if(!err) {
				utils.log(' Disable Approve New Event functionality method called ','INFO');
			}
		});
	});
	casper.eachThen(combinationOfCategoryAndGroupPermissionsJSON.infoToRegisterUser, function(response) {
		utils.log(" the response data "+response.data,"INFO");
		var responseData = response.data;
		postEventMemberApprovalMethod.registerMember(responseData, function(err) {
			if(!err) {
				utils.log(' Users registered method called successfully', 'INFO');
			}else {
				utils.log(' Users registered method not called successfully', 'ERROR');
			}
		});
	});
};

// method to create a category cat1 and its sub categories cat1a and cat1b
combinationOfCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *                      Method to create category and sub category                  *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPage(function(err) {
							if(!err) {
								combinationOfCategoryAndGroupPermissionsMethod.isCategoryExists(combinationOfCategoryAndGroupPermissionsJSON.category, function(err, isExists) {
									if(isExists) {
										utils.log(' Category already existed', 'INFO');
										combinationOfCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory, function(err) {
											if(!err) {
												utils.log(' Category and sub castegories created','INFO');
											}
										});
									} else {
										utils.log(' Category not exist', 'INFO');
										casper.then(function() {
											combinationOfCategoryAndGroupPermissionsMethod.createCategory(combinationOfCategoryAndGroupPermissionsJSON.otherCategory, function(err) {
												if(!err) {
													utils.log(' Category created','INFO');
												}
											});
										});
										casper.then(function() {
											combinationOfCategoryAndGroupPermissionsMethod.createCategory(combinationOfCategoryAndGroupPermissionsJSON.category, function(err) {
												if(!err) {
													casper.then(function() {
														casper.reload(function() {
															combinationOfCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfCategoryAndGroupPermissionsJSON.subCategory, function(err) {
																if(!err) {
																	casper.then(function() {
																		combinationOfCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory, function(err) {
																			if(!err) {
																				utils.log(' Category and sub castegories created','INFO');
																			}
																		});
																	});
																}
															});
														});
													});
												}
											});
										});
									}
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
};

// method to verify with category cat1
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 1                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *                      Method to verify with category cat1                      *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.enableViewCategory(function(err) {
										if(!err) {
											utils.log(' enableViewCategory method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a' , utils.log(' cat1 visible on category listing page', 'INFO'),'INFO');
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with the private category cat1
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 2                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *                 Method to verify with the private category cat1                  *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.enableViewCategory(function(err) {
										if(!err) {
											utils.log(' enableViewCategory method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a' , utils.log(' cat1 visible', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div.text-center.bmessage.alert-info.text-danger', function(err, isExists) {
													if(isExists) {
														var actualText = casper.fetchText('div.text-center.bmessage.alert-info.text-danger');
														var expectedText = "Sorry! You don't have permission to perform this action.";
														var successMsg = actualText.substring(0, actualText.indexOf('<'));
														casper.test.assert(successMsg.indexOf(expectedText) > -1);
													}else{
														utils.log(' not visible on category listing page','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify With SubCategory Of Disabled Category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 3                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *             Method to verify With SubCategory Of Disabled Category               *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.enableViewCategory(function(err) {
										if(!err) {
											utils.log(' enableViewCategory method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a' , utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.test.assertExists('li#forum_'+subCategory_Id+' a' , utils.log(' cat1a visible', 'INFO'));
														casper.click('li#forum_'+subCategory_Id+' a');
														wait.waitForElement('div.text-center.bmessage.alert-info.text-danger', function(err, isExists) {
															if(isExists) {
																var actualText = casper.fetchText('div.text-center.bmessage.alert-info.text-danger');
																var expectedText = "Sorry! You don't have permission to perform this action.";
																var successMsg = actualText.substring(0, actualText.indexOf('<'));
																casper.test.assert(successMsg.indexOf(expectedText) > -1);
															}else{
																utils.log('alert not visible on category listing page','ERROR');
															}
														});
													}else{
														utils.log(' cat1a not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with other category, whether they are visible or not
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 4                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *       Method to verify with other category, whether they are visible or not      *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a' , utils.log(' cat1 visible on category listing page', 'INFO'),'INFO');
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify private category on the compose page's drop down
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDown = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 5                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(" *         Method to verify private category on the compose page's drop down        *", 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.click('a.pull-right.btn.btn-uppercase.btn-primary ');
												wait.waitForElement('div.post-body.pull-left', function(err, isExists) {
													if(isExists) {
														var data = combinationOfCategoryAndGroupPermissionsJSON.startTopic;
														casper.sendKeys('input[name="subject"]', data.title, {keepFocus:true});
														casper.withFrame('message_ifr', function() {
															casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
															casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
															casper.sendKeys('#tinymce',data.content);
														});
														wait.waitForElement('#all_forums_dropdown', function(err, isExists) {
															if(isExists) {
																casper.click('#all_forums_dropdown');
																casper.fill('form[name="PostTopic"]',{
																	'forum' : data.category
																},false);
																casper.then(function() {
																	casper.click('#post_submit');
																	wait.waitForElement('div.text-center.bmessage', function(err, isExists) {
																		if(isExists) {
																			var actualText = casper.fetchText('div.text-center.bmessage.alert-info.text-danger');
																			var expectedText = "Sorry! You don't have permission to perform this action.";
																			var successMsg = actualText.substring(0, actualText.indexOf('<'));
																			casper.test.assert(successMsg.indexOf(expectedText) > -1);
																		}
																	});
																});
															}
														});
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with category cat1 When Group Permission Disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 6                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *         Method to verify with category cat1 When Group Permission Disable        *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.disableViewCategory(function(err) {
										if(!err) {
											utils.log(' disableViewCategory method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a' , utils.log(' cat1 visible on category listing page', 'INFO'),'INFO');
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with other category When Group Permission Disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 7                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *       Method to verify with other category, When Group Permission Disable        *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a' , utils.log(' Other category visible on category listing page', 'INFO'));
												casper.test.assertExists('li#forum_'+category_Id+' a.help-tooltip' , utils.log(' Private tooltip present', 'INFO'));
											}else{
												utils.log(' categories not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with category cat1 When Both Permission Disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 8                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *         Method to verify with category cat1 When Both Permission Disable        *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' disableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.disableViewCategory(function(err) {
										if(!err) {
											utils.log(' disableViewCategory method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a' , utils.log(' cat1 visible on category listing page', 'INFO'));
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with "privacy" option for category from back end
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackend = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 9                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *         Method to verify with "privacy" option for category from back end        *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a' , utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.test.assertExists('li#forum_'+category_Id+' a.help-tooltip' , utils.log(' Private tooltip present', 'INFO'));
											}else{
												utils.log(' categories not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with start new topic
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopic = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 10                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *                     Method to verify with start new topic                        *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.enableStartTopics(function(err) {
										if(!err) {
											utils.log(' enableStartTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', utils.log(' Start New topic on subcategory page Found', 'INFO'));
														postEventMemberApprovalMethod.startTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic, function(err) {
															if(!err) {
																utils.log(" Topic created succcessfully","INFO");
															}
														});
													}else{
														utils.log(' cat1a not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to Verify with click on start new topic button for private category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 11                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *     Method to Verify with click on start new topic button for private category   *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.enableStartTopics(function(err) {
										if(!err) {
											utils.log(' enableStartTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', utils.log(' Start New topic on subcategory page Found', 'INFO'));
														casper.mouse.move('a.pull-right.btn.btn-uppercase.btn-primary');
														casper.capture('gjuyy.png');
														var message = casper.evaluate(function() {
															var msg = document.querySelector('#ajax_subscription_vars a').getAttribute("data-original-title");
															return msg;
														});
														//var actualText = casper.fetchText('a.pull-right.btn.btn-uppercase.btn-primary');
														casper.echo('******************'+message);
														//var expectedText = "You don't have permission to start a new topic.";
														//var successMsg = actualText.substring(0, actualText.indexOf('<'));
														//casper.test.assert(successMsg.indexOf(expectedText) > -1);
													}else{
														utils.log(' cat1a not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to Verify with click on start new topic button for  sub-category of private category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                            Test case 12                                      ', 'INFO');
		utils.log(' *****************************************************************************************************', 'INFO');
		utils.log(' *     Method to Verify with click on start new topic button for  sub-category of private category   *', 'INFO');
		utils.log(' *****************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.test.assertExists('li#forum_'+subCategory_Id+' a', utils.log(' cat1a visible', 'INFO'));
														casper.click('li#forum_'+subCategory_Id+' a');
														wait.waitForTime(2000, function(err) {
															if(!err) {
																casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', utils.log(' Start New topic on subcategory page Found', 'INFO'));
																casper.mouse.move('a.pull-right.btn.btn-uppercase.btn-primary');
																casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
																wait.waitForElement('div.tooltip.fade.bottom.in', function(err, isExists) {
																	if(isExists) {
																		var text = casper.evaluate(function() {
																			var toolText = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').getAttribute('data-original-title');
																			return toolText;
																		});
																		var expectedText = "You don't have permission to start a new topic.";
																		casper.test.assert(text.indexOf(expectedText) > -1);
																	}else{
																		utils.log(' not visible on category listing page','ERROR');
																	}
																});
															}else{
																utils.log(' Start New topic on subcategory page not Found','ERROR');
															}
														});
													}else{
														utils.log(' cat1a not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify start new topic with other categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 13                                      ', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		utils.log(' *               Method to verify start new topic with other categories             *', 'INFO');
		utils.log(' ************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', utils.log(' Start New topic on subcategory page Found', 'INFO'));
														postEventMemberApprovalMethod.startTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic, function(err) {
															if(!err) {
																utils.log(" Topic created succcessfully","INFO");
															}
														});
													}else{
														utils.log(' cat1a not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to Verify with click on start new topic button for private category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                       Test case 14                                      ', 'INFO');
		utils.log(' **************************************************************************************', 'INFO');
		utils.log(' *      Method to Verify with click on start new topic button for private category    *', 'INFO');
		utils.log(' **************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.disableStartTopics(function(err) {
										if(!err) {
											utils.log(' disableStartTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', utils.log(' Start New topic on subcategory page Found', 'INFO'));
														postEventMemberApprovalMethod.startTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic, function(err) {
															if(!err) {
																utils.log(" Topic created succcessfully","INFO");
															}
														});
													}else{
														utils.log(' cat1a not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with other categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                    Test case 15                                      ', 'INFO');
		utils.log(' ***********************************************************************************************', 'INFO');
		utils.log(' *     Method to verify Start New Topic with other categories When Group Permission Disable    *', 'INFO');
		utils.log(' ***********************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', utils.log(' Start New topic on subcategory page Found', 'INFO'));
														casper.mouse.move('a.pull-right.btn.btn-uppercase.btn-primary');
														casper.capture('gjuyy.png');
														var message = casper.evaluate(function() {
															var msg = document.querySelector('#ajax_subscription_vars a').getAttribute("data-original-title");
															return msg;
														});
														//var actualText = casper.fetchText('a.pull-right.btn.btn-uppercase.btn-primary');
														casper.echo('******************'+message);
														//var expectedText = "You don't have permission to start a new topic.";
														//var successMsg = actualText.substring(0, actualText.indexOf('<'));
														//casper.test.assert(successMsg.indexOf(expectedText) > -1);
													}else{
														utils.log(' cat1a not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to Verify with click on start new topic when both permission disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                       Test case 16                                      ', 'INFO');
		utils.log(' **************************************************************************************', 'INFO');
		utils.log(' *     Method to Verify with click on start new topic when both permission disable    *', 'INFO');
		utils.log(' **************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' disableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.disableStartTopics(function(err) {
										if(!err) {
											utils.log(' disableStartTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', utils.log(' Start New topic on subcategory page Found', 'INFO'));
														casper.mouse.move('a.pull-right.btn.btn-uppercase.btn-primary');
														casper.capture('gjuyy.png');
														var message = casper.evaluate(function() {
															var msg = document.querySelector('#ajax_subscription_vars a').getAttribute("data-original-title");
															return msg;
														});
														//var actualText = casper.fetchText('a.pull-right.btn.btn-uppercase.btn-primary');
														casper.echo('******************'+message);
														//var expectedText = "You don't have permission to start a new topic.";
														//var successMsg = actualText.substring(0, actualText.indexOf('<'));
														//casper.test.assert(successMsg.indexOf(expectedText) > -1);
													}else{
														utils.log(' cat1a not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to Verify with reply topics option for enabled catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopic = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                       Test case 17                                      ', 'INFO');
		utils.log(' **************************************************************************************', 'INFO');
		utils.log(' *        Method to Verify with reply topics option for enabled catagory(cat1)        *', 'INFO');
		utils.log(' **************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' enableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.enableReplyTopics(function(err) {
										if(!err) {
											utils.log(' enableReplyTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.click('a#topics_tab');
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to Verify with reply  on other users topics for disable catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                       Test case 18                                      ', 'INFO');
		utils.log(' ***********************************************************************************************', 'INFO');
		utils.log(' *        Method to Verify with reply  on other users topics for disable catagory(cat1)        *', 'INFO');
		utils.log(' ***********************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' disableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.enableReplyTopics(function(err) {
										if(!err) {
											utils.log(' enableReplyTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.click('a#topics_tab');
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																casper.test.assertDoesntExist('#reply_submit', utils.log(' Reply button not present', 'INFO'));
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to Verify with reply on own topics for disable catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                       Test case 19                                      ', 'INFO');
		utils.log(' **************************************************************************************', 'INFO');
		utils.log(' *        Method to Verify with reply on own topics for disable catagory(cat1)        *', 'INFO');
		utils.log(' **************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.click('a#topics_tab');
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to Verify with reply on own topics for disable catagory(cat1) and disable group
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 20                                      ', 'INFO');
		utils.log(' *******************************************************************************************************', 'INFO');
		utils.log(' *        Method to Verify with reply on own topics for disable catagory(cat1) and disable group       *', 'INFO');
		utils.log(' *******************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' disableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.disableReplyTopics(function(err) {
										if(!err) {
											utils.log(' disableReplyTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.click('a#topics_tab');
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {

															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to Verify with reply on subcategories topic for disable catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 21                                      ', 'INFO');
		utils.log(' *******************************************************************************************************', 'INFO');
		utils.log(' *             Method to Verify with reply on subcategories topic for disable catagory(cat1)           *', 'INFO');
		utils.log(' *******************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' disableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.enableReplyTopics(function(err) {
										if(!err) {
											utils.log(' enableReplyTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.click('a#topics_tab');
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {

															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 22                                      ', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		utils.log(' *       Method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission      *', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' disableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.disableReplyTopics(function(err) {
										if(!err) {
											utils.log(' enableReplyTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														casper.click('a#topics_tab');
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with reply topics option for other catagory(cat1) and disable groupPermission
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 23                                      ', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		utils.log(' *       Method to verify with reply topics option for other catagory(cat1) and disable groupPermission      *', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with the reply topic for all categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 24                                      ', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		utils.log(' *                        Method to verify with the reply topic for all categories                             *', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
						var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
										if(!err) {
											combinationOfCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory(groupId, function(err) {
												if(!err) {
													utils.log(' disableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
								if(!err) {
									combinationOfCategoryAndGroupPermissionsMethod.disableReplyTopics(function(err) {
										if(!err) {
											utils.log(' enableReplyTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log(' Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log(' Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with start new topic and post a reply for enabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabled = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 25                                      ', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		utils.log(' *                Method to verify with start new topic and post a reply for enabled category                  *', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(function(err) {
			if(!err) {
				utils.log(' enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
						if(isExists) {
							var category = combinationOfCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
									casper.then(function() {
										combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
											if(!err) {
												combinationOfCategoryAndGroupPermissionsMethod.enablePostApprovalForSubCategory(groupId, function(err) {
													if(!err) {
														utils.log(' enablePostApprovalForSubCategory method called ','INFO');
													}
												});
											}
										});
									});
								}
							});
							casper.then(function() {
								combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
									if(!err) {
										combinationOfCategoryAndGroupPermissionsMethod.enableRequirePostApproval(function(err) {
											if(!err) {
												utils.log(' enableRequirePostApproval method called ','INFO');
											}
										});
									}
								});
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(function(err) {
									if(!err) {
										utils.log(' User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							utils.log(' Backend Menu not found', 'ERROR');
						}
					});
				}else {
					utils.log(' Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with start new topic and post a reply for sub categoryof enabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 26                                      ', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		utils.log(' *         Method to verify with start new topic and post a reply for sub categoryof enabled category          *', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(function(err) {
			if(!err) {
				utils.log(' enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
						if(isExists) {
							var category = combinationOfCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
								}
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(function(err) {
									if(!err) {
										utils.log(' User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							utils.log(' Backend Menu not found', 'ERROR');
						}
					});
				}else {
					utils.log(' Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with start new topic and post a reply for disabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 27                                      ', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		utils.log(' *                Method to verify with start new topic and post a reply for disabled category                  *', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(function(err) {
			if(!err) {
				utils.log(' enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
						if(isExists) {
							var category = combinationOfCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
									casper.then(function() {
										combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
											if(!err) {
												combinationOfCategoryAndGroupPermissionsMethod.disablePostApprovalForSubCategory(groupId, function(err) {
													if(!err) {
														utils.log(' disablePostApprovalForSubCategory method called ','INFO');
													}
												});
											}
										});
									});
								}
							});
							casper.then(function() {
								combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
									if(!err) {
										combinationOfCategoryAndGroupPermissionsMethod.enableRequirePostApproval(function(err) {
											if(!err) {
												utils.log(' enableRequirePostApproval method called ','INFO');
											}
										});
									}
								});
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(function(err) {
									if(!err) {
										utils.log(' User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							utils.log(' Backend Menu not found', 'ERROR');
						}
					});
				}else {
					utils.log(' Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with start new topic and post a reply for enabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 28                                      ', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		utils.log(' *                Method to verify with start new topic and post a reply for enabled category                  *', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(function(err) {
			if(!err) {
				utils.log(' enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
						if(isExists) {
							var category = combinationOfCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
									casper.then(function() {
										combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
											if(!err) {
												combinationOfCategoryAndGroupPermissionsMethod.enablePostApprovalForSubCategory(groupId, function(err) {
													if(!err) {
														utils.log(' enablePostApprovalForSubCategory method called ','INFO');
													}
												});
											}
										});
									});
								}
							});
							casper.then(function() {
								combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
									if(!err) {
										combinationOfCategoryAndGroupPermissionsMethod.disableRequirePostApproval(function(err) {
											if(!err) {
												utils.log(' disableRequirePostApproval method called ','INFO');
											}
										});
									}
								});
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(function(err) {
									if(!err) {
										utils.log(' User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							utils.log(' Backend Menu not found', 'ERROR');
						}
					});
				}else {
					utils.log(' Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};

// method to verify with start new topic and post a reply for other category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 29                                      ', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		utils.log(' *                Method to verify with start new topic and post a reply for other category                  *', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(function(err) {
			if(!err) {
				utils.log(' enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
						if(isExists) {
							var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
							var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
								}
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(function(err) {
									if(!err) {
										utils.log(' User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							utils.log(' Backend Menu not found', 'ERROR');
						}
					});
				}else {
					utils.log(' Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};


// method to verify with the post approval for all categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                                Test case 30                                      ', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		utils.log(' *                      Method to verify with the post approval for all categories                             *', 'INFO');
		utils.log(' ***************************************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(function(err) {
			if(!err) {
				utils.log(' enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
						if(isExists) {
							var category = combinationOfCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
									casper.then(function() {
										combinationOfCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
											if(!err) {
												combinationOfCategoryAndGroupPermissionsMethod.disablePostApprovalForSubCategory(groupId, function(err) {
													if(!err) {
														utils.log(' disablePostApprovalForSubCategory method called ','INFO');
													}
												});
											}
										});
									});
								}
							});
							casper.then(function() {
								combinationOfCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission(userGroup ,function(err) {
									if(!err) {
										combinationOfCategoryAndGroupPermissionsMethod.disableRequirePostApproval(function(err) {
											if(!err) {
												utils.log(' disableRequirePostApproval method called ','INFO');
											}
										});
									}
								});
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(function(err) {
									if(!err) {
										utils.log(' User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							utils.log(' Backend Menu not found', 'ERROR');
						}
					});
				}else {
					utils.log(' Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		combinationOfCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup, function(err, loginUserName, loginPassWord) {
			if(!err) {
				//login with pending user
				utils.log(' Title of the page :' +casper.getTitle(), 'INFO');
				forumLoginMethod.loginToApp(loginUserName, loginPassWord, function(err) {
					if(!err) {
						wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
							if(isExists) {
								utils.log(' User has been successfuly login to application with admin user', 'INFO');
								wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log(' Category link found', 'INFO'));
										casper.click('ul.nav.nav-tabs li:nth-child(2) a');
										wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+category_Id+' a', utils.log(' cat1 visible on category listing page', 'INFO'));
												casper.click('li#forum_'+category_Id+' a');
												wait.waitForElement('div#category_list', function(err, isExists) {
													if(isExists) {
														wait.waitForElement('div.topics-list', function(err, isExists) {
															if(isExists) {
																postEventMemberApprovalMethod.composePost(function(err) {
																	if(!err) {
																		utils.log(" User replied succcessfully","INFO");
																	}
																});
															}else{
																utils.log(' cat1 not visible','ERROR');
															}
														});
													}else{
														utils.log(' cat1 not visible','ERROR');
													}
												});
											}else{
												utils.log(' cat1 not visible on category listing page','ERROR');
											}
										});
									}else{
										utils.log(' Categories not Found','ERROR');
									}
								});
								casper.then(function() {
									forumLoginMethod.logoutFromApp( function(err) {
										if(!err) {
											utils.log(' User successfully logged out from frontend','INFO');
										}
									});
								});
							} else {
								utils.log(' User not logged in','ERROR');
							}
						});
					}else {
						utils.log(' Admin user not logged in', 'ERROR');
					}
				});
			}
		});
	});
};
