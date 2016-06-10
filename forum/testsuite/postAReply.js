/****This script is dedicated for user to post a reply on any topic on the forum. It covers testing of post a reply page with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var postAReply = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'postAReply/';

postAReply.featureTest = function(casper) {

	//Open Forum URL And Get Title 

	casper.start(config.url, function() {
		this.log('Title of the page :' +this.getTitle(), 'info');
	});

	//Login to app

	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.log('User has successfully login to application', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});

	//Reply topic

	casper.then(function() {
		replyTopic(json['replyTopic'].content, casper, function() {
			casper.log('Replied successfully', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'POST' Link 

	casper.wait(7000,function( ){
		this.capture(screenShotsDir+ 'replyTopic.png');
	});

	// Verify Posted Reply
	casper.then(function() {
		verifyPostReply(json['replyTopic'].content, casper, function() {
			casper.log('checking reply post', 'info');
		});
	});

	//Logout From App

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.log('Successfully logout from application');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});

};


/************************************PRIVATE METHODS***********************************/

// method for reply topic on any post

var replyTopic = function(content, driver, callback) {
	driver.click('form[name="posts"] h4 a');
	driver.then(function() {
		this.sendKeys('#message', content);
	});
	driver.wait(7000, function() {
		this.withFrame('message_ifr', function() {
			this.log('enter message in iframe', 'info');
	 		this.sendKeys('#tinymce', content);
			this.capture(screenShotsDir+ 'replyContent.png');	
		});
	});

	driver.then(function(){
		this.click('#reply_submit');
	});
	
	return callback();
};


// method for verify latest replied topic on the post

var verifyPostReply = function(content, driver, callback) {
	var elementId = driver.evaluate(function() {
		var element = document.querySelectorAll("span[id^='post_message_']");
		var id = element[element.length-1].id;
		return id;	
	});

	var contentMsg = driver.fetchText("#"+elementId);
	driver.log('************ contentMsg : ' +contentMsg, 'info');
	driver.log('************ content : ' +content, 'info');
	if(contentMsg.trim() == content.trim()) {
		driver.log('Successfully content verified', 'info');
	} else {
		driver.log('Error occured in verifying content', 'error');
		driver.capture(screenShotsDir+ 'contentError.png');
	}
	return callback();
};

