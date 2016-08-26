/****This script is dedicated for user to edit topic on the forum. It covers testing of edit topic page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var editTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'editTopic/';

editTopic.editTopicFeature = function(casper,test, x, callback) {

			//go to backend url
			casper.thenOpen(config.backEndUrl,function() {
				casper.echo('Login To Backend URL and disable start topic checkbox', 'INFO');
				this.then(function() {
					casper.echo('Title of the page :' +this.getTitle(), 'INFO');
					casper.echo('---------------------------------------------------------------------------');		
				});
			});
			
			//login to backend url (rm)
			/*casper.then(function() {
				forumRegister.loginToForumBackEnd(casper, test, function() {
					casper.echo('User has been successfuly login to backend', 'INFO');
				});
			});*/
			//go to user group permission
			casper.then(function() {
				utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
					casper.echo("Successfully navigated to Edit User group Permission page", 'INFO');
					casper.then(function(){
						this.capture(screenShotsDir+'EditUserPermissionpage.png');
					});
				});
			});	

			// click on checkbox
			casper.then(function() {
				utils.enableorDisableCheckbox('edit_posts', false, casper, function() {
					casper.echo("Edit Tpoic checkbox has been disabled", 'INFO');
				});
			});

			//click on save button
			casper.then(function() {
				utils.clickOnElement(casper, '.btn-blue', function() {
					casper.echo('Saving Changes', 'INFO');
				});
			});

			//verify update setting permission
			casper.then(function() {
				var msg  = this.fetchText('p[align="center"] font.heading');
				test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and verified update message');
				casper.echo('---------------------------------------------------------------------------');
			});

			//getting a screenshot after change the permission
			casper.then(function() {
				this.capture(screenShotsDir+'afterChangePermission.png');
			});		
		
			// start from forum url
			casper.thenOpen(config.url, function() {
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
			//Login To App
			casper.then(function() {
				forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
					casper.echo('User has been successfuly login to application with register user', 'INFO');
				});
				//Getting Screenshot After Clicking On 'Log In' Link 
				casper.then(function() {
					this.capture(screenShotsDir+ 'login.png');
				});
			});

			// edit topic title when permission false	
			casper.then(function(){
				casper.echo('edit topic titel when permission is disable', 'INFO');
				this.click('form[name="posts"] h4 a');
				test.assertDoesntExist('#editTopic');
				casper.echo('you have not permission to edit title', 'INFO');
				casper.echo('---------------------------------------------------------------------------');	
			});

			// edit topic content when permission false
			casper.then(function(){
				casper.echo('edit post when permission is disable', 'INFO');
				test.assertDoesntExist('a#edit_post_request');
				casper.echo('you have not the permission to edit posts', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});

			// reopen backend to enable permission
			casper.thenOpen(config.backEndUrl,function() {
				casper.echo('Login To Backend URL and enable start topic checkbox', 'INFO');
				this.then(function() {
					casper.echo('Title of the page :' +this.getTitle(), 'INFO');
					casper.echo('---------------------------------------------------------------------------');		
				});
			});
		
			//go to user group permission
			casper.then(function() {
				utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
					casper.echo("Successfully navigated to Edit User group Permission page", 'INFO');
					casper.then(function(){
						this.capture(screenShotsDir+'EditUserPermissionpage.png');
					});
				});
			});	
		
			//click on checkbox
			casper.then(function() {
				utils.enableorDisableCheckbox('edit_posts', true, casper, function() {
					casper.echo("Edit Tpoic checkbox has been enabled", 'INFO');
				});
			});

			//click on save button
			casper.then(function() {
				utils.clickOnElement(casper, '.btn-blue', function() {
					casper.echo('Saving Changes', 'INFO');
				});
			});

			//verify update setting message
			casper.then(function() {
				var msg  = this.fetchText('p[align="center"] font.heading');
				test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and verified update message');
				casper.echo('---------------------------------------------------------------------------');
			});

			//getting screenshot after change permission
			casper.then(function() {
				this.capture(screenShotsDir+'afterChangePermission.png');
			});		

			//start from forum url
			casper.thenOpen(config.url, function() {
				casper.echo('Hit on URL : '+config.url, 'INFO');
			});
		
			//create new topic to perform edit title and edit post		
			casper.then(function() {
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
					casper.echo('go to new topic', 'INFO');
				});
			});
			casper.then(function() {
				this.click('#post_submit');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');
				});
			});
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page : ', 'INFO');
			});
			
			// Verify error message when user try edit with blank title
			casper.then(function() {	 
				this.on('remote.alert', testAlert1);
			});

			//Edit topic title with blank data
			casper.then(function(){
				casper.echo('Edit topic title with blank data', 'INFO');
				editTopicTitle(json.editTopic.blankTitle.title, casper, function() {
					casper.log('editing topic title with invalid data', 'INFO');		
				});
			});
	
			// removing listner alert1
			casper.then(function() {
					this.removeListener('remote.alert', testAlert1);
			});

			//Getting Screenshot After edited Topic title 
			casper.then(function(){
				this.capture(screenShotsDir+ 'editedBlankTopicTitle.png');
			});

			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page : ', 'INFO');
			});

			//Edit topic title with valid data
			casper.then(function(){
				casper.echo('Edit topic title with valid data', 'INFO');
				editTopicTitle(json.editTopic.validTitle.title, casper, function() {
					casper.echo('editing topic title with valid data', 'INFO');		
				});
			});

			//Getting Screenshot After edited Topic title 
			casper.then(function(){
				this.capture(screenShotsDir+ 'editedTopicTitle.png');
			});


			//Verify Topic Title With valid data
			casper.then(function(){
				var getTitle = this.fetchText('#editable_subjuct');
				test.assertEquals(getTitle.trim(), json.editTopic.validTitle.title.trim(), getTitle.trim()+' and verified title');
				casper.echo('title is verified with valid data', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});

			//Verify eerror message  for Edit Topic Content With blank data
			casper.then(function() {
			    this.on('remote.alert', testAlert2);
			});	

			//Edit Topic Content With blank Data
			casper.then(function(){
				casper.echo('Edit Topic Content With blank Data', 'INFO');
				editTopicContent(json.editTopic.blankContent.content, casper, function() {
					casper.log('edited topic content', 'INFO');
				});
			});

			//wait for 3 second to remove alert1 listener	
			casper.wait(3000, function() {});

			casper.then(function() {
				this.removeListener('remote.alert', testAlert2);
			});
	
			//Getting Screenshot After editing topic content 

			casper.then(function(){
				this.capture(screenShotsDir+ 'editedTopicContent.png');
			});

	
			//Edit Topic Content With Valid Data
			casper.thenOpen(config.url, function() {
				casper.echo('Edit Topic Content With Valid Data', 'INFO');
				casper.echo('go to topic listing page : ', 'INFO');
			});

			casper.then(function(){
				editTopicContent(json.editTopic.validContent.content, casper, function() {
					casper.log('edited topic content', 'INFO');
				});
			});

			//Getting Screenshot After editing topic content 
			casper.wait(7000, function(){
				this.capture(screenShotsDir+ 'editedTopicContent.png');
			});


			//Verify Edit Topic Content With Valid data
			casper.then(function() {
				casper.echo('Verify Edit Topic Content With Valid data', 'INFO');
				var getContent = this.fetchText('div.post-body-content span[id^="post_message_"]');
				test.assertEquals(getContent.trim(), json.editTopic.validContent.content.trim(), getContent.trim()+' and content verified');
				casper.echo('content successfully verified with valid content', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});

			function testAlert1(message) {
				casper.echo('message: '+message, 'INFO');
		    		this.test.assertEquals(message.trim(), json.editTopic.blankTitle.ExpectedErrorMessage.trim(), 'Error Message is verified');
				casper.echo('---------------------------------------------------------------------------');
			};

			function testAlert2(message) {
				casper.echo('message : '+message, 'INFO');
		    		this.test.assertEquals(message.trim(), json.editTopic.blankContent.ExpectedErrorMessage.trim(), 'Error Message is verified');
				casper.echo('---------------------------------------------------------------------------');
			};

	return callback();
};



/************************************PRIVATE METHODS***********************************/


// method for edit topic title to application

var editTopicTitle = function(title, driver, callback){ 
	casper.echo("title : "+title, 'INFO');
	try{
		driver.click('form[name="posts"] h4 a');
	} catch(err) {

	}
	
		driver.then(function(){
			driver.click('#editTopic');
			this.then(function() {
				this.capture(screenShotsDir+ 'editTopicTitle.png');
			});
		});
	
		driver.then(function(){
				driver.sendKeys('.input-sm', title, {reset:true});
				this.capture(screenShotsDir+ 'setTopicTitle.png');
		});
		driver.then(function(){
				driver.click('div.editable-buttons .editable-submit');
		});
	
	
	return callback();
};




// method for edit topic content to application

var editTopicContent = function(content, driver, callback){
	try{
		driver.click('form[name="posts"] h4 a');
	} catch(err) {

	}

		driver.then(function(){
			this.click('div.post-body .panel-dropdown .pull-right a.dropdown-toggle');
			this.then(function(){
				driver.capture(screenShotsDir+ 'editPopUp.png');
			});
		});
	
		driver.then(function(){
			this.click('div.post-body .panel-dropdown .pull-right ul.dropdown-menu li a#edit_post_request');
			this.then(function(){
				driver.capture(screenShotsDir+ 'edit.png');
			});		
		});	

		driver.wait(7000, function(){
			this.withFrame('message1_ifr', function() {
				casper.echo('*****enter message in iframe', 'INFO');
				driver.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				driver.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true}); 					driver.sendKeys('#tinymce', content);
				driver.capture(screenShotsDir+ 'editedTopicContent.png');	
			});
		});	
		driver.then(function(){
			this.click('div.form-group input.btn-primary');	
		});

	return callback();
};

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
			this.capture(screenShotsDir+ 'content.png');	
		});	
		driver.then(function() {
			this.click('#all_forums_dropdown');
			var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
			this.fill('form[name="PostTopic"]',{
				'forum' : val.trim()
			},false);
			this.capture(screenShotsDir+ 'fillTopic.png');
		});
	});

	return callback();
};

