/****This script is dedicated for user to post a reply on any topic on the forum. It covers testing of post a reply page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var postAReply = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'postAReply/';

postAReply.featureTest = function(casper, test, x) {

	//Login To Backend URL and disable Reply Topic and Reply Own Topic checkbox
		casper.start(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and disable Reply Topic and Reply Own Topic checkbox');
			this.wait(7000, function() {
				casper.echo('Title of the page :' +this.getTitle(), 'info');
				test.assertTitle('Website Toolbox - Account Login', 'The page has correct title');		
			});
		});
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('User has been successfuly login to backend', 'info');
			});
		});

		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo("Successfully navigated to Edit User group Permission page");
				casper.wait(4000, function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});	
		casper.then(function() {
			utils.enableorDisableCheckbox('post_replies', false, casper, function() {
				casper.echo("Reply Topic checkbox has been disabled", 'info');
			});
		});
		casper.then(function() {
			utils.enableorDisableCheckbox('other_post_replies', false, casper, function() {
				casper.echo("Reply own Topic checkbox has been disabled", 'info');
			});
		});
		casper.then(function() {
			utils.clickOnElement(casper, '.btn-blue', function() {
				casper.echo('Saving Changes');
			});
		});
		casper.then(function() {
			var msg  = this.fetchText('p[align="center"] font.heading');
			test.assertEquals(msg.trim(), config.permissionSettingMsg.trim());
		});
		casper.wait(2000, function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});		
		
		// start from forum url
		casper.thenOpen(config.url, function() {
			casper.echo('Title of the page :' +this.getTitle(), 'info');
			test.assertTitle('Automation Forum', 'page has the correct title');
		});
		
		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'login.png');
		});

		// post reply on own Topics when permission false	
		casper.then(function(){
			this.click('form[name="posts"] h4 a');
			test.assertDoesntExist('#message');
			casper.echo('you dont have permission to reply post on own topic', 'info');	
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

		//Login To App with other user
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username1, json['newTopic'].password1, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'login.png');
		});

		// post reply on others Topic when permission false	
		casper.then(function(){
			test.assertDoesntExist('#message');
			casper.echo('you dont have permission to reply post on others topic', 'info');
		});


	// reopen Backend URL and enable Reply Topic and Reply Own Topic checkbox
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('\nLogin To Backend URL and enable Reply Topic and Reply Own Topic checkbox\n');
			this.wait(7000, function() {
				casper.echo('Title of the page :' +this.getTitle(), 'info');
				test.assertTitle('Website Toolbox', 'The page has correct title');		
			});
		});
		
		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo("Successfully navigated to Edit User group Permission page");
				casper.wait(4000, function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});	
		casper.then(function() {
			utils.enableorDisableCheckbox('other_post_replies', true, casper, function() {
				casper.echo("Reply Others Topic checkbox has been enabled", 'info');
			});
		});
		casper.then(function() {
			utils.enableorDisableCheckbox('post_replies', true, casper, function() {
				casper.echo("reply Own Tpoic checkbox has been enabled", 'info');
			});
		});
		casper.then(function() {
			utils.clickOnElement(casper, '.btn-blue', function() {
				casper.echo('Saving Changes');
			});
		});
		casper.then(function() {
			var msg  = this.fetchText('p[align="center"] font.heading');
			casper.echo('msg : ' +msg, 'info');
			casper.echo('config.permissionSettingMsg : ' +config.permissionSettingMsg, 'info');
			test.assertEquals(msg.trim(), config.permissionSettingMsg.trim());
		});
		casper.wait(2000, function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});		

		//reopen forum url for reply on topic after change permission
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on URL : '+config.url);
		});
		casper.wait(7000, function() {
			this.capture(screenShotsDir+'forumUrl.png');
		});		
		
		// post reply on others topic with valid and invalid contents 	
		casper.then(function() {
			casper.echo('replyed on others topic');
			postReplyAndVerify();
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

		//Login To App with other user to post reply on own topic
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'login.png');
		});

		// post reply on own topic with valid and invalid contents
		casper.then(function() {
			casper.echo('replyed on own topic');
			postReplyAndVerify();
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
		
	///*****************************************************************************************///
	function postReplyAndVerify(){
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

	
	casper.thenOpen(config.url, function() {
	    this.echo("Hit on url : " +config.url);
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
		test.assertEquals(contentMsg.trim(), json.replyTopic.ValidCredential.content.trim());
		casper.echo('content message is Verified when user try to post a reply on topic');
	});
	};

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

var replyTopic = function(content, driver, callback) { 
	
	try{
		driver.click('form[name="posts"] h4 a');
	} catch(err) {

	}	
	

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
	return callback();
};

