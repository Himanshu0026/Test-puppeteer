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
		});
	});
	
	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
	
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Unregistered / Not Logged In') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		casper.click('a[href="'+grpName+'"]');
		casper.wait(5000,function(){
			this.capture(screenShotsDir + 'group_un-Registered.png');
		});
	});
	
	//Disabling 'Start Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#post_threads');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_threads', false, casper, function() {
			casper.echo("Start Topics Checkbox Has Been Disabled For Un-Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Open Forum Front End URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION FROM START NEW TOPIC REGISTER LINK', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Clicking On Start New Topic Button
	casper.then(function() {
		test.assertExists('div#topics a[href="/post/printadd"]');
		this.click('div#topics a[href="/post/printadd"]');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'startNewTopic.png');
	});
	
	//Clicking On Top 'Register' Link 
	
	casper.then(function() {
		test.assertExists('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
		this.click('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'registerLink.png');
	});
	
	//Filling Valid Data On Registration Form
	
	casper.then(function() {
		forumRegister.registerToApp(inContextRegisterJSON['registerLink'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});

	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'register_submit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION FROM START NEW TOPIC WITH CREATE ACCOUNT BUTTON', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Clicking On Start New Topic Button
	
	casper.then(function() {
		test.assertExists('div#topics a[href="/post/printadd"]');
		this.click('div#topics a[href="/post/printadd"]');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'startNewTopic.png');
	});
	
	//Clicking On 'Create new Account' Button 
	
	casper.then(function() {
		test.assertExists('form[name="frmLogin"] div.form-group a[href="/register/register"]');
		this.click('form[name="frmLogin"] div.form-group a[href="/register/register"]');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'registerLink.png');
	});
	
	//Filling Valid Data On Registration Form
	
	casper.then(function() {
		forumRegister.registerToApp(inContextRegisterJSON['createAccount'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});

	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'register_createAccount.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION WHILE LIKE THIS TOPIC FROM LIST OF TOPICS', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Clicking On 'Like' This Post Icon
	casper.then(function() {
		test.assertExists('i.glyphicon.glyphicon-like-alt');
		this.click('i.glyphicon.glyphicon-like-alt');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'likePost.png');
	});
	
	//Filling Valid Data On Registration Form
	casper.then(function() {
		registerToApp(inContextRegisterJSON['likePost'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'likePostSubmit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION WHILE LIKE POST FROM TOPIC PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Clicking On Any Topic Present In The List
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});
	
	//Clicking On 'Like' This Post Icon
	casper.then(function() {
		test.assertExists('i.glyphicon.glyphicon-like-alt');
		this.click('i.glyphicon.glyphicon-like-alt');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'likePostFromTopicPage.png');
	});
	
	//Filling Valid Data On Registration Form
	casper.then(function() {
		registerToApp(inContextRegisterJSON['likePostFromTopicPage'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'likePostFromTopicPageSubmit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 5', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION WHILE DISLIKE POST FROM TOPIC PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Clicking On Any Topic Present In The List
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});
	
	//Clicking On 'Dislike' This Post Icon
	casper.then(function() {
		test.assertExists('a.dislike_post.text-muted');
		this.click('a.dislike_post.text-muted');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'disLikePostFromTopicPage.png');
	});
	
	//Filling Valid Data On Registration Form
	casper.then(function() {
		registerToApp(inContextRegisterJSON['dislikePostFromTopicPage'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'dislikePostFromTopicPageSubmit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION FROM QUOTE ON POST FROM POST LIST', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Clicking On Any Topic Present In The List
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});
	
	//Clicking On 'Quote Link' Present In Post List
	casper.then(function() {
		test.assertExists('a.text-muted.quote');
		this.click('a.text-muted.quote');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'quoteFromTopicPage.png');
	});
	
	//Filling Valid Data On Registration Form
	casper.then(function() {
		registerToApp(inContextRegisterJSON['quoteFromTopicPage'], casper, function() {
			casper.echo('Processing to registration on forum.....', 'INFO');
		});
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'quoteFromTopicPageSubmit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 7', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION FROM VOTE ON POST FROM POST LIST', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Clicking On Any Topic Present In The List
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});
	
	//Clicking On 'create an account and log in' Link Present In Post List
	casper.then(function() {
		try {
			test.assertExists('a#guest_user_vote');
			this.click('a#guest_user_vote');
			this.echo('You have clicked on create an account and log-in link...', 'INFO');
			
			this.wait(5000, function() {
				this.capture(screenShotsDir + 'voteFromTopicPage.png');
			});
			
			//Filling Valid Data On Registration Form
			this.then(function() {
				registerToApp(inContextRegisterJSON['voteFromTopicPage'], casper, function() {
					casper.echo('Processing to registration on forum.....', 'INFO');
				});
			});

			this.wait(5000, function() {
				this.capture(screenShotsDir + 'voteFromTopicPageSubmit.png');
			});
			
			//Handling Logout And Redirecting To The Respective Page
			this.then(function() {
				forumRegister.redirectToLogout(casper, test, function() {});
			});
			
		} catch(e) {
			test.assertDoesntExist('a#guest_user_vote');
			this.echo('You did not find create an account and log-in link...', 'INFO');
		}
	});
	
	/*casper.then(function() {
		casper.echo('                                      CASE 8', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('INCONTEXT NEW REGISTRATION FROM MESSAGE MOUSE MOVER BUTTON', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Clicking On 'Username' Link Against First Topic In The List
	casper.then(function() {
		test.assertExists('form[name="posts"] a[href^="/profile/"]');
		this.click('form[name="posts"] a.username.usergroup946060');
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
	
	return callback();
	
};
