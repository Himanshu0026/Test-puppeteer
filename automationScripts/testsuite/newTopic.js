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
newTopic.errors = [];
var screenShotsDir = config.screenShotsLocation + 'newTopic/';

newTopic.featureTest = function(casper, test, x) {
		
		casper.on("page.error", function(msg, trace) {
			this.echo("Error:    " + msg, "ERROR");
			this.echo("file:     " + trace[0].file, "WARNING");
			this.echo("line:     " + trace[0].line, "WARNING");
			this.echo("function: " + trace[0]["function"], "WARNING");
			newTopic.errors.push(msg);
		});
		//Login To Backend URL and disable start topic checkbox
		casper.start(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and disable start topic checkbox', 'INFO');
			casper.echo('title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.loginToForumBackEnd(casper, test, function(err) {
				if(!err) {
					casper.echo('User has been successfuly login to backend', 'INFO');
					//go to user permission
					utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
						if (!err) {
							casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
							//click on checkbox
							casper.waitForSelector('#post_threads', function success() {
								utils.enableorDisableCheckbox('post_threads', false, casper, function(err) {
									if(!err) {
										casper.echo("Starts Tpoic checkbox has been disabled", 'INFO');
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
				}
			});
		});
		
		//Login To Backend URL and disable Approve New Posts
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and disable Approve New Posts', 'INFO');
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');		
			//setting page -> security page
			casper.waitForSelector('a[data-tooltip-elm="ddSettings"]', function success() {
				test.assertExists('a[data-tooltip-elm="ddSettings"]');
				this.click('a[data-tooltip-elm="ddSettings"]');
				this.waitForSelector('a[href="/tool/members/mb/settings?tab=Security"]', function success() {
					test.assertExists('a[href="/tool/members/mb/settings?tab=Security"]');
					this.click('a[href="/tool/members/mb/settings?tab=Security"]');
				}, function fail(err) {
					casper.echo(err);
				});
				this.waitForSelector('#post_approval', function success() {
					test.assertExists('#post_approval');
					this.click('#post_approval');
					this.sendKeys('select[name="post_approval"] option[value="0"]', 'Disabled');
					test.assertExists('button[type="submit"]');
					this.click('button[type="submit"]');
					this.wait(1000);
				}, function fail() {
					casper.echo(err);
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});

		//Test case to verify START NEW TOPIC button is in-active when start topic permission is disable
		casper.thenOpen(config.url, function() {
			casper.echo('Test case to verify START NEW TOPIC button is in-active when start topic permission is disable :', 'INFO');
			//login with register user
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
				if(!err) {
					casper.echo('User has been successfuly login to application with register user', 'INFO');
					casper.waitForSelector('.wt-body', function success() {
						//when no such a topic exists in forum
						if(casper.exists('span.alert-info')) {
							var info = casper.fetchText('span.alert-info');
							casper.echo(info.trim(), 'INFO');
						}
						test.assertDoesntExist('a[href="/post/printadd"]');
						casper.echo('---------------------------------------------------------------------------');
						casper.echo('verified test case START NEW TOPIC button is in-active', 'INFO');
					}, function fail(err) {
						casper.echo(err);
					});
				}
			});
		});
		
		//Login To Backend URL and enable start topic checkbox
		casper.thenOpen(config.backEndUrl,function() {
			casper.echo('Login To Backend URL and enable start topic checkbox', 'INFO');
			casper.echo('title of the page : ' +this.getTitle());
			//forumRegister.loginToForumBackEnd(casper, test, function(err) {
				//if(!err) {
					//casper.echo('User has been successfuly login to backend', 'INFO');
					//go to user permission
					utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
						if(!err) {
							casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
							//click on checkbox
							casper.waitForSelector('#post_threads', function success() {
								utils.enableorDisableCheckbox('post_threads', true, casper, function(err) {
									if(!err) {
										casper.echo("Starts Tpoic checkbox has been enable", 'INFO');
										//click on save button
										utils.clickOnElement(casper, '.btn-blue', function(err) {
											if(!err) {
												casper.echo('Saving Changes', 'INFO');
												//verify Permission Setting Message
												casper.waitForSelector('p[align="center"] font.heading', function success() {
													verifyPermissionSettingMsg(casper, function(err) {
														if(!err)
															casper.echo('verifying Permission Setting Message', 'INFO');
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



		//test case for Start New Topic Page with All Blank Field and verify error message
		casper.thenOpen(config.url, function() {
			casper.echo('go to forum url : '+config.url, 'INFO');
			casper.echo('test case for Start New Topic Page with All Blank Field and verify error message', 'INFO');			
			casper.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopicpage(casper, function(err) {
					if(!err) {
						casper.echo('click on START NEW TOPIC', 'INFO');
						//Post New Topic with Black Title
						casper.waitForSelector('#PostTopic', function success() {
							postTopicpage(json.newTopic.blankField, casper,  function(err) {
									if(!err) {
										casper.echo('post new topic by leaving all blank field and verify error message', 'INFO');
										//Verify error message when title is blank
										casper.waitForSelector('div[role="alert"]', function success() {
											var errorMsg = casper.fetchText('div[role="alert"]');
											test.assertEquals(errorMsg.trim() ,json.newTopic.blankField.ExpectedErrorMessage.trim(), errorMsg.trim()+' and verified error message');
											casper.echo('---------------------------------------------------------------------------');
										}, function fail(err) {
											casper.echo(err);
										});
									}
								});
							}, function fail(err) {
								casper.echo(err);
							});
						}
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});
		

		//test case for Start New Topic Page with blank title and verify error message
		casper.thenOpen(config.url, function() {
			casper.echo('go to forum url : '+config.url, 'INFO');
			casper.echo('test case for Start New Topic Page with blank title and verify error message', 'INFO');			
			casper.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopicpage(casper, function(err) {
					if(!err) {
						casper.echo('click on START NEW TOPIC', 'INFO');
						//Post New Topic with Black Title
						casper.waitForSelector('#PostTopic', function success() {
							postTopicpage(json.newTopic.blankTitle, casper,  function(err) {
								if(!err) {
											
									casper.echo('post new topic by leaving blank title and verify error message', 'INFO');
									//Verify error message when title is blank
									casper.waitForSelector('div[role="alert"]', function success() {
										var errorMsg = casper.fetchText('div[role="alert"]');
										test.assertEquals(errorMsg.trim() ,json.newTopic.blankTitle.ExpectedErrorMessage.trim(), errorMsg.trim()+' and verified error message');
										casper.echo('---------------------------------------------------------------------------');
									}, function fail(err) {
										casper.echo(err);
									});
								}
						});
						}, function fail(err) {
							casper.echo(err);
						});
					}
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});
		
		

		//test case for Start New Topic Page with blank content and verify error message
		casper.thenOpen(config.url, function() {
			casper.echo('go to forum url : '+config.url, 'INFO');
			casper.echo('test case for Start New Topic Page with blank content and verify error message', 'INFO');			
			casper.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopicpage(casper, function(err) {
					if(!err) {						
						casper.echo('click on START NEW TOPIC', 'INFO');
						//Post New Topic With Blank Content
						casper.waitForSelector('#PostTopic', function success() {
							postTopicpage(json.newTopic.blankContent, casper,  function(err) {
								if(!err) {
									casper.echo('post new topic by leaving blank content and verify error message', 'INFO');
									//Verify error message when content is blank
									casper.waitForSelector('div[role="alert"]', function success() {
										var errorMsg = casper.fetchText('div[role="alert"]');
										test.assertEquals(errorMsg.trim() ,json.newTopic.blankContent.ExpectedErrorMessage.trim(), errorMsg.trim()+' and verified error message');
										casper.echo('---------------------------------------------------------------------------');
									}, function fail(err) {
										casper.echo(err);
									});
								}
						});
						}, function fail(err) {
							casper.echo(err);
						});
					}
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});

		//test case for Start New Topic Page with blank category and verify error message
		casper.thenOpen(config.url, function() {
			casper.echo('go to forum url : '+config.url, 'INFO');
			casper.echo('test case for Start New Topic Page with blank category and verify error message', 'INFO');			
			casper.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopicpage(casper, function(err) {
					if(!err) {
						casper.echo('click on START NEW TOPIC', 'INFO');
						//Post New Topic With Blank Category
						casper.waitForSelector('#PostTopic', function success() {
							postTopicpage(json.newTopic.blankCategory, casper,  function(err) {
								if(!err) {
									casper.echo('post new topic by leaving blank category and verify error message', 'INFO');
									//Verify error message when content is blank
									casper.waitForSelector('div[role="alert"]', function success() {
										var errorMsg = casper.fetchText('div[role="alert"]');
										test.assertEquals(errorMsg.trim() ,json.newTopic.blankCategory.ExpectedErrorMessage.trim(), errorMsg.trim()+' and verified error message');
										casper.echo('---------------------------------------------------------------------------');
									}, function fail(err) {
										casper.echo(err);
									});
								}
						});
						}, function fail(err) {
							casper.echo(err);
						});
					}
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});		
		

		//Add New topic by enable Follow check box and verify unfollow topic option on forum listing page		
		casper.thenOpen(config.url, function() {
			casper.echo('go to forum url : '+config.url, 'INFO');
			casper.echo('Add New topic by enable Follow check box and verify unfollow topic option on forum listing page', 'INFO');		
			//go to topic listing page	
			casper.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopicpage(casper, function(err) {
					if(!err) {						
						casper.echo('click on START NEW TOPIC', 'INFO');
						//Post New Topic With valid data
						casper.waitForSelector('#PostTopic', function success() {
							postTopicpage(json.newTopic.ValidCredential, casper,  function(err) {
								if(!err) {
									casper.echo('Successfully Posted New Topic with followed content', 'INFO');
									//Verify Post Content when all field are filled with valid data
									casper.waitForSelector('span[id^="post_message_"]', function success() {
										verifyPostContent(json.newTopic.ValidCredential.content, casper, function(err) {
											if(!err) {
												casper.echo('Contents are Verified with all valid data', 'INFO');
												//verify follow content
												casper.waitForSelector('form[action="/mbactions"]', function success() {
													verifyFollowContent(casper, function(err){
														if(!err) {
															casper.echo('Follow Content is verified', 'INFO');
														}
													});
												}, function fail(err) {});
										
											}
								});
									}, function fail(err) {
										casper.echo(err);
									});
								}
							});
						}, function fail(err) {
							casper.echo(err);
						});
					}
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});		


		//test case to make follow post to unfollow post
		casper.then(function() {
			casper.echo('make follow post to unfollow post', 'INFO');
			this.waitForSelector('h4 a.topic-title', function success() {
				this.click('h4 a.topic-title');
			}, function fail(err) {
				casper.echo(err);
			});
			this.waitForSelector('.glyphicon-minus', function success() {
				this.click('.glyphicon-minus');
				// verify new unFollowed content
				this.wait(2000, function() {
					verifyUnFollowContent(casper, function(err){
						if(!err) {
							casper.echo('verify UnFollow Content', 'INFO');
						}
					});
				});
			}, function fail(err) {
				casper.echo(err);
			});
		}); 

		//Add New topic by disabling Follow check box and verify follow topic option on Post page		
		casper.thenOpen(config.url, function() {
			casper.echo('go to forum url : '+config.url, 'INFO');
			casper.echo('Add New topic by enable Follow check box and verify unfollow topic option on forum listing page', 'INFO');		
			//go to topic listing page	
			casper.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopicpage(casper, function(err) {
					if(!err) {						
						casper.echo('click on START NEW TOPIC', 'INFO');
						//Post New Topic With valid data
						casper.waitForSelector('#PostTopic', function success() {
							casper.click('#EMNEW');
							postTopicpage(json.newTopic.ValidCredential, casper,  function(err) {
								if(!err) {
									casper.echo('Successfully Posted New Topic with Unfollowed content', 'INFO');
									//Verify Post Content when all field are filled with valid data
									casper.waitForSelector('span[id^="post_message_"]', function success() {
										verifyPostContent(json.newTopic.ValidCredential.content, casper, function(err) {
											if(!err) {
												casper.echo('Contents are Verified with all valid data', 'INFO');
												//verify Unfollowed content
												casper.waitForSelector('form[action="/mbactions"]', function success() {
													verifyUnFollowContent(casper, function(err){
														if(!err) {
															casper.echo('unFollow Content is verified', 'INFO');
														}
													});
												}, function fail(err) {
													casper.echo(err);											
												});
											}
										});
									}, function fail(err) {
										casper.echo(err);
									});
								}
							});
						}, function fail(err) {
							casper.echo(err);
						});
					}
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});	

		// open config.url and click on newly posted topic and make unFollow post to follow post
		casper.thenOpen(config.url,function() {
			casper.echo('open config.url and click on newly posted topic and make unFollow post to follow post', 'INFO');
			this.click(json.newTopic.tempHref);	
			casper.waitForSelector('.glyphicon-plus', function success() {
				casper.click('.glyphicon-plus');
				this.wait(2000, function() {
					// verify Followed content
				verifyFollowContent(casper, function(err){
						if(!err) {
							casper.echo('verify Follow Content', 'INFO');
						}
					});	
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});


		//follow and unFollow Topic
		//verify warning message when no Topic is followed by user 

		casper.thenOpen(config.url, function() {
			casper.echo('verify warning message when no Topic is followed by user', 'INFO');
			this.waitForSelector('#posts', function success() {
				//click on followed content link and verify expected Warning message
				this.click('span.user-nav-panel li a[href^="/search"]');
				casper.waitForSelector('div.container.content-panel.topics-list', function success() {
					if(casper.exists('.no-space')) { 
						verifyWarningMsg(json.followTopic.ExpectedWarningMessage, casper, function(err) {
							if(!err) {
								casper.echo('warning message is verified', 'INFO');
							}
						});
					} else {
						casper.echo('you have followed some topics try to unfollow all contents', 'INFO');
						casper.click('div.panel-heading input[name = "allbox"]');
						casper.waitForSelector('.unfollow-button', function success() {
							this.click('.unfollow-button');
							casper.waitForSelector('.no-space', function success() {
								verifyWarningMsg(json.followTopic.ExpectedWarningMessage, casper, function(err) {
									if(!err) {
										casper.echo('warning message is verified', 'INFO');
									}
								});
							}, function fail(err) {
								casper.echo(err);
							});
						}, function fail(err) {
							casper.echo(err);
						});					
					}

				}, function fail(err) {
					casper.echo(err);			
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});


		//follow and unFollow category
		//test case to verify warning message when no category is followed by user 

		casper.thenOpen(config.url, function() {
			casper.echo('test case to verify warning message when no category is followed by user', 'INFO');
			casper.waitForSelector('a[href^="/post/"]', function success() {
				//click on followed category link and verify expected Warning message
				this.click('span.user-nav-panel li a[href^="/search"]');
				casper.waitForSelector('ul.pull-left li#show_threads #anchor_tab_forum_subscriptions', function success() {
					casper.click('ul.pull-left li#show_threads #anchor_tab_forum_subscriptions');
					casper.waitForSelector('div.container.content-panel.topics-list', function success() {
						if(casper.exists('.alert.alert-info.text-center.no-space')) { 
							verifyWarningMsg(json.followCategory.ExpectedWarningMessage, casper, function(err) {
								if(!err) {
									casper.echo('warning message is verified', 'INFO');
								}
							});
						} else {
							casper.echo('you have followed some topics try to unfollow all contents', 'INFO');
							casper.click('div.panel-heading input[name = "allbox"]');
							casper.waitForSelector('.unfollow-button', function success() {
								this.click('.unfollow-button');
								casper.waitForSelector('.no-space', function success() {
									verifyWarningMsg(json.followCategory.ExpectedWarningMessage, casper, function(err) {
										if(err) {
											casper.echo('warning message is verified', 'INFO');
										}
									});
								}, function fail(err) {
									casper.echo(err);
								});
							}, function fail(err) {
								casper.echo(err);
							});					
						}
						}, function fail(err) {
							casper.echo(err);			
					});	
				}, function fail(err) {
					casper.echo(err);
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

		//start poll topic
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start Poll topic ', 'INFO');
			poll.pollFeature(casper,test, x, function(){
				casper.echo('Poll Topic Feature', 'INFO');
			});
		});

		//start pin/unpin topic
		casper.then(function() {
			casper.echo('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
			casper.echo('start pin / unpin topic ', 'INFO');
			pinTopic.pinUnPinFeature(casper,test, x, function(){
				casper.echo('Pin Unpin Topic Feature', 'INFO');
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
	return callback(null);
};


// method for goto New Topic page to application

var postTopicpage = function(data, driver, callback) {
	driver.waitForSelector('#message_ifr', function success(){
		driver.sendKeys('input[name="subject"]', data.title, {reset:true});
		 driver.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
	 		this.sendKeys('#tinymce', data.content);
		});
	}, function fail(err) {
		casper.echo(err);
	});	

	driver.waitForSelector('#all_forums_dropdown', function success() {
		if(data.category) {
			driver.click('#all_forums_dropdown');
			var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
			driver.fill('form[name="PostTopic"]',{
				'forum' : val.trim()
			},false);
			driver.click('#post_submit');
		} else {
			driver.click('#post_submit');
		}
	}, function fail(err) {
		casper.echo(err);
	});	
	
	return callback(null);
};

// method for verify post content Topic page to application

var verifyPostContent = function(content, driver, callback) {
	var contentMsg = driver.fetchText('div.post-body-content span[id^="post_message_"]');
	casper.echo('***********************  contentMsg' +contentMsg.trim());
	driver.test.assertEquals(content,contentMsg.trim(), content+' and verified post content');
	casper.echo('---------------------------------------------------------------------------');
	return callback(null);
};

// method for follow content on follow content page to application

var verifyFollowContent = function(driver, callback) {
	var url = driver.getCurrentUrl();
	url = url.split("#");
	url= url[0].split(".com");			
	driver.click('li.user-panel .dropdown-toggle');
	driver.click('span.user-nav-panel li a[href^="/search"]');
	driver.waitForSelector('span.topic-content', function success() {
		casper.echo('a[href="'+url[1]+'"]','INFO');
		this.test.assertExists('span.topic-content h4 a[href="'+url[1]+'"]');
		casper.echo('---------------------------------------------------------------------------');
	}, function fail(err) {
		casper.echo(err);
	});
	return callback(null);
};

// method for verify unFollow content on follow content page to application

var verifyUnFollowContent = function(driver, callback) {
	var url = driver.getCurrentUrl();
	url = url.split("#");
	url= url[0].split(".com");
	driver.click('li.user-panel .dropdown-toggle');
	driver.click('span.user-nav-panel li a[href^="/search"]');
	driver.waitForSelector('a[href^="/post/"]', function() {
		this.test.assertDoesntExist('span.topic-content h4 a[href="'+url[1]+'"]');
		casper.echo('---------------------------------------------------------------------------');
	});
	json.newTopic.tempHref = 'a[href="'+url[1]+'"]';
	
	return callback(null);
};

// verify warning message for follow content and follow category

var verifyWarningMsg = function(warningMsg, driver, callback){

	var warningMessage = driver.fetchText('.no-space');
	casper.echo('warningMessage : ' +warningMessage.trim());
	driver.test.assertEquals(warningMessage.trim(), warningMsg.trim(), warningMessage.trim()+' and warning message is verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback(null);
};

//verify message after update users group setting
var verifyPermissionSettingMsg = function(driver, callback) {
	var msg  = driver.fetchText('p[align="center"] font.heading');
	driver.test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and message verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback(null);
}; 









