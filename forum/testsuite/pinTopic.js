/****This script is dedicated for user poll on the forum. It covers testing of 'Poll Tab' with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js'); 
var config = require('../config/config.json');

var pinTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'pinTopic/';

pinTopic.pinUnPinFeature = function(casper, test, x, callback) {
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.log('Title of the page :' +this.getTitle());
	});

	//Login to app
	casper.then(function(){
		forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
			casper.log('Admin has successfully login to application with valid username and password', 'INFO');
		});
	});
	
	//Getting Screenshot After Clicking On 'Log In' Link 
	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});

	/*****Pin any topic and Verify Pin icon of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of topic listing page[Home page]', 'INFO');
		var postTitle = json['pin/unPin'].topicTitle;
		casper.echo('pin topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'pin', 'Pin/Un-pin', casper, function() {});

	});

	//verify pin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
		casper.echo('pin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****unPin any topic and Verify unPin icon of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('unPin any topic and Verify unPin icon of topic listing page[Home page]', 'INFO');
		var postTitle = json['pin/unPin'].topicTitle;
		casper.echo('unpin topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'unpin', 'Pin/Un-pin', casper, function() {});

	});

	//verify unPin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
		casper.echo('unPin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****Pin any topic and Verify Pin icon of post listing page under category*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of post listing page under category', 'INFO');
		test.assertExists('a[href="/categories"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('a[href="/categories"]');
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'category.png');
		});
		casper.then(function() {
			var classVal = x("//h3/a/span/parent::a");
			var href = this.getElementAttribute(classVal, "href"); 
			test.assertExists('h3 a[href="'+href+'"]');
			casper.echo('---------------------------------------------------------------------------');
			this.click('h3 a[href="'+href+'"]');
		});
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'categoryTopicList.png');
		});
		casper.then(function() {
		
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'pin', 'Pin/Un-Pin', casper, function() {});
	
		});
	});

	//verify pin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
		casper.echo('pin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****unPin any topic and Verify unPin icon of post listing page under category*****/
	casper.then(function() {
		casper.echo('unPin any topic and Verify unPin icon of post listing page under category', 'INFO');
		casper.then(function() {
		
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('unpin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'unpin', 'Pin/Un-Pin', casper, function() {});
	
		});
	});

	//verify unPin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
		casper.echo('unPin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****pin topic from Profile page and verify pin topic*****/
	casper.then(function() {
		casper.echo('pin topic from Profile page and verify pin topic', 'INFO');
		test.assertExists('li.user-panel .dropdown-toggle');
		casper.echo('---------------------------------------------------------------------------');		
		this.click('li.user-panel .dropdown-toggle');
		this.capture(screenShotsDir+ 'dropdown.png');
		test.assertExists('span.user-nav-panel li a[href^="/profile"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('span.user-nav-panel li a[href^="/profile"]');
		this.wait(7000, function() {
			this.capture(screenShotsDir+ 'profile.png');
		});
		casper.then(function() {
			test.assertExists('#Topics_Started');
			casper.echo('---------------------------------------------------------------------------');
			this.click('#Topics_Started');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'topicsStarted.png');
			});
		});
		casper.then(function() {
			if(this.exists('div.alert-info')){
				var warningMsg = this.fetchText('div.alert-info');
				test.assertEquals(warningMsg.trim(), json['pin/unPin'].warningMessage, warningMsg.trim()+' and verified warning message');
			} else {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('pin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a[text()='"+postTitle+"']"); 
				selectTopic(classVal, 'pin', 'Pin/Un-Pin', casper, function() {});
				//verify pin topic
				casper.then(function() {
					var postTitle = json['pin/unPin'].topicTitle;
					casper.echo('pin topic title : ' +postTitle, 'INFO');
					test.assertExists(x("//a[text()='"+postTitle+"']/following::span/i")); 
					casper.echo('---------------------------------------------------------------------------');
					casper.echo('pin topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				});
			}
		});
	});

	
	/*****un-pin topic from Profile page and verify un-pin topic*****/
	casper.then(function() {
		casper.echo('unPin topic from Profile page and verify unPin topic', 'INFO');
		if(this.exists('div.alert-info')){
			var warningMsg = this.fetchText('div.alert-info');
			test.assertEquals(warningMsg.trim(), json['pin/unPin'].warningMessage, warningMsg.trim()+' and verified warning message');
		} else {
			casper.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('un-pin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a[text()='"+postTitle+"']"); 
				selectTopic(classVal, 'unpin', 'Pin/Un-Pin', casper, function() {});
			});
			//verify un-pin topic
			casper.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('un-pin topic title : ' +postTitle, 'INFO');
				test.assertDoesntExist(x("//a[text()='"+postTitle+"']/following::span/i[@class='glyphicon-pushpin']")); 
				casper.echo('un-pin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		}
	});

	return callback();
};

/************************************PRIVATE METHODS***********************************/

var selectTopic = function(topicVal, eleStatus, dropdownTitle, driver, callback) {
	var href = driver.getElementAttribute(topicVal, "href");
	href = href.split('-');
	var id = href[1].split('?');
	driver.click('input[value="'+id[0]+'"]');
	driver.wait(3000, function() {
		this.capture(screenShotsDir+ 'checked.png');
	});
	driver.then(function() {
		this.test.assertExists('a[data-original-title="'+dropdownTitle+'"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('a[data-original-title="'+dropdownTitle+'"]');
		this.test.assertExists('#' +eleStatus);
		casper.echo('---------------------------------------------------------------------------');
		this.click('#' +eleStatus);
	});
	driver.wait(7000, function() {
		this.capture(screenShotsDir +eleStatus +'.png');
	});
	return callback();
};

