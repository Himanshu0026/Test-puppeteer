/***These are the function which has been called in combinationOfCategoryAndGroupPermission.js and also will be used in other js file as per requirement**********/

"use strict.";

var utils = require('../utils.js');
var combinationOfCategoryAndGroupPermissionsJSON = require('../../testdata/combinationOfCategoryAndGroupPermission.json');
var forumLoginMethod = require('../methods/login.js');
var config = require('../../../config/config.json');
var combinationOfSubCategoryAndGroupPermissionsMethod = require('../methods/combinationOfSubCategoryAndGroupPermissions.js');
var thumpsUpDownMethod = require('../methods/thumpsUpDown.js');
var registerMethod = require('../methods/register.js');
var topicMethod = require('../methods/topic.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var category_Id;
var subCategory_Id;
var other_subCategory_Id;
var other_category_Id;

var combinationOfCategoryAndGroupPermissionsTestcases = module.exports = {};

// method to create a category cat1 and its sub categories cat2a and cat1b
combinationOfCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Method to create category and sub category ');
		backEndForumRegisterMethod.goToCategoryPage();
		casper.then(function() {
			backEndForumRegisterMethod.createCategory(combinationOfCategoryAndGroupPermissionsJSON.category);
			casper.reload(function() {
				this.waitForText(combinationOfCategoryAndGroupPermissionsJSON.category.title, function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfCategoryAndGroupPermissionsJSON.subCategory);
				}).then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory);
				});
			});
		});
	});
};

// method to verify with category cat2
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory = function(userGroup) {
	var category = combinationOfCategoryAndGroupPermissionsJSON.category;
	var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;
	var otherSubCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;
	var otherCategory = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
	casper.thenOpen(config.backEndUrl, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.getIdOfSubCategory(otherSubCategory, function(err, subCategoryId) {
						if(!err) {
							other_subCategory_Id = subCategoryId;
						}
					});
				}).then(function() {
					backEndForumRegisterMethod.getIdOfCategory(otherCategory, function(err, categoryId) {
						if(!err) {
							other_category_Id = categoryId;
						}
					});
				}).then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
		utils.info('Test case 2 [ Method verify with the private category cat2 ]');
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat2 visible on category listing page');
		this.test.assertSelectorHasText('#forum_'+category_Id+' a.help-tooltip', 'Donors Only');
		this.click('li#forum_'+category_Id+' a');
	}).waitForText("Sorry! You don't have permission to perform this action.").then(function() {
		this.click('.back-message-arrow');
	}).waitForSelector('li[id^="forum_"]', function() {
		utils.info('Test case 3 [ Method verify with sub-category cat2a ]');
		this.test.assertExists('span a[href="/?forum='+subCategory_Id+'"]' , ' cat2a visible');
		this.click('span a[href="/?forum='+subCategory_Id+'"]');
	}).waitForText("Sorry! You don't have permission to perform this action.").then(function() {
		this.click('.back-message-arrow');
	}).waitForSelector('li[id^="forum_"]', function() {
		utils.info('Test case 4 [ Method verify with other category ]');
		this.test.assertVisible('li#forum_'+other_category_Id+' a' , ' General visible on category listing page');
		this.click('li#forum_'+other_category_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.click('#back_arrow_topic');
	}).waitForSelector('li[id^="forum_"]', function() {
		utils.info('Test case 5 [ Method to verify private category on the compose pages drop down ]');
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText("You don't have permission to start a new topic in this category.").then(function() {
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 8 [ Method to verify with  categories with the both the permission disable ]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertSelectorHasText('#forum_'+category_Id+' a.help-tooltip', 'Donors Only');
		this.test.assertSelectorHasText('#forum_'+other_category_Id+' a.help-tooltip', 'Donors Only');
	}).thenOpen(config.backEndUrl, function() {
		backEndForumRegisterMethod.goToCategoryPage();
	}).then(function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
			if(!err) {
				backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, true);
			}
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 6 [ Method to verify with category(cat2) ]');
		utils.info('Test case 7 [ Method to verify with other categories ]');
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertSelectorHasText('#forum_'+other_category_Id+' a.help-tooltip', 'Donors Only');
		this.test.assertSelectorDoesntHaveText('#forum_'+category_Id+' a.help-tooltip', 'Donors Only');
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', true);
		}).then(function() {
			backEndForumRegisterMethod.goToCategoryPage();
		}).then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
				if(!err) {
					backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, false);
				}
			});
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 11 [ Method to verify New Topic button with the category cat2(Disable) ]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat2 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		var msg = this.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		utils.info(msg);
		var expectedText = "You don't have permission to start a new topic.";
		this.test.assert(msg.indexOf(expectedText) > -1);
		utils.info('Test case 12 [ Method to verify New Topic button with the sub-category cat2a(Disable) ]');
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat2a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		var msg = this.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		utils.info(msg);
		var expectedText = "You don't have permission to start a new topic.";
		this.test.assert(msg.indexOf(expectedText) > -1);
	}).then(function() {
		this.click('#back_arrow_topic i');
	}).waitForSelector('#forums', function() {
		this.click('#back_arrow_topic i');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li#forum_'+other_category_Id+' a');
	}).waitUntilVisible('#topics', function() {
		utils.info('Test case 13 [   Method to verify start new topic with other categories  ]');
		this.test.assertExists('#ajax_subscription_vars a', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('#ajax_subscription_vars a').click();
		});
	}).waitForSelector('#topic-details', function() {
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', false);
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 16 [ Method to verify start new topic with other categories  ]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+other_category_Id+' a' , ' General visible on category listing page');
		this.click('li#forum_'+other_category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		var msg = this.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		utils.info(msg);
		var expectedText = "You don't have permission to start a new topic.";
		this.test.assert(msg.indexOf(expectedText) > -1);
	}).thenOpen(config.backEndUrl, function() {
		backEndForumRegisterMethod.goToCategoryPage();
	}).then(function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
			if(!err) {
				backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, true);
			}
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 15 [ Method to verify start new topic with other categories  ]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+other_category_Id+' a' , ' General visible on category listing page');
		this.click('li#forum_'+other_category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		var msg = this.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		utils.info(msg);
		var expectedText = "You don't have permission to start a new topic.";
		this.test.assert(msg.indexOf(expectedText) > -1);
		this.click('#back_arrow_topic i');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li#forum_'+category_Id+' a');
	}).waitUntilVisible('#forums', function() {
		utils.info('Test case 14 [ Method to verify start new topic with categories ]');
		this.test.assertExists('#ajax_subscription_vars a', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('#ajax_subscription_vars a').click();
		});
	}).waitForSelector('#topic-details', function() {
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).wait('2000',function() {
	}).thenOpen(config.backEndUrl, function() {
		backEndForumRegisterMethod.goToCategoryPage();
	}).then(function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
			if(!err) {
				backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, false);
			}
		});
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', true);
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 19 [ Method to Verify with reply on own topics for disable catagory cat2 ]');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div#posts-list', function() {
		postEventMemberApprovalMethod.composePost("Replied the post");
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', false);
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 20 [ Method to Verify with reply on own topics for disable catagory(cat1) ]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
		this.click('#backArrowPost i');
	}).then(function() {
		utils.info('Test case 21 [ Method to Verify with reply on subcategories topic for disable catagory(cat2) ]');
		forumLoginMethod.logoutFromApp();
	}).then(function() {
		forumLoginMethod.loginToApp(combinationOfCategoryAndGroupPermissionsJSON.userLogin.username, combinationOfCategoryAndGroupPermissionsJSON.userLogin.password);
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat2a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat2a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', true);
		}).then(function() {
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', false);
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 24 [ Method to verify with the reply topic for all categories ]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat2a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).thenOpen(config.backEndUrl, function() {
		backEndForumRegisterMethod.goToCategoryPage();
	}).then(function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
			if(!err) {
				backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, true);
			}
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 22 [ Method to Verify with reply topics option  for enabled catagory(cat2) ]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.click('#topics_tab');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		postEventMemberApprovalMethod.composePost("Replied the post");
	}).then(function() {
		this.click('#backArrowPost i');
	}).waitForSelector('#back_arrow_topic i', function() {
		this.click('#back_arrow_topic i');
	}).waitForSelector('li[id^="forum_"]', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).then(function() {
		forumLoginMethod.loginToApp(combinationOfCategoryAndGroupPermissionsJSON.userLogin.username, combinationOfCategoryAndGroupPermissionsJSON.userLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		utils.info('Test case 23 [ Method to verify with other categories ]');
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+other_category_Id+' a' , ' General visible on category listing page');
		this.click('li#forum_'+other_category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
	});
};

// method to verify with "privacy" option for category from back end
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackend = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 9 [ Method to verify with "privacy" option for category from back end ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							casper.mouse.move('li[id="'+category_Id+'"] div.select');
							casper.click('li[id="'+category_Id+'"] a.manageAction span'); // click on manage of cat1
							casper.wait('2000',function() {

							});
							casper.click('div[id="forumAction'+category_Id+'"] a.showForumPrivacy'); // click on privacy permission
							casper.waitForSelector('div#forum_privacy_dialog', function() {
								if(userGroup == 'Registered Users')	{
									casper.fillLabels('form#frmForumPrivacy', {
										'Registered Users' : ''
									}, true);
								}
							}).wait('2000', function(err) {
							});
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
		casper.test.assertExists('li#forum_'+category_Id+' a', ' cat1 visible on category listing page');
		casper.test.assertExists('li#forum_'+category_Id+' a.help-tooltip', ' Private tooltip present');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
	});
};


// method to Verify with reply on subcategories topic for disable catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 21 [ Method to Verify with reply on subcategories topic for disable catagory(cat1) ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(combinationOfCategoryAndGroupPermissionsJSON.userLogin.username, combinationOfCategoryAndGroupPermissionsJSON.userLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat2a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertVisible('li#forum_'+subCategory_Id+' a' , ' cat2a visible');
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



// method to verify with New Topic and post a reply for enabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabled = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 25 [ Method to verify with New Topic and post a reply for enabled category ]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
    casper.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
      this.test.assertSelectorHasText('#ddSettings', 'Security');
      this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
      backEndForumRegisterMethod.setApproveNewPost('99');
    }).then(function() {
			var category = combinationOfCategoryAndGroupPermissionsJSON.category;
			var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

			combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
				category_Id = categoryId;
				subCategory_Id = subCategoryId;
				if(!err) {
					casper.then(function() {
						combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		}).then(function() {
			backEndForumRegisterMethod.viewGroupPermissions(userGroup);
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', true);
		});
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
	});
};

// method to verify with New Topic and post a reply for sub categoryof enabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 26 [ Method to verify with New Topic and post a reply for sub categoryof enabled category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat2a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
	});
};

// method to verify with New Topic and post a reply for disabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 27 [ Method to verify with New Topic and post a reply for disabled category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, false);
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat2a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
	});
};

// method to verify with New Topic and post a reply for enabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 28 [ Method to verify with New Topic and post a reply for enabled category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_approval', false);
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
	});
};

// method to verify with New Topic and post a reply for other category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 29 [ Method to verify with New Topic and post a reply for other category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
	});
};


// method to verify with the post approval for all categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 30 [ Method to verify with the post approval for all categories ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, false);
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
		backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_approval', false);
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
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
