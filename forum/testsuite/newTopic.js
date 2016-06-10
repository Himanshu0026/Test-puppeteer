/****This script is dedicated for start new topic on the forum. It covers testing of topic detail page with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var newTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'newTopic/';

newTopic.featureTest = function(casper) {
	
	//Open Forum URL And Get Title 

	casper.start(config.url, function() {
		this.log('Title of the page :' +this.getTitle(), 'info');
	});

	//Login To App

	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.log('User has been successfuly login to application', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});

	//GO TO NEW TOPIC PAGE
 
	casper.then(function(){
		gotoNewTopicpage(casper, function() {
			casper.log('started to new topic', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'START NEW TOPIC' Link

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'newTopic.png');
	});

	//POST NEW TOPIC PAGE
 
	casper.then(function() {
		postTopicpage(json['newTopic'].title, json['newTopic'].content, json['newTopic'].category, casper, function() {
			casper.log('Successfully Posted New Topic ', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Post' Link

	casper.wait(7000,function() {
		this.capture(screenShotsDir+ 'postedTopic.png');
	});

	//CHECK POST CONTENT

	casper.then(function() {
		verifyPostTopicContent(json['newTopic'].content, casper, function() {
			casper.log('verified content post topic', 'info');
		});
	});

	//LOGOUT FROM APP

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.log('Successfully logout from application', 'info');
		});
	});
	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});
};

//private methods


/************************************PRIVATE METHODS***********************************/


// method for goto New Topic page to application

var gotoNewTopicpage = function(driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	return callback();
};


// method for goto New Topic page to application

var postTopicpage = function(title, content, category, driver, callback) {
	driver.sendKeys('input[name="subject"]', title);
	 driver.withFrame('message_ifr', function() {
		driver.log('enter message in iframe', 'info');
 		driver.sendKeys('#tinymce', content);
		driver.capture(screenShotsDir+ 'content.png');	
	});
	driver.click('#all_forums_dropdown');
	driver.fill('form[name="PostTopic"]',{
		'forum' : category
	},false);
	
	//code for open insert image model

	/*driver.click('#insert_image_dialog_');
    	driver.then(function() {
		this.waitForSelector('div#insertimagemodal', function() {
			this.echo('****************************************see the modal!', 'info');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'screenshotofmodal.png');
			});
		});
	});
	driver.then(function() {
		driver.click('div#uploadImage a#insertImage_');
		this.wait(10000, function(){
			this.capture(screenShotsDir+ 'browse.png');
		});	
	});*/

	driver.then(function() {
		this.click('#previewpost_sbt');
		this.wait(10000, function() {
			driver.capture(screenShotsDir+ 'previewPost.png');
		});
	});
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback();
};


// method for goto New Topic page to application

var verifyPostTopicContent = function(content, driver, callback) {
	var contentMsg = driver.fetchText('div.post-body-content span[id^="post_message_"]');
	driver.log('************ contentMsg : ' +contentMsg, 'info');
	driver.log('************ content : ' +content, 'info');
	if(contentMsg.trim() == content.trim()){
		driver.log('Successfully content verified', 'info');
	} else {
		driver.log('Error occured in verifying content', 'error');
		driver.capture(screenShotsDir+ 'contentError.png');
	}
	return callback();
};
