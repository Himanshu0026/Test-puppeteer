/****This script is dedicated for start new topic on the forum. It covers testing of topic detail page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var pinTopic = require('./pinTopic.js');
var moveTopic = require('./moveTopic.js');
var lock_unLockTopic = require('./lock_unLockTopic.js');
var editTopic = require('./editTopic.js');
var postAReply = require('./postAReply.js');
var deleteTopic = require('./deleteTopic.js');
var poll = require('./poll.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var newTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'newTopic/';

newTopic.featureTest = function(casper, test, x) {
		
		casper.on('title', function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');		
		});
		casper.on('postTopicpage', function(data) { casper.echo('*************************************************11', 'INFO');
			this.then(function() {	casper.echo('***********************data*********' +data.category+ '....' +data.content, 'INFO');
				postTopicpage(data, casper,  function() {		
					casper.echo('Successfully Posted New Topic with followed content ', 'INFO');
				});
			});
		});

		casper.on('verifyPostContent',function(data) {	casper.echo('*************************************************22', 'INFO');
			this.then(function() {	casper.echo(data, 'INFO');
				verifyPostContent(data, casper, function() {
					casper.echo('Contents are Verified with all valid data', 'INFO');
				});
			});
		});

		//go to backend url
		casper.start(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and disable start topic checkbox', 'INFO');
			this.emit('title');
		});
		
		//login to backend url
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function() {
				casper.echo('User has been successfuly login to backend', 'INFO');
			});
		});

		//go to user permission
		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
			});
		});	

		//click on checkbox
		casper.then(function() {
			utils.enableorDisableCheckbox('post_threads', false, casper, function() {
				casper.echo("Starts Tpoic checkbox has been disabled", 'INFO');
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
		});

		//Getting Screenshot After Change permission
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});		
		
		//start from forum url
		casper.thenOpen(config.url, function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		});
		
		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Log In' Link 
			this.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});
		});

		casper.then(function() {
			if(this.exists('span.alert-info')) {
				var info = this.fetchText('span.alert-info');
				casper.echo(info.trim(), 'INFO');
			}
		});
		// click on start new topic	
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'INFO');
			});
		});

		//verify warning message when start new topic is disable from backend
		casper.then(function() {
	
			if(this.exists('.text-danger')){
				var warningMsg = this.fetchText('.text-danger');
				warningMsg = warningMsg.split('.');
				warningMsg = warningMsg[0] + '.'; 
				test.assertEquals(warningMsg.trim(), json.newTopic.startTopicPermissionWarning.trim(),warningMsg.trim()+' and message verified');
				casper.echo('you are not able to start new topic go to backend and enable permission ', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			}
		});

		// reopen backend to enable permission
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and enable start topic checkbox', 'INFO');
			this.emit('title');
		});

		//go to user group permission
		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo("Successfully navigated to Edit User group Permission page",'INFO');
				casper.then(function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});	

		//click on checkbox
		casper.then(function() {
			utils.enableorDisableCheckbox('post_threads', true, casper, function() {
				casper.echo("Starts Tpoic checkbox has been enabled", 'INFO');
			});
		});

		//click on save button
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
			casper.echo('Hit on URL : '+config.url, 'INFO');
			casper.then(function() {
				this.capture(screenShotsDir+'forumUrl.png');
			});		
		});
		
		//test case for Start New Topic Page with All Blank Field and verify error message

		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'INFO');
			});
		});

		//Post New Topic with Black Title
		casper.then(function() {
			postTopicpage(json.newTopic.blankField, casper,  function() {		
				casper.echo('post new topic by leaving all blank field and verify error message', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Post' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'blankField.png');
			});
		});

		//Verify error message when title is blank
		casper.then(function(){
			var errorMsg = this.fetchText('div.panel-default .alert-danger');
			test.assertEquals(errorMsg.trim() ,json.newTopic.blankField.ExpectedErrorMessage.trim(), errorMsg.trim()+' and verified error message');
			casper.echo('---------------------------------------------------------------------------');
		});

		//test case for Start New Topic Page with blank title and verify error message
		casper.thenOpen(config.url, function(){
			casper.echo('Hit on url : '+config.url, 'INFO');
		});		

		//go to start new topic
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'INFO');
			});
		});

		//Post New Topic with Black Title
		casper.then(function() {
			postTopicpage(json.newTopic.blankTitle, casper,  function() {		
				casper.echo('post new topic by leaving blank title and verify error message', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Post' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'blankTitle.png');
			});
		});
		
		//Verify error message when title is blank
		casper.then(function(){
			var errorMsg = this.fetchText('div.panel-default .alert-danger');
			test.assertEquals(errorMsg.trim() ,json.newTopic.blankTitle.ExpectedErrorMessage.trim(), errorMsg.trim()+' and verified error message');
			casper.echo('---------------------------------------------------------------------------');
		});

		//test case for Start New Topic Page with blank content and verify error message
		casper.thenOpen(config.url, function(){
			casper.echo('Hit on url : '+config.url, 'INFO');
		});

		//go to start new topic
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'INFO');
			});
		});

		//Post New Topic With Blank Content
		casper.then(function() {
			postTopicpage(json.newTopic.blankContent, casper,  function() {		
				casper.echo('post new topic by leaving blank content and verify error message', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Post' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'blankContent.png');
			});
		});

		//Verify error message when content is blank
		casper.then(function(){
			var errorMsg = this.fetchText('div.panel-default .alert-danger');
			test.assertEquals(errorMsg.trim(),json.newTopic.blankContent.ExpectedErrorMessage.trim(), errorMsg.trim()+' and verified error message');
			casper.echo('---------------------------------------------------------------------------');
		});

		//test case for Start New Topic Page with blank category and verify error message		
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url, 'INFO');
		});

		//go to start new topic
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'INFO');
			});
		});

		//Post New Topic With Blank Category
		casper.then(function() {
			postTopicpage(json.newTopic.blankCategory, casper,  function() {		
				casper.echo('post new topic by leaving blank category and verify error message', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Post' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'blankCategory.png');
			});
		});

		//Verify error message when category is blank
		casper.then(function(){
			var errorMsg = this.fetchText('div.panel-default .alert-danger');
			test.assertEquals(errorMsg.trim(),json.newTopic.blankCategory.ExpectedErrorMessage.trim(), errorMsg.trim()+' and verified error message');
			casper.echo('---------------------------------------------------------------------------');
		});

		//Add New topic by enable Follow check box and verify unfollow topic option on forum listing page		
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url, 'INFO');
		});

		//go to start new topic
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'INFO');
			});
		});

		//Post new Topic Page with valid data
		casper.then(function() {
			postTopicpage(json.newTopic.ValidCredential, casper,  function() {		
				casper.echo('Successfully Posted New Topic with followed content ', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Post' Link
		casper.then(function() {
			this.capture(screenShotsDir+ 'postedTopic.png');
		});

		//Verify Post Content when all field are filled with valid data
		casper.then(function(){
			verifyPostContent(json.newTopic.ValidCredential.content, casper, function() {
				casper.echo('Contents are Verified with all valid data', 'INFO');
			});			
		});

		// verify followed contents
		casper.then(function(){
			verifyFollowContent(casper, function(){
				casper.echo('verify Follow Content', 'INFO');
			});
		});

		// make follow post to unfollow post
		casper.then(function() {
			this.click('span.topic-content h4 a.topic-title');
			this.then(function() {
				this.capture(screenShotsDir+ 'clickOnFollowPost.png');
			});
	
			this.then(function() {
				this.click('.glyphicon-minus');
				this.capture(screenShotsDir+ 'clickToUnfollowIcon.png');
			});
		}); 

		// verify new unFollowed content
		casper.then(function(){
			verifyUnFollowContent(casper, function(){
				casper.echo('verify UnFollow Content', 'INFO');
			});
		});

		//Add New topic by disabling Follow check box and verify follow topic option on Post page

		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url, 'INFO');
		});

		//go to new topic
		casper.then(function(){
			gotoNewTopicpage(casper, function() {
				casper.echo('click on START NEW TOPIC', 'INFO');
			});
		});

		//click on follow checkbox
		casper.then(function() {
			this.click('#EMNEW');
			this.capture(screenShotsDir+ 'UnfollowPost.png');
		});

		//Post new Topic Page with valid data
		casper.then(function() {
			postTopicpage(json.newTopic.ValidCredential, casper,  function() {		
				casper.echo('Successfully Posted New Topic with Unfollowed content ', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Post' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'unFollowPostedTopic.png');
			});
		});

		//Verify Post Content when all field are filled with valid data
		casper.then(function(){
			verifyPostContent(json.newTopic.ValidCredential.content, casper, function() {
				casper.echo('Contents are Verified with all valid data', 'INFO');
			});
		});

		// verify Unfollowed contents
		casper.then(function(){
			verifyUnFollowContent(casper, function() {
				casper.echo('verify UnFollow Content', 'INFO');
			});
		});

		// open config.url and click on newly opsted topic
		casper.thenOpen(config.url,function() {
			this.click(json.newTopic.tempHref);	
			this.then(function() {
				this.capture(screenShotsDir+ 'tempHref.png');
			});
		});

		// make unFollow post to follow post
		casper.then(function() {
			this.click('.glyphicon-plus');
			this.capture(screenShotsDir+ 'clickToFollowIcon.png');
		}); 

		// verify new Followed content
		casper.then(function(){
			verifyFollowContent(casper, function(){
				casper.echo('verify Follow Content', 'INFO');
			});
		});

		//follow and unFollow Topic
		//verify warning message when no Topic is followed by user 

		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url, 'INFO');
		});

		//click on followed content link and verify expected Warning message
		casper.then(function() {
			this.capture(screenShotsDir+ 'dropdown.png');
			this.click('span.user-nav-panel li a[href^="/search"]');
			casper.then(function() {
				if(this.exists('.no-space')) { 
					verifyWarningMsg(json.followTopic.ExpectedWarningMessage, casper, function() {
						casper.echo('warning message is verified', 'INFO');
					});
				} else {
					casper.echo('you have followed some topics try to unfollow all contents', 'INFO');
			
					this.click('div.panel-heading input[name = "allbox"]');
					this.then(function() {
						this.capture(screenShotsDir+ 'SelectAllForUnfollowContent.png');
					});
					this.then(function() {
						this.click('.unfollow-button');
					});
					this.then(function() {
						this.capture(screenShotsDir+ 'unfollow.png');
					});
					this.then(function() {
						verifyWarningMsg(json.followTopic.ExpectedWarningMessage, casper, function() {
							casper.echo('warning message is verified', 'INFO');
						});
					});
				}
				casper.then(function() {
					this.then(function() {
						this.capture(screenShotsDir+ 'followedContent.png');
					});
				});
			});
		});

		//follow and unFollow category
		//verify warning message when no category is followed by user 

		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : '+config.url, 'INFO');
		});

		//click on followed category link and verify expected Warning message
		casper.then(function() {
			this.capture(screenShotsDir+ 'dropdown.png');
			this.click('span.user-nav-panel li a[href^="/search"]');
			casper.then(function() {
				this.click('ul.pull-left li#show_threads #anchor_tab_forum_subscriptions');
			});
			casper.then(function() {
					this.capture(screenShotsDir+ 'followedCategory.png');
			});
			casper.then(function() {
				if(this.exists('.no-space')) {
					verifyWarningMsg(json.followCategory.ExpectedWarningMessage, casper, function() {
						casper.echo('warning message is verified','INFO');
					});
				} else { 
					casper.echo('you have followed some category trying to unfollow all category', 'INFO');
					this.click('div.panel-heading input[name = "allbox"]');
					this.then(function() {
						this.capture(screenShotsDir+ 'SelectAllForUnfollowCategory.png');
					});
					this.then(function() {
						this.click('.unfollow-button');
					});
					this.then(function() {
						verifyWarningMsg(json.followCategory.ExpectedWarningMessage, casper, function() {
							casper.echo('warning message is verified', 'INFO');
						});
					});	
				}
				casper.then(function() {
					this.capture(screenShotsDir+ 'followedCategory.png');
				});
			});
		});

		//start poll topic
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start Poll topic ', 'INFO');
			poll.pollFeature(casper,test, x, function(){
				casper.echo('Poll Topic Feature', 'INFO');
			});
		});

		/*//Logout From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Logout' Link
		casper.then(7000, function() {
			this.capture(screenShotsDir+ 'logout.png');
		});*/

		//start pin/unpin topic
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start pin / unpin topic ', 'INFO');
			pinTopic.pinUnPinFeature(casper,test, x, function(){
				casper.echo('Pin Unpin Topic Feature', 'INFO');
			});
		});

		//start move topic
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start move topic ', 'INFO');
			moveTopic.moveTopicFeature(casper,test, x, function(){
				casper.echo('move Topic Feature', 'INFO');
			});
		});

		//start lock/unLock topic
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start Lock / unLock topic ', 'INFO');
			lock_unLockTopic.lockUnLockFeature(casper,test, x, function(){
				casper.echo('Lock UnLock Topic Feature', 'INFO');
			});
		});

		//start edit topic title and edit topic content
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start edit topic title and edit topic content', 'INFO');
			editTopic.editTopicFeature(casper,test, x, function(){
				casper.echo('Edit Topic Feature', 'INFO');
			});
		});

		//start post a reply feature and share, edit and delete post		
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start post a reply feature and share, edit and delete post', 'INFO');
			postAReply.postAReplyFeature(casper,test, x, function(){
				casper.echo('Post A Reply Feature', 'INFO');
			});
		});

		//start delete topic feature
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start delete topic feature ', 'INFO');
			deleteTopic.deleteTopicFeature(casper,test, x, function(){
				casper.echo('Delete Topic Feature', 'INFO');
			});
		});
};


//private methods


/************************************PRIVATE METHODS***********************************/


// method for goto New Topic page to application

var gotoNewTopicpage = function(driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	driver.then(function() {
		this.capture(screenShotsDir+ 'startTopic.png');
	});
	return callback();
};


// method for goto New Topic page to application

var postTopicpage = function(data, driver, callback) {
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	 driver.withFrame('message_ifr', function() {
		this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
		this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 		this.sendKeys('#tinymce', data.content);
	});	
	driver.then(function() {
		if(data.category) {
			driver.click('#all_forums_dropdown');
			var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
			driver.fill('form[name="PostTopic"]',{
				'forum' : val.trim()
			},false);
			driver.capture(screenShotsDir+ 'content.png');
		}
	});	
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback();
};

// method for verify post content Topic page to application

var verifyPostContent = function(content, driver, callback) {
	var contentMsg = driver.fetchText('div.post-body-content span[id^="post_message_"]');
	casper.echo('***********************  contentMsg' +contentMsg.trim());
	driver.test.assertEquals(content,contentMsg.trim(), content+' and verified post content');
	casper.echo('---------------------------------------------------------------------------');
	return callback();
};

// method for follow content on follow content page to application

var verifyFollowContent = function(driver, callback) {
		var url = driver.getCurrentUrl();
		url = url.split("#");
		url= url[0].split(".com");			
		driver.click('li.user-panel .dropdown-toggle');
		driver.capture(screenShotsDir+ 'dropdown.png');
		driver.click('span.user-nav-panel li a[href^="/search"]');
		driver.then(function() {
			this.capture(screenShotsDir+ 'followedContent.png');
		});
		driver.then(function() {
			casper.echo('a[href="'+url[1]+'"]','INFO');
			this.test.assertExists('span.topic-content h4 a[href="'+url[1]+'"]');
			casper.echo('---------------------------------------------------------------------------');
		});
	return callback();
};

// method for verify unFollow content on follow content page to application

var verifyUnFollowContent = function(driver, callback) {
		var url = driver.getCurrentUrl();
		url = url.split("#");
		url= url[0].split(".com");
		driver.click('li.user-panel .dropdown-toggle');
		driver.capture(screenShotsDir+ 'dropdown.png');
		driver.click('span.user-nav-panel li a[href^="/search"]');
		driver.then(function() {
			this.capture(screenShotsDir+ 'followedContent.png');
		});
		driver.then(function() {
			this.test.assertDoesntExist('span.topic-content h4 a[href="'+url[1]+'"]');
			casper.echo('---------------------------------------------------------------------------');
		});
			json.newTopic.tempHref = 'a[href="'+url[1]+'"]';
		
	return callback();
};

// verify warning message for follow content and follow category

var verifyWarningMsg = function(warningMsg, driver, callback){

	var warningMessage = driver.fetchText('.no-space');
	casper.echo('warningMessage : ' +warningMessage.trim());
	driver.test.assertEquals(warningMessage.trim(), warningMsg.trim(), warningMessage.trim()+' and warning message is verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback();
};
