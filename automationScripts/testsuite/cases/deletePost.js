//----- This js file covers all the upload functionality on forum Frontend---------//
var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var deletePostJSON = require('../../testdata/deletePostData.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
var topicJSON = require('../../testdata/topic.json');
var deleteTopicScenarioJSON= require('../../testdata/deleteTopicScenario.json');
var topicJSON = require('../../testdata/topic.json');
var topicMethod = require('../methods/topic.js');
var registerMethod = require('../methods/register.js');
var profilePageMethod= require('../methods/profilePage.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var forumLoginMethod = require('../methods/login.js');
var profilePageMethod= require('../methods/profilePage.js');
var deletePostMethod = require('../methods/deletePost.js');
deletePostTests = module.exports = {};

//code written for remove the dependency issues
// method to create a category General
deletePostTests.deletePostCreateCategory = function() {
	casper.thenOpen(config.backEndUrl, function() {
		utils.info(' * Method to create category and sub category *');
		backEndForumRegisterMethod.goToCategoryPage();
	}).waitForSelector('a#addForumButton', function() {
		backEndForumRegisterMethod.isCategoryExists(deletePostJSON.category, function(err, isExists) {
			if(isExists) {
				utils.info(' Category already existed');
			} else {
				utils.info(' Category not exist');
				casper.then(function() {
					backEndForumRegisterMethod.createCategory(deletePostJSON.category);
				});
			}
		});
	});
};
//using category page.
//Verify by delete all topic-selecting by check box
deletePostTests.deleteAllTopicCheckboxAdmin=function(){
	casper.thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.test.assertExists('a[href="/post/printadd"]', 'New Topic selector present on forum');
		casper.evaluate(function() {
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.test.assertExists('input[name="allbox"]');
		this.evaluate(function() {
			document.querySelector('input[name="allbox"]').click();
		});
	}).waitForSelector('a#delete', function(){
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	});
};

//Verify by delete one topic -selecting by check box
deletePostTests.deleteTopicByCheckboxAdmin=function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 2[Verify by delete one topic -selecting by check box]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.test.assertExists('input[name="id"]', 'checkbox present on undercategory topics');
		this.evaluate(function() {
			document.querySelector('input[name="id"]').click();
		});
	}).waitForSelector('a#delete', function(){
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	});
};

//using category page
//Verify by delete multiple topic-selecting by check box
deletePostTests.deleteMultipleTopicCheckboxAdmin=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 3[Verify by delete multiple topic-selecting by check box from admin user]');
		this.test.assertExists('a[href="/post/printadd"]');
		casper.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		casper.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.test.assertExists('input[name="id"]', 'checkbox present on undercategory topics');
		this.evaluate(function() {
			document.querySelector('input[name="id"]').click();
		});
	}).then(function(){
		//id of 2nd checkbox
		this.click('form[name="posts"] div div:nth-child(3) ul li:nth-child(2) span:nth-child(2) span:nth-child(1) input');
	}).waitForSelector('a#delete', function(){
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	});
};

//Verify with delete topic-by drop down of the topic
deletePostTests.deleteTopicDropDownAdmin=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 4[Verify with delete topic-by drop down of the topic]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
		casper.evaluate(function(){
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function(){
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.click('span.topic-content h4 a');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		casper.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:last-child a');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};
//deleting the post-using dropdown form admin user.
//Verify with delete post-selecting by dropdown
deletePostTests.deletePostDropDownAdminUser=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 5[Verify with delete post-selecting by drop-down from admin user]');
		deletePostMethod.addTopicPost(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password, topicJSON.ValidCredential);
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('a#forum-title', function(){
		this.test.assertExists('span.topic-content h4 a', 'topics found on category listing page');
		this.click('span.topic-content h4 a');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		var index=1;
		deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
	}).then(function(){
		var index=0;
		profilePageMethod.getPostHref('a[id^="delete_post_request"]', index);
	}).wait(1000, function(){
		//checked post is present on postlisting page
		this.thenOpen(config.url, function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editableSubject', function(){
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

//Verify with delete post-selecting by check box-using admin user.
deletePostTests.deletePostCheckboxAdmin=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 6[Verify with delete post-selecting by check box from admin user]');
		deletePostMethod.addTopicPost(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password, topicJSON.ValidCredential);
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('a#forum-title', function(){
		this.click('span.topic-content h4 a');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.test.assertExists('input[name="pid"]');
		var index=1;
		deletePostMethod.deletePostCheckBoxId('input[name="pid"]', index);
	}).then(function(){
		this.click('#deleteposts');
	}).wait(1000, function(){
		//checked post is present on postlisting page
		this.thenOpen(config.url, function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editableSubject', function(){
			this.test.assertDoesntExist('span#first_coloumn_2', 'post not found on postlisting page');
			this.wait(1000, function(){});
		});
	});
};

//Verify by delete multiple post-selecting by check box using admin-user
deletePostTests.deleteMultiplePostAdmin=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 7[Verify by delete multiple post-selecting by check box]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		casper.evaluate(function() {
			document.querySelector('a#sub_post_reply').click();
		});
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', deletePostJSON.postData.data );
		});
	}).then(function(){
		this.click('input[id="reply_submit"]');
	}).waitForText(deletePostJSON.postData.data, function(){
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down', 'dropdown toggle found on postlistingpage');
		this.evaluate(function() {
			document.querySelector('input#firstpid').click();
		});
	}).then(function(){
		var index=1;
		deletePostMethod.deletePostCheckBoxId('input[name="pid"]', index);
	}).then(function(){
		this.click('#deleteposts');
		this.wait(1000, function(){});
	}).then(function(){
		this.test.assertDoesntExist('i.glyphicon.glyphicon-chevron-down');
	});
};

//delete post from members profile page from admin user
deletePostTests.deletePostProfilePageAdmin=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 8[Verify with delete post from members profile page using admin user]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
		casper.evaluate(function(){
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
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
			profilePageMethod.deleteTopics();
		});
	});
};

//Verify by delete one topic -selecting by check box
deletePostTests.deletePostRegisteruser=function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 9[Verify by delete one topic -selecting by check box]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitWhileVisible('#td_tab_login', function() {
		casper.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('a#forum-title', function(){
		this.test.assertExists('input[name="id"]', 'checkbox present on undercategory topics');
		this.evaluate(function() {
			document.querySelector('input[name="id"]').click();
		});
	}).waitForSelector('a#delete', function(){
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	});
};

//Verify by delete all topic-selecting by check box
deletePostTests.deleteAllTopicCheckboxRegister=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 10[Verify by delete all topic-selecting by check box register user]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
		casper.evaluate(function() {
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('input[name="allbox"]');
		this.evaluate(function() {
			document.querySelector('input[name="allbox"]').click();
		});
	}).waitForSelector('a#delete', function(){
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	});
};

//Verify by delete multiple topic-selecting by check box
deletePostTests.deleteMultipleTopicCheckboxRegister=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 11[Verify by delete multiple topic-selecting by check box register user]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.test.assertExists('a[href="/post/printadd"]');
		casper.evaluate(function() {
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		casper.evaluate(function() {
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('input[name="id"]', 'checkbox present on undercategory topics');
		this.evaluate(function() {
			document.querySelector('input[name="id"]').click();
		});
	}).then(function(){
		var checkboxId= casper.evaluate(function(){
			var postId=document.querySelectorAll('input[name^="id"]');
				var postHref=postId[1].getAttribute('value');
				return postHref;
		});
		utils.info("message:" +checkboxId);
		this.evaluate(function(checkboxId) {
			document.querySelector('input[value="'+checkboxId+'"]').click();
		}, checkboxId);
	}).waitForSelector('a#delete', function(){
		this.click('a#delete');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	});
};

//Verify with delete topic-by drop down of the topic
deletePostTests.deleteTopicDropDownRegister=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 12[Verify with delete topic-by drop down of the topic register user]');
	}).waitForSelector('a[href="/post/printadd"]', function(){
		casper.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
	}).then(function(){
		this.click('div[id^="post_list_"]:nth-child(1) div:nth-child(1) div ul li:last-child a');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with delete post-selecting by check box
deletePostTests.deletePostDropDownRegister=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 13[Verify with delete post-selecting by check box register user]');
		deletePostMethod.addTopicPost(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password, topicJSON.ValidCredential);
	}).then(function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		var index=1;
		deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
	}).then(function(){
		var index=0;
		profilePageMethod.getPostHref('a[id^="delete_post_request"]', index);
	}).then(function(){
		//checked post is present on postlisting page
		this.thenOpen(config.url, function(){
			this.test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('span#editableSubject', function(){
			if (casper.visible('a#'+deletePostMethod.postId)) {
		    		utils.error('post is present on postlisting page');
			}else{
				utils.info('post is not present on postlisting page');
			}
		});
	});
};

//Verify with delete post-selecting by check box
deletePostTests.deletePostCheckboxRegister=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 14[Verify with delete post-selecting by check box register user]');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		casper.evaluate(function() {
			document.querySelector('a#sub_post_reply').click();
		});
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', deletePostJSON.postData.data );
		});
	}).then(function(){
		this.click('input[id="reply_submit"]');
	}).waitForText(deletePostJSON.postData.data, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('a#forum-title', function(){
		this.click('span.topic-content h4 a');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		var index=1;
		deletePostMethod.deletePostCheckBoxId('input[name="pid"]', index);
	}).then(function(){
		this.click('#deleteposts');
		this.wait(1000, function(){});
	//checked post is present on postlisting page
	}).thenOpen(config.url, function(){
		this.test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('span#editableSubject', function(){
		this.test.assertDoesntExist('span#first_coloumn_2', 'post not found on postlisting page');
		this.wait(2000, function(){});
	});
};


//delete post from members profile page
deletePostTests.deletePostProfilePageRegister=function(){
	casper.thenOpen(config.url, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 15[delete post from members profile page register user]');
	}).then(function(){
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
			this.wait(1000, function(){});
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//view category-- //delete own topic- enable--//delete own post-disable"
deletePostTests.deleteOwnTopicEnablePostDisable=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('************************DELETE-TOPIC TESTCASES****************************');
		utils.info('Case 16[Verify by delete one topic -selecting by check box register user]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('General');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('General', 'delete_threads', true);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('General');
		backEndForumRegisterMethod.editGroupPermissions('General', 'delete_posts', false);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password);
	}).waitWhileVisible('#td_tab_login', function() {
		casper.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.evaluate(function() {
			document.querySelector('input[name="id"]').click();
		});
	}).waitForSelector('a#delete', function(){
		this.click('a#delete i');
	}).waitForSelector('span.alert.alert-info.text-block.text-center', function(){
		this.test.assertExists('span.alert.alert-info.text-block.text-center');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with delete  own post from own profile page
//Verify with delete own post-by drop down of the post
//Verify with delete own post-selecting by check box
//Verify with delete  own topic-by drop down of the topic-under category
deletePostTests.deleteOwnTopicDropdownTopicPostDisable=function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 17[Verify by delete one topic -selecting by check box register user]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.test.assertExists('a[href="/post/printadd"]');
		casper.evaluate(function() {
		  document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a[id^="delete_first_post_"]');
	//checked delete checkbox on postlistingpage and also the dropdown delete button is available or not.
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		casper.evaluate(function() {
			document.querySelector('a#sub_post_reply').click();
		});
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		casper.withFrame('message_ifr', function(){
			casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			casper.sendKeys('#tinymce', deletePostJSON.postData.data );
		});
	}).then(function(){
		this.click('input[id="reply_submit"]');
	}).waitForText(deletePostJSON.postData.data, function(){
		this.test.assertDoesntExist('input#firstpid');
		this.wait(1000, function(){});
	}).then(function(){
		var index=1;
		deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
	}).then(function(){
		this.test.assertDoesntExist('a[id^="delete_post_request"]');
	//also checked delete  own post button  from own profile page
	}).waitForSelector('ul.nav.pull-right span.caret', function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		this.test.assertExists('i.glyphicon.glyphicon-chevron-down');
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a#search_delete_post span', 'delete button not present of post on profilePage');
		this.wait(1000, function(){});
	});
};


//-------------------------------delete own topic-disable when the  permission---------------------------------------------------------------------------------
//-------------------------------delete own post-enable---------------------------------------------------------------------------------
//-------------------------------Verify by delete own topic -selecting by check box------------------------------------------------------------
//Verify by delete one topic -selecting by dropdown topic disable post enable
//Verify with delete own post-selecting by check box post enable topic disable
//Verify with delete own post-by drop down of the post
//
deletePostTests.deleteOwnTopicDisablePostEnable=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 21[Verify by delete one topic -selecting by check box topic disable post enable]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
		backEndForumRegisterMethod.viewGroupPermissions('General');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('General', 'delete_threads', false);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('General');
		backEndForumRegisterMethod.editGroupPermissions('General', 'delete_posts', true);
	}).thenOpen(config.url, function(){
		this.waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
			this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
			this.evaluate(function() {
				document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
			});
		}).waitForSelector('form#inlineSearchForm', function(){
			deletePostMethod.getCategoryHrefFrontend('General');
		}).waitForSelector('form[name="posts"] a.topic-title', function(){
			/*this.evaluate(function() {
				document.querySelector('input[name="id"]').click();
			});*/
			this.test.assertDoesntExist('a#delete i');
			this.wait(1000, function(){});
		//Verify by delete one topic -selecting by dropdown topic disable post enable
		}).then(function(){
			this.click('form[name="posts"] a.topic-title');
		}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
			this.click('i.glyphicon.glyphicon-chevron-down');
			this.test.assertDoesntExist('a[id^="delete_first_post_"]');
		//Verify with delete own post-selecting by check box post enable topic disable
		}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
			var index=1;
			deletePostMethod.deletePostCheckBoxId('input[name="pid"]', index);
		}).then(function(){
			this.click('#deleteposts');
		}).then(function(){
			//checked post is present on postlisting page
			this.thenOpen(config.url, function(){
				this.test.assertExists('form[name="posts"] a.topic-title');
				this.click('form[name="posts"] a.topic-title');
			}).waitForSelector('span#editableSubject', function(){
				this.test.assertDoesntExist('span#first_coloumn_2', 'post not found on postlisting page');
				this.wait(2000, function(){});
			});
		//Verify with delete own post-by drop down of the post
		}).then(function(){
			casper.evaluate(function() {
				document.querySelector('a#sub_post_reply').click();
			});
		}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
			casper.withFrame('message_ifr', function(){
				casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
				casper.sendKeys('#tinymce', deletePostJSON.postData.data );
			});
		}).then(function(){
			this.click('input[id="reply_submit"]');
		}).waitForText(deletePostJSON.postData.data, function(){
			this.reload(function(){
				var index=1;
				deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
			});
		}).then(function(){
			var index=0;
			profilePageMethod.getPostHref('a[id^="delete_post_request"]', index);
		}).then(function(){
			//checked post is present on postlisting page
			this.thenOpen(config.url, function(){
				this.test.assertExists('form[name="posts"] a.topic-title');
				this.click('form[name="posts"] a.topic-title');
			}).waitForSelector('span#editableSubject', function(){
				if (casper.visible('a#'+deletePostMethod.postId)) {
			    		utils.error('post is present on postlisting page');
				}else{
					utils.info('post is not present on postlisting page');
				}
			}).then(function(){
				forumLoginMethod.logoutFromApp();
			}).then(function(){
				profilePageMethod.deleteTopics();
			});
		});
	});
};

// Verify with delete  own post from own profile page
deletePostTests.deleteOwnProfilePageTopicdisablePostEnable=function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 25[Verify with delete  own post from own profile page topic disable post enable]');
		deletePostMethod.addTopicPost(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password, topicJSON.ValidCredential);
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password);
	}).waitWhileVisible('#td_tab_login', function() {
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
		backEndForumRegisterMethod.viewGroupPermissions('General');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('General', 'delete_threads', false);
	}).then(function(){
		backEndForumRegisterMethod.viewGroupPermissions('General');
		backEndForumRegisterMethod.editGroupPermissions('General', 'delete_posts', false);
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a');
		this.evaluate(function() {
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('form#inlineSearchForm', function(){
		deletePostMethod.getCategoryHrefFrontend('General');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.evaluate(function() {
			document.querySelector('input[name="id"]').click();
		});
		this.test.assertDoesntExist('a#delete i','delete button not visible on topiclistingPage under-category');
	}).then(function(){
		this.test.assertExists('form[name="posts"] a.topic-title','topic present on under-category');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('i.glyphicon.glyphicon-chevron-down', function(){
		this.click('i.glyphicon.glyphicon-chevron-down');
		this.test.assertDoesntExist('a[id^="delete_first_post_"]');
		this.wait(1000, function(){});
	}).then(function(){
		this.waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
			casper.evaluate(function() {
				document.querySelector('a#sub_post_reply').click();
			});
		}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
			casper.withFrame('message_ifr', function(){
				casper.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
				casper.sendKeys('#tinymce', deletePostJSON.postData.data );
			});
		}).then(function(){
			this.click('input[id="reply_submit"]');
		}).waitForText(deletePostJSON.postData.data, function(){
			this.test.assertDoesntExist('input#firstpid');
		//Verify with delete own post-selecting by drop-down of the post.
		}).then(function(){
			var index=1;
			deletePostMethod.getPostId('a[id^="posttoggle_"]', index);
		}).then(function(){
			this.test.assertDoesntExist('a[id^="delete_post_request"]');
		});
	});
};

//Verify with delete  own post from own profile page
deletePostTests.deleteOwnProfilePageTopicDisablePostDisable=function(){
	casper.thenOpen(config.url , function(){
		utils.info('Case 30[Verify with delete  own post from own profile page]');
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
			backEndForumRegisterMethod.viewGroupPermissions('General');
		}).waitForText('Save', function(){
			backEndForumRegisterMethod.editGroupPermissions('General', 'delete_threads', true);
		}).then(function(){
			backEndForumRegisterMethod.viewGroupPermissions('General');
			backEndForumRegisterMethod.editGroupPermissions('General', 'delete_posts', true);
		});
	});
};

//added new testcases
//Verify with Delete Single Topic from latest topic page.
deletePostTests.deleteTopicNewTop=function(data){

	casper.thenOpen(config.url, function(){
		utils.info('Case 35[Verify with Delete Single Topic from New and Top from topiclistingpage.]');
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitWhileVisible('#td_tab_login', function() {
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function(){
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(deletePostJSON.newTopic);
	}).waitForText(deletePostJSON.newTopic.content, function(){
		this.test.assertExists('a#links-nav i');
		this.click('a#links-nav i');
		this.test.assertExists('li#latest_topics_show a','title present on forum');
		this.click('li#latest_topics_show a');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category is present');
		this.evaluate(function(){
			document.querySelector('ul.nav.nav-tabs li:nth-child(2) a').click();
		});
	}).waitForSelector('a[href="#forums"]', function(){
		deletePostMethod.getCategoryHrefFrontend('CheckPostCountCategory');
	}).waitForSelector('span.topic-content h4 a', function(){
		this.click(data);
	}).waitForSelector('div.panel-heading ul li:nth-child(2) a', function(){
		this.test.assertSelectorHasText('div.panel-heading ul li:nth-child(2) a', 'New');
	}).then(function(){
		this.test.assertExists('input[name="id"]');
		this.evaluate(function(){
			document.querySelector('input[name="id"]').click();
		});
	}).then(function(){
		this.test.assertExists('div#topics-menu');
		this.then(function(){
			this.wait(1000, function(){
				this.test.assertSelectorHasText('span#checkedBoxes', '1');
				this.click('a#delete');
				this.wait(1000, function(){});
			});
		});
	}).then(function(){
		this.test.assertExists('i.icon.icon-left-small');
		this.click('i.icon.icon-left-small');
	}).waitForSelector('a[href="#forums"]', function(){
		//check on category page count.
		var topicCount=this.getHTML('a.help-tooltip.TopicsCount');
		var actualCount=topicCount.trim();
		var newCount=actualCount.split('i>');
		var firstPost=newCount[1];
		this.test.assertEquals(firstPost, deleteTopicScenarioJSON.topicCount.expectedCount,'both the topic counts are equals');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};


//create pagination and count the topics on topic listingpage:-
deletePostTests.checkTopicCount=function(){

	casper.thenOpen(config.backEndUrl, function(){
                utils.info('Case 36[Verify to create 10 topics for pagination and Delete from Pagination.]');
		utils.info('Case 36[Verify with create pagination and count the topics on topic listingpage.]');
		backEndForumRegisterMethod.goToDisplayPage();
        }).then(function(){
                backEndForumRegisterMethod.setTopicsPerPage('10');
	}).then(function(){
		deletePostMethod.createPagination(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).thenOpen(config.url, function(){
		this.test.assertExists('a.btn-subtle.pagination-last-page i', 'pagination icon exists on topiclistingPage');
	}).then(function(){
		this.test.assertExists('a.page-numbers.text-muted.open-popover', 'count present on topiclistingPage');
	}).then(function(){
		this.test.assertExists('input[name="id"]', 'topics checkbox found on topiclistingpage');
		this.click('input[name="id"]');
	}).waitForSelector('a#delete', function(){
		this.test.assertExists('a#delete', 'delete pop-up found');
		this.click('a#delete');
		this.wait(1000, function(){});
	//count check on topicListingpage
	}).then(function(){
		var actualTopicCount=casper.fetchText('a.page-numbers.text-muted.open-popover');
		var actualcount=actualTopicCount.trim();
		utils.info('value is'+actualcount);
		this.test.assertEquals(actualcount, deletePostJSON.expectedTopicCount.topicCount, 'both the outputs are equals');
	}).then(function(){
		this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category selector found on topiclistingpage');
		this.click('ul.nav.nav-tabs li:nth-child(2) a');
	//count check on categorylistingpage
	}).waitForSelector('a[href="#forums"]', function(){
		this.test.assertTextExists('CheckPostCountCategory', 'text found on categorylistingPage');
		deletePostMethod.verifyPostCount('CheckPostCountCategory', deletePostJSON.expectedCategoryCount.categoryCount );
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('a#user-nav-panel-profile');
		this.click('a#user-nav-panel-profile');
	//count check on profilepage
	}).then(function(){
		//var actualTopicCount=casper.fetchText('span.profile-count');
		//var actualcount=actualTopicCount.trim();
		//var count=actualTopicCount.split("3");
		//var counts=count[0];
		//var newcount=counts.trim();
		//utils.info('value is'+newcount);
		//this.test.assertEquals(newcount, deletePostJSON.expectedCategoryCount.categoryCount, 'both the outputs are equals');
	}).thenOpen(config.url, function(){
		this.repeat(2, function() {
			if (this.exists('div.panel-heading span input')) {
				this.test.assertExists('div.panel-heading span input');
				this.evaluate(function() {
					document.querySelector('input[name="allbox"]').click();
				});
				this.test.assertExists('a#delete');
				this.click('a#delete');
			}
		});
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with delete topic  for deleted user check counts.
deletePostTests.checkTopicCountDeletedUser=function(){

	var recipients="";
	casper.thenOpen(config.url, function(){
		utils.info('Case 37[Verify with delete topic  for deleted user check counts.]');
		registerMethod.registerMultipleUsers(1, function(users) {
			recipients = users;
		});
	}).then(function(){
		deletePostMethod.createPagination(recipients, recipients);
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.test.assertExists('a#user-nav-panel-profile');
		this.click('a#user-nav-panel-profile');
		//forumLoginMethod.logoutFromApp();
	}).waitForSelector('a#deleteAccountDialog i', function(){
		this.test.assertExists('a#deleteAccountDialog i', 'delete button found on profilePage of register user');
		this.click('a#deleteAccountDialog i');
	}).then(function(){
		this.click('a#deleteAccount');
	}).waitForSelector('a#td_tab_login', function(){
		casper.thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
		}).waitWhileVisible('#td_tab_login', function() {
			this.test.assertExists('a.page-numbers.text-muted.open-popover', 'count present on topiclistingPage');
		}).then(function(){
			this.test.assertExists('input[name="id"]', 'topics checkbox found on topiclistingpage');
			this.click('input[name="id"]');
		}).waitForSelector('a#delete', function(){
			this.test.assertExists('a#delete', 'delete pop-up found');
			this.click('a#delete');
			this.wait(1000, function(){});
		//count check on topicListingpage
		}).then(function(){
			var actualTopicCount=casper.fetchText('a.page-numbers.text-muted.open-popover');
			var actualcount=actualTopicCount.trim();
			utils.info('value is'+actualcount);
			this.test.assertEquals(actualcount, deletePostJSON.expectedTopicCount.topicCounts, 'both the outputs are equals');
		}).then(function(){
			this.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'category selector found on topiclistingpage');
			this.click('ul.nav.nav-tabs li:nth-child(2) a');
		//count check on categorylistingpage
		}).waitForSelector('a[href="#forums"]', function(){
			this.test.assertTextExists('CheckPostCountCategory', 'text found on categorylistingPage');
			deletePostMethod.verifyPostCount('CheckPostCountCategory', deletePostJSON.expectedCategoryCount.categoryCounts);
		});
	});
};

//
