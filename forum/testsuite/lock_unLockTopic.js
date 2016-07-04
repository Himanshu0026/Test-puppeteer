
/****This script is dedicated for lock-unLock topic on the forum. It covers testing of lock_unLock detail page with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var lock_unLockTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'lockUnLock/';

lock_unLockTopic.lockUnLockFeature = function(casper, test, x, callback) {
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.log('Title of the page :' +this.getTitle());
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
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'category.png');
		});
		casper.then(function() {
			test.assertExists('h3 a[href="/?forum=517180"]');
			casper.echo('---------------------------------------------------------------------------');
			this.click('h3 a[href="/?forum=517180"]');
		});
		casper.wait(7000, function() {
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
			casper.echo('id : '+id);
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
		this.wait(7000, function() {
			this.capture(screenShotsDir+ 'profile.png');
		});
		casper.then(function() {
			test.assertExists('#Topics_Started');
			casper.echo('---------------------------------------------------------------------------');
			this.click('#Topics_Started');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'topicsStarted.png');
			});
		});
		casper.then(function() {
		
			var postTitle = json['lock/unLock'].topicTitle;
			casper.echo('lock topic title : ' +postTitle, 'INFO');
			var classVal = x("//a[text()='"+postTitle+"']"); 
			selectTopic(classVal, 'lock', casper, function() {});
	
		});
	});

	//verify lock topic
	casper.then(function() {
		var postTitle = json['lock/unLock'].topicTitle;
		casper.echo('lock topic title : ' +postTitle, 'INFO');
		test.assertExists(x("//a[text()='"+postTitle+"']/following::span/i")); 
		casper.echo('---------------------------------------------------------------------------');
		casper.echo('lock topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****Lock any topic from post page and verify locked message*****/
	casper.then(function() {
		casper.echo('Lock any topic from post page and verify locked message', 'INFO');
		//Logout(Admin) From App
		casper.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Logout' Link
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'logout.png');
		});
		
		//Login to app with register user
		casper.then(function(){
			forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
				casper.log('register user has successfully login to application with valid username and password', 'INFO');
			});
		});
	
		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'login.png');
		});
		
		casper.then(function() {
			var postTitle = json['lock/unLock'].topicTitle;
			this.click(x("//a[text()='"+postTitle+"']"));
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'clickLockTopic.png');	
			});
		});
		
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
		});

		//Getting Screenshot After Clicking On 'Logout' Link
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'logout.png');
		});	
	});

	
	/*****unLock topic from Profile page and verify un-locked topic*****/
	casper.then(function() {
		casper.echo('unLock topic from Profile page and verify un-locked topic', 'INFO');
		//Login to app
		casper.then(function(){
			forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function() {
				casper.log('Admin has successfully login to application with valid username and password', 'INFO');
			});
		});
	
		//Getting Screenshot After Clicking On 'Log In' Link 
		casper.wait(7000, function() {
			this.capture(screenShotsDir+ 'login.png');
		});
		
		casper.then(function() {
			test.assertExists('li.user-panel .dropdown-toggle');		
			casper.echo('---------------------------------------------------------------------------');
			this.click('li.user-panel .dropdown-toggle');
			this.capture(screenShotsDir+ 'dropdown.png');
			test.assertExists('span.user-nav-panel li a[href^="/profile"]');
			casper.echo('---------------------------------------------------------------------------');
			this.click('span.user-nav-panel li a[href^="/profile"]');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'profile.png');
			});
		});

		casper.then(function() {
			test.assertExists('#Topics_Started');
			casper.echo('---------------------------------------------------------------------------');
			this.click('#Topics_Started');
			this.wait(7000, function() {
				this.capture(screenShotsDir+ 'topicsStarted.png');
			});
		});

		casper.then(function() {
			var postTitle = json['lock/unLock'].topicTitle;
			casper.echo('un-lock topic title : ' +postTitle, 'INFO');
			var classVal = x("//a[text()='"+postTitle+"']"); 
			selectTopic(classVal, 'unlock', casper, function() {});
	
		});
	});

	//verify un-lock topic
	casper.then(function() {
		var postTitle = json['lock/unLock'].topicTitle;
		casper.echo('un-lock topic title : ' +postTitle, 'INFO');
		test.assertDoesntExist(x("//a[text()='"+postTitle+"']/following::span/i[@class='glyphicon-lock']")); 
		casper.echo('un-lock topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****UnLock any locked  topic from post page and verify that the locked message should be disappeared*****/
	casper.then(function() {
		casper.echo('UnLock any locked  topic from post page and verify that the locked message should be disappeared', 'INFO');
		var postTitle = json['lock/unLock'].topicTitle;		
		test.assertExists(x("//a[text()='"+postTitle+"']"));
		casper.echo('---------------------------------------------------------------------------');
		this.click(x("//a[text()='"+postTitle+"']"));
		this.wait(7000, function() {
			this.capture(screenShotsDir+ 'selectedTopic.png');	
			test.assertDoesntExist('.alert-warning');
			casper.echo('---------------------------------------------------------------------------');
		});

		//Logout(Admin) From App
		this.then(function() {
			forumLogin.logoutFromApp(casper, function() {
				casper.echo('Successfully logout from application', 'INFO');
			});
		});

		//Getting Screenshot After Clicking On 'Logout' Link
		this.wait(7000, function() {
			this.capture(screenShotsDir+ 'logout.png');
		});		
				
	});
	return callback();
};

/************************************PRIVATE METHODS***********************************/

var selectTopic = function(topicVal, eleStatus, driver, callback) {
	var href = driver.getElementAttribute(topicVal, "href");
	href = href.split('-');
	var id = href[1].split('?');
	driver.click('input[value="'+id[0]+'"]');
	driver.wait(2000, function() {
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
	driver.wait(7000, function() {
		this.capture(screenShotsDir +eleStatus +'.png');
	});
	return callback();
};












