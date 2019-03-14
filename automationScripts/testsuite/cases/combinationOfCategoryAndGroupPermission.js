/***These are the function which has been called in Combination of category and group permission and also will be used in other js file as per requirement**********/

'use strict.';
var combinationOfCategoryAndGroupPermissionsJSON = require('../../testdata/combinationOfCategoryAndGroupPermission.json');
var config = require('../../../config/config.json');
var topicMethod = require('../methods/topic.js');
var forumLoginMethod = require('../methods/login.js');
var combinationOfSubCategoryAndGroupPermissionsMethod = require('../methods/combinationOfSubCategoryAndGroupPermissions.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');

var combinationOfCategoryAndGroupPermissionsTestcases = module.exports = {};

var category_Id;
var subCategory_Id;

// method to verify with category cat1
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 1 [Method to verify with category cat1]');
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

// method to verify with the private category cat1
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 2 [ Method to verify with the private category cat1 ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForText("Sorry! You don't have permission to perform this action.");
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify With SubCategory Of Disabled Category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 3 [ Method to verify With SubCategory Of Disabled Category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
		this.test.assertExists('span a[href="/?forum='+subCategory_Id+'"]' , ' cat1b visible');
		this.click('span a[href="/?forum='+subCategory_Id+'"]');
	}).waitForText("Sorry! You don't have permission to perform this action.");
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other category, whether they are visible or not
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 4 [ Method to verify with other category, whether they are visible or not ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' Other category visible on category listing page');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify private category on the compose page's drop down
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDown = function(userGroup) {
	var data = combinationOfCategoryAndGroupPermissionsJSON.startTopic;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(" Test case 5 [ Method to verify private category on the compose page's drop down ] ");
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForSelector('div.post-body.pull-left', function() {
		this.sendKeys('input[name="subject"]', data.title, {keepFocus:true});
		this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce',data.content);
		});
	}).waitForSelector('#all_forums_dropdown', function() {
		this.click('#all_forums_dropdown');
		this.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	}).then(function() {
		this.click('#post_submit');
	}).waitForSelector('div.text-center.bmessage', function() {
		var actualText = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
		var expectedText = "Sorry! You don't have permission to perform this action.";
		var successMsg = actualText.substring(0, actualText.indexOf('<'));
		this.test.assert(actualText.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with category cat1 When Group Permission Disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 6 [ Method to verify with category cat1 When Group Permission Disable ]');
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
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

// method to verify with other category When Group Permission Disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 7 [ Method to verify with other category, When Group Permission Disable ] ');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' Other category visible on category listing page');
		casper.test.assertExists('li#forum_'+category_Id+' a.help-tooltip' , ' Private tooltip present');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with category cat1 When Both Permission Disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 8 [ Method to verify with category cat1 When Both Permission Disable ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
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

// method to verify with New Topic
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopic = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 10 [ Method to verify with New Topic ]');
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
				}).then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with click on New Topic button for private category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 11 [ Method to Verify with click on New Topic button for private category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		var msg = casper.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		casper.echo(msg, 'INFO');
		var expectedText = "You don't have permission to start a new topic.";
		casper.test.assert(msg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with click on New Topic button for  sub-category of private category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 12 [ Method to Verify with click on New Topic button for  sub-category of private category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;

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
		var msg = casper.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		casper.echo(msg, 'INFO');
		var expectedText = "You don't have permission to start a new topic.";
		casper.test.assert(msg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify New Topic with other categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 13 [ Method to verify New Topic with other categories ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with click on New Topic button for private category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 14 [ Method to Verify with click on New Topic button for private category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', false);
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 15 [ Method to verify New Topic with other categories When Group Permission Disable ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		var msg = casper.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		casper.echo(msg, 'INFO');
		var expectedText = "You don't have permission to start a new topic.";
		casper.test.assert(msg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with click on New Topic when both permission disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisable = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 16 [ Method to Verify with click on New Topic when both permission disable ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, false);
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', false);
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
		var msg = casper.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		casper.echo(msg, 'INFO');
		var expectedText = "You don't have permission to start a new topic.";
		casper.test.assert(msg.indexOf(expectedText) > -1);
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
	});
};

// method to Verify with reply topics option for enabled catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopic = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 17 [ Method to Verify with reply topics option for enabled catagory(cat1) ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		this.test.assertExists('#topics_tab' , ' Topic tab visible');
		this.click('#topics_tab');
	}).waitUntilVisible('.topics-list', function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with reply  on other users topics for disable catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 18 [ Method to Verify with reply on other users topics for disable catagory(cat1) ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, false);
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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with reply on own topics for disable catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 19 [ Method to Verify with reply on own topics for disable catagory(cat1) ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with reply on own topics for disable catagory(cat1) and disable group
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 20 [ Method to Verify with reply on own topics for disable catagory(cat1) and disable group ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
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

// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 22 [ Method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', false);
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

// method to verify with reply topics option for other catagory(cat1) and disable groupPermission
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroup = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 23 [ Method to verify with reply topics option for other catagory(cat1) and disable groupPermission ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with the reply topic for all categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategory = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 24 [ Method to verify with the reply topic for all categories ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', false);
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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
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
		});
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
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
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
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
		forumLoginMethod.logoutFromApp();
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
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
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
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
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

// method to verify with category cat1 for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 1 [ Method to verify with category cat1 for Unregistered Users ]');
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
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	});
};

// method to verify with the private category cat1 for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 2 [ Method to verify with the private category cat1 for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForText("Please login or ");
};

// method to verify With SubCategory Of Disabled Category for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 3 [ Method to verify With SubCategory Of Disabled Category for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
		this.test.assertExists('span a[href="/?forum='+subCategory_Id+'"]' , ' cat1b visible');
		this.click('span a[href="/?forum='+subCategory_Id+'"]');
	}).waitForText("Please login or ");
};

// method to verify with other category, whether they are visible or not for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 4 [ Method to verify with other category, whether they are visible or not for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' Other category visible on category listing page');
	});
};

// method to verify private category on the compose page's drop down for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDownForUnregisteredUsers = function(userGroup) {
	var data = combinationOfCategoryAndGroupPermissionsJSON.startTopic;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(" Test case 5 [ Method to verify private category on the compose page's drop down for Unregistered Users ]");
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
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
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForSelector('div.post-body.pull-left', function() {
		this.sendKeys('input[name="subject"]', data.title, {keepFocus:true});
		this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce',data.content);
		});
	}).waitForSelector('#all_forums_dropdown', function() {
		this.click('#all_forums_dropdown');
		this.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	}).then(function() {
		this.click('#post_submit');
	}).waitForSelector('div.text-center.bmessage', function() {
		var actualText = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
		var expectedText = "Sorry! You don't have permission to perform this action.";
		var successMsg = actualText.substring(0, actualText.indexOf('<'));
		this.test.assert(successMsg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with category cat1 When Group Permission Disable for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisableForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 6 [ Method to verify with category cat1 When Group Permission Disable for Unregistered Users ]');
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	});
};

// method to verify with other category When Group Permission Disable for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisableForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 7 [ Method to verify with other category, When Group Permission Disable for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' Other category visible on category listing page');
		casper.test.assertExists('li#forum_'+category_Id+' a.help-tooltip' , ' Private tooltip present');
	});
};

// method to verify with category cat1 When Both Permission Disable for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisableForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 8 [ Method to verify with category cat1 When Both Permission Disable for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
	});
};

// method to verify with "privacy" option for category from back end for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackendForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 9 [ Method to verify with "privacy" option for category from back end for Unregistered Users ]');
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
								casper.fillLabels('form#frmForumPrivacy', {
									'Unregistered / Not Logged In' : ''
								}, true);
								casper.wait('2000', function(err) {
								});
							});
						}
					});
				});
			}
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertExists('li#forum_'+category_Id+' a', ' cat1 visible on category listing page');
		casper.test.assertExists('li#forum_'+category_Id+' a.help-tooltip', ' Private tooltip present');
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

// method to verify with New Topic for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 10 [ Method to verify with New Topic for Unregistered Users ]');
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
				}).then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	});
};

// method to Verify with click on New Topic button for private category for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 11 [ Method to Verify with click on New Topic button for private category for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForText("Create Account");
};

// method to Verify with click on New Topic button for  sub-category of private category for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 12 [ Method to Verify with click on New Topic button for  sub-category of private category for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForText("Create Account");
};

// method to verify New Topic with other categories for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 13 [ Method to verify New Topic with other categories for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	});
};

// method to Verify with click on New Topic button for private category for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisableForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 14 [ Method to Verify with click on New Topic button for private category for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', false);
		});
	}).thenOpen(config.url, function() {
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
	});
};

// method to verify with other categories for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisableForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 15 [ Method to verify New Topic with other categories When Group Permission Disable for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForText("Create Account");
};

// method to Verify with click on New Topic when both permission disable for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisableForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 16 [ Method to Verify with click on New Topic when both permission disable for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, false);
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', false);
		});
	}).thenOpen(config.url, function() {
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
	}).waitForText("Create Account", function() {
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
	});
};

// method to Verify with reply topics option for enabled catagory(cat1) for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 17 [ Method to Verify with reply topics option for enabled catagory(cat1) for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
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

// method to Verify with reply  on other users topics for disable catagory(cat1) for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 18 [ Method to Verify with reply  on other users topics for disable catagory(cat1) for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, false);
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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	});
};

// method to Verify with reply on own topics for disable catagory(cat1) for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 19 [ Method to Verify with reply on own topics for disable catagory(cat1) for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', false);
		});
	}).thenOpen(config.url, function() {
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
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	});
};

// method to Verify with reply on own topics for disable catagory(cat1) and disable group for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroupForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 20 [ Method to Verify with reply on own topics for disable catagory(cat1) and disable group for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_replies', false);
		});
	}).thenOpen(config.url, function() {
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
	}).then(function() {
	}).thenOpen(config.backEndUrl, function() {
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
	});
};

// method to Verify with reply on subcategories topic for disable catagory(cat1) for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 21 [ Method to Verify with reply on subcategories topic for disable catagory(cat1) for Unregistered Users ]');
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
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
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

// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroupForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 22 [ Method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', false);
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

// method to verify with reply topics option for other catagory(cat1) and disable groupPermission for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroupForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 23 [ Method to verify with reply topics option for other catagory(cat1) and disable groupPermission for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
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
	});
};

// method to verify with the reply topic for all categories for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 24 [ Method to verify with the reply topic for all categories for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', false);
		}).then(function() {
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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
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
		});
	});
};

// method to verify with New Topic and post a reply for enabled category for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 25 [ Method to verify with New Topic and post a reply for enabled category for Unregistered Users ]');
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
		});
	}).thenOpen(config.url, function() {
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
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.');
};

// method to verify with New Topic and post a reply for sub categoryof enabled category for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 26 [ Method to verify with New Topic and post a reply for sub categoryof enabled category for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.');
};

// method to verify with New Topic and post a reply for disabled category for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 27 [ Method to verify with New Topic and post a reply for disabled category for Unregistered Users ]');
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
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div#category_list', function() {
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
		this.click('li#forum_'+subCategory_Id+' a');
	}).waitUntilVisible('#topics', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	});
};

// method to verify with New Topic and post a reply for enabled category for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroupForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 28 [ Method to verify with New Topic and post a reply for enabled category for Unregistered Users ]');
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
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.');
};

// method to verify with New Topic and post a reply for other category for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategoryForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 29 [ Method to verify with New Topic and post a reply for other category for Unregistered Users ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	});
};


// method to verify with the post approval for all categories for Unregistered Users
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroupForUnregisteredUsers = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 30 [ Method to verify with the post approval for all categories for Unregistered Users ]');
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
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'Security');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
    backEndForumRegisterMethod.setApproveNewPost('0');
	});
};

// method to verify with category cat1
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 1 [Method to verify with category cat1]');
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

// method to verify with the private category cat1
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 2 [ Method to verify with the private category cat1 ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
		});
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertExists('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForText("Sorry! You don't have permission to perform this action.");
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify With SubCategory Of Disabled Category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithSubCategoryOfDisabledCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 3 [ Method to verify With SubCategory Of Disabled Category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
		this.test.assertExists('span a[href="/?forum='+subCategory_Id+'"]' , ' cat1b visible');
		this.click('span a[href="/?forum='+subCategory_Id+'"]');
	}).waitForText("Sorry! You don't have permission to perform this action.");
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other category, whether they are visible or not
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 4 [ Method to verify with other category, whether they are visible or not ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' Other category visible on category listing page');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify private category on the compose page's drop down
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivateCategoryOnComposePageDropDownForCustomUser = function(userGroup) {
	var data = combinationOfCategoryAndGroupPermissionsJSON.startTopic;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(" Test case 5 [ Method to verify private category on the compose page's drop down ] ");
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForSelector('div.post-body.pull-left', function() {
		this.sendKeys('input[name="subject"]', data.title, {keepFocus:true});
		this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce',data.content);
		});
	}).waitForSelector('#all_forums_dropdown', function() {
		this.click('#all_forums_dropdown');
		this.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	}).then(function() {
		this.click('#post_submit');
	}).waitForSelector('div.text-center.bmessage', function() {
		var actualText = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
		var expectedText = "Sorry! You don't have permission to perform this action.";
		var successMsg = actualText.substring(0, actualText.indexOf('<'));
		this.test.assert(successMsg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with category cat1 When Group Permission Disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenGroupPermissionDisableForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 6 [ Method to verify with category cat1 When Group Permission Disable ]');
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
			combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
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

// method to verify with other category When Group Permission Disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithOtherCategoryWhenGroupPermissionDisableForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 7 [ Method to verify with other category, When Group Permission Disable ] ');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' Other category visible on category listing page');
		casper.test.assertExists('li#forum_'+category_Id+' a.help-tooltip' , ' Private tooltip present');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with category cat1 When Both Permission Disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithCategoryWhenBothPermissionDisableForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 8 [ Method to verify with category cat1 When Both Permission Disable ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('view_forum_'+groupId, false);
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', false);
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

// method to verify with "privacy" option for category from back end
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPrivacyOptionFromBackendForCustomUser = function(userGroup) {
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
			combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
		}).then(function() {
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'view_forum', true);
		});
	});
};

// method to verify with New Topic
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 10 [ Method to verify with New Topic ]');
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
				}).then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with click on New Topic button for private category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 11 [ Method to Verify with click on New Topic button for private category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		var msg = casper.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		casper.echo(msg, 'INFO');
		var expectedText = "You don't have permission to start a new topic.";
		casper.test.assert(msg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with click on New Topic button for  sub-category of private category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForSubCategoryOfPrivateCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 12 [ Method to Verify with click on New Topic button for  sub-category of private category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.otherSubCategory;

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
		var msg = casper.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		casper.echo(msg, 'INFO');
		var expectedText = "You don't have permission to start a new topic.";
		casper.test.assert(msg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify New Topic with other categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 13 [ Method to verify New Topic with other categories ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with click on New Topic button for private category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForPrivateCategoryWhenGropuPermissionDisableForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 14 [ Method to Verify with click on New Topic button for private category ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', false);
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with other categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicForOtherCategoryWhenGroupPermissionDisableForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 15 [ Method to verify New Topic with other categories When Group Permission Disable ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		var msg = casper.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		casper.echo(msg, 'INFO');
		var expectedText = "You don't have permission to start a new topic.";
		casper.test.assert(msg.indexOf(expectedText) > -1);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with click on New Topic when both permission disable
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithStartNewTopicWhenBothPermissionDisableForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 16 [ Method to Verify with click on New Topic when both permission disable ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('post_threads_'+groupId, false);
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_threads', false);
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
		var msg = casper.getElementAttribute('#ajax_subscription_vars a:nth-child(1)', 'title');
		casper.echo(msg, 'INFO');
		var expectedText = "You don't have permission to start a new topic.";
		casper.test.assert(msg.indexOf(expectedText) > -1);
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
	});
};

// method to Verify with reply topics option for enabled catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 17 [ Method to Verify with reply topics option for enabled catagory(cat1) ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
		this.test.assertExists('#topics_tab' , ' Topic tab visible');
		this.click('#topics_tab');
	}).waitUntilVisible('.topics-list', function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with reply  on other users topics for disable catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForDisabledCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 18 [ Method to Verify with reply on other users topics for disable catagory(cat1) ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
						if(!err) {
							backEndForumRegisterMethod.enableDisableCategoryPermissions('other_post_replies_'+groupId, false);
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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with reply on own topics for disable catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 19 [ Method to Verify with reply on own topics for disable catagory(cat1) ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify with reply on own topics for disable catagory(cat1) and disable group
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyOnOwnTopicForDisabledCategoryAndDisableGroupForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 20 [ Method to Verify with reply on own topics for disable catagory(cat1) and disable group ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
	});
};

// method to Verify with reply on subcategories topic for disable catagory(cat1)
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForSubCategoryOfDisableCategoryForCustomUser = function(userGroup) {
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
		this.test.assertExists('li#forum_'+subCategory_Id+' a' , ' cat1a visible');
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

// method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForEnabledCategoryAndDisabledGroupForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 22 [ Method to verify with reply topics option for enabled catagory(cat1) and disable groupPermission ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', false);
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

// method to verify with reply topics option for other catagory(cat1) and disable groupPermission
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForOtherCategoryAndDisabledGroupForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 23 [ Method to verify with reply topics option for other catagory(cat1) and disable groupPermission ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.otherCategory;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with the reply topic for all categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithReplyTopicForAllCategoryForCustomUser = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Test case 24 [ Method to verify with the reply topic for all categories ]');
		var category = combinationOfCategoryAndGroupPermissionsJSON.category;
		var subCategory = combinationOfCategoryAndGroupPermissionsJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
				casper.then(function() {
					combinationOfSubCategoryAndGroupPermissionsMethod.goToSubCategoryPermissionAndselectUserGroup(userGroup, category_Id, function(err, groupId) {
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
			backEndForumRegisterMethod.editGroupPermissions(userGroup, 'other_post_replies', false);
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
		this.test.assertExists('a[id^="topic_"]', ' Composed topic is found');
		this.click('a[id^="topic_"]');
	}).waitForSelector('div#posts-list', function() {
		this.test.assertNotVisible('#sub_post_reply', ' Reply option not visible');
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
		});
	});
};

// method to verify with New Topic and post a reply for enabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForCustomUser = function(userGroup) {
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with New Topic and post a reply for sub categoryof enabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledForSubCategoryForCustomUser = function(userGroup) {
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).waitForText('Thank you for your post! Your post is currently being reviewed and will be displayed on the forum once it is approved.', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with New Topic and post a reply for disabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryForCustomUser = function(userGroup) {
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
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(combinationOfCategoryAndGroupPermissionsJSON.startTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with New Topic and post a reply for enabled category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalEnabledCategoryAndDisabledGroupForCustomUser = function(userGroup) {
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
		combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
	}).then(function() {
		backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_approval', false);
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
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
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with New Topic and post a reply for other category
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalOtherCategoryForCustomUser = function(userGroup) {
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
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
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
	});
};


// method to verify with the post approval for all categories
combinationOfCategoryAndGroupPermissionsTestcases.verifyWithPostApprovalDisabledCategoryAndDisabledGroupForCustomUser = function(userGroup) {
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
		combinationOfSubCategoryAndGroupPermissionsMethod.viewCustomUserPemissions();
	}).then(function() {
		backEndForumRegisterMethod.editGroupPermissions(userGroup, 'post_approval', false);
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
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
