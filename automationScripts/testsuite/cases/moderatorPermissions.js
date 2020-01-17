/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict.';
var moderatorPermissionsJSON = require('../../testdata/moderatorPermissions.json');
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var topicMethod = require('../methods/topic.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var moveTopicAndPostMethod = require('../methods/moveTopicAndPost.js');
var pollMethod = require('../methods/poll.js');
var moderatorPermissionsMethod = require('../methods/moderatorPermissions.js');
var category_Id;
var moderatorPermissionsTestcases = module.exports = {};

// method to create a topic
moderatorPermissionsTestcases.createTopic = function(userDetails, category) {
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(userDetails.username, userDetails.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopicForDifferentCategory(category);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to create a category General
moderatorPermissionsTestcases.createCategoryTestCase = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' * Method to create category *');
		backEndregisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function() {
		backEndregisterMethod.isCategoryExists(moderatorPermissionsJSON.otherCategory, function(err, isExists) {
			if(isExists) {
				utils.info(' Category already existed');
			} else {
				utils.info(' Category not exist');
				casper.then(function() {
					backEndregisterMethod.createCategory(moderatorPermissionsJSON.otherCategory);
				});
			}
		});
	});
};

// method to Verfiy with Add a moderator for category(cat1) by scenario 1
moderatorPermissionsTestcases.addModeratorByScenarioOne = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 1 [Method to Verfiy with Add a moderator for category(cat1) by scenario 1]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddModerator(category_Id);
				}).then(function() {
					var user = moderatorPermissionsJSON.registeredUserLogin.username;
					moderatorPermissionsMethod.FillModeratorDetails(user, category_Id);
				});
			}
		});
	});
};

// method to Verfiy with Add a moderator for category(cat1) by scenario 2
moderatorPermissionsTestcases.addModeratorByScenarioTwo = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 2 [Method to Verfiy with Add a moderator for category(cat1) by scenario 2]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				casper.test.assertExists('a.button.addForumModeratorButton', ' New Moderator button found');
				casper.click('a.button.addForumModeratorButton');
				casper.waitUntilVisible('#add_mod_dialog', function() {
					utils.info("Add Moderator form opened");
					var user = moderatorPermissionsJSON.adminUserLogin.username;
					moderatorPermissionsMethod.FillModeratorDetails(user, category_Id);
				});
			}
		});
	});
};

// method to Verfiy with delete a moderator for category(General)
moderatorPermissionsTestcases.deleteModerator = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 3 [Method to Verfiy with delete a moderator for category(cat1)] ');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.clickOnRemoveButtonModerator(category_Id);
			}
		});
	});
};

// method to verify with add same moderator in two different category(cat1 and cat 2) by scenario 1
moderatorPermissionsTestcases.verifyAddModeratorInTwoDifferentCategoryByScenarioOne = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 4 [Method to verify with add same moderator in two different category(cat1 and cat 2) by scenario 1]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddModerator(category_Id);
				}).then(function() {
					var user = moderatorPermissionsJSON.registeredUserLogin.username;
					moderatorPermissionsMethod.FillModeratorDetails(user, category_Id);
				});
			}
		});
	}).then(function() {
		this.reload(function() {
			var category = moderatorPermissionsJSON.otherCategory;
			moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
				category_Id = categoryId;
				if(!err) {
					moderatorPermissionsMethod.goToModerator(category_Id);
					casper.then(function() {
						moderatorPermissionsMethod.clickOnAddModerator(category_Id);
					}).then(function() {
						var user = moderatorPermissionsJSON.registeredUserLogin.username;
						casper.sendKeys('input[name="user"]', user, {reset:true});
						casper.fillSelectors('form[name="posts"]', {
							'select[name="forum_id"]': category_Id
						}, false);
					});
				}
			});
		});
	}).then(function() {
		casper.test.assertExists('button.button.btn-m.btn-blue.pull-right','Save button Found');
		casper.click('button.button.btn-m.btn-blue.pull-right');
	}).then(function() {
		moderatorPermissionsMethod.waitForLoadingMessage();
		/*this.test.assertExists('#copy_perms');
		moderatorPermissionsMethod.enableCopyPermissionOfModerator(function(err){
		if(!err) {
		this.test.assertExists('div.ui-dialog-buttonset button','Save button Found');
		this.click('div.ui-dialog-buttonset button');
		moderatorPermissionsMethod.waitForLoadingMessage();
	}
});*/
});
};

// method to verify with add same moderator in two different category(cat1 and cat 2) by scenario 2
moderatorPermissionsTestcases.verifyAddModeratorInTwoDifferentCategoryByScenarioTwo = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 5 [Method to verify with add same moderator in two different category(cat1 and cat 2) by scenario 2]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddModerator(category_Id);
				}).then(function() {
					var user = moderatorPermissionsJSON.registeredUserLogin.username;
					moderatorPermissionsMethod.FillModeratorDetails(user, category_Id);
				});
			}
		});
	}).then(function() {
		this.reload(function() {
			var category = moderatorPermissionsJSON.otherCategory;
			moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
				category_Id = categoryId;
				if(!err) {
					casper.test.assertExists('a.button.addForumModeratorButton', ' New Moderator button found');
					casper.click('a.button.addForumModeratorButton');
					casper.waitUntilVisible('#add_mod_dialog', function() {
						utils.info("Add Moderator form opened");
						var user = moderatorPermissionsJSON.registeredUserLogin.username;
						moderatorPermissionsMethod.FillModeratorDetails(user, category_Id);
					});
				}
			});
		});
	}).then(function() {
		casper.test.assertExists('button.button.btn-m.btn-blue.pull-right','Save button Found');
		casper.click('button.button.btn-m.btn-blue.pull-right');
	}).then(function() {
		moderatorPermissionsMethod.waitForLoadingMessage();
		/*this.test.assertExists('#copy_perms');
		moderatorPermissionsMethod.enableCopyPermissionOfModerator(function(err){
		if(!err) {
		this.test.assertExists('div.ui-dialog-buttonset button','Save button Found');
		this.click('div.ui-dialog-buttonset button');
		moderatorPermissionsMethod.waitForLoadingMessage();
	}
});*/
});
};

// method to verify with delete moderator"when same moderator added in two different category -> "from this category(cat1)"
moderatorPermissionsTestcases.deleteModeratorFromThisCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 6 [Method to verify with delete moderator"when same moderator added in two different category]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.clickOnRemoveButtonModerator(category_Id);
			}
		});
	}).then(function() {
		this.test.assertExists('div#tooltipRemoveModerator a.remove_mod','From This Category');
		this.test.assertExists('a#remove_mod_all','From All Categories');
		this.mouse.move('div#tooltipRemoveModerator a.remove_mod');
		this.click('div#tooltipRemoveModerator a.remove_mod');
	});
};

// method to verify with delete moderator"when same moderator added in two different category -> "from all category(cat1)"
moderatorPermissionsTestcases.deleteModeratorFromAllCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 7 [Method to verify with delete moderator"when same moderator added in two different category]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.clickOnRemoveButtonModerator(category_Id);
			}
		});
	}).then(function() {
		this.test.assertExists('div#tooltipRemoveModerator a.remove_mod','From This Category');
		this.test.assertExists('a#remove_mod_all','From All Categories');
		this.mouse.move('a#remove_mod_all');
		this.click('a#remove_mod_all');
	});
};

// method to verify with member title (add html tags)
moderatorPermissionsTestcases.memberTitleWithTag = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 8 [Method to verify with member title (add html tags)]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					casper.sendKeys('input[name="usertitle"]', '<b>Moderator</b>', {reset:true});
					casper.sendKeys('input[name="usertitle"]', casper.page.event.key.Enter , {keepFocus: true});
				}).then(function() {
					moderatorPermissionsMethod.waitForLoadingMessage();
				});
			}
		});
	});
};

// method to verify with member title (without html tags)
moderatorPermissionsTestcases.memberTitleWithoutTag = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 9 [Method to verify with member title (without html tags)]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					casper.sendKeys('input[name="usertitle"]', 'Moderator', {reset:true});
					casper.sendKeys('input[name="usertitle"]', casper.page.event.key.Enter , {keepFocus: true});
				}).then(function() {
					moderatorPermissionsMethod.waitForLoadingMessage();
				});
			}
		});
	});
};

// method to verify with remove moderator title
moderatorPermissionsTestcases.removeModeratorTitle = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 10 [Method to verify with remove moderator title]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					casper.sendKeys('input[name="usertitle"]', '', {reset:true});
					casper.sendKeys('input[name="usertitle"]', casper.page.event.key.Enter , {keepFocus: true});
				}).then(function() {
					moderatorPermissionsMethod.waitForLoadingMessage();
				});
			}
		});
	});
};

// method to Verify by edit post from category(General)
moderatorPermissionsTestcases.verifyEnableEditPostForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 1a [Method to Verify by edit post from category(General)]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('a', true);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		casper.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a[id^="posttoggle_"]', 'Drop Down found');
		this.click('a[id^="posttoggle_"] i');
	}).waitUntilVisible('#edit_post_request', function() {
		this.click('#edit_post_request');
	}).waitForSelector('#message1_ifr', function() {
		this.test.assertExists('#message1_ifr', 'message1-ifr found So the post is editable');
		this.withFrame('message1_ifr', function() {
			this.sendKeys('#tinymce', "Hello I am Moderator and edited the post", {reset:true});
		});
	}).then(function() {
		this.click('div.form-group.cleared input[name="save"]');
		this.wait('1000',function () {
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by edit post from other category
moderatorPermissionsTestcases.verifyEnableEditPostForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 1b [Method to Verify by edit post from other category]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		casper.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a[id^="posttoggle_"]', 'Drop Down found');
		this.click('a[id^="posttoggle_"] i');
	}).waitUntilVisible('div[id^="post_list_"] ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('#edit_post_request', 'Edit button not found so post is not editable');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by edit post from category(cat1)
moderatorPermissionsTestcases.verifyDisableEditPostForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 2a [Method to Verify by edit post from category(cat1)]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission("a", false);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		casper.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a[id^="posttoggle_"]', 'Drop Down found');
		this.click('a[id^="posttoggle_"] i');
	}).waitUntilVisible('div[id^="post_list_"] ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('#edit_post_request', 'Edit button not found so post is not editable');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by edit post from other category
moderatorPermissionsTestcases.verifyDisableEditPostForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 2b [Method to Verify by edit post from other category]');
		utils.info('Test case 3b [Method to Verify by delete post from category(cat1)]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		casper.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a[id^="posttoggle_"]', 'Drop Down found');
		this.click('a[id^="posttoggle_"] i');
	}).waitUntilVisible('div[id^="post_list_"] ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('#edit_post_request', 'Edit button not found so post is not editable');
		this.test.assertDoesntExist('a[id^="delete_first_post_"] span', 'Delete button not found so post is not deleted');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by delete post from category(cat1)
moderatorPermissionsTestcases.verifyEnableDeletePostForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 3a [Method to Verify by delete post from category(cat1)]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('b', true);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		casper.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a[id^="posttoggle_"]', 'Drop Down found');
		this.click('a[id^="posttoggle_"] i');
	}).waitUntilVisible('div[id^="post_list_"] ul.dropdown-menu.right', function() {
		this.test.assertExists('a[id^="delete_first_post_"] span', 'Delete button found');
		this.click('a[id^="delete_first_post_"] span');
	}).waitForSelector('div.topics-list', function() {

	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by delete post from category(cat1)
moderatorPermissionsTestcases.verifyEnableDeletePostForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 3b [Method to Verify by delete post from category(cat1)]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		casper.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a[id^="posttoggle_"]', 'Drop Down found');
		this.click('a[id^="posttoggle_"] i');
	}).waitUntilVisible('div[id^="post_list_"] ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('a[id^="delete_first_post_"] span', 'Delete button not found so post is not deleted');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with delete post from cat1 by select one post by check box
moderatorPermissionsTestcases.verifyEnableDeleteOnePostForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 3c [Method to verify with delete post from cat1 by select one post by check box]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('#firstpid', 'Checkbox found');
		this.click('#firstpid');
	}).waitUntilVisible('#posts-menu', function() {
		this.test.assertExists('#deleteposts', 'Delete button found');
		this.click('#deleteposts');
	}).waitForSelector('div.topics-list', function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with delete topic from cat1 by select one post by check box
moderatorPermissionsTestcases.verifyEnableDeleteOneTopicForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 3d [Method to verify with delete One topic from cat1 by check box]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('li input[name="id"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.test.assertExists('#delete i', 'Delete button found');
		this.click('#delete i');
	}).waitForSelector('div.topics-list', function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with delete all topic from cat1 by select one post by check box
moderatorPermissionsTestcases.verifyEnableDeleteAllTopicForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 3e [Method to verify with delete all topic from cat1  by check box]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('input[name="allbox"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.test.assertExists('#delete i', 'Delete button found');
		this.click('#delete i');
	}).waitForSelector('div.topics-list', function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with delete topic from other category by select one post by check box
moderatorPermissionsTestcases.verifyEnableDeleteTopicForOtherCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 3f [Method to verify with delete topic from other category by check box]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.test.assertDoesntExist('li input[name="id"]', 'Checkbox not present');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with delete post by drop down by cat1 Disable
moderatorPermissionsTestcases.verifyDisableDeletePostForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 4a [Method to verify with delete post by drop down by cat1 Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('b', false);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		casper.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a[id^="posttoggle_"]', 'Drop Down found');
		this.click('a[id^="posttoggle_"] i');
	}).waitUntilVisible('div[id^="post_list_"] ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('a[id^="delete_first_post_"] span', 'Delete button not found so post is not deleted');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by delete post from other category by drop down Disable
moderatorPermissionsTestcases.verifyDisableDeletePostForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 4b [Method to Verify by delete post from other category by drop down Disable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		casper.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a[id^="posttoggle_"]', 'Drop Down found');
		this.click('a[id^="posttoggle_"] i');
	}).waitUntilVisible('div[id^="post_list_"] ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('a[id^="delete_first_post_"] span', 'Delete button not found so post is not deleted');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by delete One post from category(cat1) by check box Disable
moderatorPermissionsTestcases.verifyDisableDeleteOnePostForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 4c [Method to Verify by delete One post from category by check box Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertVisible('li#forum_'+category_Id+' a' , ' General visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('#firstpid', 'Checkbox found');
		this.click('#firstpid');
	}).waitUntilVisible('#posts-menu', function() {
		//this.test.assertDoesntExist('#deleteposts', 'Delete button not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by delete One topic from category(cat1) by check box Disable
moderatorPermissionsTestcases.verifyDisableDeleteOneTopicForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 4d [Method to Verify by delete One topic from category(cat1) by check box Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('li input[name="id"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.test.assertDoesntExist('#delete i', 'Delete button not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by delete all topic from other category by check box Disable
moderatorPermissionsTestcases.verifyDisableDeleteAllTopicForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 4e [Method to Verify by delete all topic from other category by check box Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('input[name="allbox"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.test.assertDoesntExist('#delete i', 'Delete button not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Verify by delete post from other category by by check box Disable
moderatorPermissionsTestcases.verifyDisableDeleteTopicForOtherCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 4f [Method to Verify by delete post from other category by by check box Disable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.test.assertDoesntExist('li input[name="id"]', 'Checkbox not present');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move post from category(cat1) Enable
moderatorPermissionsTestcases.verifyEnableMovePostForModeratorCategory = function() {
	var cat;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 5a [Method to verify by move post from category(cat1) Enable]');
		var category = moderatorPermissionsJSON.category;
		var postId;
		var otherCategory = moderatorPermissionsJSON.otherCategory;

		moderatorPermissionsMethod.goToCategoryPageAndGetId(otherCategory, function(err, categoryId) {
			cat = categoryId;
			if(!err) {
			}
		});
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('d', true);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		postId = this.evaluate(function() {
			var id =  document.querySelector('span[id^="post_message_"]').getAttribute('id');
			return id;
		});
		this.test.assertExists('.topic-tools i.icon.icon-shield', 'Shield icon found');
		this.click('.topic-tools i.icon.icon-shield');
	}).waitUntilVisible('div.dropdown.open ul.dropdown-menu.left', function() {
		this.test.assertExists('i.glyphicon.glyphicon-right-arrow', 'move arrow found');
		this.click('i.glyphicon.glyphicon-right-arrow');
	}).waitForSelector('form[name="admindd"]', function() {
		moveTopicAndPostMethod.fillMoveTopicDetails(cat);
	}).then(function() {
		this.test.assertDoesntExist(postId, 'post moved to other category');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move post from other category Enable
moderatorPermissionsTestcases.verifyEnableMovePostForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 5b [Method to verify by move post from other category Enable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		casper.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		casper.test.assertDoesntExist('.topic-tools i.icon.icon-shield', 'Shield icon not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with move post from cat1 by select one post by check box Enable
moderatorPermissionsTestcases.verifyEnableMoveOnePostForModeratorCategoryByCheckbox = function() {
	var cat;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 5c [Method to verify with move post from cat1 by select one post by check box Enable]');
		var category = moderatorPermissionsJSON.category;
		var postId;
		var otherCategory = moderatorPermissionsJSON.otherCategory;

		moderatorPermissionsMethod.goToCategoryPageAndGetId(otherCategory, function(err, categoryId) {
			cat = categoryId;
			if(!err) {
			}
		});
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		postId = casper.evaluate(function() {
			var id =  document.querySelector('a[id^="topic_"]').getAttribute('id');
			return id;
		});
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('#firstpid', 'Checkbox found');
		this.click('#firstpid');
	}).waitUntilVisible('#posts-menu', function() {
		this.click('#moveposts');
	}).waitForSelector('form[name="movePost"]', function() {
		moveTopicAndPostMethod.fillMovePostDetails(cat, 'New Topic');
	}).then(function() {
		this.test.assertDoesntExist(postId, 'post moved to other category');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move topic from category(cat1) Enable
moderatorPermissionsTestcases.verifyEnableMoveOneTopicForModeratorCategoryByCheckbox = function() {
	var cat;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 5d [Method to verify by move topic from category(cat1) Enable]');
		var category = moderatorPermissionsJSON.category;
		var topicHref;
		var otherCategory = moderatorPermissionsJSON.otherCategory;

		moderatorPermissionsMethod.goToCategoryPageAndGetId(otherCategory, function(err, categoryId) {
			cat = categoryId;
			if(!err) {
			}
		});
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		topicHref = casper.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		this.click('li input[name="id"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.click('#move i');
	}).waitForSelector('form[name="admindd"]', function() {
		moveTopicAndPostMethod.fillMoveTopicDetails(cat);
	}).then(function() {
		this.test.assertDoesntExist('a[href="'+topicHref+'"]', 'Topic moved to other category');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move all topic from category(cat1) Enable
moderatorPermissionsTestcases.verifyEnableMoveAllTopicForModeratorCategoryByCheckbox = function() {
	var cat;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 5e [Method to verify by move all topic from category(cat1) Enable]');
		var category = moderatorPermissionsJSON.category;
		var topicHref;
		var otherCategory = moderatorPermissionsJSON.otherCategory;

		moderatorPermissionsMethod.goToCategoryPageAndGetId(otherCategory, function(err, categoryId) {
			cat = categoryId;
			if(!err) {
			}
		});
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		topicHref = casper.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		this.click('input[name="allbox"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.click('#move i');
	}).waitForSelector('form[name="admindd"]', function() {
		moveTopicAndPostMethod.fillMoveTopicDetails(cat);
	}).then(function() {
		this.test.assertDoesntExist('a[href="'+topicHref+'"]', 'Topic moved to other category');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move topic from other category enable
moderatorPermissionsTestcases.verifyEnableMoveTopicForOtherCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 5f [Method to verify by move topic from other category enable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.test.assertDoesntExist('li input[name="id"]', 'Checkbox not present');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move post from category(cat1) Disable
moderatorPermissionsTestcases.verifyDisableMovePostForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 6a [Method to verify by move post from category(cat1) Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('d', false);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('.topic-tools i.icon.icon-shield', 'Shield icon found');
		this.click('.topic-tools i.icon.icon-shield');
	}).waitUntilVisible('div.dropdown.open ul.dropdown-menu.left', function() {
		this.test.assertDoesntExist('i.glyphicon.glyphicon-right-arrow', 'move arrow found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move post from other category Disable
moderatorPermissionsTestcases.verifyDisableMovePostForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 6b [Method to verify by move post from other category Disable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('.topic-tools i.icon.icon-shield', 'Shield icon not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with move post from cat1 by select one post by check box Disable
moderatorPermissionsTestcases.verifyDisableMoveOnePostForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 6c [Method to verify with move post from cat1 by select one post by check box Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('#firstpid', 'Checkbox found');
		this.click('#firstpid');
	}).waitUntilVisible('#posts-menu', function() {
		this.test.assertDoesntExist('#moveposts', 'Move Button not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move topic from category(cat1) Disable
moderatorPermissionsTestcases.verifyDisableMoveOneTopicForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 6d [Method to verify by move topic from category(cat1) Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		var topicHref = this.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		this.click('li input[name="id"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.test.assertDoesntExist('#move i', 'Move Button not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move all topic from category(cat1) Disable
moderatorPermissionsTestcases.verifyDisableMoveAllTopicForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 6e [Method to verify by move all topic from category(cat1) Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		var topicHref = this.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		this.click('input[name="allbox"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.test.assertDoesntExist('#move i', 'Move Button not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by move topic from other category disable
moderatorPermissionsTestcases.verifyDisableMoveTopicForOtherCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 6f [Method to verify by move topic from other category disable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.test.assertDoesntExist('li input[name="id"]', 'Checkbox not present');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by lock topic from category(cat1) Enable
moderatorPermissionsTestcases.verifyEnableLockTopicForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 7a [Method to verify by lock topic from category(cat1) Enable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('e', true);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		var postId = casper.evaluate(function() {
			var id =  document.querySelector('span[id^="post_message_"]').getAttribute('id');
			return id;
		});
		this.test.assertExists('.topic-tools i.icon.icon-shield', 'Shield icon found');
		this.click('.topic-tools i.icon.icon-shield');
	}).waitUntilVisible('div.dropdown.open ul.dropdown-menu.left', function() {
		this.test.assertExists('i.glyphicon.glyphicon-lock', 'Lock tab found');
		this.click('i.glyphicon.glyphicon-lock');
	}).waitForSelector('div.alert.alert-warning', function() {
		//casper.test.assertExists('i.glyphicon.glyphicon-lock', 'Lock tab found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by lock topic from other category Enable
moderatorPermissionsTestcases.verifyEnableLockTopicForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 7b [Method to verify by lock topic from other category Enable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('.topic-tools i.icon.icon-shield', 'Shield icon not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Lock Topic from category(cat1) Disable
moderatorPermissionsTestcases.verifyDisableLockTopicForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 8a [Method to verify by Lock Topic from category(cat1) Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('e', false);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('.topic-tools i.icon.icon-shield', 'Shield icon found');
		this.click('.topic-tools i.icon.icon-shield');
	}).waitUntilVisible('div.dropdown.open ul.dropdown-menu.left', function() {
		this.test.assertDoesntExist('i.glyphicon.glyphicon-lock', 'Lock tab not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Lock Topic from other category Disable
moderatorPermissionsTestcases.verifyDisableLockTopicForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 8b [Method to verify by Lock Topic from other category Disable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('.topic-tools i.icon.icon-shield', 'Shield icon not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Pin topic from category(cat1) Enable
moderatorPermissionsTestcases.verifyEnablePinTopicForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 9a [Method to verify by Pin topic from category(cat1) Enable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('f', true);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		var postId = casper.evaluate(function() {
			var id =  document.querySelector('span[id^="post_message_"]').getAttribute('id');
			return id;
		});
		this.test.assertExists('.topic-tools i.icon.icon-shield', 'Shield icon found');
		this.click('.topic-tools i.icon.icon-shield');
	}).waitUntilVisible('div.dropdown.open ul.dropdown-menu.left', function() {
		this.test.assertExists('i.icon.glyphicon-pushpin', 'pin tab found');
		this.click('i.icon.glyphicon-pushpin');
	}).wait('1000', function() {

	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Pin topic from other category Enable
moderatorPermissionsTestcases.verifyEnablePinTopicForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 9b [Method to verify by Pin topic from other category Enable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('.topic-tools i.icon.icon-shield', 'Shield icon not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with Pin topic from cat1 by check box Enable
moderatorPermissionsTestcases.verifyEnablePinTopicForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 9c [Method to verify with Pin topic from cat1 by check box Enable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		var topicHref = casper.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		this.click('input[name="allbox"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.click('i.icon.glyphicon-pushpin');
	}).waitForSelector('div#topics-menu span.dropdown.open ul', function() {
		this.test.assertExists('a#pin', 'pin tab found');
		this.click('a#pin');
	}).wait('1000', function() {

	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Pin Topic from category(cat1) Disable
moderatorPermissionsTestcases.verifyDisablePinTopicForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 10a [Method to verify by Pin Topic from category(cat1) Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('f', false);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('.topic-tools i.icon.icon-shield', 'Shield icon found');
		this.click('.topic-tools i.icon.icon-shield');
	}).waitUntilVisible('div.dropdown.open ul.dropdown-menu.left', function() {
		this.test.assertDoesntExist('i.icon.glyphicon-pushpin', 'pin tab not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by pin Topic from other category Disable
moderatorPermissionsTestcases.verifyDisablePinTopicForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 10b [Method to verify by Pin Topic from other category Disable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('.topic-tools i.icon.icon-shield', 'Shield icon not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify with Pin topic from cat1 by check box Disable
moderatorPermissionsTestcases.verifyDisablePinTopicForModeratorCategoryByCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 10c [Method to verify with Pin topic from cat1 by check box Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		var topicHref = this.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		this.click('input[name="allbox"]');
	}).waitUntilVisible('#topics-menu', function() {
		this.test.assertDoesntExist('i.icon.glyphicon-pushpin', 'pin tab found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Add Poll from category(cat1) Enable
moderatorPermissionsTestcases.verifyEnableAddPollForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 11a [Method to verify by Add Poll from category(cat1) Enable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('l', true);
				});
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		var postId = casper.evaluate(function() {
			var id =  document.querySelector('span[id^="post_message_"]').getAttribute('id');
			return id;
		});
		this.test.assertExists('.topic-tools i.icon.icon-shield', 'Shield icon found');
		this.click('.topic-tools i.icon.icon-shield');
	}).waitUntilVisible('div.dropdown.open ul.dropdown-menu.left', function() {
		this.test.assertExists('i.glyphicon.glyphicon-stats', 'Add poll tab found');
		this.click('i.glyphicon.glyphicon-stats');
	}).wait('1000', function() {
		pollMethod.createPoll(moderatorPermissionsJSON.pollData);
	}).wait('1000', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Add Poll from other category Enable
moderatorPermissionsTestcases.verifyEnableAddPollForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 11b [Method to verify by Add Poll from other category Enable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).then(function() {
		moderatorPermissionsTestcases.createTopic(moderatorPermissionsJSON.adminUserLogin, category_Id);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('.topic-tools i.icon.icon-shield', 'Shield icon not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Add Poll from category(cat1) Disable
moderatorPermissionsTestcases.verifyDisableAddPollForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 12a [Method to verify by Add Poll from category(cat1) Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('l', false);
				});
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('.topic-tools i.icon.icon-shield', 'Shield icon found');
		this.click('.topic-tools i.icon.icon-shield');
	}).waitUntilVisible('div.dropdown.open ul.dropdown-menu.left', function() {
		this.test.assertDoesntExist('i.glyphicon.glyphicon-stats', 'Add poll tab not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Edit Poll from category(cat1) Enable
moderatorPermissionsTestcases.verifyEnableEditPollForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 13a [Method to verify by Edit Poll from category(cat1) Enable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('m', true);
				});
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a.dropdown-toggle.text-muted i', 'Dropdown for poll found');
		this.click('a.dropdown-toggle.text-muted i');
	}).waitUntilVisible('div.post-edit.dropdown.pull-right.open', function() {
		this.test.assertExists('a[href^="/poll/polledit"] i.glyphicon.glyphicon-pencil', 'Dropdown menu found');
		this.click('a[href^="/poll/polledit"] i.glyphicon.glyphicon-pencil');
	}).wait('1000', function() {
		this.sendKeys('#poll_question','Best PM nominee');
		this.click('#save_poll');
	}).wait('1000', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Edit Poll from other category enable
moderatorPermissionsTestcases.verifyEnableEditPollForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 13b [Method to verify by Edit Poll from other category Enable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('a.dropdown-toggle.text-muted i', 'Dropdown for poll not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Edit Poll from category(cat1) Disable
moderatorPermissionsTestcases.verifyDisableEditPollForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 14a [Method to verify by Edit Poll from category(cat1) Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('m', false);
				});
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a.dropdown-toggle.text-muted i', 'Dropdown for poll found');
		this.click('a.dropdown-toggle.text-muted i');
	}).waitUntilVisible('div.post-edit.dropdown.pull-right.open', function() {
		this.test.assertDoesntExist('a[href^="/poll/polledit"] i.glyphicon.glyphicon-pencil', 'Edit tab not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Edit Poll from other category Disable
moderatorPermissionsTestcases.verifyDisableEditPollForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 14b [Method to verify by Edit Poll from other category Disable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('a.dropdown-toggle.text-muted i', 'Dropdown for poll not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Delete Poll from category(cat1) Enable
moderatorPermissionsTestcases.verifyEnableDeletePollForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 15a [Method to verify by Delete Poll from category(cat1) Enable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('n', true);
				});
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a.dropdown-toggle.text-muted i', 'Dropdown for poll found');
		this.click('a.dropdown-toggle.text-muted i');
	}).waitUntilVisible('div.post-edit.dropdown.pull-right.open', function() {
		this.test.assertExists('div.post-edit.dropdown.pull-right.open li i.glyphicon.glyphicon-trash', 'Delete tab found');
		this.click('div.post-edit.dropdown.pull-right.open li i.glyphicon.glyphicon-trash');
	}).wait('1000', function() {
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Delete Poll from other category enable
moderatorPermissionsTestcases.verifyEnableDeletePollForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 15b [Method to verify by Delete Poll from other category Enable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('a.dropdown-toggle.text-muted i', 'Dropdown for poll not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('m', true);
				});
			}
		});
	});
};

// method to verify by Delete Poll from category(cat1) Disable
moderatorPermissionsTestcases.verifyDisableDeletePollForModeratorCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 16a [Method to verify by Delete Poll from category(cat1) Disable]');
		var category = moderatorPermissionsJSON.category;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
				moderatorPermissionsMethod.goToModerator(category_Id);
				casper.then(function() {
					moderatorPermissionsMethod.clickOnAddedModerator(category_Id);
				}).then(function() {
					moderatorPermissionsMethod.enableDisableModeratorPermission('n', false);
				});
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertExists('a.dropdown-toggle.text-muted i', 'Dropdown for poll found');
		this.click('a.dropdown-toggle.text-muted i');
	}).waitUntilVisible('div.post-edit.dropdown.pull-right.open', function() {
		this.test.assertDoesntExist('div.post-edit.dropdown.pull-right.open li i.glyphicon.glyphicon-trash', 'Delete tab not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to verify by Delete Poll from other category Disable
moderatorPermissionsTestcases.verifyDisableDeletePollForOtherCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Test case 16b [Method to verify by Delete Poll from other category Disable]');
		var category = moderatorPermissionsJSON.otherCategory;
		moderatorPermissionsMethod.goToCategoryPageAndGetId(category, function(err, categoryId) {
			category_Id = categoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(moderatorPermissionsJSON.registeredUserLogin.username,moderatorPermissionsJSON.registeredUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', ' Category link found');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.test.assertVisible('li#forum_'+category_Id+' a' , ' cat1 visible on category listing page');
		this.click('li#forum_'+category_Id+' a');
	}).waitForSelector('div.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertDoesntExist('a.dropdown-toggle.text-muted i', 'Dropdown for poll not found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};
