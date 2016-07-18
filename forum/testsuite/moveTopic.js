/****This script is dedicated for Admin to move topic/post on the forum. It covers testing of move topic/post with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var moveTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'moveTopic/';

moveTopic.moveTopicFeature = function(casper, test, x) {

	//start from forum url
	casper.start(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
		
	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
			casper.echo('Admin has been successfuly login to application', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 
	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});
	
	/*****Move topic/post from the post approval page.*****/
	casper.then(function() {
		test.assertExists('a[href="/categories"]');
		this.click('a[href="/categories"]');
		this.wait(7000, function() {
			this.capture(screenShotsDir+ 'categoryPage.png');				
		});
		this.then(function() {
			var moveToCategory = json.moveTopic.moveToCategory2;
			var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");

			test.assertExists('a[href="'+href+'"]');
			this.click('a[href="'+href+'"]');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'clickCategory.png');
			});
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory1;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.wait(7000,function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
			
		});

		//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.wait(7000, function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");

				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.wait(7000, function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});

			});
			this.then(function() {
				var topicTitle = json.moveTopic.topicName;
				test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
				casper.echo('move topic is verified', 'INFO');
			});
		});
	});

	/*****Move topic/post from lopic listing page.*****/
	casper.then(function() {
		this.thenOpen(config.url, function() {
			casper.echo('hit on url : '+config.url, 'INFO');
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory2;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.wait(7000,function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
			
		});

		//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.wait(7000, function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");

				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.wait(7000, function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});

			});
			this.then(function() {
				var topicTitle = json.moveTopic.topicName;
				test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']/parent::a"));
				casper.echo('move topic is verified', 'INFO');
			});
		});
	});
};

/************************************PRIVATE METHODS***********************************/

var selectTopic = function(topicVal, eleStatus, driver, callback) {
	var href = driver.getElementAttribute(topicVal, "href");
	href = href.split('-');
	var id = href[1].split('?');
	driver.click('input[value="'+id[0]+'"]');
	driver.wait(2000, function() {
		this.capture(screenShotsDir+ 'checked.png');
	});
	driver.then(function() {		
		this.test.assertExists('#' +eleStatus);
		casper.echo('---------------------------------------------------------------------------');
		this.click('#' +eleStatus);
	});
	driver.wait(7000, function() {
		this.capture(screenShotsDir +eleStatus +'.png');
	});
	return callback();
};



