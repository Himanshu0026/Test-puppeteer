/****This script is dedicated for user to delete topic from forum. It covers testing of topic page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../../config/config.json');

var deleteTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'deleteTopic/';

deleteTopic.deleteTopicFeature = function(casper, test, x, callback) {
	//Login To Backend URL and disable Reply Topic and Reply Own Topic checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable Delete Topic checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		//forumRegister.loginToForumBackEnd(casper, test, function(err) { //(rm)
			//if(!err) { 
				casper.echo('User has been successfuly login to backend', 'INFO');
				//go to user permission
				utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
					if(!err) {
						casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
						//click on checkbox
						casper.waitForSelector('#delete_threads', function success() {
							utils.enableorDisableCheckbox('delete_threads', false, casper, function(err) {	
								if(!err) {
									casper.echo("Delete Topic checkbox has been disabled", 'INFO');
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
			
	/*****test case to delete other post when delete own topic checkbox is disable*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case to post reply on own Topics when permission false', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//login with register user
		forumLogin.loginToApp(json['newTopic'].username1, json['newTopic'].password1, casper, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
				casper.waitForSelector('form[name="posts"]', function success() {
						test.assertDoesntExist('div.panel-body input.entry-checkbox');
						casper.echo('topic is not deleted go to backed and change the permission', 'INFO');
						casper.echo('---------------------------------------------------------------------------');
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});
	
	//Login To Backend URL and enable Delete Topic checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable Delete Topic checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		casper.echo('User has been successfuly login to backend', 'INFO');
		//go to user permission
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
			if(!err) {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				//click on checkbox
				casper.waitForSelector('#delete_threads', function success() {
					utils.enableorDisableCheckbox('delete_threads', true, casper, function(err) {	
						if(!err) {
							casper.echo("Delete Topic checkbox has been enabled", 'INFO');
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

	/*****test case to delete other post when delete own topic checkbox is enable*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case to post reply on own Topics when permission false', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//login with register user
		forumLogin.loginToApp(json['newTopic'].username1, json['newTopic'].password1, casper, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
				casper.waitForSelector('form[name="posts"]', function success() {
					//Delete others Topic
						test.assertDoesntExist('div.panel-body input.entry-checkbox');
						casper.echo('you can not delete others topic', 'INFO');
						casper.echo('---------------------------------------------------------------------------');
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});

	//Log Out From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(err) {
			if(!err) {
				casper.log('Successfully logout from application', 'INFO');
			}
		});
	});


	/*****test case to delete own topic when permission is enable*****/
	casper.then(function() {
		casper.echo('test case to delete own topic when permission is enable', 'INFO');
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
				casper.waitForSelector('form[name="posts"]', function success() {
					deleteTopic(x, json.deleteTopic.topicName, casper, function(err) {
						if(!err) {
							casper.echo('deleting selected topic', 'INFO');
						}
					});
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});
	
	

	//Log Out From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(err) {
			if(!err) {
				casper.echo('Successfully logout from application', 'INFO');
			}
		});
	});
	return callback();
};

/************************************PRIVATE METHODS***********************************/

//method to delete topic

var deleteTopic = function(x, topicName, driver, callback){
	
	var href = "";
	driver.click(x('//a/span[text()="'+topicName+'"]'));
	driver.then(function() {
		var url = this.getCurrentUrl();
		href = url.split('.com');
	});
	driver.thenOpen(config.url, function() {
		casper.echo('open forum url : '+config.url, 'INFO');
	});
	
	driver.then(function() {
		var val = getCheckboxVal(href[1], driver, function() {});
		driver.click('input[value="'+val+'"]');
		/*var val1 = driver.evaluate(function(){
			var elm = document.querySelector('.entry-checkbox:checked');
			var checkedValue = elm.value;
			return checkedValue;
		});*/
		if(driver.test.assertExists('li.selectedRow span.topic-content a.topic-title span')) {
			driver.click('a#delete');
		}
	});
	
	//verify deleted topic
	driver.waitForSelector('a[href="/latest"]', function success() {
		this.test.assertDoesntExist('a[href="'+href[1].trim()+'"]');
		casper.echo('verified deleted topic', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	}, function fail(err) {
		casper.echo(err);
	});
	
	return callback(null);
};

var getCheckboxVal = function(href, driver, callback){
		var val = href;
		val = val.split('-');
		val = val[1].split('?');
		val = val[0].replace('?','');
		return val;
};


//verify permission settings message
var verifyPermissionSettingMsg = function(driver, callback) {
	var msg  = driver.fetchText('p[align="center"] font.heading');
	driver.test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and message verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback(null);
}; 

