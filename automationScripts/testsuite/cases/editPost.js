'use strict.';
var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var editPostJSON=require('../../testdata/editPostData.json');
var profilePageMethod= require('../methods/profilePage.js');
var editPostMethod=require('../methods/editPost.js');
var topicMethod = require('../methods/topic.js');
var topicJSON = require('../../testdata/topic.json');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var forumLoginMethod = require('../methods/login.js');
var editPostTests = module.exports = {};


//Verify with edit topic from admin user
editPostTests.editTopicAdmin=function(){


	casper.thenOpen(config.url, function(){
		utils.info('case 1[Verify with edit topic from admin user]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('form[name="posts"] a.topic-title', 'topic is present');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span#editable_subjuct', function(){
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
		this.click('i.glyphicon.glyphicon-chevron-down');
		casper.click('a[id^="edit_post_request"]');
	}).waitForSelector('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message1_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', editPostJSON.editTopic.data );
		});
	}).wait(5000, function(){
		this.click('input[name="save"]');
	}).waitForText(editPostJSON.editTopic.expectedTopic, function(){
		var Topic=this.getHTML('span[id^="post_message_"]');
		var actualTopic=Topic.trim();
		this.test.assertEquals(actualTopic, editPostJSON.editTopic.expectedTopic,'topic edited successfully');
	});
};

//Verify with edit post(Post listing  page)
editPostTests.editPostAdmin=function(){

	casper.thenOpen(config.url, function(){
		utils.info('case 2[Verify with edit post from admin user]');
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
			this.test.assertExists('form[name="posts"] a.topic-title', 'topic is present');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editable_subjuct', function(){
			this.evaluate(function() {
				document.querySelector('span#first_coloumn_2 div div div:nth-child(1) div a i').click();
			});
			var index=1;
			editPostMethod.editPostGetHref('a#edit_post_request', index);
		}).waitForSelector('#message1_ifr',function() {
			var earlierText = casper.fetchText('span[id^="post_message_"]');
			var successMsg = earlierText.substring(0, earlierText.indexOf('v'));
			var trimmedMsg = successMsg.trim();
			utils.info('The text before editing ='+trimmedMsg);
			this.test.assertExists('#message1_ifr', 'message1-ifr found So the post is editable');
			this.withFrame('message1_ifr', function() {
	 			this.sendKeys('body#tinymce', "Hello");
			});
			this.then(function() {
				this.click('div.form-group.cleared input[name="save"]');
				this.wait('5000',function () {
					var laterText = this.fetchText('span[id^="post_message_"]');
					utils.info('The text before editing ='+laterText);
					if(trimmedMsg != laterText){
						utils.info('post edited');
					} else {
						utils.error('post not edited');
					}
				});
			});
		});
	});
};


//Verify with edit post on profile page
editPostTests.editPostProfilePageAdmin=function(){

	casper.thenOpen(config.url, function(){
		utils.info('case 3[Verify with edit post on profile page admin user]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('form[name="posts"] a.topic-title', 'topic is present');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.test.assertSelectorHasText('a.pull-right.btn.btn-uppercase.btn-primary', 'Reply');
		this.evaluate(function() {
			document.querySelector('a#sub_post_reply').click();
		});
		this.waitForSelector('i.mce-ico.mce-i-image', function(){
			casper.withFrame('message_ifr', function(){
				casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
				casper.sendKeys('#tinymce', 'myPost');
			});
		}).wait(5000, function(){
			this.test.assertExists('input[name="submitbutton"]');
			this.click('input[name="submitbutton"]');
		}).waitForText(editPostJSON.editedPost.newPost, function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
		}).then(function(){
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#PostsOFUser', function(){
			this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
			this.click('i.glyphicon.glyphicon-chevron-down');
			var index=0;
			editPostMethod.editPostGetHref('a#search_edit_post', index);
		}).waitForSelector('i.mce-ico.mce-i-image', function(){
			casper.withFrame('message1_ifr', function(){
				casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
				casper.sendKeys('#tinymce', 'newPost');
			});
		}).wait(5000, function(){
			this.click('input[type="button"]');
		}).waitForText(editPostJSON.editPost.expectedPostProfilePage, function(){
			var post=this.fetchText('div[id^="post_message_"]');
			var actualPost=post.trim();
			this.test.assertEquals(actualPost, editPostJSON.editPost.expectedPostProfilePage,'post edited on profilepage successfully');
		}).then(function(){
			this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
			this.click('i.glyphicon.glyphicon-chevron-down');
			this.click('div#feed-main div:nth-child(2) ul li:nth-child(3) a');
		}).then(function(){
			this.test.assertDoesntExist('i.glyphicon.glyphicon-chevron-down', 'post not present on profilePage');
		});
	});
};

//edit on search listing page by people who posted
editPostTests.editPostPeoplePosted=function(){

	casper.thenOpen( config.url , function(){
		utils.info('case 4[Verify edit on search listing page by people who posted]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		casper.click('span[data-original-title="Posts"]');
	}).waitForSelector('span.badge', function(){
		this.click('span.badge');
	}).waitForSelector('div.post-body.pull-left span:nth-child(2) a', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		var index=0;
		editPostMethod.editPostGetHref('a#search_edit_post', index);
	}).waitForSelector('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message1_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', 'new');
		});
	}).wait(5000, function(){
		this.click('input[type="button"]');
	}).waitForText(editPostJSON.SearchPage.expectedPost, function(){
		var post=this.fetchText('div[id^="post_message_"] span');
		var actualPost=post.trim();
		var newPost=actualPost.split('T');
		var firstPost=newPost[0];
		this.test.assertEquals(firstPost, editPostJSON.SearchPage.expectedPost,'post edited on searchpage successfully');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};


//Verify with edit own  topic(Post listing  page)
editPostTests.editTopicregister=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 5[Verify with edit own  topic(topic listing  page) edit post is disable]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'edit_posts', true);
	}).thenOpen(config.url , function(){
		forumLoginMethod.loginToApp(profilePageMethod.newUserData, profilePageMethod.newUserData);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span#editable_subjuct', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.click('a[id^="edit_post_request"]');
	}).waitForSelector('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message1_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', 'new' );
		});
	}).wait(5000, function(){
		this.click('input[type="button"]');
	}).waitForText(editPostJSON.editPost.expectedTopicRegisterUser, function(){
		var Topic=this.fetchText('span[id^="post_message_"]');
		var actualTopic=Topic.trim();
		var newPost=actualTopic.split('newpost');
		var firstPost=newPost[0];
		var post=firstPost.trim();
		this.test.assertEquals(post, editPostJSON.editPost.expectedTopicRegisterUser,'topic edited successfully');
	});
};

//Verify with edit own  post(Post listing  page)--register user
editPostTests.editPostregister=function(){

	casper.thenOpen(config.url, function(){
		utils.info('case 6[Verify with edit post from register user]');
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
			this.test.assertExists('form[name="posts"] a.topic-title', 'topic is present');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editable_subjuct', function(){
			casper.click('span#first_coloumn_2 div div div:nth-child(1) div a i');
			var index=1;
			editPostMethod.editPostGetHref('a#edit_post_request', index);
			}).waitForSelector('#message1_ifr',function() {
			var earlierText = casper.fetchText('span[id^="post_message_"]');
			var successMsg = earlierText.substring(0, earlierText.indexOf('v'));
			var trimmedMsg = successMsg.trim();
			utils.info('The text before editing ='+trimmedMsg);
			this.test.assertExists('#message1_ifr', 'message1-ifr found So the post is editable');
			this.withFrame('message1_ifr', function() {
	 			this.sendKeys('body#tinymce', ".");
			});
			this.then(function() {
				this.click('div.form-group.cleared input[name="save"]');
				this.wait('5000',function () {
					var laterText = this.fetchText('span[id^="post_message_"]');
					utils.info('The text before editing ='+laterText);
					if(trimmedMsg != laterText){
						utils.info('post edited');
					} else {
						utils.error('post not edited');
					}
				});
			});
		});
	});
};

//Verify with edit own  post on profile page
editPostTests.editPostProfilePageRegister=function(){

	casper.thenOpen(config.url, function(){
		utils.info('case 7[Verify with edit post from admin user]');
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
		this.click('i.glyphicon.glyphicon-chevron-down');
		var index=0;
		editPostMethod.editPostGetHref('a#search_edit_post', index);
	}).waitForSelector('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message1_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', 'hell');
		});
	}).wait(5000, function(){
		this.click('input[type="button"]');
	}).waitForText(editPostJSON.editPost.expectedPostprofileRegister, function(){
		var post=this.fetchText('div[id^="post_message_"]');
		var actualPost=post.trim();
		var newPost=actualPost.split('.');
		var firstPost=newPost[0];
		var posts=firstPost.trim();
		this.test.assertEquals(posts, editPostJSON.editPost.expectedPostprofileRegister,'post edited successfully');
	});
};

//Verify with edit on search listing page by people who posted
editPostTests.editSearchPeoplePostedRegister=function(){

	casper.thenOpen( config.url , function(){
		utils.info('case 8[Verify with edit on search listing page by people who posted]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		casper.click('span[data-original-title="Posts"]');
	}).waitForSelector('span.badge', function(){
		this.click('span.badge');
	}).waitForSelector('div.post-body.pull-left span:nth-child(2) a', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		var index=0;
		editPostMethod.editPostGetHref('a#search_edit_post', index);
	}).waitForSelector('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message1_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', 'post');
		});
	}).wait(5000, function(){
		this.click('input[type="button"]');
	}).waitForText(editPostJSON.editPost.expectedsearchDataRegister, function(){
		var post=this.fetchText('div[id^="post_message_"]');
		var actualPost=post.trim();
		var newPost=actualPost.split('.');
		var firstPost=newPost[0];
		var posts=firstPost.trim();
		this.test.assertEquals(posts, editPostJSON.editPost.expectedsearchDataRegister,'post edited on searchpage successfully');
	});
};

//Verify with edit own  topic(topic listing  page) edit topic is disable
editPostTests.editPostEditOwnTopicDisable=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 9[Verify with edit own  topic(topic listing  page) edit post is disable]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'edit_posts', false);
	}).thenOpen(config.url, function(){
		this.test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a#edit_post_request', 'edit button not found');
	});
};

//Verify with edit own  post(Post listing  page)
editPostTests.EditOwnPostDisable=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 10[Verify with edit own  post(Post listing  page) edit post is disable]');
		this.test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span#first_coloumn_2 div div div:nth-child(1) div a i', function(){
		casper.click('span#first_coloumn_2 div div div:nth-child(1) div a i');
		this.test.assertDoesntExist('a#edit_post_request', 'edit button not found');
	});
};

//Verify with edit own  post on profile page
editPostTests.editProfilePagePostDisable=function(){

	casper.thenOpen(config.url, function(){
		utils.info('case 11[Verify with edit own  post on profile page]');
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a#search_edit_post', 'edit button not found');
	});
};

//Verify with edit on search listing page by people who posted- edit own post disable
editPostTests.editSearchPeoplePostedEditPostDisable=function(){

	casper.thenOpen( config.url , function(){
		utils.info('case 12[Verify with edit on search listing page by people who posted]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		casper.click('span[data-original-title="Posts"]');
	}).waitForSelector('span.badge', function(){
		this.click('span.badge');
	}).waitForSelector('div.post-body.pull-left span:nth-child(2) a', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a#search_edit_post', 'edit button not found on search page');
	});
};

//Verify edit topic by searching topic
editPostTests.editTopicSearchAdmin=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 13[Verify edit topic by searching topic register user]');
		utils.info('Case 14[Verify with delete post by search register user]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('input#inline_search_box');
		this.fill('form#inlineSearchForm',{
			'keywords' :'ONEpluse'
		},true);
	}).waitForSelector('a#anchor_tab_show_posts', function(){
		this.click('a#anchor_tab_show_posts');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a#search_edit_post','topic deleted from search page');
		this.test.assertExists('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
		this.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
		this.test.assertDoesntExist('a#search_edit_post','topic deleted from search page');
	});
};
