'use strict.';
var forumLoginMethod = require('../methods/login.js');
var pollMethod = require('../methods/poll.js');
var topicMethod = require('../methods/topic.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var utils = require('../utils.js');
var loginJSON = require('../../testdata/loginData.json');
var topicJSON = require('../../testdata/topic.json');
var pollJSON = require('../../testdata/poll.json');
var inContextLoginTests = module.exports = {};

//Testcase Incontext login from Start New Topic button when start new topic button is enabled
inContextLoginTests.doLoginByStartTopicEnable = function() {
	casper.then(function() {
		utils.info('Case 1[Incontext login from Start New Topic button when its permission is ON.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
		}).then(function() {
			backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'post_threads', true);
		});
	}).thenOpen(config.url ,function() {
		this.waitForSelector('#topics a[href="/post/printadd"]', function() {
			this.test.assertSelectorHasText('div#topics', 'Start New Topic');
			this.click('#topics a[href="/post/printadd"]');
		}).waitForText('Create an account or log in', function() {
			this.test.assertSelectorHasText('a#guest_user_create_account', 'Create an account or log in');
			this.click('a#guest_user_create_account');
		}).waitForText('Create an account or log in to start a topic.', function() {
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//Testcase Incontext login from Start New Topic button when start new topic button is disabled
inContextLoginTests.doLoginByStartTopicDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 2[Incontext login from Start New Topic button when its permission is OFF.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'post_threads', false);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('#topics a[href="/post/printadd"]', function() {
			this.test.assertSelectorHasText('div#topics', 'Start New Topic');
			this.click('#topics a[href="/post/printadd"]');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//inContext Login from Quote on post from post list
inContextLoginTests.doLoginByQuoteOnPost = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 3[Incontext login from Quote on post from post list.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'other_post_replies', false);
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Display"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'Display');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Display"]');
			backEndregisterMethod.enableDisableQuoteIcon(true);
		});
  }).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'Security');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
			backEndregisterMethod.setApproveNewPost('0');
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('#topics a[href="/post/printadd"]', function() {
	  this.test.assertSelectorHasText('div#topics', 'Start New Topic');
	  this.click('#topics a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.newTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).waitForSelector('i.icon.icon-menu', function() {
		this.click('i.icon.icon-menu');
		this.test.assertSelectorHasText('li#latest_topics_show', 'Topics');
		this.click('li#latest_topics_show a');
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			this.click('div.panel-body.table-responsive ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a span');
		}).then(function() {
			this.click('a[id^="reply_with_quote_"]');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//inContext Login from Topic listing page when 'View Topic Content' permission is Disabled.
inContextLoginTests.doLoginByViewTopicDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 4[Incontext Login from Topic listing page when View Topic Content permission is Disabled.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_thread_content', false);
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			this.click('div.panel-body.table-responsive ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a span');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//inContext Login from the Forum Main page when 'View Forum' permission is Disabled.
inContextLoginTests.doLoginByViewForumDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 5[Incontext Login from Topic listing page when View Topic Content permission is Disabled.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_messageboard', false);
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//inContext Login  when 'View Profile' permission is Disabled.
inContextLoginTests.doLoginByViewProfileDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 6[Incontext Login from Topic listing page when View Topic Content permission is Disabled.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_messageboard', true);
	}).then(function() {
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_thread_content', true);
	}).then(function() {
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_profiles', false);
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			var userHref = casper.evaluate(function() {
				var userId = document.querySelectorAll('div.panel-body.table-responsive ul li:nth-child(1) span.col-md-9 span.image-wrapper a');
				return userId[0].getAttribute('href');
			});
			this.click('a[href="'+userHref+'"]');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//inContext Login when 'View Calendar' permission is enabled fromm group permission.
inContextLoginTests.doLoginByViewCalenderEnable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 7[Incontext Login Login when View Calendar permission is Disabled.]');
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'Security');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
			backEndregisterMethod.setPrivacy('private');
		}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function () {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
		}).then(function() {
			backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_calendar', true);
		}).then(function() {
			backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
			backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_messageboard', true);
		});
	}).thenOpen(config.url ,function() {
		this.waitForSelector('i.icon.icon-menu', function() {
			this.click('i.icon.icon-menu');
			this.test.assertSelectorHasText('a[href="/calendar"]', 'Calendar');
			this.evaluate(function() {
				document.querySelector('li a[href="/calendar"]').click();
			});
		}).waitForSelector('i.glyphicon.glyphicon-plus', function() {
			this.click('i.glyphicon.glyphicon-plus');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//--------------------Incontext Login while Like this Topic from list of topics------------------------------------
inContextLoginTests.doLoginByReputationEnableTopicLike = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 8[Incontext Login while Like this post from Topic page]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableLikesReputation(true);
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndregisterMethod.setPrivacy('public');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function () {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_thread_content', true);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			this.click('i.glyphicon.glyphicon-like-alt');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//-----------------------Incontext Login while Dislike this post from  list of Topics page------------------------
inContextLoginTests.doLoginByReputationEnablePostDislike = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 9[Incontext Login while Dislike this post from Topic page]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableLikesReputation(true);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			this.click('div.panel-body.table-responsive ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a span');
			this.waitUntilVisible('i.glyphicon.glyphicon-dislike-alt', function() {
				this.click('i.glyphicon.glyphicon-dislike-alt');
				forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
			});
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//--------------------------------Incontext Login while Like this post from Topic page --------------------------------
inContextLoginTests.doLoginByReputationEnablePostLike = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 10[Incontext Login while Like this post from Topic page]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableLikesReputation(true);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			this.click('div.panel-body.table-responsive ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a span');
			this.waitUntilVisible('i.glyphicon.glyphicon-like-alt', function() {
				this.click('i.glyphicon.glyphicon-like-alt');
				forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
			});
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//-------------------inContext Login from Email button on Profile view screen of any user------------
inContextLoginTests.doLoginByEmailButton = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 11[Incontext Login from Email button on Profile view screen of any user.]');
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'Security');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
			backEndregisterMethod.enableDisableUserToUserEmailing(true);
		}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function () {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
		}).then(function() {
			backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'view_profiles', true);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			var userHref = casper.evaluate(function() {
				var userId = document.querySelectorAll('div.panel-body.table-responsive ul li:nth-child(1) span.col-md-9 span.image-wrapper a');
				return userId[0].getAttribute('href');
			});
			casper.evaluate(function(userHref) {
				document.querySelector('a[href="'+userHref+'"]').click();
			}, userHref);
			this.waitForSelector('a#send_email', function() {
				this.test.assertSelectorHasText('a#send_email', 'Email');
				this.click('a#send_email');
				forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
			});
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//----------------------------inContext Login from vote on post from post list -------------------------
inContextLoginTests.doLoginByVoteOnpost = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 12[Incontext Login from vote on post from post list]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisablePolls(true);
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function() {
		this.click('div.panel-body.table-responsive ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a span');
	}).then(function() {
		this.test.assertSelectorHasText('a#sub_post_reply', 'Post a reply');
		this.test.assert(this.mouseEvent('mouseover', 'div[id^="post_list_"]'));
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertExists('i.glyphicon.glyphicon-stats');
		this.click('i.glyphicon.glyphicon-stats');
	}).then(function() {
		pollMethod.createPoll(pollJSON.pollData);
	}).waitForText('Vote', function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			this.click('div.panel-body.table-responsive ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a span');
		}).waitForSelector('a#guest_user_vote', function() {
			this.test.assertSelectorHasText('a#guest_user_vote', 'create an account or  log in');
			this.click('a#guest_user_vote');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

//inContext Login when 'Post Event' permission is Disabled.
inContextLoginTests.doLoginByPostEventDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 13[Incontext Login when View Calendar permission is Disabled.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'post_events', false);
	}).then(function() {
		forumLoginMethod.logoutFromForumBackEnd();
	}).thenOpen(config.url ,function() {
		this.waitForSelector('i.icon.icon-menu', function() {
			this.click('i.icon.icon-menu');
			this.test.assertSelectorHasText('a[href="/calendar"]', 'Calendar');
			this.evaluate(function() {
				document.querySelector('li a[href="/calendar"]').click();
			});
		}).waitForSelector('i.glyphicon.glyphicon-plus', function() {
			this.click('i.glyphicon.glyphicon-plus');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};
