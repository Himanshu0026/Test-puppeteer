/****This script is dedicated for user poll on the forum. It covers testing of 'Poll Tab' with all defined validations****/

"use strict";

var utils = require('./utils.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var forumRegister = require('./register.js');
var config = require('../../config/config.json');

var poll = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'poll/';

poll.pollFeature = function(casper, test, x, callback) {
	
	//Login To Backend URL and disable post poll checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable post poll checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		//forumRegister.loginToForumBackEnd(casper, test, function(err) { (rm)
			//if(!err) {
				casper.echo('User has been successfuly login to backend', 'INFO');
				//go to user permission
				utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
					if(!err) {
						casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
						//click on checkbox
						casper.waitForSelector('#post_polls', function success() {
							utils.enableorDisableCheckbox('post_polls', false, casper, function(err) {	
								if(!err) {
									casper.echo("post poll checkbox has been disabled", 'INFO');
									//click on save button
									utils.clickOnElement(casper, '.btn-blue', function(err) {
										if(!err) {
											casper.echo('Saving Changes', 'INFO');
											//verify Permission Setting Message
											casper.waitForSelector('p[align="center"] font.heading', function success() {
												verifyPermissionSettingMsg(casper, function(err) {
													if(!err) {
														casper.echo('verifying Permission Setting Message', 'INFO');	
													}
												});
											}, function fail(err){
												casper.echo(err);						
											});
										}
									});
								}
							});
						}, function fail(err) {
							casper.echo(err);
						});
					}
				});
			//}
		//});
	});											

	/*****test case to verify poll tab, register user can not post polls after disabling permission*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case to verify poll tab, register user can not post polls after disabling permission', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//login with register user
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
				casper.waitForSelector('.wt-body', function success() {
					casper.click('a[href="/post/printadd"]');
					casper.waitForSelector('.content-panel', function success() {
						test.assertDoesntExist('ul li a[href="#poll"]');
						casper.echo('you do not have permission to create polls go to the user group permission to to enable check box');
						casper.echo('---------------------------------------------------------------------------');
					}, function fail(err) {
						casper.echo(err);			
					});
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});

	//go to backend url enable post poll feature
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('go to backend url enable post poll feature', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		//go to user permission
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
			if(!err) {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				//click on checkbox
				casper.waitForSelector('#post_polls', function success() {
					utils.enableorDisableCheckbox('post_polls', true, casper, function(err) {
						if(!err) {
							casper.echo("post poll checkbox has been enabled", 'INFO');
							//click on save button
							utils.clickOnElement(casper, '.btn-blue', function(err) {
								if(!err) {
									casper.echo('Saving Changes', 'INFO');
									//verify Permission Setting Message
									casper.waitForSelector('p[align="center"] font.heading', function success() {
										verifyPermissionSettingMsg(casper, function(err) {
											if(!err) {
												casper.echo('verifying Permission Setting Message', 'INFO');
											}
										});
									}, function fail(err){
										casper.echo(err);						
									});
								}
							});
						}
					});
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});	
	
	
	/*****test case to submit poll by leaving poll question field blank and verify error message*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case to submit poll by leaving poll question field blank and verify error message', 'INFO');
		casper.echo('title of the page : ' +this.getTitle(), 'INFO');
		casper.waitForSelector('a[href="/post/printadd"]', function success() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
				if(!err) {
					casper.echo('START NEW TOPIC with valid credential', 'INFO');
					casper.wait(4000, function() {
						//go to new poll
						gotoNewPollpage(casper, function(err) {
							if(!err) {
								casper.echo('go to Poll', 'INFO');
								//Post Poll by filling blank poll question
								casper.waitForSelector('#poll_question', function success() {
									savePollPage(json['poll'].blankPollQues, casper, function(err) {
										if(!err) {
											casper.log('posting poll', 'INFO');
											//verify error message
											casper.waitForSelector('input[data-original-title]', function success() {
												casper.mouse.move('#poll_question');
												var errMsg = casper.evaluate(function() {
													var element = document.querySelector('#poll_question');
													return element.getAttribute('data-original-title');
												});
												casper.echo('*********** error message : ' +errMsg);
												test.assertEquals(errMsg.trim(), json.poll.blankPollQues.ExpectedErrorMessage.trim(), errMsg.trim()+' and verified error message');
												casper.echo('---------------------------------------------------------------------------');
											}, function fail(err) {
												casper.echo(err);
											});
										}
									});	
								}, function fail(err) {
									casper.echo(err);				
								});
							}
						});
					});
				}
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});
		
	
	/*****test case to submit poll by leaving option1 field blank and verify error message*****/	
	casper.then(function() {
			casper.echo('test case to submit poll by leaving option1 field blank and verify error message', 'INFO');	 
			this.on('remote.alert', testAlert1);
			savePollPage(json['poll'].blankOption1, casper, function(err) {
				if(!err) {
					casper.log('poll posted successfully', 'INFO');
				}
			});
	});
	
	casper.then(function() {
		this.removeListener('remote.alert', testAlert1);
	});

	/*****test case to submit poll by leaving option2 field blank and verify error message*****/
	casper.then(function() {
		casper.echo('test case to submit poll by leaving option2 field blank and verify error message', 'INFO');
		this.on('remote.alert', testAlert2);
		savePollPage(json['poll'].blankOption2, casper, function(err) {
			if(!err) {
				casper.log('poll posted successfully', 'INFO');
			}
		});
	});

	//wait for 3 second to remove listener2
	casper.wait(3000, function() {});
	casper.then(function() {
		this.removeListener('remote.alert', testAlert2);
	});

	/*****test case to submit poll by filling with all contents with valid credintial and verify posted polls*****/
	//Post Poll Data 
	casper.then(function() {
		casper.echo('test case to submit poll by filling with all contents with valid credintial and verify posted polls', 'INFO');
		savePollPage(json['poll'].vadidCredintial, casper, function(err) {
			if(!err) {
				casper.log('poll posted successfully', 'info');
				casper.waitForSelector('form[action="/poll/pollvotesave"]', function success() {
					test.assertExists('form[action="/poll/pollvotesave"] h2');
					casper.echo('---------------------------------------------------------------------------');
					var message = this.fetchText('form[action="/poll/pollvotesave"] h2');
					var spanText = this.fetchText('form[action="/poll/pollvotesave"] h2 span').trim();
					message = message.replace(spanText, '');
					test.assertEquals(message.trim(), json.poll.vadidCredintial.pollQues, message.trim()+' and verified pool question');		
					casper.echo('---------------------------------------------------------------------------');
	
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});

	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(err) {
			if(!err) {
				casper.log('Successfully logout from application', 'info');
			}
		});
	});

	function testAlert1(message) {
		casper.echo('message: '+message, 'INFO');
  		test.assertEquals(message, json.poll.blankOption1.ExpectedErrorMessage.trim(), message+' and verified error message');
		casper.echo('---------------------------------------------------------------------------');
	};

	function testAlert2(message) {
		casper.echo('message : '+message, 'INFO');
    		test.assertEquals(message, json.poll.blankOption1.ExpectedErrorMessage.trim(), message+' and verified error message');
		casper.echo('---------------------------------------------------------------------------');
	};
	return callback();
};

/************************************PRIVATE METHODS***********************************/

// method for go to new poll to application

var gotoNewTopic = function(data, driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	driver.waitForSelector('#message_ifr', function success() {
	 	this.sendKeys('input[name="subject"]', data.title, {reset:true});
		this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
	 		this.sendKeys('#tinymce', data.content);
		});	
		driver.waitForSelector('#all_forums_dropdown', function success() {
			this.click('#all_forums_dropdown');
			var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
			this.fill('form[name="PostTopic"]',{
				'forum' : val.trim()
			},false);
		}, function fail() {
			casper.echo(err);
		});
	}, function fail() {
		casper.echo(err);
	});
	return callback(null);
};

var gotoNewPollpage = function(driver, callback) {
	driver.then(function() {
		this.test.assertExists('ul li a[href="#poll"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('ul li a[href="#poll"]');
	});
	return callback(null);
};

// method for go to save new poll  to application

var savePollPage = function(data, driver, callback) {
	driver.sendKeys('#poll_question', data.pollQues, {reset:true});
	driver.sendKeys('input[name="public"]', data.publicCheckbox);
	driver.sendKeys('#poll_option_1 div input', data.option1, {reset:true});
	driver.sendKeys('#poll_option_2 div input', data.option2, {reset:true});
	driver.click('a[href="#poll-timeout"] small.text-muted');
	
	//driver.then(function() {
		driver.click('#save_poll');
	//});
	return callback(null);
};

//verify message after update users group setting
var verifyPermissionSettingMsg = function(driver, callback) {
	var msg  = driver.fetchText('p[align="center"] font.heading');
	driver.test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and message verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback(null);
}; 
