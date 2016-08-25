/****This script is dedicated for user to post a reply on any topic on the forum. It covers testing of post a reply page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var postAReply = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'postAReply/';

postAReply.postAReplyFeature = function(casper, test, x, callback) {

	//Login To Backend URL and disable Reply Topic and Reply Own Topic checkbox
		casper.thenOpen(config.backEndUrl, function() {
			casper.echo('Login To Backend URL and disable Reply Topic and Reply Own Topic checkbox', 'INFO');
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
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				casper.then(function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});	
		
		//click on checkbox set false
		casper.then(function() {
			utils.enableorDisableCheckbox('post_replies', false, casper, function() {
				casper.echo("Reply Topic checkbox has been disabled", 'INFO');
			});
		});

		//click on check box set false
		casper.then(function() {
			utils.enableorDisableCheckbox('other_post_replies', false, casper, function() {
				casper.echo("Reply own Topic checkbox has been disabled", 'INFO');
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
			test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and message verified');
			casper.echo('---------------------------------------------------------------------------');
		});
		
		//getting screenshot after change permission
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});		
		
		// start from forum url
		casper.thenOpen(config.url, function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');
		});
		
		// post reply on own Topics when permission false	
		casper.then(function(){
			this.click('form[name="posts"] h4 a');
			test.assertDoesntExist('#message');
			casper.echo('you dont have permission to reply post on own topic', 'INFO');	
			casper.echo('---------------------------------------------------------------------------');
		});
		
		//Logout From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});
		});
	
		//Login To App with other user
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username1, json['newTopic'].password1, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Log In' Link 
			casper.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});
		});

		// post reply on others Topic when permission false	
		casper.then(function(){
			test.assertDoesntExist('#message');
			casper.echo('you dont have permission to reply post on others topic', 'INFO');
			casper.echo('---------------------------------------------------------------------------');
		});


	// reopen Backend URL and enable Reply Topic and Reply Own Topic checkbox
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and enable Reply Topic and Reply Own Topic checkbox', 'INFO');
			this.then(function() {
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});
		
		//go to edit user group permission
		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				casper.then(function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});	

		//click on checkbox set true
		casper.then(function() {
			utils.enableorDisableCheckbox('other_post_replies', true, casper, function() {
				casper.echo("Reply Others Topic checkbox has been enabled", 'INFO');
			});
		});

		//click on checkbox set true
		casper.then(function() {
			utils.enableorDisableCheckbox('post_replies', true, casper, function() {
				casper.echo("reply Own Tpoic checkbox has been enabled", 'INFO');
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
			test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and verified message');
			casper.echo('---------------------------------------------------------------------------');
		});

		//getting screenshot after change permission
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});		

		//reopen forum url for reply on topic after change permission
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on URL : '+config.url, 'INFO');
		});

		//getting screenshot after hit on forum
		casper.then(function() {
			this.capture(screenShotsDir+'forumUrl.png');
		});		
		
		// post reply on others topic with valid and invalid contents 	
		casper.then(function() {
			casper.echo('replyed on others topic', 'INFO');
			postReplyAndVerify();
		});
			
		//Logout From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});
		});
	
		//Login To App with other user to post reply on own topic
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Log In' Link 
			casper.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});
		});

		// post reply on own topic with valid and invalid contents
		casper.then(function() {
			casper.echo('replyed on own topic', 'INFO');
			postReplyAndVerify();
		});
		
		//Log Out From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});
		});
	
		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username1, json['newTopic'].password1, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
			});
		});

		//share post
		casper.then(function() {
			this.then(function() {
				clickOnDropdown(x, json.sharePost.username, json.sharePost.content, casper, function() {  
					casper.echo('click on dropdown', 'INFO');
				});
			});
			this.then(function() {
				shareOn(json.sharePost.email,json.sharePost.password, casper, function() {
					casper.echo('sharing on facebook', 'INFO');		
				});
			});
		});

		// edit own post when it is disabled from backend
	// reopen Backend URL and disable edit own post checkbox
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and disable Edit Own Post checkbox', 'INFO');
			this.then(function() {
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});
		
		//go to user group permission
		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				casper.then(function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});

		//click on checkbox set false	
		casper.then(function() {
			utils.enableorDisableCheckbox('edit_posts', false, casper, function() {
				casper.echo("Edit Own Post checkbox has been disabled", 'INFO');
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
			test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and verified Message');
			casper.echo('---------------------------------------------------------------------------');
		});

		//getting screenshot after change permission
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});	

		//reopen forum url for edit own post after change permission
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on URL : '+config.url, 'INFO');

			//getting screenshot after hit on forum url
			casper.then(function() {
				this.capture(screenShotsDir+'forumUrl.png');
			});	
		});

		//click on dropdown
		casper.then(function() {
			this.then(function() {
				clickOnDropdown(x, json.sharePost.username, json.sharePost.content, casper, function() {  
					casper.echo('click on dropdown', 'INFO');
				});
			});
			
			casper.then(function() {
				/*var pid = json.deletePost.dataPid;
				test.assertDoesntExist('a[data-pid="'+pid+'"]');
				this.click('a[data-pid="'+pid+'"]');*/
				test.assertDoesntExist('#edit_post_request');
				casper.echo('you can not edit your post go to user permission and change the settings', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});

	// reopen Backend URL and enabled edit own post checkbox
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and enable Edit Own Post checkbox', 'INFO');
			this.then(function() {
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});
		
		//go to edit user group permission
		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				casper.then(function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});

		//click on checkbox set true	
		casper.then(function() {
			utils.enableorDisableCheckbox('edit_posts', true, casper, function() {
				casper.echo("Edit Own Post checkbox has been enable", 'INFO');
			});
		});

		//click on save change
		casper.then(function() {
			utils.clickOnElement(casper, '.btn-blue', function() {
				casper.echo('Saving Changes', 'INFO');
			});
		});

		//verify update setting message
		casper.then(function() {
			var msg  = this.fetchText('p[align="center"] font.heading');
			test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and verified message');
			casper.echo('---------------------------------------------------------------------------');
		});

		//getting screenshot after change permission
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});	
 		
		//reopen forum url for edit own post after change permission
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on URL : '+config.url, 'INFO');
		});

		//getting screenshot after hit on forum url
		casper.then(function() {
			this.capture(screenShotsDir+'forumUrl.png');
		});	

		//click on dropdown
		casper.then(function() {
			clickOnDropdown(x, json.sharePost.username, json.sharePost.content, casper, function() {  
				casper.echo('clicked on dropdown', 'INFO');
			});
			
			casper.then(function() {
				var pid = json.deletePost.dataPid;
				test.assertExists('a[data-pid="'+pid+'"]');
				casper.echo('---------------------------------------------------------------------------');
				this.click('a[data-pid="'+pid+'"]');
			});
		});

		//Verify error message  for Edit post With blank data

		casper.then(function() {
			this.on('remote.alert', function(message) {
				test.assertEquals(message, json.editTopic.blankContent.ExpectedErrorMessage.trim(), message+' and verified error message');
				casper.echo('---------------------------------------------------------------------------');
			});
		});	

		//Edit Topic Content With blank Data
		casper.then(function(){
			casper.wait(7000, function(){
				this.withFrame('message1_ifr', function() {
					casper.echo('*****enter message in iframe', 'INFO');
					this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
					this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true}); 						this.sendKeys('#tinymce', json.editTopic.blankContent.content);
					this.capture(screenShotsDir+ 'editBlankContent.png');	
				});
			});	
			casper.then(function(){
				this.click('div.form-group input.btn-primary');	
			});
		});
	
		//Getting Screenshot After editing topic content 
		casper.then(function(){
			this.capture(screenShotsDir+ 'editedPostBlank.png');
		});
		
		//Edit Topic Content With Valid Data
		casper.thenOpen(config.url, function() {
			casper.log('Hit on url : '+config.url, 'INFO');
		});

		//click on dropdown
		casper.then(function() {
			this.then(function() {
				clickOnDropdown(x, json.sharePost.username, json.sharePost.content, casper, function() {  
					casper.echo('clicked on dropdown', 'INFO');
				});
			});
			this.then(function() {
				var pid = json.deletePost.dataPid;
				test.assertExists('a[data-pid="'+pid+'"]');
				this.click('a[data-pid="'+pid+'"]');
			});
		});
		
		casper.then(function(){
			casper.wait(7000, function(){
				this.withFrame('message1_ifr', function() {
					casper.echo('*****enter message in iframe', 'INFO');
					this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
					this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true}); 						this.sendKeys('#tinymce', json.editPost.validContent);
					this.capture(screenShotsDir+ 'editeFilledContent.png');	
				});
			});	
			casper.then(function(){
				this.click('div.form-group input.btn-primary');	
			});
		});

		//Getting Screenshot After editing topic content 
		casper.wait(5000, function(){
			this.capture(screenShotsDir+ 'editedPost.png');
		});


		//Verify Edited post With Valid data
		casper.then(function() {
			var username = json.sharePost.username;
			var content = json.editPost.validContent;
			var msg = this.fetchText(x('//a[text()="'+username+'"]/following::span[contains(text(),"'+content+'")]'));
			test.assertEquals(msg.trim(), content.trim(), msg.trim()+' and verified post content');		
			casper.echo('---------------------------------------------------------------------------');
		});

	// reopen Backend URL and disable delete own post checkbox
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and disable Delete Own Post checkbox', 'INFO');
			this.then(function() {
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				casper.echo('---------------------------------------------------------------------------');		
			});
		});
		
		//go to edit user group permission
		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				casper.then(function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});

		//click on checkbox set false	
		casper.then(function() {
			utils.enableorDisableCheckbox('delete_posts', false, casper, function() {
				casper.echo("Delete Own Post checkbox has been disabled", 'INFO');
			});
		});

		//click on save button
		casper.then(function() {
			utils.clickOnElement(casper, '.btn-blue', function() {
				casper.echo('Saving Changes', 'INFO');
			});
		});

		//verify update setting permission message
		casper.then(function() {
			var msg  = this.fetchText('p[align="center"] font.heading');
			test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and verified message');
			casper.echo('---------------------------------------------------------------------------');
		});

		//getting screenshot after change permission
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});	
 		
		//reopen forum url for delete own post after change permission
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on URL : '+config.url, 'INFO');
		});

		//getting screenshot after hit on forum url
		casper.then(function() {
			this.capture(screenShotsDir+'forumUrl.png');
		});	

		//click on dropdown
		casper.then(function() {
			this.then(function() {
				clickOnDropdown(x, json.deletePost.username, json.deletePost.content, casper, function() {  
					casper.echo('clicked on dropdown', 'INFO');
				});
			});
			this.then(function() {
				test.assertDoesntExist('#delete_post_request');
				casper.echo('you can not delete post go to user permission and change the settings', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});

	// reopen Backend URL and enable delete own post checkbox
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and enable Delete Own Post checkbox', 'INFO');
			this.then(function() {
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});
		
		//go to edit user group permission setting page
		casper.then(function() {
			utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				casper.then(function(){
					this.capture(screenShotsDir+'EditUserPermissionpage.png');
				});
			});
		});

		//click on checkbox set true	
		casper.then(function() {
			utils.enableorDisableCheckbox('delete_posts', true, casper, function() {
				casper.echo("Delete Own Post checkbox has been enabled", 'INFO');
			});
		});

		//click on save button
		casper.then(function() {
			utils.clickOnElement(casper, '.btn-blue', function() {
				casper.echo('Saving Changes', 'INFO');
			});
		});

		//verify update setting permission message
		casper.then(function() {
			var msg  = this.fetchText('p[align="center"] font.heading');
			test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+'and verified message');
			casper.echo('---------------------------------------------------------------------------');
		});

		//getting screenshot after 
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});	
 		
		//reopen forum url for edit own post after change permission
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on URL : '+config.url, 'INFO');
		});

		//getting screenshot after hit on url
		casper.then(function() {
			this.capture(screenShotsDir+'forumUrl.png');
		});	

		//click on dropdown
		casper.then(function() {
			clickOnDropdown(x, json.deletePost.username, json.deletePost.content, casper, function() {  
				casper.echo('clicked on dropdown', 'INFO');
			});
			
			casper.then(function() {
				var pid = json.deletePost.dataPid;
				test.assertExists('a[data-pid="'+pid+'"][id="delete_post_request"]');
				casper.echo('---------------------------------------------------------------------------');
				this.click('a[data-pid="'+pid+'"][id="delete_post_request"]');
				casper.then(function() {
					this.capture(screenShotsDir+'deletePost.png');
				});
			});
		});
		
		//verify deleted post
		casper.then(function() {
			test.assertDoesntExist(json.deletePost.deleteVal);
			casper.echo('deleted post is verified', 'INFO');
			casper.echo('---------------------------------------------------------------------------');
		});
		

	///*****************************************************************************************///
	function postReplyAndVerify(){
		// Verify error message when user try to post blank content

	casper.then(function() { 
		casper.on('remote.alert', function(message) { 
    			casper.echo('alert message: ' + message, 'INFO');
			var errMessage = message;
			test.assertEquals(errMessage.trim(), json.replyTopic.blankContent.ExpectedErrorMessage.trim());
			casper.echo('Error message is verified when user enters blank content', 'INFO');
			casper.echo('---------------------------------------------------------------------------');				
		});
	});
	
	//Reply topic with blank content
	casper.then(function() {
		replyTopic(json.replyTopic.blankContent.content, casper, function() {
			casper.echo('post a reply by leaving blank content and verify error message', 'INFO');
		});
	});

	
	//Getting Screenshot After Clicking On 'POST' Link 
	casper.thenOpen(config.url, function() {
	    this.echo("Hit on url : " +config.url, 'INFO');
	});

	//Reply topic with valid credential
	casper.then(function() {
		replyTopic(json.replyTopic.ValidCredential.content, casper, function() {
			casper.echo('Replied successfully', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'POST' Link 
	casper.wait(5000, function( ){
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
		test.assertEquals(contentMsg.trim(), json.replyTopic.ValidCredential.content.trim(), contentMsg.trim()+' and verified content message');
		casper.echo('content message is Verified when user try to post a reply on topic', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});
	};
	return callback();
};


/************************************PRIVATE METHODS***********************************/

// method for reply post on any topic

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

	
	driver.waitForSelector('#reply_submit', function(){
		this.click('#reply_submit');
	});	
	return callback();
};

// method for share post and share post 

var clickOnDropdown = function(x, username, content, driver, callback){

	try {
		driver.click('form[name="posts"] h4 a');
	} catch(err) {

	}

	driver.then(function() {
		var classVal = x('//a[text()="'+username+'"]/following::span[contains(text(),"'+content+'")]');
		var postId = casper.getElementAttribute(classVal, "id");		
		var id = postId.replace('post_message', 'posttoggle' );
		var pid = id.replace('posttoggle_','');
		casper.echo('postId : '+postId, 'INFO');
		casper.echo('id : '+id, 'INFO');
		casper.echo('pid : '+pid, 'INFO');
		json.deletePost.dataPid = pid;
		json.deletePost.deleteVal = postId;
		this.click('#'+id);
	});
	
	driver.then(function() {
		this.capture(screenShotsDir+ 'dropdown.png');
	});

	return callback();
};

var shareOn = function(email, password, driver, callback) {
	
	driver.then(function() {
		this.click('.openShareDialog');
	});
	driver.then(function() {
		this.capture(screenShotsDir+ 'sharePostPage.png');
	});
	var elehref = "";
	driver.then(function() {
		this.test.assertExists('#fb_share');
		elehref = this.evaluate(function() {
			var element = document.querySelector("#fb_share").getAttribute("href");
			return element;
		});
		
		casper.echo('socialUrl : ' +elehref, 'INFO');
		this.page.content = '<a href="'+elehref+'">myfacebook</a>';
    		this.clickLabel('myfacebook');
	});
	driver.then(function() {
		this.capture(screenShotsDir+ 'facebookLogin.png');		
	});
	driver.then(function() {
		this.sendKeys('#email', email);
		this.sendKeys('#pass', password);
		this.click('#u_0_2');
		casper.echo('successfully login to facebook', 'INFO');
	});

	driver.then(function() {
		this.capture(screenShotsDir+ 'fb.png');
	});
	driver.then(function() {
		this.test.assertExists('button[name="__CONFIRM__"]');
		var text  = this.fetchText('button[name="__CONFIRM__"]');
		casper.echo('button text : '+text, 'INFO');
		casper.echo('title of the page : '+this.getTitle(), 'INFO');
		this.click('button[name="__CONFIRM__"]');
		casper.echo('successfully posted on facebook', 'INFO');
	});
	casper.then(function() {
		this.capture(screenShotsDir+ 'fbPost.png');
	});
};





















