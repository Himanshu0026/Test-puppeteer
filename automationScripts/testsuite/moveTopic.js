/****This script is dedicated for Admin to move topic/post on the forum. It covers testing of move topic/post with all defined validations****/

"use strict";

var utils = require('./utils.js');
var json = require('../testdata/topic.json');
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var config = require('../../config/config.json');

var moveTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'moveTopic/';

moveTopic.moveTopicFeature = function(casper, test, x, callback) {
	var hrefVal = "";
	//start from forum url
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		//this.emit('title');
	});
		
	//Login To App (rm)
	/*casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
			casper.echo('Admin has been successfuly login to application', 'INFO');
		});
		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.then(function() {
			this.capture(screenShotsDir+ 'login.png');
		});
	});*/

	/*****(1)Verify move topic from the topic listing page under category *****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page under category ', 'INFO');
		test.assertExists('a[href="/categories"]');
		this.click('a[href="/categories"]');
		this.then(function() {
			this.capture(screenShotsDir+ 'categoryPage.png');				
		});
		casper.then(function() {
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
				this.then(function() {
					json.moveTopic.moveToCategory2 = val[0];
					casper.echo('******************************************** : ' +json.moveTopic.moveToCategory2); 
					var moveToCategory = json.moveTopic.moveToCategory2;
					var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
					var href = this.getElementAttribute(classVal, "href");
		
					test.assertExists('a[href="'+href+'"]');
					this.click('a[href="'+href+'"]');
					this.then(function() {
						this.capture(screenShotsDir+ 'clickCategory.png');
					});
				});
				
				this.then(function() {
					var topicTitle = json.moveTopic.topicName;
					json.moveTopic.moveToCategory1 = val[1];
					var moveToCategory = json.moveTopic.moveToCategory1;
					this.then(function() {
						var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a");
						selectTopic(classVal, 'move', casper, function() {});
					});
					this.then(function() {
						test.assertExists('#move_threads_dropdown');
						this.click('#move_threads_dropdown');
						this.fill('form[name="admindd"]',{
							'moveto' : moveToCategory
						},false);
						test.assertExists('button[name="submit"]');
						this.click('button[name="submit"]');
						this.then(function() {
							this.capture(screenShotsDir+ 'moved.png');				
						});
					});
				});
				//verify moved topic
				this.then(function() {
					this.thenOpen(config.url, function() {
						casper.echo('hit on url : '+config.url, 'INFO');
					});
					this.then(function() {
						test.assertExists('a[href="/categories"]');
						this.click('a[href="/categories"]');
						this.then(function() {
							this.capture(screenShotsDir+ 'categoryPage.png');				
						});
					});
					this.then(function() {
						var moveToCategory = json.moveTopic.moveToCategory1;
						var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
						var href = this.getElementAttribute(classVal, "href");
						test.assertExists('a[href="'+href+'"]');
						this.click('a[href="'+href+'"]');
						this.then(function() {
							this.capture(screenShotsDir+ 'clickCategory.png');
						});
					});
					this.then(function() {
						var topicTitle = json.moveTopic.topicName;
						test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
						casper.echo('move topic is verified', 'INFO');
					});
				});
			} else {
				casper.echo('you can not perform move topic feature');
			}
		});
	});

	/*****(2)Verify move topic from the topic listing page[Home Page]*****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page[Home Page]', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory2;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
			
		});
		//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");

				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});

			});
			this.then(function() {
				var topicTitle = json.moveTopic.topicName;
				test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']/parent::a"));
				casper.echo('move topic is verified', 'INFO');
			});
		});
	});

	/*****(3)Verify move topic from the latest topic page *****/
	/*casper.then(function() {
		casper.echo('Verify move topic from the latest topic page ', 'INFO');
		this.then(function() {
			test.assertExists('#links-nav');
			this.click('#links-nav');
			test.assertExists('a[href="/latest"]');
			this.click('a[href="/latest"]');
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory1;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
		});
		//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});
			this.then(function() {
				var topicTitle = json.moveTopic.topicName;
				test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
					casper.echo('move topic is verified', 'INFO');
				});
		});
	});

	/*****(4)Verify move topic from the search result page  *****/
	/*casper.then(function() {
		casper.echo('Verify move topic from the search result page ', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			test.assertExists('#inline_search_box');
			this.click('#inline_search_box');
			this.sendKeys('#inline_search_box', json.moveTopic.topicName);
			this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
		});
		this.then(function() {
			this.capture(screenShotsDir+ 'search.png');				
		});

		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory2;
			var classVal = x("//a/b[text()='"+topicTitle+"']/parent::a");
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
			
		});
		//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {

					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");

				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});

			});
			this.then(function() {
				var topicTitle = json.moveTopic.topicName;
				test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']/parent::a"));
				casper.echo('move topic is verified', 'INFO');
			});
		});
	});*/

	/*****Verify move topic from the topic listing page under sub category *****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page under sub category ', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page ', 'INFO');
		});
		this.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'categoryPage.png');				
			});
		});
		this.then(function() {
			if(this.exists(x('//h3/span[@class="subforum-list"]/a'))) {
				var classVal = x('//h3/span[@class="subforum-list"]/a');
				var href = this.getElementAttribute(classVal, "href");
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'subCategoryPage.png');				
				});
		
				//create new topic
				this.then(function() {
					this.then(function() {
						gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
							casper.echo('go to new topic', 'INFO');
						});
					});
					this.then(function() {
						this.click('#post_submit');
					});
					this.then(function() {
						this.capture(screenShotsDir+ 'postPage.png');
					});
					this.then(function() {
						var url = this.getCurrentUrl();
						casper.echo('url : ' +url);
						url = url.split('#');
						hrefVal = url[0].split('.com');
						casper.echo('#############1111 hrefVal : ' +hrefVal);
					});
					this.waitForSelector('#backArrowPost', function(){
						this.click('#backArrowPost');
					});
				});
				this.then(function() {
					var moveToCategory = json.moveTopic.moveToCategory2;
					var topicTitle = json['newTopic'].ValidCredential.title;
					var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
					selectTopic(classVal, 'move', casper, function() {});
					this.then(function() {
						test.assertExists('#move_threads_dropdown');
						this.click('#move_threads_dropdown');
						this.fill('form[name="admindd"]',{
							'moveto' : moveToCategory
						},false);
						test.assertExists('button[name="submit"]');
						this.click('button[name="submit"]');
						this.then(function() {
							this.capture(screenShotsDir+ 'moved.png');				
						});
					});
				});

				//verify moved topic
				this.then(function() {
					this.thenOpen(config.url, function() {
						casper.echo('hit on url : '+config.url, 'INFO');
					});
					this.then(function() {
						test.assertExists('a[href="/categories"]');
						this.click('a[href="/categories"]');
						this.then(function() {
							this.capture(screenShotsDir+ 'categoryPage.png');				
						});
					});
					this.then(function() {
						var moveToCategory = json.moveTopic.moveToCategory2;
						var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
						var href = this.getElementAttribute(classVal, "href");

						test.assertExists('a[href="'+href+'"]');
						this.click('a[href="'+href+'"]');
						this.then(function() {
							this.capture(screenShotsDir+ 'clickCategory.png');
						});

					});
					this.then(function() {
						var topicTitle = json['newTopic'].ValidCredential.title;
						test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
						casper.echo('move topic is verified', 'INFO');
					});
				});

			} else {
				casper.echo('there is no any sub category');
			}
		});
	});

	/*****Verify move topic from the profile page *****/
	casper.then(function() {
		casper.echo('Verify move topic from the profile page ', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			test.assertExists('li.user-panel .dropdown-toggle');
			this.click('li.user-panel .dropdown-toggle');
			test.assertExists('a[href^="/profile/"]');
			this.click('a[href^="/profile/"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'profilePage.png');
			});
			this.then(function() {
				test.assertExists('#Topics_Started');
				this.click('#Topics_Started');
				this.then(function() {
					this.capture(screenShotsDir+ 'startedTopic.png');
				});
			
			});
		});
		this.then(function() {
			var topicTitle = json['newTopic'].ValidCredential.title;
			var moveToCategory = json.moveTopic.moveToCategory2;
			var classVal = x("//a[text()='"+topicTitle+"']");
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
			
		});
		//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {

					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");

				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});

			});
			this.then(function() {
				var topicTitle = json['newTopic'].ValidCredential.title;
				test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']/parent::a"));
				casper.echo('move topic is verified', 'INFO');
			});
			
		});
		//delete newely created topic
		casper.then(function() {
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to delete newely created topic by admin to verify move topic from sub category and profile page ', 'INFO');
			});
			this.then(function() { 
				deleteNewlyCreatedTopic(hrefVal[1], 'delete', casper, function() {
					casper.echo('newely created topic is deleted ', 'INFO');		
				});
			});
		});
	});

	//go to backend url
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable move topic checkbox', 'INFO');
		this.then(function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');		
		});
	});
		
	//login to backend url (rm)
	/*(casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('User has been successfuly login to backend', 'INFO');
		});
	});*/

	//go to user permission
	casper.then(function() {
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
			casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
			casper.then(function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});
		});
	});	

	//click on checkbox
	casper.then(function() {
		utils.enableorDisableCheckbox('move_own_threads', false, casper, function() {
			casper.echo("move own Tpoic checkbox has been disabled", 'INFO');
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
		//Getting Screenshot After Change permission
		casper.then(function() {
			this.capture(screenShotsDir+'afterChangePermission.png');
		});	
	});

	//go to forum url	
	casper.thenOpen(config.url, function() {
		casper.echo('hit on url : '+config.url, 'INFO');
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

	/*****Verify move topic from the latest topic page (own topic for registered user when disabled "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the latest topic page (own topic for registered user when disabled "move topic" permission)', 'INFO');
		this.then(function() {
			test.assertExists('#links-nav');
			this.click('#links-nav');
			test.assertExists('a[href="/latest"]');
			this.click('a[href="/latest"]');
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function() {});
		});
	});

	/*****Verify move topic from the topic listing page[Home Page] for (own post for registered user when Disabled "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page[Home Page] for (own post for registered user when Disabled "move topic" permission)', 'INFO');
		this.thenOpen(config.url,function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function() {});
		});
	});

	
	/*****Verify move topic from the topic listing page under sub category (own post for registered user when disable "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page under sub category (own post for registered user when disable "move topic" permission)', 'INFO');
		this.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'categoryPage.png');				
			});
		});
		this.then(function() {
			if(this.exists(x('//h3/span[@class="subforum-list"]/a'))) {
				var classVal = x('//h3/span[@class="subforum-list"]/a');
				var href = this.getElementAttribute(classVal, "href");
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'subCategoryPage.png');				
				});
				//create new topic
				this.then(function() {
					gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
						casper.echo('go to new topic', 'INFO');
					});
					this.then(function() {
						this.click('#post_submit');
					});
					this.then(function() {
						this.capture(screenShotsDir+ 'postPage.png');
					});
					this.then(function() {
						var url = this.getCurrentUrl();
						casper.echo('url : ' +url);
						url = url.split('#');
						hrefVal = url[0].split('.com');
					});
					this.waitForSelector('#backArrowPost', function(){
						this.click('#backArrowPost');
					});
				});
				this.then(function() {
					var topicTitle = json['newTopic'].ValidCredential.title;
					var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
					selectTopic(classVal, 'move', casper, function() {});
				});
			} else {
				casper.echo('there is no any sub category');
			}
		});
	});

	/*****Verify move topic from the topic listing page under category (own post for registered user when Disable "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page under category (own post for registered user when Disable "move topic" permission)', 'INFO');
		this.thenOpen(config.url,function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function() {});
		});
	});

	/*****Verify move topic from the profile page (own post for registered user when Disable "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the profile page (own post for registered user when Disable "move topic" permission)', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			test.assertExists('li.user-panel .dropdown-toggle');
			this.click('li.user-panel .dropdown-toggle');
			test.assertExists('a[href^="/profile/"]');
			this.click('a[href^="/profile/"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'profilePage.png');
			});
			this.then(function() {
				test.assertExists('#Topics_Started');
				this.click('#Topics_Started');
				this.then(function() {
					this.capture(screenShotsDir+ 'startedTopic.png');
				});
			
			});
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var classVal = x("//a[text()='"+topicTitle+"']");
			selectTopic(classVal, 'move', casper, function() {});
		});
	});
	

	//go to backend url
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable move topic checkbox', 'INFO');
		this.then(function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');		
		});
	});
		
	//go to user permission
	casper.then(function() {
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
			casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
			casper.then(function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});
		});
	});	

	//click on checkbox
	casper.then(function() {
		utils.enableorDisableCheckbox('move_own_threads', true, casper, function() {
			casper.echo("move own Tpoic checkbox has been enable", 'INFO');
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
	
	//go to forum url	
	casper.thenOpen(config.url, function() {
		casper.echo('hit on url : '+config.url, 'INFO');
	});
	
	/*****(5)Verify move topic from the latest topic page (own topic for registered user when enabled "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the latest topic page (own topic for registered user when enabled "move topic" permission)', 'INFO');
		this.then(function() {
			test.assertExists('#links-nav');
			this.click('#links-nav');
			test.assertExists('a[href="/latest"]');
			this.click('a[href="/latest"]');
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory1;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
			
		});
		//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");

				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});

			});
			this.then(function() {
				var topicTitle = json.moveTopic.topicName;
				test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
				casper.echo('move topic is verified', 'INFO');
			});
		});
	});

	/*****(6)Verify move topic from the topic listing page[Home Page] for (own post for registered user when enabled "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page[Home Page] for (own post for registered user when enabled "move topic" permission)', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory2;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a");
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
			
		});
		//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {

					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");

				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});

			});
			this.then(function() {
				var topicTitle = json.moveTopic.topicName;
				test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']/parent::a"));
				casper.echo('move topic is verified', 'INFO');
			});
		});
	});

	/*****(7)Verify move topic from the topic listing page under category (own post for registered user when enable "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page under category (own post for registered user when enable "move topic" permission)', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('hit on url : '+config.url, 'INFO');
		});
		this.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'categoryPage.png');				
			});
		});
		this.then(function() {
			var moveToCategory = json.moveTopic.moveToCategory2;
			var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('a[href="'+href+'"]');
			this.click('a[href="'+href+'"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'clickCategory.png');
			});
		});
				
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory1;
			var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
		});
				//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});
			this.then(function() {
				var topicTitle = json.moveTopic.topicName;
				test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
				casper.echo('move topic is verified', 'INFO');
			});
		});
	});
	
	/*****(8)Verify move topic from the profile page (own post for registered user when enable "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the profile page (own post for registered user when enable "move topic" permission)', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			test.assertExists('li.user-panel .dropdown-toggle');
			this.click('li.user-panel .dropdown-toggle');
			test.assertExists('a[href^="/profile/"]');
			this.click('a[href^="/profile/"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'profilePage.png');
			});
			this.then(function() {
				test.assertExists('#Topics_Started');
				this.click('#Topics_Started');
				this.then(function() {
					this.capture(screenShotsDir+ 'startedTopic.png');
				});
			
			});
		});
		this.then(function() {
			var topicTitle = json.moveTopic.topicName;
			var moveToCategory = json.moveTopic.moveToCategory2;
			var classVal = x("//a[text()='"+topicTitle+"']");
			selectTopic(classVal, 'move', casper, function() {});
			this.then(function() {
				test.assertExists('#move_threads_dropdown');
				this.click('#move_threads_dropdown');
				this.fill('form[name="admindd"]',{
					'moveto' : moveToCategory
				},false);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'moved.png');				
				});
			});
			
		});
		//verify moved topic
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('hit on url : '+config.url, 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {

					this.capture(screenShotsDir+ 'categoryPage.png');				
				});
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");

				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});

			});
			this.then(function() {
				var topicTitle = json.moveTopic.topicName;
				test.assertDoesntExist(x("//a/span[text()='"+topicTitle+"']/parent::a"));
				casper.echo('move topic is verified', 'INFO');
			});
			
		});
	});

	/*****Verify move topic from the topic listing page under sub category (own post for registered user when enable "move topic" permission)*****/
	casper.then(function() {
		casper.echo('Verify move topic from the topic listing page under sub category (own post for registered user when enable "move topic" permission)', 'INFO');
		this.then(function() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'categoryPage.png');				
			});
		});
		this.then(function() {
			if(this.exists(x('//h3/span[@class="subforum-list"]/a'))) {
				var classVal = x('//h3/span[@class="subforum-list"]/a');
				var href = this.getElementAttribute(classVal, "href");
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'subCategoryPage.png');				
				});
				this.then(function() {
					var moveToCategory = json.moveTopic.moveToCategory2;
					var topicTitle = json['newTopic'].ValidCredential.title;
					var classVal = x("//a/span[text()='"+topicTitle+"']/parent::a"); 
					selectTopic(classVal, 'move', casper, function() {});
					this.then(function() {
						test.assertExists('#move_threads_dropdown');
						this.click('#move_threads_dropdown');
						this.fill('form[name="admindd"]',{
							'moveto' : moveToCategory
						},false);
						test.assertExists('button[name="submit"]');
						this.click('button[name="submit"]');
						this.then(function() {
							this.capture(screenShotsDir+ 'moved.png');				
						});
					});
				});
				//verify moved topic
				this.then(function() {
					this.thenOpen(config.url, function() {
						casper.echo('hit on url : '+config.url, 'INFO');
					});
					this.then(function() {
						test.assertExists('a[href="/categories"]');
						this.click('a[href="/categories"]');
						this.then(function() {
							this.capture(screenShotsDir+ 'categoryPage.png');				
						});
					});
					this.then(function() {
						var moveToCategory = json.moveTopic.moveToCategory2;
						var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
						var href = this.getElementAttribute(classVal, "href");

						test.assertExists('a[href="'+href+'"]');
						this.click('a[href="'+href+'"]');
						this.then(function() {
							this.capture(screenShotsDir+ 'clickCategory.png');
						});

					});
					this.then(function() {
						var topicTitle = json['newTopic'].ValidCredential.title;
						test.assertExists(x("//a/span[text()='"+topicTitle+"']/parent::a"));
						casper.echo('move topic is verified', 'INFO');
					});
				});

				//delete newely created topic
				casper.then(function() {
					casper.thenOpen(config.url, function() {
						casper.echo('go to topic listing page to delete newely created topic ', 'INFO');
					});
					this.then(function() { 
						deleteNewlyCreatedTopic(hrefVal[1], 'delete', casper, function() {
							casper.echo('newely created topic is deleted ', 'INFO');		
						});
					});
				});
			} else {
				casper.echo('there is no any sub category');
			}
		});
	});

	//test cases for unregistered user/guest user
	casper.then(function() {
		casper.echo('test cases for unregistered user/guest user', 'INFO');
		//Logout From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Logout' Link
		casper.then(function() {
			this.capture(screenShotsDir+ 'logout.png');
		});	
	});

	/*****Verify move topic from the latest topic page *****/
	casper.then(function() {
		casper.echo('Verify move topic from the latest topic page ', 'INFO');
		this.then(function() {
			test.assertExists('#links-nav');
			this.click('#links-nav');
			test.assertExists('a[href="/latest"]');
			this.click('a[href="/latest"]');
		});
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
	});
		
	/*****Verify move topic from the post listing page *****/
	casper.then(function() {
		casper.echo('Verify move topic from the post listing page ', 'INFO');
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
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
	});
	
	//test cases for move post.
	casper.then(function() {
		casper.echo('test cases for move post.', 'INFO');
		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
				casper.echo('Admin has been successfuly login to application', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.then(function() {
			this.capture(screenShotsDir+ 'login.png');
		});
	});

	/*****Verify move post from the profile page into the new topic*****/
	casper.then(function() {
		casper.echo('Verify move post from the profile page into the new topic', 'INFO');
		var checkedVal = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		//create new topic
		this.then(function() {
			this.then(function() {
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
					casper.echo('go to new topic', 'INFO');
				});
			});

			this.then(function() {
				this.click('#post_submit');
			});

			this.then(function() {
				this.capture(screenShotsDir+ 'postPage.png');
			});
			this.then(function() {
				var url = this.getCurrentUrl();
				casper.echo('url : ' +url);
				url = url.split('?');
				hrefVal = url[0].split('.com');
				var postId = url[1].split('#post');
				checkedVal = postId[1];	
				casper.echo('checkedval : ' +checkedVal, 'INFO');
				casper.echo('hrefVal : ' +hrefVal[1], 'INFO');
			});
			this.then(function() {
				casper.echo('go to profile page', 'INFO');
				test.assertExists('li.user-panel .dropdown-toggle');
				this.click('li.user-panel .dropdown-toggle');
				test.assertExists('a[href^="/profile/"]');
				this.click('a[href^="/profile/"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'profilePage.png');
				});
			});	
			
			
			this.then(function() {
				casper.echo('href : ' +hrefVal[1], 'INFO');
				test.assertExists('a[href^="'+hrefVal[1]+'"]');
				this.click('a[href^="'+hrefVal[1]+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postpage.png');				
				});
			});
			this.then(function() {
				this.mouse.move('#ajax_subscription_vars');
				test.assertExists('#firstpid');
				this.then(function() {
					utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
				});
				this.then(function() {
					test.assertExists('#moveposts');
					this.click('#moveposts');
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'movePage.png');				
				});
			});
			this.then(function() {
				test.assertExists('form[name="movePost"] input[name="thread_title"]');
				this.sendKeys('form[name="movePost"] input[name="thread_title"]', json.moveTopic.newPostTitle);
				test.assertExists('button[name="submit"]');
			});
			this.then(function() {
				this.click('button[name="submit"]');
				this.then(function() {});
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'newTitle.png');				
			});
			
			//verify post on category
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});
			this.then(function() {
				test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
			});
		});
	});

	/*****Verify move post from the profile page into the existing topic*****/
	casper.then(function() {
		casper.echo('Verify move post from the profile page into the existing topic', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			var classVal = x("//a/span[text()='"+json.moveTopic.topicName+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				this.then(function() {
					moveUrl = this.getCurrentUrl();
				});
		});
		//go to profile page
		this.then(function() {
			this.then(function() {
				test.assertExists('li.user-panel .dropdown-toggle');
				this.click('li.user-panel .dropdown-toggle');
				test.assertExists('a[href^="/profile/"]');
				this.click('a[href^="/profile/"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'profilePage.png');
				});
			});
			this.then(function() {
				test.assertExists(x("//a[text()='"+json.moveTopic.newPostTitle+"']"));
				var classVal = x("//a[text()='"+json.moveTopic.newPostTitle+"']");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				
				this.then(function() {
					this.mouse.move('#ajax_subscription_vars');
					test.assertExists('#firstpid');
					this.then(function() {
						utils.enableorDisableCheckbox('firstpid', true, casper, function() {
							casper.capture(screenShotsDir+ '11.png');	
						});
					});
					this.then(function() {
						test.assertExists('#moveposts');
						this.click('#moveposts');
					});
					this.then(function() {
						this.capture(screenShotsDir+ 'movePage.png');				
					});
				});
				this.then(function() {
					test.assertExists('#exist_thread');
					this.click('#exist_thread');
				});
				this.then(function() {
					this.sendKeys('input[name="mergethreadurl"]', moveUrl);
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'fillUrl.png');				
				});
				this.then(function() {
					this.click('#move_posts');
					this.then(function() {
						casper.echo('topic moved successfully', 'INFO');				
					});
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'movePost.png');				
				});
			});

			//verify moved post
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});

			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});

			this.then(function() {
				test.assertDoesntExist(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
			});
		});
	});

	/*****Verify move post from the post listing page into the new topic*****/
	casper.then(function() {
		casper.echo('Verify move post from the post listing page into the new topic', 'INFO');
		var checkedVal = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		//create new topic
		this.then(function() {
			this.then(function() {
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
					casper.echo('go to new topic', 'INFO');
				});
			});			
			this.then(function() {
				this.click('#post_submit');
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'postPage.png');
			});
			this.then(function() {
				var url = this.getCurrentUrl();
				casper.echo('url : ' +url);
				url = url.split('?');
				hrefVal = url[0].split('.com');
				var postId = url[1].split('#post');
				checkedVal = postId[1];	
				casper.echo('checkedval : ' +checkedVal, 'INFO');
				casper.echo('hrefVal : ' +hrefVal[1], 'INFO');
			});
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
				this.then(function() {
					this.capture(screenShotsDir+ 'forumUrl.png');
				});
			});	
			
			this.then(function() {
				casper.echo('href : ' +hrefVal[1], 'INFO');
				test.assertExists('a[href^="'+hrefVal[1]+'"]');
				this.click('a[href^="'+hrefVal[1]+'"]');
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'postpage.png');				
			});

			this.then(function() {
				this.mouse.move('#ajax_subscription_vars');
				test.assertExists('#firstpid');
				this.then(function() {
					utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
				});
				this.then(function() {
					test.assertExists('#moveposts');
					this.click('#moveposts');
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'movePage.png');				
				});
			});
			this.then(function() {
				test.assertExists('form[name="movePost"] input[name="thread_title"]');
				this.sendKeys('form[name="movePost"] input[name="thread_title"]', json.moveTopic.newPostTitle);
				test.assertExists('button[name="submit"]');
			});
			this.then(function() {
				this.click('button[name="submit"]');
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'newTitle.png');				
			});
			
			//verify post on category
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});
			this.then(function() {
				test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
			});
		});
	});

	/*****Verify move post from the post listing page into the existing topic*****/
	casper.then(function() {
		casper.echo('Verify move post from the post listing page into the existing topic', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			var classVal = x("//a/span[text()='"+json.moveTopic.topicName+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				this.then(function() {
					moveUrl = this.getCurrentUrl();
				});
		});
		//go to post listing page
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
				this.then(function() {
					this.capture(screenShotsDir+ 'forumUrl.png');
				});
			});
			this.then(function() {
				test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
				var classVal = x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				
				this.then(function() {
					this.mouse.move('#ajax_subscription_vars');
					test.assertExists('#firstpid');
					this.then(function() {
						utils.enableorDisableCheckbox('firstpid', true, casper, function() {
							casper.capture(screenShotsDir+ '11.png');	
						});
					});
					this.then(function() {
						test.assertExists('#moveposts');
						this.click('#moveposts');
					});
					this.then(function() {
						this.capture(screenShotsDir+ 'movePage.png');				
					});
				});
				this.then(function() {
					test.assertExists('#exist_thread');
					this.click('#exist_thread');
				});
				this.then(function() {
					this.sendKeys('input[name="mergethreadurl"]', moveUrl);
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'fillUrl.png');				
				});
				this.then(function() {
					this.click('#move_posts');
					this.then(function() {
						casper.echo('topic moved successfully', 'INFO');
					});
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'movePost.png');				
				});
			});

			//verify moved post
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});

			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});

			this.then(function() {
				test.assertDoesntExist(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
			});
		});
	});

	///*****Verify move post from the search result page in the new topic*****/
	/*casper.then(function() {
		casper.echo('Verify move post from the search result page in the new topic', 'INFO');
		var checkedVal = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		//create new topic
		this.then(function() {
			this.then(function() {
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
					casper.echo('go to new topic', 'INFO');
				});
			});
			this.then(function() {
				this.click('#post_submit');
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'postPage.png');
			});
			this.then(function() {
				var url = this.getCurrentUrl();
				casper.echo('url : ' +url);
				url = url.split('?');
				hrefVal = url[0].split('.com');
				var postId = url[1].split('#post');
				checkedVal = postId[1];	
				casper.echo('checkedval : ' +checkedVal, 'INFO');
				casper.echo('hrefVal : ' +hrefVal[1], 'INFO');
			});
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});	
			
			//go to search page
			this.then(function() {
				test.assertExists('#inline_search_box');
				this.click('#inline_search_box');
				this.sendKeys('#inline_search_box', 'honey');
				this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
				this.then(function() {
					this.capture(screenShotsDir+ 'search.png');				
				});
			});
			
			this.then(function() {
				casper.echo('href : ' +hrefVal[1]);
				test.assertExists('a[href^="'+hrefVal[1]+'"]');
				this.click('a[href^="'+hrefVal[1]+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postpage.png');				
				});
			});
			this.then(function() {
				test.assertExists('input[value="'+checkedVal+'"]');
				this.click('input[value="'+checkedVal+'"]');
				this.then(function() {
					test.assertExists('#moveposts');
					this.click('#moveposts');
					this.then(function() {
						this.capture(screenShotsDir+ 'movePage.png');				
					});
				});
			});
			this.then(function() {
				test.assertExists('form[name="movePost"] input[name="thread_title"]');
				this.sendKeys('form[name="movePost"] input[name="thread_title"]', json.moveTopic.newPostTitle);
				test.assertExists('button[name="submit"]');
				this.click('button[name="submit"]');
			});
			
			//verify post on category
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});
			this.then(function() {
				test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
			});
		});
	});
	
	///*****Verify move post from the search result page in the existing topic*****/
	/*casper.then(function() {
		casper.echo('Verify move post from the search result page in the existing topic', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			var classVal = x("//a/b[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				this.then(function() {
					moveUrl = this.getCurrentUrl();
				});
				this.thenOpen(config.url, function() {
					casper.echo('go to topic listing page', 'INFO');
				});
		});
		//go to search page
		this.then(function() {
			this.then(function() {
				test.assertExists('#inline_search_box');
				this.click('#inline_search_box');
				this.sendKeys('#inline_search_box', json.moveTopic.newPostTitle);
				this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'search.png');				
			});
			this.then(function() {
				test.assertExists(x("//a/b[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
				var classVal = x("//a/b[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				this.then(function() {
					var url = this.getCurrentUrl();
					checkedVal = url.split('#post');
					test.assertExists('input[value="'+id[1]+'"]');
					this.click('input[value="'+id[1]+'"]');
				});
				
				this.then(function() {
					test.assertExists('#moveposts');
					this.click('#moveposts');
					this.then(function() {
						this.capture(screenShotsDir+ 'movePage.png');				
					});
				});
				this.then(function() {
					test.assertExists('#exist_thread');
					this.click('#exist_thread');
				});
				this.then(function() {
					this.sendKeys('input[name="mergethreadurl"]', moveUrl);
				});
				this.click('#move_posts');
			});

			//verify moved post
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});

			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory1;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});

			this.then(function() {
				test.assertDoesntExist(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
			});
		});
	});*/


	//go to backend url
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable(All Posts) Approve New Posts', 'INFO');
		this.then(function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');		
		});
	});
		
	//login to backend url(rm)
	/*casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('User has been successfuly login to backend', 'INFO');
		});
	});*/
	
	//setting page -> security page
	casper.then(function() {
		test.assertExists('a[data-tooltip-elm="ddSettings"]');
		this.click('a[data-tooltip-elm="ddSettings"]');
		this.then(function() {
			test.assertExists('a[href="/tool/members/mb/settings?tab=Security"]');
			this.click('a[href="/tool/members/mb/settings?tab=Security"]');
		});
		this.then(function() {
			test.assertExists('#post_approval');
			this.click('#post_approval');
			this.sendKeys('select option[value="100"]', 'All posts');
			this.capture(screenShotsDir+ 'fillData.png');
		});
		this.then(function() {
			test.assertExists('button[type="submit"]');
			this.click('button[type="submit"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'saveApproveNewPost.png');
			});
		});
	});

	casper.thenOpen(config.url, function() {
		casper.echo('go to forum url page', 'INFO');
	});

	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully logout from application', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link
	casper.then(function() {
		this.capture(screenShotsDir+ 'logout.png');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.echo('User has been successfuly login to application with register user', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 
	casper.then(function() {
		this.capture(screenShotsDir+ 'login.png');
	});
	
	/*****Verify move post from the approval queue into the new topic (By click on approval queue)*****/
	casper.then(function() {
		casper.echo('Verify move post from the approval queue into the new topic (By click on approval queue)', 'INFO');
		var checkedVal = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		//create new topic
		this.then(function() {
			this.then(function() {
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
					casper.echo('go to new topic', 'INFO');
				});
			});		
			this.then(function() {
				this.click('#post_submit');
				casper.then(function() {
					this.capture(screenShotsDir+ 'ApprovalpostPage.png');
				});
			});
			
			//Logout From App
			casper.then(function() {
				forumLogin.logoutFromApp(casper, function() {
					casper.echo('Successfully logout from application', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});

			//Login To App
			casper.then(function() {
				forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
					casper.echo('Admin has been successfuly login to application', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Log In' Link 
			casper.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});
			casper.thenOpen(config.url, function() {
				casper.echo('go to forum url page', 'INFO');
			});
			
			//go to category page
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			
			//go to page approval page
			this.then(function() {
				test.assertExists('a[href="/?action=approvalqueue"]');
				this.click('a[href="/?action=approvalqueue"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'approvalPage.png');				
				});
			});
			
			this.then(function() {
				var topicTitle = json['newTopic'].ValidCredential.title;
				var classVal = x("//a[text()='"+topicTitle+"']"); 
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');
				});
			});
			
			this.then(function() {
				this.mouse.move('#ajax_subscription_vars');
				test.assertExists('#firstpid');

				this.then(function() {
						utils.enableorDisableCheckbox('firstpid', true, casper, function() {	
					});
				});
				this.then(function() {
					test.assertExists('#moveposts');
					this.click('#moveposts');
				});
				this.then(function() {});
				this.then(function() {
					this.capture(screenShotsDir+ 'movePage.png');				
				});
			});
			
			this.then(function() {
				test.assertExists('form[name="movePost"] input[name="thread_title"]');
				this.sendKeys('form[name="movePost"] input[name="thread_title"]', json.moveTopic.newPostTitle);
				test.assertExists('button[name="submit"]');
			});
			this.then(function() {
				this.click('button[name="submit"]');
				this.then(function() {});
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'newTitle.png');				
			});			
			//verify post on category
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});
			this.then(function() {
				test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
				casper.echo('move topic is verified successfully', 'INFO');
			});

			//delete newly created topic
			this.then(function() {
				var classVal = x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.mouse.move('#ajax_subscription_vars');
					test.assertExists('#firstpid');
					this.then(function() {
						utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
					});
					this.then(function() {
						test.assertExists('#deleteposts');
						this.click('#deleteposts');
					});
					this.then(function() {
						this.capture(screenShotsDir+ 'deleteposts.png');				
					});
				});
			});
		});
	});

	/*****Verify move post from the approval queue of that topic into the existing topic*****/
	casper.then(function() {
		casper.echo('Verify move post from the approval queue of that topic into the existing topic', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			var classVal = x("//a/span[text()='"+json.moveTopic.topicName+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				this.then(function() {
					moveUrl = this.getCurrentUrl();
				});
		});

		//Logout From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Logout' Link
		casper.then(function() {
			this.capture(screenShotsDir+ 'logout.png');
		});

		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.then(function() {
			this.capture(screenShotsDir+ 'login.png');
		});
		
		//go to config url
		this.thenOpen(config.url, function() {
			casper.echo('go to forum url', 'INFO');
		});
		this.then(function() {
			this.then(function() {
				gotoNewTopic(json.moveTopic.ValidCredential, casper, function() {
					casper.echo('go to new topic', 'INFO');
				});
			});
			this.then(function() {
				this.click('#post_submit');
				casper.then(function() {});
			});
			casper.then(function() {
				this.capture(screenShotsDir+ 'postPage.png');
			});
			//Logout From App
			casper.then(function() {
				forumLogin.logoutFromApp(casper, function() {
					casper.echo('Successfully logout from application', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});

			//Login To App
			casper.then(function() {
				forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
					casper.echo('Admin has been successfuly login to application', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Log In' Link 
			casper.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});

		});
		//go to post listing page
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
				this.then(function() {
					this.capture(screenShotsDir+ 'forumUrl.png');
				});
			});

			//go to category page
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			
			//go to page approval page
			this.then(function() {
				test.assertExists('a[href="/?action=approvalqueue"]');
				this.click('a[href="/?action=approvalqueue"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'approvalPage.png');				
				});
			});

			this.then(function() {
				test.assertExists(x("//a[text()='"+json.moveTopic.ValidCredential.title+"']"));
				var classVal = x("//a[text()='"+json.moveTopic.ValidCredential.title+"']");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				
				this.then(function() {
					this.mouse.move('#ajax_subscription_vars');
					test.assertExists('#firstpid');
					this.then(function() {
						utils.enableorDisableCheckbox('firstpid', true, casper, function() {
							casper.capture(screenShotsDir+ '11.png');	
						});
					});
					this.then(function() {
						test.assertExists('#moveposts');
						this.click('#moveposts');
					});
					this.then(function() {
						this.capture(screenShotsDir+ 'movePage.png');				
					});
				});
				this.then(function() {
					test.assertExists('#exist_thread');
					this.click('#exist_thread');
				});
				this.then(function() {
					this.sendKeys('input[name="mergethreadurl"]', moveUrl);
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'fillUrl.png');				
				});
				this.then(function() {
					this.click('#move_posts');
					casper.echo('topic moved successfully', 'INFO');
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'movePost.png');				
				});
			});

			//verify moved post
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});

			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});

			this.then(function() {
				test.assertDoesntExist(x("//a/span[text()='"+json.moveTopic.ValidCredential.title+"']/parent::a"));
				casper.echo('successfully verified move topic', 'INFO');
			});
		});
	});

	/*****Verify move post from the approval queue of that topic into the new topic*****/
	casper.then(function() {
		casper.echo('Verify move post from the approval queue of that topic into the new topic', 'INFO');
		var checkedVal = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		//create new topic
		this.then(function() {
			this.then(function() {
				gotoNewTopic(json.moveTopic.ValidCredential, casper, function() {
					casper.echo('go to new topic', 'INFO');
				});
			});
			this.then(function() {
				this.click('#post_submit');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');
				});
			});
		});
		this.then(function() {
			//Logout From App
			casper.then(function() {
				forumLogin.logoutFromApp(casper, function() {
					casper.echo('Successfully logout from application', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});

			//Login To App
			casper.then(function() {
				forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
					casper.echo('User has been successfuly login to application with register user', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Log In' Link 
			casper.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});
			casper.thenOpen(config.url, function() {
				casper.echo('go to forum url page', 'INFO');
			});
			this.then(function() {
				var classVal = x("//a/span[text()='"+json.moveTopic.ValidCredential.title+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');
				});
				//Reply topic with valid credential
				casper.then(function() {
					replyTopic(json.replyTopic.ValidCredential.content, casper, function() {});
					this.then(function() {
						casper.echo('Replied successfully', 'INFO');					
					});
				});

				//Getting Screenshot After Clicking On 'POST' Link 
				casper.then(function() {
					this.capture(screenShotsDir+ 'replyTopic.png');
				});
			});
			
			//Logout From App
			casper.then(function() {
				forumLogin.logoutFromApp(casper, function() {
					casper.echo('Successfully logout from application', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});

			//Login To App
			casper.then(function() {
				forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
					casper.echo('Admin has been successfuly login to application', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Log In' Link 
			casper.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});
			
			//go to forum url
			casper.thenOpen(config.url, function() {
				casper.echo('go to forum url page', 'INFO');
			});
			
			//go to category page
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			
			//go to page approval page
			this.then(function() {
				this.waitForSelector('a[href="/?action=approvalqueue"]', function() {
					this.click('a[href="/?action=approvalqueue"]');
					this.then(function() {
						this.capture(screenShotsDir+ 'approvalPage.png');				
					});
				});
			});
			
			this.then(function() {
				var topicTitle = json.moveTopic.ValidCredential.title;
				var classVal = x("//a[text()='"+topicTitle+"']"); 
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');
				});
			});
			
			this.then(function() {
				this.mouse.move('#ajax_subscription_vars');
				test.assertExists('#firstpid');

				this.then(function() {
					utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
				});
				this.then(function() {
					test.assertExists('#moveposts');
					this.click('#moveposts');
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'movePage.png');				
				});
			});
			
			this.then(function() {
				test.assertExists('form[name="movePost"] input[name="thread_title"]');
				this.sendKeys('form[name="movePost"] input[name="thread_title"]', json.moveTopic.newPostTitle);
				test.assertExists('button[name="submit"]');
			});
			this.then(function() {
				this.click('button[name="submit"]');
				this.then(function() {});
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'newTitle.png');				
			});
			
			//verify post on category
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});
			this.then(function() {
				test.assertExists(x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a"));
				casper.echo('move topic is verified successfully', 'INFO');
			});

			//delete newly created topic
			this.then(function() {
				var classVal = x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.mouse.move('#ajax_subscription_vars');
					test.assertExists('#firstpid');
						utils.enableorDisableCheckbox('firstpid', true, casper, function() {	
					});
					this.then(function() {
						test.assertExists('#deleteposts');
						this.click('#deleteposts');
					});
					this.then(function() {
						this.capture(screenShotsDir+ 'deleteposts.png');				
					});
				});
			});
		});
	});

	/*****Verify move post from the approval queue into the existing topic (By click on approval queue)*****/
	casper.then(function() {
		casper.echo('Verify move post from the approval queue into the existing topic (By click on approval queue)', 'INFO');
		var checkedVal = "";
		var moveUrl = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			this.capture(screenShotsDir+ '22.png');
		});
		//create new topic
		this.then(function() {
			this.then(function() {
				gotoNewTopic(json.moveTopic.ValidCredential, casper, function() {
					casper.echo('go to new topic', 'INFO');
				});
			});
			this.then(function() {
				this.click('#post_submit');
				casper.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');
				});
			});
		});
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			var classVal = x("//a/span[text()='"+json.moveTopic.topicName+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				this.then(function() {
					moveUrl = this.getCurrentUrl();
				});
		});

		//Logout From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Logout' Link
		casper.then(function() {
			this.capture(screenShotsDir+ 'logout.png');
		});

		//Login To App
		casper.then(function() {
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
				casper.echo('User has been successfuly login to application with register user', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.then(function() {
			this.capture(screenShotsDir+ 'login.png');
		});
		
		//go to config url
		this.thenOpen(config.url, function() {
			casper.echo('go to forum url', 'INFO');
		});
		casper.then(function() {
			this.capture(screenShotsDir+ '33.png');
		});

		this.then(function() {
			var classVal = x("//a/span[text()='"+json.moveTopic.ValidCredential.title+"']/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('a[href="'+href+'"]');
			this.click('a[href="'+href+'"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'postPage.png');
			});
			//Reply topic with valid credential
			this.then(function() {
				replyTopic(json.replyTopic.ValidCredential.content, casper, function() {});
				this.then(function() {
					casper.echo('Replied successfully', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'POST' Link 
			casper.then(function(){
				this.capture(screenShotsDir+ 'replyTopic.png');
			});
		});

		this.then(function() {
			
			//Logout From App
			casper.then(function() {
				forumLogin.logoutFromApp(casper, function() {
					casper.echo('Successfully logout from application', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});

			//Login To App
			casper.then(function() {
				forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
					casper.echo('Admin has been successfuly login to application', 'INFO');
				});
			});

			//Getting Screenshot After Clicking On 'Log In' Link 
			casper.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});

		});
		//go to post listing page
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
				this.then(function() {
					this.capture(screenShotsDir+ 'forumUrl.png');
				});
			});

			//go to category page
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			
			//go to page approval page
			this.then(function() {
				this.waitForSelector('a[href="/?action=approvalqueue"]', function() {
					this.click('a[href="/?action=approvalqueue"]');
					this.then(function() {
						this.capture(screenShotsDir+ 'approvalPage.png');				
					});
				});
			});
			this.then(function() {
				test.assertExists(x("//a[text()='"+json.moveTopic.ValidCredential.title+"']"));
				var classVal = x("//a[text()='"+json.moveTopic.ValidCredential.title+"']");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'postPage.png');				
				});
				
				this.then(function() {
					this.mouse.move('#ajax_subscription_vars');
					test.assertExists('#firstpid');
					utils.enableorDisableCheckbox('firstpid', true, casper, function() {

						casper.capture(screenShotsDir+ '11.png');	
					});
					test.assertExists('#moveposts');
					this.click('#moveposts');
					this.then(function() {
						this.capture(screenShotsDir+ 'movePage.png');				
					});
				});
				this.then(function() {
					test.assertExists('#exist_thread');
					this.click('#exist_thread');
				});
				this.then(function() {
					this.sendKeys('input[name="mergethreadurl"]', moveUrl);
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'fillUrl.png');				
				});
				this.then(function() {
					this.click('#move_posts');
					casper.echo('topic moved successfully', 'INFO');
					this.then(function() {});
				});
				this.then(function() {
					this.capture(screenShotsDir+ 'movePost.png');				
				});
			});

			//verify moved post
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page', 'INFO');
			});
			//delete newly created topic
			this.then(function() {
				var classVal = x("//a/span[text()='"+json.moveTopic.newPostTitle+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.mouse.move('#ajax_subscription_vars');
					test.assertExists('#firstpid');
					this.then(function() {
						utils.enableorDisableCheckbox('firstpid', true, casper, function() {});
					});
					this.then(function() {
						test.assertExists('#deleteposts');
						this.click('#deleteposts');
					});
					this.then(function() {
						this.capture(screenShotsDir+ 'deleteposts.png');				
					});
				});
			});
			this.then(function() {
				test.assertExists('a[href="/categories"]');
				this.click('a[href="/categories"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'categoryPage.png');				
				});		
			});
			this.then(function() {
				var moveToCategory = json.moveTopic.moveToCategory2;
				//var moveToCategory = 'General';
				var classVal = x("//a/span[text()='"+moveToCategory+"']/parent::a");
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists('a[href="'+href+'"]');
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickCategory.png');
				});
			});

			this.then(function() {
				test.assertDoesntExist(x("//a/span[text()='"+json.moveTopic.ValidCredential.title+"']/parent::a"));
				casper.echo('successfully verified move topic', 'INFO');
			});
		});
	});

	//go to backed url to disable Approve New Posts
	//go to backend url
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable Approve New Posts', 'INFO');
		this.then(function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');		
		});
	});
		
	//setting page -> security page
	casper.then(function() {
		test.assertExists('a[data-tooltip-elm="ddSettings"]');
		this.click('a[data-tooltip-elm="ddSettings"]');
		this.then(function() {
			test.assertExists('a[href="/tool/members/mb/settings?tab=Security"]');
			this.click('a[href="/tool/members/mb/settings?tab=Security"]');
		});
		this.then(function() {
			test.assertExists('#post_approval');
			this.click('#post_approval');
			this.sendKeys('select option[value="0"]', 'Disabled');
			this.capture(screenShotsDir+ 'fillData.png');
		});
		this.then(function() {
			test.assertExists('button[type="submit"]');
			this.click('button[type="submit"]');
		});
		this.then(function() {
			this.capture(screenShotsDir+ 'saveApproveNewPosts.png');
		});
	});
	
	//go to forum url
	casper.thenOpen(config.url, function() {
		casper.echo('go to forum url', 'INFO');
	});

	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully logout from application', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link
	casper.then(function() {
		this.capture(screenShotsDir+ 'logout.png');
	});
	return callback();
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
		this.capture(screenShotsDir+ 'checked.png');
	});
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
	driver.then(function() {
		this.capture(screenShotsDir +eleStatus +'.png');
	});
	return callback();
};

//method for create new topic
var gotoNewTopic = function(data, driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
	driver.click('a[href^="/post/printadd"]');
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
			try {
				this.click('#all_forums_dropdown');
				var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
				this.fill('form[name="PostTopic"]',{
					'forum' : val.trim()
				},false);
				this.capture(screenShotsDir+ 'fillTopic.png');
			} catch(err) {

			}
		});
	});

	return callback();
};

//method for delete newly created topic
var deleteNewlyCreatedTopic = function(href, eleStatus, driver, callback){
	casper.echo('@@@@@@@@@@@@@@@ href : ' +href, 'INFO');
	href = href.split('-');
	var id = href[1].split('?');
	driver.click('input[value="'+id[0]+'"]');
	driver.then(function() {
		this.capture(screenShotsDir+ 'checked.png');
	});
	driver.then(function() {
		this.test.assertExists('#' +eleStatus);
		casper.echo('---------------------------------------------------------------------------');
		this.click('#' +eleStatus);
	});
	driver.then(function() {
		this.capture(screenShotsDir +eleStatus +'.png');
	});
	return callback();
};


// method for reply topic on any post

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
		});
		this.then(function() {
			this.capture(screenShotsDir+ 'replyContent.png');
		});
	});

	driver.waitForSelector('#reply_submit', function(){
		this.click('#reply_submit');
		this.wait(7000, function() {
			this.capture(screenShotsDir+ 'replySubmit.png');
		});
	});
	
	return callback();
};



