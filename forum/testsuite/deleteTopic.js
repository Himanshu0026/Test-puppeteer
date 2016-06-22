/****This script is dedicated for user to delete topic from forum. It covers testing of topic page with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var deleteTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'deleteTopic/';

deleteTopic.featureTest = function(casper, test) {
		


	//Open Forum URL And Get Title 

	casper.start(config.url, function() {
		this.log('Title of the page :' +this.getTitle(), 'info');
		test.assertTitle('Automation Forum', 'page has the correct title');
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
		casper.echo('deleting topic');
		this.click('div.panel-body input.entry-checkbox');
		var val1 = this.evaluate(function(){
			var elm = document.querySelector('.entry-checkbox:checked');
			var checkedValue = elm.value;
			return checkedValue;
		});

		if(test.assertExists('li.selectedRow span.topic-content a.topic-title span')) {
			this.click('a#delete');
		}	

		casper.wait(7000, function() {
			this.click('div.panel-body input.entry-checkbox');
			var val2 = this.evaluate(function(){
				var elm = document.querySelector('.entry-checkbox:checked');
				var checkedValue = elm.value;
				return checkedValue;
			});
			test.assertNotEquals(val1,val2);
			casper.echo('deleted post is verified');
		});		
	});
	
	//Getting Screenshot After Clicking On 'Delete' Icon
 
	casper.wait(10000,function() {
		this.capture(screenShotsDir+ 'deletedTopic.png');
	});
	
	//Delete All Topic
	casper.then(function(){
		casper.echo('deleting all topic');
		var checked = this.click('div.panel-heading input[name = "allbox"]');
		this.capture(screenShotsDir+ 'SelectAllForDelete.png');	
		console.log('checked : '+checked);
		test.assertEquals(checked,true);
		this.click('a#delete');
	});
	
	//Getting Screenshot After Clicking On 'Delete' Icon
 
	casper.wait(10000,function() {
		this.capture(screenShotsDir+ 'deletedAllTopic.png');
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


/*var deleteAllTopic = function(driver, callback){
	
	driver.click('div.panel-heading input[name = "allbox"]');
	driver.capture(screenShotsDir+ 'SelectAllForDelete.png');
	driver.then(function() {
		this.click('a#delete');
	});
	return callback();
};*/


