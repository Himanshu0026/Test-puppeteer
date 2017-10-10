'use strict.';
var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
var thumpsUpDownJSON = require('../../testdata/thumpsUpDown.json');
var topicMethod = require('../methods/topic.js');
var topicJSON = require('../../testdata/topic.json');
var thumpsUpDownMethod = require('../methods/thumpsUpDown.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var privateMessageMethod = require('../methods/privateMessage.js');
var forumLoginMethod = require('../methods/login.js');
var profilePageMethod= require('../methods/profilePage.js');
var registerMethod=require('../methods/register.js');
var profilePageTests = module.exports = {};
var registerUser='';


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
				this.click('a#user-nav-panel-profile');
			}).waitForSelector('a#send_message', function(){
				this.test.assertExists('a#send_message','message button found on profilePage');
				this.click('a#send_message');
			}).wait(5000,function(){
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
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#PostsOFUser', function(){
			this.test.assertDoesntExist('a#send_message', 'message button not found on profilePage');
			forumLoginMethod.logoutFromApp();
		});
	});
};

//Verify all post tab before start a topic/or post.
profilePageTests.profilePageAllPostTab=function(){

	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 3[Verify all post tab before start a topic/or post.]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(false);
	}).then(function() {
		backEndForumRegisterMethod.enableDisableApproveNewRegistrations(false);
	}).then(function() {
		backEndForumRegisterMethod.enableDisableHumanVerification(false);
	}).thenOpen(config.url, function(){
		registerMethod.registerMultipleUsers(1, function(users){
			registerUser = users;
		});
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(registerUser, registerUser);
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#PostsOFUser', function(){
			this.click('a#PostsOFUser');
		}).waitForText(registerUser+" "+ profilePageJSON.checkValidation.postTab);
	});
};

//Verify with All post tab after start a topic/post
profilePageTests.profilePageAfterStartTopic=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 4[Verify with All post tab after start a topic/post.]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'post_threads', true);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'other_post_replies', true);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'post_replies', true);
	}).then(function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function(){
			this.test.assertSelectorHasText('#ddSettings', 'Security');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
			backEndForumRegisterMethod.setApproveNewPost('0');
		});
	}).then(function(){
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('#addForumButton', function(){
		backEndForumRegisterMethod.isCategoryExists(thumpsUpDownJSON.category, function(err, isExists) {
			if(isExists) {
				utils.info(' Category already existed');
			} else {
				utils.info(' Category not exist');
				casper.then(function() {
					backEndForumRegisterMethod.createCategory(thumpsUpDownJSON.category);
				});
			}
		});
	//for another post 10 seconds wait
	}).thenOpen(config.url, function(){
		this.waitForSelector('a[href="/post/printadd"]', function(){
			this.click('a[href="/post/printadd"]');
			topicMethod.createTopic(topicJSON.ValidCredential);
		}).waitForText(topicJSON.ValidCredential.content, function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(registerUser, registerUser);
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
			this.test.assertSelectorHasText('a.pull-right.btn.btn-uppercase.btn-primary', 'Post a reply');
			this.click('a.pull-right.btn.btn-uppercase.btn-primary');
			this.waitForSelector('i.mce-ico.mce-i-image', function(){
				casper.withFrame('message_ifr', function(){
					casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
					casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
					casper.sendKeys('#tinymce', profilePageJSON.addPost.Post );
				});

			}).wait(10000, function(){
				this.test.assertExists('input[name="submitbutton"]');
				this.click('input[name="submitbutton"]');
			}).waitForText('post reply', function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('ul.nav.pull-right span.caret');
				this.click('a#user-nav-panel-profile');
			}).waitForSelector('a#PostsOFUser', function(){
				this.click('a#PostsOFUser');
			}).waitForText('post reply');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//Verify with All post tab after edit a topic/post on topic listing page
profilePageTests.profilePageEditTopic=function(){
	var index=0;
	var count=1;
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 6[Verify with All post tab after edit a topic/post on topic listing page]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'edit_posts', true);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(registerUser, registerUser);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:nth-child(3) a');
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message1_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', profilePageJSON.editTopic.newTopic );
		});
	//uses then instead of wait
	}).wait(5000, function(){
		this.click('input[type="button"]');
	}).waitForText(profilePageJSON.editTopic.newTopic+profilePageJSON.editTopic.oldText, function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(registerUser, registerUser);
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('form[name="posts"] a.topic-title');
			this.waitForSelector('span#first_coloumn_2 div div div:nth-child(1) div a i', function(){
				this.click('span#first_coloumn_2 div div div:nth-child(1) div a i');
				profilePageMethod.getPostHref('a#edit_post_request', count);
			}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
				casper.withFrame('message1_ifr', function(){
					casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
					casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
					casper.sendKeys('#tinymce', profilePageJSON.addPost.newPost );
				});

			}).wait(5000, function(){
				this.test.assertExists('input[name="save"]');
				this.click('input[name="save"]');
			}).waitForText('newPost', function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('ul.nav.pull-right span.caret');
				this.click('a#user-nav-panel-profile');
			}).waitForSelector('a#PostsOFUser', function(){
				this.click('a#PostsOFUser');
			}).waitForText('newPost');
		});
	});
};

//Verify with All post tab after delete a topic/post
profilePageTests.profilePageDeletePost=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 5[Verify with All post tab after delete a topic/post]');
		this.waitForSelector('input[name="allbox"]', function(){
			this.click('input[name="allbox"]');
			this.test.assertExists('a#delete', 'delete icon found on topic listing page');
			this.click('a#delete');
		}).waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#PostsOFUser', function(){
			this.click('a#PostsOFUser');
		}).waitForText(registerUser+" "+ profilePageJSON.checkValidation.postTab);
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with Topic started tab
//verify with before start a topic.
profilePageTests.profilePageTopicTab=function() {

	casper.thenOpen(config.url, function(){
		utils.info('Case 7[Verify with Topic started tab before start a topic..]');
		registerMethod.registerMultipleUsers(1, function(users){
			registerUser = users;
		});
	}).then(function(){
		forumLoginMethod.loginToApp(registerUser, registerUser);
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#Topics_Started', function(){
			this.click('a#Topics_Started');
		}).waitForSelector('div.alert.alert-info.text-center', function(){
			var Alert=this.getHTML('div.alert.alert-info.text-center');
			validalert=Alert.trim();
			this.test.assertEquals(validalert, registerUser+" "+profilePageJSON.checkValidation.topicStartedTab,'both the text are equal');
		});
	});
};

//Verify with topic started tab after start a topic.
profilePageTests.profilePageTopicTabCreateTopic=function() {

	casper.thenOpen(config.url, function(){
		utils.info('Case 8[Verify with topic started tab after start a topic.]');
		this.waitForSelector('a[href="/post/printadd"]', function(){
			this.click('a[href="/post/printadd"]');
			topicMethod.createTopic(topicJSON.ValidCredential);
		}).waitForText('my old topic', function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#Topics_Started', function(){
			this.click('a#Topics_Started');
		}).waitForText('my old topic');
	});
};

//verify with edit topic title
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
			this.wait(1000, function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('ul.nav.pull-right span.caret');
				this.click('a#user-nav-panel-profile');
			}).waitForSelector('a#Topics_Started', function(){
				this.click('a#Topics_Started');
			}).waitForSelector('a#PostsOFUser', function(){
				var topicTitle=this.getHTML('div#feed-main div div div span.post-body-author a');
				this.test.assertNotEquals(topicTitle, profilePageJSON.editTopicTitle.oldTitle, 'both the title are not equals');
			});
		});
	});
};

//verify with delete the topic
profilePageTests.profilePageDeleteTopic=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 10[Verify with All post tab after delete a topic/post]');
	}).waitForSelector('input[name="allbox"]', function(){
		this.click('input[name="allbox"]');
		this.test.assertExists('a#delete', 'delete icon found on topic listing page');
		this.click('a#delete');
	}).waitForSelector('ul.nav.pull-right span.caret', function(){
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#Topics_Started', function(){
		this.click('a#Topics_Started');
	}).waitForSelector('div.alert.alert-info.text-center', function(){
		var Alert=this.getHTML('div.alert.alert-info.text-center');
		validalert=Alert.trim();
		this.test.assertEquals(validalert, registerUser+" "+profilePageJSON.checkValidation.topicStartedTab,'both the text are equal');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).then(function(){
		profilePageMethod.deleteTopic();
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
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
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
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('span.feed-filter.top.cleared a:nth-child(3)', function(){
			this.click('span.feed-filter.top.cleared a:nth-child(3)');
		}).then(function(){
			this.test.assertSelectorHasText('a[id^="total_vote_up_count_"]', '1');
			forumLoginMethod.logoutFromApp();
		//dislike the topic/post which already liked by the register user---------
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
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
			}).wait(1000, function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('a#user-nav-panel-profile');
			}).waitForSelector('span.feed-filter.top.cleared a:nth-child(3)', function(){
				this.click('span.feed-filter.top.cleared a:nth-child(3)');
			}).then(function(){
				this.test.assertTextDoesntExist(profilePageJSON.editTopic.oldText, 'page doesnt contain hey there topic');
				forumLoginMethod.logoutFromApp();
			});
		});
	});
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
		profilePageMethod.deletePost('a[id^="posttoggle_"]', index);
		this.then(function(){
			var posts= casper.evaluate(function(){
				var postId=document.querySelectorAll('a[id^="delete_post_request"]');
				var postHref=postId[0].getAttribute('href');
				return postHref;
			});
			utils.info("message :" +posts);
			this.click('a[href="'+posts+'"]');
		});
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
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
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 13[Verify post count for newly register user.]');
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
			this.test.assertSelectorHasText('#ddSettings', 'Security');
			this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
			backEndForumRegisterMethod.enableDisableApproveNewRegistrations(false);
		}).thenOpen(config.url, function(){
			registerMethod.registerMultipleUsers(1, function(users){
				registerUser = users;
			});
		}).then(function(){
			forumLoginMethod.loginToApp(registerUser, registerUser);
			this.waitForSelector('ul.nav.pull-right span.caret', function(){
				this.click('ul.nav.pull-right span.caret');
				this.click('a#user-nav-panel-profile');
			}).waitForSelector('a#PostsOFUser', function(){
				var actualPostCount=casper.fetchText('div#upload_container div:nth-child(2) div ul li:nth-child(1) span:nth-child(2)');
				var actualcount=actualPostCount.trim();
				this.test.assertEquals(actualcount, expectedPostCount, 'both the outputs are equals');
			}).then(function(){
				forumLoginMethod.logoutFromApp();
			});
		});
	});
};

//Verify with add topic/post
profilePageTests.profilePagePostCountAddtopic=function() {

	var expectedPostCount="2";
	casper.thenOpen(config.url, function(){
		utils.info('Case 14[Verify post count with add topic/post]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		var actualPostCount=casper.fetchText('div#upload_container div:nth-child(2) div ul li:nth-child(1) span:nth-child(2)');
		var actualcount=actualPostCount.trim();
		this.test.assertEquals(actualcount, expectedPostCount, 'both the outputs are equals');
	});
};

//Verify with delete the post
profilePageTests.profilePagePostCountDeletePost=function(){

	var expectedPostCount="0";
	casper.thenOpen(config.url, function(){
		utils.info('Case 15[Verify post count with delete the post]');
	}).waitForSelector('input[name="allbox"]', function(){
		this.click('input[name="allbox"]');
		this.test.assertExists('a#delete', 'delete icon found on topic listing page');
		this.click('a#delete');
	}).waitForSelector('ul.nav.pull-right span.caret', function(){
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		var actualPostCount=casper.fetchText('div#upload_container div:nth-child(2) div ul li:nth-child(1) span:nth-child(2)');
		var actualcount=actualPostCount.trim();
		this.test.assertEquals(actualcount, expectedPostCount, 'both the outputs are equals');
		forumLoginMethod.logoutFromApp();
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
			this.click('a#user-nav-panel-profile');
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
			this.click('a#user-nav-panel-profile');
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
		this.click('a#user-nav-panel-profile');
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
		this.wait(2000, function(){
			if(oldUserName.length!==null) {
				for(var i =0; i<oldUserName.length;i++) {
					casper.sendKeys('form.form-inline.editableform div div div:nth-child(1) input', casper.page.event.key.Backspace, {keepFocus: true});
				}
			}
		}).wait(2000, function(){
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
profilePageTests.profilePageDeleteUser= function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 19[Verify with delete icon delete register user]');
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		this.click('a#deleteAccountDialog i');
	}).waitForSelector('div#userAccountName', function(){
		this.test.assertSelectorHasText('div#userAccountName h3', 'Are you sure you would like to permanently delete the account');
		this.click('a#deleteAccount');
	}).waitForText('Top Posters', function(){
		this.click('form#memberListFrm div.panel-heading li:nth-child(3) a');
	}).waitForText('Top Posters', function(){
		this.test.assertDoesntExist(registerUser);
	});
};

//Verify after like the post(one user like your only one post)
profilePageTests.profilePageReputationCount=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 20[Verify with delete icon delete register user check reputation count]');
		profilePageMethod.addTopicPost();
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
		this.click('a#user-nav-panel-profile');
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
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(profilePageMethod.newUserData, profilePageMethod.newUserData);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.test.assertSelectorHasText('a.pull-right.btn.btn-uppercase.btn-primary', 'Post a reply');
		this.click('a.pull-right.btn.btn-uppercase.btn-primary');
		this.waitForSelector('i.mce-ico.mce-i-image', function(){
			casper.withFrame('message_ifr', function(){
				casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
				casper.sendKeys('#tinymce', 'hello' );
			});
		}).wait(5000, function(){
			this.test.assertExists('input[name="submitbutton"]');
			this.click('input[name="submitbutton"]');
		}).waitForText('hello', function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			thumpsUpDownMethod.clickOnLike();
		}).wait(2000, function(){
			var index=1;
			profilePageMethod.getLikeDislikePostIds('a[id^="post_vote_up_"]', index);
		}).wait(2000, function(){
			var index=2;
			profilePageMethod.getLikeDislikePostIds('a[id^="post_vote_up_"]', index);
		}).wait(2000, function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(profilePageMethod.newUserData, profilePageMethod.newUserData);
		}).waitForSelector('ul.nav.pull-right span.caret', function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
			this.test.assertExists('a#user-nav-panel-profile');
			this.click('a#user-nav-panel-profile');
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
