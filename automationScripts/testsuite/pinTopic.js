/****This script is dedicated for user poll on the forum. It covers testing of 'Poll Tab' with all defined validations****/

"use strict";

var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js'); 
var config = require('../../config/config.json');

var pinTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'pinTopic/';

pinTopic.pinUnPinFeature = function(casper, test, x, callback) {
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.emit('title');
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
	
	/*****Pin any topic and Verify Pin icon of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of topic listing page[Home page]', 'INFO');
		var postTitle = json['pin/unPin'].topicTitle;
		casper.echo('pin topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'pin', 'Pin/Un-pin', casper, function() {});

	});

	//verify pin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
		casper.echo('pin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});


	/*****unPin any topic and Verify unPin icon of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('unPin any topic and Verify unPin icon of topic listing page[Home page]', 'INFO');
		var postTitle = json['pin/unPin'].topicTitle;
		casper.echo('unpin topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'unpin', 'Pin/Un-pin', casper, function() {});

	});

	//verify unPin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
		casper.echo('unPin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****Pin any topic and Verify Pin icon of topic listing page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of topic listing page from moderator shield icon', 'INFO');
		/*this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});*/
		this.then(function() {
			this.capture(screenShotsDir+ '111.png');
		});;
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			this.click('a[href="'+href+'"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'clickOnTopic'+postTitle+'.png');
			});
		});
		this.then(function() {
			test.assertExists('a.dropdown-toggle i.icon-shield');
			this.click('a.dropdown-toggle i.icon-shield');
			this.then(function() {
				this.capture(screenShotsDir+ 'dropdown.png');
				this.click('a[href^="/mbactions/pin?"]');
			});
		});
	});

	//verify pin topic
	casper.then(function() {
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
		casper.echo('pin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****Un-Pin any topic and Verify Pin icon of topic listing page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon of topic listing page from moderator shield icon', 'INFO');
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('unpin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			this.click('a[href="'+href+'"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'clickOnTopic'+postTitle+'.png');
			});
		});
		this.then(function() {
			test.assertExists('a.dropdown-toggle i.icon-shield');
			this.click('a.dropdown-toggle i.icon-shield');
			this.then(function() {
				this.capture(screenShotsDir+ 'dropdown.png');
				this.click('a[href^="/mbactions/unpin?"]');
			});
		});
	});

	//verify unPin topic
	casper.then(function() {
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
			casper.echo('unPin topic is verified', 'INFO');
			casper.echo('---------------------------------------------------------------------------');
		});
	});

	/*****Pin any topic and Verify Pin icon of  latest topic page*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of  latest topic page', 'INFO');
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.click('a[href="/latest"]');
			});
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'pin', 'Pin/Un-pin', casper, function() {});
		});
	});

	//verify pin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
		casper.echo('pin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****Un- Pin any topic and Verify Pin icon of  latest topic page*****/
	casper.then(function() {
		casper.echo('Un- Pin any topic and Verify Pin icon of  latest topic page', 'INFO');
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.click('a[href="/latest"]');
			});
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('unpin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'unpin', 'Pin/Un-pin', casper, function() {});
		});
	});

	//verify unPin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
		casper.echo('unPin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****Pin any topic and Verify Pin icon of latest topic from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of latest topic from moderator shield icon', 'INFO');
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.click('a[href="/latest"]');
			});
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			this.click('a[href="'+href+'"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'clickOnTopic'+postTitle+'.png');
			});
		});
		this.then(function() {
			test.assertExists('a.dropdown-toggle i.icon-shield');
			this.click('a.dropdown-toggle i.icon-shield');
			this.then(function() {
				this.capture(screenShotsDir+ 'dropdown.png');
				this.click('a[href^="/mbactions/pin?"]');
			});
		});
	});

	//verify pin topic
	casper.then(function() {
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.click('a[href="/latest"]');
			});
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
			casper.echo('pin topic is verified', 'INFO');
			casper.echo('---------------------------------------------------------------------------');
		});
	});

	/*****Un-Pin any topic and Verify Pin icon of latest topic from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon of latest topic from moderator shield icon', 'INFO');
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('unpin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			this.click('a[href="'+href+'"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'clickOnTopic'+postTitle+'.png');
			});
		});
		this.then(function() {
			test.assertExists('a.dropdown-toggle i.icon-shield');
			this.click('a.dropdown-toggle i.icon-shield');
			this.then(function() {
				this.capture(screenShotsDir+ 'dropdown.png');
				this.click('a[href^="/mbactions/unpin?"]');
			});
		});
	});

	//verify unPin topic
	casper.then(function() {
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.click('a[href="/latest"]');
			});
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
			casper.echo('unPin topic is verified', 'INFO');
			casper.echo('---------------------------------------------------------------------------');
		});
	});
	
	/*****Pin any topic and Verify Pin icon under category page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon under category page from moderator shield icon', 'INFO');
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
		this.then(function() {
			this.capture(screenShotsDir+ 'categoryTopicList.png');
		});
		this.then(function() {
		
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			this.click('a[href="'+href+'"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'clickOnTopic'+postTitle+'.png');
			});
		});
		this.then(function() {
			test.assertExists('a.dropdown-toggle i.icon-shield');
			this.click('a.dropdown-toggle i.icon-shield');
			this.then(function() {
				this.capture(screenShotsDir+ 'dropdown.png');
				this.click('a[href^="/mbactions/pin?"]');
			});
		});
	});

	//verify pin topic
	casper.then(function() {
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.click('a[href="/latest"]');
			});
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
			casper.echo('pin topic is verified', 'INFO');
			casper.echo('---------------------------------------------------------------------------');
		});
	});

	/*****Un-Pin any topic and Verify Pin icon under category page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon under category page from moderator shield icon', 'INFO');
		casper.then(function() {
			test.assertExists('a[href="/categories"]');
			casper.echo('---------------------------------------------------------------------------');
			this.click('a[href="/categories"]');
			this.then(function() {
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
			this.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('unpin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				var href = this.getElementAttribute(classVal, "href");
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickOnTopic'+postTitle+'.png');
				});
			});
		});
		this.then(function() {
			test.assertExists('a.dropdown-toggle i.icon-shield');
			this.click('a.dropdown-toggle i.icon-shield');
			this.then(function() {
				this.capture(screenShotsDir+ 'dropdown.png');
				this.click('a[href^="/mbactions/unpin?"]');
			});
		});
	});

	//verify unPin topic
	casper.then(function() {
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.click('a[href="/latest"]');
			});
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
			casper.echo('unPin topic is verified', 'INFO');
			casper.echo('---------------------------------------------------------------------------');
		});
	});

	/*****Pin any topic and Verify Pin icon of post listing page under category*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of post listing page under category', 'INFO');
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
		
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'pin', 'Pin/Un-Pin', casper, function() {});
	
		});
	});

	//verify pin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
		casper.echo('pin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****unPin any topic and Verify unPin icon of post listing page under category*****/
	casper.then(function() {
		casper.echo('unPin any topic and Verify unPin icon of post listing page under category', 'INFO');
		casper.then(function() {
		
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('unpin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'unpin', 'Pin/Un-Pin', casper, function() {});
	
		});
	});

	//verify unPin topic
	casper.then(function() {
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
		casper.echo('unPin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});
	
	/*****Pin any topic and Verify Pin icon under sub category page from moderator shield icon *****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon under sub category page from moderator shield icon', 'INFO');
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.capture(screenShotsDir+ 'linkTab.png');
			});
			this.then(function() {
				this.click('li i.icon-right-dir');
				this.then(function() {
					this.click('li a');
				});
			});
		});

		if(this.exists('span.alert-info')){
			var info = this.fetchText('span.alert-info');
			test.assertEquals(info.trim(), 'There are currently no topics to display.', info.trim()+' info message is verified');
		} else {
			this.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('pin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				var href = this.getElementAttribute(classVal, "href");
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickOnTopic'+postTitle+'.png');
				});
			});
			this.then(function() {
				test.assertExists('a.dropdown-toggle i.icon-shield');
				this.click('a.dropdown-toggle i.icon-shield');
				this.then(function() {
					this.capture(screenShotsDir+ 'dropdown.png');
					this.click('a[href^="/mbactions/pin?"]');
				});
			});
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page : ');
			});

			//verify pin topic
			casper.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
				casper.echo('pin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		}
	});

	/*****Un-Pin any topic and Verify Pin icon under sub category page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon under sub category page from moderator shield icon', 'INFO');
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.capture(screenShotsDir+ 'linkTab.png');
			});
			this.then(function() {
				this.click('li i.icon-right-dir');
				this.then(function() {
					this.click('li a');
				});
			});
		});
		if(this.exists('span.alert-info')){
			var info = this.fetchText('span.alert-info');
			test.assertEquals(info.trim(), 'There are currently no topics to display.', info.trim()+' info message is verified');
		} else { 
			this.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('unpin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				var href = this.getElementAttribute(classVal, "href");
				this.click('a[href="'+href+'"]');
				this.then(function() {
					this.capture(screenShotsDir+ 'clickOnTopic'+postTitle+'.png');
				});
			});
			this.then(function() {
				test.assertExists('a.dropdown-toggle i.icon-shield');
				this.click('a.dropdown-toggle i.icon-shield');
				this.then(function() {
					this.capture(screenShotsDir+ 'dropdown.png');
					this.click('a[href^="/mbactions/unpin?"]');
				});
			});
			this.thenOpen(config.url, function() {
				casper.echo('go to topic listing page : ');
			});
			//verify unPin topic
			casper.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				var href = this.getElementAttribute(classVal, "href");
				test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
				casper.echo('unPin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		}
	});

	/*****pin topic from Profile page and verify pin topic*****/
	casper.then(function() {
		casper.echo('pin topic from Profile page and verify pin topic', 'INFO');
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
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('pin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a[text()='"+postTitle+"']"); 
				selectTopic(classVal, 'pin', 'Pin/Un-Pin', casper, function() {});
				//verify pin topic
				casper.then(function() {
					var postTitle = json['pin/unPin'].topicTitle;
					casper.echo('pin topic title : ' +postTitle, 'INFO');
					test.assertExists(x("//a[text()='"+postTitle+"']/following::span/i")); 
					casper.echo('---------------------------------------------------------------------------');
					casper.echo('pin topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				});
			}
		});
	});

	
	/*****un-pin topic from Profile page and verify un-pin topic*****/
	casper.then(function() {
		casper.echo('unPin topic from Profile page and verify unPin topic', 'INFO');
		if(this.exists('div.alert-info')){
			var warningMsg = this.fetchText('div.alert-info');
			test.assertEquals(warningMsg.trim(), json['pin/unPin'].warningMessage, warningMsg.trim()+' and verified warning message');
		} else {
			casper.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('un-pin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a[text()='"+postTitle+"']"); 
				selectTopic(classVal, 'unpin', 'Pin/Un-Pin', casper, function() {});
			});
			//verify un-pin topic
			casper.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('un-pin topic title : ' +postTitle, 'INFO');
				test.assertDoesntExist(x("//a[text()='"+postTitle+"']/following::span/i[@class='glyphicon-pushpin']")); 
				casper.echo('un-pin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		}
	});
	/*****Add New topic by enable pin check box and verify unpin topic option on latest topic page*****/
	casper.then(function() {
		casper.echo('Add New topic by enable pin check box and verify unpin topic option on latest topic page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('hit on url : ' +config.url, 'INFO');
		});
		this.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
			this.then(function() {
				this.click('#Pin');
				this.then(function() {
					this.capture(screenShotsDir+ 'checkedPin.png');
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
				href = url[0].split('.com');
			});
		});

		//verify pin icon from topic listion page
		casper.then(function() {
			casper.echo('href : ' +href[1]);
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to verify pin icon ', 'INFO');
			});
			casper.then(function() {
				test.assertExists(x('//a[@href="'+href[1]+'"]/following::span/i'));
				casper.echo('pin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});
		
		//delete newely created topic
		casper.then(function() {
			deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
				casper.echo('newely created topic is deleted ', 'INFO');		
			});
		});
	});

	/*****Add New topic by disabling pin check box and verify unpin topic  on latest topic page*****/
	casper.then(function() {
		casper.echo('Add New topic by disabling pin check box and verify unpin topic  on latest topic page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('hit on url : ' +config.url, 'INFO');
		});
		this.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
			this.then(function() {
				this.then(function() {
					this.capture(screenShotsDir+ 'checkedLock.png');
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
				href = url[0].split('.com');
			});
		});

		//verify pin icon is not showing on topic listion page
		casper.then(function() {
			casper.echo('href : ' +href[1]);
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to verify pin icon ', 'INFO');
			});
			casper.then(function() {
				test.assertDoesntExist(x('//a[@href="'+href[1]+'"]/following::span/i[@class="glyphicon-pushpin"]'));
				casper.echo('unPin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});

		//delete newely created topic
		casper.then(function() {
			deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
				casper.echo('newely created topic is deleted ', 'INFO');		
			});
		});
	});

	/*****Add New topic by enable pin check box and verify pin topic  on forum listing page*****/
	casper.then(function() {
		casper.echo('Add New topic by enable pin check box and verify pin topic  on forum listing page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('hit on url : ' +config.url, 'INFO');
		});
		this.then(function() {
			this.click('a[href="/categories"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'category.png');
			});
		});
		this.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
			this.then(function() {
				this.click('#Pin');
				this.then(function() {
					this.capture(screenShotsDir+ 'checkedLock.png');
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
				href = url[0].split('.com');
			});
		});

		//verify pin icon from topic listion page
		casper.then(function() {
			casper.echo('href : ' +href[1]);
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to verify pin icon ', 'INFO');
			});
			casper.then(function() {
				test.assertExists(x('//a[@href="'+href[1]+'"]/following::span/i'));
				casper.echo('pin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});

		//delete newely created topic
		casper.then(function() {
			deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
				casper.echo('newely created topic is deleted ', 'INFO');		
			});
		});
	});

	/*****Add New topic by disabling pin check box and verify unpin topic  on forum listing page*****/
	casper.then(function() {
		casper.echo('Add New topic by disabling pin check box and verify unpin topic  on forum listing page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('hit on url : ' +config.url, 'INFO');
		});
		this.then(function() {
			this.click('a[href="/categories"]');
			this.then(function() {
				this.capture(screenShotsDir+ 'category.png');
			});
		});
		this.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
			this.then(function() {
				this.then(function() {
					this.capture(screenShotsDir+ 'checkedLock.png');
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
				href = url[0].split('.com');
			});
		});

		//verify pin icon is not showing on topic listion page
		casper.then(function() {
			casper.echo('href : ' +href[1]);
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to verify pin icon ', 'INFO');
			});
			casper.then(function() {
				test.assertDoesntExist(x('//a[@href="'+href[1]+'"]/following::span/i[@class="glyphicon-pushpin"]'));
				casper.echo('unPin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});
		
		//delete newely created topic
		casper.then(function() {
			deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
				casper.echo('newely created topic is deleted ', 'INFO');		
			});
		});
	});

	/*****Add New topic by enable pin check box and verify unpin topic option on topic listing page for sub category topic *****/
	casper.then(function() {
		casper.echo('Add New topic by enable pin check box and verify unpin topic option on topic listing page for sub category topic ', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('hit on url : ' +config.url, 'INFO');
		});
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.capture(screenShotsDir+ 'linkTab.png');
			});
			this.then(function() {
				this.click('li i.icon-right-dir');
				this.then(function() {
					this.click('li a');
				});
			});
		});
		this.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
			this.then(function() {
				this.click('#Pin');
				this.then(function() {
					this.capture(screenShotsDir+ 'checkedLock.png');
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
				href = url[0].split('.com');
			});
		});

		//verify pin icon from topic listion page
		casper.then(function() {
			casper.echo('href : ' +href[1]);
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to verify pin icon ', 'INFO');
			});
			casper.then(function() {
				test.assertExists(x('//a[@href="'+href[1]+'"]/following::span/i'));
				casper.echo('pin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});
		
		//delete newely created topic
		casper.then(function() {
			deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
				casper.echo('newely created topic is deleted ', 'INFO');		
			});
		});
	});

	/*****Add New topic by disabling un pin check box and verify pin topic option on topic listing page for sub category topic *****/
	casper.then(function() {
		casper.echo('Add New topic by disabling un pin check box and verify pin topic option on topic listing page for sub category topic ', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('hit on url : ' +config.url, 'INFO');
		});
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.capture(screenShotsDir+ 'linkTab.png');
			});
			this.then(function() {
				this.click('li i.icon-right-dir');
				this.then(function() {
					this.click('li a');
				});
			});
		});
		this.then(function() {
			gotoNewTopic(json['newTopic'].ValidCredential, casper, function() {
				casper.echo('go to new topic', 'INFO');
			});
			this.then(function() {
				this.then(function() {
					this.capture(screenShotsDir+ 'checkedLock.png');
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
				href = url[0].split('.com');
			});

		});

		//verify pin icon is not showing on topic listion page
		casper.then(function() {
			casper.echo('href : ' +href[1]);
			casper.thenOpen(config.url, function() {
				casper.echo('go to topic listing page to verify pin icon ', 'INFO');
			});
			casper.then(function() {
				test.assertDoesntExist(x('//a[@href="'+href[1]+'"]/following::span/i[@class="glyphicon-pushpin"]'));
				casper.echo('unPin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		});

		//delete newely created topic
		casper.then(function() {
			deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
				casper.echo('newely created topic is deleted ', 'INFO');		
			});
		});

	});

	/*****Pin any topic and Verify Pin icon of  topic listing page under sub category *****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of  topic listing page under sub category', 'INFO');
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.capture(screenShotsDir+ 'linkTab.png');
			});
			this.then(function() {
				this.click('li i.icon-right-dir');
				this.then(function() {
					this.click('li a');
				});
			});
		});
		if(this.exists('span.alert-info')){
			var info = this.fetchText('span.alert-info');
			test.assertEquals(info.trim(), 'There are currently no topics to display.', info.trim()+' info message is verified');
		} else { 
			this.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('pin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				selectTopic(classVal, 'pin', 'Pin/Un-pin', casper, function() {});
			});

			//verify pin topic
			casper.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				var href = this.getElementAttribute(classVal, "href");
				test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
				casper.echo('pin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		}
	});

	

	/*****Un-Pin any topic and Verify Pin icon of  topic listing page under sub category*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon of  topic listing page under sub category', 'INFO');
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.capture(screenShotsDir+ 'linkTab.png');
			});
			this.then(function() {
				this.click('li i.icon-right-dir');
				this.then(function() {
					this.click('li a');
				});
			});
		});
		if(this.exists('span.alert-info')){
			var info = this.fetchText('span.alert-info');
			test.assertEquals(info.trim(), 'There are currently no topics to display.', info.trim()+' info message is verified');
		} else {
			this.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('unpin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				selectTopic(classVal, 'unpin', 'Pin/Un-pin', casper, function() {});
			});
			//verify unPin topic
			casper.then(function() {
				var postTitle = json['pin/unPin'].topicTitle;
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				var href = this.getElementAttribute(classVal, "href");
				test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
				casper.echo('unPin topic is verified', 'INFO');
				casper.echo('---------------------------------------------------------------------------');
			});
		}
	});


	/*****Pin any topic and Verify Pin icon of  category search page *****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of  category search page ', 'INFO');
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.click('a[href="/latest"]');
			});
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'pin', 'Pin/Un-pin', casper, function() {});
		});
	});

	//verify pin topic
	casper.then(function() {
		this.then(function() {
			test.assertExists('#inline_search_box');
			this.click('#inline_search_box');
			this.sendKeys('#inline_search_box', json['pin/unPin'].topicTitle);
			this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
		});
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
		casper.echo('pin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	/*****Un-Pin any topic and Verify Pin icon of  category search page  *****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon of  category search page ', 'INFO');
		this.then(function() {
			this.click('#links-nav');
			this.then(function() {
				this.click('a[href="/latest"]');
			});
		});
		this.then(function() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('unpin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'unpin', 'Pin/Un-pin', casper, function() {});
		});
	});

	//verify unPin topic
	casper.then(function() {
		this.then(function() {
			test.assertExists('#inline_search_box');
			this.click('#inline_search_box');
			this.sendKeys('#inline_search_box', json['pin/unPin'].topicTitle);
			this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
		});
		var postTitle = json['pin/unPin'].topicTitle;
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
		casper.echo('unPin topic is verified', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	

	return callback();
};

/************************************PRIVATE METHODS***********************************/

//method for select topic and click on dropdown
var selectTopic = function(topicVal, eleStatus, dropdownTitle, driver, callback) {
	var href = driver.getElementAttribute(topicVal, "href");
	href = href.split('-');
	var id = href[1].split('?');
	driver.click('input[value="'+id[0]+'"]');
	driver.then(function() {
		this.capture(screenShotsDir+ 'checked.png');
	});
	driver.then(function() {
		this.test.assertExists('a[data-original-title="'+dropdownTitle+'"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('a[data-original-title="'+dropdownTitle+'"]');
		this.test.assertExists('#' +eleStatus);
		casper.echo('---------------------------------------------------------------------------');
		this.click('#' +eleStatus);
	});
	driver.then(function() {
		this.capture(screenShotsDir +eleStatus +'.png');
	});
	return callback();
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
		});	
		driver.then(function() {
			try {
				this.click('#all_forums_dropdown');
				var val = this.fetchText('#all_forums_dropdown option[value="188757"]');
				this.fill('form[name="PostTopic"]',{
					'forum' : val.trim()
				},false);
				this.capture(screenShotsDir+ 'content.png');
			} catch(err) {

			}
		});
	});

	return callback();
};

