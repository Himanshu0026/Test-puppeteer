/***These are the function which has been called in postTopicUserPermission.js and also will be used in other js file as per requirement**********/

'use strict.';
var postTopicUserPermissionJSON = require('../../testdata/postTopicUserPermissionData.json');
var config = require('../../../config/config.json');
var forumLoginMethod = require('../methods/login.js');
var topicMethod = require('../methods/topic.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var combinationOfSubCategoryAndGroupPermissionsMethod = require('../methods/combinationOfSubCategoryAndGroupPermissions.js');
//var postTopicUserPermissionMethod = require('../methods/postTopicUserPermission.js');
var utils = require('../utils.js');
var postTopicUserPermissionTestcases = module.exports = {};

var token = '';

postTopicUserPermissionTestcases.getTokenAndSetPermission = function(path) {
	casper.thenOpen(config.apiLocalUrl+"/qaapi/getToken", function() {
		token = casper.evaluate(function() {
			var data = document.querySelector(".token").getAttribute('id');
			return data;
		});
		this.thenOpen(path+token, function() {});
		// var json_string = JSON.parse(this.getPageContent());
		// token = json_string.token;
		// utils.info('the token id inside the task'+token);
		// var thenOpenUrl = function() {
		// 	var tok = token;
		// 	return tok;
		// };
		// return thenOpenUrl;
	});
};

// method to create a topic
postTopicUserPermissionTestcases.createTopic = function(userGroup) {
	casper.thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(postTopicUserPermissionJSON.newTopic);
	}).wait('2000', function() {
	});
};

// method to verify permission message after clicking on any topic
postTopicUserPermissionTestcases.verifyClickOnAnyTopicDisable = function(userGroup) {
	//var get_token_fun = postTopicUserPermissionTestcases.getToken();
	casper.thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).then(function() {
		// method to create a topic by the registered user(neha)
		postTopicUserPermissionTestcases.createTopic(userGroup);
		//utils.info('the value of closure function before'+get_token_fun());
		//utils.info('the token id before the thenopen.Url'+token);
	//}).thenOpen(config.apiLocalUrl+"/qaapi/usergroups/updatePermission/"+userGroup+"/view_thread_content/0?accesToken="+token, function() {
		//utils.info('the token id after the thenopen.Url'+token);
		//utils.info('the value of closure function after'+get_token_fun());
		postTopicUserPermissionTestcases.getTokenAndSetPermission(config.apiLocalUrl+"/qaapi/usergroups/updatePermission/"+userGroup+"/view_thread_content/0?accesToken=");
	}).thenOpen(config.url, function() {
		//utils.info('the value of closure function after after'+get_token_fun());
		//utils.info('the token id inside the thenopen.Url'+token);
		utils.info('Test case 1a [verify permission message after clicking on any topic]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('li#latest_topics_show a', 'Topic in the side menu found');
		this.click('li#latest_topics_show a');
	}).waitForSelector('form[name="posts"] a.topic-title', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForText("Sorry! You don't have permission to perform this action.").then(function() {
		this.click('.back-message-arrow i');
	}).waitForSelector('.topics-list', function() {
	});
};

// method to Verify permission message after creating new topic
postTopicUserPermissionTestcases.verifyClickOnNewTopicDisable = function(userGroup) {
	casper.then(function() {
		utils.info('Test case 1b [Verify permission message after creating new topic]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForSelector('div.post-body.pull-left', function() {
		this.sendKeys('input[name="subject"]', postTopicUserPermissionJSON.newTopic.title, {reset:true});
		this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce',postTopicUserPermissionJSON.newTopic.content);
		});
	}).waitForSelector('#all_forums_dropdown', function() {
		this.click('#all_forums_dropdown');
		this.fill('form[name="PostTopic"]',{
			'forum' : postTopicUserPermissionJSON.newTopic.category
		},false);
	}).waitForSelector('#post_submit', function() {
		this.test.assertExists('#post_submit', 'Post submit button found');
		this.click('#post_submit');
	}).waitForText("Sorry! You don't have permission to perform this action.");
};

// method to Verify permission message after clicking on this newly created topic from the category listing page
postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageDisable = function(userGroup) {
	casper.then(function() {
		utils.info('Test case 1c [Verify permission message after clicking on this newly created topic from the category listing page]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('#links-nav i', ' menu tab found');
		this.click('#links-nav i');
	}).waitUntilVisible('#slide-panel', function() {
		casper.click('#latest_topics_show a');
	}).waitForSelector('#topics', function() {
		casper.click('form[name="posts"] a.topic-title');
	}).waitForText("Sorry! You don't have permission to perform this action.");
};

// method to verify content of  a topic
postTopicUserPermissionTestcases.verifyClickOnAnyTopicEnable = function(userGroup) {
	casper.then(function() {
		postTopicUserPermissionTestcases.getTokenAndSetPermission(config.apiLocalUrl+"/qaapi/usergroups/updatePermission/"+userGroup+"/view_thread_content/1?accesToken=");
	}).thenOpen(config.url, function() {
		utils.info('Test case 2a [verify content of  a topic]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('li#latest_topics_show a', 'Topic in the side menu found');
		this.click('li#latest_topics_show a');
	}).waitForSelector('form[name="posts"] a.topic-title', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span[id^="post_message_"]', function() {
		utils.info('Content of post found');
		this.click('#backArrowPost i');
	}).waitForSelector('.topics-list', function() {
	});
};

// method to verify compose message functionality from the category listing page
postTopicUserPermissionTestcases.verifyClickOnNewTopicFromCategoryListingPageEnable = function(userGroup) {
	casper.then(function() {
		utils.info('Test case 2b [verify compose message functionality from the category listing page]');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForSelector('div.post-body.pull-left', function() {
		this.sendKeys('input[name="subject"]', postTopicUserPermissionJSON.newTopic.title, {reset:true});
		this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce',postTopicUserPermissionJSON.newTopic.content);
		});
	}).waitForSelector('#all_forums_dropdown', function() {
		this.click('#all_forums_dropdown');
		this.fill('form[name="PostTopic"]',{
			'forum' : postTopicUserPermissionJSON.newTopic.category
		},false);
	}).waitForSelector('#post_submit', function() {
		this.test.assertExists('#post_submit', 'Post submit button found');
		this.click('#post_submit');
	}).waitForSelector('div#posts-list', function() {
		utils.info('New Post composed and visible to user');
	});
};

// method to Verify compose message functionality from the Topic listing page"
postTopicUserPermissionTestcases.verifyClickOnNewTopicEnable = function(userGroup) {
	casper.then(function() {
		utils.info('Test case 2c [Verify compose message functionality from the Topic listing page]');
		this.click('i.icon.icon-menu');
		this.test.assertExists('li#latest_topics_show a', 'Topic in the side menu found');
		this.click('li#latest_topics_show a');
	}).waitForSelector('div.topics-list', function() {
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
	}).waitForSelector('div.post-body.pull-left', function() {
		this.sendKeys('input[name="subject"]', postTopicUserPermissionJSON.newTopic.title, {reset:true});
		this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce',postTopicUserPermissionJSON.newTopic.content);
		});
	}).waitForSelector('#all_forums_dropdown', function() {
		this.click('#all_forums_dropdown');
		this.fill('form[name="PostTopic"]',{
			'forum' : postTopicUserPermissionJSON.newTopic.category
		},false);
	}).waitForSelector('#post_submit', function() {
		this.test.assertExists('#post_submit', 'Post submit button found');
		this.click('#post_submit');
	}).waitForSelector('div#posts-list', function() {
		utils.info('New Post composed and visible to user');
	}).then(function() {
	});
};

// method to Disable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend
postTopicUserPermissionTestcases.verifyViewTopicContentForUnregisteredUserDisable = function(userGroup) {
	casper.then(function() {
		postTopicUserPermissionTestcases.getTokenAndSetPermission(config.apiLocalUrl+"/qaapi/usergroups/updatePermission/"+userGroup+"/view_thread_content/0?accesToken=");
		utils.info('Test case 3 [Disable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div.alert.alert-info',function() {
		this.test.assertExists('input#member' , 'Login page opened');
	});
};

// method to Enable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend
postTopicUserPermissionTestcases.verifyViewTopicContentForUnregisteredUserEnable = function(userGroup) {
	casper.then(function() {
		postTopicUserPermissionTestcases.getTokenAndSetPermission(config.apiLocalUrl+"/qaapi/usergroups/updatePermission/"+userGroup+"/view_thread_content/1?accesToken=");
		utils.info('Test case 4 [Enable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.test.assertExists('div#posts-list' , 'Topic content showed');
	});
};

// method to Verify View Others's Topic on frontend from category when there is no own topic
postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategory = function(userGroup) {
	casper.then(function() {
		postTopicUserPermissionTestcases.getTokenAndSetPermission(config.apiLocalUrl+"/qaapi/usergroups/updatePermission/"+userGroup+"/view_others_threads/0?accesToken=");
		utils.info("Test case 6a [Verify View Others's Topic on frontend from category when there is no own topic]");
	}).thenOpen(config.url, function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		try{
			this.test.assertExists('div.panel-heading input.entry-checkbox', 'Checkbox found');
			this.click('div.panel-heading input.entry-checkbox');
			this.waitForSelector('div.hover-menu.open', function() {
				casper.test.assertExists('a#delete i', 'Delete button found');
				casper.click('a#delete i');
			}).waitForText("This category doesn't have any topics yet.");
		} catch(e) {
			var actualText = casper.fetchText('span.alert.alert-info');
			var expectedText = "This category doesn't have any topics yet.";
			casper.test.assert(actualText.indexOf(expectedText) > -1);
		}
	}).then(function() {
	});
};

// method to Verify View Others's Topic on frontend from category when there are own topic
postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryForOwnTopic = function(userGroup) {
	casper.then(function() {
		utils.info("Test case 6b [Verify View Others's Topic on frontend from category when there are own topic]");
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		try {
			casper.test.assertExists('span:nth-child(2) p a:nth-child(2)', utils.info('span:nth-child(2) p a:nth-child(2)'));
			var users = casper.evaluate(function() {
				var totalUsers = document.querySelectorAll('span:nth-child(2) p a:nth-child(2)');
				var names = [];
				for(i=0 ; i<totalUsers.length; i++) {
					names =totalUsers[i].innerText;
					if(names !='neha ') {
						return "The user able to view other user topic content ";
					}
					if (names =='neha ') {
						continue;
					}
				}
				return "The user able to view only own topic content ";
			});
			utils.info(users);
		} catch(e) {
			utils.info('No own post present and Also user not able to view others topic content');
		}
	}).then(function() {
	});
};

// method to Verify View Others's Topic in topic list inside category
postTopicUserPermissionTestcases.verifyViewOthersTopicBySearchingTopic = function(userGroup) {
	casper.thenOpen(config.url, function() {
		utils.info("Test case 7 [Verify View Others's Topic in topic list inside category]");
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.test.assertExists('a.pull-right.btn.btn-uppercase.btn-primary', ' New Topic on subcategory page Found');
		this.evaluate(function() {
			document.querySelector('a.pull-right.btn.btn-uppercase.btn-primary').click();
		});
		topicMethod.createTopic(postTopicUserPermissionJSON.newTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
	casper.then(function() {
		// method to create a topic by the registered user(neha)
		postTopicUserPermissionTestcases.createTopic(userGroup);
	}).then(function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		try {
			casper.test.assertExists('span:nth-child(2) p a:nth-child(2)', utils.info('span:nth-child(2) p a:nth-child(2)'));
			casper.sendKeys('input#inline_search_box',postTopicUserPermissionJSON.newTopic.title, {keepFocus: true});
			casper.page.sendEvent("keypress", casper.page.event.key.Enter);
			this.waitForSelector('div.topics-list', function() {
				var users = casper.evaluate(function() {
					var totalUsers = document.querySelectorAll('span:nth-child(2) p a:nth-child(2)');
					var names = [];
					for(i=0 ; i<totalUsers.length; i++) {
						names =totalUsers[i].innerText;
						if(names !='neha ') {
							return "The user able to view other user topic content ";
						}
						if (names =='neha ') {
							continue;
						}
					}
					return "The user able to view only own topic content ";
				});
				utils.info(users);
			});
		} catch(e) {
			utils.error('No own post present and Also user not able to view others topic content');
		}
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Enable "View Other Topic" for Registered user from group Permission and verify permission on frontend
postTopicUserPermissionTestcases.verifyViewOthersTopicFromCategoryEnable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/view_others_threads/1", function() {
	}).thenOpen(config.url, function() {
		utils.info("Test case 8 [Enable View Other Topic for Registered user from group Permission and verify permission on frontend]");
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		try{
			casper.test.assertExists('div.panel-heading input.entry-checkbox');
			casper.click('div.panel-heading input.entry-checkbox');
			casper.waitForSelector('div.hover-menu.open', function() {
				casper.test.assertExists('a#delete i', 'Delete button found');
				casper.click('a#delete i');
				casper.wait('3000', function() {
					var users = casper.evaluate(function() {
						var totalUsers = document.querySelectorAll('span:nth-child(2) p a:nth-child(2)');
						var names = [];
						for(i=0 ; i<totalUsers.length; i++) {
							names =totalUsers[i].innerText;
							if(names !='neha ') {
								return "The user able to view other user topic content ";
							}
							if (names =='neha ') {
								continue;
							}
						}
						return "The user able to view only own topic content ";
					});
					utils.info(users);
				});
			});
		} catch(e) {

		}
	}).then(function() {
	});
};

// method to Disable "View Others' Topic" for un-registered user from group Permission
postTopicUserPermissionTestcases.verifyViewOthersTopicForUnregisteredUserWhenNoTopicCreatedDisable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/view_others_threads/0", function() {
		utils.info('Test case 9a [Enable "View Topic Content" for un-registered user from group Permission and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForText("This category doesn't have any topics yet.", function() {
	}).thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/view_others_threads/1", function() {
	});
};

// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserDisable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/post_replies/0", function() {
		utils.info('Test case 10 [Disable Reply Own Topic for Registered user from group Permission and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
		postTopicUserPermissionTestcases.createTopic(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.test.assertDoesntExist('textarea#message', 'Text area not found');
	}).then(function() {
	});
};

// method to Enable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
postTopicUserPermissionTestcases.verifyReplyOwnTopicForRegisterUserEnable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/post_replies/1", function() {
		utils.info('Test case 11 [Enable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.test.assertExists('a#sub_post_reply', 'Reply found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend
postTopicUserPermissionTestcases.verifyReplyOwnTopicForAdminUser = function(userGroup) {
	casper.thenOpen(config.url, function() {
		utils.info('Test case 12 [Disable "Reply Own Topic" for Registered user from group Permission and Verify permission on Frontend]');
		forumLoginMethod.loginToApp(postTopicUserPermissionJSON.adminUserLogin.username, postTopicUserPermissionJSON.adminUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.test.assertExists('a#sub_post_reply', 'Reply found');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Disable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserDisable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/edit_posts/0", function() {
		utils.info('Test case 13 [Disable Edit Own Post for Registered user from group Permission and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
		combinationOfSubCategoryAndGroupPermissionsMethod.assignLoginDetails(userGroup);
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.mouse.move('a[id^="posttoggle_"] i');
		this.click('a[id^="posttoggle_"] i');
	}).waitForSelector('ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('a#edit_post_request', 'Edit button not show');
	}).then(function() {
	});
};

// method to Enable "Edit Own Post" for Registered user from group Permission and Verify permission on Frontend
postTopicUserPermissionTestcases.verifyEditOwnPostForRegisteredUserEnable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/edit_posts/1", function() {
		utils.info('Test case 14 [Enable Edit Own Post for Registered user from group Permission and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.mouse.move('a[id^="posttoggle_"] i');
		this.click('a[id^="posttoggle_"] i');
	}).waitForSelector('ul.dropdown-menu.right', function() {
		this.test.assertExists('a#edit_post_request', 'Edit button show');
	});
};

// method to Disable Delete Own Post for Registered user from group Permission and Verify permission on Frontend
postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserDisable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/delete_posts/0", function() {
		utils.info('Test case 15 [Disable Delete Own Post for Registered user from group Permission and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.mouse.move('a[id^="posttoggle_"] i');
		this.click('a[id^="posttoggle_"] i');
	}).waitForSelector('ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('a[id^="delete_first_post_"]', 'Delete button not show');
	}).then(function() {
	});
};

// method to Enable "Delete Own Post" for Registered user from group Permission and Verify permission on Frontend
postTopicUserPermissionTestcases.verifyDeleteOwnPostForRegisteredUserEnable = function(userGroup) {
	var topicHref;
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/delete_posts/1", function() {
		utils.info('Test case 16 [Enable Delete Own Post for Registered user from group Permission and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		topicHref = casper.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.mouse.move('a[id^="posttoggle_"] i');
		this.click('a[id^="posttoggle_"] i');
	}).waitForSelector('ul.dropdown-menu.right', function() {
		this.test.assertExists('a[id^="delete_first_post_"]', 'Delete button show');
	}).then(function() {
	});
};

// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserDisable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/delete_threads/0", function() {
		utils.info('Test case 17 [Disable Delete Own Topic for Registered user from group Permission and Verify delete option against topic in the topic list]');
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.test.assertExists('li input.entry-checkbox', 'checkbox found');
		this.click('li input.entry-checkbox');
	}).waitUntilVisible('div#topics-menu', function() {
		this.test.assertDoesntExist('a#delete i', 'Delete option not found');
	}).then(function() {
	});
};

// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic in the topic list
postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserEnable = function(userGroup) {
	var topicHref;
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/delete_threads/1", function() {
		utils.info('Test case 18 [Enable Delete Own Topic for Registered user from group Permission and Verify delete option against topic in the topic list]');
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		topicHref = casper.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		utils.info('The href of the topic to be clicked'+topicHref);
		this.click('li input.entry-checkbox');
	}).waitUntilVisible('div#topics-menu', function() {
		this.test.assertExists('a#delete i', 'Delete option found');
	}).then(function() {
	});
};

// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicDisable = function(userGroup) {
	casper.then(function() {
		utils.info('Test case 19 [Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.click('input#firstpid');
	}).waitUntilVisible('div#posts-menu', function() {
		this.test.assertExists('#deleteposts', 'Delete option found');
		this.click('#deleteposts');
	}).waitForText("Sorry! You don't have permission to perform this action.", function() {
		this.click('div.back-message a');
	}).waitForSelector('li[id^="forum_"]', function() {
		utils.info('Back button navigated to the previous page');
	}).then(function() {
	});
};

// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen
postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredUserAgainstTopicEnable = function(userGroup) {
	var topicHref;
	casper.then(function() {
		utils.info('Test case 20 [Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option against topic on the post screen]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		topicHref = casper.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.mouse.move('input#firstpid');
		this.click('input#firstpid');
	}).waitUntilVisible('div#posts-menu', function() {
		this.test.assertExists('#deleteposts', 'Delete option found');
	}).then(function() {
	});
};

// method to Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageDisable = function(userGroup) {
	casper.then(function() {
		utils.info('Test case 21 [Disable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.mouse.move('a[id^="posttoggle_"] i');
		this.click('a[id^="posttoggle_"] i');
	}).waitForSelector('ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('a[id^="delete_first_post_"]', 'Delete button not show');
	}).then(function() {
	});
};

// method to Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page
postTopicUserPermissionTestcases.verifyDeleteOwnTopicForRegisteredFromDropDownOnPostListingPageEnable = function(userGroup) {
	casper.then(function() {
		utils.info('Test case 22 [Enable "Delete Own Topic" for Registered user from group Permission and Verify delete option on drop down on the post listing page]');
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		topicHref = casper.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		utils.info('the href of the topic to be clicked'+topicHref);
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.mouse.move('a[id^="posttoggle_"] i');
		this.click('a[id^="posttoggle_"] i');
	}).waitForSelector('ul.dropdown-menu.right', function() {
		this.test.assertExists('a[id^="delete_first_post_"]', 'Delete button show');
	}).then(function() {
	});
};

// method to verify when delete own post is disable and delete own topic enable
postTopicUserPermissionTestcases.verifyDeleteOwnPostDisableAndTopicEnableForRegisteredUser = function(userGroup) {
	var topicHref;
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/delete_posts/0", function() {
		utils.info('Test case 23 [When delete own post is disable and delete own topic enable and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		topicHref = casper.evaluate(function() {
			var href =  document.querySelector('form[name="posts"] a.topic-title').getAttribute('href');
			return href;
		});
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.test.assertDoesntExist('input#firstpid', 'Delete checkbox not visible');
		this.mouse.move('a[id^="posttoggle_"] i');
		this.click('a[id^="posttoggle_"] i');
	}).waitForSelector('ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('a[id^="delete_first_post_"]', 'Delete button not show');
		this.click('a#backArrowPost i');
	}).waitUntilVisible('div.topics-list', function() {
		this.click('li input.entry-checkbox');
	}).waitUntilVisible('div#topics-menu', function() {
		this.test.assertExists('a#delete i', 'Delete option found');
	}).then(function() {
	});
};

// method to verify when delete own post is disable and delete own topic disable
postTopicUserPermissionTestcases.verifyDeleteOwnPostAndTopicDisableForRegisteredUser = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/delete_threads/0", function() {
		utils.info('Test case 24 [When delete own post is disable and delete own topic disable and Verify permission on Frontend]');
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		this.test.assertExists('li input.entry-checkbox', 'checkbox found');
		this.click('li input.entry-checkbox');
	}).waitUntilVisible('div#topics-menu', function() {
		this.test.assertDoesntExist('a#delete i', 'Delete option not found');
	}).then(function() {
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('div[id^="post_list"]', function() {
		this.test.assertDoesntExist('input#firstpid', 'Delete checkbox not visible');
		this.mouse.move('a[id^="posttoggle_"] i');
		this.click('a[id^="posttoggle_"] i');
	}).waitForSelector('ul.dropdown-menu.right', function() {
		this.test.assertDoesntExist('a[id^="delete_first_post_"]', 'Delete button not show');
	}).then(function() {
	});
};

// method to Disable "Move Own Post" for Registered user from group Permission and Verify Move option against topic in the topic list
postTopicUserPermissionTestcases.verifyMoveOwnTopicDisable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/move_own_threads/0", function() {
	}).thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/delete_threads/1", function() {
		utils.info('Test case 25 [Disable Move Own Post for Registered user from group Permission and Verify Move option against topic in the topic list]');
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('i.icon.icon-menu');
		this.test.assertExists('ul#forums_toggle_link li a', 'Category link found in the side menu');
		this.click('ul#forums_toggle_link li a');
	}).waitForSelector('li[id^="forum_"]', function() {
		this.click('li[id^="forum_"] a');
	}).waitForSelector('div.topics-list', function() {
		try {
			this.test.assertExists('li input.entry-checkbox', 'Checkbox found');
			this.click('li input.entry-checkbox');
			this.waitUntilVisible('div#topics-menu', function() {
				this.test.assertDoesntExist('a#move i', 'Move option not found');
			});
		} catch(e) {
			utils.error('checkbox not found');
		}
	}).then(function() {
	});
};

// method to Move Own Topic shown on User's Profile page For disable setting
postTopicUserPermissionTestcases.verifyMoveOwnTopicFromUsersProfilePageDisable = function(userGroup) {
	casper.thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/delete_posts/1", function() {
		utils.info("Test case 28 [Move Own Topic shown on User's Profile page For disable setting]");
	}).thenOpen(config.url, function() {
	}).waitForSelector('li.pull-right.user-panel', function() {
		this.click('li.pull-right.user-panel span.caret');
	}).waitUntilVisible('li ul.dropdown-menu', function() {
		this.test.assertExists('a#user-nav-panel-profile', 'Profile option found');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('div#posts-list', function() {
		this.click('a#Topics_Started');
		this.wait('2000', function() {
			this.mouse.move('input.entry-checkbox');
			this.click('input.entry-checkbox');
			this.waitForSelector('div.hover-menu.open', function() {
				this.test.assertDoesntExist('a#move i', 'Move option not appeared');
			});
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.apiLocalUrl+"/usergroups/"+userGroup+"/move_own_threads/1", function() {
	});
};
