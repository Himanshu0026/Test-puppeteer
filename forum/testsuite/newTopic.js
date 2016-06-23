/****This script is dedicated for start new topic on the forum. It covers testing of topic detail page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var newTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'newTopic/';

newTopic.featureTest = function(casper, test, x) {
	
	
	//casper.test.begin("Start New Topic functionality from home page & verify content with all valid and invalid scenarios", function(test) {
		
		//go to backend url

		casper.start(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and disable start topic checkbox');
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
			utils.enableorDisableCheckbox('post_threads', false, casper, function() {
				casper.echo("Starts Tpoic checkbox has been disabled", 'info');
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
		
		//* start from forum url
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

		// click on start new topic	
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'info');
			});
		});
		casper.then(function() {
			
			if(this.exists('.text-danger')){
				var warningMsg = this.fetchText('.text-danger');
				warningMsg = warningMsg.split('.');
				warningMsg = warningMsg[0] + '.'; 
				test.assertEquals(warningMsg.trim(), json.newTopic.startTopicPermissionWarning.trim());
				casper.echo('you are not able to start new topic go to backend and enable permission ');
			}
		});

		// reopen backend to enable permission
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and enable start topic checkbox');
			this.wait(7000, function() {
				casper.echo('Title of the page :' +this.getTitle(), 'info');
				test.assertTitle('Website Toolbox', 'The page has correct title');		
			});
		});
		
		/*casper.thenOpen('https://www.websitetoolbox.com/tool/members/dashboard', function() {
				casper.echo('User has been successfuly login to backend', 'info');
		});*/

		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo("Successfully navigated to Edit User group Permission page");
				casper.wait(4000, function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});	
		casper.then(function() {
			utils.enableorDisableCheckbox('post_threads', true, casper, function() {
				casper.echo("Starts Tpoic checkbox has been enabled", 'info');
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

		casper.thenOpen(config.url, function() {
			casper.echo('Hit on URL : '+config.url);
		});
		casper.wait(7000, function() {
			this.capture(screenShotsDir+'forumUrl.png');
		});		

		//test case for Start New Topic Page with All Blank Field and verify error message
		
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'info');
			});
		});

		//Post New Topic with Black Title
		casper.then(function() {
			postTopicpage(json.newTopic.blankField, casper,  function() {		
				casper.echo('post new topic by leaving all blank field and verify error message', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Post' Link
		casper.wait(7000,function() {
			this.capture(screenShotsDir+ 'blankField.png');
		});

		//Verify error message when title is blank
		casper.then(function(){
			var errorMsg = this.fetchText('div.panel-default .alert-danger');
			console.log("errorMsg : "+errorMsg);
			console.log("json.newTopic.blankField.ExpectedErrorMessage : "+json.newTopic.blankField.ExpectedErrorMessage);
			test.assertEquals(errorMsg.trim() ,json.newTopic.blankField.ExpectedErrorMessage.trim());
			casper.echo('error message is Verified when user try to post topic with all blank field');
		});

		//test case for Start New Topic Page with blank title and verify error message
		
		casper.thenOpen(config.url, function(){
			casper.echo('Hit on url : '+config.url);
		});		

		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'info');
			});
		});

		//Post New Topic with Black Title
		casper.then(function() {
			postTopicpage(json.newTopic.blankTitle, casper,  function() {		
				casper.echo('post new topic by leaving blank title and verify error message', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Post' Link
		casper.wait(7000,function() {
			this.capture(screenShotsDir+ 'blankTitle.png');
		});

		//Verify error message when title is blank
		casper.then(function(){
			var errorMsg = this.fetchText('div.panel-default .alert-danger');
			console.log("errorMsg : "+errorMsg);
			console.log("json.newTopic.blankTitle.ExpectedErrorMessage : "+json.newTopic.blankTitle.ExpectedErrorMessage);
			test.assertEquals(errorMsg.trim() ,json.newTopic.blankTitle.ExpectedErrorMessage.trim());
			casper.echo('error message is Verified when user try to post topic with blank title');
		});
		
		//test case for Start New Topic Page with blank content and verify error message
		
		casper.thenOpen(config.url, function(){
			casper.echo('Hit on url : '+config.url);
		});

		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'info');
			});
		});

		//Post New Topic With Blank Content
		casper.then(function() {
			postTopicpage(json.newTopic.blankContent, casper,  function() {		
				casper.echo('post new topic by leaving blank content and verify error message', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Post' Link
		casper.wait(7000,function() {
			this.capture(screenShotsDir+ 'blankContent.png');
		});

		//Verify error message when content is blank
		casper.then(function(){
			var errorMsg = this.fetchText('div.panel-default .alert-danger');
			console.log("errorMsg : "+errorMsg);
			console.log("json.newTopic.blankContent.ExpectedErrorMessage : "+json.newTopic.blankContent.ExpectedErrorMessage);
			test.assertEquals(errorMsg.trim(),json.newTopic.blankContent.ExpectedErrorMessage.trim());
			casper.echo('error message is Verified when user try to post topic with blank content');
		});
		
		//test case for Start New Topic Page with blank category and verify error message
		
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url);
		});

		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'info');
			});
		});
		
		//Post New Topic With Blank Category
		casper.then(function() {
			postTopicpage(json.newTopic.blankCategory, casper,  function() {		
				casper.echo('post new topic by leaving blank category and verify error message', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Post' Link
		casper.wait(7000,function() {
			this.capture(screenShotsDir+ 'blankCategory.png');
		});

		//Verify error message when category is blank
		casper.then(function(){
			var errorMsg = this.fetchText('div.panel-default .alert-danger');
			console.log("errorMsg : "+errorMsg);
			console.log("json.newTopic.blankCategory.ExpectedErrorMessage : "+json.newTopic.blankCategory.ExpectedErrorMessage);
			test.assertEquals(errorMsg.trim(),json.newTopic.blankCategory.ExpectedErrorMessage.trim());
			casper.echo('error message is Verified when user try to post topic with blank content');
		});

		//test case for Start New Topic Page with valid data and verify content with followed content
		
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url);
		});
		
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'info');
			});
		});

		//Post new Topic Page with valid data
		casper.then(function() {
			postTopicpage(json.newTopic.ValidCredential, casper,  function() {		
				casper.echo('Successfully Posted New Topic with followed content ', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Post' Link
		casper.wait(7000,function() {
			this.capture(screenShotsDir+ 'postedTopic.png');
		});

		//Verify Post Content when all field are filled with valid data
		casper.then(function(){
			verifyPostContent(json.newTopic.ValidCredential.content, casper, function() {
				casper.echo('Contents are Verified with all valid data');
			});			
		});

		// verify followed contents

		casper.then(function(){
			verifyFollowContent(casper, function(){
				casper.echo('verify Follow Content');
			});
		});

		// make follow post to unfollow post

		casper.then(function() {
			this.click('span.topic-content h4 a.topic-title');
			this.wait(5000,function() {
				this.capture(screenShotsDir+ 'clickOnFollowPost.png');
			});
			
			this.wait(3000, function() {
				this.click('.glyphicon-minus');
				this.capture(screenShotsDir+ 'clickToUnfollowIcon.png');
			});
		}); 

		// verify new unFollowed content
		
		casper.then(function(){
			verifyUnFollowContent(casper, function(){
				casper.echo('verify UnFollow Content');
			});
		});
		
		//test case for Start New Topic Page with valid data and verify content with Unfollowed content
		
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url);
		});
		
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'info');
			});
		});
		
		casper.wait(5000,function() {
			this.click('#EMNEW');
			this.capture(screenShotsDir+ 'UnfollowPost.png');
		});

		//Post new Topic Page with valid data
		casper.then(function() {
			postTopicpage(json.newTopic.ValidCredential, casper,  function() {		
				casper.echo('Successfully Posted New Topic with Unfollowed content ', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Post' Link
		casper.wait(7000,function() {
			this.capture(screenShotsDir+ 'unFollowPostedTopic.png');
		});

		//Verify Post Content when all field are filled with valid data
		casper.then(function(){
			verifyPostContent(json.newTopic.ValidCredential.content, casper, function() {
				casper.echo('Contents are Verified with all valid data');
			});
		});

		// verify Unfollowed contents
		casper.then(function(){
			verifyUnFollowContent(casper, function() {
				casper.echo('verify UnFollow Content');
			});
		});

		// open config.url and click on newly opsted topic
		casper.thenOpen(config.url,function() {
			console.log("json.newTopic.tempHref : "+json.newTopic.tempHref);	
			this.click(json.newTopic.tempHref);	
			this.wait(7000,function() {
				this.capture(screenShotsDir+ 'tempHref.png');
			});
		});

		// make unFollow post to follow post

		casper.then(function() {
			this.wait(3000, function() {
				this.click('.glyphicon-plus');
				this.capture(screenShotsDir+ 'clickToFollowIcon.png');
			});
		}); 

		// verify new Followed content
		
		casper.then(function(){
			verifyFollowContent(casper, function(){
				casper.echo('verify Follow Content');
			});
		});

		//follow and unFollow Topic

		//verify warning message when no Topic is followed by user 

		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url);
		});
		
		//click on followed content link and verify expected Warning message
		casper.then(function() {
			this.capture(screenShotsDir+ 'dropdown.png');
			this.click('span.user-nav-panel li a[href^="/search"]');
			casper.then(function() {
				if(this.exists('.no-space')) { 
					verifyWarningMsg(json.followTopic.ExpectedWarningMessage, casper, function() {
						casper.echo('warning message is verified');
					});
				} else {
					casper.echo('you have followed some topics try to unfollow all contents');
					
					this.click('div.panel-heading input[name = "allbox"]');
					this.wait(3000, function() {
						this.capture(screenShotsDir+ 'SelectAllForUnfollowContent.png');
					});
					this.wait(5000, function() {
						this.click('.unfollow-button');
					});
					this.then(function() {
						verifyWarningMsg(json.followTopic.ExpectedWarningMessage, casper, function() {
							casper.echo('warning message is verified');
						});
					});
				}
				casper.then(function() {
					this.wait(5000,function() {
						this.capture(screenShotsDir+ 'followedContent.png');
					});
				});
			});
		});

		//follow and unFollow category

		//verify warning message when no category is followed by user 

		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url);
		});
		
		//click on followed category link and verify expected Warning message
		casper.then(function() {
			this.capture(screenShotsDir+ 'dropdown.png');
			this.click('span.user-nav-panel li a[href^="/search"]');
			casper.then(function() {
				this.click('ul.pull-left li#show_threads #anchor_tab_forum_subscriptions');
			});
			casper.then(function() {
				this.wait(5000,function() {
					this.capture(screenShotsDir+ 'followedCategory.png');
				});
			});
			casper.then(function() {
				if(this.exists('.no-space')) {
					verifyWarningMsg(json.followCategory.ExpectedWarningMessage, casper, function() {
						casper.echo('warning message is verified');
					});
				} else { 
					casper.echo('you have followed some category trying to unfollow all category');
					this.click('div.panel-heading input[name = "allbox"]');
					this.wait(3000, function() {
						this.capture(screenShotsDir+ 'SelectAllForUnfollowCategory.png');
					});
					this.wait(5000, function() {
						this.click('.unfollow-button');
					});
					this.then(function() {
						verifyWarningMsg(json.followCategory.ExpectedWarningMessage, casper, function() {
							casper.echo('warning message is verified');
						});
					});	
				}
				casper.then(function() {
					this.wait(5000,function() {
						this.capture(screenShotsDir+ 'followedCategory.png');
					});
				});
			});
		});

		//LOGOUT FROM APP
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'info');
			});
		});
		
		//Getting Screenshot After Clicking On 'Log Out' Link
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'logout.png');
		});

		/*casper.run(function(){
			test.done();
		});*/

//	});
};


//private methods


/************************************PRIVATE METHODS***********************************/


// method for goto New Topic page to application

var gotoNewTopicpage = function(driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	driver.wait(7000, function() {
		this.capture(screenShotsDir+ 'startTopic.png');
	});
	return callback();
};


// method for goto New Topic page to application

var postTopicpage = function(data, driver, callback) {
	console.log("data.title : "+data.title);
	console.log("data.content : "+data.content);
	console.log("data.category : "+data.category);
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	 driver.withFrame('message_ifr', function() {
		this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
		this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 		this.sendKeys('#tinymce', data.content);
		this.capture(screenShotsDir+ 'content.png');	
	});	
		driver.wait(3000);
		driver.click('#all_forums_dropdown');
		driver.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	
	//code for open insert image model

	/*driver.click('#insert_image_dialog_');
    	driver.then(function() {
		this.waitForSelector('div#insertimagemodal', function() {
			this.echo('****************************************see the modal!', 'info');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'screenshotofmodal.png');
			});
		});
	});
	driver.then(function() {
		driver.click('div#uploadImage a#insertImage_');
		this.wait(10000, function(){
			this.capture(screenShotsDir+ 'browse.png');
		});	
	});*/

	/*driver.then(function() {
		this.click('#previewpost_sbt');
		this.wait(10000, function() {
			driver.capture(screenShotsDir+ 'previewPost.png');
		});
	});*/
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback();
};

// method for verify post content Topic page to application

var verifyPostContent = function(content, driver, callback) {
	var contentMsg = driver.fetchText('div.post-body-content span[id^="post_message_"]');
	driver.test.assertEquals(content,contentMsg.trim());
	casper.echo('Verifying with all valid data');
	return callback();
};

// method for follow content on follow content page to application

var verifyFollowContent = function(driver, callback) {
		var url = driver.getCurrentUrl();
		casper.echo('############# current url : '+url);
		url = url.split("#");
		url= url[0].split(".com");			casper.echo('new url = '+url[1]);
		driver.click('li.user-panel .dropdown-toggle');
		driver.capture(screenShotsDir+ 'dropdown.png');
		driver.click('span.user-nav-panel li a[href^="/search"]');
		driver.wait(5000,function() {
			this.capture(screenShotsDir+ 'followedContent.png');
		});
		driver.then(function() {
			casper.echo('a[href="'+url[1]+'"]');
			this.test.assertExists('span.topic-content h4 a[href="'+url[1]+'"]');
		});
	return callback();
};

// method for verify unFollow content on follow content page to application

var verifyUnFollowContent = function(driver, callback) {
		var url = driver.getCurrentUrl();
		casper.echo('############# current url : '+url);
		url = url.split("#");
		url= url[0].split(".com");
		driver.click('li.user-panel .dropdown-toggle');
		driver.capture(screenShotsDir+ 'dropdown.png');
		driver.click('span.user-nav-panel li a[href^="/search"]');
		driver.wait(5000,function() {
			this.capture(screenShotsDir+ 'followedContent.png');
		});
		driver.then(function() {
			casper.echo('a[href="'+url[1]+'"]');
			this.test.assertDoesntExist('span.topic-content h4 a[href="'+url[1]+'"]');
		});
			json.newTopic.tempHref = 'a[href="'+url[1]+'"]';
		
	return callback();
};

// verify warning message for follow content and follow category

var verifyWarningMsg = function(warningMsg, driver, callback){

	var warningMessage = driver.fetchText('.no-space');
	casper.echo('warningMessage : '+warningMessage);
	casper.echo('json.followTopic.ExpectedErrorMessage : '+warningMsg);
	driver.test.assertEquals(warningMessage.trim(), warningMsg.trim());
	return callback();
};
