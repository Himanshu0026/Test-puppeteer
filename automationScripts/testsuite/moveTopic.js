/****This script is dedicated for Admin to move topic/post on the forum. It covers testing of move topic/post with all defined validations****/

"use strict";

var utils = require('./utils.js');
var json = require('../testdata/topic.json');
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var config = require('../../config/config.json');

var moveTopic = module.exports = {};
moveTopic.errors = [];
var screenShotsDir = config.screenShotsLocation + 'moveTopic/';

moveTopic.moveTopicFeature = function(casper, test, x) {
	var hrefVal = "";
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		moveTopic.errors.push(msg);
	});
	//start from forum url
	casper.start(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function(err) {
			if(!err) {
				casper.echo('Admin has been successfuly login to application', 'INFO');
			}
		});
	});

	/*****(1)Verify move topic from the topic listing page under category *****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page under category ', 'INFO');
		test.assertExists('a[href="/categories"]');
		this.click('a[href="/categories"]');
		casper.waitForSelector('.table-responsive ul li', function success() {
			test.assertExists('.table-responsive ul li');
			var element = this.evaluate(function() {
				var el = document.querySelectorAll('.table-responsive ul li');
				return el;
			});
			casper.echo('length of ul is :' +element.length);
			var val = this.evaluate(function() {
				var x1 = document.querySelector('.table-responsive ul li:nth-child(1) span.forum-title').innerText;
				var x2 = document.querySelector('.table-responsive ul li:nth-child(2) span.forum-title').innerText;
				var item = [];
				item[0] = x1;
				item[1] = x2;
				return  item;
			});
			casper.echo('val : '+val);
			casper.echo('val[0] :' +val[0]);
			casper.echo('val[1] :' +val[1]);
			if(element.length >1) {
				json.moveTopic.moveToCategory2 = val[0];
				casper.echo('******************************************** : ' +json.moveTopic.moveToCategory2); 
				var moveToCategory = json.moveTopic.moveToCategory2;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
	
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				casper.waitForSelector('a[href^="/post/"]', function success() {
					var topicTitle = json.moveTopic.topicName;
					json.moveTopic.moveToCategory1 = val[1];
					var moveToCategory = json.moveTopic.moveToCategory1;
					var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a");
					selectTopic(classVal, 'move', casper, function(err) {
						if(!err) {
							casper.waitForSelector('#move_threads_dropdown', function success() {
								test.assertExists('#move_threads_dropdown');
								this.click('#move_threads_dropdown');
								this.fill('form[name="admindd"]',{
									'moveto' : moveToCategory
								},false);
								test.assertExists('button[name="submit"]');
								this.click('button[name="submit"]');
								casper.waitForSelector('a[href^="/post/"]', function success() {
									/*this.thenOpen(config.url, function() {
										casper.echo('hit on url : '+config.url, 'INFO');
									});*/
									//verify moved topic
									test.assertExists('a[href="/categories"]');
									this.click('a[href="/categories"]');
									casper.waitForSelector('.table-responsive ul li', function success() {
										var moveToCategory = json.moveTopic.moveToCategory1;
										var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
										var href = this.getElementAttribute(classVal, "href");
										test.assertExists('a[href="'+href+'"]');
										this.click('a[href="'+href+'"]');
										casper.waitForSelector('a[href^="/post/"]', function success() {
											var topicTitle = json.moveTopic.topicName;
											test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
											casper.echo('move topic is verified', 'INFO');
										}, function fail(err) {
											casper.echo(err);
										});
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
				}, function fail(err) {
					casper.echo(err);
				});
			} else {
				casper.echo('you can not perform move topic feature');
			}
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****(2)Verify move topic from the topic listing page[Home Page]*****/	
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move topic from the topic listing page[Home Page]', 'INFO');
		casper.echo('go to topic listing page', 'INFO');
		var topicTitle = json.moveTopic.topicName;
		var moveToCategory = json.moveTopic.moveToCategory2;
		var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
		selectTopic(classVal, 'move', casper, function(err) {
			if(!err) {
				casper.waitForSelector('#move_threads_dropdown', function success() {
					test.assertExists('#move_threads_dropdown');
					this.click('#move_threads_dropdown');
					this.fill('form[name="admindd"]',{
						'moveto' : moveToCategory
					},false);
					test.assertExists('button[name="submit"]');
					this.click('button[name="submit"]');
					//verify moved topic
					casper.waitForSelector('a[href^="/post/"]', function success() {
						test.assertExists('a[href="/categories"]');
						this.click('a[href="/categories"]');
						casper.waitForSelector('.table-responsive ul li', function success() {
							var moveToCategory = json.moveTopic.moveToCategory1;
							var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
							var href = this.getElementAttribute(classVal, "href");

							test.assertExists('a[href="'+href+'"]');
							this.click('a[href="'+href+'"]');
							casper.waitForSelector('a[href^="/?forum="]', function success() {
								var topicTitle = json.moveTopic.topicName;
								test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']/parent::a"));
								casper.echo('move topic is verified', 'INFO');
							}, function fail(err) {
								casper.echo(err);
							});
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
	});

	/*****(3)Verify move topic from the latest topic page *****/
	/*casper.then(function() {
		casper.echo('Verify move topic from the latest topic page ', 'INFO');
		test.assertExists('#links-nav');
		this.click('#links-nav');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
		this.waitForSelector('a[href^="/post/"]', function success() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory1;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function(err) {
				if(!err) {
					casper.waitForSelector('#move_threads_dropdown', function success() {
						test.assertExists('#move_threads_dropdown');
						this.click('#move_threads_dropdown');
						this.fill('form[name="admindd"]',{
							'moveto' : moveToCategory
						},false);
						test.assertExists('button[name="submit"]');
						this.click('button[name="submit"]');
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
		//verify moved topic
		this.thenOpen(config.url, function() {
			this.waitForSelector('a[href="/categories"]', function success() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				casper.waitForSelector('.table-responsive ul li', function success() {
					var moveToCategory = json.moveTopic.moveToCategory1;
					var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists('a[href="'+href+'"]');
					this.click('a[href="'+href+'"]');
					this.waitForSelector('a[href^="/post/"]', function success() {
						var topicTitle = json.moveTopic.topicName;
						test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
							casper.echo('move topic is verified', 'INFO');
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
	});

	/*****(4)Verify move topic from the search result page  *****/
	/*casper.thenOpen(config.url, function() {
		casper.echo('Verify move topic from the search result page ', 'INFO');
		this.waitForSelector('#inline_search_box', function success() {
			test.assertExists('#inline_search_box');
			this.click('#inline_search_box');
			this.sendKeys('#inline_search_box', json.moveTopic.topicName);
			this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
			casper.waitForSelector('.table-responsive ul li', function success() {
				var topicTitle = json.moveTopic.topicName;
				var moveToCategory = json.moveTopic.moveToCategory2;
				var classVal = x("//a/b[text()='"+topicTitle+"']/parent::a");
				selectTopic(classVal, 'move', casper, function(err) {
					if(!err) {
						casper.waitForSelector('#move_threads_dropdown', function success() {
							test.assertExists('#move_threads_dropdown');
							this.click('#move_threads_dropdown');
							this.fill('form[name="admindd"]',{
								'moveto' : moveToCategory
							},false);
							test.assertExists('button[name="submit"]');
							this.click('button[name="submit"]');
							
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
		
		//verify moved topic
		this.thenOpen(config.url, function() {
			this.waitForSelector('a[href="/categories"]', function success() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				casper.waitForSelector('.table-responsive ul li', function success() {
					var moveToCategory = json.moveTopic.moveToCategory1;
					var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
					var href = this.getElementAttribute(classVal, "href");

					test.assertExists('a[href="'+href+'"]');
					this.click('a[href="'+href+'"]');
					this.waitForSelector('a[href^="/post/"]', function success() {
						var topicTitle = json.moveTopic.topicName;
						test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']/parent::a"));
						casper.echo('move topic is verified', 'INFO');
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
	});*/

	/*****Verify move topic from the topic listing page under sub category *****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move topic from the topic listing page under sub category ', 'INFO');
		casper.echo('go to topic listing page ', 'INFO');
		this.waitForSelector('a[href="/categories"]', function success() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			casper.waitForSelector('.table-responsive ul li', function success() {
				if(this.exists(x('//h3/span[@class="subforum-list"]/a'))) {
					this.click('h3 span.subforum-list a');
					//create new topic
					this.waitForSelector('a[href^="/post/printadd"]', function success() {
						gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
							if(!err) {
								casper.echo('start new topic', 'INFO');
								casper.waitForSelector('#post_submit', function success() {
									this.click('#post_submit');
									casper.waitForSelector('span[id^="post_message_"]', function success() {
										var url = this.getCurrentUrl();
										casper.echo('url : ' +url);
										url = url.split('#');
										hrefVal = url[0].split('.com');
										casper.echo('#############1111 hrefVal : ' +hrefVal);
										this.waitForSelector('#backArrowPost', function success(){
											this.thenOpen(config.url);
											casper.waitForSelector('a[href^="/post/"]', function success() {
												var moveToCategory = json.moveTopic.moveToCategory2;
												var topicTitle = json['newTopic'].ValidCredential.title;
												var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
												selectTopic(classVal, 'move', casper, function(err) {
													if(!err) {
														casper.waitForSelector('#move_threads_dropdown', function success() {
														test.assertExists('#move_threads_dropdown');
														this.click('#move_threads_dropdown');
														this.fill('form[name="admindd"]',{
															'moveto' : moveToCategory
														},false);
														test.assertExists('button[name="submit"]');
														this.click('button[name="submit"]');
														casper.waitForSelector('a[href^="/post/"]', function success() {
															//verify moved topic
															test.assertExists('a[href="/categories"]');
															this.click('a[href="/categories"]');
															casper.waitForSelector('.table-responsive ul li', function success() {
																var moveToCategory = json.moveTopic.moveToCategory2;
																var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
																var href = this.getElementAttribute(classVal, "href");

																test.assertExists('a[href="'+href+'"]');
																this.click('a[href="'+href+'"]');
																casper.waitForSelector('a[href^="/post/"]', function success() {
																	var topicTitle = json['newTopic'].ValidCredential.title;
																	test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
																	casper.echo('move topic is verified', 'INFO');

																}, function fail(err) {});
															}, function fail(err) {});
														}, function fail(err) {});
													}, function fail(err) {});			
													}
												});
											}, function fail(err) {});
										}, function fail() {});	
									}, function fail(err) {});
								}, function fail(err) {});
							}
						});
					}, function fail(err) {});

					this.then(function() {
						
					});
				} else {
					casper.echo('there is no any sub category');
				}
			}, function fail(err) {});
		}, function fail(err) {});
	});

	/*****Verify move topic from the profile page *****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move topic from the profile page ', 'INFO');		
		casper.echo('go to topic listing page', 'INFO');
		casper.waitForSelector('a[href^="/post/"]', function success() {
			test.assertExists('li.user-panel .dropdown-toggle');
			this.click('li.user-panel .dropdown-toggle');
			test.assertExists('a[href^="/profile/"]');
			this.click('a[href^="/profile/"]');
			this.waitForSelector('#PostsOFUser', function success() {
				test.assertExists('#Topics_Started');
				this.click('#Topics_Started');
				this.waitForSelector('#Topics_Started', function success() {
					var topicTitle = json['newTopic'].ValidCredential.title;
					var moveToCategory = json.moveTopic.moveToCategory2;
					var classVal = x("//a[text()='"+topicTitle+"']");
					var href = casper.getElementAttribute(classVal, "href");
					href = href.split('-');
					var id = href[1].split('?');
					casper.mouse.move('#complete_post_' +id[0]);
					test.assertExists('div.post-body .panel-dropdown div.dropdown');
					this.click('div.post-body .panel-dropdown div.dropdown input[value="'+id[0]+'"]');
					this.click('#move');
					casper.waitForSelector('#move_threads_dropdown', function success() {
						test.assertExists('#move_threads_dropdown');
						this.click('#move_threads_dropdown');
						this.fill('form[name="admindd"]',{
							'moveto' : moveToCategory
						},false);
						test.assertExists('button[name="submit"]');
						this.click('button[name="submit"]');
						//verify moved topic
						casper.waitForSelector('a[href^="/post/"]', function success() {
							test.assertExists('a[href="/categories"]');
							this.click('a[href="/categories"]');
							casper.waitForSelector('.table-responsive ul li', function success() {
								var moveToCategory = json.moveTopic.moveToCategory1;
								var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
								var href = this.getElementAttribute(classVal, "href");

								test.assertExists('a[href="'+href+'"]');
								this.click('a[href="'+href+'"]');
								casper.waitForSelector('a[href^="/post/"]', function success() {		
									var topicTitle = json['newTopic'].ValidCredential.title;
									test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']/parent::a"));
									casper.echo('move topic is verified', 'INFO');
									//delete newely created topic
									casper.thenOpen(config.url, function() {
										casper.echo('go to topic listing page to delete newely created topic by admin to verify move topic from sub category and profile page ', 'INFO');
										casper.waitForSelector('a[href^="/post/"]', function success() {
											deleteNewlyCreatedTopic(hrefVal[1], 'delete', casper, function() {
												casper.echo('newely created topic is deleted ', 'INFO');		
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
						}, function fail(err) {
							casper.echo(err);
						});
					}, function fail(err) {
						casper.echo(err);
					});
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

	//go to backend url
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('Login To Backend URL and disable move topic checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle(), 'INFO');
		//login to backend url (rm)
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to backend', 'INFO');
				//go to user permission
				utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
					if (!err) {
						casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
						//click on checkbox
						casper.waitForSelector('#move_own_threads', function success() {
							utils.enableorDisableCheckbox('move_own_threads', false, casper, function(err) {
								if(!err) {
									casper.echo("move own Tpoic checkbox has been disabled", 'INFO');
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

	//go to forum url	
	casper.thenOpen(config.url, function() {
		casper.echo('hit on url : '+config.url, 'INFO');
		//Logout From App
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully logout from application', 'INFO');
		});
	});

	//Login To App
	casper.then(function() {
	 	forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.echo('User has been successfuly login to application with register user', 'INFO');
		});
	});

	/*****Verify move topic from the latest topic page (own topic for registered user when disabled "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the latest topic page (own topic for registered user when disabled "move topic" permission)', 'INFO');		
		test.assertExists('#links-nav');
		this.click('#links-nav');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
		casper.waitForSelector('a[href^="/post/"]', function success() {
			var topicTitle = json.moveTopic.topicName;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function(err) {});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****Verify move topic from the topic listing page[Home Page] for (own post for registered user when Disabled "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page[Home Page] for (own post for registered user when Disabled "move topic" permission)', 'INFO');
		this.thenOpen(config.url,function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		casper.waitForSelector('a[href^="/post/"]', function success() {
			var topicTitle = json.moveTopic.topicName;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function(err) {});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	
	/*****Verify move topic from the topic listing page under sub category (own post for registered user when disable "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page under sub category (own post for registered user when disable "move topic" permission)', 'INFO');
		this.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			casper.waitForSelector('.table-responsive ul li', function success() {
				if(this.exists(x('//h3/span[@class="subforum-list"]/a'))) {
					this.click('h3 span.subforum-list a');
					//create new topic
					this.waitForSelector('a[href^="/post/printadd"]', function success() {
						gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
							if(!err) {
								casper.echo('start new topic', 'INFO');
								casper.waitForSelector('#post_submit', function success() {
									this.click('#post_submit');
									this.waitForSelector('span[id^="post_message_"]', function success() {
										var url = this.getCurrentUrl();
										casper.echo('url : ' +url);
										url = url.split('#');
										hrefVal = url[0].split('.com');
										this.waitForSelector('#backArrowPost', function(){
											this.thenOpen(config.url);
											casper.waitForSelector('a[href^="/post/"]', function success() {
												var topicTitle = json['newTopic'].ValidCredential.title;
												var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
												selectTopic(classVal, 'move', casper, function(err) {});
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
				} else {
					casper.echo('there is no any sub category');
				}
			}, function fail(err) {
				casper.echo(err);
			});			
		});
	});

	/*****Verify move topic from the topic listing page under category (own post for registered user when Disable "move topic" permission)*****/
	casper.thenOpen(config.url,function() {
		casper.echo('Verify move topic from the topic listing page under category (own post for registered user when Disable "move topic" permission)', 'INFO');
		casper.echo('go to topic listing page', 'INFO');
		this.waitForSelector('a[href="/categories"]', function success() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			casper.waitForSelector('.table-responsive ul li', function success() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				casper.waitForSelector('a[href^="/post/"]', function success() {
					var topicTitle = json.moveTopic.topicName;
					var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
					selectTopic(classVal, 'move', casper, function(err) {});
				}, function fail() {
					casper.echo(err);
				});					
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****Verify move topic from the profile page (own post for registered user when Disable "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the profile page (own post for registered user when Disable "move topic" permission)', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
			this.waitForSelector('li.user-panel .dropdown-toggle', function success() {
				test.assertExists('li.user-panel .dropdown-toggle');
				this.click('li.user-panel .dropdown-toggle');
				test.assertExists('a[href^="/profile/"]');
				this.click('a[href^="/profile/"]');
				this.waitForSelector('#PostsOFUser', function() {
					test.assertExists('#Topics_Started');
					this.click('#Topics_Started');
					this.waitForSelector('#Topics_Started', function success() {
						var topicTitle = json.moveTopic.topicName;
						var classVal = x("//a[text()='"+topicTitle+"']");
						var href = casper.getElementAttribute(classVal, "href");
						href = href.split('-');
						var id = href[1].split('?');
						casper.mouse.move('#complete_post_' +id[0]);
						test.assertExists('div.post-body.pull-left .panel-dropdown div.dropdown');
						this.click('div.post-body.pull-left .panel-dropdown div.dropdown input[value="'+id[0]+'"]');
						this.click('#move');
						this.waitForSelector('.alert-info', function success() {
							var info = this.fetchText('.alert-info');
							var alertInfo = info.split('.');
							test.assertEquals(alertInfo[0].trim(), 'Sorry! You do not have permission to perform this action');
							casper.echo(alertInfo[0] +" Because permission is disabled", 'INFO');
						}, function fail(err) {
							casper.echo(err);
						});
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
	});
	
	//Login To Backend URL and enable move topic checkbox
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable move topic checkbox', 'INFO');
		casper.echo('title of the page : ' +this.getTitle());
		//go to user permission
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function(err) {
			if(!err) {
				casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
				//click on checkbox
				casper.waitForSelector('#move_own_threads', function success() {
					utils.enableorDisableCheckbox('move_own_threads', true, casper, function(err) {
						if(!err) {
							casper.echo("move own Tpoic checkbox has been enable", 'INFO');
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
	
	/*****(5)Verify move topic from the latest topic page (own topic for registered user when enabled "move topic" permission)*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move topic from the latest topic page (own topic for registered user when enabled "move topic" permission)', 'INFO');
		this.waitForSelector('#links-nav', function success() {
			test.assertExists('#links-nav');
			this.click('#links-nav');
			test.assertExists('a[href="/latest"]');
			this.click('a[href="/latest"]');
			this.waitForSelector('a[href^="/post/"]', function success() {
				var topicTitle = json.moveTopic.topicName;
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
				selectTopic(classVal, 'move', casper, function(err) {
					if(!err) {
						casper.waitForSelector('#move_threads_dropdown', function success() {
							test.assertExists('#move_threads_dropdown');
							this.click('#move_threads_dropdown');
							this.fill('form[name="admindd"]',{
								'moveto' : moveToCategory
							},false);
							test.assertExists('button[name="submit"]');
							this.click('button[name="submit"]');
							//verify moved topic
							this.waitForSelector('a[href="/categories"]', function success() {
								test.assertExists('a[href="/categories"]');
								this.click('a[href="/categories"]');
								casper.waitForSelector('.table-responsive ul li', function success() {
									var moveToCategory = json.moveTopic.moveToCategory1;
									var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
									var href = this.getElementAttribute(classVal, "href");
									test.assertExists('a[href="'+href+'"]');
									this.click('a[href="'+href+'"]');
									casper.waitForSelector('a[href^="/post/"]', function success() {
										var topicTitle = json.moveTopic.topicName;
										test.assertExists(x("//a/span[text()='"+topicTitle+"']"));
										casper.echo('move topic is verified', 'INFO');
									}, function fail(err) {
										casper.echo(err);
									});
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
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****(6)Verify move topic from the topic listing page[Home Page] for (own post for registered user when enabled "move topic" permission)*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move topic from the topic listing page[Home Page] for (own post for registered user when enabled "move topic" permission)', 'INFO');
		casper.echo('go to topic listing page', 'INFO');
		this.waitForSelector('a[href="/post/printadd"]', function success() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory2;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a");
			selectTopic(classVal, 'move', casper, function(err) {
				if(!err) {
					casper.waitForSelector('#move_threads_dropdown', function() {
						test.assertExists('#move_threads_dropdown');
						this.click('#move_threads_dropdown');
						this.fill('form[name="admindd"]',{
							'moveto' : moveToCategory
						},false);
						test.assertExists('button[name="submit"]');
						this.click('button[name="submit"]');
						//verify moved topic
						this.waitForSelector('a[href="/categories"]', function success() {
							test.assertExists('a[href="/categories"]');
							this.click('a[href="/categories"]');
							casper.waitForSelector('.table-responsive ul li', function success() {
								var moveToCategory = json.moveTopic.moveToCategory1;
								var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
								var href = this.getElementAttribute(classVal, "href");

								test.assertExists('a[href="'+href+'"]');
								this.click('a[href="'+href+'"]');
								casper.waitForSelector('a[href^="/post/"]', function success() {
									var topicTitle = json.moveTopic.topicName;
									test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']"));
									casper.echo('move topic is verified', 'INFO');
								}, function fail(err) {
									casper.echo(err);
								});
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
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****(7)Verify move topic from the topic listing page under category (own post for registered user when enable "move topic" permission)*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move topic from the topic listing page under category (own post for registered user when enable "move topic" permission)', 'INFO');
		this.waitForSelector('a[href="/categories"]', function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			casper.waitForSelector('.table-responsive ul li', function success() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				casper.waitForSelector('a[href^="/post/"]', function success() {
					var topicTitle = json.moveTopic.topicName;
					var moveToCategory = json.moveTopic.moveToCategory1;
					var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
					selectTopic(classVal, 'move', casper, function(err) {
						if(!err) {
							casper.waitForSelector('#move_threads_dropdown', function() {
								test.assertExists('#move_threads_dropdown');
								this.click('#move_threads_dropdown');
								this.fill('form[name="admindd"]',{
									'moveto' : moveToCategory
								},false);
								test.assertExists('button[name="submit"]');
								this.click('button[name="submit"]');
								//verify moved topic
								this.waitForSelector('a[href="/categories"]', function() {
									test.assertExists('a[href="/categories"]');
									this.click('a[href="/categories"]');
									casper.waitForSelector('.table-responsive ul li', function success() {
										var moveToCategory = json.moveTopic.moveToCategory1;
										var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
										var href = this.getElementAttribute(classVal, "href");
										test.assertExists('a[href="'+href+'"]');
										this.click('a[href="'+href+'"]');
										casper.waitForSelector('a[href^="/post/"]', function success() {
											var topicTitle = json.moveTopic.topicName;
											test.assertExists(x("//a/span[text()='"+topicTitle+"']"));
											casper.echo('move topic is verified', 'INFO');
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
						}
					});
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
	
	/*****(8)Verify move topic from the profile page (own post for registered user when enable "move topic" permission)*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move topic from the profile page (own post for registered user when enable "move topic" permission)', 'INFO');
		this.waitForSelector('li.user-panel .dropdown-toggle', function success() {
			test.assertExists('li.user-panel .dropdown-toggle');
			this.click('li.user-panel .dropdown-toggle');
			test.assertExists('a[href^="/profile/"]');
			this.click('a[href^="/profile/"]');
			this.waitForSelector('#PostsOFUser', function() {
				test.assertExists('#Topics_Started');
				this.click('#Topics_Started');
				this.waitForSelector('#Topics_Started', function() {
					var topicTitle = json.moveTopic.topicName;
					var moveToCategory = json.moveTopic.moveToCategory2;
					var classVal = x("//a[text()='"+topicTitle+"']");
					var href = casper.getElementAttribute(classVal, "href");
					if(href) {
						href = href.split('-');
						var id = href[1].split('?');
						casper.mouse.move('#complete_post_' +id[0]);
						test.assertExists('div.post-body.pull-left .panel-dropdown div.dropdown');
						this.click('div.post-body.pull-left .panel-dropdown div.dropdown input[value="'+id[0]+'"]');
						this.click('#move');
						this.waitForSelector('#move_threads_dropdown', function success() {
							test.assertExists('#move_threads_dropdown');
							this.click('#move_threads_dropdown');
							this.fill('form[name="admindd"]',{
								'moveto' : moveToCategory
							},false);
							test.assertExists('button[name="submit"]');
							this.click('button[name="submit"]');
							//verify moved topic
							this.waitForSelector('a[href="/categories"]', function success() {
								test.assertExists('a[href="/categories"]');
								this.click('a[href="/categories"]');
								casper.waitForSelector('.table-responsive ul li', function success() {
									var moveToCategory = json.moveTopic.moveToCategory1;
									var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
									var href = this.getElementAttribute(classVal, "href");

									test.assertExists('a[href="'+href+'"]');
									this.click('a[href="'+href+'"]');
									casper.waitForSelector('a[href^="/post/"]', function success() {
										casper.capture('category2.png');
										var topicTitle = json.moveTopic.topicName;
										try {
											test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']"));
										} catch(e) {

										}
										casper.echo('move topic is verified', 'INFO');
									}, function fail(err) {
										casper.echo(err);
									});
								}, function fail(err) {
									casper.echo(err);
								});
							}, function fail(err) {
								casper.echo(err);
							});
						}, function fail(err) {
							casper.echo(err);
						});
					} else {
						casper.echo('topic '+topicTitle+' does not exists','INFO');
					}
				}, function fail(err) {
					casper.echo(err);
				});
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail() {
			casper.echo(err);
		});
	});

	/*****Verify move topic from the topic listing page under sub category (own post for registered user when enable "move topic" permission)*****/
	casper.thenOpen( config.url, function() {
		casper.echo('Verify move topic from the topic listing page under sub category (own post for registered user when enable "move topic" permission)', 'INFO');
		this.waitForSelector('a[href="/categories"]', function success() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			casper.waitForSelector('.table-responsive ul li', function success() {
				if(this.exists(x('//h3/span[@class="subforum-list"]/a'))) {
					this.click('h3 span.subforum-list a');
					this.waitForSelector('a[href^="/post/printadd?"]', function success() {
						var moveToCategory = json.moveTopic.moveToCategory2;
						var topicTitle = json['newTopic'].ValidCredential.title;
						var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
						selectTopic(classVal, 'move', casper, function(err) {
							if(!err) {
								casper.waitForSelector('#move_threads_dropdown', function success() {
									test.assertExists('#move_threads_dropdown');
									this.click('#move_threads_dropdown');
									this.fill('form[name="admindd"]',{
										'moveto' : moveToCategory
									},false);
									test.assertExists('button[name="submit"]');
									this.click('button[name="submit"]');
									//verify moved topic
									casper.thenOpen(config.url, function() {
										this.waitForSelector('a[href="/categories"]', function success() {
											test.assertExists('a[href="/categories"]');
											this.click('a[href="/categories"]');
											casper.waitForSelector('.table-responsive ul li', function success() {
												var moveToCategory = json.moveTopic.moveToCategory2;
												var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
												var href = this.getElementAttribute(classVal, "href");

												test.assertExists('a[href="'+href+'"]');
												this.click('a[href="'+href+'"]');
												this.waitForSelector('a[href^="/post/printadd"]', function success() {
													var topicTitle = json['newTopic'].ValidCredential.title;
													test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
													casper.echo('move topic is verified', 'INFO');
													//delete newely created topic
													casper.thenOpen(config.url, function() {
														this.waitForSelector('a[href^="/post/"]', function success() { 
															deleteNewlyCreatedTopic(hrefVal[1], 'delete', casper, function() {
																casper.echo('newely created topic is deleted ', 'INFO');		
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
										}, function fail(err) {
											casper.echo(err);
										});
									});
								}, function fail(err) {
									casper.echo(err);
								});
							}
						});
					}, function fail(err) {
						casper.echo(err);
					});
				} else {
					casper.echo('there is no any sub category');
				}
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	//test cases for unregistered user/guest user
	casper.then(function() {
		casper.echo('test cases for unregistered user/guest user', 'INFO');
		//Logout From App
		forumLogin.logoutFromApp(casper, function(err) {
			if(!err) {
				casper.echo('Successfully logout from application', 'INFO');
			}
		});
	});

	/*****Verify move topic from the latest topic page *****/
	casper.then(function() {
		casper.echo('Verify move topic from the latest topic page ', 'INFO');
		this.waitForSelector('a[href^="/post/"]', function() {
			test.assertExists('#links-nav');
			this.click('#links-nav');
			test.assertExists('a[href="/latest"]');
			this.click('a[href="/latest"]');
			this.waitForSelector('.main-container', function success() {
				if(this.exists('.alert-info')) {
					var info = this.fetchText('.alert-info');
					casper.echo(info.trim(), 'INFO');
				} else {
					this.then(function() {
						var topicTitle = json.moveTopic.topicName;
						var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
						var href = this.getElementAttribute(classVal, "href");
						href = href.split('-');
						var id = href[1].split('?');
						test.assertDoesntExist('input[value="'+id[0]+'"]');
					});
				}
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});
		
	/*****Verify move topic from the post listing page *****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move topic from the post listing page ', 'INFO');
		this.waitForSelector('.main-container', function success() {
			if(this.exists('.alert-info')) {
				var info = this.fetchText('.alert-info');
				casper.echo(info.trim(), 'INFO');
			} else {
				this.then(function() {
					var topicTitle = json.moveTopic.topicName;
					var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
					var href = this.getElementAttribute(classVal, "href");
					this.click('a[href="'+href+'"]');
					this.then(function() {
						test.assertDoesntExist('input[class="entry-checkbox"]');
					});
				});
			}
		}, function fail(err) {
			casper.echo(err);
		});
	});
	
	//test cases for move post.
	casper.then(function() {
		casper.echo('test cases for move post.', 'INFO');
		//Login To App
		forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function(err) {
			if(!err) {
				casper.echo('Admin has been successfuly login to application', 'INFO');
			}
		});
	});

	/*****Verify move post from the profile page into the new topic*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the profile page into the new topic', 'INFO');
		var checkedVal = "";
		//create new topic
		this.waitForSelector('a[href="/post/printadd"]', function success() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
				if(!err) {
					casper.echo('start new topic', 'INFO');
					casper.waitForSelector('#post_submit', function success() {
						this.click('#post_submit');
						this.waitForSelector('span[id^="post_message_"]', function success() {
							var url = this.getCurrentUrl();
							casper.echo('url : ' +url);
							url = url.split('?');
							hrefVal = url[0].split('.com');
							var postId = url[1].split('#post');
							checkedVal = postId[1];	
							casper.echo('checkedval : ' +checkedVal, 'INFO');
							casper.echo('hrefVal : ' +hrefVal[1], 'INFO');
							this.waitForSelector('li.user-panel .dropdown-toggle', function() {
								casper.echo('go to profile page', 'INFO');
								test.assertExists('li.user-panel .dropdown-toggle');
								this.click('li.user-panel .dropdown-toggle');
								test.assertExists('a[href^="/profile/"]');
								this.click('a[href^="/profile/"]');
								this.waitForSelector('#PostsOFUser', function success() {
									casper.echo('href : ' +hrefVal[1], 'INFO');
									test.assertExists('a[href^="'+hrefVal[1]+'"]');
									this.click('a[href^="'+hrefVal[1]+'"]');
									this.waitForSelector('span[id^="post_message_"]', function success() {
										this.mouse.move('#ajax_subscription_vars');
										test.assertExists('#firstpid');
										utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
										this.waitForSelector('#moveposts', function success() {
											test.assertExists('#moveposts');
											this.click('#moveposts');
											this.waitForSelector('form[name="movePost"]', function() {
												test.assertExists('form[name="movePost"] input[name="thread_title"]');
												this.sendKeys('form[name="movePost"] input[name="thread_title"]', json.moveTopic.newPostTitle);
												test.assertExists('button[name="submit"]');
												this.click('button[name="submit"]');
												this.waitForSelector('span[id^="post_message_"]', function success() {
													//verify post on category
													this.thenOpen(config.url, function() {
														casper.echo('go to topic listing page', 'INFO');
														this.waitForSelector('a[href="/categories"]', function success() {
															test.assertExists('a[href="/categories"]');
															this.click('a[href="/categories"]');
															this.waitForSelector('.table-responsive ul li', function success() {
																var moveToCategory = json.moveTopic.moveToCategory2;
																//var moveToCategory = 'General';
																var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
																var href = this.getElementAttribute(classVal, "href");
																test.assertExists('a[href="'+href+'"]');
																this.click('a[href="'+href+'"]');
																	this.waitForSelector('a[href^="/post/"]', function success() {
																		test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
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
												}, function fail(err) {
													casper.echo(err);
												});
											}, function fail(err) {
												casper.echo(err);
											});
										}, function fail(err) {
											casper.echo(err);
										});
									}, function fail(err) {
										casper.echo(err);
									});
								}, function fail(err) {
									casper.echo(err);
								});
							},function fail(err) {
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
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****Verify move post from the profile page into the existing topic*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the profile page into the existing topic', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		this.waitForSelector('a[href^="/post/"]', function success() {
			var classVal = x("//a/span[text()='"+json.moveTopic.topicName+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('a[href="'+href+'"]');
			this.click('a[href="'+href+'"]');
			this.waitForSelector('span[id^="post_message_"]', function success() {
				var classVal = x("//a/span[text()='"+json.moveTopic.topicName+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('a[href="'+href+'"]');
			this.click('a[href="'+href+'"]');
			this.waitForSelector('span[id^="post_message_"]', function success() {
				moveUrl = this.getCurrentUrl();
				//go to profile page
				this.waitForSelector('li.user-panel .dropdown-toggle', function success() {
					test.assertExists('li.user-panel .dropdown-toggle');
					this.click('li.user-panel .dropdown-toggle');
					test.assertExists('a[href^="/profile/"]');
					this.click('a[href^="/profile/"]');
					this.waitForSelector('#PostsOFUser', function success() {
						test.assertExists(x("//a[text()='"+json.moveTopic.newPostTitle+"']"));
						var classVal = x("//a[text()='"+json.moveTopic.newPostTitle+"']");
						var href = this.getElementAttribute(classVal, "href");
						test.assertExists('a[href="'+href+'"]');
						this.click('a[href="'+href+'"]');
						this.waitForSelector('span[id^="post_message_"]', function success() {
							this.mouse.move('#ajax_subscription_vars');
							test.assertExists('#firstpid');
							utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
							this.waitForSelector('#moveposts', function success() {
								test.assertExists('#moveposts');
								this.click('#moveposts');
								this.waitForSelector('input[name="mergethreadurl"]', function success() {
									test.assertExists('#exist_thread');
									this.click('#exist_thread');
									this.sendKeys('input[name="mergethreadurl"]', moveUrl);
									this.click('#move_posts');
										casper.echo('topic moved successfully', 'INFO');
										this.waitForSelector('span[id^="post_message_"]', function success() {
											//verify moved post
											this.thenOpen(config.url, function() {
												casper.echo('go to topic listing page', 'INFO');
												this.waitForSelector('a[href="/categories"]', function success() {
													test.assertExists('a[href="/categories"]');
													this.click('a[href="/categories"]');
													this.waitForSelector('.table-responsive ul li', function success() {
														var moveToCategory = json.moveTopic.moveToCategory2;
														//var moveToCategory = 'General';
														var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
														var href = this.getElementAttribute(classVal, "href");
														test.assertExists('a[href="'+href+'"]');
														this.click('a[href="'+href+'"]');
														this.waitForSelector('a[href^="/post/"]', function success() {
															test.assertDoesntExist(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
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
										}, function fail(err) {
											casper.echo(err);
										});	
									}, function fail(err) {});
								}, function fail(err) {
									casper.echo(err);
								});
							}, function fail(err) {
								casper.echo(err);
							});
						}, function fail(err) {
							casper.echo(err);
						});
					}, function fail(err) {
						casper.echo(err);
					});
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

	/*****Verify move post from the post listing page into the new topic*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the post listing page into the new topic', 'INFO');
		var checkedVal = "";
		//create new topic
		this.waitForSelector('a[href="/post/printadd"]', function success() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
				if(!err) {
					casper.echo('go to new topic', 'INFO');
					casper.waitForSelector('#post_submit', function success() {
						this.click('#post_submit');
						this.waitForSelector('span[id^="post_message_"]', function success() {
							var url = this.getCurrentUrl();
							casper.echo('url : ' +url);
							url = url.split('?');
							hrefVal = url[0].split('.com');
							var postId = url[1].split('#post');
							checkedVal = postId[1];	
							casper.echo('checkedval : ' +checkedVal, 'INFO');
							casper.echo('hrefVal : ' +hrefVal[1], 'INFO');
							this.thenOpen(config.url, function() {
								casper.echo('go to topic listing page', 'INFO');
								this.waitForSelector('a[href^="/post/"]', function success() {
									casper.echo('href : ' +hrefVal[1], 'INFO');
									test.assertExists('a[href^="'+hrefVal[1]+'"]');
									this.click('a[href^="'+hrefVal[1]+'"]');
									this.waitForSelector('span[id^="post_message_"]', function success() {
										this.mouse.move('#ajax_subscription_vars');
										test.assertExists('#firstpid');
										utils.enableorDisableCheckbox('firstpid', true, casper, function(err) {});
										test.assertExists('#moveposts');
										this.click('#moveposts');
										this.waitForSelector('form[name="movePost"]', function success() {
											test.assertExists('form[name="movePost"] input[name="thread_title"]');
											this.sendKeys('form[name="movePost"] input[name="thread_title"]', json.moveTopic.newPostTitle);
											test.assertExists('button[name="submit"]');
											this.click('button[name="submit"]');
											this.waitForSelector('span[id^="post_message_"]', function success() {
												//verify post on category
												this.thenOpen(config.url, function() {
													casper.echo('go to topic listing page', 'INFO');
													this.waitForSelector('a[href="/categories"]', function success() {
														test.assertExists('a[href="/categories"]');
														this.click('a[href="/categories"]');
														this.waitForSelector('.table-responsive ul li', function success() {
															var moveToCategory = json.moveTopic.moveToCategory2;
															//var moveToCategory = 'General';
															var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
															var href = this.getElementAttribute(classVal, "href");
															test.assertExists('a[href="'+href+'"]');
															this.click('a[href="'+href+'"]');
															this.waitForSelector('a[href^="/post/"]', function success() {
																test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
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
											}, function fail(err) {
												casper.echo(err);
											});
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

	/*****Verify move post from the post listing page into the existing topic*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the post listing page into the existing topic', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		this.waitForSelector('a[href^="/post/"]', function success() {
			var classVal = x("//a/span[text()='"+json.moveTopic.topicName+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('a[href="'+href+'"]');
			this.click('a[href="'+href+'"]');
			this.waitForSelector('span[id^="post_message_"]', function success() {
				moveUrl = this.getCurrentUrl();
			}, function fail(err) {});
			//go to post listing page
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
				this.waitForSelector('a[href^="/post/"]', function success() {
					test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
					var classVal = x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists('a[href="'+href+'"]');
					this.click('a[href="'+href+'"]');
					this.waitForSelector('span[id^="post_message_"]', function success() {
						this.mouse.move('#ajax_subscription_vars');
						test.assertExists('#firstpid');
						utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
						this.waitForSelector('#moveposts', function success() {
							test.assertExists('#moveposts');
							this.click('#moveposts');
							this.waitForSelector('input[name="mergethreadurl"]', function success() {
								test.assertExists('#exist_thread');
								this.click('#exist_thread');
								this.sendKeys('input[name="mergethreadurl"]', moveUrl);
								this.click('#move_posts');
								this.waitForSelector('span[id^="post_message_"]', function success() {
									//verify moved post
									this.thenOpen(config.url, function() {
										casper.echo('go to topic listing page', 'INFO');
										this.waitForSelector('a[href="/categories"]', function success() {
											test.assertExists('a[href="/categories"]');
											this.click('a[href="/categories"]');
											this.waitForSelector('.table-responsive ul li', function success() {
												var moveToCategory = json.moveTopic.moveToCategory2;
												//var moveToCategory = 'General';
												var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
												var href = this.getElementAttribute(classVal, "href");
												test.assertExists('a[href="'+href+'"]');
												this.click('a[href="'+href+'"]');
												this.waitForSelector('a[href^="/post/"]', function success() {
													test.assertDoesntExist(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
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
		}, function fail(err) {
			casper.echo(err);
		});
	});

	//*****Verify move post from the search result page in the new topic*****/
	/*casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the search result page in the new topic', 'INFO');
		var checkedVal = "";
		//create new topic
		this.waitForSelector('a[href^="/post/"]', function success() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
				if(!err) {
					casper.echo('go to new topic', 'INFO');
					casper.waitForSelector('#post_submit', function success() {
						this.click('#post_submit');
						this.waitForSelector('span[id^="post_message_"]', function success() {
							var url = this.getCurrentUrl();
							casper.echo('url : ' +url);
							url = url.split('?');
							hrefVal = url[0].split('.com');
							var postId = url[1].split('#post');
							checkedVal = postId[1];	
							casper.echo('checkedval : ' +checkedVal, 'INFO');
							casper.echo('hrefVal : ' +hrefVal[1], 'INFO');
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
			
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
			//go to search page
			this.waitForSelector('#inline_search_box', function() {
				test.assertExists('#inline_search_box');
				this.click('#inline_search_box');
				this.sendKeys('#inline_search_box', 'honey');
				this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
				this.waitForSelector('a[href^="/post/"]', function success() {
					casper.echo('href : ' +hrefVal[1]);
					test.assertExists('a[href^="'+hrefVal[1]+'"]');
					this.click('a[href^="'+hrefVal[1]+'"]');
					this.waitForSelector('span[id^="post_message_"]', function success() {
						test.assertExists('input[value="'+checkedVal+'"]');
						this.click('input[value="'+checkedVal+'"]');
						this.then(function() {
							test.assertExists('#moveposts');
							this.click('#moveposts');
							this.waitForSelector('form[name="movePost"]', function() {
								test.assertExists('form[name="movePost"] input[name="thread_title"]');
								this.sendKeys('input[name="thread_title"]', json.moveTopic.newPostTitle);
								test.assertExists('button[name="submit"]');
								this.click('button[name="submit"]');
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
			}, function fail(err) {
				casper.echo(err);
			});
		});	
			
		//verify post on category
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
			this.waitForSelector('a[href="/categories"]', function success() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.waitForSelector('.table-responsive ul li', function success() {
					var moveToCategory = json.moveTopic.moveToCategory1;
					//var moveToCategory = 'General';
					var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists('a[href="'+href+'"]');
					this.click('a[href="'+href+'"]');
					this.waitForSelector('a[href^="/post/"]', function success() {
						test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
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
			
	});
	
	//*****Verify move post from the search result page in the existing topic*****/
	/*casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the search result page in the existing topic', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		this.waitForSelector('a[href^="/post/"]', function success() {
			var classVal = x("//a/b[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('a[href="'+href+'"]');
			this.click('a[href="'+href+'"]');
			this.waitForSelector('span[id^="post_message_"]', function success() {
				moveUrl = this.getCurrentUrl();
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});

		//go to search page
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
			this.waitForSelector('#inline_search_box', function success() {
				test.assertExists('#inline_search_box');
				this.click('#inline_search_box');
				this.sendKeys('#inline_search_box', json.moveTopic.newPostTitle);
				this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
				this.waitForSelector('a[href^="/post/"]', function success() {
					test.assertExists(x("//a/b[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
					var classVal = x("//a/b[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists('a[href="'+href+'"]');
					this.click('a[href="'+href+'"]');
					this.waitForSelector('span[id^="post_message_"]', function success() {
						var url = this.getCurrentUrl();
						checkedVal = url.split('#post');
						test.assertExists('input[value="'+id[1]+'"]');
						this.click('input[value="'+id[1]+'"]');
						this.waitForSelector('#moveposts', function success() {
							test.assertExists('#moveposts');
							this.click('#moveposts');
							this.waitForSelector('input[name="mergethreadurl"]', function success() {
								test.assertExists('#exist_thread');
								this.click('#exist_thread');
								this.sendKeys('input[name="mergethreadurl"]', moveUrl);
								this.click('#move_posts');
							}, function fail(err) {
								casper.echo(err);
							});
						}, function fail(err) {
							casper.echo(err);
						});
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

		//verify moved post
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
			this.waitForSelector('a[href="/categories"]', function success() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.waitForSelector('.table-responsive ul li', function success() {
					var moveToCategory = json.moveTopic.moveToCategory1;
					//var moveToCategory = 'General';
					var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists('a[href="'+href+'"]');
					this.click('a[href="'+href+'"]');
					this.waitForSelector('a[href^="/post/"]', function success() {
						test.assertDoesntExist(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
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
	});*/


	//Login To Backend URL and enable(All Posts) Approve New Posts
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable(All Posts) Approve New Posts', 'INFO');
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.echo('---------------------------------------------------------------------------');
		//login to backend url(rm)
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to backend', 'INFO');
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
						this.sendKeys('select option[value="99"]', 'All posts');
					}, function fail(err) {
						casper.echo(err);
					});
					this.waitForSelector('button[type="submit"]', function success() {
						test.assertExists('button[type="submit"]');
						this.click('button[type="submit"]');
						this.wait(1000);
					}, function fail(err) {
						casper.echo(err);
					});
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});
	
	casper.thenOpen(config.url, function() {
		casper.echo('go to forum url page', 'INFO');
		//Logout From App
		casper.waitForSelector('a[href^="/post/"]', function() {
			forumLogin.logoutFromApp(casper, function(err) {
				if(!err) {
					casper.echo('Successfully logout from application', 'INFO');
				}
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
			if(!err) {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
			}
		});
	});
	
	/*****Verify move post from the approval queue into the new topic (By click on approval queue)*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the approval queue into the new topic (By click on approval queue)', 'INFO');
		var checkedVal = "";
		//create new topic
		this.waitForSelector('a[href="/post/printadd"]', function success() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
				if(!err) {
					casper.echo('go to new topic', 'INFO');
					casper.waitForSelector('#post_submit', function success() {
						this.click('#post_submit');
						this.wait(3000);
					}, function fail(err) {
						casper.echo(err);
					});
				}
			});
			//Logout From App
			casper.then(function() {
				forumLogin.logoutFromApp(casper, function(err) {
					if(!err) {
						casper.echo('Successfully logout from application', 'INFO');
					}
				});
			});

			//Login To App
			casper.then(function() {
				forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function(err) {
					if(!err) {
						casper.echo('Admin has been successfuly login to application', 'INFO');
					}
				});
			});

			casper.thenOpen(config.url, function() {
				casper.echo('go to forum url page', 'INFO');
				//go to category page
				this.waitForSelector('a[href="/categories"]', function success() {
					test.assertExists('a[href="/categories"]');
					this.click('a[href="/categories"]');		
				});
			}, function fail(err) {
				casper.echo(err);
			});

			//go to page approval page
			casper.waitForSelector('.table-responsive ul li', function success() {
				test.assertExists('a[href="/?action=approvalqueue"]');
				this.click('a[href="/?action=approvalqueue"]');
				this.waitForSelector('a[href^="/post/"]', function success() {
					var topicTitle = json['newTopic'].ValidCredential.title;
					var classVal = x("//a[text()='"+topicTitle+"']"); 
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists('a[href="'+href+'"]');
					this.click('a[href="'+href+'"]');
					this.waitForSelector('span[id^="post_message_"]', function() {
						this.mouse.move('#ajax_subscription_vars');
						test.assertExists('#firstpid');
						utils.enableorDisableCheckbox('firstpid', true, casper, function(err) {});			
						this.waitForSelector('#moveposts', function success() {
							test.assertExists('#moveposts');
							this.click('#moveposts');
							this.waitForSelector('form[name="movePost"]', function success() {
								test.assertExists('input[name="thread_title"]');
								this.sendKeys('input[name="thread_title"]', json.moveTopic.newPostTitle);
								test.assertExists('button[name="submit"]');
								this.click('button[name="submit"]');
								//verify post on category
								this.waitForSelector('a[href^="/post/"]', function success() {
									casper.echo('go to topic listing page', 'INFO');
									test.assertExists('a[href="/categories"]');
									this.click('a[href="/categories"]');
									this.waitForSelector('.table-responsive ul li', function success() {
										var moveToCategory = json.moveTopic.moveToCategory2;
										//var moveToCategory = 'General';
										var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
										var href = this.getElementAttribute(classVal, "href");
										test.assertExists('a[href="'+href+'"]');
										this.click('a[href="'+href+'"]');
										this.waitForSelector('a[href^="/?forum="]', function() {
											this.click('a[href^="/?forum="]');
											this.waitForSelector('a[href^="/post/"]', function success() {
												test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']"));
												casper.echo('move topic is verified successfully', 'INFO');
											}, function fail(err) {
												casper.echo(err);
											});
										});
									}, function fail(err){
										casper.echo(err);
									});		
								}, function fail(err) {
									casper.echo(err);
								});
							}, function fail(err) {
								casper.echo(err);
							});
						}, function fail(err) {
							casper.echo(err);
						});
					}, function fail(err) {
						casper.echo(err);
					});
				}, function fail(err) {
					casper.echo(err);
				});
			}, function fail(err) {
				casper.echo(err);
			});
			
			//delete newly created topic
			this.then(function() {
				var classVal = x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.waitForSelector('span[id^="post_message_"]', function() {
					this.mouse.move('#ajax_subscription_vars');
					test.assertExists('#firstpid');
					utils.enableorDisableCheckbox('firstpid', true, casper, function(err) {});
					this.waitForSelector('#deleteposts', function success() {
						test.assertExists('#deleteposts');
						this.click('#deleteposts');
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

	/*****Verify move post from the approval queue of that topic into the existing topic*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the approval queue of that topic into the existing topic', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		this.waitForSelector('a[href^="/post/"]', function() {
			var classVal = x("//a/span[text()='"+json.moveTopic.topicName+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('a[href="'+href+'"]');
			this.click('a[href="'+href+'"]');
			this.waitForSelector('span[id^="post_message_"]', function() {
				moveUrl = this.getCurrentUrl();
			}, function fail(err) {});
		}, function fail(err) {
			casper.echo(err);
		});

		//Logout From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function(err) {
				if(!err) {
					casper.echo('Successfully logout from application', 'INFO');
				}
			});
		});

		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
				if(!err) {
					casper.echo('User has been successfuly login to application with register user', 'INFO');
				}
			});
		});
		
		//go to config url
		this.thenOpen(config.url, function() {
			casper.echo('go to forum url', 'INFO');
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopic(json.moveTopic.ValidCredential, casper, function(err) {
					if(!err) {
						casper.echo('go to new topic', 'INFO');
						casper.waitForSelector('#post_submit', function success() {
							this.click('#post_submit');
						}, function fail(err) {
							casper.echo(err);
						});
						casper.wait(3000);
					}
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

		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function(err) {
				if(!err) {
					casper.echo('Admin has been successfuly login to application', 'INFO');
				}
			});
		});

		//go to post listing page
		this.thenOpen(config.url, function() {
			this.waitForSelector('a[href="/categories"]', function success() {
				casper.echo('go to topic listing page', 'INFO');
				//go to category page
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');

			}, function fail(err) {
				casper.echo(err);
			});
			//go to page approval page
			casper.waitForSelector('.table-responsive ul li', function success() {
				test.assertExists('a[href="/?action=approvalqueue"]');
				this.click('a[href="/?action=approvalqueue"]');
				this.waitForSelector('a[href^="/post/"]', function success() {
					test.assertExists(x("//a[text()='"+json.moveTopic.ValidCredential.title+"']"));
					var classVal = x("//a[text()='"+json.moveTopic.ValidCredential.title+"']");
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists('a[href="'+href+'"]');
					this.click('a[href="'+href+'"]');
					this.waitForSelector('span[id^="post_message_"]', function() {
						this.mouse.move('#ajax_subscription_vars');
						test.assertExists('#firstpid');
						utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
						this.waitForSelector('#moveposts', function success() {
							test.assertExists('#moveposts');
							this.click('#moveposts');
							this.waitForSelector('form[name="movePost"]', function success() {
								test.assertExists('#exist_thread');
								this.click('#exist_thread');
								this.sendKeys('input[name="mergethreadurl"]', moveUrl);
								test.assertExists('button[name="submit"]');
								this.click('button[name="submit"]');
								casper.echo('topic moved successfully', 'INFO');
								//verify moved post
								this.waitForSelector('a[href^="/post/"]', function success() {
									casper.echo('go to topic listing page', 'INFO');
									test.assertExists('a[href="/categories"]');
									this.click('a[href="/categories"]');
									this.waitForSelector('.table-responsive ul li', function success() {
										var moveToCategory = json.moveTopic.moveToCategory2;
										//var moveToCategory = 'General';
										var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
										var href = this.getElementAttribute(classVal, "href");
										test.assertExists('a[href="'+href+'"]');
										this.click('a[href="'+href+'"]');
										this.waitForSelector('a[href^="/?forum="]', function success() {
											try {
												this.click('#topics_tab');
											} catch(e) {
											}
											this.waitForSelector('a[href^="/post/"]', function success() {												
												test.assertExists(x("//a/span[text()='"+json.moveTopic.ValidCredential.title+"']"));
												casper.echo('successfully verified move topic', 'INFO');
											}, function fail(err) {
												casper.echo(err);
											});
										}, function fail(err) {});
									}, function fail(err) {
										casper.echo(err);
									});		
								}, function fail(err) {});
							}, function fail(err) {
								casper.echo(err);
							});
						}, function fail(err) {
							casper.echo(err);
						});
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
	});

	/*****Verify move post from the approval queue of that topic into the new topic*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the approval queue of that topic into the new topic', 'INFO');
		var checkedVal = "";
		//create new topic
		this.waitForSelector('a[href="/post/printadd"]', function success() {
			gotoNewTopic(json.moveTopic.ValidCredential, casper, function(err) {
				if(!err) {
					casper.echo('go to new topic', 'INFO');
					casper.waitForSelector('#post_submit', function success() {
						this.click('#post_submit');
					}, function fail(err) {
						casper.echo(err);
					});
				}
			});
		}, function fail(err) {
			casper.echo(err);
		});

		//Logout From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function(err) {
				if(!err) {
					casper.echo('Successfully logout from application', 'INFO');
				}
			});
		});

		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
				if(!err) {
					casper.echo('User has been successfuly login to application with register user', 'INFO');
				}
			});
		});

			
		casper.thenOpen(config.url, function() {
			casper.echo('go to forum url page', 'INFO');
			this.waitForSelector('a[href^="/post/"]', function success() {
				var classVal = x("//a/span[text()='"+json.moveTopic.ValidCredential.title+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				//Reply topic with valid credential
				casper.waitForSelector('span[id^="post_message_"]', function() {
					replyTopic(json.replyTopic.ValidCredential.content, casper, function(err) {});
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
					casper.echo('Successfully logout from application', 'INFO');
				}
			});
		});

		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function(err) {
				if(!err) {
					casper.echo('Admin has been successfuly login to application', 'INFO');
				}
			});
		});
			
		//go to forum url
		casper.thenOpen(config.url, function() {
			casper.echo('go to forum url page', 'INFO');
			//go to category page
			this.waitForSelector('a[href="/categories"]', function success() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				//go to page approval page
				casper.waitForSelector('.table-responsive ul li', function success() {
					this.click('a[href="/?action=approvalqueue"]');
					this.waitForSelector('a[href^="/post/"]', function success() {
						var topicTitle = json.moveTopic.ValidCredential.title;
						var classVal = x("//a[text()='"+topicTitle+"']"); 
						var href = this.getElementAttribute(classVal, "href");
						test.assertExists('a[href="'+href+'"]');
						this.click('a[href="'+href+'"]');
						this.waitForSelector('span[id^="post_message_"]', function success() {
							this.mouse.move('#ajax_subscription_vars');
							test.assertExists('#firstpid');
							utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
							this.waitForSelector('#moveposts', function() {
								test.assertExists('#moveposts');
								this.click('#moveposts');
							}, function fail(err) {});
							this.waitForSelector('form[name="movePost"]', function success() {
								test.assertExists('input[name="thread_title"]');
								this.sendKeys('input[name="thread_title"]', json.moveTopic.newPostTitle);
								test.assertExists('button[name="submit"]');
								this.click('button[name="submit"]');
								//verify post on category
								this.waitForSelector('a[href^="/post/"]', function success() {
									casper.echo('go to topic listing page', 'INFO');
									test.assertExists('a[href="/categories"]');
									this.click('a[href="/categories"]');
									this.waitForSelector('.table-responsive ul li', function success() {
										var moveToCategory = json.moveTopic.moveToCategory2;
										//var moveToCategory = 'General';
										var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
										var href = this.getElementAttribute(classVal, "href");
										test.assertExists('a[href="'+href+'"]');
										this.click('a[href="'+href+'"]');
										this.waitForSelector('a[href^="/post/"]', function success() {
											test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']"));
											casper.echo('move topic is verified successfully', 'INFO');
										}, function fail(err) {
											casper.echo(err);
										});
									}, function fail(err) {
										casper.echo(err);
									});
								}, function fail(err) {});	
							}, function fail(err) {
								casper.echo(err);
							});
						}, function fail(err) {
							casper.echo(err);
						});
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
		
		//delete newly created topic
		this.then(function() {
			var classVal = x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('a[href="'+href+'"]');
			this.click('a[href="'+href+'"]');
			this.waitForSelector('span[id^="post_message_"]', function() {
				this.mouse.move('#ajax_subscription_vars');
				test.assertExists('#firstpid');
				utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
				this.waitForSelector('#deleteposts', function success() {
					test.assertExists('#deleteposts');
					this.click('#deleteposts');
				}, function fail(err) {
					casper.echo(err);
				});
			}, function fail(err) {
				casper.echo(err);
			});
		});
		
	});

	/*****Verify move post from the approval queue into the existing topic (By click on approval queue)*****/
	casper.thenOpen(config.url, function() {
		casper.echo('Verify move post from the approval queue into the existing topic (By click on approval queue)', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		//create new topic
		this.waitForSelector('a[href="/post/printadd"]', function success() {
			gotoNewTopic(json.moveTopic.ValidCredential, casper, function(err) {
				if(!err) {
					casper.echo('go to new topic', 'INFO');
					casper.waitForSelector('#post_submit', function success() {
						this.click('#post_submit');
					}, function fail(err) {
						casper.echo(err);		
					});
				}
			});
		}, function fail(err) {
			casper.echo(err);
		});

		this.thenOpen(config.url, function() {
			casper.capture('new.png');
			casper.echo('go to topic listing page', 'INFO');
			this.waitForSelector('a[href^="/post/"]', function() {
				var classVal = x("//a/span[text()='"+json.moveTopic.topicName+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.waitForSelector('span[id^="post_message_"]', function() {
					moveUrl = this.getCurrentUrl();
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
					casper.echo('Successfully logout from application', 'INFO');
				}
			});
		});

		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(err) {
				if(!err) {
					casper.echo('User has been successfuly login to application with register user', 'INFO');
				}
			});
		});
		
		//go to config url
		this.thenOpen(config.url, function() {
			casper.echo('go to forum url', 'INFO');
			casper.capture('post.png');
			this.waitForSelector('a[href^="/post/"]', function() {
				var classVal = x("//a/span[text()='"+json.moveTopic.ValidCredential.title+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				//Reply topic with valid credential
				casper.waitForSelector('span[id^="post_message_"]', function() {
					replyTopic(json.replyTopic.ValidCredential.content, casper, function(err) {});
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
					casper.echo('Successfully logout from application', 'INFO');
				}
			});
		});

		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function(err) {
				if(!err) {
					casper.echo('Admin has been successfuly login to application', 'INFO');
				}
			});
		});

		//go to post listing page
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
			//go to category page
			this.waitForSelector('a[href="/categories"]', function success() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				//go to page approval page
				casper.waitForSelector('.table-responsive ul li', function success() {
					this.click('a[href="/?action=approvalqueue"]');
					this.waitForSelector('a[href^="/post/"]', function success() {
						test.assertExists(x("//a[text()='"+json.moveTopic.ValidCredential.title+"']"));
						var classVal = x("//a[text()='"+json.moveTopic.ValidCredential.title+"']");
						var href = this.getElementAttribute(classVal, "href");
						test.assertExists('a[href="'+href+'"]');
						this.click('a[href="'+href+'"]');
						this.waitForSelector('span[id^="post_message_"]', function success() {
							this.mouse.move('#ajax_subscription_vars');
							test.assertExists('#firstpid');
							utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
							this.waitForSelector('#moveposts', function success() {
								test.assertExists('#moveposts');
								this.click('#moveposts');
								this.waitForSelector('input[name="mergethreadurl"]', function success() {
									test.assertExists('#exist_thread');
									this.click('#exist_thread');
									this.sendKeys('input[name="mergethreadurl"]', moveUrl);
									this.click('#move_posts');
								}, function fail(err) {
									casper.echo(err);
								});
							}, function fail(err) {
								casper.echo(err);
							});
						}, function fail(err) {
							casper.echo(err);
						});
					}, function fail(err) {
						casper.echo(err);
					});
				}, function fail(err) {

				});		
			}, function fail(err) {
				casper.echo(err);
			});
		});

		//verify moved post
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
			//delete newly created topic
			this.waitForSelector('a[href^="/post/"]', function() {
				var classVal = x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.waitForSelector('span[id^="post_message_"]', function success() {
					this.mouse.move('#ajax_subscription_vars');
					test.assertExists('#firstpid');
					utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
					this.waitForSelector('#deleteposts', function success() {
						test.assertExists('#deleteposts');
						this.click('#deleteposts');
						this.waitForSelector('a[href="/categories"]', function success() {
							test.assertExists('a[href="/categories"]');
							this.click('a[href="/categories"]');
							this.waitForSelector('.table-responsive ul li', function success() {
								var moveToCategory = json.moveTopic.moveToCategory2;
								//var moveToCategory = 'General';
								var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
								var href = this.getElementAttribute(classVal, "href");
								test.assertExists('a[href="'+href+'"]');
								this.click('a[href="'+href+'"]');
								this.waitForSelector('a[href^="/post/"]', function() {
									test.assertDoesntExist(x("//a/span[text()='"+json.moveTopic.ValidCredential.title+"']/parent::a"));
									casper.echo('successfully verified move topic', 'INFO');
								}, function fail(err) {
									casper.echo(err);
								});
							}, function fail(err) {
								casper.echo(err);
							});		
						}, function fail(err) {
							casper.echo(err);
						});
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
				this.sendKeys('select option[value="0"]', 'Disabled');
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
		
	//go to forum url
	casper.thenOpen(config.url, function() {
		casper.echo('go to forum url', 'INFO');
		//Logout From App
		this.waitForSelector('a[href^="/post/"]', function success() {
			forumLogin.logoutFromApp(casper, function(err) {
				if(!err) {
					casper.echo('Successfully logout from application', 'INFO');
				}
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	//return callback();
};

/************************************PRIVATE METHODS***********************************/

var selectTopic = function(topicVal, eleStatus, driver, callback) {
	var href = driver.getElementAttribute(topicVal, "href");
	casper.echo('href : ' +href, 'INFO');
	href = href.split('-');
	var id = href[1].split('?');
	driver.test.assertExists('input[value="'+id[0]+'"]');
	driver.click('input[value="'+id[0]+'"]');
	driver.then(function() {
		try {
			this.test.assertExists('#' +eleStatus);
			casper.echo('---------------------------------------------------------------------------');
			this.click('#' +eleStatus);
		} catch(err) {
			this.test.assertDoesntExist('#' +eleStatus);
			casper.echo('topic can not be move go to user group permission to enable move own topic check box', 'INFO');
		}
	});
	return callback(null);
};

//method for create new topic
var gotoNewTopic = function(data, driver, callback) {
	//driver.click('#links-nav');
	//driver.click('#latest_topics_show');
	driver.click('a[href^="/post/printadd"]');
	
	driver.waitForSelector('#message_ifr', function success() {
         	 this.sendKeys('input[name="subject"]', data.title, {reset:true});
		 this.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
	 		this.sendKeys('#tinymce', data.content);
		});	
		
		try {
			this.click('#all_forums_dropdown');
			var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
			this.fill('form[name="PostTopic"]',{
				'forum' : val.trim()
			},false);
		} catch(err) {

		}
		
	}, function fail(err) {
		casper.echo(err);
	});

	return callback(null);
};

//method for delete newly created topic
var deleteNewlyCreatedTopic = function(href, eleStatus, driver, callback){
	casper.echo('@@@@@@@@@@@@@@@ href : ' +href, 'INFO');
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


// method for reply topic on any post

var replyTopic = function(content, driver, callback) { 
	
	try{
		driver.click('form[name="posts"] h4 a');
	} catch(err) {

	}	
	
	driver.waitForSelector('#message', function success() {
		this.sendKeys('#message', content);
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

//verify message after update users group setting
var verifyPermissionSettingMsg = function(driver, callback) {
	var msg  = driver.fetchText('p[align="center"] font.heading');
	driver.test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and message verified');
	casper.echo('---------------------------------------------------------------------------');
	return callback(null);
}; 

