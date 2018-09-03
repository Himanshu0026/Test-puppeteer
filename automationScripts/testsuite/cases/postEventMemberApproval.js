/***These are the function which has been called in postEventMemberApproval.js and also will be used in other js file as per requirement**********/

'use strict.';
var postEventMemberApprovalJSON = require('../../testdata/postEventMemberApproval.json');
var config = require('../../../config/config.json');
var postEventMemberApprovalMethod = require('../methods/postEventMemberApproval.js');
var forumLoginMethod = require('../methods/login.js');
var topicMethod = require('../methods/topic.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var utils = require('../utils.js');
var category_Id;

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
      backEndregisterMethod.setApproveNewPost('99');
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

// method to Delete a pending post by select all pending post by  check box
postEventMemberApprovalTestcases.deleteByAllCheckBox = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 8 [ Delete a pending post by select all pending post by  check box ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
    postEventMemberApprovalMethod.composePost();
  }).then(function() {
    postEventMemberApprovalMethod.getPostId(function(err, postId) {
      if(!err) {
				casper.waitForSelector('div.subheading input.entry-checkbox', function() {
						this.test.assertExists('div.subheading input.entry-checkbox', ' check box found');
						this.evaluate(function(){
							document.querySelector('div.subheading input.entry-checkbox').click();
						});
						this.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
				}).waitForSelector('div#pending-menu', function() {
					this.test.assertExists('a#decline_pending', 'DELETE TICK ON THE FLOATING MENU');
					this.click('a#decline_pending');
        }).waitForText("There's currently nothing that needs your approval.");
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
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

// method to Approve a pending post from- Approval queue button for combine forum
postEventMemberApprovalTestcases.combineForumApprovalQueueButton = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 1 [ Approve a pending post from- Approval queue button for combine forum ]');
    this.test.assertExists('#inline_search_box', 'Search bar present');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
		postEventMemberApprovalMethod.composePost();
  }).then(function() {
  	postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
  			casper.waitForSelector('div.post-edit.pull-right.dropdown a', function() {
  				this.click('a#approvePost_'+postId+' i');
  			}).waitWhileVisible('span#post_message_'+postId, function() {
  				this.test.assertDoesntExist('span#post_message_'+postId, 'post is not  visible on the approval queue page');
  			}).then(function() {
  				postEventMemberApprovalMethod.deletePost();
        });
      }
  	});
  }).then(function() {
		forumLoginMethod.logoutFromApp();
	});
};

// method to Approve a pending post -By clicking on topic for combine forum
postEventMemberApprovalTestcases.combineForumByClickingOnTopic = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 2 [ Approve a pending post -By clicking on topic for combine forum ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
		postEventMemberApprovalMethod.composePost();
  }).then(function() {
  	postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
				casper.waitForSelector('form#approveMembers span.post-body-author a', function() {
  				this.test.assertExists('form#approveMembers span.post-body-author a', ' Topic button found');
  				this.click('form#approveMembers span.post-body-author a');
        }).waitForText('This post is awaiting approval by a moderator.', function() {
						this.test.assertExists('a#approve_request i', 'approve tick found');
						this.click('a#approve_request i');
				}).waitWhileVisible('a#approve_request i',function() {
          this.test.assertDoesntExist('i.glyphicon.glyphicon-remove', 'delete tick not found');
					this.test.assertSelectorDoesntHaveText('div.pending-post span.text-danger' ,' This post is awaiting approval by a moderator.');
				}).then(function() {
					postEventMemberApprovalMethod.deletePost();
				});
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to Approve a pending post by select the pending post by  check box  for combine forum
postEventMemberApprovalTestcases.combineForumByCheckBox = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 3 [ Approve a pending post by select the pending post by  check box  for combine forum ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
		postEventMemberApprovalMethod.composePost();
  }).then(function() {
  	postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
				casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function() {
					this.evaluate(function() {
						document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
					});
					this.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
					this.test.assertExists('a#approvePending i', 'approve tick on the floating menu');
					this.click('a#approvePending i');
				}).then(function() {
					this.test.assertDoesntExist('span#post_message_'+postId ,' post is not visible on the approval queue page');
				}).then(function() {
					postEventMemberApprovalMethod.deletePost();
				});
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to Approve a pending post by select all pending post by  check box for combine forum
postEventMemberApprovalTestcases.combineForumByCheckBoxAll = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 4 [ Approve a pending post by select all pending post by  check box for combine forum ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
		postEventMemberApprovalMethod.composePost();
  }).then(function() {
  	postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
      	casper.waitForSelector('li.pull-right.user-panel', function() {
    			this.test.assertExists('div.subheading input.entry-checkbox', 'check box found');
    			this.evaluate(function(){
    				document.querySelector('div.subheading input.entry-checkbox').click();
    			});
    			this.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
    			this.test.assertExists('a#approvePending i', 'APPROVE TICK ON THE FLOATING MENU');
    			this.click('a#approvePending i');
    			this.waitForText("There's currently nothing that needs your approval.");
        }).then(function() {
					postEventMemberApprovalMethod.deletePost();
				});
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to Delete a pending post from- Approval queue button for combine forum
postEventMemberApprovalTestcases.combineForumDeleteApprovalQueueButton = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 5 [ Delete a pending post from- Approval queue button for combine forum ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
    postEventMemberApprovalMethod.composePost();
  }).then(function() {
    postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
				casper.waitForSelector('div.post-edit.pull-right.dropdown a.alert.alert-danger.pull-left', function() {
					this.click('a#postDelete_'+postId+' i');
				}).waitWhileVisible('span#post_message_'+postId, function() {
					this.test.assertDoesntExist('span#post_message_'+postId , 'Post is Deleted from the approval queue');
				});
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to Delete a pending post -By clicking on post for combine forum
postEventMemberApprovalTestcases.combineForumDeleteClickingPost = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 6 [ Delete a pending post -By clicking on post for combine forum ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
    postEventMemberApprovalMethod.composePost();
  }).then(function() {
    postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
				casper.waitForSelector('form#approveMembers span.post-body-author a', function() {
					this.click('form#approveMembers span.post-body-author a');
        }).waitForText('This post is awaiting approval by a moderator.', function() {
						this.test.assertExists('a#delete_pending_'+postId+' i', 'Delete tick found');
						this.click('a#delete_pending_'+postId+' i');
				}).waitWhileVisible('a#delete_pending_'+postId+' i',function() {
          this.test.assertDoesntExist('i.glyphicon.glyphicon-remove', 'delete tick not found');
					this.test.assertSelectorDoesntHaveText('div.pending-post span.text-danger' ,' This post is awaiting approval by a moderator.');
        });
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to Delete a pending post by select the pending post by  check box for combine forum
postEventMemberApprovalTestcases.combineForumDeleteByCheckBox = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 7 [ Delete a pending post by select the pending post by check box for combine forum ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
    postEventMemberApprovalMethod.composePost();
  }).then(function() {
    postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
				casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function() {
					this.evaluate(function() {
						document.querySelector('div.post-edit.pull-right.dropdown input.entry-checkbox:nth-of-type(1)').click();
					});
					this.test.assertExists('div#pending-menu', ' Floating menu is appear on bottom of the page');
					this.test.assertExists('a#decline_pending', ' Delete tick on the floating menu');
					this.click('a#decline_pending');
				}).waitWhileVisible('span#post_message_'+postId, function() {
					this.test.assertDoesntExist('span#post_message_'+postId , ' post is deleted from Approval Queue  on clicking checkbox');
				});
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to Delete a pending post by select all pending post by check box for combine forum
postEventMemberApprovalTestcases.combineForumDeleteByAllCheckBox = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 8 [ Delete a pending post by select all pending post by check box for combine forum ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
    postEventMemberApprovalMethod.composePost();
  }).then(function() {
    postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
				casper.waitForSelector('div.subheading input.entry-checkbox', function() {
						this.test.assertExists('div.subheading input.entry-checkbox', ' check box found');
						this.evaluate(function(){
							document.querySelector('div.subheading input.entry-checkbox').click();
						});
						this.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
				}).waitForSelector('div#pending-menu', function() {
					this.test.assertExists('a#decline_pending', 'DELETE TICK ON THE FLOATING MENU');
					this.click('a#decline_pending');
        }).waitForText("There's currently nothing that needs your approval.");
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to edit a pending post from- Approval queue button for combine forum
postEventMemberApprovalTestcases.combineForumEditApprovalQueueButton = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 9 [ Edit a pending post from- Approval queue button for combine forum ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
    postEventMemberApprovalMethod.composePost();
  }).then(function() {
    postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
				casper.waitForSelector('div.post-edit.pull-right.dropdown a.alert.alert-gray.pull-left', function() {
					this.click('a#postEdit_'+postId+' i');
				}).waitForSelector('#message1_ifr', function() {
					this.test.assertExists('#message1_ifr', 'message1-ifr found So the post is editable');
					this.withFrame('message1_ifr', function() {
				 		this.sendKeys('#tinymce', "Hello I am Admin and edited the post");
					});
				}).then(function() {
					this.click('div.form-group.cleared input[name="save"]');
				}).wait(5000,function () {
				});
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to edit a pending post by clicking on it for combine forum
postEventMemberApprovalTestcases.combineForumEditByClickingPost = function() {
	casper.thenOpen(config.url, function() {
    utils.info('Case 10 [ Edit a pending post by clicking on it for combine forum ]');
    forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
  }).then(function() {
    postEventMemberApprovalMethod.composePost();
  }).then(function() {
    postEventMemberApprovalMethod.getPostIdForCombineForum(function(err, postId) {
      if(!err) {
				casper.waitForSelector('form#approveMembers span.post-body-author a', function() {
					this.click('form#approveMembers span.post-body-author a');
				}).waitForText('This post is awaiting approval by a moderator.', function() {
					casper.click('#posttoggle_'+postId+' i');
					casper.mouse.move('#post_list_' +postId);
					casper.click('a[data-pid="'+postId+'"]');
        }).waitForSelector('#message1_ifr', function() {
					this.test.assertExists('#message1_ifr', 'message1-ifr found So the post is editable');
					this.withFrame('message1_ifr', function() {
				 		this.sendKeys('#tinymce', "Hello I am Admin and edited the post");
					});
				}).then(function() {
					this.click('div.form-group.cleared input[name="save"]');
				}).wait(5000,function () {
				});
      }
    });
  }).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// Test cases for event approval
// method to Approve a pending event -Approval queue button
postEventMemberApprovalTestcases.eventApprovalByApprovalQueueButton = function() {
	casper.thenOpen(config.backEndUrl, function() {
		/*utils.info('Case 12 [ Approve a pending Event from- Approval queue button ]');
		postEventMemberApprovalMethod.enableCalendar(function(err) {
			if(!err) {
				utils.log('Enable Calendar functionality method called ','INFO');
			}
		});
		//method to enable Event Approval
		postEventMemberApprovalMethod.enableEventApproval(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});*/
	}).thenOpen(config.url, function() {
		postEventMemberApprovalMethod.composeEvent(function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage();
				casper.waitForSelector('div.post-edit.pull-right.dropdown', function() {
					casper.click('a#approveEvent_'+eventId+' i');
				}).waitWhileVisible('div#event_'+eventId , function() {
					casper.test.assertDoesntExist('div#event_'+eventId , ' event is deleted from the page','INFO');
				});
			}
		});
	});
};

// method to Approve a pending event -By clicking on event
postEventMemberApprovalTestcases.eventApprovalByClickingOnEvent = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 13 [ Approve a pending event -By clicking on event ]');
		postEventMemberApprovalMethod.composeEvent(function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage();
				casper.waitForSelector('form#approveMembers span.post-body-author a', function() {
					this.click('span[data-eventid="'+eventId+'"] a');
				}).waitForText('This event is awaiting moderator approval.', function() {
					this.test.assertDoesntExist('a[id^="approveEvent_"]', ' Approve button is not available');
				});
			}
		});
	});
};

// method to Approve a pending event by select the pending event by  check box
postEventMemberApprovalTestcases.eventApprovalByCheckBox = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 14 [ Approve a pending event by select the pending event by  check box ]');
		postEventMemberApprovalMethod.composeEvent(function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage();
				casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function() {
					this.click('input#eventaction_'+eventId);
					this.test.assertExists('div#pending-menu', ' floating menu is appear on bottom of the page');
					this.test.assertExists('a#approvePending i', ' approve tick on the floating menu');
					this.click('a#approvePending i');
				}).waitWhileVisible('div#event_'+eventId , function() {
					this.test.assertDoesntExist('div#event_'+eventId , ' event is deleted from the page');
				});
			}
		});
	});
};

// method to Approve a pending event by select all pending event by  check box
postEventMemberApprovalTestcases.eventApprovalByCheckBoxAll = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 15 [ Approve a pending event by select all pending event by  check box ]');
		postEventMemberApprovalMethod.composeEvent(function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage();
				casper.waitForSelector('input#select_all_pending_events', function() {
					this.click('input#select_all_pending_events');
					this.test.assertExists('div#pending-menu', ' floating menu is appear on bottom of the page');
				}).waitForSelector('div#pending-menu', function() {
					this.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
					this.test.assertExists('a#approvePending i', 'APPROVE TICK ON THE FLOATING MENU');
					this.click('a#approvePending i');
				}).waitForText("There's currently nothing that needs your approval.");
			}
		});
	});
};

// method to Delete a pending event from- Approval queue button
postEventMemberApprovalTestcases.eventdeleteByApprovalQueueButton = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 16 [ Delete a pending event from- Approval queue button ]');
		postEventMemberApprovalMethod.composeEvent(function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage();
				casper.waitForSelector('div.post-edit.pull-right.dropdown', function() {
					this.click('a#deleteEvent_'+eventId+' i');
				}).waitWhileVisible('div#event_'+eventId , function() {
					this.test.assertDoesntExist('div#event_'+eventId ,' event is deleted from the page');
				});
			}
		});
	});
};

// method to Delete a pending event -By clicking on it
postEventMemberApprovalTestcases.eventdeleteByClickingEvent = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 17 [ Delete a pending event -By clicking on it ]');
		postEventMemberApprovalMethod.composeEvent(function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage();
				casper.waitForSelector('form#approveMembers span.post-body-author a', function() {
					this.click('span[data-eventid="'+eventId+'"] a');
				}).waitForText('This event is awaiting moderator approval.', function() {
					this.test.assertDoesntExist('a#deleteEvent_'+eventId+' i', ' Delete button is not available');
				});
			}
		});
	});
};

// method to Delete a pending event by select the pending post by  check box
postEventMemberApprovalTestcases.eventdeleteByCheckBox = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 18 [ Delete a pending event by select the pending post by  check box ]');
		postEventMemberApprovalMethod.composeEvent(function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage();
				casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function() {
					this.click('input#eventaction_'+eventId);
					this.test.assertExists('div#pending-menu', ' floating menu is appear on bottom of the page');
					this.test.assertExists('a#decline_pending', ' Delete tick on the floating menu');
					this.click('a#decline_pending');
				}).waitWhileVisible('div#event_'+eventId , function() {
					this.test.assertDoesntExist('div#event_'+eventId , ' event is deleted from the page');
				});
			}
		});
	});
};

// method to Delete a pending event by select all pending post by  check box
postEventMemberApprovalTestcases.eventdeleteByAllCheckBox = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 19 [ Delete a pending event by select all pending event by  check box ]');
		postEventMemberApprovalMethod.composeEvent(function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage();
				casper.waitForSelector('input#select_all_pending_events', function() {
					this.click('input#select_all_pending_events');
					this.test.assertExists('div#pending-menu', ' floating menu is appear on bottom of the page');
				}).waitForSelector('div#pending-menu', function() {
					this.test.assertExists('a#decline_pending', ' DELETE TICK ON THE FLOATING MENU');
					this.click('a#decline_pending');
				}).waitForText("There's currently nothing that needs your approval.");
			}
		});
	});
};

// method to edit a pending event by clicking on it
postEventMemberApprovalTestcases.eventEditByClickingOnIt = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 20 [ Edit a pending event by clicking on it ]');
		postEventMemberApprovalMethod.composeEvent(function(err,eventId) {
			if(!err) {
				postEventMemberApprovalMethod.goToApprovalQueuePage();
				casper.waitForSelector('div.post-edit.pull-right.dropdown', function() {
					this.click('a#edit_'+eventId+' i');
				}).waitForSelector('div.editable-input textarea', function() {
					var text = this.fetchText('div.editable-input textarea');
					utils.info('The text of the event is--'+text);
					casper.sendKeys('div.editable-input textarea', 'Event is edited');
					casper.wait(5000,function () {
						this.click('a#edit_'+eventId+' i');
						var text2 = this.fetchText('div.editable-input textarea');
						utils.info('The text of the event is--'+text2);
						if(text2!=text) {
							utils.info('Event edited');
							this.click('a#deleteEvent_'+eventId+' i');
							this.waitWhileVisible('div#event_'+eventId , function () {
								this.test.assertDoesntExist('div#event_'+eventId , ' Event is deleted after edited from the page');
							});
						} else {
							utils.error('Event not edited');
						}
					});
					casper.click('div.editable-buttons i.glyphicon.glyphicon-ok');
					casper.click('div.editable-buttons i.glyphicon.glyphicon-ok');
				});
			}
		});
	});
	//Open Back-End URL And Get Title and logout if logged in
	/*casper.thenOpen(config.backEndUrl, function() {
		postEventMemberApprovalMethod.disableEventApproval(function(err) {
			if(!err) {
				utils.log('Disable Approve New Event functionality method called ','INFO');
			}
		});
	});*/
};

// TestCases to test Member Approval functionality
// method to Approve a pending user from- Approval queue button
postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButton = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 1 ', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*                   Approve a pending Member from- Approval queue button           *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new Registration and disable email verification
		postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail(function(err) {
			if(!err) {
				utils.log('Enable approve new Registration and disable email verification method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
		casper.then(function() {
			//method to enable Viewable on Members List for pending approval from backend
			postEventMemberApprovalMethod.enableViewableMembersPendingApproval(function(err) {
				if(!err) {
					utils.log('Viewable on Members List for pending approval enabled ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.test.assertExists('a#approveMember_'+memberId[1]+' i', utils.log('approve tick for user member found', 'INFO'));
										casper.click('a#approveMember_'+memberId[1]+' i');
										casper.waitWhileVisible('li#member_'+memberId[1], function success() {
											casper.test.assertDoesntExist('li#member_'+memberId[1] ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('li#member_'+memberId[1] , utils.log('username is deleted from the approval queue page','ERROR'));
										});
									});
									casper.then(function() { // method called to verify  user moved to Registered group
										postEventMemberApprovalMethod.checkPendingUser(function (err) {
											if(!err) {
												utils.log('Inside the checkPendingUser method','INFO');
											}
										});
									});
									casper.then(function() { // method called to delete the user which is approved above
										postEventMemberApprovalMethod.deleteMember(function (err) {
											if(!err) {
												utils.log('Inside the deleteUser method','INFO');
											}
										});
									});
								}
							});
						} else {
							utils.log('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				utils.log('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Approve a pending user -By clicking on  user name
postEventMemberApprovalTestcases.memberApprovalByClickingOnUsername  = function() {
	casper.then(function() {
		utils.log('                                      CASE 2', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*                   Approve a pending user -By clicking on  user name              *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.test.assertExists('li#member_'+memberId[1]+' a strong', utils.log('Pending user name found','INFO'));
										casper.click('li#member_'+memberId[1]+' a strong');
										wait.waitForElement('div.alert.alert-danger', function(err, isExists) {
											if(isExists) {
												var actualText = casper.fetchText('div.alert.alert-danger.text-center strong');
												var expectedText = "This user is pending approval.";
												casper.test.assert(actualText.indexOf(expectedText) > -1);
												casper.click('div.alert.alert-danger.text-center a.btn.btn-success');
												casper.waitWhileVisible('li#member_'+memberId[1], function success() {
													casper.test.assertDoesntExist('li#member_'+memberId[1] ,utils.log('username is deleted from the approval queue page','INFO'));
												}, function fail() {
													casper.test.assertExists('li#member_'+memberId[1] , utils.log('username is deleted from the approval queue page','ERROR'));
												});
											}else{
												utils.log('Alert div not found','ERROR');
											}
										});
									});
									casper.then(function() { // method called to delete the user which is approved above
										postEventMemberApprovalMethod.deleteMember(function (err) {
											if(!err) {
												utils.log('Inside the deleteUser method','INFO');
											}
										});
									});
								}
							});
						} else {
							utils.log('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				utils.log('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Approve a pending user-by  Searching pending User
postEventMemberApprovalTestcases.memberApprovalBySearchingPendingUser = function() {
	casper.then(function() {
		utils.log('                                      CASE 3', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*                   Approve a pending user-by  Searching pending User              *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#searchMembers', function(err, isExists) {
									if(isExists) {
										casper.click('a#searchMembers');
										wait.waitForElement('input[name="s_username"]', function(err, isExists) {
											if(isExists) {
												casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
													if(isExists) {
														casper.click('div.panel-body.table-responsive a strong');
														wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
															if(isExists) {
																utils.log(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
																casper.click('div.alert.alert-danger.text-center a.btn.btn-success');
															}
														});
													}else{
														utils.log('Pending Member not found','ERROR');
													}
												});
											}else {
												utils.log('Search bar not found','ERROR');
											}
										});
									}else{
										utils.log('Member Search button not found','ERROR');
									}
								});
							}else {
								utils.log('Search button not found','ERROR');
							}
						});
				} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() {    // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a single user by selecting a checkbox
postEventMemberApprovalTestcases.memberApprovalBySelectingCheckbox = function() {
	casper.then(function() {
		utils.log('                                      CASE 4', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*                   Approve a single user by selecting a checkbox                  *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.click('input#mem_'+memberId[1]);
										casper.test.assertExists('div#pending-menu', utils.log('floating menu is appear on bottom of the page','INFO'));
										casper.test.assertExists('a#approvePending i', utils.log('approve tick on the floating menu******************'));
										casper.click('a#approvePending i');
										casper.waitWhileVisible('li#member_'+memberId[1], function success() {
											casper.test.assertDoesntExist('li#member_'+memberId[1] ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('li#member_'+memberId[1] , utils.log('username is deleted from the approval queue page','ERROR'));
										});
									});
									casper.then(function() { // method called to delete the user which is approved above
										postEventMemberApprovalMethod.deleteMember(function (err) {
											if(!err) {
												utils.log('Inside the deleteUser method','INFO');
											}
										});
									});
								}
							});
						} else {
							utils.log('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				utils.log('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Approve All user by selecting the checkbox appearing on the top right corner
postEventMemberApprovalTestcases.memberApprovalBySelectingRightCornerCheckbox = function() {
	casper.then(function() {
		utils.log('                                      CASE 5', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*     Approve All user by selecting the checkbox appearing on the top right corner *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.click('div.subheading input#select_all_pending_members');
										casper.test.assertExists('div#pending-menu', utils.log('floating tab is appear on bottom of the page', 'INFO'));
										casper.test.assertExists('a#approvePending i', utils.log('APPROVE TICK ON THE FLOATING MENU', 'INFO'));
										wait.waitForElement('div#pending-menu', function(err, isExists) {
											if(isExists) {
												casper.click('a#approvePending i');
												casper.waitUntilVisible('form[name="posts"] div.alert.alert-info.text-center', function success() {
													var actualText = casper.fetchText('form[name="posts"] div.alert.alert-info.text-center');
													var expectedText = "There's currently nothing that needs your approval.";
													casper.test.assert(actualText.indexOf(expectedText) > -1);
												}, function fail() {
													utils.log('events not deleted from the page','ERROR');
												});
											}else{
												utils.log('Floating Menu not Found','ERROR');
											}
										});
									});
									casper.then(function() { // method called to delete the user which is approved above
										postEventMemberApprovalMethod.deleteMember(function (err) {
											if(!err) {
												utils.log('Inside the deleteUser method','INFO');
											}
										});
									});
								}
							});
						} else {
							utils.log('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				utils.log('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Approve pending member by searching it from advance search
postEventMemberApprovalTestcases.memberApprovalByAdvanceSearch = function() {
	casper.then(function() {
		utils.log('                                      CASE 6', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*            Approve pending member by searching it from advance search            *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#advancedSearch', function(err, isExists) {
									if(isExists) {
										casper.click('a#advancedSearch');
										wait.waitForElement('a#anchor_tab_member_search', function(err, isExists) {
											if(isExists) {
												casper.click('a#anchor_tab_member_search');
												wait.waitForElement('#search-par', function(err, isExists) {
													if(isExists) {
														casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
														casper.page.sendEvent("keypress", casper.page.event.key.Enter);
														//casper.click('input.btn.btn-primary');
														wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
															if(isExists) {
																casper.click('div.panel-body.table-responsive a strong');
																wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
																	if(isExists) {
																		utils.log(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
																		casper.click('div.alert.alert-danger.text-center a.btn.btn-success');
																	}
																});
															}else {
																utils.log('Pending Member not found','ERROR');
															}
														});
													}else {
														utils.log('Member Search Form not found','ERROR');
													}
												});
											}else {
												utils.log('Member panel-heading not found','ERROR');
											}
										});
									}else {
										utils.log('Advance Search button not found','ERROR');
									}
								});
							}else{
								utils.log('Search button not found','ERROR');
							}
						});
					} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from- Approval queue button for backend setting two
postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButtonSettingTwo = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 7', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*    Approve a pending user from- Approval queue button for backend setting two    *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail(function(err) {
			if(!err) {
				utils.log('Enable Email verification and Disable -Approve New Registrations method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
		casper.then(function() {
			//method to enable Viewable on Members List for pending email verification from backend
			postEventMemberApprovalMethod.enableViewableMembersPendingEmailVerification(function(err) {
				if(!err) {
					utils.log('Viewable on Members List for pending email verification enabled ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret', utils.log('ul.nav.pull-right span.caret', 'INFO'));
			casper.then(function() {
				forumLoginMethod.logoutFromApp(function(err) {
					if(!err) {
						utils.log(' User successfully logged out from frontend','INFO');
					}
				});
			});
		} catch (e) {
			utils.log('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			utils.log('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
						if(isExists) {
							utils.log('User has been successfuly login to application with admin user', 'INFO');
							wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
								if(isExists) {
									casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log('Category link found', 'INFO'));
									casper.click('ul.nav.nav-tabs li:nth-child(2) a');
									wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
										if(isExists) {
											casper.test.assertDoesntExist('li#approvalQueue a' ,utils.log('approval queue icon is deleted from the forum','INFO'));
										}else{
											utils.log('Approval Queue not Found','ERROR');
										}
									});
								}else{
									utils.log('Categories not Found','ERROR');
								}
							});
						} else {
							utils.log('User not logged in','ERROR');
						}
					});
				}else {
					utils.log('Admin user not logged in', 'ERROR');
				}
			});
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user-by  Searching pending User Setting Two
postEventMemberApprovalTestcases.memberApprovalBySearchingPendingUserSettingTwo = function() {
	casper.then(function() {
		utils.log('                                      CASE 8', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*          Approve a pending user-by  Searching pending User Setting Two           *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#searchMembers', function(err, isExists) {
									if(isExists) {
										casper.click('a#searchMembers');
										wait.waitForElement('input[name="s_username"]', function(err, isExists) {
											if(isExists) {
												casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
													if(isExists) {
														casper.click('div.panel-body.table-responsive a strong');
														wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
															if(isExists) {
																utils.log(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
																casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
															}
														});
													}else{
														utils.log('Pending Member not found','ERROR');
													}
												});
											}else {
												utils.log('Search bar not found','ERROR');
											}
										});
									}else{
										utils.log('Member Search button not found','ERROR');
									}
								});
							}else {
								utils.log('Search button not found','ERROR');
							}
						});
				} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() {    // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve pending member by searching it from advance search for backend setting two
postEventMemberApprovalTestcases.memberApprovalByAdvanceSearchSettingTwo = function() {
	casper.then(function() {
		utils.log('                                      CASE 9', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*Approve pending member by searching it from advance search for backend setting two*', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#advancedSearch', function(err, isExists) {
									if(isExists) {
										casper.click('a#advancedSearch');
										wait.waitForElement('a#anchor_tab_member_search', function(err, isExists) {
											if(isExists) {
												casper.click('a#anchor_tab_member_search');
												wait.waitForElement('#search-par', function(err, isExists) {
													if(isExists) {
														casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
														casper.page.sendEvent("keypress", casper.page.event.key.Enter);
														//casper.click('input.btn.btn-primary');
														wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
															if(isExists) {
																casper.click('div.panel-body.table-responsive a strong');
																wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
																	if(isExists) {
																		utils.log(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
																		casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
																	}
																});
															}else {
																utils.log('Pending Member not found','ERROR');
															}
														});
													}else {
														utils.log('Member Search Form not found','ERROR');
													}
												});
											}else {
												utils.log('Member panel-heading not found','ERROR');
											}
										});
									}else {
										utils.log('Advance Search button not found','ERROR');
									}
								});
							}else{
								utils.log('Search button not found','ERROR');
							}
						});
					} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};


// method to Approve a pending user from- Approval queue button for backend setting three
postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButtonSettingThree = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 10', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*    Approve a pending user from- Approval queue button for backend setting three  *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Enable -Approve New Registrations
		postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret', utils.log('ul.nav.pull-right span.care', 'INFO'));
			casper.then(function() {
				forumLoginMethod.logoutFromApp(function(err) {
					if(!err) {
						utils.log(' User successfully logged out from frontend','INFO');
					}
				});
			});
		} catch (e) {
			utils.log('No user logged in','ERROR');
		}
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			utils.log('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
						if(isExists) {
							utils.log('User has been successfuly login to application with admin user', 'INFO');
							wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
								if(isExists) {
									casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log('Category link found', 'INFO'));
									casper.click('ul.nav.nav-tabs li:nth-child(2) a');
									wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
										if(isExists) {
											casper.test.assertDoesntExist('li#approvalQueue a' ,utils.log('approval queue icon is deleted from the forum','INFO'));
										}else{
											utils.log('Approval Queue not Found','ERROR');
										}
									});
								}else{
									utils.log('Categories not Found','ERROR');
								}
							});
						} else {
							utils.log('User not logged in','ERROR');
						}
					});
				}else {
					utils.log('Admin user not logged in', 'ERROR');
				}
			});
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user-by  Searching pending User Setting Three
postEventMemberApprovalTestcases.memberApprovalBySearchingPendingUserSettingThree = function() {
	casper.then(function() {
		utils.log('                                      CASE 11', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*          Approve a pending user-by  Searching pending User Setting Three         *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#searchMembers', function(err, isExists) {
									if(isExists) {
										casper.click('a#searchMembers');
										wait.waitForElement('input[name="s_username"]', function(err, isExists) {
											if(isExists) {
												casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
													if(isExists) {
														casper.click('div.panel-body.table-responsive a strong');
														wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
															if(isExists) {
																utils.log(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
																casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
																casper.wait(5000, function() {});
															}
														});
													}else{
														utils.log('Pending Member not found','ERROR');
													}
												});
											}else {
												utils.log('Search bar not found','ERROR');
											}
										});
									}else{
										utils.log('Member Search button not found','ERROR');
									}
								});
							}else {
								utils.log('Search button not found','ERROR');
							}
						});
				} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() {    // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve pending member by searching it from advance search for backend setting three
postEventMemberApprovalTestcases.memberApprovalByAdvanceSearchSettingThree = function() {
	casper.then(function() {
		utils.log('                                      CASE 12', 'INFO');
		utils.log('***************************************************************************************', 'INFO');
		utils.log('*Approve pending member by searching it from advance search for backend setting three *', 'INFO');
		utils.log('***************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#advancedSearch', function(err, isExists) {
									if(isExists) {
										casper.click('a#advancedSearch');
										wait.waitForElement('a#anchor_tab_member_search', function(err, isExists) {
											if(isExists) {
												casper.click('a#anchor_tab_member_search');
												wait.waitForElement('#search-par', function(err, isExists) {
													if(isExists) {
														casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
														casper.page.sendEvent("keypress", casper.page.event.key.Enter);
														//casper.click('input.btn.btn-primary');
														wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
															if(isExists) {
																casper.click('div.panel-body.table-responsive a strong');
																wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
																	if(isExists) {
																		utils.log(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
																		casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
																	}
																});
															}else {
																utils.log('Pending Member not found','ERROR');
															}
														});
													}else {
														utils.log('Member Search Form not found','ERROR');
													}
												});
											}else {
												utils.log('Member panel-heading not found','ERROR');
											}
										});
									}else {
										utils.log('Advance Search button not found','ERROR');
									}
								});
							}else{
								utils.log('Search button not found','ERROR');
							}
						});
					} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.then(function() {
		postEventMemberApprovalMethod.goToApprovalQueuePage(function(err) {
			if(!err) {
				postEventMemberApprovalMethod.memberId(function(err,memberId) {
					if(!err) {
						casper.then(function() {
							casper.test.assertExists('a#approveMember_'+memberId[1]+' i', utils.log('approve tick for user member found', 'INFO'));
							casper.click('a#approveMember_'+memberId[1]+' i');
							casper.waitWhileVisible('li#member_'+memberId[1], function success() {
								casper.test.assertDoesntExist('li#member_'+memberId[1] ,utils.log('username is deleted from the approval queue page','INFO'));
							}, function fail() {
								casper.test.assertExists('li#member_'+memberId[1] , utils.log('username is deleted from the approval queue page','ERROR'));
							});
						});
					}
				});
			} else {
				utils.log('Not called goToApprovalQueuePage method','ERROR');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from- Approval queue button for backend setting Four
postEventMemberApprovalTestcases.memberApprovalByApprovalQueueButtonSettingFour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 13', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*    Approve a pending user from- Approval queue button for backend setting four  *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		//method to Disable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret', utils.log('ul.nav.pull-right span.caret', 'INFO'));
			casper.then(function() {
				forumLoginMethod.logoutFromApp(function(err) {
					if(!err) {
						utils.log(' User successfully logged out from frontend','INFO');
					}
				});
			});
		} catch (e) {
			utils.log('No user logged in','ERROR');
		}
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			utils.log('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
						if(isExists) {
							utils.log('User has been successfuly login to application with admin user', 'INFO');
							wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
								if(isExists) {
									casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log('Category link found', 'INFO'));
									casper.click('ul.nav.nav-tabs li:nth-child(2) a');
									wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
										if(isExists) {
											casper.test.assertDoesntExist('li#approvalQueue a' ,utils.log('approval queue icon is deleted from the forum','INFO'));
										}else{
											utils.log('Approval Queue not Found','ERROR');
										}
									});
								}else{
									utils.log('Categories not Found','ERROR');
								}
							});
						} else {
							utils.log('User not logged in','ERROR');
						}
					});
				}else {
					utils.log('Admin user not logged in', 'ERROR');
				}
			});
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user-by  Searching pending User Setting four
postEventMemberApprovalTestcases.memberApprovalBySearchingPendingUserSettingFour = function() {
	casper.then(function() {
		utils.log('                                      CASE 14', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*          Approve a pending user-by  Searching pending User Setting Four           *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#searchMembers', function(err, isExists) {
									if(isExists) {
										casper.click('a#searchMembers');
										wait.waitForElement('input[name="s_username"]', function(err, isExists) {
											if(isExists) {
												casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
													if(isExists) {
														casper.click('div.panel-body.table-responsive a strong');
														wait.waitForElement('span#avatar', function(err, isExists) {
															if(isExists) {
																casper.test.assertDoesntExist('div.alert.alert-danger.text-center a.btn.btn-danger',utils.log('approve button is not appear', 'INFO'));
															}
														});
													}else{
														utils.log('Pending Member not found','ERROR');
													}
												});
											}else {
												utils.log('Search bar not found','ERROR');
											}
										});
									}else{
										utils.log('Member Search button not found','ERROR');
									}
								});
							}else {
								utils.log('Search button not found','ERROR');
							}
						});
				} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() {    // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve pending member by searching it from advance search for backend setting Four
postEventMemberApprovalTestcases.memberApprovalByAdvanceSearchSettingFour = function() {
	casper.then(function() {
		utils.log('                                      CASE 15', 'INFO');
		utils.log('*************************************************************************************', 'INFO');
		utils.log('*Approve pending member by searching it from advance search for backend setting Four*', 'INFO');
		utils.log('*************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#advancedSearch', function(err, isExists) {
									if(isExists) {
										casper.click('a#advancedSearch');
										wait.waitForElement('a#anchor_tab_member_search', function(err, isExists) {
											if(isExists) {
												casper.click('a#anchor_tab_member_search');
												wait.waitForElement('#search-par', function(err, isExists) {
													if(isExists) {
														casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
														casper.page.sendEvent("keypress", casper.page.event.key.Enter);
														//casper.click('input.btn.btn-primary');
														wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
															if(isExists) {
																casper.click('div.panel-body.table-responsive a strong');
																casper.test.assertDoesntExist('div.alert.alert-danger.text-center a.btn.btn-danger',utils.log('approve button is not appear','INFO'));
															}else {
																utils.log('Pending Member not found','ERROR');
															}
														});
													}else {
														utils.log('Member Search Form not found','ERROR');
													}
												});
											}else {
												utils.log('Member panel-heading not found','ERROR');
											}
										});
									}else {
										utils.log('Advance Search button not found','ERROR');
									}
								});
							}else{
								utils.log('Search button not found','ERROR');
							}
						});
					} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};


// TestCases to test Member Approval functionality from back end
// method to Approve a pending user from- From Default User Groups (by check box)
postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByCheckbox = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 16', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*        Approve a pending user from- From Default User Groups (by check box)      *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
							if(isExists) {
								casper.click('tr:nth-child(5) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.click('tr td input[name="user_id"]');
										wait.waitForElement('div#floatingActionMenu', function(err, isExists) {
											if(isExists) {
												casper.test.assertExist('select[name="action"]','drop down is appear on the bottom of page');
												casper.fillSelectors('form#frmGroupUsers', {
								    					'select[name="action"]': 'approve_members'
												}, true);
											}else {
												utils.log('Floating menu not found','ERROR');
											}
										});
									}else{
										utils.log('User table not found','ERROR');
									}
								});
							}else{
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user From Default User Groups (by buttons)
postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByButtons = function() {
	casper.then(function() {
		utils.log('                                      CASE 17', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*             Approve a pending user From Default User Groups (by buttons)         *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
							if(isExists) {
								casper.click('tr:nth-child(5) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.mouse.move("td.userlist-icons a:nth-child(1)");
										casper.click('td.userlist-icons a:nth-child(1)');
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]' , utils.log('username is not deleted from the approval queue page','ERROR'));
										});
									}else{
										utils.log('User table not found','ERROR');
									}
								});
							}else {
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(approve button)
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupApproveButton = function() {
	casper.then(function() {
		utils.log('                                      CASE 18', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log("*       Approve a pending user from Change a User's User Group(approve button)     *", 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('a#approve_user', utils.log('******Approve user button found *****', 'INFO'));
										casper.click('a#approve_user');
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR'));
										});
									}else{
										utils.log('Approve user button not found','ERROR');
									}
								});
							}else{
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(change group)
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroup = function() {
	casper.then(function() {
		utils.log('                                      CASE 19', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log("*       Approve a pending user from Change a User's User Group(change group)       *", 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
								if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('form#frmChangeUsersGroupFinal', utils.log('*************POP UP appear*************', 'INFO'));
										casper.fillLabels('form#frmChangeUsersGroupFinal', {
											'Registered Users' : 'checked',
											'Pending Approval' : ''
										}, true);
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]' , utils.log('username is not deleted from the approval queue page','ERROR'));
										});
									}else{
										utils.log('Approve user button not found','ERROR');
									}
								});
							}else{
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from- From Default User Groups (by check box) for backend setting two
postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByCheckboxSettingTwo = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 20', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('* Approve a pending user from- From Default User Groups (by check box) Setting two *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to disable approve new Registration and enable Email verification
		postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
							if(isExists) {
								casper.click('tr:nth-child(5) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.click('tr td input[name="user_id"]');
										wait.waitForElement('div#floatingActionMenu', function(err, isExists) {
											if(isExists) {
												casper.test.assertExist('select[name="action"]','drop down is appear on the bottum of page');
												casper.fillSelectors('div#floatingActionMenu', {
								    					'select[name="action"]': 'show_all_additional_users'
												}, true);
												wait.waitForElement('form#frmChangeAdditional', function(err, isExists) {
													if(isExists) {
														utils.log('POP UP found','INFO');
														casper.fillLabels('form#frmChangeAdditional', {

															'Registered Users' : 'checked',
														}, true);
														casper.click('input[id="a2"][value="overwite_additional_usergroup"]');
														casper.evaluate(function() {
															var x = document.querySelectorAll(' div.ui-dialog-buttonset button');
															 $(x[1]).click();
														});
														casper.waitWhileVisible('a[title="View profile"]', function success() {
															casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the Pending Email Verification page','INFO'));
														}, function fail() {
															casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the Pending Email Verification page','ERROR'));
														});
													}else{
														utils.log('pop up not found','ERROR');
													}
												});
											}else{
												utils.log('Floating menu not found','ERROR');
											}
										});
									}else{
										utils.log('User table not found','ERROR');
									}
								});

							}else{
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(change group) for setting two
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroupSettingTwo = function() {
	casper.then(function() {
		utils.log('                                      CASE 21', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log("*  Approve a pending user from Change a User's User Group(change group) Setting two*", 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('form#frmChangeUsersGroupFinal', utils.log('*************POP UP appear*************', 'INFO'));
										casper.fillLabels('form#frmChangeUsersGroupFinal', {
											'Registered Users' : 'checked',
											'Pending Email Verification' : ''
										}, true);
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]', utils.log('username is deleted from the Pending Email Verification page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the Pending Email Verification page','ERROR'));
										});
									}else {
										utils.log('Approve user button not found','ERROR');
									}
								});
							}else{
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from- From Default User Groups (by check box) for backend setting three
postEventMemberApprovalTestcases.memberApprovalFromDefaultUserGroupsByCheckboxSettingThree = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 22', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*Approve a pending user from- From Default User Groups (by check box) Setting three*', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new registration and email verification
		postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
							if(isExists) {
								casper.click('tr:nth-child(6) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.click('tr td input[name="user_id"]');
										wait.waitForElement('div#floatingActionMenu', function(err, isExists) {
											if(isExists) {
												casper.test.assertExist('select[name="action"]','drop down is appear on the bottum of page');
												casper.fillSelectors('div#floatingActionMenu', {
								    					'select[name="action"]': 'show_all_additional_users'
												}, true);
												wait.waitForElement('form#frmChangeAdditional', function(err, isExists) {
													if(isExists) {
														utils.log('POP UP found','INFO');
														casper.fillLabels('form#frmChangeAdditional', {

															'Registered Users' : 'checked',
														}, true);
														casper.click('input[id="a2"][value="overwite_additional_usergroup"]');
														casper.evaluate(function() {
															var x = document.querySelectorAll(' div.ui-dialog-buttonset button');
															 $(x[1]).click();
														});
														casper.waitWhileVisible('a[title="View profile"]', function success() {
															casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the Pending Email Verification page','INFO'));
														}, function fail() {
															casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the Pending Email Verification page','ERROR'));
														});
													}else{
														utils.log('pop up not found','ERROR');
													}
												});
											}else{
												utils.log('Floating menu not found','ERROR');
											}
										});
									}else{
										utils.log('User table not found','ERROR');
									}
								});

							}else{
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(change group) for setting three
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroupSettingThree = function() {
	casper.then(function() {
		utils.log('                                      CASE 23', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log("*Approve a pending user from Change a User's User Group(change group) Setting three*", 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('form#frmChangeUsersGroupFinal', utils.log('*************POP UP appear*************', 'INFO'));
										casper.fillLabels('form#frmChangeUsersGroupFinal', {
											'Registered Users' : 'checked',
											'Pending Email Verification' : ''
										}, true);
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the Pending Email Verification page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the Pending Email Verification page','ERROR'));
										});
									}else {
										utils.log('Approve user button not found','ERROR');
									}
								});
							}else{
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to verify  user moved to Registered group
		postEventMemberApprovalMethod.checkPendingUser(function (err) {
			if(!err) {
				utils.log('Inside the checkPendingUser method','INFO');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Approve a pending user from Change a User's User Group(change group) for setting four
postEventMemberApprovalTestcases.memberApprovalFromChangeUserGroupChangeGroupSettingFour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 24', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*Approve a pending user from- From Default User Groups (by check box) Setting four *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to disable approve new registration and email verification
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(function(err) {
			if(!err) {
				utils.log('Disable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										var checked = casper.evaluate(function() {
											var element = document.getElementById(20237761).checked;
											return element;
										});
										utils.log('the value of checked = '+checked,'INFO');
										if(checked === true) {
											utils.log('The pending user is moved to Register user, Verified','INFO');
										}
										else {
											utils.log('The pending user is not moved to Register user, Verified','ERROR');
										}
									}else{
										utils.log('changer user group form not found','ERROR');
									}
								});
							}else {
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// Test cases for delete member functionality
// method to Delete a pending user from- Approval queue button
postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButton = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 25', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*                   Delete a pending Member from- Approval queue button           *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new Registration and disable Email verification
		postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.test.assertExists('a#deleteMember_'+memberId[1]+' i', utils.log('approve tick for user member found', 'INFO'));
										casper.click('a#deleteMember_'+memberId[1]+' i');
										casper.waitWhileVisible('li#member_'+memberId[1], function success() {
											casper.test.assertDoesntExist('li#member_'+memberId[1] ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('li#member_'+memberId[1] , utils.log('username is deleted from the approval queue page','ERROR'));
										});
									});
								}
							});
						} else {
							utils.log('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				utils.log('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Delete a pending user -By clicking on  user name
postEventMemberApprovalTestcases.deleteMemberByClickingOnUsername  = function() {
	casper.then(function() {
		utils.log('                                      CASE 26', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*                   Delete a pending user -By clicking on  user name              *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.test.assertExists('li#member_'+memberId[1]+' a strong', utils.log('Pending user name found','INFO'));
										casper.click('li#member_'+memberId[1]+' a strong');
										wait.waitForElement('div.alert.alert-danger', function(err, isExists) {
											if(isExists) {
												var actualText = casper.fetchText('div.alert.alert-danger.text-center strong');
												var expectedText = "This user is pending approval.";
												casper.test.assert(actualText.indexOf(expectedText) > -1);
												casper.click('div.alert.alert-danger.text-center a.btn.btn-danger');
												casper.waitWhileVisible('li#member_'+memberId[1], function success() {
													casper.test.assertDoesntExist('li#member_'+memberId[1] ,utils.log('username is deleted from the approval queue page','INFO'));
												}, function fail() {
													casper.test.assertExists('li#member_'+memberId[1] , utils.log('username is deleted from the approval queue page','ERROR'));
												});
											}else{
												utils.log('Alert div not found','ERROR');
											}
										});
									});
								}
							});
						} else {
							utils.log('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				utils.log('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Delete a pending user-by  Searching pending User
postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUser = function() {
	casper.then(function() {
		utils.log('                                      CASE 27', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*                   Delete a pending user-by  Searching pending User              *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#searchMembers', function(err, isExists) {
									if(isExists) {
										casper.click('a#searchMembers');
										wait.waitForElement('input[name="s_username"]', function(err, isExists) {
											if(isExists) {
												casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
													if(isExists) {
														casper.click('div.panel-body.table-responsive a strong');
														wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
															if(isExists) {
																casper.test.assertExists('a#delete_user_account i', utils.log('Delete button appeared', 'INFO'));
																casper.click('a#delete_user_account i');
																casper.wait(5000, function() {
																});
															}
														});
													}else{
														utils.log('Pending Member not found','ERROR');
													}
												});
											}else {
												utils.log('Search bar not found','ERROR');
											}
										});
									}else{
										utils.log('Member Search button not found','ERROR');
									}
								});
							}else {
								utils.log('Search button not found','ERROR');
							}
						});
				} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to Delete a single user by selecting a checkbox
postEventMemberApprovalTestcases.deleteMemberBySelectingCheckbox = function() {
	casper.then(function() {
		utils.log('                                      CASE 28', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*                   Delete a single user by selecting a checkbox                  *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.click('input#mem_'+memberId[1]);
										casper.test.assertExists('div#pending-menu', utils.log('floating menu is appear on bottom of the page','INFO'));
										casper.test.assertExists('div#pending-menu span.dropdown a.text-danger i', utils.log('approve tick on the floating menu******************', 'INFO'));
										casper.click('div#pending-menu span.dropdown a.text-danger i');
										casper.waitWhileVisible('li#member_'+memberId[1], function success() {
											casper.test.assertDoesntExist('li#member_'+memberId[1] ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('li#member_'+memberId[1] , utils.log('username is deleted from the approval queue page','ERROR'));
										});
									});
								}
							});
						} else {
							utils.log('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				utils.log('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Delete All user by selecting the checkbox appearing on the top right corner
postEventMemberApprovalTestcases.deleteMemberBySelectingRightCornerCheckbox = function() {
	casper.then(function() {
		utils.log('                                      CASE 29', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*     Delete All user by selecting the checkbox appearing on the top right corner *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {
			if(!err) {
				casper.then(function() {
					postEventMemberApprovalMethod.goToApprovalQueuePage(function(err) {
						if(!err) {
							postEventMemberApprovalMethod.memberId(function(err,memberId) {
								if(!err) {
									casper.then(function() {
										casper.click('div.subheading input#select_all_pending_members');
										casper.test.assertExists('div#pending-menu', utils.log('floating tab is appear on bottom of the page', 'INFO'));
										casper.test.assertExists('div#pending-menu span.dropdown a.text-danger i', utils.log('DELETE TICK ON THE FLOATING MENU', 'INFO'));
										wait.waitForElement('div#pending-menu', function(err, isExists) {
											if(isExists) {
												casper.click('div#pending-menu span.dropdown a.text-danger i');
												casper.waitUntilVisible('form[name="posts"] div.alert.alert-info.text-center', function success() {
													var actualText = casper.fetchText('form[name="posts"] div.alert.alert-info.text-center');
													var expectedText = "There's currently nothing that needs your approval.";
													casper.test.assert(actualText.indexOf(expectedText) > -1);
												}, function fail() {
													utils.log('events not deleted from the page','ERROR');
												});
											}else{
												utils.log('Floating Menu not Found','ERROR');
											}
										});
									});
								}
							});
						} else {
							utils.log('Not called goToApprovalQueuePage method','ERROR');
						}
					});
				});
			} else {
				utils.log('Not called registerMember method','ERROR');
			}
		});
	});
};

// method to Delete pending member by searching it from advance search
postEventMemberApprovalTestcases.deleteMemberByAdvanceSearch = function() {
	casper.then(function() {
		utils.log('                                      CASE 47', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*            Delete pending member by searching it from advance search            *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#advancedSearch', function(err, isExists) {
									if(isExists) {
										casper.click('a#advancedSearch');
										wait.waitForElement('a#anchor_tab_member_search', function(err, isExists) {
											if(isExists) {
												casper.click('a#anchor_tab_member_search');
												wait.waitForElement('#search-par', function(err, isExists) {
													if(isExists) {
														casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
														casper.page.sendEvent("keypress", casper.page.event.key.Enter);
														casper.click('input.btn.btn-primary');
														wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
															if(isExists) {
																casper.click('div.panel-body.table-responsive a strong');
																wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
																	if(isExists) {
																		utils.log(casper.fetchText('div.alert.alert-danger.text-center strong'),'INFO');
																		casper.click('div.alert.alert-danger.text-center a.btn.btn-success');
																	}
																});
															}else{
																utils.log('Pending Member not found','ERROR');
															}
														});
													}else{
														utils.log('Member Search Form not found','ERROR');
													}
												});
											}else {
												utils.log('Member panel-heading not found','ERROR');
											}
										});
									}else{
										utils.log('Advance Search button not found','ERROR');
									}
								});
							}else{
								utils.log('Search button not found','ERROR');
							}
						});
					} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
};


// method to Delete a pending user from- Approval queue button for backend setting two
postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButtonSettingTwo = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 30', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*    Delete a pending user from- Approval queue button for backend setting two     *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail(function(err) {
			if(!err) {
				utils.log('Disable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret', utils.log('ul.nav.pull-right span.caret', 'INFO'));
			casper.then(function() {
				forumLoginMethod.logoutFromApp(function(err) {
					if(!err) {
						utils.log(' User successfully logged out from frontend','INFO');
					}
				});
			});
		} catch (e) {
			utils.log('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			utils.log('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
						if(isExists) {
							utils.log('User has been successfuly login to application with admin user', 'INFO');
							wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
								if(isExists) {
									casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log('Category link found', 'INFO'));
									casper.click('ul.nav.nav-tabs li:nth-child(2) a');
									wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
										if(isExists) {
											casper.test.assertDoesntExist('li#approvalQueue a' ,utils.log('approval queue icon is deleted from the forum','INFO','INFO'));
										}else{
											utils.log('Approval Queue not Found','ERROR');
										}
									});
								}else{
									utils.log('Categories not Found','ERROR');
								}
							});
						} else {
							utils.log('User not logged in','ERROR');
						}
					});
				}else {
					utils.log('Admin user not logged in', 'ERROR');
				}
			});
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Delete a pending user-by  Searching pending User for backend setting two
postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUserSettingTwo = function() {
	casper.then(function() {
		utils.log('                                      CASE 31', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*           Delete a pending user-by  Searching pending User Setting Two           *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#searchMembers', function(err, isExists) {
									if(isExists) {
										casper.click('a#searchMembers');
										wait.waitForElement('input[name="s_username"]', function(err, isExists) {
											if(isExists) {
												casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
													if(isExists) {
														casper.click('div.panel-body.table-responsive a strong');
														wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
															if(isExists) {
																casper.test.assertExists('a#delete_user_account i', utils.log('Delete button appeared', 'INFO'));
																casper.click('a#delete_user_account i');
																casper.wait(5000, function() {
																});
															}
														});
													}else{
														utils.log('Pending Member not found','ERROR');
													}
												});
											}else {
												utils.log('Search bar not found','ERROR');
											}
										});
									}else{
										utils.log('Member Search button not found','ERROR');
									}
								});
							}else {
								utils.log('Search button not found','ERROR');
							}
						});
				} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user from- Approval queue button for backend setting three
postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButtonSettingThree = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 32', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*    Delete a pending user from- Approval queue button for backend setting three   *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail(function(err) {
			if(!err) {
				utils.log('Disable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret', utils.log('ul.nav.pull-right span.caret', 'INFO'));
			casper.then(function() {
				forumLoginMethod.logoutFromApp(function(err) {
					if(!err) {
						utils.log(' User successfully logged out from frontend','INFO');
					}
				});
			});
		} catch (e) {
			utils.log('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			utils.log('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
						if(isExists) {
							utils.log('User has been successfuly login to application with admin user', 'INFO');
							wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
								if(isExists) {
									casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log('Category link found', 'INFO'));
									casper.click('ul.nav.nav-tabs li:nth-child(2) a');
									wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
										if(isExists) {
											casper.test.assertDoesntExist('li#approvalQueue a' ,utils.log('approval queue icon is deleted from the forum','INFO','INFO'));
										}else{
											utils.log('Approval Queue not Found','ERROR');
										}
									});
								}else{
									utils.log('Categories not Found','ERROR');
								}
							});
						} else {
							utils.log('User not logged in','ERROR');
						}
					});
				}else {
					utils.log('Admin user not logged in', 'ERROR');
				}
			});
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Delete a pending user-by  Searching pending User for backend setting three
postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUserSettingThree = function() {
	casper.then(function() {
		utils.log('                                      CASE 33', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*           Delete a pending user-by  Searching pending User Setting Three         *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#searchMembers', function(err, isExists) {
									if(isExists) {
										casper.click('a#searchMembers');
										wait.waitForElement('input[name="s_username"]', function(err, isExists) {
											if(isExists) {
												casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
													if(isExists) {
														casper.click('div.panel-body.table-responsive a strong');
														wait.waitForElement('div.alert.alert-danger.text-center strong', function(err, isExists) {
															if(isExists) {
																casper.test.assertExists('a#delete_user_account i', utils.log('Delete button appeared', 'INFO'));
																casper.click('a#delete_user_account i');
																casper.wait(5000, function() {
																});
															}
														});
													}else{
														utils.log('Pending Member not found','ERROR');
													}
												});
											}else {
												utils.log('Search bar not found','ERROR');
											}
										});
									}else{
										utils.log('Member Search button not found','ERROR');
									}
								});
							}else {
								utils.log('Search button not found','ERROR');
							}
						});
				} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user from- Approval queue button for backend setting four
postEventMemberApprovalTestcases.deleteMemberByApprovalQueueButtonSettingFour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 34', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*    Delete a pending user from- Approval queue button for backend setting four    *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		//method to Enable -  Email verification and Disable -Approve New Registrations
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(function(err) {
			if(!err) {
				utils.log('Disable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	casper.then(function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret', utils.log('ul.nav.pull-right span.caret', 'INFO'));
			casper.then(function() {
				forumLoginMethod.logoutFromApp(function(err) {
					if(!err) {
						utils.log(' User successfully logged out from frontend','INFO');
					}
				});
			});
		} catch (e) {
			utils.log('No user logged in','INFO');
		}
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
		casper.thenOpen(config.url, function() {
			//login with admin user to get the id of the post and to approve it
			utils.log('Title of the page :' +casper.getTitle(), 'INFO');
			forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
				if(!err) {
					wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
						if(isExists) {
							utils.log('User has been successfuly login to application with admin user', 'INFO');
							wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
								if(isExists) {
									casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', utils.log('Category link found', 'INFO'));
									casper.click('ul.nav.nav-tabs li:nth-child(2) a');
									wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
										if(isExists) {
											casper.test.assertDoesntExist('li#approvalQueue a' ,utils.log('approval queue icon is deleted from the forum','INFO'));
										}else{
											utils.log('Approval Queue not Found','ERROR');
										}
									});
								}else{
									utils.log('Categories not Found','ERROR');
								}
							});
						} else {
							utils.log('User not logged in','ERROR');
						}
					});
				}else {
					utils.log('Admin user not logged in', 'ERROR');
				}
			});
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Delete a pending user-by  Searching pending User for backend setting four
postEventMemberApprovalTestcases.deleteMemberBySearchingPendingUserSettingFour = function() {
	casper.then(function() {
		utils.log('                                      CASE 35', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*           Delete a pending user-by  Searching pending User Setting Four          *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', function(err, isExists) {
					if(isExists) {
						wait.waitForElement('button#searchContent', function(err, isExists) {
							if(isExists) {
								casper.click('button#searchContent');
								wait.waitForElement('a#searchMembers', function(err, isExists) {
									if(isExists) {
										casper.click('a#searchMembers');
										wait.waitForElement('input[name="s_username"]', function(err, isExists) {
											if(isExists) {
												casper.sendKeys('input[name="s_username"]',postEventMemberApprovalJSON.userToDelete, {keepFocus: true});
												casper.page.sendEvent("keypress", casper.page.event.key.Enter);
												wait.waitForElement('div.panel-body.table-responsive a strong', function(err, isExists) {
													if(isExists) {
														casper.click('div.panel-body.table-responsive a strong');
														wait.waitForElement('a#delete_user_account i', function(err, isExists) {
															if(isExists) {
																casper.test.assertExists('a#delete_user_account i', utils.log('Delete button appeared', 'INFO'));
																casper.click('a#delete_user_account i');
																wait.waitForTime(5000, function(err) {
																});
															}
														});
													}else{
														utils.log('Pending Member not found','ERROR');
													}
												});
											}else {
												utils.log('Search bar not found','ERROR');
											}
										});
									}else{
										utils.log('Member Search button not found','ERROR');
									}
								});
							}else {
								utils.log('Search button not found','ERROR');
							}
						});
				} else {
						utils.log('User not logged in','ERROR');
					}
				});
			}else {
				utils.log('Admin user not logged in', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user from- From Default User Groups (by check box)
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByCheckbox = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 36', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*        Delete a pending user from- From Default User Groups (by check box)       *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
							if(isExists) {
								casper.click('tr:nth-child(5) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.click('tr td input[name="user_id"]');
										casper.test.assertExist('select[name="action"]','drop down is appear on the bottom of page');
										casper.fillSelectors('div#floatingActionMenu', {
						    					'select[name="action"]': 'delete_members'
										}, true);
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR'));
										});
									}else{
										utils.log('Floating menu not found','ERROR');
									}
								});
							}else{
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user From Default User Groups (by buttons)
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByButtons = function() {
	casper.then(function() {
		utils.log('                                      CASE 37', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*             Delete a pending user From Default User Groups (by buttons)          *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
							if(isExists) {
								casper.click('tr:nth-child(5) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.mouse.move("td.userlist-icons a:nth-child(3)");
										casper.click('td.userlist-icons a:nth-child(3)');
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR'));
										});
									}else{
										utils.log('User table not found','ERROR');
									}
								});
							}else {
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user from Change a User's User Group(Delete button)
postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupDeleteButton = function() {
	casper.then(function() {
		utils.log('                                      CASE 38', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log("*       Delete a pending user from Change a User's User Group(approve button)      *", 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('a#delete_user', utils.log('******Delete user button found *****', 'INFO'));
										casper.click('a#delete_user');
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR'));
										});
									}else{
										utils.log('Approve user button not found','ERROR');
									}
								});
							}else{
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user from- From Default User Groups (by check box) for backend setting two
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByCheckboxSettingTwo = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 39', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('* Delete a pending user from- From Default User Groups (by check box) Setting two  *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
							if(isExists) {
								casper.click('tr:nth-child(5) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.click('tr td input[name="user_id"]');
										casper.test.assertExist('select[name="action"]','drop down is appear on the bottom of page');
										casper.fillSelectors('div#floatingActionMenu', {
						    					'select[name="action"]': 'delete_members'
										}, true);
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR'));
										});
									}else{
										utils.log('Floating menu not found','ERROR');
									}
								});
							}else{
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user from Change a User's User Group(delete button) for setting two
postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupDeleteButtonSettingTwo = function() {
	casper.then(function() {
		utils.log('                                      CASE 40', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log("*  Delete a pending user from Change a User's User Group(delete button) Setting two *", 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('a#delete_user', utils.log('******Delete user button found *****', 'INFO'));
										casper.click('a#delete_user');
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR'));
										});
									}else{
										utils.log('Approve user button not found','ERROR');
									}
								});
							}else{
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user From Default User Groups (by buttons) for setting two
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByButtonsSettingTwo = function() {
	casper.then(function() {
		utils.log('                                      CASE 41', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*   Delete a pending user From Default User Groups (by buttons) for setting two    *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
								if(isExists) {
								casper.click('tr:nth-child(5) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.mouse.move("tr td a.userlist-delete");
										casper.click('tr td a.userlist-delete');
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR', 'INFO'));
										});
									}else{
										utils.log('User table not found','ERROR');
									}
								});
							}else{
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user from- From Default User Groups (by check box) for backend setting three
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByCheckboxSettingThree = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 42', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*Delete a pending user from- From Default User Groups (by check box) Setting three *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
							if(isExists) {
								casper.click('tr:nth-child(6) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.click('tr td input[name="user_id"]');
										casper.test.assertExist('select[name="action"]','drop down is appear on the bottom of page');
										casper.fillSelectors('div#floatingActionMenu', {
						    					'select[name="action"]': 'delete_members'
										}, true);
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR'));
										});
									}else{
										utils.log('Floating menu not found','ERROR');
									}
								});
							}else{
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user From Default User Groups (by buttons) for setting three
postEventMemberApprovalTestcases.deleteMemberFromDefaultUserGroupsByButtonsSettingThree = function() {
	casper.then(function() {
		utils.log('                                      CASE 43', 'INFO');
		utils.log('**************************************************************************************', 'INFO');
		utils.log('*   Delete a pending user From Default User Groups (by buttons) for setting three    *', 'INFO');
		utils.log('**************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('table.text.fullborder', function(err, isExists) {
							if(isExists) {
								casper.click('tr:nth-child(6) td:nth-child(2) a');
								wait.waitForElement('table#groupUsersList', function(err, isExists) {
									if(isExists) {
										casper.mouse.move("tr td a.userlist-delete");
										casper.click('tr td a.userlist-delete');
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR', 'INFO'));
										});
									}else{
										utils.log('User table not found','ERROR');
									}
								});
							}else{
								utils.log('Table not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user from Change a User's User Group(change group) for setting three
postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupChangeGroupSettingThree = function() {
	casper.then(function() {
		utils.log('                                      CASE 44', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log("*Delete a pending user from Change a User's User Group(change group) Setting three *", 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('form#frmChangeUsersGroupFinal', utils.log('*************POP UP appear*************', 'INFO'));
										casper.fillLabels('form#frmChangeUsersGroupFinal', {
											'Registered Users' : 'checked',
											'Pending Email Verification' : ''
										}, true);
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the Pending Email Verification page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the Pending Email Verification page','ERROR', 'INFO'));
										});
									}else{
										utils.log('Approve user button not found','ERROR');
									}
								});
							}else {
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to Delete a pending user from Change a User's User Group(delete button) for setting three
postEventMemberApprovalTestcases.deleteMemberFromChangeUserGroupDeleteButtonSettingThree = function() {
	casper.then(function() {
		utils.log('                                      CASE 45', 'INFO');
		utils.log('***************************************************************************************', 'INFO');
		utils.log("*  Delete a pending user from Change a User's User Group(delete button) Setting three *", 'INFO');
		utils.log('***************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

		});
	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('a#delete_user', utils.log('******Delete user button found *****', 'INFO'));
										casper.click('a#delete_user');
										casper.waitWhileVisible('a[title="View profile"]', function success() {
											casper.test.assertDoesntExist('a[title="View profile"]' ,utils.log('username is deleted from the approval queue page','INFO'));
										}, function fail() {
											casper.test.assertExists('a[title="View profile"]', utils.log('username is not deleted from the approval queue page','ERROR', 'INFO'));
										});
									}else{
										utils.log('Approve user button not found','ERROR');
									}
								});
							}else {
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
};

// method to Delete a pending user for setting four
postEventMemberApprovalTestcases.deleteMemberSettingFour = function() {
	//Open Back-End URL And Get Title and logout if logged in
	casper.thenOpen(config.backEndUrl, function() {
		utils.log('                                      CASE 46', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('*                        Delete a pending user Setting four                        *', 'INFO');
		utils.log('************************************************************************************', 'INFO');
		utils.log('Title of the page :' +casper.getTitle(), 'INFO');
		//method to enable approve new post** All posts
		postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail(function(err) {
			if(!err) {
				utils.log('Enable Approve New Event functionality method called ','INFO');
			}
		});
		casper.then(function() {
			//method to set the user permission to Administration
			postEventMemberApprovalMethod.setAdmin(function(err) {
				if(!err) {
					utils.log('Set admin method called ','INFO');
				}
			});
		});
	});
	postEventMemberApprovalMethod.registerMember(postEventMemberApprovalJSON.memberInfo, function(err) {

	});
	casper.thenOpen(config.backEndUrl, function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', utils.log('Users Link Found', 'INFO'));
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', utils.log('*****Group permission is found****', 'INFO'));
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										var checked = casper.evaluate(function() {
											var element = document.getElementById(20237761).checked;
											return element;
										});
										utils.log('the value of checked = '+checked,'INFO');
										if(checked === true) {
											utils.log('The pending user is moved to Register user, Verified','INFO');
										}
										else {
											utils.log('The pending user is not moved to Register user, Verified','ERROR');
										}
									}else{
										utils.log('changer user group form not found','ERROR');
									}
								});
							}else{
								utils.log('Change user group permission not found','ERROR');
							}
						});
						casper.then(function() {
							casper.click('a[data-tooltip-elm="ddAccount"]');
							forumLoginMethod.backEndLogout(function(err) {
								if(!err) {
									utils.log(' User successfully logged out from backend','INFO');
								}
							});
						});
					} else {
						utils.log('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				utils.log('Error ', 'ERROR');
			}
		});
	});
	casper.then(function() { // method called to delete the user which is approved above
		postEventMemberApprovalMethod.deleteMember(function (err) {
			if(!err) {
				utils.log('Inside the deleteUser method','INFO');
			}
		});
	});
};

// method to move a pending post from- Approval queue Checkbox by a moderator
postEventMemberApprovalTestcases.movePostByModeratorApprovalQueueCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 13 [ Move a pending post from- Approval queue Checkbox by a moderrator ]', 'INFO');
		backEndregisterMethod.goToCategoryPage();
	}).then(function() {
		var category = postEventMemberApprovalJSON.otherCategory;
		backEndregisterMethod.getIdOfCategory(category, function(err,categoryId) {
			category_Id = categoryId;
			if(!err) {
				utils.info('id got = '+category_Id);
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
	}).then(function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		postEventMemberApprovalMethod.getPostId(function(err, postId) {
			if(!err) {
				casper.waitForSelector('div.post-edit.pull-right.dropdown input.entry-checkbox', function() {
          casper.click('input[value="'+postId+'"]');
					casper.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
					casper.test.assertExists('a#move i', 'move tick on the floating menu******************');
					casper.click('a#move i');
				}).waitForSelector('div#movePostsDialog_body', function() {
					casper.sendKeys('input[name="thread_title"]', 'Move title', {reset:true});
					casper.fillSelectors('form[name="movePost"]', {
						'select[name="forum"]': category_Id
					}, false);
				}).then(function(){
					casper.test.assertExists('a#moveSelectedPosts','Move Posts button Found');
					casper.click('a#moveSelectedPosts');
				}).wait('4000', function() {

				});
			}
		});
	}).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to move a pending post -By clicking on topic Checkbox by a moderator
postEventMemberApprovalTestcases.movePostByModeratorPostListingCheckbox = function() {
  casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 14 [ Move a pending post -By clicking on topic Checkbox by a moderator ]');
		backEndregisterMethod.goToCategoryPage();
	}).then(function() {
		var category = postEventMemberApprovalJSON.otherCategory;
		backEndregisterMethod.getIdOfCategory(category, function(err,categoryId) {
			category_Id = categoryId;
			if(!err) {
				utils.info('id got = '+category_Id);
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
	}).then(function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		postEventMemberApprovalMethod.getPostId(function(err, postId) {
			if(!err) {
				casper.waitForSelector('form#approveMembers span.post-body-author a', function() {
					casper.test.assertExists('form#approveMembers span.post-body-author a', ' topic button found');
					casper.click('form#approveMembers span.post-body-author a');
				}).waitForText('This post is awaiting approval by a moderator.', function() {
          casper.click('input[id="'+postId+'"]');
					casper.test.assertExists('div#posts-menu', 'floating menu is appear on bottom of the page');
					casper.test.assertExists('input#moveposts', 'move tick on the floating menu');
					casper.click('input#moveposts');
				}).waitUntilVisible('form#move_posts_form', function() {
					casper.sendKeys('input[name="thread_title"]', 'Move title', {reset:true});
					casper.fillSelectors('form[name="movePost"]', {
						'select[name="forum"]': category_Id
					}, false);
				}).then(function() {
					casper.test.assertExists('button#move_posts','Move Posts button Found');
					casper.click('button#move_posts');
				}).wait('4000', function() {
				});
			}
		});
	}).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to move a pending post from- Approval queue all Checkbox by a moderator
postEventMemberApprovalTestcases.movePostByModeratorApprovalQueueAllCheckbox = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 15 [ Move a pending post from- Approval queue all Checkbox by a moderator ]');
		backEndregisterMethod.goToCategoryPage();
	}).then(function() {
		var category = postEventMemberApprovalJSON.otherCategory;
		backEndregisterMethod.getIdOfCategory(category, function(err,categoryId) {
			category_Id = categoryId;
			if(!err) {
				utils.info('id got = '+category_Id);
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
	}).then(function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		postEventMemberApprovalMethod.getPostId(function(err, postId) {
			if(!err) {
				casper.waitForSelector('input#select_all_pending_posts', function() {
          casper.click('input#select_all_pending_posts');
					casper.test.assertExists('div#pending-menu', 'floating menu is appear on bottom of the page');
					casper.test.assertExists('a#move i', 'move tick on the floating menu');
					casper.click('a#move i');
				}).waitUntilVisible('form#move_posts_form', function() {
					casper.sendKeys('input[name="thread_title"]', 'Move title', {reset:true});
					casper.fillSelectors('form[name="movePost"]', {
						'select[name="forum"]': category_Id
					}, false);
				}).then(function() {
					casper.test.assertExists('a#moveSelectedPosts','Move Posts button Found');
					casper.click('a#moveSelectedPosts');
				}).wait('2000', function() {
				}).then(function() {
					casper.test.assertDoesntExist('div#post_message_'+postId, ' post is not  visible on the approval queue page');
				});
			}
		});
	}).then(function() {
    forumLoginMethod.logoutFromApp();
  });
};

// method to move a pending post -By clicking on topic all Checkbox by a moderator
postEventMemberApprovalTestcases.movePostByModeratorPostListingAllCheckbox = function() {
  casper.thenOpen(config.backEndUrl, function() {
		utils.info('Case 16 [ Move a pending post -By clicking on topic all Checkbox by a moderator ]');
		backEndregisterMethod.goToCategoryPage();
	}).then(function() {
		var category = postEventMemberApprovalJSON.otherCategory;
		backEndregisterMethod.getIdOfCategory(category, function(err,categoryId) {
			category_Id = categoryId;
			if(!err) {
				utils.info('id got = '+category_Id);
			}
		});
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.registeredUserLogin.username, postEventMemberApprovalJSON.registeredUserLogin.password);
	}).then(function() {
		postEventMemberApprovalMethod.composePost();
	}).then(function() {
		postEventMemberApprovalMethod.getPostId(function(err, postId) {
			if(!err) {
				casper.waitForSelector('form#approveMembers span.post-body-author a', function() {
					casper.test.assertExists('form#approveMembers span.post-body-author a', ' topic button found');
					casper.click('form#approveMembers span.post-body-author a');
				}).waitForText('This post is awaiting approval by a moderator.', function() {
          casper.click('input[id="'+postId+'"]');
					casper.test.assertExists('div#posts-menu', ' floating menu is appear on bottom of the page');
					casper.test.assertExists('input#moveposts', ' move tick on the floating menu');
					casper.click('input#moveposts');
				}).waitUntilVisible('form#move_posts_form', function() {
					casper.sendKeys('input[name="thread_title"]', 'Move title', {reset:true});
					casper.fillSelectors('form[name="movePost"]', {
						'select[name="forum"]': category_Id
					}, false);
				}).then(function(){
					casper.test.assertExists('button#move_posts','Move Posts button Found');
					casper.click('button#move_posts');
				}).wait('5000', function() {
					casper.test.assertDoesntExist('div.post-edit.pull-right.dropdown a.alert.alert-success.pull-left' , ' All Approved and  delete options are disappear');
				});
			}
		});
	}).then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
    this.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
      this.test.assertSelectorHasText('#ddSettings', 'Security');
      this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
      backEndregisterMethod.setApproveNewPost('99');
    });
	}).then(function() {
		backEndregisterMethod.removeModerator();
	});
};
