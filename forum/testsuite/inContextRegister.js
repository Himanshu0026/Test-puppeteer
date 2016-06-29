/****This script is dedicated for In Context new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';
var forumRegister = require('./register.js');
var inContextRegisterJSON = require('../testdata/inContextRegisterData.json');
var config = require('../config/config.json');

var inContextForumRegister = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'inContextRegister/';

inContextForumRegister.featureTest = function(casper, test) {
	
	//Open Forum Front End URL And Get Title 
	
	casper.start(config.url, function() {
		test.assertTitle('Automation Forum', this.getTitle());
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	/***********Incontext New Registration From Start New Topic 'Register' Link**********/
	casper.echo('Incontext New Registration From Start New Topic Register Link', 'INFO');
	
	//Clicking On Start New Topic Button
	
	casper.then(function() {
		test.assertExists('div#topics a[href="/post/printadd"]');
		this.click('div#topics a[href="/post/printadd"]');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'startNewTopic.png');
	});
	
	//Clicking On Top 'Register' Link 
	
	casper.then(function() {
		test.assertExists('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
		this.click('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'registerLink.png');
	});
	
	//Filling Valid Data On Registration Form
	
	casper.then(function() {
		forumRegister.registerToApp(inContextRegisterJSON['registerLink'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});

	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'register_submit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	/*******Incontext New Registration From Start New Topic With Create Account*******/
	casper.echo('Incontext New Registration From Start New Topic With Create Account', 'INFO');
	
	//Clicking On Start New Topic Button
	
	casper.then(function() {
		test.assertExists('div#topics a[href="/post/printadd"]');
		this.click('div#topics a[href="/post/printadd"]');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'startNewTopic.png');
	});
	
	//Clicking On 'Create new Account' Button 
	
	casper.then(function() {
		test.assertExists('form[name="frmLogin"] div.form-group a[href="/register/register"]');
		this.click('form[name="frmLogin"] div.form-group a[href="/register/register"]');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'registerLink.png');
	});
	
	//Filling Valid Data On Registration Form
	
	casper.then(function() {
		forumRegister.registerToApp(inContextRegisterJSON['createAccount'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});

	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'register_createAccount.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	/*******Incontext New Registration While Like This Topic From List Of Topics********/
	casper.echo('Incontext New Registration While Like This Topic From List Of Topics', 'INFO');
	
	//Clicking On 'Like' This Post Icon
	
	casper.then(function() {
		test.assertExists('i.glyphicon.glyphicon-like-alt');
		this.click('i.glyphicon.glyphicon-like-alt');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'likePost.png');
	});
	
	//Filling Valid Data On Registration Form
	
	casper.then(function() {
		registerToApp(inContextRegisterJSON['likePost'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'likePostSubmit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	/***********Incontext New Registration While Like Post From Topic Page************/
	casper.echo('Incontext New Registration While Like Post From Topic Page', 'INFO');
	
	//Clicking On Any Topic Present In The List
	
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});
	
	//Clicking On 'Like' This Post Icon
	
	casper.then(function() {
		test.assertExists('i.glyphicon.glyphicon-like-alt');
		this.click('i.glyphicon.glyphicon-like-alt');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'likePostFromTopicPage.png');
	});
	
	//Filling Valid Data On Registration Form
	
	casper.then(function() {
		registerToApp(inContextRegisterJSON['likePostFromTopicPage'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'likePostFromTopicPageSubmit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	/***********Incontext New Registration While Dislike Post From Topic Page************/
	casper.echo('Incontext New Registration While Dislike Post From Topic Page', 'INFO');
	
	//Clicking On Any Topic Present In The List
	
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});
	
	//Clicking On 'Dislike' This Post Icon
	
	casper.then(function() {
		test.assertExists('a.dislike_post.text-muted');
		this.click('a.dislike_post.text-muted');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'disLikePostFromTopicPage.png');
	});
	
	//Filling Valid Data On Registration Form
	
	casper.then(function() {
		registerToApp(inContextRegisterJSON['dislikePostFromTopicPage'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'dislikePostFromTopicPageSubmit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	/***********Incontext New Registration From Quote On Post From Post List************/
	casper.echo('Incontext New Registration From Quote On Post From Post List', 'INFO');
	
	//Clicking On Any Topic Present In The List
	
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});
	
	//Clicking On 'Quote Link' Present In Post List
	
	casper.then(function() {
		test.assertExists('a.text-muted.quote');
		this.click('a.text-muted.quote');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'quoteFromTopicPage.png');
	});
	
	//Filling Valid Data On Registration Form
	
	casper.then(function() {
		registerToApp(inContextRegisterJSON['quoteFromTopicPage'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'quoteFromTopicPageSubmit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	/***********Incontext New Registration From Vote On Post From Post List************/
	casper.echo('Incontext New Registration From Vote On Post From Post List', 'INFO');
	
	//Clicking On Any Topic Present In The List
	
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});
	
	//Clicking On 'create an account and log in' Link Present In Post List
	
	casper.then(function() {
		try {
			test.assertExists('a#guest_user_vote');
			this.click('a#guest_user_vote');
			this.echo('You have clicked on create an account and log-in link...', 'INFO');
		} catch(e) {
			test.assertDoesntExists('a#guest_user_vote');
			this.echo('You did not find create an account and log-in link...', 'INFO');
		}
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'voteFromTopicPage.png');
	});
	
	//Filling Valid Data On Registration Form
	
	casper.then(function() {
		registerToApp(inContextRegisterJSON['voteFromTopicPage'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'voteFromTopicPageSubmit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	/***********Incontext New Registration From Message Mouse Mover Button************/
	casper.echo('Incontext New Registration From Message Mouse Mover Button', 'INFO');
	
	//Clicking On 'Username' Link Against First Topic In The List
	
	casper.then(function() {
		test.assertExists('form[name="posts"] a[href^="/profile/"]');
		this.click('form[name="posts"] a.username.usergroup946060');
	});
	/*casper.then(function() {
		//test.assertExists('form[name="posts"] a[href^="/profile/"]');
		this.page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');
		var name = this.evaluate(function () {
			var element = document.querySelector('form[name="posts"] a.username.usergroup946060');
			$(element).hover(function() {console.log("--------------------");
				var popover = $('form[name="posts"] div.popover.hovercard.fade.top.in');
				return popover;
			});
		});
		casper.echo("name : " +name.innerHTML, 'info');
	});*/
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnMessage.png');
	});
	
	//Clicking On Top 'Register' Link 
	
	casper.then(function() {
		try {
			test.assertExists('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
			this.click('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'registerLink.png');
				registerToApp(inContextRegisterJSON['usernameLink'], casper, function() {
					casper.echo('Processing to registration on forum.....', 'INFO');
				});
			});
		} catch(e) {
			test.assertExists('.pull-right a[href="/register/register"]');
			this.click('.pull-right a[href="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'registerLink.png');
				forumRegister.registerToApp(inContextRegisterJSON['createAccount'], casper, function() {
					casper.echo('Processing to registration on forum.....', 'INFO');
				});
			});
		}
	});
	
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'register_submit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
};

//Method For Filling Data In Registration Form

var registerToApp = function(data, driver, callback) {
	driver.fill('div#form-dialog form[name="PostTopics"]', {
		'member' : data.uname,
		'email': data.uemail,
		'pw' : data.upass
	}, true);
	
	return callback();
	
};
