/****This script is dedicated for Admin to hide/un-hide category on the forum. It covers testing of hide/un-hide category with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../../config/config.json');

var hideCategory = module.exports = {};
hideCategory.errors = [];
var screenShotsDir = config.screenShotsLocation + 'hideUnHide/';

hideCategory.hideCategoryFeature = function(casper, test, x) {
	var selectCategory = json.hideUnHideCategory.categoryName;
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		hideCategory.errors.push(msg);
	});
	//start from forum url
	casper.start(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function(err) {
				if(!err) {
					casper.echo('Admin has been successfuly login to application', 'INFO');
				}
			});
		});
	});

	casper.thenOpen(config.url, function() {
		test.assertExists('a[href="/categories"]');
		this.click('a[href="/categories"]');
		this.waitForSelector('.tab-content', function success() {
			if(this.exists(x('//a/span[text()="'+selectCategory+'"]/parent::a')))
			{
				/*****Hide category and verify hidden category in Modify filter*****/
				casper.then(function() {
					casper.echo('Hide category and verify hidden category in Modify filter', 'INFO');
					var classVal = x('//a/span[text()="'+selectCategory+'"]/parent::a');
					var href = this.getElementAttribute(classVal, "href");
					if(!href){
						this.echo("Not found href for category: "+selectCategory);
						selectCategory = this.evaluate(function(){
							return document.querySelector('.tab-content ul li:nth-child(1) span.forum-title').innerText;;
						});
						this.echo("selectCategory : "+selectCategory);
						var classVal = x('//a/span[text()="'+selectCategory+'"]/parent::a');
						href = this.getElementAttribute(classVal, "href");
						this.echo("current href : "+ href);
					}
					this.echo("current href : "+href);	
					test.assertExists('a[href="'+href+'"]');
					var hideButtonId = href.split('=');
					casper.echo('hideButtonId : ' +hideButtonId[1]);
					test.assertExists('a[data-forumid="'+hideButtonId[1]+'"]');
					this.click('a[data-forumid="'+hideButtonId[1]+'"]');
					this.wait(2000, function() {
						this.reload(function() {
							//verify after hiding category
							this.wait(2000, function(){
								test.assertDoesntExist(x('//a/span[text()="'+selectCategory+'"]'));
								casper.echo('successfully verified category is hide', 'INFO');
							});
						});
					});
				});

				/*****Deselect particular category from Filter Category and check that category is showing in the list*****/
				casper.then(function() {
					casper.echo('Deselect particular category from Filter Category and check that category is showing in the list', 'INFO');
					test.assertExists('a[href="#filter-modal"]');
					this.click('a[href="#filter-modal"]');
					this.waitForSelector('form[action="/forums"] div#alertMsg', function success() {
						test.assertExists('form[action="/forums"] div#alertMsg');
						var info = this.fetchText('form[action="/forums"] div#alertMsg');
						casper.echo('dialog info : ' +info);
						test.assertEquals(info.trim(),json.hideUnHideCategory.infoMessage, 'info message is verified');
			
					}, function fail(err) {
						casper.echo(err);
					});

					this.waitForSelector('li.list-group-item', function success() {
						test.assertExists('li.list-group-item');
						this.click('li.list-group-item');
						this.waitForSelector('#apply_forum_filter', function success() {
							test.assertExists('#apply_forum_filter');
							this.click('#apply_forum_filter');
						}, function fail(err) {
							casper.echo(err);
						});
					}, function fail(err) {
						casper.echo(err);
					});

					//verify un-hide category
					this.waitForSelector('.table-responsive', function success() {
						test.assertExists(x('//a/span[text()="'+selectCategory+'"]'));
						casper.echo('successfully verified category is un-hide', 'INFO');
					}, function fail(err) {
						casper.echo(err);
					});
		
				});
	
				/*****Check Clear Filter functionality to stop hiding hidded category*****/
				casper.then(function() {
					var classVal = x('//a/span[text()="'+selectCategory+'"]/parent::a');
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists('a[href="'+href+'"]');
					var hideButtonId = href.split('=');
					casper.echo('hideButtonId : ' +hideButtonId[1]);
					test.assertExists('a[data-forumid="'+hideButtonId[1]+'"]');
					this.click('a[data-forumid="'+hideButtonId[1]+'"]');
					this.wait(2000, function() {
						this.reload(function() {
							//verify after hiding category
							this.wait(2000, function(){
								test.assertDoesntExist(x('//a/span[text()="'+selectCategory+'"]'));
								casper.echo('successfully verified category is hide', 'INFO');
							});
						});
					});

					this.waitForSelector('a[href="#filter-modal"]', function success() {
						test.assertExists('a[href="#filter-modal"]');
						this.click('a[href="#filter-modal"]');
						this.wait(2000);
						this.waitForSelector('form[action="/forums"] div#alertMsg', function success() {
							test.assertExists('form[action="/forums"] div#alertMsg');
							var info = this.fetchText('form[action="/forums"] div#alertMsg');
							casper.echo('dialog info : ' +info);
							test.assertEquals(info.trim(),json.hideUnHideCategory.infoMessage, 'info message is verified');
						}, function fail(err) {
							casper.echo(err);
						});

						this.waitForSelector('#clear_forum_filter', function success() {
							test.assertExists('#clear_forum_filter');
							this.click('#clear_forum_filter');
							test.assertExists('#apply_forum_filter');
							this.click('#apply_forum_filter');
						}, function fail(err) {
							casper.echo(err);
						});

						//verify un-hide category
						this.waitForSelector('.table-responsive', function success() {
							test.assertExists(x('//a/span[text()="'+selectCategory+'"]'));
							casper.echo('successfully verified category is un-hide', 'INFO');
						}, function fail(err) {
							casper.echo(err);
						});
					}, function fail(err) {
						casper.echo(err);
					});
				});
			} else {
				casper.echo('Error occurred i.e. category does Not Exists', 'INFO');
			}
		}, function fail(err) {
			casper.echo(err);
		});
	});
			
	
	//Log Out From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(err) {
			if(!err) {
				casper.echo('Successfully logout from application', 'INFO');
			}
		});
	});
};

/************************************PRIVATE METHODS***********************************/



