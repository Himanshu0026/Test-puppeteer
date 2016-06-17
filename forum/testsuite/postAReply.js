/****This script is dedicated for user to post a reply on any topic on the forum. It covers testing of post a reply page with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var postAReply = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'postAReply/';

postAReply.featureTest = function(casper, test) {

	//Open Forum URL And Get Title 

	casper.start(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'info');
		test.assertTitle('Automation Forum', 'page has the correct title');
	});

	//Login to app

	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.echo('User has successfully login to application', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});

	// Verify error message when user try to post blank content

	casper.then(function() { 
			casper.on('remote.alert', function(message) { 
    				test.info('alert message: ' + message);
				var errMessage = message;
				test.assertEquals(errMessage.trim(), json.replyTopic.blankContent.ExpectedErrorMessage.trim());
				casper.echo('Error message is verified when user enters blank content');
				
			});
		});
	
	//Reply topic with blank content
	
	casper.then(function() {
		replyTopic(json.replyTopic.blankContent.content, casper, function() {
			casper.echo('post a reply by leaving blank content and verify error message', 'info');
		});
	});

	
	//Getting Screenshot After Clicking On 'POST' Link 

	/*casper.wait(3000,function( ){
		this.capture(screenShotsDir+ 'blankReplyTopic.png');
	});*/

	casper.thenOpen(config.url, function() {
	    this.echo("Now I'm in your Home again.")
	});

	//Reply topic with valid credential

	casper.then(function() {
		replyTopic(json.replyTopic.ValidCredential.content, casper, function() {
			casper.echo('Replied successfully', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'POST' Link 

	casper.wait(7000,function( ){
		this.capture(screenShotsDir+ 'replyTopic.png');
	});

	// Verify Posted Reply

	casper.then(function(){
		
		var elementId = this.evaluate(function() {
			var element = document.querySelectorAll("span[id^='post_message_']");
			var id = element[element.length-1].id;
			return id;	
		});
		var contentMsg = this.fetchText("#"+elementId);
		casper.echo('************ contentMsg : ' +contentMsg, 'info');
		var content = json.replyTopic.ValidCredential.content;
		casper.echo('************ content : ' +content, 'info');
		
		test.assertEquals(contentMsg.trim(), content.trim());
		casper.echo('content message is Verified when user try to post a reply on topic');
	});

	//Logout From App

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully logout from application');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});

};


/************************************PRIVATE METHODS***********************************/

// method for reply topic on any post

var replyTopic = function(content, driver, callback) { console.log("function content : "+content);
	
	driver.click('form[name="posts"] h4 a');
	driver.then(function() {
		this.sendKeys('#message', content);
	});
	driver.wait(7000, function() {
		this.withFrame('message_ifr', function() {
	 		this.sendKeys('#tinymce', content);
			this.capture(screenShotsDir+ 'replyContent.png');	
		});
	});

	
	driver.then(function(){
			driver.click('#reply_submit');
	});
	/*driver.then(function(){
			driver.on('remote.alert', function(message) { driver.echo("inside ON function");
			console.log('alert message: ' + message);	
		});
	});*/
	
	return callback();
};

