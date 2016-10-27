/****This script is dedicated for user to post a reply on any topic on the forum. It covers testing of post a reply page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../../config/config.json');

var postAReply = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'postAReply/';

postAReply.postAReplyFeature = function(casper, test, x, callback) {

	//Login To Backend URL and disable Reply Topic and Reply Own Topic checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable Reply Topic and Reply Own Topic checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		//forumRegister.loginToForumBackEnd(casper, test, function(err) { //(rm)
			//if(!err) { 
				casper.echo('User has been successfuly login to backend', 'INFO');
				//go to user permission
				utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
					if(!err) {
						casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
						//click on checkbox
						casper.waitForSelector('#post_replies', function success() {
							utils.enableorDisableCheckbox('post_replies', false, casper, function(err) {	
								if(!err) {
									casper.echo("Reply Topic checkbox has been disabled", 'INFO');
									utils.enableorDisableCheckbox('other_post_replies', false, casper, function(err) {
										if(!err) {
											casper.echo("Reply own Topic checkbox has been disabled", 'INFO');
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
		
	/*****test case to post reply on own Topics when permission false*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case to post reply on own Topics when permission false', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//login with register user
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
				casper.waitForSelector('form[name="posts"]', function success() {
					this.click('form[name="posts"] h4 a');
					casper.waitForSelector('span[id^="post_message_"]', function success() {
						test.assertDoesntExist('#message');
						casper.echo('you dont have permission to reply post on own topic', 'INFO');	
						casper.echo('---------------------------------------------------------------------------');
					}, function fail(err) {
						casper.echo(err);
					});
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});	

		
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(err) {
			if(!err) {
				casper.echo('Successfully logout from application', 'INFO');
			}
			
		});
	});
	
	//test case for post reply on others Topic when permission false
	casper.then(function() {
		casper.waitForSelector('#td_tab_login', function success() {
			forumLogin.loginToApp(json['newTopic'].username1, json['newTopic'].password1, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
				casper.echo('test case for post reply on others Topic when permission false', 'INFO');
				casper.waitForSelector('span[id^="post_message_"]', function success() {
					test.assertDoesntExist('#message');
					casper.echo('you dont have permission to reply post on others topic', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				}, function fail(err) {
					casper.echo(err);
				});
			});
			}, function fail(err) {
				casper.echo(err);
			});
	});

	//Login To Backend URL and enable Reply Topic and Reply Own Topic checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable Reply Topic and Reply Own Topic checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		casper.echo('User has been successfuly login to backend', 'INFO');
		//go to user permission
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
			if(!err) {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				//click on checkbox
				casper.waitForSelector('#post_replies', function success() {
					utils.enableorDisableCheckbox('post_replies', true, casper, function(err) {	
						if(!err) {
							casper.echo("Reply Topic checkbox has been enabled", 'INFO');
							utils.enableorDisableCheckbox('other_post_replies', true, casper, function(err) {
								if(!err) {
									casper.echo("Reply own Topic checkbox has been enabled", 'INFO');
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
							
						}
					});
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});		

		
	//test case for post reply on others topic with valid and invalid contents
	casper.thenOpen(config.url, function() {
		casper.echo('test case for post reply on others topic with valid and invalid contents', 'INFO');
		this.waitForSelector('a[href="/latest"]', function success() {
			postReply(x, casper, function(err) {
				casper.echo('replyed on other topic', 'INFO');
			});		
		}, function fail(err) {
			casper.echo(err);
		});
	});
		
			
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(err) {
			if(!err) {
				casper.echo('Successfully logout from application', 'INFO');
			}
		});
	});

	//test case for post reply on own topic with valid and invalid contents
	casper.then(function() {
		casper.echo('test case for post reply on own topic with valid and invalid contents', 'INFO');
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
				casper.echo('post reply on own topic with valid and invalid contents', 'INFO');
				casper.waitForSelector('a[href="/latest"]', function success() {
					postReply(x, casper, function(err) {
						casper.echo('replyed on own topic', 'INFO');
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
	
	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username1, json['newTopic'].password1, casper, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
			}
		});
	});

	//share post
	casper.then(function() {
			casper.echo('test case for share post on facebook', 'INFO');
			clickOnDropdown(x, json.sharePost.username, json.sharePost.content, casper, function(err) {  
				if(!err) {
					casper.echo('click on dropdown', 'INFO');
					casper.waitForSelector('.openShareDialog', function success() {
						casper.click('a[id="'+json.deletePost.dataPid+'"]');
						shareOn(json.sharePost.email,json.sharePost.password, casper, function(err) {
							if(!err) {
								casper.echo('sharing on facebook', 'INFO');
							}		
						});
					}, function fail(err) {
						casper.echo(err);
					});
				}
			});
	});

	//Login To Backend URL and disable edit own post checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable edit own post checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle(), 'INFO');
		casper.echo('User has been successfuly login to backend', 'INFO');
		//go to user permission
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
			if(!err) {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				//click on checkbox
				casper.waitForSelector('#edit_posts', function success() {
					utils.enableorDisableCheckbox('edit_posts', false, casper, function(err) {	
						if(!err) {
							casper.echo("edit post checkbox has been disabled", 'INFO');
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

	

	//test case for edit own post when permission is disable
	casper.thenOpen(config.url, function() {
		casper.echo('test case for edit own post when permission disable', 'INFO');
		clickOnDropdown(x, json.sharePost.username, json.sharePost.content, casper, function(err) {  
			if(!err) {
				casper.echo('click on dropdown', 'INFO');
				test.assertDoesntExist('#edit_post_request');
				casper.echo('you can not edit your post go to user permission and change the settings', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			}		
		});
	});

	//Login To Backend URL and enable edit own post checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable edit own post checkbox', 'INFO');
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
	
	
 		
	//reopen forum url for edit own post after change permission
	casper.thenOpen(config.url, function() {
		casper.echo('test case to edit own post when permission is enable');
		clickOnDropdown(x, json.sharePost.username, json.sharePost.content, casper, function(err) {  
			if(!err) {
				casper.echo('clicked on dropdown', 'INFO');
				var pid = json.deletePost.dataPid;
				casper.waitForSelector('a[data-pid="'+pid+'"]', function success() {
					test.assertExists('a[data-pid="'+pid+'"]');
					casper.echo('---------------------------------------------------------------------------');
					this.click('a[data-pid="'+pid+'"]');
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});


	casper.on('remote.alert', function(message) {
		test.assertEquals(message, json.editTopic.blankContent.ExpectedErrorMessage.trim(), message+' and verified error message');
		casper.echo('---------------------------------------------------------------------------');
	});
	/*****test case to Verify error message  for Edit post With blank data*****/
	casper.then(function() {
		casper.echo('test case to Verify error message  for Edit post With blank data', 'INFO');
		casper.waitForSelector('#message1_ifr', function success(){
			this.withFrame('message1_ifr', function() {
				casper.echo('*****enter message in iframe', 'INFO');
				this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true}); 			
				this.sendKeys('#tinymce', json.editTopic.blankContent.content);	
			});
			casper.waitForSelector('div.form-group input.btn-primary', function success() {
				this.click('div.form-group input.btn-primary');
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});	

		
	/*****test case for Edit Topic Content With Valid Data*****/
	casper.thenOpen(config.url, function() {
		casper.echo('test case for Edit Topic Content With Valid Data : ', 'INFO');
		clickOnDropdown(x, json.sharePost.username, json.sharePost.content, casper, function(err) {  
				if(!err) {
					casper.echo('clicked on dropdown', 'INFO');
					casper.waitForSelector('#edit_post_request', function success() {
						var pid = json.deletePost.dataPid;
						test.assertExists('a[data-pid="'+pid+'"]');
						casper.click('a[data-pid="'+pid+'"]');
						casper.waitForSelector('#message1_ifr', function(){
							casper.withFrame('message1_ifr', function() {
								casper.echo('*****enter message in iframe', 'INFO');
								this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
								this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true}); 									this.sendKeys('#tinymce', json.editPost.validContent);
							});
							casper.waitForSelector('div.form-group input.btn-primary', function success() {
								this.click('div.form-group input.btn-primary');	
							}, function fail(err) {
								casper.echo(err);
							});
						}, function fail(err) {
							casper.echo(err);
						});	
					}, function fail(err) {
						casper.echo(err);
					});
				}
		});

		//verify posted content wait for 4 second for post
		casper.wait(3000, function(){
			var username = json.sharePost.username;
			var content = json.editPost.validContent;
			var msg = this.fetchText(x('//a[text()="'+username+'"]/following::span[contains(text(),"'+content+'")]'));
			test.assertEquals(msg.trim(), content.trim(), msg.trim()+' and verified post content');		
			casper.echo('---------------------------------------------------------------------------');
		});
	});

	//Login To Backend URL and disable delete own post checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable delete own post checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		casper.echo('User has been successfuly login to backend', 'INFO');
		//go to user permission
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
			if(!err) {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				//click on checkbox
				casper.waitForSelector('#delete_posts', function success() {
					utils.enableorDisableCheckbox('delete_posts', false, casper, function(err) {	
						if(!err) {
							casper.echo("delete post checkbox has been disabled", 'INFO');
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

		
	/*****test case for delete own post when permission is disable*****/
	casper.thenOpen(config.url, function() {
		clickOnDropdown(x, json.deletePost.username, json.deletePost.content, casper, function(err) {  
			if(!err) {
				casper.echo('clicked on dropdown', 'INFO');
				test.assertDoesntExist('#delete_post_request');
				casper.echo('you can not delete post go to user permission and change the settings', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			}
		});
	});
	
	//Login To Backend URL and enable delete own post checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable delete own post checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		casper.echo('User has been successfuly login to backend', 'INFO');
		//go to user permission
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
			if(!err) {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				//click on checkbox
				casper.waitForSelector('#delete_posts', function success() {
					utils.enableorDisableCheckbox('delete_posts', true, casper, function(err) {	
						if(!err) {
							casper.echo("delete post checkbox has been enabled", 'INFO');
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
	
 		
	/*****test case for delete own post when permission is enable*****/
	casper.thenOpen(config.url, function() {
		clickOnDropdown(x, json.deletePost.username, json.deletePost.content, casper, function(err) {  
			casper.echo('clicked on dropdown', 'INFO');
			var pid = json.deletePost.dataPid;
			casper.waitForSelector('a[data-pid="'+pid+'"][id="delete_post_request"]', function success() {
				test.assertExists('a[data-pid="'+pid+'"][id="delete_post_request"]');
				casper.echo('---------------------------------------------------------------------------');
				casper.click('a[data-pid="'+pid+'"][id="delete_post_request"]');
				//verify deleted post
				casper.then(function() {
					test.assertDoesntExist(json.deletePost.deleteVal);
					casper.echo('deleted post is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});
	});
	
	//Logout From App
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

// method for share post and share post 

var clickOnDropdown = function(x, username, content, driver, callback){

	driver.waitForSelector('form[name="posts"]', function success() {
		try {
			driver.click('form[name="posts"] h4 a');
		} catch(e) {

		}
	}, function fail() {
		casper.echo(err);	
	});
		

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
		this.mouse.move('#post_list_' +pid);
		this.test.assertExists('div.post-body .panel-dropdown div.dropdown a#' +id);
		this.click('div.post-body .panel-dropdown div.dropdown a#' +id);
	});
	return callback(null);
};

var shareOn = function(email, password, driver, callback) {
	
	var elehref = "";
	driver.waitForSelector('#fb_share', function success() {	
		driver.test.assertExists('#fb_share');
		elehref = this.evaluate(function() {
			var element = document.querySelector("#fb_share").getAttribute("href");
			return element;
		});

		this.evaluate(function() {
			var element = document.querySelector("#fb_share").setAttribute("target", "_self");
		});
		
		casper.echo('socialUrl : ' +elehref, 'INFO');
		this.page.content = '<a href="'+elehref+'">myfacebook</a>';
    		this.clickLabel('myfacebook');

		driver.waitForSelector('#email', function success() {
			this.sendKeys('#email', email);
			this.sendKeys('#pass', password);
			this.click('#u_0_2');
			casper.echo('successfully login to facebook', 'INFO');
			driver.waitForSelector('button[name="__CONFIRM__"]', function success() {
				this.test.assertExists('button[name="__CONFIRM__"]');
				var text  = this.fetchText('button[name="__CONFIRM__"]');
				casper.echo('button text : '+text, 'INFO');
				casper.echo('title of the page : '+this.getTitle(), 'INFO');
				this.click('button[name="__CONFIRM__"]');
				casper.echo('successfully posted on facebook', 'INFO');
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});
	}, function fail(err) {
		casper.echo(err);
	});
	return callback(null);
};

//verify permission settings message
var verifyPermissionSettingMsg = function(driver, callback) {
	var msg  = driver.fetchText('p[align="center"] font.heading');
	driver.test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and message verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback(null);
}; 

// method for reply post on any topic
var replyTopic = function(x, content, driver, callback) { 
	driver.waitForSelector('form[name="posts"]', function success() {
		var classVal = x("//a/span[text()='HolyDay']/parent::a");
		var href = casper.getElementAttribute(classVal, "href");
		try {
			driver.click('a[href="'+href+'"]');
		} catch(e) {

		}
	}, function fail(err) {
		casper.echo(err);
	});

	driver.waitForSelector('#message', function success() {
		try {
			this.sendKeys('#message', content);
		} catch(err) {
			
		}
	}, function fail(err) {
		casper.echo(err);
	});
	
	driver.waitForSelector('#message_ifr', function success() {
		this.withFrame('message_ifr', function() {
	 		this.sendKeys('#tinymce', content);
		});
	}, function fail(err) {
		casper.echo(err);
	});

	driver.waitForSelector('#reply_submit', function success() {
		this.evaluate(function() {
		    document.querySelector('#reply_submit').click();
	        });
		this.wait(3000);
	}, function fail(err) {
		casper.echo(err);	
	});
	
	return callback(null);
};
function testAlert1(message) {
	casper.echo('message: '+message, 'INFO');
	casper.test.assertEquals(message.trim(), json.replyTopic.blankContent.ExpectedErrorMessage.trim());
	casper.echo('Error message is verified when user enters blank content', 'INFO');
	casper.echo('---------------------------------------------------------------------------');
};

// post reply with valid and invalid scenario
var postReply = function(x, driver, callback){
	// Verify error message when user try to post blank content
	casper.on('remote.alert',testAlert1);

	casper.then(function() {
		//Reply topic with blank content
		casper.echo('Reply topic with blank content', 'INFO');
		replyTopic(x, json.replyTopic.blankContent.content, casper, function(err) {
			if(!err) {
				casper.echo('post a reply by leaving blank content and verify error message', 'INFO');
				//Reply topic with valid credential
				driver.waitForSelector('.post-body', function success() {
					casper.echo('Reply topic with valid credential', 'INFO');
					replyTopic(x, json.replyTopic.ValidCredential.content, casper, function(err) {
						if(!err) {
							casper.waitForSelector('span[id^="post_message_"]', function success() {
								verifyPostReply(casper, function(err) {
									if(!err) {
										casper.echo('new post is verified', 'INFO');
									}
								});
							}, function fail(err) {
								casper.echo(err);
							});
							casper.removeListener('remote.alert', testAlert1);
						}
					});
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});

	return callback(null);
};

//verify posted reply
var verifyPostReply = function(driver, callback) {
	// Verify Posted Reply
	var elementId = casper.evaluate(function() {
		var element = document.querySelectorAll("span[id^='post_message_']");
		var id = element[element.length-1].id;
		return id;	
	});
	var contentMsg = casper.fetchText("#"+elementId);		
	driver.test.assertEquals(contentMsg.trim(), json.replyTopic.ValidCredential.content.trim(), contentMsg.trim()+' and verified content message');
	casper.echo('content message is Verified when user try to post a reply on topic', 'INFO');
	casper.echo('---------------------------------------------------------------------------');

return callback(null);
};
















