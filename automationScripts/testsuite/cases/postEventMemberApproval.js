/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict.';
var postEventMemberApprovalJSON = require('../../testdata/postEventMemberApproval.json');
var config = require('../../../config/config.json');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var forumLoginMethod = require('../methods/login.js');
var topicMethod = require('../methods/topic.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var utils = require('../utils.js');

var postEventMemberApprovalTestcases = module.exports = {};

// method to create a topic
postEventMemberApprovalTestcases.createTopic = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' Method to Create a topic ');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('#autosuggest', function() {
		postEventMemberApprovalMethod.setAdmin(postEventMemberApprovalJSON.adminUserLogin.username);
	}).then(function() {
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
    this.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
      this.test.assertSelectorHasText('#ddSettings', 'Security');
      this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
      backEndregisterMethod.setApproveNewPost('0');
    });
  }).thenOpen(config.url, function() {
    this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password);
	}).waitForSelector('#topics a[href="/post/printadd"]', function() {
	  this.test.assertSelectorHasText('div#topics', 'Start New Topic');
	  this.click('#topics a[href="/post/printadd"]');
		topicMethod.createTopic(postEventMemberApprovalJSON.newTopic);
	}).then(function() {
		forumLoginMethod.logoutFromApp();
  }).thenOpen(config.backEndUrl, function() {
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
    this.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
      this.test.assertSelectorHasText('#ddSettings', 'Security');
      this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
      backEndregisterMethod.setApproveNewPost('99');
		}).then(function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndregisterMethod.viewGroupPermissions('Registered Users');
		}).then(function() {
			backEndregisterMethod.editGroupPermissions('Registered Users', 'other_post_replies', true);
    });
  });
};

// method to create multiple different post
postEventMemberApprovalTestcases.createMultiplePost = function() {
	casper.thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
	}).then(function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		postEventMemberApprovalMethod.composePost('Approve a pending post from- Approve by click on topic');
	}).then(function() {
		postEventMemberApprovalMethod.composePost('Approve a pending post from- Delete by click on topic');
	}).then(function() {
		//postEventMemberApprovalMethod.composePost('Approve a pending post from- Edit by click on topic');
	}).then(function() {
		postEventMemberApprovalMethod.composePost('Approve a pending post from- Approve by all checkbox');
	}).then(function() {
		postEventMemberApprovalMethod.composePost('Approve a pending post from- Extra post');
	}).then(function() {
		//postEventMemberApprovalMethod.composePost('Approve a pending post from- Move by single checkbox');
	}).then(function() {
		postEventMemberApprovalMethod.composePost('Approve a pending post from- Delete by single checkbox');
	}).then(function() {
		postEventMemberApprovalMethod.composePost('Approve a pending post from- Approve by single checkbox');
	}).then(function() {
		//postEventMemberApprovalMethod.composePost('Approve a pending post from- Edit from approval queue button');
	}).then(function() {
		postEventMemberApprovalMethod.composePost('Approve a pending post from- Delete from approval queue button');
	}).then(function() {
		postEventMemberApprovalMethod.composePost('Approve a pending post from- Approval queue button');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to approve or delete the post by the admin user
postEventMemberApprovalTestcases.postApprovalByAdmin = function() {
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function() {
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertExists('li#approvalQueue a', 'Approval Queue found');
		casper.click('li#approvalQueue a');
	}).waitForSelector('form#approveMembers', function() {
		this.click("a[id^='approvePost'] i");
	//}).waitForSelectorTextChange('#feed-main > .col-xs-12:nth-child(1) .post-body-content', function() {
	}).wait('1000',function() {
		this.click("a[id^='postDelete'] i");
	//}).waitForSelectorTextChange('#feed-main > .col-xs-12:nth-child(1) .post-body-content', function() {
	}).wait('1000',function() {
		/*this.click("a[id^='postEdit'] i");
	}).waitForSelector('#message1_ifr', function() {
		this.test.assertExists('#message1_ifr', 'message1-ifr found So the post is editable');
		this.withFrame('message1_ifr', function() {
			this.sendKeys('#tinymce', "Hello I am Admin and edited the post");
		});
	}).then(function() {
		this.click('div.form-group.cleared input[name="save"]');
	}).wait('1000',function () {
		this.click("a[id^='approvePost'] i");
	//}).waitForSelectorTextChange('#feed-main > .col-xs-12:nth-child(1) .post-body-content', function() {
	}).wait('1000',function () {*/
		this.evaluate(function() {
			document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
		});
		this.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
		this.test.assertExists('a#approvePending i', 'approve tick on the floating menu');
		this.click('a#approvePending i');
	//}).waitForSelectorTextChange('#feed-main > .col-xs-12:nth-child(1) .post-body-content', function() {
	}).wait('1000',function () {
		this.evaluate(function() {
			document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
		});
		this.test.assertExists('div#pending-menu', ' Floating menu is appear on bottom of the page');
		this.test.assertExists('a#decline_pending', ' Delete tick on the floating menu');
		this.click('a#decline_pending');
	}).wait('1000',function () {
		this.click('#links-nav i.icon');
	}).waitForSelector('#latest_topics_show a', function() {
		this.click('#latest_topics_show a');
	}).waitForSelector('.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertTextExists('This post is awaiting approval by a moderator.', 'This post is awaiting approval by a moderator. found on the page');
		this.test.assertExists('a#approve_request i', 'approve tick found');
		this.click('a#approve_request i');
	}).wait('1000',function () {
		this.test.assertExists("a[id^='delete_pending_'] i", 'Delete tick found');
		this.click("a[id^='delete_pending_'] i");
	}).wait('1000',function () {
		/*casper.click('#posttoggle_'+postId+' i');
		casper.mouse.move('#post_list_' +postId);
		casper.click('a[data-pid="'+postId+'"]');
	}).waitForSelector('#message1_ifr', function() {
		this.test.assertExists('#message1_ifr', 'message1-ifr found So the post is editable');
		this.withFrame('message1_ifr', function() {
			this.sendKeys('#tinymce', "Hello I am Admin and edited the post");
		});
	}).then(function() {
		this.click('div.form-group.cleared input[name="save"]');
	}).wait('2000',function () {*/
	}).then(function() {
		this.click('#links-nav i.icon');
	}).waitForSelector('#latest_topics_show a', function() {
		this.click('#forums_toggle_link a[href="/categories"]');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertExists('li#approvalQueue a', 'Approval Queue found');
		casper.click('li#approvalQueue a');
	}).waitForSelector('form#approveMembers', function() {
		this.test.assertExists('div.subheading input.entry-checkbox', 'check box found');
		this.evaluate(function(){
			document.querySelector('div.subheading input.entry-checkbox').click();
		});
		this.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
		this.test.assertExists('a#approvePending i', 'APPROVE TICK ON THE FLOATING MENU');
		this.click('a#approvePending i');
	}).wait('2000',function () {
		this.test.assertTextExists("There's currently nothing that needs your approval.");
	}).then(function() {
		this.click('#links-nav i.icon');
	}).waitForSelector('#latest_topics_show a', function() {
		this.click('#latest_topics_show a');
	}).waitForSelector('.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertTextExists('Approve a pending post from- Approval queue button', ' found on the page');
		this.test.assertTextDoesntExist('Approve a pending post from- Delete from approval queue button');
		//this.test.assertTextExists('Approve a pending post from- Edit from approval queue button', ' found on the page');
		this.test.assertTextExists('Approve a pending post from- Approve by single checkbox', ' found on the page');
		this.test.assertTextDoesntExist('Approve a pending post from- Delete by single checkbox');
		this.test.assertTextExists('Approve a pending post from- Approve by single checkbox', ' found on the page');
		this.test.assertTextExists('Approve a pending post from- Approve by click on topic', ' found on the page');
		this.test.assertTextDoesntExist('Approve a pending post from- Delete by click on topic');
		this.test.assertTextExists('Approve a pending post from- Approve by all checkbox', ' found on the page');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to approve the post by the moderator
postEventMemberApprovalTestcases.approveByModerator = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('CASE 1 to 10 [ Approve a pending post from- Approval queue button ]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('#autosuggest', function() {
		postEventMemberApprovalMethod.setUserGroupToRegisteredUser(postEventMemberApprovalJSON.adminUserLogin.username);
	}).then(function() {
		backEndregisterMethod.goToCategoryPage();
	}).then(function() {
		var data = postEventMemberApprovalJSON.adminUserLogin.username;
		var category = postEventMemberApprovalJSON.category;
		backEndregisterMethod.addNewModerator(data, category, function(err) {
			if(!err) {
				utils.info('Moderator added successfully');
			}
		});
	}).then(function() {
		// method to approve or delete the post by the admin user
		postEventMemberApprovalTestcases.postApprovalByAdmin();
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
    this.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
      this.test.assertSelectorHasText('#ddSettings', 'Security');
      this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
      backEndregisterMethod.setApproveNewPost('0');
    });
	}).then(function() {
		backEndregisterMethod.removeModerator();
	}).then(function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('#autosuggest', function() {
		postEventMemberApprovalMethod.setAdmin(postEventMemberApprovalJSON.adminUserLogin.username);
	});
};

// method to check the functionality of approve post for guest user
postEventMemberApprovalTestcases.unregisterUserApprovePost = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 11 [ check the functionality of approve post for guest user ]');
    this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		backEndregisterMethod.viewGroupPermissions('Unregistered / Not Logged In');
	}).then(function() {
		backEndregisterMethod.editGroupPermissions('Unregistered / Not Logged In', 'other_post_replies', false);
  }).thenOpen(config.url, function() {
		try {
			this.test.assertExists('a.topic-title', 'Composed topic is found');
			var topic = this.evaluate(function() {
				var name = document.querySelector('a.topic-title span');
				return name.innerHTML;
			});
			this.click('div.panel-body.table-responsive ul li span span:nth-child(2) a');
			this.waitForSelector('div#posts-list', function() {
				this.test.assertDoesntExist('#message', 'Reply option is not present for unregistered user');
			});
		}catch (e) {
			utils.errror('Topic is not present for unregistered user');
		}
	});
};

// Test cases for event approval

//method to set the setting of event approval
postEventMemberApprovalTestcases.eventApprovalSetting = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case - Event approval backend setting');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableCalender(true);
	}).then(function() {
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	}).waitForSelector('div#ddContent', function() {
		casper.click('div#ddContent a:nth-child(2)');
	}).waitForSelector('div#tab_wrapper', function() {
		postEventMemberApprovalMethod.enableDisableEventApproval(true);
	});
};

//method to compose multiple post
postEventMemberApprovalTestcases.composeMultipleEvent = function() {
	casper.thenOpen(config.url, function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
	}).then(function() {
		casper.click('i.icon.icon-menu');
		try {
			casper.test.assertExists('ul#calendars_toggle_link i','calender menu found');
			casper.click('ul#calendars_toggle_link i');
			casper.test.assertExists('a[href^="/calendar/display?from_month=&from_year=&view="]','First calender found');
			casper.click('a[href^="/calendar/display?from_month=&from_year=&view="]');
		} catch (e) {
				casper.test.assertExists('li#calenders_show a','calender menu found');
				casper.click('li#calenders_show a');
		}
	}).waitForSelector('.calendar-add-event a', function() {
		postEventMemberApprovalMethod.composeEvent('Approve a pending event from- Approval queue button');
	}).then(function() {
		postEventMemberApprovalMethod.composeEvent('Approve a pending event from- Delete from approval queue button');
	}).then(function() {
		//postEventMemberApprovalMethod.composeEvent('Approve a pending event from- Edit from approval queue button');
	}).then(function() {
		postEventMemberApprovalMethod.composeEvent('Approve a pending event from- Approve by single checkbox');
	}).then(function() {
		postEventMemberApprovalMethod.composeEvent('Approve a pending event from- Delete by single checkbox');
	}).then(function() {
		postEventMemberApprovalMethod.composeEvent('Approve a pending event from- Extra post');
	}).then(function() {
		postEventMemberApprovalMethod.composeEvent('Approve a pending event from- Approve by all checkbox');
	}).then(function() {
		postEventMemberApprovalMethod.composeEvent('Approve a pending event from- Delete by click on topic');
	}).then(function() {
		postEventMemberApprovalMethod.composeEvent('Approve a pending event from- Approve by click on topic');
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to approve or delete the event by the admin user
postEventMemberApprovalTestcases.eventApprovalByAdmin = function() {
	casper.thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function() {
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertExists('li#approvalQueue a', 'Approval Queue found');
		casper.click('li#approvalQueue a');
	}).waitForSelector('form#approveMembers', function() {
		this.click("a[id^='approveEvent'] i");
	}).wait('1000',function() {
		this.click("a[id^='deleteEvent'] i");
	}).wait('1000',function() {
		this.evaluate(function() {
			document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
		});
		this.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
		this.test.assertExists('a#approvePending i', 'approve tick on the floating menu');
		this.click('a#approvePending i');
	}).wait('1000',function () {
		this.evaluate(function() {
			document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
		});
		this.test.assertExists('div#pending-menu', ' Floating menu is appear on bottom of the page');
		this.test.assertExists('a#decline_pending', ' Delete tick on the floating menu');
		this.click('a#decline_pending');
	}).wait('1000',function () {
		this.click('#event_title a');
	}).waitForSelector('.calendar-daydetail', function() {
		this.test.assertTextExists('This event is awaiting moderator approval.', 'This event is awaiting moderator approval. found on the page');
		this.test.assertDoesntExist("a[id^='approveEvent'] i", 'approve button not found');
		this.test.assertDoesntExist("a[id^='deleteEvent'] i", 'delete button not found');
	}).then(function() {
		this.click('#links-nav i.icon');
	}).waitForSelector('#latest_topics_show a', function() {
		this.click('#forums_toggle_link a[href="/categories"]');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertExists('li#approvalQueue a', 'Approval Queue found');
		casper.click('li#approvalQueue a');
	}).waitForSelector('form#approveMembers', function() {
		this.test.assertExists('div.subheading input.entry-checkbox', 'check box found');
		this.evaluate(function(){
			document.querySelector('div.subheading input.entry-checkbox').click();
		});
		this.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
		this.test.assertExists('a#approvePending i', 'APPROVE TICK ON THE FLOATING MENU');
		this.click('a#approvePending i');
	}).wait('2000',function () {
		this.test.assertTextExists("There's currently nothing that needs your approval.");
	}).then(function() {
		/*this.click('#links-nav i.icon');
	}).waitForSelector('#latest_topics_show a', function() {
		this.click('#latest_topics_show a');
	}).waitForSelector('.topics-list', function() {
		this.click('a[id^="topic_"]');
	}).waitForSelector('#posts-list', function() {
		this.test.assertTextExists('Approve a pending post from- Approval queue button', ' found on the page');
		this.test.assertTextDoesntExist('Approve a pending post from- Delete from approval queue button');
		//this.test.assertTextExists('Approve a pending post from- Edit from approval queue button', ' found on the page');
		this.test.assertTextExists('Approve a pending post from- Approve by single checkbox', ' found on the page');
		this.test.assertTextDoesntExist('Approve a pending post from- Delete by single checkbox');
		this.test.assertTextExists('Approve a pending post from- Approve by single checkbox', ' found on the page');
		this.test.assertTextExists('Approve a pending post from- Approve by click on topic', ' found on the page');
		this.test.assertTextDoesntExist('Approve a pending post from- Delete by click on topic');
		this.test.assertTextExists('Approve a pending post from- Approve by all checkbox', ' found on the page');*/
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).then(function() {
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
	}).waitForSelector('div#ddContent', function() {
		casper.click('div#ddContent a:nth-child(2)');
	}).waitForSelector('div#tab_wrapper', function() {
	}).then(function() {
		this.click('li.inactive_tab a');
	}).waitForSelector('td.userGroupActions', function() {
		var tableLength = casper.evaluate(function() {
			var len = document.querySelectorAll('table.text.fullborder tr');
			return len.length;
		});
		var grpName = casper.evaluate(function(tableLength){
			for(var i=3; i<=tableLength; i++) {
				var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1) li'); // change li
				if (group.innerText == 'Registered Users') {
					document.querySelector('tr:nth-child('+i+') td:nth-child(2) a').click();
					return (group.innerText);
				}
			}
		},tableLength);
		utils.info('group ='+grpName);
	});
};
