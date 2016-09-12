'use strict';
var utils = require('./utils.js');
var forumRegister = require('./register.js');
var generalPermission = require('./generalPermission.js');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');
var json = require('../testdata/editData.json');

var forumListingPage = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'forumListingPage/';
var page = require('webpage').create();

forumListingPage.featureTest = function(casper, test) {

	casper.start();
	
	/*casper.then(function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO ADD THE HEADING ON THE CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		//Open Back-end Url And Get Title
		casper.thenOpen(config.backEndUrl, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
			try {
				this.click('a[href="/tool/members/login?action=logout"]');
			}catch(e) {
				test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}
		});
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function(err) {
				if(!err) {
					casper.echo('Logged-in successfully from back-end', 'INFO');
					casper.waitForSelector('div#my_account_forum_menu', function success() {
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_cat"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_cat"]');
							this.sendKeys('div.select input[type="text"]', 'changed heading', {reset : true});
							this.click('div.select');
							casper.wait(1000, function() {
								this.capture('demo.png');
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});*/
	
	casper.then(function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO EDIT THE HEADING ON THE CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		//Open Back-end Url And Get Title
		/*casper.thenOpen(config.backEndUrl, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
			try {
				this.click('a[href="/tool/members/login?action=logout"]');
			}catch(e) {
				test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}
		});
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function(err) {
				if(!err) {
					casper.echo('Logged-in successfully from back-end', 'INFO');
					casper.waitForSelector('div#my_account_forum_menu', function success() {
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_cat"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_cat"]');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(3) div.select');
							casper.waitForSelector('div#sortable ul.ui-sortable li:nth-child(3) a.manageAction', function success() {
								this.click('div#sortable ul.ui-sortable li:nth-child(3) a.manageAction');
								this.click('a.editCategory');
								this.sendKeys('div.select input[type="text"]', 'changed heading', {reset : true});
								this.click('div.select');
								casper.wait(1000, function() {
									this.capture('demo.png');
								});
							}, function fail() {
							
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});*/
		
		//Open Front End URL And Verify Heading On Category Page
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="#forums"]', function success() {
						this.click('a[href^="#forums"]');
						casper.waitForSelector('div.panel-heading', function success() {
							var heading = this.fetchText('div.panel-heading h4');
							this.echo('Heading : '+heading, 'INFO');
							this.echo('changed heading is verified', 'INFO');
						}, function fail() {
						
						});
					}, function fail() {
				
					});
				}else {
			
				}
			});
		});
	});
};

//*************************************************PRIVATE METHODS***********************************************
