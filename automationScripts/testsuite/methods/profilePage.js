'use strict.';
var forumLoginMethod = require('../methods/login.js');
var loginJSON = require('../../testdata/loginData.json');
var topicMethod = require('../methods/topic.js');
var topicJSON = require('../../testdata/topic.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
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
		registerMethod.registerMultipleUsers(1, function(users){
			newUser = users;
			profilePageMethod.newUserData=newUser;
		});
	}).then(function(){
		forumLoginMethod.loginToApp(newUser, newUser);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(newUser, newUser);
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

//delete topic/ post from register user.
//--------------------------------------------------DeleteTopic from frontEnd-------------------------------------
profilePageMethod.deleteTopic = function(){
	casper.thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).waitForSelector('div.panel-heading span input', function(){
		this.test.assertExists('div.panel-heading span input');
		this.click('div.panel-heading span input');
		this.test.assertExists('a#delete');
		this.click('a#delete');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};
