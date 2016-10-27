
/****This script is dedicated for lock-unLock topic on the forum. It covers testing of lock_unLock detail page with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../../config/config.json');

var lock_unLockTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'lockUnLock/';

lock_unLockTopic.lockUnLockFeature = function(casper, test, x, callback) {
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//Login to app
		forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function(err) {
			if(err) {
				casper.log('Admin has successfully login to application with valid username and password', 'INFO');
			}
		});
	});

	/*****Lock any topic and Verify Lock option of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('Lock any topic and Verify Lock option of topic listing page[Home page]', 'INFO');
		var postTitle = json['lock/unLock'].topicTitle;
		casper.echo('lock topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'lock', casper, function(err) {
			if(!err) {
				//verify lock topic
				casper.waitForSelector('a[href^="/post/"]', function success() {
					var postTitle = json['lock/unLock'].topicTitle;
					var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
					var href = this.getElementAttribute(classVal, "href");
					href = href.split('=');
					var id = 'first_post_vote_'+href[1];
					casper.echo('id : '+id);
					test.assertExists(x('//a[@id="'+id+'"]/following::i'));
					casper.echo('Locked topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});


	/*****un-Lock any topic and Verify Lock optipon of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('un-Lock any topic and Verify Lock optipon of topic listing page[Home page]', 'INFO');
		var postTitle = json['lock/unLock'].topicTitle;
		casper.echo(' unlock topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'unlock', casper, function(err) {
			if(!err) {
				//verify unLock topic
				casper.waitForSelector('a[href^="/post/"]', function success() {
					var postTitle = json['lock/unLock'].topicTitle;
					var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
					var href = this.getElementAttribute(classVal, "href");
					href = href.split('=');
					var id = 'first_post_vote_'+href[1];
					casper.echo('id : '+id);
					test.assertDoesntExist(x('//a[@id="'+id+'"]/following::i[@class="glyphicon"] [@class="glyphicon-lock"]'));
					casper.echo('unLocked topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				});
			}
		});

	});

	/*****Lock any topic and Verify Lock optipon of post listing page under category*****/
	casper.then(function() {
		casper.echo('Lock any topic and Verify Lock optipon of post listing page under category', 'INFO');
		test.assertExists('a[href="/categories"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('a[href="/categories"]');
		casper.waitForSelector('h3 a', function success() {
			var classVal = x("//h3/a/span/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('h3 a[href="'+href+'"]');
			casper.echo('---------------------------------------------------------------------------');
			this.click('h3 a[href="'+href+'"]');
			casper.waitForSelector('a[href^="/post/"]', function success() {
				var postTitle = json['lock/unLock'].topicTitle;
				casper.echo('lock topic title : ' +postTitle, 'INFO');
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				selectTopic(classVal, 'lock', casper, function(err) {
					if(!err) {
						casper.waitForSelector('a[href^="/post/"]', function success() {
							//verify lock topic
							var postTitle = json['lock/unLock'].topicTitle;
							var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
							var href = this.getElementAttribute(classVal, "href");
							href = href.split('=');
							var id = 'first_post_vote_'+href[1];
							casper.echo('id : '+id, 'INFO');
							test.assertExists(x('//a[@id="'+id+'"]/following::i'));
							casper.echo('Locked topic is verified', 'INFO');
							casper.echo('---------------------------------------------------------------------------');
						}, function fail(err) {
							casper.echo(err);
						});
					}
				});
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});
	
	/*****un-Lock any topic and Verify Lock optipon of post listing page under category*****/
	casper.then(function() {
		casper.echo('un-Lock any topic and Verify Lock optipon of post listing page under category', 'INFO');		
		var postTitle = json['lock/unLock'].topicTitle;
		casper.echo('unLock topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'unlock', casper, function(err) {
			if(!err) {
				//verify un-lock topic
				casper.waitForSelector('a[href^="/post/"]', function success() {
					var postTitle = json['lock/unLock'].topicTitle;
					var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
					var href = this.getElementAttribute(classVal, "href");
					href = href.split('=');
					var id = 'first_post_vote_'+href[1];
						casper.echo('id : '+id);
					test.assertDoesntExist(x('//a[@id="'+id+'"]/following::i[@class="glyphicon"] [@class="glyphicon-lock"]'));
					casper.echo('unLocked topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});		
	});

	/*****Lock topic from Profile page and verify locked topic*****/
	casper.then(function() {
		casper.echo('Lock topic from Profile page and verify locked topic', 'INFO');
		test.assertExists('li.user-panel .dropdown-toggle');
		casper.echo('---------------------------------------------------------------------------');		
		this.click('li.user-panel .dropdown-toggle');
		test.assertExists('span.user-nav-panel li a[href^="/profile"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('span.user-nav-panel li a[href^="/profile"]');
		this.waitForSelector('#PostsOFUser', function success() {
			test.assertExists('#Topics_Started');
			casper.echo('---------------------------------------------------------------------------');
			this.click('#Topics_Started');
			this.waitForSelector('#Topics_Started', function success() {
				if(this.exists('div.alert-info')){
					var warningMsg = this.fetchText('div.alert-info');
					test.assertEquals(warningMsg.trim(), json['pin/unPin'].warningMessage, warningMsg.trim()+' and verified warning message');
				} else {
					this.waitForSelector('a[href^="/post/"]', function success() {
						var postTitle = json['lock/unLock'].topicTitle;
						casper.echo('lock topic title : ' +postTitle, 'INFO');
						var classVal = x("//a[text()='"+postTitle+"']"); 
						var href = casper.getElementAttribute(classVal, "href");
						if(href) {
							href = href.split('-');
							var id = href[1].split('?');
							casper.mouse.move('#complete_post_' +id[0]);
							test.assertExists('div.post-body .panel-dropdown div.dropdown');
							this.click('div.post-body .panel-dropdown div.dropdown input[value="'+id[0]+'"]');
							this.test.assertExists('a[data-original-title="Lock/Un-lock"]');
							casper.echo('---------------------------------------------------------------------------');
							this.click('a[data-original-title="Lock/Un-lock"]');
							this.click('#lock');
							//verify lock topic
							casper.waitForSelector('span i.glyphicon-pushpin', function success() {
								var postTitle = json['lock/unLock'].topicTitle;
								casper.echo('lock topic title : ' +postTitle, 'INFO');
								test.assertExists(x("//a[text()='"+postTitle+"']/following::span/i")); 
								casper.echo('---------------------------------------------------------------------------');
								casper.echo('lock topic is verified', 'INFO');
								casper.echo('---------------------------------------------------------------------------');
							}, function fail(err) {
								casper.echo(err);
							})
						} else {
							casper.echo('topic '+postTitle+' does not exists', 'INFO');
						}
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

	/*****Lock any topic from post page and verify locked message*****/
	casper.then(function() {
		casper.echo('Lock any topic from post page and verify locked message', 'INFO');
		//Logout(Admin) From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function(err) {
				if(!err) {
					casper.echo('Successfully logout from application', 'INFO');
				}
			});
			//Login to app with register user
			casper.then(function(){
				forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
					if(!err) {
						casper.log('register user has successfully login to application with valid username and password', 'INFO');
						casper.waitForSelector('a[href^="/post/"]', function success() {
							var postTitle = json['lock/unLock'].topicTitle;
							if(this.exists(x("//a[text()='"+postTitle+"']"))) {
								test.assertExists(x("//a[text()='"+postTitle+"']"));
								this.click(x("//a[text()='"+postTitle+"']"));
								this.waitForSelector('.alert-warning', function success() {
									test.assertExists('.alert-warning');
									casper.echo('---------------------------------------------------------------------------');
									var warningMsg = this.fetchText('.alert-warning');
									test.assertEquals(warningMsg.trim(), json['lock/unLock'].ExpectedWarningMessage.trim(), warningMsg.trim()+' and message verified');
									casper.echo('---------------------------------------------------------------------------');
								}, function fail(err) {
									casper.echo(err)
								});
							} else {
								casper.echo('topic '+postTitle+' does not exists', 'INFO');
							}
						}, function fail(err) {
							casper.echo(err);
						});
					}
				});
			});
		});
	});


	/*****Verify Reply a Post option angainst locked topic on post page for registered user*****/
	casper.then(function() {
		casper.echo('Verify Reply a Post option angainst locked topic on post page for registered user', 'INFO');
		test.assertDoesntExist('#reply_submit');
		casper.echo('---------------------------------------------------------------------------');
		casper.echo('register user can not post reply on locked topic', 'INFO');
		//Logout(register user) From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function(err) {
				if(!err) {
					casper.echo('Successfully logout from application', 'INFO');
				}
			});
		});
	});

	
	/*****un-Lock topic from Profile page and verify unlocked topic*****/
	casper.then(function() {
		casper.echo('un-Lock topic from Profile page and verify unlocked topic', 'INFO');
		//Login to app
		casper.then(function(){
			forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
				casper.log('Admin has successfully login to application with valid username and password', 'INFO');
			});
		});
		casper.then(function() {
			test.assertExists('li.user-panel .dropdown-toggle');		
			casper.echo('---------------------------------------------------------------------------');
			this.click('li.user-panel .dropdown-toggle');
			test.assertExists('span.user-nav-panel li a[href^="/profile"]');
			casper.echo('---------------------------------------------------------------------------');
			this.click('span.user-nav-panel li a[href^="/profile"]');
			this.waitForSelector('#PostsOFUser', function success() {
				test.assertExists('#Topics_Started');
				casper.echo('---------------------------------------------------------------------------');
				this.click('#Topics_Started');
				this.waitForSelector('#Topics_Started', function success() {
					if(this.exists('div.alert-info')){
						var warningMsg = this.fetchText('div.alert-info');
						test.assertEquals(warningMsg.trim(), json['pin/unPin'].warningMessage, warningMsg.trim()+' and verified warning message');
					} else {
						this.waitForSelector('a[href^="/post/"]', function success() {
							var postTitle = json['lock/unLock'].topicTitle;
							casper.echo('un-lock topic title : ' +postTitle, 'INFO');
							var classVal = x("//a[text()='"+postTitle+"']");
							var href = casper.getElementAttribute(classVal, "href");
							if(href) {
								href = href.split('-');
								var id = href[1].split('?');
								casper.mouse.move('#complete_post_' +id[0]);
								test.assertExists('div.post-body .panel-dropdown div.dropdown');
								this.click('div.post-body .panel-dropdown div.dropdown input[value="'+id[0]+'"]');
								this.test.assertExists('a[data-original-title="Lock/Un-lock"]');
								casper.echo('---------------------------------------------------------------------------');
								this.click('a[data-original-title="Lock/Un-lock"]');
								this.click('#unlock'); 
								//verify un-lock topic
								casper.waitForSelector('a[href^="/post/"]', function success() {
									var postTitle = json['lock/unLock'].topicTitle;
									casper.echo('un-lock topic title : ' +postTitle, 'INFO');
									test.assertDoesntExist(x("//a[text()='"+postTitle+"']/following::span/i[@class='glyphicon-lock']")); 
									casper.echo('un-lock topic is verified', 'INFO');
									casper.echo('---------------------------------------------------------------------------');
								}, function fail(err) {
									casper.echo(err);
								});
							} else {
								casper.echo('topic '+postTitle+' does not exists', 'INFO');
							}		
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
	});

	
	/*****UnLock any locked  topic from post page and verify that the locked message should be disappeared *****/
	casper.then(function() {
		casper.echo('UnLock any locked  topic from post page and verify that the locked message should be disappeared ', 'INFO');
		var postTitle = json['lock/unLock'].topicTitle;		
		if(this.exists(x("//a[text()='"+postTitle+"']"))) {
			test.assertExists(x("//a[text()='"+postTitle+"']"));
			this.click(x("//a[text()='"+postTitle+"']"));
			this.waitForSelector('.alert-warning', function success() {	
				test.assertDoesntExist('.alert-warning');
				casper.echo('---------------------------------------------------------------------------');
			}, function fail(err) {
				casper.echo(err);
			});
		} else {
			casper.echo('topic '+postTitle+' does not exists', 'INFO');
		}
	});

	/*****Add New topic by enable lock check box and verify lock topic  on forum listing page*****/
	casper.then(function() {
		casper.echo('Add New topic by enable lock check box and verify lock topic  on forum listing page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('Hit on url : ' +config.url, 'INFO');
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				//go to start new topic
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
					if(!err) {
						casper.echo('start new topic', 'INFO');
						casper.waitForSelector('#LCK', function success() {
							this.click('#LCK');
							this.click('#post_submit');
							casper.waitForSelector('span[id^="post_message_"]', function success() {
								var url = this.getCurrentUrl();
								casper.echo('url : ' +url);
								url = url.split('#');
								href = url[0].split('.com');
								casper.echo('********************href : ' +href[1]);
								//Verify lock topic option on post page
								test.assertExists('.alert-warning');
								var warningMsg = this.fetchText('.alert-warning');
								test.assertEquals(warningMsg.trim(), json['lock/unLock'].ExpectedWarningMessage, warningMsg.trim()+' and message is verified');
								this.thenOpen(config.url, function() {
									casper.echo('go to topic listing page to delete newly created topic ', 'INFO');
									casper.waitForSelector('form[name="posts"]', function success() {
										//delete newely created topic
										deleteNewlyCreatedTopic(href[1], 'delete', casper, function(err) {
											if(!err) {
												casper.echo('newely created topic is deleted ', 'INFO');
											}		
										});
									}, function fail(err) {
										casper.echo(err);
									});
								});
							}, function fail(err) {
								casper.echo(err);
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
	});

	/*****Add New topic by disabling Follow check box and verify follow topic option on Post page*****/
	casper.then(function() {
		casper.echo('Add New topic by disabling Follow check box and verify follow topic option on Post page', 'INFO');
		var href = "";
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : ' +config.url);
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				//go to start new topic
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
					if(!err) {
						casper.echo('start new topic', 'INFO');
						casper.waitForSelector('#post_submit', function success() {
							this.click('#post_submit');
							casper.waitForSelector('span[id^="post_message_"]', function success() {
								var url = this.getCurrentUrl();
								casper.echo('url : ' +url);
								url = url.split('#');
								href = url[0].split('.com');
								//Verify lock topic option on post page
								test.assertDoesntExist('.alert-warning');
								casper.thenOpen(config.url, function() {
									casper.echo('go to topic listing page to delete newly created topic', 'INFO');
									casper.waitForSelector('form[name="posts"]', function success() {
										//delete newely created topic
										deleteNewlyCreatedTopic(href[1], 'delete', casper, function(err) {
											if(!err) {
												casper.echo('newely created topic is deleted ', 'INFO');
											}		
										});
									}, function fail(err) {
										casper.echo(err);
									});
								});
							}, function fail(err) {
								casper.echo(err);
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
	});

	/*****Add New topic by enable lock check box and verify unlock topic option on latest topic page*****/
	casper.then(function() {
		casper.echo('Add New topic by enable lock check box and verify unlock topic option on latest topic page', 'INFO');
		var href = "";
		casper.thenOpen(config.url, function() {
			casper.echo('latest topic page : ', 'INFO');
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				//go to start new topic
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
					if(!err) {
						casper.echo('start new topic', 'INFO');
						casper.waitForSelector('#LCK', function success() {
							this.click('#LCK');
							this.click('#post_submit');
							casper.waitForSelector('span[id^="post_message_"]', function success() {
								var url = this.getCurrentUrl();
								url = url.split('#');
								href = url[0].split('.com');
								casper.thenOpen(config.url, function() {
									casper.echo('Hit on url : ' +config.url);
									casper.waitForSelector('form[name="posts"]', function success() {
										//Verify lock topic option on post page
										test.assertExists('a[href="'+href[1]+'"]');
										this.click('a[href="'+href[1]+'"]');
										casper.waitForSelector('.alert-warning', function success() {
											test.assertExists('.alert-warning');
											var warningMsg = this.fetchText('.alert-warning');
											test.assertEquals(warningMsg.trim(), json['lock/unLock'].ExpectedWarningMessage, warningMsg.trim()+' and message is verified');
											casper.thenOpen(config.url, function() {
												casper.echo('go to topic listing page to delete newly created topic', 'INFO');
												casper.waitForSelector('form[name="posts"]', function success() {
												//delete newely created topic
												deleteNewlyCreatedTopic(href[1], 'delete', casper, function(err) {
												if(!err) {
													casper.echo('newely created topic is deleted ', 'INFO');
												}		
											});
}, function fail(err) {});
											});
										}, function fail(err) {
											casper.echo(err);
										});
									}, function fail(err) {
										casper.echo(err);
									});
								});
							}, function fail(err) {
								casper.echo(err);
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
	});
	
	/*****Add New topic by disabling lock check box and verify lock topic option on latest topic page*****/
	casper.then(function() {
		casper.echo('Add New topic by disabling lock check box and verify lock topic option on latest topic page', 'INFO');
		var href = "";
		casper.thenOpen(config.url, function() {
			casper.echo('latest topic page ', 'INFO');
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				//go to start new topic
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
					if(!err) {
						casper.echo('start new topic', 'INFO');
						casper.waitForSelector('#post_submit', function success() {}, function fail(err) {
							this.click('#post_submit');
							casper.waitForSelector('span[id^="post_message_"]', function success() {
								var url = this.getCurrentUrl();
								url = url.split('#');
								href = url[0].split('.com');
								casper.thenOpen(config.url, function() {
									casper.echo('Hit on url : ' +config.url, 'INFO');
									casper.waitForSelector('form[name="posts"]', function success() {
										test.assertExists('a[href="'+href[1]+'"]');
										this.click('a[href="'+href[1]+'"]');
										//Verify lock topic option on post page
										casper.waitForSelector('.alert-warning', function success() {
											test.assertDoesntExist('.alert-warning');
											casper.thenOpen(config.url, function() {
												casper.echo('go to topic listing page to delete newly created topic', 'INFO');
												casper.waitForSelector('form[name="posts"]', function success() {
													//delete newely created topic
													deleteNewlyCreatedTopic(href[1], 'delete', casper, function(err) {
														if(!err) {
															casper.echo('newely created topic is deleted ', 'INFO');
														}		
													});	
												}, function fail(err) {
													casper.echo(err);
												});
											});
										}, function fail(err) {
											casper.echo(err);
										});
									}, function fail(err) {
										casper.echo(err);
									});
								});
							}, function fail(err) {
								casper.echo(err);
							});
						});
					}
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});
	});

	/*****Verify Vote option against locked topic on post page*****/
	casper.then(function() {
		casper.echo('Verify Vote option against locked topic on post page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to post page ', 'INFO');
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
					if(!err) {
						casper.echo('start new topic', 'INFO');
						casper.waitForSelector('#LCK', function success() {}, function fail(err) {
							this.click('#LCK');
							//Go To Poll Page
							gotoNewPollpage(casper, function(err) {
								if(!err) {
									casper.log('redirect to Poll', 'INFO');
									//Post Poll Data
									savePollPage(json['poll'].vadidCredintial, casper, function(err) {
										if(!err) {
											casper.log('poll posted successfully', 'info');
											casper.waitForSelector('input[name="pollvotesave"]', function success() {
												var url = this.getCurrentUrl();
												casper.echo('url : ' +url);
												url = url.split('#');
												href = url[0].split('.com');
												casper.echo('**********************href : ' +href[1]);
												this.click('form[name="Poll"] input[name="pollvotesave"]');
												var msg = this.getElementAttribute('form[name="Poll"] input[name="pollvotesave"]', 'data-original-title');
												casper.echo('msg : ' +msg.trim());
												test.assertEquals(msg.trim(), json['lock/unLock'].ExpectedMessage, msg.trim()+' and message is verified');
												this.thenOpen(config.url, function() {
													casper.echo('go to topic listing page to delete newly created topic ', 'INFO');
													//delete newely created topic
													casper.waitForSelector('form[name="posts"]', function success() {
														casper.echo('**********************href : ' +href[1]);
														var id = href[1].split('=');
														casper.echo('id : ' +id[1]);
														test.assertExists('input[value="'+id[1]+'"]');
														this.click('input[value="'+id[1]+'"]');
														this.waitForSelector('#delete', function success() {
															this.click('#delete');
															casper.echo('newely created topic is deleted ', 'INFO');
														}, function fail(err) {
															casper.echo(err);
														});
													}, function fail(err) {
														casper.echo(err);
													});
												});
									
											}, function fail(err) {
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
			}, function fail(err) {
				casper.echo(err);
			});
		});
	});

	//Logout(Admin) From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully logout from application', 'INFO');
		});
	});
	return callback();
};

/************************************PRIVATE METHODS***********************************/

//method for select topic ange href value and click on checkbox
var selectTopic = function(topicVal, eleStatus, driver, callback) {
	var href = driver.getElementAttribute(topicVal, "href");
	href = href.split('-');
	var id = href[1].split('?');
	driver.click('input[value="'+id[0]+'"]');
	driver.waitForSelector('a[data-original-title="Lock/Un-lock"]', function success() {
		this.test.assertExists('a[data-original-title="Lock/Un-lock"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('a[data-original-title="Lock/Un-lock"]');
		this.test.assertExists('#' +eleStatus);
		casper.echo('---------------------------------------------------------------------------');
		this.click('#' +eleStatus);
	}, function fail(err) {
		casper.echo(err);
	});
	return callback(null);
};

// method for go to new poll to application

var gotoNewTopic = function(data, driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	driver.waitForSelector('#message_ifr', function success() {
         	 this.sendKeys('input[name="subject"]', data.title, {reset:true});
		 this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
	 		this.sendKeys('#tinymce', data.content);	
		});	
		
		this.click('#all_forums_dropdown');
		var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
		this.fill('form[name="PostTopic"]',{
			'forum' : val.trim()
		},false);
	}, function fail(err) {
		casper.echo(err);
	});

	return callback(null);
};

var gotoNewPollpage = function(driver, callback) {
	this.test.assertExists('ul li a[href="#poll"]');
	casper.echo('---------------------------------------------------------------------------');
	this.click('ul li a[href="#poll"]');
	return callback(null);
};

// method for go to save new poll  to application

var savePollPage = function(data, driver, callback) {
	driver.sendKeys('#poll_question', data.pollQues, {reset:true});
	driver.sendKeys('input[name="public"]', data.publicCheckbox);
	driver.sendKeys('#poll_option_1 div input', data.option1, {reset:true});
	driver.sendKeys('#poll_option_2 div input', data.option2, {reset:true});	
	this.click('a[href="#poll-timeout"] small.text-muted');
	driver.click('#save_poll');
	return callback(null);
};

//method for delete newly created topic
var deleteNewlyCreatedTopic = function(href, eleStatus, driver, callback){
	href = href.split('-');
	var id = href[1].split('?');
	driver.click('input[value="'+id[0]+'"]');
	driver.waitForSelector('#' +eleStatus, function success() {
		this.test.assertExists('#' +eleStatus);
		casper.echo('---------------------------------------------------------------------------');
		this.click('#' +eleStatus);
	}, function fail(err) {
		casper.echo(err);
	});
	return callback(null);
};









