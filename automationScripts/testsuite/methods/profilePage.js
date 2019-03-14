'use strict.';
var loginJSON = require('../../testdata/loginData.json');
var topicMethod = require('../methods/topic.js');
var topicJSON = require('../../testdata/topic.json');
var composeTopicJSON=require('../../testdata/composeTopic.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
var forumLoginMethod = require('../methods/login.js');
var registerMethod=require('../methods/register.js');
var profilePageMethod = module.exports = {};
profilePageMethod.newUserData="";

//----------------------------------get post href------------------------------------------------------------------------------
profilePageMethod.getPostHref= function(data, index){
	var post= casper.evaluate(function(data, index){
  		var postId=document.querySelectorAll(data);
     		var postLength= postId.length;
    		var postHref=postId[index].getAttribute('href');
     		return postHref;
	},data, index);
	utils.info(" message :" +post);
	casper.click('a[href="'+post+'"]');
};

//--------------------------------------------getLike/Dislike post----------------------------------------------------------
profilePageMethod.getLikeDislikePostIds= function(data, index){
	utils.info(' value of index is' +index ,'INFO');
	var likeDislikePost= casper.evaluate(function(data, index){
		var likeDislikeId=document.querySelectorAll(data);
		var likeDislikeLength= likeDislikeId.length;
		var likeDislikeIds=likeDislikeId[index].getAttribute('id');
		return likeDislikeIds;
	}, data, index);
	utils.info(" message :" +likeDislikePost,'INFO');
	casper.click('a#'+likeDislikePost+'');

};

//delete post from postlisting page---------------
profilePageMethod.deletePost=function(data, index){
	var post= casper.evaluate(function(data, index){
		var postDropDownId=document.querySelectorAll(data);
		var postDropdownIds=postDropDownId[index].getAttribute('id');
		return postDropdownIds;
	}, data, index);
	utils.info("message :" +post,'INFO');
	casper.click('a#'+post+'');

};

//add topic post ----------------------------
profilePageMethod.addTopicPost= function(){
	//for another post 10 seconds wait
	var newUser ="";
	casper.thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(composeTopicJSON.ValidCredential);
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('form[name="posts"] a.topic-title');
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
				casper.sendKeys('#tinymce', profilePageJSON.addPost.Post );
			});
		}).then(function(){
			this.test.assertExists('input[name="submitbutton"]');
			this.click('input[name="submitbutton"]');
		}).then(function(){
			this.waitForText('post reply', function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('ul.nav.pull-right span.caret');
				this.click('a#user-nav-panel-profile');
			}).waitForSelector('a#PostsOFUser', function(){
				this.click('a#PostsOFUser');
			}).waitForText('post reply');
		});
	});
};


//add topic post ----------------------------
profilePageMethod.newaddTopicPost= function(){
	var newUser ="";
	casper.thenOpen(config.url, function(){
		registerMethod.registerMultipleUsers(1, function(users){
			newUser = users;
			profilePageMethod.newUserData=newUser;
		});
	}).then(function(){
		forumLoginMethod.loginToApp(newUser, newUser);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(composeTopicJSON.ValidCredential);
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(newUser, newUser);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('form[name="posts"] a.topic-title');
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
				casper.sendKeys('#tinymce', profilePageJSON.addPost.Post );
			});
		}).then(function(){
			this.test.assertExists('input[name="submitbutton"]');
			this.click('input[name="submitbutton"]');
		}).then(function(){
			this.waitForText('post reply', function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('ul.nav.pull-right span.caret');
				this.click('a#user-nav-panel-profile');
			}).waitForSelector('a#PostsOFUser', function(){
				this.click('a#PostsOFUser');
			}).waitForText('post reply');
		});
	});
};


profilePageMethod.deleteTopics=function() {
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
