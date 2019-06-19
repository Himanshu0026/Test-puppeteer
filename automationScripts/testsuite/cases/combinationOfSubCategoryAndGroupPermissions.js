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
var other_subCategory_Id;
var combinationOfSubCategoryAndGroupPermissionsTestcases = module.exports = {};

combinationOfSubCategoryAndGroupPermissionsTestcases.changePermission = function() {
	var category = combinationOfSubCategoryAndGroupPermissionsJSON.category.title;
	var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory.title;
	casper.thenOpen(config.apiLocalUrl+"/qaapi/getToken", function() {
		var json_string = JSON.parse(this.getPageContent());
		token = json_string.token;
		var cat = category;
		var subcat = subCategory;
		this.thenOpen(config.apiLocalUrl+"/qaapi/forum/getID/"+subcat+"?accesToken="+token, function() {
			var json_string2 = JSON.parse(this.getPageContent());
			var catId = json_string2.forumid;
			utils.info('the data inside the forum id'+catId);
			category_Id = catId;
			this.thenOpen(config.apiLocalUrl+"/qaapi/updateForumPermissions/"+category_Id+"/20237569/view_forum/0?accesToken="+token, function() {
				// var json_string2 = JSON.parse(this.getPageContent());
				// var catId = json_string2.forumid;
			});
		});
	});
};

// method to create a category cat1 and its sub categories cat1a and cat1b
combinationOfSubCategoryAndGroupPermissionsTestcases.createCategoryAndSubCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Method to create category and sub category ');
		backEndForumRegisterMethod.goToCategoryPage();
		casper.then(function() {
			backEndForumRegisterMethod.createCategory(combinationOfSubCategoryAndGroupPermissionsJSON.category);
			casper.reload(function() {
				this.waitForText(combinationOfSubCategoryAndGroupPermissionsJSON.category.title, function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfSubCategoryAndGroupPermissionsJSON.subCategory);
				}).then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.createSubCategory(combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory);
				});
			});
		});
	});
};

// method to verify with category cat1
combinationOfSubCategoryAndGroupPermissionsTestcases.verifyWithCategory = function(userGroup) {
	var category = combinationOfSubCategoryAndGroupPermissionsJSON.category;
	var subCategory = combinationOfSubCategoryAndGroupPermissionsJSON.subCategory;
	var otherSubCategory = combinationOfSubCategoryAndGroupPermissionsJSON.otherSubCategory;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 1 [ Method to verify with category cat1 ]');
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
		utils.info('Test case 2 [ Method verify with sub-category cat1a ]');
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		utils.info('Test case 6 [ Method to verify New Topic button with the sub-category cat1a ]');
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('hellloooooo!!!!!!!!!',function() {
		utils.info('Test case 11 [ Method to verify Reply topic button with the sub-category cat1a ]');
		postEventMemberApprovalMethod.composePost("Replied the post");
		combinationOfSubCategoryAndGroupPermissionsTestcases.changePermission();
	// }).thenOpen(config.backEndUrl, function() {
	// 	backEndForumRegisterMethod.goToCategoryPage();
	// 	casper.then(function() {
	// 		combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategory_Id, function(err, groupId) {
	// 			if(!err) {
	// 				backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
	// 			}
	// 		});
	// 	});
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		utils.info('Test case 4 [ Method to verify with the parent category cat1 ]');
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		utils.info('Test case 3 [ Method to verify with the private sub-category cat1a ]');
		utils.info('Test case 5 [ Method to verify with other sub-categories ]');
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.test.assertExists('li#forum_'+other_subCategory_Id+' a' , ' cat1b visible');
		this.test.assertSelectorHasText('#forum_'+subCategory_Id+' a.help-tooltip', 'Donors Only');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitForText("Sorry! You don't have permission to perform this action.").thenOpen(config.backEndUrl, function() {
		backEndForumRegisterMethod.goToCategoryPage();
		casper.then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategory_Id, function(err, groupId) {
				if(!err) {
					backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, true);
				}
			});
		}).then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategory_Id, function(err, groupId) {
				if(!err) {
					backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, false);
				}
			});
		}).then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategory_Id, function(err, groupId) {
				if(!err) {
					backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, false);
				}
			});
		});
	}).thenOpen(config.url, function() {
		utils.info('Test case 7 [ Method to verify New Topic button with the sub-category cat1a(Disable) ]');
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
		utils.info('Test case 11 [ Method to verify Reply topic button with the sub-category cat1a(Disable) ]');
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		//this.test.assertDoesntExist('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		this.click('#backArrowPost i');
	}).waitForSelector('#back_arrow_topic i', function() {
		utils.info('Test case 8 [ Method to verify New Topic button with the parent category cat1 ]');
		this.click('#back_arrow_topic i');
	}).waitForSelector('#forums', function() {
		this.test.assertExists('#ajax_subscription_vars a', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('#ajax_subscription_vars a').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('hellloooooo!!!!!!!!!',function() {
		utils.info('Test case 12 [ Method to verify reply topic button with the parent category cat1 ]');
		postEventMemberApprovalMethod.composePost("Replied the post");
	}).then(function() {
		this.click('#backArrowPost i');
	}).waitForSelector('#forums', function() {
		utils.info('Test case 10 [ Method to verify with other sub-categories ]');
		this.test.assertVisible('li#forum_'+other_subCategory_Id+' a' , ' cat1b visible');
		this.click('li#forum_'+other_subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('#ajax_subscription_vars a', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('#ajax_subscription_vars a').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('hellloooooo!!!!!!!!!',function() {
		utils.info('Test case 13 [ Method to verify with other sub-categories ]');
		postEventMemberApprovalMethod.composePost("Replied the post");
	}).thenOpen(config.backEndUrl, function() {
		backEndForumRegisterMethod.goToCategoryPage();
		casper.then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategory_Id, function(err, groupId) {
				if(!err) {
					backEndForumRegisterMethod.enableDisableCategoryPermissions('upload_attachments_'+groupId, false);
				}
			});
		}).then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategory_Id, function(err, groupId) {
				if(!err) {
					backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, true);
				}
			});
		}).then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategory_Id, function(err, groupId) {
				if(!err) {
					backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, true);
				}
			});
		});
	}).then(function() {
		utils.info('Test case 16 [ Method to verify upload attachments button with the private sub-category cat1a(Disable) ]');
		utils.info('Test case 23 [ Method to verify Post approval with the private sub-category cat1a ]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'Security');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
    backEndForumRegisterMethod.setApproveNewPost('99');
  }).then(function() {
		backEndForumRegisterMethod.goToCategoryPage();
		casper.then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategory_Id, function(err, groupId) {
				if(!err) {
					backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, true);
				}
			});
		});
	}).thenOpen(config.url, function() {
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
		this.test.assertExists('#ajax_subscription_vars a', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('#ajax_subscription_vars a').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.').thenOpen(config.backEndUrl, function() {
		backEndForumRegisterMethod.goToCategoryPage();
		casper.then(function() {
			combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, subCategory_Id, function(err, groupId) {
				if(!err) {
					backEndForumRegisterMethod.enableDisableCategoryPermissions('post_approval_'+groupId, false);
				}
			});
		});
	}).thenOpen(config.url, function() {
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
		this.test.assertExists('#ajax_subscription_vars a', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('#ajax_subscription_vars a').click();
		});
		topicMethod.createTopic(combinationOfSubCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('hellloooooo!!!!!!!!!',function() {
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
