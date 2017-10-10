//----- This js file covers all the upload functionality on forum Frontend---------//
var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var deletePostJSON = require('../../testdata/deletePostData.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
var profilePageMethod= require('../methods/profilePage.js');
var topicMethod = require('../methods/topic.js');
var topicJSON = require('../../testdata/topic.json');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var forumLoginMethod = require('../methods/login.js');
var profilePageMethod= require('../methods/profilePage.js');
var deletePostMethod = require('../methods/deletePost.js');
deletePostTests = module.exports = {};


//Verify by delete one topic -selecting by check box
deletePostTests.deleteTopicByCheckboxAdmin=function(){
	casper.then(function(){
		profilePageMethod.deleteTopic();
	}).thenOpen(config.backEndUrl, function(){
		utils.info('Case 1[Verify by delete one topic -selecting by check box from admin user]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'post_threads', true);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).then(function(){
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#logo_or_title','title present on forum');
		this.click('a#logo_or_title');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.test.assertExists('input[name="id"]', 'checkbox present on undercategory topics');
		this.click('input[name="id"]');
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	});
};

//Verify by delete all topic-selecting by check box
deletePostTests.deleteAllTopicCheckboxAdmin=function(){


	casper.thenOpen(config.url, function(){
		utils.info('Case 2[Verify by delete all topic-selecting by check box from admin user]');
		this.test.assertExists('a[href="/post/printadd"]', 'start new topic selector present on forum');
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#logo_or_title','title present on forum');
		this.click('a#logo_or_title');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.test.assertExists('input[name="allbox"]');
		this.click('input[name="allbox"]');
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	});
};


//Verify by delete multiple topic-selecting by check box
deletePostTests.deleteMultipleTopicCheckboxAdmin=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 3[Verify by delete multiple topic-selecting by check box from admin user]');
		this.test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).then(function(){
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#logo_or_title','title present on forum');
		this.click('a#logo_or_title');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.test.assertExists('input[name="id"]', 'checkbox present on undercategory topics');
		this.click('input[name="id"]');
		this.click('form[name="posts"] div div:nth-child(3) ul li:nth-child(2) span:nth-child(2) span:nth-child(1) input');
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	});
};

//Verify with delete topic-by drop down of the topic
deletePostTests.deleteTopicDropDownAdmin=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 4[Verify by delete multiple topic-selecting by check box from admin user]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#logo_or_title','title present on forum');
		this.click('a#logo_or_title');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.click('span.topic-content h4 a');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		casper.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:nth-child(3) a');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with delete post-selecting by check box
deletePostTests.deletePostDropDownAdminUser=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 5[Verify with delete post-selecting by drop-down from admin user]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.click('span.topic-content h4 a');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		var index=1;
		deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
	}).then(function(){
		var index=0;
		profilePageMethod.getPostHref('a[id^="delete_post_request"]', index);
	}).wait(2000, function(){
		//checked post is present on postlisting page
		this.thenOpen(config.url, function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editable_subjuct', function(){
			if(casper.visible('a#'+deletePostMethod.postId)){
		    		utils.error('post is present on postlisting page');
			}else{
				utils.info('post is not present on postlisting page');
			}
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//Verify with delete post-selecting by check box
deletePostTests.deletePostCheckboxAdmin=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 6[Verify with delete post-selecting by check box from admin user]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.click('span.topic-content h4 a');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		var index=1;
		deletePostMethod.deletePostCheckBoxId('input[name="pid"]', index);
	}).then(function(){
		this.click('input#deleteposts');
	}).wait(2000, function(){
		//checked post is present on postlisting page
		this.thenOpen(config.url, function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editable_subjuct', function(){
			this.test.assertDoesntExist('span#first_coloumn_2', 'post not found on podtlisting page');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//delete post from members profile page
deletePostTests.deletePostProfilePageAdmin=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 7[Verify with delete post from members profile page]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('a.pull-right.btn.btn-uppercase.btn-primary');
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', deletePostJSON.postData.data );
		});
	}).wait(5000, function(){
		this.click('input[id="reply_submit"]');
	}).waitForText(deletePostJSON.postData.data, function(){
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#PostsOFUser', function(){
			var index=0;
			this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
			this.evaluate(function(){
				document.querySelector('i.glyphicon.glyphicon-chevron-down').click();
			});
			profilePageMethod.getPostHref('a#search_delete_post', index);
		}).thenOpen(config.url, function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#PostsOFUser', function(){
			var index=1;
			this.test.assertDoesntExist('i.glyphicon.glyphicon-chevron-down');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//Verify by delete multiple post-selecting by check box
deletePostTests.deleteMultiplePostAdmin=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 8[Verify by delete multiple post-selecting by check box]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('input#firstpid');
	}).wait(2000, function(){
		var index=1;
		deletePostMethod.deletePostCheckBoxId('input[name="pid"]', index);
	}).wait(2000, function(){
		this.click('input#deleteposts');
	}).wait(5000, function(){
		this.test.assertDoesntExist('i.glyphicon.glyphicon-chevron-down');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).then(function(){
		profilePageMethod.deleteTopic();
	});
};

//Verify by delete one topic -selecting by check box
deletePostTests.deletePostRegisteruser=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 9[Verify by delete one topic -selecting by check box register user]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_threads', true);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_posts', true);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function(){
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#logo_or_title','title present on forum');
		this.click('a#logo_or_title');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.test.assertExists('input[name="id"]', 'checkbox present on undercategory topics');
		this.click('input[name="id"]');
	}).then(function(){
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify by delete all topic-selecting by check box
deletePostTests.deleteAllTopicCheckboxRegister=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 10[Verify by delete all topic-selecting by check box register user]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).wait(5000, function(){
		this.waitForSelector('a[href="/post/printadd"]', function(){
			this.click('a[href="/post/printadd"]');
			topicMethod.createTopic(topicJSON.ValidCredential);
		}).waitForText(topicJSON.ValidCredential.content, function(){
			this.test.assertExists('a#logo_or_title','title present on forum');
			this.click('a#logo_or_title');
		}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
			this.click('ul.nav.nav-tabs li:nth-child(2) a');
		}).waitForSelector('form#inlineSearchForm', function(){
			deletePostMethod.getCategoryHrefFrontend('General');
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			this.test.assertExists('input[name="allbox"]');
			this.click('input[name="allbox"]');
			this.click('a#delete');
		}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
			this.test.assertExists('span.alert.alert-info.text-block.text-center');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//Verify by delete multiple topic-selecting by check box
deletePostTests.deleteMultipleTopicCheckboxRegister=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 11[Verify by delete multiple topic-selecting by check box register user]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).wait(5000, function(){
		this.then(function(){
			this.test.assertExists('a[href="/post/printadd"]');
			this.click('a[href="/post/printadd"]');
			topicMethod.createTopic(topicJSON.ValidCredential);
		});
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#logo_or_title','title present on forum');
		this.click('a#logo_or_title');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('input[name="id"]', 'checkbox present on undercategory topics');
		this.click('input[name="id"]');
	}).then(function(){
		this.test.assertExists('form[name="posts"] div div:nth-child(3) ul li:nth-child(2) span:nth-child(2) span:nth-child(1) input');
		this.click('form[name="posts"] div div:nth-child(3) ul li:nth-child(2) span:nth-child(2) span:nth-child(1) input');
	}).then(function(){
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with delete topic-by drop down of the topic
deletePostTests.deleteTopicDropDownRegister=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 12[Verify with delete topic-by drop down of the topic register user]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function(){
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#logo_or_title','title present on forum');
		this.click('a#logo_or_title');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
	}).then(function(){
		this.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:nth-child(4) a');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with delete post-selecting by check box
deletePostTests.deletePostDropDownRegister=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 13[Verify with delete post-selecting by check box register user]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(profilePageMethod.newUserData, profilePageMethod.newUserData);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		var index=1;
		deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
	}).then(function(){
		var index=0;
		profilePageMethod.getPostHref('a[id^="delete_post_request"]', index);
	}).wait(2000, function(){
		//checked post is present on postlisting page
		this.thenOpen(config.url, function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editable_subjuct', function(){
			if (casper.visible('a#'+deletePostMethod.postId)) {
		    		utils.error('post is present on postlisting page');
			}else{
				utils.info('post is not present on postlisting page');
			}
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};


//Verify with delete post-selecting by check box
deletePostTests.deletePostCheckboxRegister=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 14[Verify with delete post-selecting by check box register user]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.click('span.topic-content h4 a');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		var index=1;
		deletePostMethod.deletePostCheckBoxId('input[name="pid"]', index);
	}).then(function(){
		this.click('input#deleteposts');
	}).wait(2000, function(){
		//checked post is present on postlisting page
		this.thenOpen(config.url, function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editable_subjuct', function(){
			this.test.assertDoesntExist('span#first_coloumn_2', 'post not found on podtlisting page');
		});
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};


//delete post from members profile page
deletePostTests.deletePostProfilePageRegister=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 15[delete post from members profile page register user]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('a.pull-right.btn.btn-uppercase.btn-primary');
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', deletePostJSON.postData.data );
		});
	}).wait(5000, function(){
		this.click('input[id="reply_submit"]');
	}).waitForText(deletePostJSON.postData.data, function(){
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
			this.click('ul.nav.pull-right span.caret');
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#PostsOFUser', function(){
			var index=0;
			this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
			this.evaluate(function(){
				document.querySelector('i.glyphicon.glyphicon-chevron-down').click();
			});
			profilePageMethod.getPostHref('a#search_delete_post', index);
		}).thenOpen(config.url, function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
			this.click('a#user-nav-panel-profile');
		}).waitForSelector('a#PostsOFUser', function(){
			var index=1;
			this.test.assertDoesntExist('i.glyphicon.glyphicon-chevron-down');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		}).then(function(){
			profilePageMethod.deleteTopic();
		});
	});
};

//view category-- //delete own topic- enable--//delete own post-disable"
deletePostTests.deleteOwnTopicEnablePostDisable=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 16[Verify by delete one topic -selecting by check box register user]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_threads', true);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_posts', false);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function(){
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#logo_or_title','title present on forum');
		this.click('a#logo_or_title');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('input[name="id"]');
		this.click('a#delete i');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with delete  own topic-by drop down of the topic
deletePostTests.deleteOwnTopicDropdownTopicPostDisable=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 17[Verify by delete one topic -selecting by check box register user]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#logo_or_title','title present on forum');
		this.click('a#logo_or_title');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a[id^="delete_first_post_"]');
	});
};

//Verify with delete own post-selecting by check box
deletePostTests.deleteOwnPostCheckboxTopicPostDisable=function(){

	casper.thenOpen(config.url , function(){
		utils.info('Case 18[Verify with delete own post-selecting by check box post disable topic enable]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.click('a.pull-right.btn.btn-uppercase.btn-primary');
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', deletePostJSON.postData.data );
		});
	}).wait(5000, function(){
		this.click('input[id="reply_submit"]');
	}).waitForText(deletePostJSON.postData.data, function(){
		this.test.assertDoesntExist('input#firstpid');
	});
};

//Verify with delete own post-by drop down of the post
deletePostTests.deleteRegisterUserOwnTopicenablePostdisable=function(){

	casper.thenOpen(config.url , function(){
		utils.info('Case 19[Verify with delete own post-by drop down of the post topic enable post disable]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.click('a.pull-right.btn.btn-uppercase.btn-primary');
	}).then(function(){
		var index=1;
		deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
	}).then(function(){
		this.test.assertDoesntExist('a[id^="delete_post_request"]');
	});
};

// Verify with delete  own post from own profile page
deletePostTests.deleteOwnProfilePageTopicenablePostDisable=function(){
	casper.thenOpen(config.url , function(){
		utils.info('Case 20[Verify with delete  own post from own profile page topic enable post disable]');
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a#search_delete_post span', 'delete button not present of post on profilePage');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};


//-------------------------------delete own topic-disable when the  permission---------------------------------------------------------------------------------
//-------------------------------delete own post-enable---------------------------------------------------------------------------------
//-------------------------------Verify by delete own topic -selecting by check box------------------------------------------------------------

deletePostTests.deleteOwnTopicDisablePostEnable=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 21[Verify by delete one topic -selecting by check box topic disable post enable]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_threads', false);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_posts', true);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('input[name="id"]');
		this.test.assertDoesntExist('a#delete i');
	});
};

//Verify by delete one topic -selecting by dropdown topic disable post enable
deletePostTests.deleteDropdownTopicdisablePostenable=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 22[Verify by delete one topic -selecting by dropdown topic disable post enable]');
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a[id^="delete_first_post_"]');
	});
};

//Verify with delete own post-selecting by check box post enable topic disable
deletePostTests.deletePostCheckboxTopicdisablePostenable=function(){

	casper.thenOpen(config.url , function(){
		utils.info('Case 23[Verify with delete own post-selecting by check box post disable topic enable]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		var index=1;
		deletePostMethod.deletePostCheckBoxId('input[name="pid"]', index);
	}).then(function(){
		this.click('input#deleteposts');
	}).wait(2000, function(){
		//checked post is present on postlisting page
		this.thenOpen(config.url, function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editable_subjuct', function(){
			this.test.assertDoesntExist('span#first_coloumn_2', 'post not found on podtlisting page');
		});
	});
};

//Verify with delete own post-by drop down of the post
deletePostTests.deleteRegisterUserOwnTopicdisablePostenable=function(){

	casper.thenOpen(config.url , function(){
		utils.info('Case 24[Verify with delete own post-by drop down of the post]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.click('a.pull-right.btn.btn-uppercase.btn-primary');
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', deletePostJSON.postData.data );
		});
	}).wait(5000, function(){
		this.click('input[id="reply_submit"]');
	}).waitForText(deletePostJSON.postData.data, function(){
		var index=1;
		deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
	}).then(function(){
		var index=0;
		profilePageMethod.getPostHref('a[id^="delete_post_request"]', index);
	}).wait(2000, function(){
		//checked post is present on postlisting page
		this.thenOpen(config.url, function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editable_subjuct', function(){
			if (casper.visible('a#'+deletePostMethod.postId)) {
		    		utils.error('post is present on postlisting page');
			}else{
				utils.info('post is not present on postlisting page');
			}
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		}).then(function(){
			profilePageMethod.deleteTopic();
		});
	});
};

// Verify with delete  own post from own profile page
deletePostTests.deleteOwnProfilePageTopicdisablePostEnable=function(){


	casper.thenOpen(config.url, function(){
		utils.info('Case 25[Verify with delete  own post from own profile page topic disable post enable]');
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(profilePageMethod.newUserData, profilePageMethod.newUserData);
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		var index=0;
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
		this.click('i.glyphicon.glyphicon-chevron-down');
		profilePageMethod.getPostHref('a#search_delete_post', index);
	}).then(function(){
		this.test.assertSelectorDoesntHaveText('div[id^="post_message_"] span', 'post reply');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//------------------delete own topic disable delete own post disable---------
//Verify by delete own topic -selecting by check box
deletePostTests.deleteTopicCheckboxdisablePostdisable=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 26[Verify by delete one topic -selecting by check box topic disable post disable]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_threads', false);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_posts', false);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('input[name="id"]');
		this.test.assertDoesntExist('a#delete i');
	});
};


//Verify with delete  own topic-by drop down of the topic
deletePostTests.deleteTopicDropdowndisablePostdisable=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 27[Verify by delete one topic -selecting by dropdown topic disable post enable]');
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a[id^="delete_first_post_"]');
	});
};

//Verify with delete own post-selecting by check box
deletePostTests.deletePostCheckboxTopicdisablePostdisable=function(){

	casper.thenOpen(config.url , function(){
		utils.info('Case 28[Verify with delete own post-selecting by check box post disable topic disable]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.click('a.pull-right.btn.btn-uppercase.btn-primary');
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', deletePostJSON.postData.data );
		});
	}).wait(5000, function(){
		this.click('input[id="reply_submit"]');
	}).waitForText(deletePostJSON.postData.data, function(){
		this.test.assertDoesntExist('input#firstpid');
	});
};

//Verify with delete own post-selecting by drop-down of the post.
deletePostTests.deletePostDropdownTopicdisablePostdisable=function(){
	casper.thenOpen(config.url , function(){
		utils.info('Case 29[Verify with delete own post-selecting by drop-down of the post when topic disable post disable]');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.click('a.pull-right.btn.btn-uppercase.btn-primary');
	}).then(function(){
		var index=1;
		deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
	}).then(function(){
		this.test.assertDoesntExist('a[id^="delete_post_request"]');
	});
};

//Verify with delete  own post from own profile page
deletePostTests.deleteOwnProfilePageTopicDisablePostDisable=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 30[Verify with delete  own post from own profile page topic disable post disable]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_threads', false);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_posts', false);
	}).thenOpen(config.url , function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a#search_delete_post span', 'delete button not present on post of profilePage');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	//enable delete own post and topic from backend settings.
	}).thenOpen(config.backEndUrl, function(){
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
			this.click('a[href="/tool/members/mb/usergroup"]');
		}).waitForSelector('div#tab_wrapper', function(){
			backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
		}).waitForText('Save', function(){
			backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_threads', true);
		}).then(function(){
			backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
			backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_posts', true);
		});
	});
};

//delete topic by searching topic
deletePostTests.deletetopicSearchTopic=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 31[delete topic by search topic admin user]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('input#inline_search_box');
		this.fill('form#inlineSearchForm',{
			'keywords' :'ONEpluse'
		},true);
	}).waitForSelector('div.post-body.pull-left span:nth-child(2) a', function(){
		this.click('input[name="id"]');
	}).then(function(){
		this.click('a#delete');
	}).wait(5000, function(){
		this.test.assertDoesntExist('div#feed-main a','topic deleted from search page');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//delete post by search post----------
deletePostTests.deletetopicSearchPost=function(){

	casper.thenOpen(config.url, function(){
		profilePageMethod.addTopicPost();
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		utils.info('Case 32[delete post by search post-admin user]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('input#inline_search_box');
		this.fill('form#inlineSearchForm',{
			'keywords' :'ONEpluse'
		},true);
	}).waitForSelector('li#show_posts a', function(){
		this.click('li#show_posts a');
	}).waitForSelector('div#feed-main div:nth-child(2) div div div:nth-child(1) div a', function(){
		this.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
		var post= casper.evaluate(function(){
			var postId=document.querySelectorAll('a[id^="search_delete_post"]');
			var postHref=postId[1].getAttribute('href');
			return postHref;
		});
		casper.click('a[href="'+post+'"]');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//delete others topic by searching topic using register user.
deletePostTests.deleteSearchTopicRegisteredUser=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 33[delete topic by search topic admin user]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_threads', true);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'delete_posts', true);
	//create post.....
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(profilePageMethod.newUserData, profilePageMethod.newUserData);
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
		}).wait(5000, function(){
			this.test.assertExists('input[name="submitbutton"]');
			this.click('input[name="submitbutton"]');
		}).waitForText('post reply', function(){
			this.test.assertExists('a#logo_or_title','title present on forum');
			this.click('a#logo_or_title');
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			this.click('input#inline_search_box');
			this.fill('form#inlineSearchForm',{
				'keywords' :'ONEpluse'
			},true);
		}).waitForSelector('div.post-body.pull-left span:nth-child(2) a', function(){
			this.click('div#feed-main div div div div:nth-child(1) div input');
		}).then(function(){
			this.click('a#delete');
		}).then(function(){
			this.test.assertSelectorDoesntHaveText('div[id^="post_message_"]', topicJSON.ValidCredential.content);
		});
	});
};

//delete others post by searching topic using register user.
deletePostTests.deleteSearchPostRegisteredUser=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 34[delete post by search post register user]');
		this.waitForSelector('form[name="posts"] a.topic-title', function(){
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
			}).wait(5000, function(){
				this.test.assertExists('input[name="submitbutton"]');
				this.click('input[name="submitbutton"]');
			}).waitForText('post reply');

		}).thenOpen(config.url, function(){
			this.waitForSelector('form[name="posts"] a.topic-title', function(){
				this.click('input#inline_search_box');
				this.fill('form#inlineSearchForm',{
					'keywords' :'ONEpluse'
				},true);
			}).waitForSelector('li#show_posts a', function(){
				this.click('li#show_posts a');
			}).waitForSelector('div#feed-main div:nth-child(2) div div div:nth-child(1) div a', function(){
				this.click('div#feed-main div:nth-child(2) div div div:nth-child(1) div a');
				var post= casper.evaluate(function(){
					var postId=document.querySelectorAll('a[id^="search_delete_post"]');
					var postHref=postId[1].getAttribute('href');
					return postHref;
				});
				this.click('a[href="'+post+'"]');
			}).then(function(){
				forumLoginMethod.logoutFromApp();
			});
		});
	});
};
