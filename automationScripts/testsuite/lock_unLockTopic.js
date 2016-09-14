
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
	});

	//Login to app
	casper.then(function(){
		forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
			casper.log('Admin has successfully login to application with valid username and password', 'INFO');
		});
		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.then(function() {
			this.capture(screenShotsDir+ 'login.png');
		});
	});
	
	/*****Lock any topic and Verify Lock option of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('Lock any topic and Verify Lock option of topic listing page[Home page]', 'INFO');
		var postTitle = json['lock/unLock'].topicTitle;
		casper.echo('lock topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'lock', casper, function() {});
	});

	//verify lock topic
	casper.then(function() {
		var postTitle = json['lock/unLock'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		href = href.split('=');
		var id = 'first_post_vote_'+href[1];
			casper.echo('id : '+id);
		test.assertExists(x('//a[@id="'+id+'"]/following::i'));
		casper.echo('Locked topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****un-Lock any topic and Verify Lock optipon of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('un-Lock any topic and Verify Lock optipon of topic listing page[Home page]', 'INFO');
		var postTitle = json['lock/unLock'].topicTitle;
		casper.echo(' unlock topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'unlock', casper, function() {});

	});

	//verify unLock topic
	casper.then(function() {
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

	/*****Lock any topic and Verify Lock optipon of post listing page under category*****/
	casper.then(function() {
		casper.echo('Lock any topic and Verify Lock optipon of post listing page under category', 'INFO');
		test.assertExists('a[href="/categories"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('a[href="/categories"]');
		casper.then(function() {
			this.capture(screenShotsDir+ 'category.png');
		});
		casper.then(function() {
			var classVal = x("//h3/a/span/parent::a");
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists('h3 a[href="'+href+'"]');
			casper.echo('---------------------------------------------------------------------------');
			this.click('h3 a[href="'+href+'"]');
		});
		casper.then(function() {
			this.capture(screenShotsDir+ 'categoryTopicList.png');
		});
		casper.then(function() {
			var postTitle = json['lock/unLock'].topicTitle;
			casper.echo('lock topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'lock', casper, function() {});
	
		});
	});

	//verify lock topic
	casper.then(function() {
		var postTitle = json['lock/unLock'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		href = href.split('=');
		var id = 'first_post_vote_'+href[1];
		casper.echo('id : '+id, 'INFO');
		test.assertExists(x('//a[@id="'+id+'"]/following::i'));
		casper.echo('Locked topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});
	
	/*****un-Lock any topic and Verify Lock optipon of post listing page under category*****/
	casper.then(function() {
		casper.echo('un-Lock any topic and Verify Lock optipon of post listing page under category', 'INFO');
		casper.then(function() {
		
			var postTitle = json['lock/unLock'].topicTitle;
			casper.echo('unLock topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'unlock', casper, function() {});
	
		});
	});

	//verify un-lock topic
	casper.then(function() {
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

	/*****Lock topic from Profile page and verify locked topic*****/
	casper.then(function() {
		casper.echo('Lock topic from Profile page and verify locked topic', 'INFO');
		test.assertExists('li.user-panel .dropdown-toggle');
		casper.echo('---------------------------------------------------------------------------');		
		this.click('li.user-panel .dropdown-toggle');
		this.capture(screenShotsDir+ 'dropdown.png');
		test.assertExists('span.user-nav-panel li a[href^="/profile"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('span.user-nav-panel li a[href^="/profile"]');
		this.then(function() {
			this.capture(screenShotsDir+ 'profile.png');
		});
		casper.then(function() {
			test.assertExists('#Topics_Started');
			casper.echo('---------------------------------------------------------------------------');
			this.click('#Topics_Started');
			this.then(function() {
				this.capture(screenShotsDir+ 'topicsStarted.png');
			});
		});
		casper.then(function() {
			if(this.exists('div.alert-info')){
				var warningMsg = this.fetchText('div.alert-info');
				test.assertEquals(warningMsg.trim(), json['pin/unPin'].warningMessage, warningMsg.trim()+' and verified warning message');
			} else {
				var postTitle = json['lock/unLock'].topicTitle;
				casper.echo('lock topic title : ' +postTitle, 'INFO');
				var classVal = x("//a[text()='"+postTitle+"']"); 
				selectTopic(classVal, 'lock', casper, function() {});
				//verify lock topic
				casper.then(function() {
					var postTitle = json['lock/unLock'].topicTitle;
					casper.echo('lock topic title : ' +postTitle, 'INFO');
					test.assertExists(x("//a[text()='"+postTitle+"']/following::span/i")); 
					casper.echo('---------------------------------------------------------------------------');
					casper.echo('lock topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				});
			}
		});
	});

	/*****Lock any topic from post page and verify locked message*****/
	casper.then(function() {
		casper.echo('Lock any topic from post page and verify locked message', 'INFO');
		//Logout(Admin) From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
			});
		});

		//Login to app with register user
		casper.then(function(){
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
				casper.log('register user has successfully login to application with valid username and password', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Log In' Link 
			casper.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});
		});
	
		casper.then(function() {
			var postTitle = json['lock/unLock'].topicTitle;
			this.click(x("//a[text()='"+postTitle+"']"));
			this.then(function() {
				this.capture(screenShotsDir+ 'clickLockTopic.png');	
			});
		});

		//casper.reload();
		casper.then(function() {
			test.assertExists('.alert-warning');
			casper.echo('---------------------------------------------------------------------------');
			var warningMsg = this.fetchText('.alert-warning');
			test.assertEquals(warningMsg.trim(), json['lock/unLock'].ExpectedWarningMessage.trim(), warningMsg.trim()+' and message verified');
			casper.echo('---------------------------------------------------------------------------');
		});
	});


	/*****Verify Reply a Post option angainst locked topic on post page for registered user*****/
	casper.then(function() {
		casper.then(function() {
			casper.echo('Verify Reply a Post option angainst locked topic on post page for registered user', 'INFO');
			test.assertDoesntExist('#reply_submit');
			casper.echo('---------------------------------------------------------------------------');
			casper.echo('register user can not post reply on locked topic', 'INFO')
		});		
				
		//Logout(register user) From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
			//Getting Screenshot After Clicking On 'Logout' Link
			casper.then(function() {
				this.capture(screenShotsDir+ 'logout.png');
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
			//Getting Screenshot After Clicking On 'Log In' Link 
			casper.then(function() {
				this.capture(screenShotsDir+ 'login.png');
			});
		});
	
		casper.then(function() {
			test.assertExists('li.user-panel .dropdown-toggle');		
			casper.echo('---------------------------------------------------------------------------');
			this.click('li.user-panel .dropdown-toggle');
			this.capture(screenShotsDir+ 'dropdown.png');
			test.assertExists('span.user-nav-panel li a[href^="/profile"]');
			casper.echo('---------------------------------------------------------------------------');
			this.click('span.user-nav-panel li a[href^="/profile"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'profile.png');
			});
		});

		casper.then(function() {
			test.assertExists('#Topics_Started');
			casper.echo('---------------------------------------------------------------------------');
			this.click('#Topics_Started');
			this.then(function() {
				this.capture(screenShotsDir+ 'topicsStarted.png');
			});
		});

		casper.then(function() {
			if(this.exists('div.alert-info')){
				var warningMsg = this.fetchText('div.alert-info');
				test.assertEquals(warningMsg.trim(), json['pin/unPin'].warningMessage, warningMsg.trim()+' and verified warning message');
			} else {
				var postTitle = json['lock/unLock'].topicTitle;
				casper.echo('un-lock topic title : ' +postTitle, 'INFO');
				var classVal = x("//a[text()='"+postTitle+"']"); 
				selectTopic(classVal, 'unlock', casper, function() {});
				//verify un-lock topic
				casper.then(function() {
					var postTitle = json['lock/unLock'].topicTitle;
					casper.echo('un-lock topic title : ' +postTitle, 'INFO');
					test.assertDoesntExist(x("//a[text()='"+postTitle+"']/following::span/i[@class='glyphicon-lock']")); 
					casper.echo('un-lock topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				});
			}		
		});
	});

	
	/*****UnLock any locked  topic from post page and verify that the locked message should be disappeared *****/
	casper.then(function() {
		casper.echo('UnLock any locked  topic from post page and verify that the locked message should be disappeared ', 'INFO');
		var postTitle = json['lock/unLock'].topicTitle;		
		test.assertExists(x("//a[text()='"+postTitle+"']"));
		casper.echo('---------------------------------------------------------------------------');
		this.click(x("//a[text()='"+postTitle+"']"));
		this.then(function() {
			this.capture(screenShotsDir+ 'selectedTopic.png');	
			test.assertDoesntExist('.alert-warning');
			casper.echo('---------------------------------------------------------------------------');
		});

	});

	/*****Add New topic by enable lock check box and verify lock topic  on forum listing page*****/
	casper.then(function() {
		casper.echo('Add New topic by enable lock check box and verify lock topic  on forum listing page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('Hit on url : ' +config.url, 'INFO');
		});

		//go to start new topic
		this.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
		});
	
		this.then(function() {
			this.click('#LCK');
			this.then(function() {
				this.capture(screenShotsDir+ 'checkedLock.png');
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
				href = url[0].split('.com');
				casper.echo('********************href : ' +href[1]);
			});
		});

		//Verify lock topic option on post page
		this.then(function() {
			test.assertExists('.alert-warning');
			var warningMsg = this.fetchText('.alert-warning');
			test.assertEquals(warningMsg.trim(), json['lock/unLock'].ExpectedWarningMessage, warningMsg.trim()+' and message is verified');
		});
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page to delete newly created topic ', 'INFO');
		});
		//delete newely created topic
		this.then(function() {
			deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
				casper.echo('newely created topic is deleted ', 'INFO');		
			});
		});
	});

	/*****Add New topic by disabling Follow check box and verify follow topic option on Post page*****/
	casper.then(function() {
		casper.echo('Add New topic by disabling Follow check box and verify follow topic option on Post page', 'INFO');
		var href = "";
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : ' +config.url);
		});

		//go to start new topic
		casper.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
		});
	
		casper.then(function() {
			this.then(function() {
				this.capture(screenShotsDir+ 'unCheckedLock.png');
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
				href = url[0].split('.com');
			});
		});

		//Verify lock topic option on post page
		casper.then(function() {
			test.assertDoesntExist('.alert-warning');
		});
		
		casper.thenOpen(config.url, function() {
			casper.echo('go to topic listing page to delete newly created topic', 'INFO');
		});

		//delete newely created topic
		casper.then(function() {
			deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
				casper.echo('newely created topic is deleted ', 'INFO');		
			});
		});
	});

	/*****Add New topic by enable lock check box and verify unlock topic option on latest topic page*****/
	casper.then(function() {
		casper.echo('Add New topic by enable lock check box and verify unlock topic option on latest topic page', 'INFO');
		var href = "";
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : ' +config.url);
		});

		//go to start new topic
		casper.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
		});
	
		casper.then(function() {
			this.click('#LCK');
			this.then(function() {
				this.capture(screenShotsDir+ 'checkedLock.png');
			});
			this.then(function() {
				this.click('#post_submit');
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'postPage.png');
			});
			this.then(function() {
				var url = this.getCurrentUrl();
				url = url.split('#');
				href = url[0].split('.com');
				casper.thenOpen(config.url, function() {
					casper.echo('Hit on url : ' +config.url);
				});
			});
			
			//Verify lock topic option on post page
			casper.then(function() {
				test.assertExists('a[href="'+href[1]+'"]');
				this.click('a[href="'+href[1]+'"]');
				casper.then(function() {
					test.assertExists('.alert-warning');
					var warningMsg = this.fetchText('.alert-warning');
					test.assertEquals(warningMsg.trim(), json['lock/unLock'].ExpectedWarningMessage, warningMsg.trim()+' and message is verified');
				});
			});
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to delete newly created topic', 'INFO');
			});

			//delete newely created topic
			casper.then(function() {
				deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
					casper.echo('newely created topic is deleted ', 'INFO');		
				});
			});
		});
	});
	
	/*****Add New topic by disabling lock check box and verify lock topic option on latest topic page*****/
	casper.then(function() {
		casper.echo('Add New topic by disabling lock check box and verify lock topic option on latest topic page', 'INFO');
		var href = "";
		casper.thenOpen(config.url, function() {
			casper.echo('Hit on url : ' +config.url);
		});

		//go to start new topic
		casper.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
		});
	
		casper.then(function() {
			var href ="";
			this.then(function() {
				this.capture(screenShotsDir+ 'unCheckedLock.png');
			});
			this.then(function() {
				this.click('#post_submit');
			});
			this.then(function() {
				this.capture(screenShotsDir+ 'postPage.png');
			});
			this.then(function() {
				var url = this.getCurrentUrl();
				url = url.split('#');
				href = url[0].split('.com');
				casper.thenOpen(config.url, function() {
					casper.echo('Hit on url : ' +config.url);
				});
			});

			//Verify lock topic option on post page
			this.then(function() {
				test.assertExists('a[href="'+href[1]+'"]');
				this.click('a[href="'+href[1]+'"]');
				casper.then(function() {
					test.assertDoesntExist('.alert-warning');
				});
			});

			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to delete newly created topic', 'INFO');
			});
			//delete newely created topic
			casper.then(function() {
				deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
					casper.echo('newely created topic is deleted ', 'INFO');		
				});
			});
		});
	});

	/*****Verify Vote option against locked topic on post page*****/
	casper.then(function() {
		casper.echo('Verify Vote option against locked topic on post page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('hit on url : ' +config.url, 'INFO');
		});
		casper.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
			casper.then(function() {
				this.click('#LCK');
				this.then(function() {
					this.capture(screenShotsDir+ 'checkedLock.png');
				});
			});
		});

		//Go To Poll Page
		casper.then(function() {
			gotoNewPollpage(casper, function() {
				casper.log('redirect to Poll', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Poll' Link 
		casper.then(function() {
			this.capture(screenShotsDir+ 'newPoll.png');
		});
		
		//Post Poll Data 
		casper.then(function() {
			savePollPage(json['poll'].vadidCredintial, casper, function() {
				casper.log('poll posted successfully', 'info');
			});
		});

		//Getting Screenshot After Clicking On 'Save Poll' Link
		this.then(function() {
			this.capture(screenShotsDir+ 'savePoll.png');
		});
		casper.then(function() {
			var url = this.getCurrentUrl();
			casper.echo('url : ' +url);
			url = url.split('#');
			href = url[0].split('.com');
			casper.echo('**********************href : ' +href[1]);
		});
		this.then(function() {
			this.click('form[name="Poll"] input[name="pollvotesave"]');
			var msg = this.getElementAttribute('form[name="Poll"] input[name="pollvotesave"]', 'data-original-title');
			casper.echo('msg : ' +msg.trim());
			test.assertEquals(msg.trim(), json['lock/unLock'].ExpectedMessage, msg.trim()+' and message is verified');
		});
		this.then(function() {
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to delete newly created topic ', 'INFO');
			});

			//delete newely created topic
			this.then(function() {
				casper.echo('**********************href : ' +href[1]);
				var id = href[1].split('=');
				casper.echo('id : ' +id[1]);
				test.assertExists('input[value="'+id[1]+'"]');
				this.click('input[value="'+id[1]+'"]');
				this.then(function() {
					this.click('#delete');
					casper.echo('newely created topic is deleted ', 'INFO');
				});
			});
		});
	});

	//Logout(Admin) From App
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

//method for select topic ange href value and click on checkbox
var selectTopic = function(topicVal, eleStatus, driver, callback) {
	var href = driver.getElementAttribute(topicVal, "href");
	href = href.split('-');
	var id = href[1].split('?');
	driver.click('input[value="'+id[0]+'"]');
	driver.then(function() {
		this.capture(screenShotsDir+ 'checked.png');
	});
	driver.then(function() {
		this.test.assertExists('a[data-original-title="Lock/Un-lock"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('a[data-original-title="Lock/Un-lock"]');
		this.test.assertExists('#' +eleStatus);
		casper.echo('---------------------------------------------------------------------------');
		this.click('#' +eleStatus);
	});
	driver.then(function() {
		this.capture(screenShotsDir +eleStatus +'.png');
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

var gotoNewPollpage = function(driver, callback) {
	driver.then(function() {
		this.capture(screenShotsDir+ 'TopicDetails.png');
		this.test.assertExists('ul li a[href="#poll"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('ul li a[href="#poll"]');
	});
	return callback();
};

// method for go to save new poll  to application

var savePollPage = function(data, driver, callback) {
	driver.sendKeys('#poll_question', data.pollQues, {reset:true});
	driver.sendKeys('input[name="public"]', data.publicCheckbox);
	driver.sendKeys('#poll_option_1 div input', data.option1, {reset:true});
	driver.sendKeys('#poll_option_2 div input', data.option2, {reset:true});
	driver.then(function(){
		this.click('a[href="#poll-timeout"] small.text-muted');
	});
	driver.then(function() {
		driver.then(function() {
			this.capture(screenShotsDir+ 'fillPoll.png');
		});
	});
	driver.then(function() {
		driver.click('#save_poll');
	});
	
};

//method for delete newly created topic
var deleteNewlyCreatedTopic = function(href, eleStatus, driver, callback){
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









