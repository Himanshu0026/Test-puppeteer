/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict.';
var combinationOfSubCategoryAndGroupPermissionsJSON = require('../../testdata/combinationOfSubCategoryAndGroupPermissionsData.json');
var config = require('../../../config/config.json');
var combinationOfSubCategoryAndGroupPermissionsMethod = require('../methods/combinationOfSubCategoryAndGroupPermissions.js');
var forumLoginMethod = require('../methods/login.js');
var thumpsUpDownMethod = require('../methods/thumpsUpDown.js');
var registerMethod = require('../methods/register.js');
var topicMethod = require('../methods/topic.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var category_Id;
var subCategory_Id;
var combinationOfSubCategoryAndGroupPermissionsTestcases = module.exports = {};

// method to register users neha, isneha etc
combinationOfSubCategoryAndGroupPermissionsTestcases.registerUserTOLogin = function() {
	casper.thenOpen(config.backEndUrl, function() {
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(false);
	}).then(function() {
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(false);
	}).then(function() {
		backEndForumRegisterMethod.enableDisableHumanVerification(false);
	}).eachThen(combinationOfSubCategoryAndGroupPermissionsJSON.infoToRegisterUser, function(response) {
		var responseData = response.data;
		registerMethod.registerMember(responseData);
	});
};

// method to create a category cat1 and its sub categories cat1a and cat1b
combinationOfSubCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Method to create category and sub category ');
		backEndForumRegisterMethod.goToCategoryPage();
		casper.then(function() {
			backEndForumRegisterMethod.isCategoryExists(combinationOfSubCategoryAndGroupPermissionsJSON.category, function(err, isExists) {
				if(isExists) {
					utils.info(' Category already existed');
					combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory);
				} else {
					utils.info(' Category not exist');
					backEndForumRegisterMethod.createCategory(combinationOfSubCategoryAndGroupPermissionsJSON.category);
					casper.reload(function() {
						this.waitForText(combinationOfSubCategoryAndGroupPermissionsJSON.category.title, function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfSubCategoryAndGroupPermissionsJSON.subCategory);
						}).then(function() {
							combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory);
						});
					});
				}
			});
		});
	});
};

// method to verify with category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 1 [ Method to verify with category cat1 ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, true);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 2 [ Method verify with sub-category cat1a ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with the private sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 3 [ Method to verify with the private sub-category cat1a ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'General');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
			backEndForumRegisterMethod.enableDisablePrivateCategories(true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitForText("Sorry! You don't have permission to perform this action.");
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 4 [ Method to verify with the parent category cat1 ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 5 [ Method to verify with other sub-categories ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1b visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify start new topic button with the sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 6 [ Method to verify start new topic button with the sub-category cat1a ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, true);
						}
					});
				}).then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, true);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify start new topic button with the sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForSubCategoryDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 7 [ Method to verify start new topic button with the sub-category cat1a(Disable) ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, false);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		var msg = this.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		utils.info(msg);
		var expectedText = "You don't have permission to start a new topic.";
		this.test.assert(msg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify start new topic button with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForParentCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 8 [ Method to verify start new topic button with the parent category cat1 ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonForOtherSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 9 [ Method to verify with other sub-categories ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1b visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify Reply topic button with the sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 10 [ Method to verify Reply topic button with the sub-category cat1a ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, true);
						}
					});
				});
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, true);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', true);
		}).then(function() {
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify Reply topic button with the sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 11 [ Method to verify Reply topic button with the sub-category cat1a(Disable) ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, false);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', false);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify reply topic button with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithParentCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 12 [ Method to verify reply topic button with the parent category cat1 ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('#topics_tab' , ' Topic tab visible');
		this.click('#topics_tab');
	}).waitUntilVisible('.topics-list', function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 13 [ Method to verify with other sub-categories ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1b visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify upload attachments button with the private sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 16 [ Method to verify upload attachments button with the private sub-category cat1a(Disable) ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, true);
						}
					});
				});
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('upload_attachments_'+groupId, true);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertDoesntExist('a#fancy_attach_ i', ' Attachment link not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify Post approval with the private sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 23 [ Method to verify Post approval with the private sub-category cat1a ]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
    casper.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
      this.test.assertSelectorHasText('#ddSettings', 'Security');
      this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
      backEndForumRegisterMethod.setApproveNewPost('99');
    }).then(function() {
			var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
			var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

			combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
				category_Id = categoryId;
				subCategory_Id = subCategoryId;
				if(!err) {
					casper.then(function() {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
							if(!err) {
								backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, true);
							}
						});
					});
				}
			});
		}).then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_approval', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify Post approval with the private sub-category cat1a(Disable)
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 24 [ Method to verify Post approval with the private sub-category cat1a(Disable)]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, false);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify Post approval with the parent category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithParentCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 25 [ Method to verify Post approval with the parent category cat1 ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 26 [ Method to verify with other sub-categories ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'Security');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
    backEndForumRegisterMethod.setApproveNewPost('0');
  });
};

// method to verify with category cat1 for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 27 [ Method to verify with category cat1 for unregistered user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, true);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', true);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	});
};

// method to verify with sub category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 28 [ Method to verify with sub-category cat1a for unregistered user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
	});
};

// method to verify with sub-category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryUnregisteredUserDisabled = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 29 [ Method to verify with category cat1 for unregistered user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'General');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
			backEndForumRegisterMethod.enableDisablePrivateCategories(true);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitForText("Please login or");
};

// method to verify with category cat1 for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryUnregisteredUserDisabled = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 30 [ Method to verify with category cat1 for unregistered user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	});
};

// method to verify with other sub-categories
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategoryUnregisteredUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 31 [ Method to verify with other sub-categories Unregistered user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1b visible');
	});
};

// method to verify start new topic button with the private sub-category cat1a
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithSubCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 32 [ Method to verify with new topic button for unregistered user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, true);
						}
					});
				}).then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, true);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', true);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	});
};

// method to verify start new topic button with the private sub-category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithSubCategoryUnregisteredUserDisabled = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 33 [ Method to verify with new topic button for unregistered user Disable ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, false);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForText("Create Account");
};

// method to verify start new topic button with the private category cat1 for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 34 [ verify start new topic button with the private category cat1 for unregistered user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	});
};

// method to verify start new topic button with the other category cat1 for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicWithOtherCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 35 [ verify start new topic button with the other category cat1 for unregistered user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1b visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	});
};

// method to verify Reply topics  with the private sub-category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 36 [ Method to verify Reply topics  with the private sub-category cat1a Unregistered user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, true);
						}
					});
				});
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, true);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', true);
		}).then(function() {
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', true);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		postEventMemberApprovalMethod.composePost();
	});
};

// method to verify Reply topics  with the private sub-category cat1a for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryUnregisteredUserDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 37 [ Method to verify Reply topics  with the private sub-category cat1a Unregistered user Disable ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, false);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', false);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	});
};

// method to verify reply topic button with the parent category cat1 for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 38 [ Method to verify reply topic button with the parent category cat1 Unregistered user Disable ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', true);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('#topics_tab' , ' Topic tab visible');
		this.click('#topics_tab');
	}).waitUntilVisible('.topics-list', function() {
		postEventMemberApprovalMethod.composePost();
	});
};

// method to verify with other sub-categories cat1b for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithOtherSubCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 39 [ Method to verify with other sub-categories cat1b Unregistered user Disable ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1b visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		postEventMemberApprovalMethod.composePost();
	});
};

// method to verify Post approval with the private sub-category cat1a for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 40 [ Method to verify Post approval with the private sub-category cat1a Unregistered user ]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
    casper.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
      this.test.assertSelectorHasText('#ddSettings', 'Security');
      this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
      backEndForumRegisterMethod.setApproveNewPost('99');
    }).then(function() {
			var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
			var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

			combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
				category_Id = categoryId;
				subCategory_Id = subCategoryId;
				if(!err) {
					casper.then(function() {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
							if(!err) {
								backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, true);
							}
						});
					});
				}
			});
		}).then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_approval', true);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.');
};

// method to verify Post approval with the private sub-category cat1a for unregistered user Disable
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryUnregisteredUserDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 41 [ Method to verify Post approval with the private sub-category cat1a Unregistered user Disable ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, false);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	});
};

// method to verify  Post approval with the parent category cat1 for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 42 [ Method to verify  Post approval with the parent category cat1 Unregistered user Disable ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	});
};

// method to verify  Post approval with other sub-categories cat1b for unregistered user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategoryUnregisteredUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 43 [ Method to verify Post approval with other sub-categories cat1b Unregistered user Disable ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	});
	casper.thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'Security');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
    backEndForumRegisterMethod.setApproveNewPost('0');
  });
};

// method to create a custom group and assign a user
combinationOfSubCategoryAndGroupPermissionsTestcases.createCustomGroupAndAssignUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Method to create a custom user group and assign the user');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('a[href="/tool/members/mb/usergroup?action=edit"]', function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.createCustomGroup(userGroup);
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper',function() {
		var user = combinationOfSubCategoryAndGroupPermissionsJSON.customUserLogin.username;
		thumpsUpDownMethod.changeUserGroup(user, userGroup);
	});
};

// method to verify with category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 44 [ Method to verify with category cat1 for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, true);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 45 [ Method verify with sub-category cat1a for custom user ');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with the private sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPrivateSubCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 46 [ Method to verify with the private sub-category cat1a  for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'General');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
			backEndForumRegisterMethod.enableDisablePrivateCategories(true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitForText("Sorry! You don't have permission to perform this action.");
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithParentCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 47 [ Method to verify with the parent category cat1 for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithOtherSubCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 48 [ Method to verify with other sub-categories for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1b visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify start new topic button with the sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithSubCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 49 [ Method to verify start new topic button with the sub-category cat1a for custom user');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, true);
						}
					});
				}).then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, true);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify start new topic button with the sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithSubCategoryForCustomUserDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 50 [ Method to verify start new topic button with the sub-category cat1a(Disable) for custom user');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, false);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		var msg = this.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		utils.info(msg);
		var expectedText = "You don't have permission to start a new topic.";
		this.test.assert(msg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify start new topic button with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithParentCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 51 [ Method to verify start new topic button with the parent category cat1 for custom user');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithNewTopicButtonWithOtherSubCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 52 [ Method to verify with other sub-categories for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1b visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify Reply topic button with the sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 53 [ Method to verify Reply topic button with the sub-category cat1a for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, true);
						}
					});
				});
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, true);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', true);
		}).then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify Reply topic button with the sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithSubCategoryForCustomUserDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 54 [ Method to verify Reply topic button with the sub-category cat1a(Disable) for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, false);
						}
					});
				});
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', false);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify reply topic button with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithParentCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 55 [ Method to verify reply topic button with the parent category cat1 for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
		casper.then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('#topics_tab' , ' Topic tab visible');
		this.click('#topics_tab');
	}).waitUntilVisible('.topics-list', function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicWithOtherSubCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 56 [ Method to verify with other sub-categories for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat1b visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify upload attachments button with the private sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithUploadAttachmentsWithSubCategoryForCustomUserDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 57 [ Method to verify upload attachments button with the private sub-category cat1a(Disable)for custom user ');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, true);
						}
					});
				});
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('upload_attachments_'+groupId, true);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertDoesntExist('a#fancy_attach_ i', ' Attachment link not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify view attachments with the private sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithViewAttachmentsWithSubCategoryForCustomUserDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 58 [ Method to verify view attachments with the private sub-category cat1a(Disable) for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_attachments_'+groupId, true);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
	});
};

// method to verify Post approval with the private sub-category cat1a for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 59 [ Method to verify Post approval with the private sub-category cat1a for custom user ]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
    casper.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
      this.test.assertSelectorHasText('#ddSettings', 'Security');
      this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
      backEndForumRegisterMethod.setApproveNewPost('99');
    }).then(function() {
			var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
			var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

			combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
				category_Id = categoryId;
				subCategory_Id = subCategoryId;
				if(!err) {
					casper.then(function() {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
							if(!err) {
								backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, true);
							}
						});
					});
				}
			});
		}).then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_approval', true);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify Post approval with the private sub-category cat1a(Disable) for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithSubCategoryForCustomUserDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 60 [ Method to verify Post approval with the private sub-category cat1a(Disable) for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategoryId, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, false);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify Post approval with the parent category cat1 for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithParentCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 61 [ Method to verify Post approval with the parent category cat1 for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other sub-categories for custom user
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalWithOtherSubCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 62 [ Method to verify with other sub-categories for custom user ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' Start New topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'Security');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
    backEndForumRegisterMethod.setApproveNewPost('0');
  });
};

// method to enable pending user group and assign the user
combinationOfSubCategoryAndGroupPermissionsTestcases.enablePendingApprovalAndAssignUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(true);
	}).then(function() {
	this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper',function() {
		var user = combinationOfSubCategoryAndGroupPermissionsJSON.pendingUserLogin.username;
		thumpsUpDownMethod.changeUserGroup(user, 'Pending Approval');
	});
};

// method to enable email verification user group and assign the user
combinationOfSubCategoryAndGroupPermissionsTestcases.enableEmailVerificationAndAssignUser = function() {
	casper.thenOpen(config.backEndUrl, function() {
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(true);
	}).then(function() {
	this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper',function() {
		var user = combinationOfSubCategoryAndGroupPermissionsJSON.emailVerificationUserLogin.username;
		thumpsUpDownMethod.changeUserGroup(user, 'Pending Email Verification');
	});
};

// method to delete the subcategory
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithDeleteSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 63 [Method to verify with delete the sub catgory ]');
		var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.deleteSubCategory(subCategory_Id);
				});
			}
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
  }).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};
