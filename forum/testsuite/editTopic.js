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

			
	//Login To Backend URL and disable edit post checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable post poll checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		//forumRegister.loginToForumBackEnd(casper, test, function(err) { //(rm)
			//if(!err) { 
				casper.echo('User has been successfuly login to backend', 'INFO');
				//go to user permission
				utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
					if(!err) {
						casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
						//click on checkbox
						casper.waitForSelector('#edit_posts', function success() {
							utils.enableorDisableCheckbox('edit_posts', false, casper, function(err) {	
								if(!err) {
									casper.echo("edit posts checkbox has been disabled", 'INFO');
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
			
	/*****test case to edit topic title and topic content when permission is disable*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case to edit topic titel and topic content when permission is disable', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//login with register user
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
				casper.waitForSelector('form[name="posts"]', function success() {
					test.assertExists('form[name="posts"] h4 a');
					casper.click('form[name="posts"] h4 a');
					casper.waitForSelector('#editable_subjuct', function success() {
						test.assertDoesntExist('#editTopic');
						casper.echo('you have not permission to edit title', 'INFO');
						casper.echo('---------------------------------------------------------------------------');
						test.assertDoesntExist('a#edit_post_request');
						casper.echo('you have not the permission to edit posts', 'INFO');
						casper.echo('---------------------------------------------------------------------------');
					}, function fail(err) {
						casper.echo(err);				
					});
				}, function fail(err) {
					casper.echo("selector not found" +err);
				});
			}
		});
	});	
	
	//Login To Backend URL and enable edit post checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable edit post checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		casper.echo('User has been successfuly login to backend', 'INFO');
		//go to user permission
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
			if(!err) {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				//click on checkbox
				casper.waitForSelector('#edit_posts', function success() {
					utils.enableorDisableCheckbox('edit_posts', true, casper, function(err) {	
						if(!err) {
							casper.echo("edit post checkbox has been enabled", 'INFO');
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
	
	/*****test case to Edit topic title with blank data*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case to Edit topic title with blank data', 'INFO');
		casper.echo('title of the page : ' +this.getTitle(), 'INFO');
		casper.waitForSelector('a[href="/post/printadd"]', function success() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
				if(!err) {
					casper.echo('START NEW TOPIC with valid credential', 'INFO');
					casper.wait(7000, function() {
						casper.thenOpen(config.url, function() {
							casper.echo('go to topic listing page : ', 'INFO');
							casper.waitForSelector('form[name="posts"] h4 a', function success() {
								casper.on('remote.alert', testAlert1);
								editTopicTitle(json.editTopic.blankTitle.title, casper, function() {
									casper.log('editing topic title with invalid data', 'INFO');
									// removing listner alert1
									casper.removeListener('remote.alert', testAlert1);		
								});
							}, function fail(err) {
								casper.echo(err);
							});
						});
					});
				}
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});			

	/*****test case to Edit topic title with valid data*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case to Edit topic title with valid data', 'INFO');
		casper.echo('title of the page : ' +this.getTitle(), 'INFO');
		casper.waitForSelector('a[href="/post/printadd"]', function success() {
			editTopicTitle(json.editTopic.validTitle.title, casper, function() {
				casper.echo('editing topic title with valid data', 'INFO');
				casper.waitForSelector('#editable_subjuct', function success() {
					var getTitle = this.fetchText('#editable_subjuct');
					test.assertEquals(getTitle.trim(), json.editTopic.validTitle.title.trim(), getTitle.trim()+' and verified title');
					casper.echo('title is verified with valid data', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				}, function fail(err) {
					casper.echo(err);
				});		
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});	

	
	/*****Verify error message  for Edit Topic Content With blank data*****/
	casper.then(function() {
		casper.echo('Verify error message  for Edit Topic Content With blank data', 'INFO');
		this.on('remote.alert', testAlert2);
		editTopicContent(json.editTopic.blankContent.content, casper, function() {
			casper.log('edited topic content with blank data', 'INFO');
		});
	});	

	//wait for 3 second to remove alert1 listener	
	casper.wait(3000, function() {
		this.removeListener('remote.alert', testAlert2);
	});

	/*****test case to Edit Topic Content With Valid Data*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case to Edit Topic Content With Valid Data', 'INFO');
		casper.waitForSelector('a[href="/post/printadd"]', function success() {
			editTopicContent(json.editTopic.validContent.content, casper, function() {
				casper.echo('edited topic content', 'INFO');
				//Verify Edit Topic Content With Valid data
				casper.waitForSelector('#quickReplyPost', function success() {
					verifyEditTopicContent(casper, function(err) {
						if(!err) {
							casper.echo('content successfully verified with valid content', 'INFO');
						}
					});
				}, function fail(err) {
					casper.echo(err);
				});
			});
		}, function fail(err) {
			casper.echo(err);
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
		this.click('div.post-body .panel-dropdown .pull-right ul.dropdown-menu li a#edit_post_request');
	});	

	driver.wait(7000, function(){
		this.withFrame('message1_ifr', function() {
			casper.echo('*****enter message in iframe', 'INFO');
			driver.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			driver.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce', content);
			driver.capture(screenShotsDir+ 'editedTopicContent.png');	
		});
	});	
	driver.then(function(){
		this.click('div.form-group input.btn-primary');	
	});

	//wait for 7 second for post
	driver.wait(7000, function(){
			driver.capture(screenShotsDir+ '11.png');	
	});			
	return callback();
};

// method for go to new poll to application

var gotoNewTopic = function(data, driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	
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

	driver.then(function() {
		this.click('#post_submit');
	});
	return callback();
};
// verify edit topic content
var verifyEditTopicContent = function(driver, callback) {
	casper.echo('Verify Edit Topic Content With Valid data', 'INFO');
	var getContent = driver.fetchText('span[id^="post_message_"]');
	casper.echo("*************getContent : "+getContent);
	driver.test.assertEquals(getContent.trim(), json.editTopic.validContent.content.trim(), getContent.trim()+' and content verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback(null);
};
var verifyPermissionSettingMsg = function(driver, callback) {
	driver.capture(screenShotsDir+'Permission.png');
	var msg  = driver.fetchText('p[align="center"] font.heading');
	driver.test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and message verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback(null);
}; 
