/****This script is dedicated for user poll on the forum. It covers testing of 'Poll Tab' with all defined validations****/

"use strict";

var utils = require('./utils.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var forumRegister = require('./register.js');
var config = require('../config/config.json');

var poll = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'poll/';

poll.pollFeature = function(casper, test, x, callback) {
	
	//go to backend url
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable post poll checkbox', 'INFO');
		this.emit('title');
	});
		
	//login to backend url (rm)
	/*casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('User has been successfuly login to backend', 'INFO');
		});
	});*/													

	//go to user permission
	casper.then(function() {
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
			casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
			casper.then(function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});
		});
	});	

	//click on checkbox
	casper.then(function() {
		utils.enableorDisableCheckbox('post_polls', false, casper, function() {
			casper.echo("Post Polls checkbox has been disabled", 'INFO');
		});
	});
		
	// click on save button
	casper.then(function() {
		utils.clickOnElement(casper, '.btn-blue', function() {
			casper.echo('Saving Changes', 'INFO');
		});
	});

	//verify message after update users group setting
	casper.then(function() {
		var msg  = this.fetchText('p[align="center"] font.heading');
		test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and message verified');
		casper.echo('---------------------------------------------------------------------------');
		//Getting Screenshot After Change permission
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});		
	});
	
	//start from forum url
	casper.thenOpen(config.url, function() {
		this.emit('title');
	});
		
	//Login To App (rm)
	/*casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.echo('User has been successfuly login to application with register user', 'INFO');
		});
		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.then(function() {
			this.capture(screenShotsDir+ 'login.png');
		});
	});*/

	/*****test case to verify poll tab, register user can not post polls after disabling permission*****/
	casper.then(function() {
		this.click('a[href="/post/printadd"]');
		test.assertDoesntExist('ul li a[href="#poll"]');
		casper.echo('you do not have permission to create polls go to the user group permission to to enable check box');
		casper.echo('---------------------------------------------------------------------------');
	});

	//go to backend url enable post poll feature
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable post poll checkbox', 'INFO');
		this.emit('title');
	});
		
	//go to user permission
	casper.then(function() {
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
			casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
			casper.then(function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});
		});
	});	

	//click on checkbox
	casper.then(function() {
		utils.enableorDisableCheckbox('post_polls', true, casper, function() {
			casper.echo("Post Polls checkbox has been enable", 'INFO');
		});
	});
		
	// click on save button
	casper.then(function() {
		utils.clickOnElement(casper, '.btn-blue', function() {
			casper.echo('Saving Changes', 'INFO');
		});
	});

	//verify message after update users group setting
	casper.then(function() {
		var msg  = this.fetchText('p[align="center"] font.heading');
		test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and message verified');
		casper.echo('---------------------------------------------------------------------------');
		//Getting Screenshot After Change permission
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});		
	});
	
	//start from forum url
	casper.thenOpen(config.url, function() {
		this.emit('title');
	});
		
	/*****test case to submit poll by leaving poll question field blank and verify error message*****/
	//go to start new topic
	casper.then(function() {
		gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
			casper.echo('go to new topic', 'INFO');
		});
	});

	//Go To Poll Page
	casper.then(function() {
		gotoNewPollpage(casper, function() {
			casper.log('redirect to Poll', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Poll' Link 
	casper.then(function() {
		this.capture(screenShotsDir+ 'newPoll.png');
	});

	//Post Poll Data 
	casper.then(function() {
		savePollPage(json['poll'].blankPollQues, casper, function() {
			casper.log('posting poll', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Save Poll' Link
	casper.then(function() {
		this.capture(screenShotsDir+ 'errorMessage.png');
	});

	//verify error message
	casper.then(function() {
		this.mouse.move('#poll_question');
		var errMsg = this.evaluate(function() {
			var element = document.querySelector('#poll_question');
			return element.getAttribute('data-original-title');
		});
		casper.echo('*********** error message : ' +errMsg);
		test.assertEquals(errMsg.trim(), json.poll.blankPollQues.ExpectedErrorMessage.trim(), errMsg.trim()+' and verified error message');
		casper.echo('---------------------------------------------------------------------------');
	});
	
	/*****test case to submit poll by leaving option1 field blank and verify error message*****/
	/*casper.on('remote.alert', function(message) {
		test.assertEquals(message, json.poll.blankOption1.ExpectedErrorMessage.trim(), message+' and verified error message');
		casper.echo('---------------------------------------------------------------------------');
	});*/	
	casper.then(function() {	 
			this.on('remote.alert', testAlert1);
	});
	//Post Poll Data 
	casper.then(function() {
		savePollPage(json['poll'].blankOption1, casper, function() {
			casper.log('poll posted successfully', 'INFO');
		});
		//Getting Screenshot After Clicking On 'Save Poll' Link
		casper.then(function() {
			this.capture(screenShotsDir+ 'errorMessage.png');
		});
	});
	
	//verify error message
	/*casper.then(function() {
		test.assertExists('.alert-info');
		casper.echo('---------------------------------------------------------------------------');
		var errMsg = this.fetchText('div.panel-default div.alert-info');
		test.assertEquals(errMsg.trim(), json.poll.blankOption1.ExpectedErrorMessage.trim(), errMsg.trim()+' and verified error message');
		casper.echo('---------------------------------------------------------------------------');
	});*/
	casper.then(function() {
		this.removeListener('remote.alert', testAlert1);
	});
	/*****test case to submit poll by leaving option2 field blank and verify error message*****/
	casper.then(function() {
		    this.on('remote.alert', testAlert2);
	});
	//Post Poll Data 
	casper.then(function() {
		savePollPage(json['poll'].blankOption2, casper, function() {
			casper.log('poll posted successfully', 'INFO');
		});
		//Getting Screenshot After Clicking On 'Save Poll' Link
		casper.then(function() {
			this.capture(screenShotsDir+ 'errorMessage.png');
		});
	});
	//wait for 3 second to remove listener2
	casper.wait(3000, function() {});
	casper.then(function() {
		this.removeListener('remote.alert', testAlert2);
	});
	//verify error message
	/*casper.then(function() {
		test.assertExists('.alert-info');
		casper.echo('---------------------------------------------------------------------------');
		var errMsg = this.fetchText('div.panel-default div.alert-info');
		test.assertEquals(errMsg.trim(), json.poll.blankOption2.ExpectedErrorMessage.trim(), errMsg.trim()+' and verified error message');
		casper.echo('---------------------------------------------------------------------------');
	});*/


	/*****test case to submit poll by filling with all contents with valid credintial and verify posted polls*****/
	//Post Poll Data 
	casper.then(function() {
		casper.echo('test case to submit poll by filling with all contents with valid credintial and verify posted polls', 'INFO');
		savePollPage(json['poll'].vadidCredintial, casper, function() {
			casper.log('poll posted successfully', 'info');
		});
		//Getting Screenshot After Clicking On 'Save Poll' Link
		casper.waitForSelector('form[action="/poll/pollvotesave"] h2', function() {
			this.capture(screenShotsDir+ 'savePoll.png');
		});
	});

	//verify posted poll
	casper.then(function() {
		test.assertExists('form[action="/poll/pollvotesave"] h2');
		casper.echo('---------------------------------------------------------------------------');
		var message = this.fetchText('form[action="/poll/pollvotesave"] h2');
		var spanText = this.fetchText('form[action="/poll/pollvotesave"] h2 span').trim();
		message = message.replace(spanText, '');
		test.assertEquals(message.trim(), json.poll.vadidCredintial.pollQues, message.trim()+' and verified pool question');		
		casper.echo('---------------------------------------------------------------------------');
	});

	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.log('Successfully logout from application', 'info');
		});
		//Getting Screenshot After Clicking On 'Logout' Link
		casper.then(function() {
			this.capture(screenShotsDir+ 'logout.png');
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
	driver.then(function() {
		this.capture(screenShotsDir+ 'startTopic.png');
	});
	driver.then(function() {
         	 this.sendKeys('input[name="subject"]', data.title, {reset:true});
		 this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
	 		this.sendKeys('#tinymce', data.content);
		});	
		driver.then(function() {
			this.click('#all_forums_dropdown');
			var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
			this.fill('form[name="PostTopic"]',{
				'forum' : val.trim()
			},false);
			this.capture(screenShotsDir+ 'content.png');
		});
	});

	return callback();
};

var gotoNewPollpage = function(driver, callback) {
	driver.then(function() {
		this.capture(screenShotsDir+ 'TopicDetails.png');
		this.test.assertExists('ul li a[href="#poll"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('ul li a[href="#poll"]');
	});
	return callback();
};

// method for go to save new poll  to application

var savePollPage = function(data, driver, callback) {
	driver.sendKeys('#poll_question', data.pollQues, {reset:true});
	driver.sendKeys('input[name="public"]', data.publicCheckbox);
	driver.sendKeys('#poll_option_1 div input', data.option1, {reset:true});
	driver.sendKeys('#poll_option_2 div input', data.option2, {reset:true});
	driver.then(function(){
		this.click('a[href="#poll-timeout"] small.text-muted');
	});
	driver.then(function() {
		driver.then(function() {
			this.capture(screenShotsDir+ 'fillPoll.png');
		});
	});
	driver.then(function() {
		driver.click('#save_poll');
	});
	
};
