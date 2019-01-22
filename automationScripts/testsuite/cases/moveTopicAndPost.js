/***These are the function which has been called in moveTopicAndPost.js and also will be used in other js file as per requirement**********/

'use strict.';
var moveTopicAndPostJSON = require('../../testdata/moveTopicAndPost.json');
var moveTopicAndPostMethod = require('../methods/moveTopicAndPost.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var combinationOfSubCategoryAndGroupPermissionsMethod = require('../methods/combinationOfSubCategoryAndGroupPermissions.js');
var utils = require('../utils.js');
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var topicMethod = require('../methods/topic.js');
var moveTopicAndPostTestcases = module.exports = {};
var category_Id;
var subCategory_Id;

// 1. Verify move topic from the latest topic page
moveTopicAndPostTestcases.latestTopicPage = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 1 [Verify move topic from the latest topic page]');
		var category = moveTopicAndPostJSON.category;
		var subCategory = moveTopicAndPostJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
  }).waitForSelector('.icon.icon-menu', function() {
    this.click('.icon.icon-menu');
    this.test.assertSelectorHasText('#latest_topics_show', 'Topics');
    this.click('#latest_topics_show a');
  }).then(function() {
		this.test.assertExists('#topics a.start-new-topic-btn', ' Start New topic on subcategory page Found');
		this.click('#topics a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.newTopic);
	}).waitForText('hellloooooo!!!!!!!!!', function() {
		this.click('#backArrowPost');
	}).waitUntilVisible('#topics', function() {
    this.test.assertExists('ul li:nth-child(1) span.mod.icons.pull-right input');
    this.click('ul li:nth-child(1) span.mod.icons.pull-right input');
  }).then(function() {
    moveTopicAndPostMethod.moveTopic(category_Id);
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 2. Verify move topic from the topic listing page[Home Page]
moveTopicAndPostTestcases.topicListingPage = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 2 [ Verify move topic from the topic listing page[Home Page ]');
		var category = moveTopicAndPostJSON.category;
		var subCategory = moveTopicAndPostJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
	}).then(function() {
		this.test.assertExists('#topics a.start-new-topic-btn', ' Start New topic on subcategory page Found');
		this.click('#topics a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.newTopic);
	}).waitForText('hellloooooo!!!!!!!!!', function() {
		this.click('#backArrowPost');
  }).waitUntilVisible('#topics', function() {
    this.test.assertExists('ul li:nth-child(1) span.mod.icons.pull-right input');
    this.click('ul li:nth-child(1) span.mod.icons.pull-right input');
  }).then(function() {
    moveTopicAndPostMethod.moveTopic(category_Id);
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 3. Verify move topic from the topic listing page under category
moveTopicAndPostTestcases.topicListingPageUnderCategory = function(userGroup) {
	var category = moveTopicAndPostJSON.category;
	var subCategory = moveTopicAndPostJSON.subCategory;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 3 [ Verify move topic from the topic listing page under category ]');
		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
  }).waitForSelector('.icon.icon-menu', function() {
    this.click('.icon.icon-menu');
    this.click('#forums_toggle_link a');
  }).waitForText(category.title, function() {
    /*this.test.assertSelectorHasText('ul[id="'+category_Id+'"] a', category.title);
    casper.evaluate(function(category_Id) {
	    document.querySelector('ul[id="'+category_Id+'"] a').click();
    },category_Id);*/
    this.click('span.forum-title');
  }).waitForSelector('#topics', function() {
		this.test.assertExists('#ajax_subscription_vars a.start-new-topic-btn', ' Start New topic on subcategory page Found');
		this.click('#ajax_subscription_vars a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.newTopic);
	}).waitForText('hellloooooo!!!!!!!!!', function() {
		this.click('#backArrowPost');
	//}).waitUntilVisible('#topics_tab', function() {
    //this.click('#topics_tab');
  }).waitForSelector('#topics', function() {
    this.test.assertExists('ul li:nth-child(1) span.mod.icons.pull-right input');
    this.click('ul li:nth-child(1) span.mod.icons.pull-right input');
  }).then(function() {
    moveTopicAndPostMethod.moveTopic(category_Id);
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 4. Verify move topic from the topic listing page under sub category
moveTopicAndPostTestcases.topicListingPageUnderSubCategory = function(userGroup) {
	var category = moveTopicAndPostJSON.category;
	var subCategory = moveTopicAndPostJSON.subCategory;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 4 [ Verify move topic from the topic listing page under sub category ]');
		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
  }).waitForSelector('.icon.icon-menu', function() {
    this.click('.icon.icon-menu');
    this.click('#forums_toggle_link a');
  }).waitForText(category.title, function() {
    this.test.assertSelectorHasText('ul[id="'+category_Id+'"] a', category.title);
    casper.evaluate(function(category_Id) {
	    document.querySelector('ul[id="'+category_Id+'"] a').click();
    },category_Id);
    //this.click('ul[id="'+category_Id+'"] a');
  }).waitForText(subCategory.title, function() {
    this.click('li[id="forum_'+subCategory_Id+'"] a');
  }).waitUntilVisible('.topics-list', function() {
		this.test.assertExists('#ajax_subscription_vars a.start-new-topic-btn', ' Start New topic on subcategory page Found');
		this.click('#ajax_subscription_vars a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.subCategoryTopic);
	}).waitForText('hellloooooo!!!!!!!!!', function() {
		this.click('#backArrowPost');
	}).waitUntilVisible('#topics', function() {
    this.test.assertExists('ul li:nth-child(1) span.mod.icons.pull-right input');
    this.click('ul li:nth-child(1) span.mod.icons.pull-right input');
  }).then(function() {
    moveTopicAndPostMethod.moveTopic(category_Id);
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 5. Verify move topic from the profile page
moveTopicAndPostTestcases.profilePage = function(userGroup) {
	var category = moveTopicAndPostJSON.category;
	var subCategory = moveTopicAndPostJSON.subCategory;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 5 [ Verify move topic from the profile page ]');
		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
  }).waitForSelector('.nav.pull-right button.dropdown-toggle span', function() {
    this.click('.nav.pull-right button.dropdown-toggle span');
  }).waitForText('Profile', function() {
    this.click('#user-nav-panel-profile');
  }).waitForText('Topics Started', function() {
    this.click('a#Topics_Started');
  }).waitForSelector('a[id="Topics_Started"].profile-active', function() {
    this.test.assertExists('.entry-checkbox');
    this.click('.entry-checkbox');
  }).then(function() {
    moveTopicAndPostMethod.moveTopic(category_Id);
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 13. Verify move topic from the latest topic page (own topic for registered user when disable "move topic" permission)
moveTopicAndPostTestcases.latestTopicPageForRegisteredUserWhenDisabled = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 13 [ Verify move topic from the latest topic page (own topic for registered user when disable "move topic" permission) ]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndForumRegisterMethod.viewGroupPermissions(userGroup);
	}).then(function() {
		backEndForumRegisterMethod.editGroupPermissions(userGroup, 'move_own_threads', false);
	}).thenOpen(config.url, function() {
    forumLoginMethod.loginToApp(moveTopicAndPostJSON.registeredUserLogin.username, moveTopicAndPostJSON.registeredUserLogin.password);
  }).waitForSelector('.icon.icon-menu', function() {
    this.click('.icon.icon-menu');
    this.test.assertSelectorHasText('#latest_topics_show', 'Topics');
    this.click('#latest_topics_show a');
  }).then(function() {
    this.test.assertExists('ul li:nth-child(1) span.mod.icons.pull-right input');
    this.click('ul li:nth-child(1) span.mod.icons.pull-right input');
  }).waitUntilVisible('#topics-menu', function() {
    this.test.assertNotVisible('#move', 'Move arrow is not visible!');
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 14. Verify move topic from the topic listing page[Home Page] for (own post for registered user when disable "move topic" permission)
moveTopicAndPostTestcases.topicListingPageForRegisteredUserWhenDisabled = function() {
	casper.then(function() {
    utils.info('Case 14 [ Verify move topic from the topic listing page[Home Page] for (own post for registered user when disable "move topic" permission) ]');
    forumLoginMethod.loginToApp(moveTopicAndPostJSON.registeredUserLogin.username, moveTopicAndPostJSON.registeredUserLogin.password);
  }).then(function() {
    this.test.assertExists('ul li:nth-child(1) span.mod.icons.pull-right input');
    this.click('ul li:nth-child(1) span.mod.icons.pull-right input');
  }).waitUntilVisible('#topics-menu', function() {
    this.test.assertNotVisible('#move', 'Move arrow is not visible!');
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 15. Verify move topic from the topic listing page under category (own post for registered user when disable "move topic" permission)
moveTopicAndPostTestcases.topicListingPageUnderCategoryForRegisteredUserWhenDisabled = function() {
	var category = moveTopicAndPostJSON.category;
	var subCategory = moveTopicAndPostJSON.subCategory;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 15 [ Verify move topic from the topic listing page under category (own post for registered user when disable "move topic" permission) ]');
		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
    forumLoginMethod.loginToApp(moveTopicAndPostJSON.registeredUserLogin.username, moveTopicAndPostJSON.registeredUserLogin.password);
  }).waitForSelector('.icon.icon-menu', function() {
    this.click('.icon.icon-menu');
    this.click('#forums_toggle_link a');
  }).waitForText(category.title, function() {
    this.test.assertSelectorHasText('ul[id="'+category_Id+'"] a', category.title);
    casper.evaluate(function(category_Id) {
	    document.querySelector('ul[id="'+category_Id+'"] a').click();
    },category_Id);
    //this.click('ul[id="'+category_Id+'"] a');
  }).waitForSelector('#topics_tab', function() {
    this.click('#topics_tab');
  }).waitForSelector('.topics-list', function() {
    this.test.assertExists('ul li:nth-child(1) span.mod.icons.pull-right input');
    this.click('ul li:nth-child(1) span.mod.icons.pull-right input');
  }).waitUntilVisible('#topics-menu', function() {
    this.test.assertNotVisible('#move', 'Move arrow is not visible!');
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 16. Verify move topic from the topic listing page under sub category (own post for registered user when disable "move topic" permission)
moveTopicAndPostTestcases.topicListingPageUnderSubCategoryForRegisteredUserWhenDisabled = function() {
	var category = moveTopicAndPostJSON.category;
	var subCategory = moveTopicAndPostJSON.subCategory;
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 16 [ Verify move topic from the topic listing page under sub category (own post for registered user when disable "move topic" permission) ]');
		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
    forumLoginMethod.loginToApp(moveTopicAndPostJSON.registeredUserLogin.username, moveTopicAndPostJSON.registeredUserLogin.password);
  }).waitForSelector('.icon.icon-menu', function() {
    this.click('.icon.icon-menu');
    this.click('#forums_toggle_link a');
  }).waitForText(category.title, function() {
    this.test.assertSelectorHasText('ul[id="'+category_Id+'"] a', category.title);
    casper.evaluate(function(category_Id) {
	    document.querySelector('ul[id="'+category_Id+'"] a').click();
    },category_Id);
    this.click('ul[id="'+category_Id+'"] a');
  }).waitForText(subCategory.title, function() {
    this.click('li[id="forum_'+subCategory_Id+'"] a');
  }).waitUntilVisible('.topics-list', function() {
    this.test.assertExists('ul li:nth-child(1) span.mod.icons.pull-right input');
    this.click('ul li:nth-child(1) span.mod.icons.pull-right input');
  }).waitUntilVisible('#topics-menu', function() {
    this.test.assertNotVisible('#move', 'Move arrow is not visible!');
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 17. Verify move topic from the profile page (own post for registered user when disable "move topic" permission)
moveTopicAndPostTestcases.profilePageForRegisteredUserWhenDisabled = function() {
	casper.then(function() {
    utils.info('Case 17 [ Verify move topic from the profile page (own post for registered user when disable "move topic" permission) ]');
    forumLoginMethod.loginToApp(moveTopicAndPostJSON.registeredUserLogin.username, moveTopicAndPostJSON.registeredUserLogin.password);
  }).waitForSelector('.nav.pull-right button.dropdown-toggle span', function() {
    this.click('.nav.pull-right button.dropdown-toggle span');
  }).waitForText('Profile', function() {
    this.click('#user-nav-panel-profile');
  }).waitForText('Topics Started', function() {
    this.click('a#Topics_Started');
  }).waitForSelector('a[id="Topics_Started"].profile-active', function() {
    this.test.assertExists('.entry-checkbox');
    this.click('.entry-checkbox');
  }).waitUntilVisible('#topics-menu', function() {
    this.test.assertNotVisible('#move', 'Move arrow is not visible!');
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndForumRegisterMethod.viewGroupPermissions('General');
	}).then(function() {
		backEndForumRegisterMethod.editGroupPermissions('General', 'move_own_threads', false);
	});
};

// 22. Verify move topic from the latest topic page for unregisterd user
moveTopicAndPostTestcases.latestTopicPageForUnregisterdUser = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 22 [ Verify move topic from the latest topic page for unregisterd user ]');
  }).waitForSelector('.icon.icon-menu', function() {
    this.click('.icon.icon-menu');
    this.test.assertSelectorHasText('#latest_topics_show', 'Topics');
    this.click('#latest_topics_show a');
  }).then(function() {
    this.test.assertNotVisible('ul li:nth-child(1) span.mod.icons.pull-right input', 'There is no check box visible for the guest user');
  });
};

// 23. Verify move topic from the topic listing page[Home Page]
moveTopicAndPostTestcases.topicListingPageForUnregisterdUser = function() {
	casper.then(function() {
    utils.info('Case 23 [ Verify move topic from the topic listing page[Home Page for unregisterd user ]');
  }).then(function() {
    this.test.assertNotVisible('ul li:nth-child(1) span.mod.icons.pull-right input', 'There is no check box visible for the guest user');
  });
};

// 26. Verify move post from the profile page into the new topic
moveTopicAndPostTestcases.profilePageNewTopic = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 26 [ Verify move post from the profile page into the new topic ]');
		var category = moveTopicAndPostJSON.category;
		var subCategory = moveTopicAndPostJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
	}).then(function() {
		this.test.assertExists('#topics a.start-new-topic-btn', ' Start New topic on subcategory page Found');
		this.click('#topics a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.newTopic);
	}).waitForText('hellloooooo!!!!!!!!!', function() {
		this.click('#backArrowPost');
	}).waitUntilVisible('#topics', function() {
    this.click('.nav.pull-right button.dropdown-toggle span');
  }).waitForText('Profile', function() {
    this.click('#user-nav-panel-profile');
  }).waitForText('All Posts', function() {
    this.click('#PostsOFUser');
  }).waitForSelector('a[id="PostsOFUser"].profile-active', function() {
    this.test.assertExists('.entry-checkbox');
    this.click('.entry-checkbox');
  }).waitUntilVisible('#posts-menu', function() {
    if (this.visible('#move_PostSelection')) {
      utils.info('Move arrow is visible!');
      this.click('#move_PostSelection i');
      moveTopicAndPostMethod.fillMovePostDetails(category_Id, 'New Topic');
    } else {
      utils.info('Move arrow not visible!');
    }
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 27. Verify move post from the profile page into the existing topic
moveTopicAndPostTestcases.profilePageExistingTopic = function(userGroup) {
	var url = '';
	casper.thenOpen(config.url, function() {
    utils.info('Case 27 [ Verify move post from the profile page into the existing topic ]');
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
	}).then(function() {
		this.test.assertExists('#topics a.start-new-topic-btn', ' Start New topic on subcategory page Found');
		this.click('#topics a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.newTopic);
	}).waitForText('hellloooooo!!!!!!!!!', function() {
		this.click('#backArrowPost');
  }).waitUntilVisible('#topics', function() {
    this.test.assertExists('a[id^="topic_"]');
    this.click('a[id^="topic_"]');
  }).waitForSelector('#posts-list', function() {
		url = this.getCurrentUrl();
		utils.info('The destination url = '+url);
	}).thenOpen(config.url, function() {
	}).waitForSelector('#topics a.start-new-topic-btn', function() {
		this.test.assertSelectorHasText('#topics a.start-new-topic-btn', 'Start New Topic');
		this.click('#topics a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.newTopic);
  }).waitForSelector('.nav.pull-right button.dropdown-toggle span', function() {
    this.click('.nav.pull-right button.dropdown-toggle span');
  }).waitForText('Profile', function() {
    this.click('#user-nav-panel-profile');
  }).waitForText('All Posts', function() {
    this.click('#PostsOFUser');
  }).waitForSelector('a[id="PostsOFUser"].profile-active', function() {
    this.test.assertExists('.entry-checkbox');
    this.click('.entry-checkbox');
  }).waitUntilVisible('#posts-menu', function() {
    if (this.visible('#move_PostSelection')) {
      utils.info('Move arrow is visible!');
      this.click('#move_PostSelection i');
      moveTopicAndPostMethod.fillMovePostDetails(url, 'Existing Topic');
    } else {
      utils.info('Move arrow not visible!');
    }
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 28. Verify move post from the post listing page into the existing topic
moveTopicAndPostTestcases.postListingPageExistingPage = function(userGroup) {
	var url = '';
	casper.thenOpen(config.url, function() {
    utils.info('Case 28 [Verify move topic from the latest topic page]');
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
	}).then(function() {
		this.test.assertExists('#topics a.start-new-topic-btn', ' Start New topic on subcategory page Found');
		this.click('#topics a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.newTopic);
	}).waitForText('hellloooooo!!!!!!!!!', function() {
		this.click('#backArrowPost');
  }).waitUntilVisible('#topics', function() {
    this.test.assertExists('a[id^="topic_"]');
    this.click('a[id^="topic_"]');
  }).waitForSelector('#posts-list', function() {
		url = this.getCurrentUrl();
		utils.info('The destination url = '+url);
	}).thenOpen(config.url, function() {
	}).waitForSelector('#topics a.start-new-topic-btn', function() {
		this.test.assertSelectorHasText('#topics a.start-new-topic-btn', 'Start New Topic');
		this.click('#topics a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.newTopic);
	}).waitForText('hellloooooo!!!!!!!!!', function() {
		this.test.assertExists('#firstpid');
    this.click('#firstpid');
    moveTopicAndPostMethod.movepost(url, 'Existing Topic');
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 29. Verify move post from the post listing page into the new topic
moveTopicAndPostTestcases.postListingPageNewTopic = function(userGroup) {
	var url = '';
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 29 [ Verify move post from the post listing page into the new topic ]');
		var category = moveTopicAndPostJSON.category;
		var subCategory = moveTopicAndPostJSON.subCategory;

		combinationOfSubCategoryAndGroupPermissionsMethod.goToCategoryPageAndGetIds(category, subCategory, function(err, categoryId, subCategoryId) {
			category_Id = categoryId;
			subCategory_Id = subCategoryId;
			if(!err) {
			}
		});
	}).thenOpen(config.url, function() {
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
	}).then(function() {
		this.test.assertExists('#topics a.start-new-topic-btn', ' Start New topic on subcategory page Found');
		this.click('#topics a.start-new-topic-btn');
		topicMethod.createTopic(moveTopicAndPostJSON.newTopic);
	}).waitForText('hellloooooo!!!!!!!!!', function() {
		this.click('#backArrowPost');
  }).waitUntilVisible('#topics', function() {
    this.test.assertExists('a[id^="topic_"]');
    this.click('a[id^="topic_"]');
  }).waitForSelector('#posts-list', function() {
		this.test.assertExists('#firstpid');
    this.click('#firstpid');
    moveTopicAndPostMethod.movepost(category_Id, 'New Topic');
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 38. Verify move post from the profile page into the new topic for the moderator of category when Disabled the permission of "move post and topic"
moveTopicAndPostTestcases.profilePageNewTopicDisableMove = function(userGroup) {
	casper.then(function() {
    utils.info('Case 38 [ Verify move post from the profile page into the new topic for the moderator of category when Disabled the permission of "move post and topic" ]');
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
  }).waitForSelector('.nav.pull-right button.dropdown-toggle span', function() {
    this.click('.nav.pull-right button.dropdown-toggle span');
  }).waitForText('Profile', function() {
    this.click('#user-nav-panel-profile');
  }).waitForText('All Posts', function() {
    this.click('#PostsOFUser');
  }).waitForSelector('a[id="PostsOFUser"].profile-active', function() {
    this.test.assertNotVisible('.entry-checkbox');
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// 41. Verify move post from the post listing page into the existing topic for the moderator of category when Disabled the permission of "move post and topic"
moveTopicAndPostTestcases.postListingPageExistingPageDisableMove = function(userGroup) {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 41 [ Verify move post from the post listing page into the existing topic for the moderator of category when Disabled the permission of "move post and topic" ]');
	}).thenOpen(config.url, function() {
    moveTopicAndPostMethod.assignLoginDetails(userGroup);
  }).then(function() {
    this.test.assertExists('a[id^="topic_"]');
    this.click('a[id^="topic_"]');
  }).waitForSelector('#posts-list', function() {
		this.test.assertExists('#firstpid');
    this.click('#firstpid');
	}).waitUntilVisible('#posts-menu', function() {
    if (!this.visible('#moveposts')) {
      utils.info('Move arrow is not visible!');
    } else {
      utils.info('Move arrow is visible!');
    }
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};
