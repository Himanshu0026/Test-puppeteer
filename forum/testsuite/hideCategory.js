/****This script is dedicated for Admin to move topic/post on the forum. It covers testing of move topic/post with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var hideCategory = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'hideUnHide/';

hideCategory.hideCategoryFeature = function(casper, test, x) {

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
		
	/*****Hide category and verify hidden category in Modify filter*****/
	casper.then(function() {
		casper.echo('Hide category and verify hidden category in Modify filter', 'INFO');
		this.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'category.png');
			});
		});
		this.then(function() {
			var selectCategory = json.hideUnHideCategory.categoryName;
			var classVal = x("//a/span[text()='"+selectCategory+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('a[href="'+href+'"]');
			var hideButtonId = href.split('=');
			test.assertExists('a[data-forumid="517180"]');
			this.click('a[data-forumid="517180"]');
			this.wait(4000, function(){
				test.assertDoesntExist('a[href="'+href+'"]');
				casper.echo('successfully verified category is hide');
			});
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'selectedCategory.png');
			});
		});

	});
	//Log Out From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully logout from application', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link
	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});
};

/************************************PRIVATE METHODS***********************************/



