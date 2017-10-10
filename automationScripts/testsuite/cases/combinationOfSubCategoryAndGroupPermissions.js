/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict.';
var combinationOfSubCategoryAndGroupPermissionsJSON = require('../../testdata/combinationOfSubCategoryAndGroupPermissionsData.json');
var config = require('../../../config/config.json');
var combinationOfSubCategoryAndGroupPermissionsMethod = require('../methods/combinationOfSubCategoryAndGroupPermissions.js');
var forumLoginMethod = require('../methods/login.js');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var wait = require('../wait.js');
var category_Id;
var subCategory_Id;
var combinationOfSubCategoryAndGroupPermissionsTestcases = module.exports = {};

// method to enable view forum for unregistered User
combinationOfSubCategoryAndGroupPermissionsTestcases.enableViewForumForUnregisterdUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Unregistered / Not Logged In', function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.enableViewforum(function(err) {
									if(!err) {
										utils.info('enableViewCategory method called ');
									}
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.info('User successfully logged out from backend');
								}
							});
						});
					} else {
						utils.error('Backend Menu not found');
					}
				});
			}else {
				utils.error('Error : ');
			}
		});
	});
};

// method to register users neha, isneha, isneha12 and isneha13
combinationOfSubCategoryAndGroupPermissionsTestcases.registerUserTOLogin = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		//method to Disable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Disable Approve New Event functionality method called ','INFO');
			}
		});
	});
	casper.eachThen(combinationOfSubCategoryAndGroupPermissionsJSON.infoToRegisterUser, function(response) {
		casper.echo("the response data "+response.data,"INFO");
		var responseData = response.data;
		postEventMemberApprovalMethod.registerMember(responseData, casper, function(err) {
			if(!err) {
				casper.echo('Users registered method called successfully', 'INFO');
			}else {
				casper.echo('Users registered method not called successfully', 'ERROR');
			}
		});
	});
};

// method to create a category cat1 and its sub categories cat1a and cat1b
combinationOfSubCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                      Method to create category and sub category                  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
							if(!err) {
								combinationOfSubCategoryAndGroupPermissionsMethod.isCategoryExists(combinationOfSubCategoryAndGroupPermissionsJSON.category, casper, function(err, isExists) {
									if(isExists) {
										casper.echo('Category already existed', 'INFO');
										combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory, casper, function(err) {
											if(!err) {
												casper.echo('Category and sub castegories created','INFO');
											}
										});
									} else {
										casper.echo('Category not exist', 'INFO');
										combinationOfSubCategoryAndGroupPermissionsMethod.createCategory(combinationOfSubCategoryAndGroupPermissionsJSON.category, casper, function(err) {
											if(!err) {
												casper.then(function() {
													casper.reload(function() {
													combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfSubCategoryAndGroupPermissionsJSON.subCategory, casper, function(err) {
														if(!err) {
															casper.then(function() {
																		combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory, casper, function(err) {
																			if(!err) {
																				casper.echo('Category and sub castegories created','INFO');
																			}
																		});
																});
															}
														});
													});
												});
											}
										});
									}
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
};

// method to verify with category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 1                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                      Method to verify with category cat1                      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Registered Users',casper, function(err) {
								if(!err) {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory(casper, function(err) {
										if(!err) {
											casper.echo('enableViewCategory method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 2                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                      Method verify with sub-category cat1a                       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1a not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with the private sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 3                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*               Method to verify with the private sub-category cat1a               *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.enablePrivateCategories(casper, function(err) {
								if(!err) {
									casper.echo('enablePrivateCategories method called','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForElement('div.text-center.bmessage.alert-info.text-danger', casper,function(err, isExists) {
													if(isExists) {
														var actualText = casper.fetchText('div.text-center.bmessage.alert-info.text-danger');
														var expectedText = "Sorry! You don't have permission to perform this action.";
														var successMsg = actualText.substring(0, actualText.indexOf('<'));
														casper.test.assert(successMsg.indexOf(expectedText) > -1);
													}else{
														casper.echo('not visible on category listing page','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 4                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                Method to verify with the parent category cat1                    *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 5                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Method to verify with other sub-categories                     *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 6                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*       Method to verify start new topic button with the sub-category cat1a        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Registered Users', casper, function(err) {
								if(!err) {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopics(casper, function(err) {
										if(!err) {
											casper.echo('enableStartTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(4000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategoryDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 7                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*   Method to verify start new topic button with the sub-category cat1a(Disable)   *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														casper.mouse.move('a.pull-right.btn.btn-uppercase.btn-primary');
														casper.click('a.pull-right.btn.btn-uppercase.btn-primary');
														wait.waitForElement('div.tooltip.fade.bottom.in', casper,function(err, isExists) {
															if(isExists) {
																var text = casper.evaluate(function() {
																	var toolText = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').getAttribute('data-original-title');
																	return toolText;
																});
																var expectedText = "You don't have permission to start a new topic.";
																casper.test.assert(text.indexOf(expectedText) > -1);
															}else{
																casper.echo('not visible on category listing page','ERROR');
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForParentCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 8                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*        Method to verify start new topic button with the parent category cat1     *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
												postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
													if(!err) {
														casper.echo("Topic created succcessfully","INFO");
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForOtherSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 9                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Method to verify with other sub-categories                  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Reply topic button with the sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 10                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*          Method to verify Reply topic button with the sub-category cat1a         *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Registered Users', casper, function(err) {
								if(!err) {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopics(casper, function(err) {
										if(!err) {
											casper.echo('enableReplyTopics method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.userLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.userLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Reply topic button with the sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 11                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*     Method to verify Reply topic button with the sub-category cat1a(Disable)     *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.userLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.userLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a[id^="topic_"]', 'Composed topic is found');
														var topic = casper.evaluate(function() {
															var name = document.querySelector('a[id^="topic_"] span');
															return name.innerHTML;
														});
														casper.echo('*******************************************************','INFO');
														casper.echo('*           The name of the topic is-'+topic+        '*','INFO');
														casper.echo('*******************************************************','INFO');
														casper.click('a[id^="topic_"]');
														wait.waitForElement('div#posts-list', casper, function(err, isExists) {
															if(isExists) {
																casper.test.assertDoesntExist('a#sub_post_reply','Reply option not appear','INFO');
															}else {
																casper.echo('Reply option visible', 'ERROR');
															}
														});
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify reply topic button with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithParentCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 12                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*         Method to verify reply topic button with the parent category cat1        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.userLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.userLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.click('a#topics_tab');
												wait.waitForElement('div.topics-list', casper,function(err, isExists) {
													if(isExists) {
														postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}else{
														casper.echo('cat1a not visible','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 13                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Method to verify with other sub-categories                     *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}
												});
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify  upload attachments with the private sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 14                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*     Method to verify  upload attachments with the private sub-category cat1a     *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableUploadAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Registered Users', casper, function(err) {
								if(!err) {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachments(casper, function(err) {
										if(!err) {
											casper.echo('enableUploadAttachments method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															combinationOfSubCategoryAndGroupPermissionsMethod.uploadAttachmentWithTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify upload attachments button with the private sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 15                                      ', 'INFO');
		casper.echo('*******************************************************************************************', 'INFO');
		casper.echo('* Method to verify upload attachments button with the private sub-category cat1a(Disable) *', 'INFO');
		casper.echo('*******************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableUploadAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableUploadAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertDoesntExist('a#fancy_attach_ i' ,'Attachment link not found','INFO');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify  upload attachments with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithParentCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 16                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*        Method to verify  upload attachments with the parent category cat1        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
											combinationOfSubCategoryAndGroupPermissionsMethod.uploadAttachmentWithTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
													if(!err) {
														casper.echo("User replied succcessfully","INFO");
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithOtherSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 17                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                  Method to verify with other sub-categories                      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic.username, combinationOfSubCategoryAndGroupPermissionsJSON.startTopic.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify view attachments with the private sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 18                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*       Method to verify view attachments with the private sub-category cat1a      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Registered Users', casper, function(err) {
								if(!err) {
									combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachments(casper, function(err) {
										if(!err) {
											casper.echo('enableViewAttachments method called ','INFO');
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {

											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify view attachments with the private sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithSubCategoryDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 19                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*  Method to verify view attachments with the private sub-category cat1a(Disable)  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableViewAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableViewAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {

											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify view attachments with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithParentCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 20                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*         Method to verify view attachments with the parent category cat1          *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {

											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithOtherSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 21                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                   Method to verify with other sub-categories                     *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Post approval with the private sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 22                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*        Method to verify Post approval with the private sub-category cat1a        *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test,  function(err) {
			if(!err) {
				casper.echo('enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(casper, function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
						if(isExists) {
							var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
									casper.then(function() {
										combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
											if(!err) {
												combinationOfSubCategoryAndGroupPermissionsMethod.enablePostApprovalForSubCategory(groupId, casper, function(err) {
													if(!err) {
														casper.echo('enablePostApprovalForSubCategory method called ','INFO');
													}
												});
											}
										});
									});
								}
							});
							casper.then(function() {
								combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Registered Users', casper, function(err) {
									if(!err) {
										combinationOfSubCategoryAndGroupPermissionsMethod.enableRequirePostApproval(casper, function(err) {
											if(!err) {
												casper.echo('enableRequirePostApproval method called ','INFO');
											}
										});
									}
								});
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(casper, function(err) {
									if(!err) {
										casper.echo('User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							casper.echo('Backend Menu not found', 'ERROR');
						}
					});
				}else {
					casper.echo('Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully and moved to approval queue","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Post approval with the private sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 23                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*    Method to verify Post approval with the private sub-category cat1a(Disable)   *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Registered Users', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disablePostApprovalForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disablePostApprovalForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Post approval with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithParentCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 24                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Method to verify Post approval with the parent category cat1           *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 25                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                    Method to verify with other sub-categories                    *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.registeredUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully and moved to approval queue","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		postEventMemberApprovalMethod.disableApproveNewPost(casper, casper.test,  function(err) {
			if(!err) {
				casper.echo('enablePostApproval method called ','INFO');
			}
		});
	});
};

// method to verify with category cat1 for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 26                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Method to verify with category cat1 for unregistered user            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Unregistered / Not Logged In', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Unregistered / Not Logged In',casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory(casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify with sub category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 27                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*         Method to verify with sub-category cat1a for unregistered user           *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1a not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify with sub-category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryUnregisteredUserDisabled = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 28                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Method to verify with category cat1 for unregistered user            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Unregistered / Not Logged In', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Unregistered / Not Logged In',casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory(casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.enablePrivateCategories(casper, function() {
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForElement('div.alert.alert-info.text-center', casper,function(err, isExists) {
							if(isExists) {
								var actualText = casper.fetchText('div.alert.alert-info.text-center');
								var expectedText = "Please login or register to continue.";
								casper.test.assert(actualText.indexOf(expectedText) > -1);
							}else{
								casper.echo('not visible on category listing page','ERROR');
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify with category cat1 for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryUnregisteredUserDisabled = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 29                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Method to verify with category cat1 for unregistered user            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 30                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Method to verify with other sub-categories Unregistered user           *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
					}else{
						casper.echo('cat1b not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Unregistered / Not Logged In', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Unregistered / Not Logged In',casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory(casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the private sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithSubCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 31                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*          Method to verify with new topic button for unregistered user            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Unregistered / Not Logged In', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Unregistered / Not Logged In',casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopics(casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopics method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
								casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
								postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
									if(!err) {
										casper.echo("Topic created succcessfully","INFO");
									}
								});
							}else{
								casper.echo('Start New topic on subcategory page not Found','ERROR');
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify start new topic button with the private sub-category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithSubCategoryUnregisteredUserDisabled = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 32                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*      Method  to verify with new topic button for unregistered user Disable       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Unregistered / Not Logged In', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
								casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
								casper.mouse.move('a.pull-right.btn.btn-uppercase.btn-primary');
								wait.waitForElement('div.tooltip.fade.bottom.in', casper,function(err, isExists) {
									if(isExists) {
										var text = casper.evaluate(function() {
											var toolText = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').getAttribute('data-original-title');
											return toolText;
										});
										var expectedText = "You don't have permission to start a new topic.";
										casper.test.assert(text.indexOf(expectedText) > -1);
									}else{
										casper.echo('not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Start New topic on subcategory page not Found','ERROR');
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify start new topic button with the private category cat1 for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 33                                      ', 'INFO');
		casper.echo('****************************************************************************************', 'INFO');
		casper.echo('*  verify start new topic button with the private category cat1 for unregistered user  *', 'INFO');
		casper.echo('****************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
						postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
							if(!err) {
								casper.echo("Topic created succcessfully","INFO");
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify start new topic button with the other category cat1 for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithOtherCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 34                                      ', 'INFO');
		casper.echo('****************************************************************************************', 'INFO');
		casper.echo('*  verify start new topic button with the other category cat1 for unregistered user    *', 'INFO');
		casper.echo('****************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
								casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
								postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
									if(!err) {
										casper.echo("Topic created succcessfully","INFO");
									}
								});
							}else{
								casper.echo('Start New topic on subcategory page not Found','ERROR');
							}
						});
					}else{
						casper.echo('cat1b not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify Reply topics  with the private sub-category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 35                                      ', 'INFO');
		casper.echo('**********************************************************************************************', 'INFO');
		casper.echo('*    Method to verify Reply topics  with the private sub-category cat1a Unregistered user    *', 'INFO');
		casper.echo('**********************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Unregistered / Not Logged In', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableReplyTopicsForSubCategory method called ','INFO');
												}
											});
											casper.then(function() {
												combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, casper, function(err) {
													if(!err) {
														casper.echo('enableStartTopicsForSubCategory method called ','INFO');
													}
												});
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Unregistered / Not Logged In',casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopics(casper, function(err) {
												if(!err) {
													casper.echo('enableReplyTopics method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
									postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
									if(!err) {
										casper.echo("User replied succcessfully","INFO");
									}
								});
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify Reply topics  with the private sub-category cat1a for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryUnregisteredUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 36                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('* Method to verify Reply topics  with the private sub-category cat1a Unregistered user Disable      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Unregistered / Not Logged In', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
								casper.test.assertExists('a[id^="topic_"]', 'Composed topic is found');
								var topic = casper.evaluate(function() {
									var name = document.querySelector('a[id^="topic_"]');
									return name.innerHTML;
								});
								casper.echo('*******************************************************','INFO');
								casper.echo('*           The name of the topic is-'+topic+        '*','INFO');
								casper.echo('*******************************************************','INFO');
								casper.click('div.panel-body.table-responsive ul li span span:nth-child(2) a');
								wait.waitForElement('form[name="posts"]', casper, function(err, isExists) {
									if(isExists) {
										casper.test.assertDoesntExist('a#sub_post_reply','Reply option not appear','INFO');
									}else {
										casper.echo('Reply option visible', 'ERROR');
									}
								});
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify reply topic button with the parent category cat1 for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 37                                      ', 'INFO');
		casper.echo('****************************************************************************************************', 'INFO');
		casper.echo('*    Method to verify reply topic button with the parent category cat1 Unregistered user Disable   *', 'INFO');
		casper.echo('****************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.click('a#topics_tab');
						postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
							if(!err) {
								casper.echo("User replied succcessfully","INFO");
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify with other sub-categories cat1b for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithOtherSubCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 38                                      ', 'INFO');
		casper.echo('****************************************************************************************************', 'INFO');
		casper.echo('*           Method to verify with other sub-categories cat1b Unregistered user Disable             *', 'INFO');
		casper.echo('****************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
									postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
									if(!err) {
										casper.echo("User replied succcessfully","INFO");
									}
								});
							}
						});
					}else{
						casper.echo('cat1b not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify Post approval with the private sub-category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 39                                      ', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		casper.echo('*    Method to verify Post approval with the private sub-category cat1a Unregistered user       *', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test,  function(err) {
			if(!err) {
				casper.echo('enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(casper, function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
						if(isExists) {
							var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
									casper.then(function() {
										combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Unregistered / Not Logged In', subCategoryId, casper, function(err, groupId) {
											if(!err) {
												combinationOfSubCategoryAndGroupPermissionsMethod.enablePostApprovalForSubCategory(groupId, casper, function(err) {
													if(!err) {
														casper.echo('enablePostApprovalForSubCategory method called ','INFO');
													}
												});
											}
										});
									});
									casper.then(function() {
										combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Unregistered / Not Logged In',casper, function(err) {
											if(!err) {
												combinationOfSubCategoryAndGroupPermissionsMethod.enableRequirePostApproval(casper, function(err) {
													if(!err) {
														casper.echo('enableRequirePostApproval method called ','INFO');
													}
												});
											}
										});
									});
								}
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(casper, function(err) {
									if(!err) {
										casper.echo('User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							casper.echo('Backend Menu not found', 'ERROR');
						}
					});
				}else {
					casper.echo('Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
								casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
								postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
									if(!err) {
										casper.echo("Topic created succcessfully and moved to approval queue","INFO");
									}
								});
							}else{
								casper.echo('Start New topic on subcategory page not Found','ERROR');
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify Post approval with the private sub-category cat1a for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryUnregisteredUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 40                                      ', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		casper.echo('* Method to verify Post approval with the private sub-category cat1a Unregistered user Disable  *', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Unregistered / Not Logged In', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disablePostApprovalForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disablePostApprovalForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
								casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
								postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
									if(!err) {
										casper.echo("Topic created succcessfully","INFO");
									}
								});
							}else{
								casper.echo('Start New topic on subcategory page not Found','ERROR');
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify  Post approval with the parent category cat1 for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 41                                      ', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		casper.echo('*    Method to verify  Post approval with the parent category cat1 Unregistered user Disable    *', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
								casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
								postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
									if(!err) {
										casper.echo("Topic created succcessfully","INFO");
									}
								});
							}else{
								casper.echo('Start New topic on subcategory page not Found','ERROR');
							}
						});
					}else{
						casper.echo('cat1a not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
};

// method to verify  Post approval with other sub-categories cat1b for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 42                                      ', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		casper.echo('*    Method to verify Post approvalwith other sub-categories cat1b Unregistered user Disable    *', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
		wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
				casper.click('li#forum_'+category_Id+' a');
				wait.waitForElement('div#category_list', casper,function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
						casper.click('li#forum_'+subCategory_Id+' a');
						wait.waitForTime(2000, casper,function(err) {
							if(!err) {
								casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
								postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
									if(!err) {
										casper.echo("Topic created succcessfully and moved to approval queue","INFO");
									}
								});
							}else{
								casper.echo('Start New topic on subcategory page not Found','ERROR');
							}
						});
					}else{
						casper.echo('cat1b not visible','ERROR');
					}
				});
			}else{
				casper.echo('cat1 not visible on category listing page','ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		postEventMemberApprovalMethod.disableApproveNewPost(casper, casper.test,  function(err) {
			if(!err) {
				casper.echo('enablePostApproval method called ','INFO');
			}
		});
	});
};

// method to verify with category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 43                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                Method to verify with category cat1 for custom user               *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup(casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.createCustomGroup(combinationOfSubCategoryAndGroupPermissionsJSON.groupName, casper, function(err) {
												if(!err) {
													casper.then(function() {
														combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup(casper, function(err) {
															if(!err) {
																combinationOfSubCategoryAndGroupPermissionsMethod.changeGroup(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin, casper, function(err) {
																});
															}
														});
													});
												}
											});
											casper.then(function() {
												combinationOfSubCategoryAndGroupPermissionsMethod.goToCustomUserPemission(casper, function(err) {
													if(!err) {
														combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory(casper, function(err) {
															if(!err) {
																casper.echo('enableViewCategory method called ','INFO');
															}
														});
													}
												});
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPage(casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
												if(!err) {
													combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, casper, function(err) {
														if(!err) {
															casper.echo('enableViewCategoryForSubCategory method called ','INFO');
														}
													});
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with registerd user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 44                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*             Method verify with sub-category cat1a for custom user                *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1a not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with the private sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 45                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*       Method to verify with the private sub-category cat1a  for custom user      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enablePrivateCategories(casper, function() {
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForElement('div.text-center.bmessage.alert-info.text-danger', casper,function(err, isExists) {
													if(isExists) {
														var actualText = casper.fetchText('div.text-center.bmessage.alert-info.text-danger');
														var expectedText = "Sorry! You don't have permission to perform this action.";
														var successMsg = actualText.substring(0, actualText.indexOf('<'));
														casper.test.assert(successMsg.indexOf(expectedText) > -1);
													}else{
														casper.echo('not visible on category listing page','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 46                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*          Method to verify with the parent category cat1 for custom user         *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 47                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*            Method to verify with other sub-categories for custom user            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 48                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*Method to verify start new topic button with the sub-category cat1a for custom user*', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup(casper, function(err) {
								if(!err) {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToCustomUserPemission(casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopics(casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopics method called ','INFO');
												}
											});
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithSubCategoryForCustomUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 49                                      ', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		casper.echo('* Method to verify start new topic button with the sub-category cat1a(Disable) for custom user  *', 'INFO');
		casper.echo('*************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														casper.mouse.move('a.pull-right.btn.btn-uppercase.btn-primary');
														wait.waitForElement('div.tooltip.fade.bottom.in', casper,function(err, isExists) {
															if(isExists) {
																var text = casper.evaluate(function() {
																	var toolText = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').getAttribute('data-original-title');
																	return toolText;
																});
																var expectedText = "You don't have permission to start a new topic.";
																casper.test.assert(text.indexOf(expectedText) > -1);
															}else{
																casper.echo('not visible on category listing page','ERROR');
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithParentCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 50                                      ', 'INFO');
		casper.echo('*****************************************************************************************', 'INFO');
		casper.echo('* Method to verify start new topic button with the parent category cat1 for custom user *', 'INFO');
		casper.echo('*****************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
												postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
													if(!err) {
														casper.echo("Topic created succcessfully","INFO");
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithOtherSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 51                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Method to verify with other sub-categories for custom user             *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
};

// method to verify Reply topic button with the sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 52                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('* Method to verify Reply topic button with the sub-category cat1a for custom user  *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup(casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.goToCustomUserPemission(casper, function(err) {
												if(!err) {
													combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopics(casper, function(err) {
														if(!err) {
															casper.echo('enableReplyTopics method called ','INFO');
														}
													});
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Reply topic button with the sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryForCustomUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 53                                      ', 'INFO');
		casper.echo('**********************************************************************************************', 'INFO');
		casper.echo('*  Method to verify Reply topic button with the sub-category cat1a(Disable) for custom user  *', 'INFO');
		casper.echo('**********************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.topic-title', 'Composed topic is found');
														var topic = casper.evaluate(function() {
															var name = document.querySelector('a.topic-title span');
															return name.innerHTML;
														});
														casper.echo('*******************************************************','INFO');
														casper.echo('*           The name of the topic is-'+topic+        '*','INFO');
														casper.echo('*******************************************************','INFO');
														casper.click('div.panel-body.table-responsive ul li span span:nth-child(2) a');
														wait.waitForElement('form[name="posts"]', casper, function(err, isExists) {
															if(isExists) {
																casper.test.assertDoesntExist('a#sub_post_reply','Reply option not appear','INFO');
															}else {
																casper.echo('Reply option visible', 'ERROR');
															}
														});
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify reply topic button with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithParentCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 54                                      ', 'INFO');
		casper.echo('***************************************************************************************', 'INFO');
		casper.echo('*  Method to verify reply topic button with the parent category cat1 for custom user  *', 'INFO');
		casper.echo('***************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.click('a#topics_tab');
												postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
													if(!err) {
														casper.echo("User replied succcessfully","INFO");
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithOtherSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 55                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Method to verify with other sub-categories for custom user             *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}
												});
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify  upload attachments with the private sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 56                                      ', 'INFO');
		casper.echo('***********************************************************************************************', 'INFO');
		casper.echo('*   Method to verify  upload attachments with the private sub-category cat1a for custom user  *', 'INFO');
		casper.echo('***********************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableUploadAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup(casper, function(err) {
								if(!err) {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToCustomUserPemission(casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachments(casper, function(err) {
												if(!err) {

												}
											});
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															combinationOfSubCategoryAndGroupPermissionsMethod.uploadAttachmentWithTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify upload attachments button with the private sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryForCustomUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 57                                      ', 'INFO');
		casper.echo('**********************************************************************************************************', 'INFO');
		casper.echo('* Method to verify upload attachments button with the private sub-category cat1a(Disable)for custom user *', 'INFO');
		casper.echo('**********************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableUploadAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableUploadAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertDoesntExist('a#fancy_attach_ i' ,'Attachment link not found','INFO');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify  upload attachments with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithParentCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 58                                      ', 'INFO');
		casper.echo('****************************************************************************************', 'INFO');
		casper.echo('*  Method to verify  upload attachments with the parent category cat1 for custom user  *', 'INFO');
		casper.echo('****************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {

							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
											combinationOfSubCategoryAndGroupPermissionsMethod.uploadAttachmentWithTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
													if(!err) {
														casper.echo("User replied succcessfully","INFO");
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithOtherSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 59                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Method to verify with other sub-categories for custom user             *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify view attachments with the private sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 60                                      ', 'INFO');
		casper.echo('********************************************************************************************', 'INFO');
		casper.echo('*  Method to verify view attachments with the private sub-category cat1a for custom user   *', 'INFO');
		casper.echo('********************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup(casper, function(err) {
								if(!err) {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToCustomUserPemission(casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachments(casper, function(err) {
												if(!err) {

												}
											});
										}
									});
								}
							});
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {

											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify view attachments with the private sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithSubCategoryForCustomUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                               Test case 61                                     ', 'INFO');
		casper.echo('***************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify view attachments with the private sub-category cat1a(Disable) for custom user *', 'INFO');
		casper.echo('***************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableViewAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableViewAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {

											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify view attachments with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithParentCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 62                                      ', 'INFO');
		casper.echo('**************************************************************************************', 'INFO');
		casper.echo('*   Method to verify view attachments with the parent category cat1 for custom user  *', 'INFO');
		casper.echo('**************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {

											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithOtherSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 63                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*            Method to verify with other sub-categories for custom user            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Post approval with the private sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      Test case 64                                     ', 'INFO');
		casper.echo('******************************************************************************************', 'INFO');
		casper.echo('*   Method to verify Post approval with the private sub-category cat1a for custom user   *', 'INFO');
		casper.echo('******************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test,  function(err) {
			if(!err) {
				casper.echo('enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(casper, function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
						if(isExists) {
							var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
									casper.then(function() {
										combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
											if(!err) {
												combinationOfSubCategoryAndGroupPermissionsMethod.enablePostApprovalForSubCategory(groupId, casper, function(err) {
													if(!err) {
														casper.echo('enablePostApprovalForSubCategory method called ','INFO');
													}
												});
											}
										});
									});
								}
							});
							casper.then(function() {
								combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup(casper, function(err) {
									if(!err) {
										combinationOfSubCategoryAndGroupPermissionsMethod.goToCustomUserPemission(casper, function(err) {
											if(!err) {
												combinationOfSubCategoryAndGroupPermissionsMethod.enableRequirePostApproval(casper, function(err) {
													if(!err) {
														casper.echo('enableRequirePostApproval method called ','INFO');
													}
												});
											}
										});
									}
								});
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(casper, function(err) {
									if(!err) {
										casper.echo('User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							casper.echo('Backend Menu not found', 'ERROR');
						}
					});
				}else {
					casper.echo('Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully and moved to approval queue","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Post approval with the private sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryForCustomUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                       Test case 65                                      ', 'INFO');
		casper.echo('***************************************************************************************************', 'INFO');
		casper.echo('*    Method to verify Post approval with the private sub-category cat1a(Disable) for custom user  *', 'INFO');
		casper.echo('***************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('New Custom Group', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disablePostApprovalForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disablePostApprovalForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Post approval with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithParentCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                       Test case 66                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*   Method to verify Post approval with the parent category cat1 for custom user   *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
		casper.then(function() {
			forumLoginMethod.logoutFromApp(casper, function() { });
		});
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategoryForCustomUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                        Test case 67                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*            Method to verify with other sub-categories for custom user            *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with custom user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully and moved to approval queue","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		postEventMemberApprovalMethod.disableApproveNewPost(casper, casper.test,  function(err) {
			if(!err) {
				casper.echo('enablePostApproval method called ','INFO');
			}
		});
	});
};

// method to verify with category cat1 for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 68                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*           Method to verify with category cat1 for pending approval user          *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail(casper, function(err) {
			if(!err) {
				casper.echo('Enable Approve Registrations And Disable Email functionality method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(casper, function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
						if(isExists) {
							var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
									casper.then(function() {
										combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
											if(!err) {
												combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, casper, function(err) {
													if(!err) {
														casper.echo('enableViewCategoryForSubCategory method called ','INFO');
													}
												});
											}
										});
									});
									casper.then(function() {
										combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Pending Approval',casper, function(err) {
											if(!err) {
												combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategory(casper, function(err) {
													if(!err) {
														casper.echo('enableViewCategory method called ','INFO');
													}
												});
											}
										});
									});
								}
							});
							casper.then(function() {
								combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroup(casper, function(err) {
									if(!err) {
										combinationOfSubCategoryAndGroupPermissionsMethod.changeGroupToPendingApproval(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin, casper, function(err) {
										});
									}
								});
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(casper, function(err) {
									if(!err) {
										casper.echo('User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							casper.echo('Backend Menu not found', 'ERROR');
						}
					});
				}else {
					casper.echo('Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with sub-category cat1a for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 69                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*          Method verify with sub-category cat1a for pending approval user         *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1a not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});

};

// method to verify with the private sub-category cat1a for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 70                                   ', 'INFO');
		casper.echo('*************************************************************************************', 'INFO');
		casper.echo('*  Method to verify with the private sub-category cat1a for pending approval user   *', 'INFO');
		casper.echo('*************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.enablePrivateCategories(casper, function() {
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForElement('div.text-center.bmessage.alert-info.text-danger', casper,function(err, isExists) {
													if(isExists) {
														var actualText = casper.fetchText('div.text-center.bmessage.alert-info.text-danger');
														var expectedText = "Sorry! You don't have permission to perform this action.";
														var successMsg = actualText.substring(0, actualText.indexOf('<'));
														casper.test.assert(successMsg.indexOf(expectedText) > -1);
													}else{
														casper.echo('not visible on category listing page','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with the parent category cat1 for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 71                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*   Method to verify with the parent category cat1 for pending approval user       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewCategoryForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 72                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*        Method to verify with other sub-categories for pending approval user      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the sub-category cat1a for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 73                                     ', 'INFO');
		casper.echo('****************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify start new topic button with the sub-category cat1a for pending approval user   *', 'INFO');
		casper.echo('****************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Pending Approval',casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopics(casper, function(err) {
												if(!err) {
													casper.echo('enableStartTopics method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the sub-category cat1a(Disable) for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategoryForPendingUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 74                                      ', 'INFO');
		casper.echo('***********************************************************************************************************', 'INFO');
		casper.echo('* Method to verify start new topic button with the sub-category cat1a(Disable) for pending approval user  *', 'INFO');
		casper.echo('***********************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableStartTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														casper.mouse.move('a.pull-right.btn.btn-uppercase.btn-primary');
														wait.waitForElement('div.tooltip.fade.bottom.in', casper,function(err, isExists) {
															if(isExists) {
																var text = casper.evaluate(function() {
																	var toolText = document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').getAttribute('data-original-title');
																	return toolText;
																});
																var expectedText = "You don't have permission to start a new topic.";
																casper.test.assert(text.indexOf(expectedText) > -1);
															}else{
																casper.echo('not visible on category listing page','ERROR');
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify start new topic button with the parent category cat1 for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForParentCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 75                                      ', 'INFO');
		casper.echo('*****************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify start new topic button with the parent category cat1 for pending approval user  *', 'INFO');
		casper.echo('*****************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
												postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
													if(!err) {
														casper.echo("Topic created succcessfully","INFO");
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForOtherSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 76                                      ', 'INFO');
		casper.echo('*****************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify with other sub-categories for pending approval user for pending approval user   *', 'INFO');
		casper.echo('*****************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableStartTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewCategoryForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
};

// method to verify Reply topic button with the sub-category cat1a for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 77                                      ', 'INFO');
		casper.echo('************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify Reply topic button with the sub-category cat1a for pending approval user   *', 'INFO');
		casper.echo('************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Pending Approval',casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableReplyTopics(casper, function(err) {
												if(!err) {
													casper.echo('enableReplyTopics method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Reply topic button with the sub-category cat1a(Disable) for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryForPendingUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 78                                      ', 'INFO');
		casper.echo('********************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify Reply topic button with the sub-category cat1a(Disable) for pending approval user  *', 'INFO');
		casper.echo('********************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableReplyTopicsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableReplyTopicsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.topic-title', 'Composed topic is found');
														var topic = casper.evaluate(function() {
															var name = document.querySelector('a.topic-title span');
															return name.innerHTML;
														});
														casper.echo('*******************************************************','INFO');
														casper.echo('*           The name of the topic is-'+topic+        '*','INFO');
														casper.echo('*******************************************************','INFO');
														casper.click('div.panel-body.table-responsive ul li span span:nth-child(2) a');
														wait.waitForElement('form[name="posts"]', casper, function(err, isExists) {
															if(isExists) {
																casper.test.assertDoesntExist('a#sub_post_reply','Reply option not appear','INFO');
															}else {
																casper.echo('Reply option visible', 'ERROR');
															}
														});
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify reply topic button with the parent category cat1 for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithParentCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 79                                      ', 'INFO');
		casper.echo('**************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify reply topic button with the parent category cat1 for pending approval user   *', 'INFO');
		casper.echo('**************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.click('a#topics_tab');
												postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
													if(!err) {
														casper.echo("User replied succcessfully","INFO");
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 80                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*       Method to verify with other sub-categories for pending approval user       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															postEventMemberApprovalMethod.composePost(casper, casper.test, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}
												});
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify  upload attachments with the private sub-category cat1a for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 81                                      ', 'INFO');
		casper.echo('********************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify  upload attachments with the private sub-category cat1a for pending approval user  *', 'INFO');
		casper.echo('********************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableUploadAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Pending Approval',casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableUploadAttachments(casper, function(err) {
												if(!err) {
													casper.echo('enableUploadAttachments method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
															combinationOfSubCategoryAndGroupPermissionsMethod.uploadAttachmentWithTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("User replied succcessfully","INFO");
															}
														});
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify upload attachments button with the private sub-category cat1a(Disable) for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryForPendingUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 82                                      ', 'INFO');
		casper.echo('***********************************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify upload attachments button with the private sub-category cat1a(Disable) for pending approval user  *', 'INFO');
		casper.echo('***********************************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableUploadAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableUploadAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertDoesntExist('a#fancy_attach_ i' ,'Attachment link not found','INFO');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify  upload attachments with the parent category cat1 for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithParentCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 83                                      ', 'INFO');
		casper.echo('*****************************************************************************************************', 'INFO');
		casper.echo('*   Method to verify  upload attachments with the parent category cat1 for pending approval user    *', 'INFO');
		casper.echo('*****************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
											combinationOfSubCategoryAndGroupPermissionsMethod.uploadAttachmentWithTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
													if(!err) {
														casper.echo("User replied succcessfully","INFO");
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithOtherSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 84                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*       Method to verify with other sub-categories for pending approval user       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify view attachments with the private sub-category cat1a for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 85                                      ', 'INFO');
		casper.echo('*********************************************************************************************************', 'INFO');
		casper.echo('*    Method to verify view attachments with the private sub-category cat1a for pending approval user    *', 'INFO');
		casper.echo('*********************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('enableViewAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Pending Approval',casper, function(err) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.enableViewAttachments(casper, function(err) {
												if(!err) {
													casper.echo('enableViewAttachments method called ','INFO');
												}
											});
										}
									});
								});
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {

											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify view attachments with the private sub-category cat1a(Disable) for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithSubCategoryForPendingUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 86                                      ', 'INFO');
		casper.echo('**************************************************************************************************************', 'INFO');
		casper.echo('*  Method to verify view attachments with the private sub-category cat1a(Disable) for pending approval user  *', 'INFO');
		casper.echo('**************************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disableViewAttachmentsForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disableViewAttachmentsForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {

											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify view attachments with the parent category cat1 for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithParentCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 87                                      ', 'INFO');
		casper.echo('**************************************************************************************************', 'INFO');
		casper.echo('*   Method to verify view attachments with the parent category cat1 for pending approval user    *', 'INFO');
		casper.echo('**************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {

											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithOtherSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 88                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*       Method to verify with other sub-categories for pending approval user       *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Post approval with the private sub-category cat1a for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 89                                      ', 'INFO');
		casper.echo('****************************************************************************************************', 'INFO');
		casper.echo('*   Method to verify Post approval with the private sub-category cat1a for pending approval user   *', 'INFO');
		casper.echo('****************************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.enableApproveNewPost(casper, casper.test,  function(err) {
			if(!err) {
				casper.echo('enablePostApproval method called ','INFO');
			}
		});
		casper.then(function() {
			forumLoginMethod.loginToForumBackEnd(casper, function(err) {
				if(!err) {
					wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
						if(isExists) {
							var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
							var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

							combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
								category_Id = categoryId;
								subCategory_Id = subCategoryId;
								if(!err) {
									casper.then(function() {
										combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
											if(!err) {
												combinationOfSubCategoryAndGroupPermissionsMethod.enablePostApprovalForSubCategory(groupId, casper, function(err) {
													if(!err) {
														casper.echo('enablePostApprovalForSubCategory method called ','INFO');
													}
												});
											}
										});
									});
									casper.then(function() {
										combinationOfSubCategoryAndGroupPermissionsMethod.goToUserGroupAndUserPemission('Pending Approval',casper, function(err) {
											if(!err) {
												combinationOfSubCategoryAndGroupPermissionsMethod.enableRequirePostApproval(casper, function(err) {
													if(!err) {
														casper.echo('enableRequirePostApproval method called ','INFO');
													}
												});
											}
										});
									});
								}
							});
							casper.then(function() {
								casper.click('a[data-tooltip-elm="ddAccount"]');
								forumLoginMethod.backEndLogout(casper, function(err) {
									if(!err) {
										casper.echo('User successfully logged out from backend','INFO');
									}
								});
							});
						} else {
							casper.echo('Backend Menu not found', 'ERROR');
						}
					});
				}else {
					casper.echo('Error : ', 'ERROR');
				}
			});
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully and moved to approval queue","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Post approval with the private sub-category cat1a(Disable) for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryForPendingUserDisable = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 90                                      ', 'INFO');
		casper.echo('*************************************************************************************************************', 'INFO');
		casper.echo('*    Method to verify Post approval with the private sub-category cat1a(Disable) for pending approval user  *', 'INFO');
		casper.echo('*************************************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disablePostApprovalForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disablePostApprovalForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify Post approval with the parent category cat1 for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithParentCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 91                                      ', 'INFO');
		casper.echo('**********************************************************************************************', 'INFO');
		casper.echo('*   Method to verify Post approval with the parent category cat1 for pending approval user   *', 'INFO');
		casper.echo('**********************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1a visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1a not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to verify with other sub-categories for pending approval user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategoryForPendingUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 92                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*        Method to verify with other sub-categories for pending approval user      *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
										casper.click('li#forum_'+category_Id+' a');
										wait.waitForElement('div#category_list', casper,function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('li#forum_'+subCategory_Id+' a' ,'cat1b visible','INFO');
												casper.click('li#forum_'+subCategory_Id+' a');
												wait.waitForTime(2000, casper,function(err) {
													if(!err) {
														casper.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', 'Start New topic on subcategory page Found','INFO');
														postEventMemberApprovalMethod.startTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic, casper, function(err) {
															if(!err) {
																casper.echo("Topic created succcessfully and moved to approval queue","INFO");
															}
														});
													}else{
														casper.echo('Start New topic on subcategory page not Found','ERROR');
													}
												});
											}else{
												casper.echo('cat1b not visible','ERROR');
											}
										});
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		postEventMemberApprovalMethod.disableApproveNewPost(casper, casper.test,  function(err) {
			if(!err) {
				casper.echo('enablePostApproval method called ','INFO');
			}
		});
	});
};

// method to delete the subcategory
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithDeleteSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                   Test case 93                                      ', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('*                  Method to verify with delete the sub catgory                    *', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		forumLoginMethod.loginToForumBackEnd(casper, function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', casper, function(err, isExists) {
					if(isExists) {
						var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
						var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

						combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, casper, function(err, categoryId, subCategoryId) {
							category_Id = categoryId;
							subCategory_Id = subCategoryId;
							if(!err) {
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup('Pending Approval', subCategoryId, casper, function(err, groupId) {
										if(!err) {
											combinationOfSubCategoryAndGroupPermissionsMethod.disablePostApprovalForSubCategory(groupId, casper, function(err) {
												if(!err) {
													casper.echo('disablePostApprovalForSubCategory method called ','INFO');
												}
											});
										}
									});
								});
								casper.then(function() {
									combinationOfSubCategoryAndGroupPermissionsMethod.deleteSubCategory(subCategory_Id, casper, function(err,subCategoryId) {
									});
								});
								casper.then(function() {
									casper.click('a[data-tooltip-elm="ddAccount"]');
									forumLoginMethod.backEndLogout(casper, function(err) {
										if(!err) {
											casper.echo('User successfully logged out from backend','INFO');
										}
									});
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error : ', 'ERROR');
			}
		});
	});
	casper.thenOpen(config.url, function() {
		//login with pending user
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username, combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.password, casper, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', casper,function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', casper,function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#forum_'+category_Id+' a' ,'cat1 visible on category listing page','INFO');
									}else{
										casper.echo('cat1 not visible on category listing page','ERROR');
									}
								});
							}else{
								casper.echo('Categories not Found','ERROR');
							}
						});
						casper.then(function() {
							forumLoginMethod.logoutFromApp(casper, function(err) {
								if(!err) {
									casper.echo('User successfully logged out from frontend','INFO');
								}
							});
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'ERROR');
			}
		});
	});
};
