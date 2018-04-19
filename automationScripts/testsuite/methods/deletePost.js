var forumLoginMethod = require('../methods/login.js');
var topicMethod = require('../methods/topic.js');
var composeTopicJSON=require('../../testdata/composeTopic.json');
var profilePageJSON=require('../../testdata/profilePageData.json');
var topicJSON = require('../../testdata/topic.json');
var deletePostMethod= module.exports = {};
deletePostMethod.postId="";

//---------------------Method to click on general category from forum frontEnd-------------------------
deletePostMethod.getCategoryHrefFrontend= function(data){
	var categoryName = casper.evaluate(function(data){
		var len = document.querySelectorAll('div.panel-body.table-responsive ul li').length;
		for(var i=1; i<=len; i++) {
			var x1 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a span');
			if (x1.innerText == data){
				var x2 = document.querySelector('ul li:nth-child('+i+') span span:nth-child(1) h3 a').getAttribute('href');
				return x2;
			}
		}
	},data);
	utils.info('value of category name is'+categoryName);
	casper.evaluate(function(categoryName) {
		document.querySelector('a[href="'+categoryName+'"]').click();
	},categoryName);
};

//delete post from postlisting page---------------
deletePostMethod.getPostId=function(data, index){
	var postId="";
	var post= casper.evaluate(function(data, index){
		var postDropDownId=document.querySelectorAll(data);
		var postDropdownIds=postDropDownId[index].getAttribute('id');
		return postDropdownIds;
	}, data, index);
	deletePostMethod.postId=post;
	utils.info("message :" +post);
	casper.click('a#'+post+'');
};
//----------------get attribute value of a post------------------------------------------------
deletePostMethod.deletePostCheckBoxId=function(data, index){
	var post= casper.evaluate(function(data, index){
		var postId=document.querySelectorAll(data, index);
			var postHref=postId[index].getAttribute('id');
			return postHref;
	},data, index);
	utils.info("message:" +post);
	casper.evaluate(function(post) {
		document.querySelector('input[value="'+post+'"]').click();
	}, post);
};

deletePostMethod.addTopicPost= function(username, password, data){
	//for another post 10 seconds wait
	var newUser ="";
	casper.thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(username, password);
	}).waitForSelector('a[href="/post/printadd"]', function(){
		this.evaluate(function() {
			document.querySelector('a[href="/post/printadd"]').click();
		});
	}).then(function(){
		topicMethod.createTopic(data);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		this.test.assertExists('a#backArrowPost','title present on forum');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(username, password);
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	}).waitForSelector('a.pull-right.btn.btn-uppercase.btn-primary', function(){
		this.test.assertSelectorHasText('a.pull-right.btn.btn-uppercase.btn-primary', 'Post a reply');
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
