'use strict.';
var forumLoginMethod = require('../methods/login.js');
var pollMethod = require('../methods/poll.js');
var topicMethod = require('../methods/topic.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var utils = require('../utils.js');
var loginJSON = require('../../testdata/loginData.json');
var topicJSON = require('../../testdata/topic.json');
var pollJSON = require('../../testdata/poll.json');
var registerTests = require('../cases/register.js');
var incontextRegistrationTests = module.exports = {};

//Testcase Incontext Registration from Start New Topic button when start new topic button is enabled
incontextRegistrationTests.doRegistrationByStartTopicEnable = function() {
	casper.then(function() {
		utils.info('Case 1[Incontext Registration from Start New Topic button when its permission is ON.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
		}).then(function() {
			backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'post_threads', true);
		});
	}).thenOpen(config.url ,function() {
		this.waitForSelector('a[href="/post/printadd"]', function() {
			this.test.assertSelectorHasText('div#topics', 'Start New Topic');
			this.evaluate(function() {
				document.querySelector('a[href="/post/printadd"]').click();
			});
		}).waitForText('Create an account or log in', function() {
			this.test.assertSelectorHasText('a#guest_user_create_account', 'Create an account or log in');
			this.click('a#guest_user_create_account');
		}).waitForText('Create an account or log in to start a topic.', function() {
			registerTests.registrationWithValidInfo();
		});
	});
};

//Testcase Incontext Registration from Start New Topic button when start new topic button is disabled
incontextRegistrationTests.doRegistrationByStartTopicDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 2[Incontext Registration from Start New Topic button when its permission is OFF.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'post_threads', false);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('a[href="/post/printadd"]', function() {
			this.test.assertSelectorHasText('div#topics', 'Start New Topic');
			this.evaluate(function() {
				document.querySelector('a[href="/post/printadd"]').click();
			});
			registerTests.registrationWithValidInfo();
    });
	});
};

//inContext Registration from Quote on post from post list
incontextRegistrationTests.doRegistrationByQuoteOnPost = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 3[Incontext Registration from Quote on post from post list.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'other_post_replies', false);
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
	}).waitForSelector('a[href="/post/printadd"]', function() {
	  this.test.assertSelectorHasText('div#topics', 'Start New Topic');
	  this.evaluate(function() {
		document.querySelector('a[href="/post/printadd"]').click();
	  });
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
      registerTests.registrationWithValidInfo();
    });
  });
};

//inContext Registration from Topic listing page when 'View Topic Content' permission is Disabled.
incontextRegistrationTests.doRegistrationByViewTopicDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 4[Incontext Registration from Topic listing page when View Topic Content permission is Disabled.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_thread_content', false);
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			this.click('div.panel-body.table-responsive ul li:nth-child(1) span:nth-child(1) span:nth-child(2) h4 a span');
      registerTests.registrationWithValidInfo();
    });
	});
};

//inContext Registration from the Forum Main page when 'View Forum' permission is Disabled.
incontextRegistrationTests.doRegistrationByViewForumDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 5[Incontext Registration from Topic listing page when View Topic Content permission is Disabled.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_messageboard', false);
	}).thenOpen(config.url, function() {
    registerTests.registrationWithValidInfo();
	});
};

//inContext Registration  when 'View Profile' permission is Disabled.
incontextRegistrationTests.doRegistrationByViewProfileDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 6[Incontext Registration from Topic listing page when View Topic Content permission is Disabled.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_messageboard', true);
	}).then(function() {
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_thread_content', true);
	}).then(function() {
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_profiles', false);
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			var userHref = casper.evaluate(function() {
				var userId = document.querySelectorAll('div.panel-body.table-responsive ul li:nth-child(1) span.col-md-9 a.username');
				return userId[0].getAttribute('href');
			});
			casper.evaluate(function(userHref) {
				document.querySelector('a[href="'+userHref+'"]').click();
			},userHref);
      registerTests.registrationWithValidInfo();
    });
	});
};

//inContext Registration when 'View Calendar' permission is enabled fromm group permission.
incontextRegistrationTests.doRegistrationByViewCalenderEnable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 7[Incontext Registration Login when View Calendar permission is Disabled.]');
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
			backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
		}).then(function() {
			backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_calendar', true);
		}).then(function() {
			backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
			backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_messageboard', true);
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
      registerTests.registrationWithValidInfo();
    });
	});
};

//--------------------Incontext Registration while Like this Topic from list of topics------------------------------------
incontextRegistrationTests.doRegistrationByReputationEnableTopicLike = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 8[Incontext Registration while Like this post from Topic page]');
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
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_thread_content', true);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			this.click('i.glyphicon.glyphicon-like-alt');
      registerTests.registrationWithValidInfo();
    });
	});
};

//-----------------------Incontext Registration while Dislike this post from  list of Topics page------------------------
incontextRegistrationTests.doRegistrationByReputationEnablePostDislike = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 9[Incontext Registration while Dislike this post from Topic page]');
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
        registerTests.registrationWithValidInfo();
      });
    });
	});
};

//--------------------------------Incontext Registration while Like this post from Topic page --------------------------------
incontextRegistrationTests.doRegistrationByReputationEnablePostLike = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 10[Incontext Registration while Like this post from Topic page]');
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
        registerTests.registrationWithValidInfo();
      });
		});
	});
};

//-------------------inContext Registration from Email button on Profile view screen of any user------------
incontextRegistrationTests.doRegistrationByEmailButton = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 11[Incontext Registration from Email button on Profile view screen of any user.]');
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
			backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
		}).then(function() {
			backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'view_profiles', true);
		});
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
			var userHref = casper.evaluate(function() {
				var userId = document.querySelectorAll('div.panel-body.table-responsive ul li span.col-md-9 a.username');
				return userId[0].getAttribute('href');
			});
			casper.evaluate(function(userHref) {
				document.querySelector('a[href="'+userHref+'"]').click();
			},userHref);
			this.waitForSelector('a#send_email', function() {
				this.test.assertSelectorHasText('a#send_email', 'Email');
				this.click('a#send_email');
        registerTests.registrationWithValidInfo();
      });
		});
	});
};

//----------------------------inContext Registration from vote on post from post list -------------------------
incontextRegistrationTests.doRegistrationByVoteOnpost = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 12[Incontext Registration from vote on post from post list]');
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
			this.test.assertSelectorHasText('a#guest_user_vote', 'sign up or  log in');
			this.click('a#guest_user_vote');
      registerTests.registrationWithValidInfo();
    });
	});
};

//inContext Registration when 'Post Event' permission is Disabled.
incontextRegistrationTests.doRegistrationByPostEventDisable = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 13[Incontext Registration when View Calendar permission is Disabled.]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'post_events', false);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('i.icon.icon-menu', function() {
			this.click('i.icon.icon-menu');
			this.test.assertSelectorHasText('a[href="/calendar"]', 'Calendar');
			this.evaluate(function() {
				document.querySelector('li a[href="/calendar"]').click();
			});
		}).waitForSelector('i.glyphicon.glyphicon-plus', function() {
			this.click('i.glyphicon.glyphicon-plus');
      registerTests.registrationWithValidInfo();
    });
	});
};

//inContext Registration from Login Page with new  Registration
incontextRegistrationTests.doRegistrationFromLoginPage = function() {
	casper.thenOpen(config.url , function() {
		utils.info('Case 14[ inContext Registration from Login Page with new  Registration ]');
		this.waitForSelector('a[href="/register/login"]', function() {
			this.click('a[href="/register/login"]');
    }).waitForText('Create an account', function() {
			this.click('#user_login a[href="/register/register"]');
		}).waitForSelector('form[name="PostTopic"]', function() {
      registerTests.registrationWithValidInfo();
    });
	});
};

// Incontext New Registration from reply post With Create Account
incontextRegistrationTests.doRegistrationFromReplyPostWithCreateAccount = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 18[Incontext New Registration from reply post With Create Account]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Not Signed Up / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Not Signed Up / Not Logged In', 'other_post_replies', true);
	}).thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		this.waitForSelector('form[name="posts"] a.topic-title', function() {
		this.click('form[name="posts"] a.topic-title');
    }).waitForSelector('#posts-list', function() {
     this.evaluate(function() {
			 document.querySelector('#sub_post_reply').click();
     });
    }).waitUntilVisible('#guest_user', function() {
      this.click('#guest_user');
    }).waitForSelector('form[name="PostTopic"]', function() {
      registerTests.registrationWithValidInfo();
    });
	});
};

// Do Registeration when User Account is OFF
incontextRegistrationTests.doRegistrationWhenUserAccountOff = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 27 [ Do Registeration when User Account is OFF ]');
  }).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'General');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
  }).waitForSelector('#frmForumSettings', function() {
    backEndregisterMethod.enableDisableUserAccounts(false);
  }).thenOpen(config.url, function() {
    this.test.assertNotVisible('#forum_header_fixed a[href="/register/register"]', 'Register not visible');
  }).thenOpen(config.backEndUrl , function() {
  }).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
  }).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
    this.test.assertSelectorHasText('#ddSettings', 'General');
    this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
	backEndregisterMethod.enableDisableUserAccounts(true);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function() {
		casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewUsers('Pending Email Verification');
	}).then(function() {
		backEndregisterMethod.editUserActions('Pending Email Verification', 'Delete', 'all');
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndregisterMethod.enableDisableEmailAddressVerification(false);
	});
};
