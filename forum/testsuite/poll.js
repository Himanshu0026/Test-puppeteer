/****This script is dedicated for user poll on the forum. It covers testing of 'Poll Tab' with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var poll = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'poll/';

poll.featureTest = function(casper) {
	
	//Open Forum URL And Get Title 
	
	casper.start(config.url, function() {
		this.log('Title of the page :' +this.getTitle());
	});

	//Login to app

	casper.then(function(){
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.log('user has successfully login to application with valid username and password', 'info');
		});
	});
	
	//Getting Screenshot After Clicking On 'Log In' Link 

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});

	//Go To Poll Page
 
	casper.then(function() {
		gotoNewPollpage(casper, function() {
			casper.log('redirect to Poll', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Poll' Link 

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'newPoll.png');
	});

	//Post Poll Data 

	casper.then(function() {
		savePollPage(json['poll'].pollQues, json['poll'].publicCheckbox, json['poll'].option1, json['poll'].option2, json['poll'].multiple, json['poll'].timeoutFormate, casper, function() {
			casper.log('poll posted successfully', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Save Poll' Link

	casper.wait(7000,function() {
		this.capture(screenShotsDir+ 'savePoll.png');
	});

	//Logout From App

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

// method for go to new poll to application

var gotoNewPollpage = function(driver, callback) {
	driver.click('a[href="/post/printadd"]');
	driver.then(function() {
		this.capture(screenShotsDir+ 'TopicDetails.png');
		this.click('ul li a[href="#poll"]');
	});
	return callback();
};

// method for go to save new poll  to application

var savePollPage = function(pollQues, publicCheckbox, option1, option2, multiple, timeoutFormate, driver, callback) {
	driver.sendKeys('#poll_question', pollQues);
	driver.sendKeys('input[name="public"]', publicCheckbox);
	driver.sendKeys('#poll_option_1 div input', option1);
	driver.sendKeys('#poll_option_2 div input', option2);
	driver.wait(5000, function() {
		this.click('a[href="#poll-timeout"] .text-muted');
		this.capture(screenShotsDir+ 'fillPoll.png');
	});
	driver.click('#save_poll');
};

