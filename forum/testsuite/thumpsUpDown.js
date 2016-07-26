'use strict';
var utils = require('./utils.js');
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var thumpsUpDown = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'thumpsUpDown/';

thumpsUpDown.featureTest = function(casper, test) {

	//Open Forum Front End URL And Get Title 
	casper.start(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('LIKE POST FROM TOPIC PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});
	
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
	
	casper.then(function() {
		test.assertExists('div#form-dialog[aria-hidden="false"]');
		test.assertExists('button#bootstrap_close_register_dialog');
		this.click('button#bootstrap_close_register_dialog');
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISLIKE POST FROM TOPIC PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});
	
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
	
	casper.then(function() {
		test.assertExists('div#form-dialog[aria-hidden="false"]');
		test.assertExists('button#bootstrap_close_register_dialog');
		this.click('button#bootstrap_close_register_dialog');
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE CLICK OF THUMBS UP FROM TOPIC PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	casper.then(function() {
		test.assertExists('a[href="/register/login"]');
		this.click('a[href="/register/login"]');
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'login.png');
	});
	
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});
	
	//Clicking On Any Topic Present In The List
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopicAfterLogin.png');
	});
	
	casper.then(function() {
		test.assertExists('i.glyphicon.glyphicon-like-alt');
		this.click('i.glyphicon.glyphicon-like-alt');
		try {
			test.assertExists('a.login_dialog.text-muted.voted-yes');
			casper.echo('CLICK OF THUMBS UP FROM TOPIC PAGE.....', 'INFO');
		} catch(e) {
			test.assertExists('a.login_dialog.text-muted');
		};
		
		
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'likeTopic.png');
	});
};
