/****This script is dedicated for user to delete topic from forum. It covers testing of topic page with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var deleteTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'deleteTopic/';

deleteTopic.featureTest = function(casper) {
		
	//Open Forum URL And Get Title 

	casper.start(config.url, function() {
		this.log('Title of the page :' +this.getTitle(), 'info');
	});

	//Login To App

	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.log('user has successfully login to application with valid username and password', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});

	//Delete Topic

	casper.then(function() {
		deleteTopic(casper, function() {
			casper.log('topic deleted', 'info');		
		});
	});
	
	//Getting Screenshot After Clicking On 'Delete' Icon
 
	casper.wait(10000,function() {
		this.capture(screenShotsDir+ 'deletedTopic.png');
	});

	//Log Out From App

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.log('Successfully logout from application', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});
};

/************************************PRIVATE METHODS***********************************/

// method for delete topic 

var deleteTopic = function(driver, callback) {
	driver.click('div.panel-body input.entry-checkbox');
	driver.then(function() {
		var topicTitle = driver.fetchText('.topic-title');
		this.log('++++++++++++++++++++++++++++++++++++topic Title : ' +topicTitle, 'info');
	});
	driver.then(function() {
		this.click('a#delete');
	});
	return callback();
};


