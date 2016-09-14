/****This script is dedicated for Admin to move topic/post on the forum. It covers testing of move topic/post with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../../config/config.json');

var backArrow = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'backArrow/';

backArrow.backArrowFeature = function(casper, test, x) {

	//start from forum url
	casper.start(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
		
	/*****Verify back arrow on topic listing page*****/
	casper.then(function() {
		casper.echo('Verify back arrow on topic listing page', 'INFO');
		this.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'category.png');
			});
			this.then(function() {
				test.assertExists('a[href="/?forum=517180"]');
				this.click('a[href="/?forum=517180"]');
			});
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'selectedCategory.png');
			});
			this.then(function() {
				test.assertExists('#back_arrow_topic');
				this.click('#back_arrow_topic');	
			});
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'clickOnBackarrow.png');
			});
		});
	});
	
	/*****Verify with sorting options like latest/new/top*****/
	casper.then(function() {
		casper.echo('Verify with sorting options like latest/new/top', 'INFO');
		this.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'category.png');
			});
			this.then(function() {
				test.assertExists('a[href="/?forum=517180"]');
				this.click('a[href="/?forum=517180"]');
			});
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'selectedCategory.png');
			});

			this.then(function() {
				test.assertExists('a[href="/?forum=517180&sort=date&order=desc"]');
				this.click('a[href="/?forum=517180&sort=date&order=desc"]');
				this.wait(7000, function() {
					this.capture(screenShotsDir+ 'clickOnNew.png');
				});	
			});

			this.then(function() {
				test.assertExists('#back_arrow_topic');
				this.click('#back_arrow_topic');	
			});
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'clickOnBackarrow.png');
			});
		});
	});
	
};

/************************************PRIVATE METHODS***********************************/



