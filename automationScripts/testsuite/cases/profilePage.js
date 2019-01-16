'use strict.';
var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
var topicJSON = require('../../testdata/topic.json');
var composeTopicJSON=require('../../testdata/composeTopic.json');
var memberDeleteJSON=require('../../testdata/memberdelete.json');
var topicMethod = require('../methods/topic.js');
var deletePostMethod = require('../methods/deletePost.js');
var thumpsUpDownMethod = require('../methods/thumpsUpDown.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var privateMessageMethod = require('../methods/privateMessage.js');
var forumLoginMethod = require('../methods/login.js');
var profilePageMethod= require('../methods/profilePage.js');
var registerMethod=require('../methods/register.js');
var profilePageTests = module.exports = {};
var registerUser='';

//add delete method
profilePageTests.deleteTopics=function() {
	casper.thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('div.panel-heading span input', function(){

		if (this.exists('div.panel-heading span input')) {
    			this.test.assertExists('div.panel-heading span input');
			this.evaluate(function() {
				document.querySelector('input[name="allbox"]').click();
			});
			this.test.assertExists('a#delete');
			this.click('a#delete');
			this.then(function(){
				forumLoginMethod.logoutFromApp();
			});
		}
	}, function(){
		utils.info('topics not found');
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with sending message by message button.
profilePageTests.profilePageMessageButton=function(){
	var pmessage = "";
	casper.then(function(){
		utils.info('Case 1 [Verify with sending message by message button.]');
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function(){
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			this.test.assertSelectorHasText('#ddSettings', 'General');
			this.click('a[href="/tool/members/mb/settings?tab=General"]');
		}).waitForSelector('button.button.btn-m.btn-blue', function(){
			backEndForumRegisterMethod.enableDisableMessages(true);
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
			this.waitForSelector('ul.nav.pull-right span.caret', function(){
				this.click('ul.nav.pull-right span.caret');
				this.evaluate(function() {
					document.querySelector('a#user-nav-panel-profile').click();
				});
			}).waitForSelector('a#send_message', function(){
				this.test.assertExists('a#send_message','message button found on profilePage');
				this.evaluate(function() {
					document.querySelector('a#send_message').click();
				});
			}).waitForSelector('h4#pmsg_dialog_heading', function(){
				pmessage = utils.randomString();
				var senderMsgInfo = {
					"to" : ["sangita"],
					"subject" : "One-to-one message",
					"pmessage" : pmessage
				};
				privateMessageMethod.newMessage(senderMsgInfo);
			});
		});
	});
};

//Verify with sending message by message button when message permission is disable from back end

profilePageTests.profilePageMessageButtonDisable=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 2[Verify with sending message by message button when message permission is disable from back end]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('a[href="/tool/members/mb/settings?tab=General"]');
	}).waitForSelector('button.button.btn-m.btn-blue', function(){
		backEndForumRegisterMethod.enableDisableMessages(false);
	}).thenOpen(config.url, function(){
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('a#PostsOFUser', function(){
			this.test.assertDoesntExist('a#send_message', 'message button not found on profilePage');
			forumLoginMethod.logoutFromApp();
		});
	});
};

//Verify all post tab before start a topic/or post.
profilePageTests.profilePageAllPostTab=function(){
	casper.thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
	}).waitForSelector('ul.nav.pull-right span.caret', function(){
		this.click('ul.nav.pull-right span.caret');
		this.evaluate(function() {
			document.querySelector('a#user-nav-panel-profile').click();
		});
	}).waitForSelector('a#PostsOFUser', function(){
		this.click('a#PostsOFUser');
	}).waitForSelector('div.alert.alert-info.text-center', function(){
		this.test.assertSelectorHasText('li:nth-child(1) span.profile-count', '0');
	});
};

//Verify with All post tab after start a topic/post
profilePageTests.profilePageAfterStartTopic=function(){
	//for another post 10 seconds wait
	casper.thenOpen(config.url, function(){
		this.waitForSelector('a[href="/post/printadd"]', function(){
			this.evaluate(function() {
				document.querySelector('a[href="/post/printadd"]').click();
			});
			topicMethod.createTopic(composeTopicJSON.ValidCredential);
		}).waitForText(composeTopicJSON.ValidCredential.content, function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
			this.test.assertSelectorHasText('a.pull-right.btn.btn-uppercase.btn-primary', 'Post a reply');
			//Verify with the visiblity of  reply button.
			//verify with the reply button on top of the page.
			this.test.assertVisible('a#sub_post_reply', 'reply pot button found on postListingPage');
		}).then(function(){
			this.evaluate(function() {
				document.querySelector('a#sub_post_reply').click();
			});
			this.waitForSelector('i.mce-ico.mce-i-image', function(){
				casper.withFrame('message_ifr', function(){
					casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
					casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
					casper.sendKeys('#tinymce', profilePageJSON.addPost.Post );
				});
			}).then(function(){
				//verify with the post button on bottom of the page after add some content in the text box
				//verify with the post button on bottom of the page with blank text box.
				this.test.assertExists('input[name="submitbutton"]', 'post button found after add content in the text box');
				this.test.assertExists('input[name="submitbutton"]');
				this.click('input[name="submitbutton"]');
			}).waitForText('post reply', function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('ul.nav.pull-right span.caret');
				this.evaluate(function() {
					document.querySelector('a#user-nav-panel-profile').click();
				});
			}).waitForSelector('a#PostsOFUser', function(){
				this.click('a#PostsOFUser');
			}).waitForText('post reply');
		});
	});
};

//Verify with All post tab after delete a topic/post
profilePageTests.profilePageDeletePost=function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 5[Verify with All post tab after delete a topic/post]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function(){
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('ComposeCategory');
	}).waitForSelector('a#forum-title', function(){
		this.waitForSelector('input[name="allbox"]', function(){
			this.evaluate(function(){
				document.querySelector('input[name="allbox"]').click();
			});
			this.test.assertExists('a#delete', 'delete icon found on topic listing page');
			this.click('a#delete');
		}).waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('a#PostsOFUser', function(){
			this.click('a#PostsOFUser');
		}).waitForSelector('div.alert.alert-info.text-center', function(){
			this.test.assertSelectorHasText('li:nth-child(1) span.profile-count', '0');
		});
	});
};

//Verify with Topic started tab
//verify with before start a topic.
profilePageTests.profilePageTopicTab=function() {
	casper.thenOpen(config.url, function(){
		utils.info('Case 7[Verify with Topic started tab before start a topic..]');
	}).then(function(){
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('a#Topics_Started', function(){
			this.click('a#Topics_Started');
		}).waitForSelector('div.alert.alert-info.text-center', function(){
			this.test.assertSelectorHasText('li:nth-child(1) span.profile-count', '0');
		});
	});
};

//Verify with topic started tab after start a topic.
profilePageTests.profilePageTopicTabCreateTopic=function() {
	casper.thenOpen(config.url, function(){
		utils.info('Case 8[Verify with topic started tab after start a topic.]');
		this.waitForSelector('a[href="/post/printadd"]', function(){
			this.evaluate(function() {
				document.querySelector('a[href="/post/printadd"]').click();
			});
		//10seconds wait is needed for another topic
		}).then(function(){
			topicMethod.createTopic(composeTopicJSON.ValidCredential);
		}).waitForText(composeTopicJSON.ValidCredential.content, function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('a#Topics_Started', function(){
			this.click('a#Topics_Started');
		}).waitForText(composeTopicJSON.ValidCredential.content);
	});
};

//verify with edit topic title
//Verify with All post tab after delete a topic/post
profilePageTests.profilePageTopicEditTopicTitle=function() {
	casper.thenOpen(config.url, function(){
		utils.info('Case 9[verify with edit topic title]');
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
			casper.click('form[name="posts"] a.topic-title');
		}).waitForSelector('small#editTopic', function(){
			this.click('small#editTopic');
			this.sendKeys('a#edit_subject span:nth-child(2) div form div div div input', 'hell');
		}).then(function(){
			this.click('i.glyphicon.glyphicon-ok');
		}).waitForSelector('div#loading_msg', function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('a#Topics_Started', function(){
			this.click('a#Topics_Started');
		}).waitForSelector('a#PostsOFUser', function(){
			var topicTitle=this.getHTML('div#feed-main div div div span.post-body-author a');
			this.test.assertNotEquals(topicTitle, profilePageJSON.editTopicTitle.oldTitle, 'both the title are not equals');
		}).then(function(){
			this.test.assertExists('input[name="id"]', 'delete dropdown open successfully');
			this.click('input[type="checkbox"]');
		}).then(function(){
			this.test.assertExists('a#delete', 'delete pop-up found');
			this.click('a#delete');
			this.wait(1000, function(){});
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//delete topics
profilePageTests.deleteTopic=function() {
	casper.thenOpen(config.url, function(){
		utils.info('************************Delete Users Topics*********************');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		if (this.exists('div.panel-heading span input')) {
    			this.test.assertExists('div.panel-heading span input');
			this.evaluate(function() {
				document.querySelector('input[name="allbox"]').click();
			});
			this.test.assertExists('a#delete');
			this.click('a#delete');
			this.wait(1000, function(){});
		}
	}).then(function(){
		this.test.assertTextDoesntExist('ONEpluse', 'page doesnt contain post reply post');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Likes tab
//Verify with like the post.
profilePageTests.profilePageLikesTab=function(){
	casper.thenOpen(config.backEndUrl , function(){
		utils.info('Case 11[Verify with like the post.]');
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'General');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
			backEndForumRegisterMethod.enableDisableLikesReputation(true);
		}).then(function(){
			profilePageMethod.addTopicPost();
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.username );
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('form[name="posts"] a.topic-title');
			this.waitForSelector('div#posts-list', function(){
				if(this.visible('i.glyphicon.glyphicon-like-alt')){
					this.click('i.glyphicon.glyphicon-like-alt');
					this.waitForSelector('a.text-muted.voted-yes', function(){
						utils.info(' Post liked by the user');
					});
				}else{
					utils.error(' like thump not visible');
				}
			});
		}).then(function(){
			var index=1;
			profilePageMethod.getLikeDislikePostIds('a[id^="post_vote_up_"]', index);
		}).wait(1000, function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('span.feed-filter.top.cleared a:nth-child(3)', function(){
			this.click('span.feed-filter.top.cleared a:nth-child(3)');
		}).then(function(){
			this.test.assertSelectorHasText('a[id^="total_vote_up_count_"]', '1');
			forumLoginMethod.logoutFromApp();
		//dislike the topic/post which already liked by the register user---------
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.username);
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('form[name="posts"] a.topic-title');
			this.waitForSelector('div#posts-list', function(){
				if (this.visible('i.glyphicon.glyphicon-dislike-alt')){
					this.click('i.glyphicon.glyphicon-dislike-alt');
					this.waitForSelector('a.dislike_post.text-muted.voted-no', function() {
						utils.info(' Post disliked by the user');
					});
				} else {
					utils.error(' Dislike thump not visible');
				}
			}).then(function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.evaluate(function() {
					document.querySelector('a#user-nav-panel-profile').click();
				});
			}).waitForSelector('span.feed-filter.top.cleared a:nth-child(3)', function(){
				this.click('span.feed-filter.top.cleared a:nth-child(3)');

			}).wait(1000, function(){});
				this.test.assertTextDoesntExist(profilePageJSON.editTopic.oldText, 'page doesnt contain hey there topic');
				forumLoginMethod.logoutFromApp();
			});
		});
	//});
};

//verify with delete the post that you liked
profilePageTests.profilePageDeleteLikePost=function(){
	var index=1;
	//login by admin user to delete the liked post--------
	casper.thenOpen(config.url, function(){
		utils.info('Case 12[Verify with delete the post that you liked.]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span#first_coloumn_2 div div div:nth-child(1) div a i', function(){
		this.click('span#first_coloumn_2 div div div:nth-child(1) div a i');
	}).then(function(){
		profilePageMethod.deletePost('a[id^="posttoggle_"]', index);
		this.then(function(){
			var posts= casper.evaluate(function(){
				var postId=document.querySelectorAll('a[id^="delete_post_request"]');
				var postHref=postId[0].getAttribute('href');
				return postHref;
			});
			utils.info("message :" +posts);
			this.evaluate(function(posts) {
				document.querySelector('a[href="'+posts+'"]').click();
			}, posts);
		}).then(function(){
			this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
			this.click('i.glyphicon.glyphicon-chevron-down');
		}).then(function(){
			this.click('a[id^="delete_first_post_"]');
			this.wait(1000, function(){});
		});
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.evaluate(function() {
			document.querySelector('a#user-nav-panel-profile').click();
		});
	}).waitForSelector('span.feed-filter.top.cleared a:nth-child(3)', function(){
		this.click('span.feed-filter.top.cleared a:nth-child(3)');
	}).then(function(){
		this.test.assertTextDoesntExist('post reply', 'page doesnt contain post reply post');
		forumLoginMethod.logoutFromApp();
	});
};

//Verify post count for newly register user
profilePageTests.profilePagePostCount=function() {
	var expectedPostCount="0";
	var actualcount;
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 13[Verify post count for newly register user.]');
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'Security');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
			backEndForumRegisterMethod.enableDisableApproveNewRegistrations(false);
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
		}).then(function(){
			this.waitForSelector('ul.nav.pull-right span.caret', function(){
				this.click('ul.nav.pull-right span.caret');
				this.evaluate(function() {
					document.querySelector('a#user-nav-panel-profile').click();
				});
			}).waitForSelector('a#PostsOFUser', function(){
				var actualPostCount=casper.fetchText('li:nth-child(1) span.profile-count');
				actualcount=actualPostCount.trim();
			}).then(function(){
				this.test.assertEquals(actualcount, expectedPostCount, 'both the outputs are equals');
				this.wait(1000, function(){});
			}).then(function(){
				forumLoginMethod.logoutFromApp();
			});
		});
	});
};

//Verify with add topic/post
profilePageTests.profilePagePostCountAddtopic=function() {
	var expectedPostCount="2";
	var actualcount="0";
	casper.thenOpen(config.url, function(){
		utils.info('Case 14[Verify post count with add topic/post]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.evaluate(function() {
			document.querySelector('a#user-nav-panel-profile').click();
		});
	}).waitForSelector('a#PostsOFUser', function(){
		var actualPostCount=casper.fetchText('li:nth-child(1) span.profile-count');
		actualcount=actualPostCount.trim();
	}).then(function(){
		this.test.assertEquals(actualcount, expectedPostCount, 'both the outputs are equals');
		this.wait(1000, function(){});
	});
};

//Verify with delete the post
profilePageTests.profilePagePostCountDeletePost=function(){
	var expectedPostCount="0";
	casper.thenOpen(config.url, function(){
		utils.info('Case 15[Verify post count with delete the post]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function(){
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('ComposeCategory');
	}).waitForSelector('a#forum-title', function(){
		this.waitForSelector('input[name="allbox"]', function(){
			this.evaluate(function(){
				document.querySelector('input[name="allbox"]').click();
			});
			this.test.assertExists('a#delete', 'delete icon found on topic listing page');
			this.click('a#delete');
		}).waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('a#PostsOFUser', function(){
			this.click('a#PostsOFUser');
		}).waitForSelector('div.alert.alert-info.text-center', function(){
			this.test.assertSelectorHasText('li:nth-child(1) span.profile-count', '0');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//verify with reputation link after disable the permissions
profilePageTests.profilePageReputationDisable=function(){
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 16[Verify with reputation link after disable the permissions]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndForumRegisterMethod.enableDisableLikesReputation(false);
	}).thenOpen(config.url, function(){
		registerMethod.registerMultipleUsers(1, function(users){
			registerUser = users;
		});
	}).then(function(){
		forumLoginMethod.loginToApp(registerUser, registerUser);
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('a#PostsOFUser', function(){
			this.test.assertDoesntExist('li.reputation span.profile-count a');
		});
	});
};

profilePageTests.profilePageReputationEnable=function(){
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 17[Verify with reputation link after enable the permissions]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndForumRegisterMethod.enableDisableLikesReputation(true);
	}).thenOpen(config.url, function(){
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('a#PostsOFUser', function(){
			this.test.assertExists('li.reputation span.profile-count a');
		});
	});
};

//verify with edit user icon
profilePageTests.profilePageEditUserIcon=function(){
	var oldUserName="";
	var newUsername="hell";
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 18[Verify with edit user icon.]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'change_username', true);
	}).thenOpen(config.url, function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.evaluate(function() {
			document.querySelector('a#user-nav-panel-profile').click();
		});
	}).waitForSelector('a#PostsOFUser', function(){
		this.click('a#anchor_tab_edit i');
	}).waitForSelector('a[aria-controls="Account Settings"]', function(){
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('div#usrName a:nth-child(2) small', function(){
		this.evaluate(function(){
			document.querySelector('div#usrName a:nth-child(2) small').click();
		});
		var oldUserName = casper.fetchText('a#change_user_name');
	}).then(function(){
		this.wait(1000, function(){
			if(oldUserName.length!==null) {
				for(var i =0; i<oldUserName.length;i++) {
					casper.sendKeys('form.form-inline.editableform div div div:nth-child(1) input', casper.page.event.key.Backspace, {keepFocus: true});
				}
			}
		}).wait(1000, function(){
			casper.sendKeys('form.form-inline.editableform div div div:nth-child(1) input', 'hell');
			this.wait(1000, function(){
				casper.click('div#usrName span div form div div.editable-buttons button');
			}).then(function(){
				this.test.assertNotEquals(oldUserName, oldUserName+newUsername, 'both the username is not equal');
			});
		});
	});
};


//Verify with delete icon delete register user
//admin user->delete other user account from settings page.
//create topic from this register user and delete it from admin user
profilePageTests.profilePageDeleteUser= function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 19[Verify with delete icon delete register user]');
		utils.info('Case 19[MemberDelete -> Verify with create topic from this register user and delete it from admin user]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
		casper.evaluate(function(){
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		var userHref = casper.evaluate(function() {
			var userId = document.querySelectorAll('div.panel-body.table-responsive ul li:nth-child(1) span.col-md-9 span.image-wrapper a');
			return userId[0].getAttribute('href');
		});
		this.click('a[href="'+userHref+'"]');
	}).waitForSelector('a#PostsOFUser', function(){
		this.click('a#anchor_tab_edit i');
	}).waitForSelector('a[aria-controls="Account Settings"]', function(){
		//clicked on account settings icon on settings page
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('a#deleteAccountDialog', function(){
		this.click('a#deleteAccountDialog');
	}).waitForSelector('a#deleteAccount', function(){
		this.test.assertExists('a#deleteAccount');
		this.click('a#deleteAccount');
	}).waitForText('Top 25 Posters', function(){
		forumLoginMethod.logoutFromApp();
	}).then(function(){
		//verified register user which deleted by admin from settings page
		this.thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(registerUser, registerUser);
		}).waitForText(memberDeleteJSON.checkedUser.expectedErrorMsg);
	});
};

//Verify after like the post(one user like your only one post)for newly register user.
profilePageTests.profilePageReputationCount=function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 20[Verify with delete icon delete register user check reputation count]');
		profilePageMethod.newaddTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	//like single post from 3 different users
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		thumpsUpDownMethod.clickOnLike();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.ValidCredential.username, loginJSON.ValidCredential.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		thumpsUpDownMethod.clickOnLike();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).then(function(){
		thumpsUpDownMethod.clickOnLike();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(profilePageMethod.newUserData, profilePageMethod.newUserData);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('a#user-nav-panel-profile');
		this.evaluate(function() {
			document.querySelector('a#user-nav-panel-profile').click();
		});
	}).waitForSelector('li.reputation span.profile-count a', function(){
		this.test.assertExists('li.reputation span.profile-count a');
		var reputationCount = this.fetchText('li.reputation span.profile-count a');
		var reputationCounts=parseInt(reputationCount);
		if(reputationCounts===3){
			utils.info('The post is liked and verified that reputation count is +3');
		}
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify after like the post(one user like your multiple post one post)
profilePageTests.profilePageReputationCountMultiplePostLike=function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 21[Verify after like the post(one user like your multiple post one post)]');
		profilePageMethod.newaddTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(profilePageMethod.newUserData, profilePageMethod.newUserData);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.test.assertSelectorHasText('a.pull-right.btn.btn-uppercase.btn-primary', 'Post a reply');
		this.evaluate(function(){
			document.querySelector('a#sub_post_reply').click();
		});
		this.waitForSelector('i.mce-ico.mce-i-image', function(){
			casper.withFrame('message_ifr', function(){
				casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
				casper.sendKeys('#tinymce', 'hello' );
			});
		}).then(function(){
			this.test.assertExists('input[name="submitbutton"]');
			this.click('input[name="submitbutton"]');
		}).waitForText('hello', function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			thumpsUpDownMethod.clickOnLike();
		}).wait(1000, function(){
			var index=1;
			profilePageMethod.getLikeDislikePostIds('a[id^="post_vote_up_"]', index);
		}).wait(1000, function(){
			var index=2;
			profilePageMethod.getLikeDislikePostIds('a[id^="post_vote_up_"]', index);
		}).wait(1000, function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(profilePageMethod.newUserData, profilePageMethod.newUserData);
		}).waitForSelector('ul.nav.pull-right span.caret', function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
			this.test.assertExists('a#user-nav-panel-profile');
			this.evaluate(function() {
				document.querySelector('a#user-nav-panel-profile').click();
			});
		}).waitForSelector('li.reputation span.profile-count a', function(){
			this.test.assertExists('li.reputation span.profile-count a');
			var reputationCount = this.fetchText('li.reputation span.profile-count a');
			var reputationCounts=parseInt(reputationCount);
			if(reputationCounts===3){
				utils.info('The post is liked and verified that reputation count is +3');
			}
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};
