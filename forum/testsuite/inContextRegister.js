/****This script is dedicated for In Context new user registration on the forum. It covers testing of registration page with all defined validations****/
'use strict';
var utils = require('./utils.js');
var forumRegister = require('./register.js');
var inContextRegisterJSON = require('../testdata/inContextRegisterData.json');
var config = require('../config/config.json');

var inContextForumRegister = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'inContextRegister/';

inContextForumRegister.featureTest = function(casper, test) {
	
	//Login To Forum BackEnd 
	casper.start(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			
			//Clicking On 'Group Permissions' Link Under 'Users' Tab 
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function success(){
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			}, function fail() {
				casper.echo("Error Occurred", "ERROR");
			});
		});
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Unregistered / Not Logged In') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		casper.click('a[href="'+grpName+'"]');
		//Disabling 'Start Topics' Option And 'Save'
		casper.waitForSelector('#post_threads', function success(){
			test.assertExists('#post_threads');
			utils.enableorDisableCheckbox('post_threads', false, casper, function() {
				casper.echo("Start Topics Checkbox Has Been Disabled For Un-Registered User", 'INFO');
				casper.click('button.button.btn-m.btn-blue');
			
				//Verifying 'Success Message' After Saving Settings
				casper.waitForSelector('div#tab_wrapper .heading[color="red"]', function success(){
					var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedErrorMsg = 'Your user group settings have been updated.';
					test.assertEquals(message, expectedErrorMsg);
					test.assertExists('a[href="/tool/members/login?action=logout"]');
					this.click('a[href="/tool/members/login?action=logout"]');
				}, function fail() {
					casper.echo("Error Occurred", "ERROR");
				});
			});
		}, function fail() {
			casper.echo("Error Occurred", "ERROR");
		});
	});
	
	//Open Forum Front End URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION FROM START NEW TOPIC REGISTER LINK', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		
		//Clicking On Start New Topic Button
		test.assertExists('div#topics a[href="/post/printadd"]');
		this.click('div#topics a[href="/post/printadd"]');
		
		//Clicking On Top 'Register' Link 
		casper.waitForSelector('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]', function success(){
			test.assertExists('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
			this.click('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
			casper.waitForSelector('form[name="PostTopic"]', function success(){
			
				//Filling Valid Data On Registration Form
				forumRegister.registerToApp(inContextRegisterJSON['registerLink'], casper, function(err) {
					if (err) {
						casper.echo("Error Occurred In Callback", "ERROR");
					} else {
						casper.echo('Processing to registration on forum.....', 'INFO');
					
						//Handling Logout And Redirecting To The Respective Page
						forumRegister.redirectToLogout(casper, test, function() {
							casper.echo('                                      CASE 2', 'INFO');
							casper.echo('************************************************************************************', 'INFO');
							casper.echo('INCONTEXT NEW REGISTRATION FROM START NEW TOPIC WITH CREATE ACCOUNT BUTTON', 'INFO');
							casper.echo('************************************************************************************', 'INFO');
							casper.waitForSelector('i.icon.icon-menu', function success(){
								this.click('i.icon.icon-menu');
								test.assertExists('a[href="/latest"]');
								this.click('a[href="/latest"]');
								casper.waitForSelector('i.icon.icon-menu', function success(){
									this.click('div#topics a[href="/post/printadd"]');
									casper.waitForSelector('i.icon.icon-menu', function success(){
										this.click('form[name="frmLogin"] div.form-group a[href="/register/register"]');
									}, function fail() {
										casper.echo("Error Occurred", "ERROR");
									});
								}, function fail() {
									casper.echo("Error Occurred", "ERROR");
								});
							}, function fail() {
								casper.echo("Error Occurred", "ERROR");
							});
						});
					}
				});
			}, function fail() {
				casper.echo("Error Occurred", "ERROR");
			});
		}, function fail() {
			casper.echo("Error Occurred", "ERROR");
		});
	});
	
	//Filling Valid Data On Registration Form
	
	casper.waitForSelector('form[name="PostTopic"]', function success(){
		forumRegister.registerToApp(inContextRegisterJSON['createAccount'], casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else {
				casper.echo('Processing to registration on forum.....', 'INFO');
				forumRegister.redirectToLogout(casper, test, function() {
					casper.echo('                                      CASE 3', 'INFO');
					casper.echo('************************************************************************************', 'INFO');
					casper.echo('INCONTEXT NEW REGISTRATION WHILE LIKE THIS TOPIC FROM LIST OF TOPICS', 'INFO');
					casper.echo('************************************************************************************', 'INFO');
					test.assertExists('i.icon.icon-menu');
					casper.click('i.icon.icon-menu');
					test.assertExists('a[href="/latest"]');
					casper.click('a[href="/latest"]');
				});
			}
		});
	}, function fail() {
		casper.echo("Error Occurred", "ERROR");
	});

	casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success(){
		casper.click('i.glyphicon.glyphicon-like-alt');
		registerToApp(inContextRegisterJSON['likePost'], casper, function(err) {
			if (err) {
				casper.echo("Error Occurred In Callback", "ERROR");
			} else {
				casper.echo('Processing to registration on forum.....', 'INFO');
				forumRegister.redirectToLogout(casper, test, function() {
					casper.echo('                                      CASE 4', 'INFO');
					casper.echo('************************************************************************************', 'INFO');
					casper.echo('INCONTEXT NEW REGISTRATION WHILE LIKE POST FROM TOPIC PAGE', 'INFO');
					casper.echo('************************************************************************************', 'INFO');
					test.assertExists('i.icon.icon-menu');
					casper.click('i.icon.icon-menu');
					test.assertExists('a[href="/latest"]');
					casper.click('a[href="/latest"]');
					casper.waitForSelector('form[name="posts"] a.topic-title', function success(){
						this.click('form[name="posts"] a.topic-title');
						test.assertExists('i.glyphicon.glyphicon-like-alt');
						this.click('i.glyphicon.glyphicon-like-alt');
						registerToApp(inContextRegisterJSON['likePostFromTopicPage'], casper, function(err) {
							if (err) {
								casper.echo("Error Occurred In Callback", "ERROR");
							} else {
								casper.echo('Processing to registration on forum.....', 'INFO');
								forumRegister.redirectToLogout(casper, test, function() {
									casper.echo('                                      CASE 5', 'INFO');
									casper.echo('************************************************************************************', 'INFO');
									casper.echo('INCONTEXT NEW REGISTRATION WHILE DISLIKE POST FROM TOPIC PAGE', 'INFO');
									casper.echo('************************************************************************************', 'INFO');
									test.assertExists('i.icon.icon-menu');
									casper.click('i.icon.icon-menu');
									test.assertExists('a[href="/latest"]');
									casper.click('a[href="/latest"]');
								});
							}
						});
					}, function fail() {
						casper.echo("Error Occurred", "ERROR");
					});
				});
			}
		});
	}, function fail() {
		casper.echo("Error Occurred", "ERROR");
	});
	
	//Clicking On Any Topic Present In The List
	casper.waitForSelector('form[name="posts"] a.topic-title', function success(){
		this.click('form[name="posts"] a.topic-title');
		casper.waitForSelector('a.dislike_post.text-muted', function success(){
			this.click('a.dislike_post.text-muted');
			registerToApp(inContextRegisterJSON['dislikePostFromTopicPage'], casper, function(err) {
				if (err) {
					casper.echo("Error Occurred In Callback", "ERROR");
				} else {
					casper.echo('Processing to registration on forum.....', 'INFO');
					forumRegister.redirectToLogout(casper, test, function() {
						casper.echo('                                      CASE 6', 'INFO');
						casper.echo('************************************************************************************', 'INFO');
						casper.echo('INCONTEXT NEW REGISTRATION FROM QUOTE ON POST FROM POST LIST', 'INFO');
						casper.echo('************************************************************************************', 'INFO');
						test.assertExists('i.icon.icon-menu');
						casper.click('i.icon.icon-menu');
						test.assertExists('a[href="/latest"]');
						casper.click('a[href="/latest"]');
					});
				}
			});
		}, function fail() {
			casper.echo("Error Occurred", "ERROR");
		});
	}, function fail() {
		casper.echo("Error Occurred", "ERROR");
	});
	
	//Clicking On Any Topic Present In The List
	casper.waitForSelector('form[name="posts"] a.topic-title', function success(){
		this.click('form[name="posts"] a.topic-title');
		casper.waitForSelector('a.text-muted.quote', function success(){
			this.click('a.text-muted.quote');
			registerToApp(inContextRegisterJSON['quoteFromTopicPage'], casper, function(err) {
				if (err) {
					casper.echo("Error Occurred In Callback", "ERROR");
				} else {
					casper.echo('Processing to registration on forum.....', 'INFO');
					forumRegister.redirectToLogout(casper, test, function() {
						casper.echo('                                      CASE 7', 'INFO');
						casper.echo('************************************************************************************', 'INFO');
						casper.echo('INCONTEXT NEW REGISTRATION FROM VOTE ON POST FROM POST LIST', 'INFO');
						casper.echo('************************************************************************************', 'INFO');
						test.assertExists('i.icon.icon-menu');
						casper.click('i.icon.icon-menu');
						test.assertExists('a[href="/latest"]');
						casper.click('a[href="/latest"]');
						casper.waitForSelector('form[name="posts"] a.topic-title', function success(){
							casper.click('form[name="posts"] a.topic-title');
						}, function fail() {
							casper.echo("Error Occurred", "ERROR");
						});
					});
				}
			});
		}, function fail() {
			casper.echo("Error Occurred", "ERROR");
		});
	}, function fail() {
		casper.echo("Error Occurred", "ERROR");
	});
	
	//Clicking On 'create an account and log in' Link Present In Post List
	casper.waitForSelector('a#guest_user_vote', function success(){
			test.assertExists('a#guest_user_vote');
			this.click('a#guest_user_vote');
			this.echo('You have clicked on create an account and log-in link...', 'INFO');
			
			//Filling Valid Data On Registration Form
			registerToApp(inContextRegisterJSON['voteFromTopicPage'], casper, function(err) {
				if (err) {
					casper.echo("Error Occurred In Callback", "ERROR");
				} else {
					casper.echo('Processing to registration on forum.....', 'INFO');
					forumRegister.redirectToLogout(casper, test, function() {});
				}
			});
	}, function fail() {
		test.assertDoesntExist('a#guest_user_vote');
		this.echo('You did not find create an account and log-in link...', 'INFO');
	});
	
	/*casper.then(function() {
		casper.echo('                                      CASE 8', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION FROM MESSAGE MOUSE MOVER BUTTON', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Clicking On 'Username' Link Against First Topic In The List
	casper.then(function() {
		var username = this.evaluate(function () {
			var element = document.querySelector('form[name="posts"] a[href^="/profile/"]');
			return element;
		});
		
		this.then(function() {
			this.echo('username :::::111::::::::::: ' +username, 'INFO');
			username = this.fetchText(username);
			this.echo('username ::::::222:::::::::: ' +username, 'INFO');
		});
		//test.assertExists('form[name="posts"] a[href^="/profile/"]');
		//this.click('form[name="posts"] a.username.usergroup946060');
		
	});
	/*casper.then(function() {
		//test.assertExists('form[name="posts"] a[href^="/profile/"]');
		this.page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');
		var name = this.evaluate(function () {
			var element = document.querySelector('form[name="posts"] a.username.usergroup946060');
			$(element).hover(function() {console.log("--------------------");
				var popover = $('form[name="posts"] div.popover.hovercard.fade.top.in');
				return popover;
			});
		});
		casper.echo("name : " +name.innerHTML, 'info');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnMessage.png');
	});
	
	//Clicking On Top 'Register' Link 
	casper.then(function() {
		try {
			test.assertExists('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
			this.click('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'registerLink.png');
				registerToApp(inContextRegisterJSON['usernameLink'], casper, function() {
					casper.echo('Processing to registration on forum.....', 'INFO');
				});
			});
		} catch(e) {
			test.assertExists('.pull-right a[href="/register/register"]');
			this.click('.pull-right a[href="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'registerLink.png');
				forumRegister.registerToApp(inContextRegisterJSON['createAccount'], casper, function() {
					casper.echo('Processing to registration on forum.....', 'INFO');
				});
			});
		}
	});
	
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'register_submit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});*/
};

//Method For Filling Data In Registration Form

var registerToApp = function(data, driver, callback) {
	driver.fill('div#form-dialog form[name="PostTopics"]', {
		'member' : data.uname,
		'email': data.uemail,
		'pw' : data.upass
	}, true);
	
	return callback(null);
	
};
