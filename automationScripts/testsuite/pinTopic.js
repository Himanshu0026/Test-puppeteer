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
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO')
	});

	//Login to app
	casper.then(function(){
		forumLogin.loginToApp(json['newTopic'].adminUname, json['newTopic'].adminPass, casper, function(err) {
			if(!err) {
				casper.log('Admin has successfully login to application with valid username and password', 'INFO');
			}
		});
	});
	
	/*****Pin any topic and Verify Pin icon of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of topic listing page[Home page]', 'INFO');
		var postTitle = json['pin/unPin'].topicTitle;
		casper.echo('pin topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'pin', 'Pin/Un-pin', casper, function(err) {
			if(!err) {
				//verify pin topic
				casper.waitForSelector('a[href^="/post/"]', function success() {
					var postTitle = json['pin/unPin'].topicTitle;
					var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
					casper.echo('pin topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});
	});

	/*****unPin any topic and Verify unPin icon of topic listing page[Home page]*****/
	casper.then(function() {
		casper.echo('unPin any topic and Verify unPin icon of topic listing page[Home page]', 'INFO');
		var postTitle = json['pin/unPin'].topicTitle;
		casper.echo('unpin topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'unpin', 'Pin/Un-pin', casper, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/post/"]', function success() {
					//verify unPin topic
					var postTitle = json['pin/unPin'].topicTitle;
					var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
					var href = this.getElementAttribute(classVal, "href");
					test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
					casper.echo('unPin topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				}, function fail(err) {
					vasper.echo(err);
				});
			}
		});

	});

	/*****Pin any topic and Verify Pin icon of topic listing page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of topic listing page from moderator shield icon', 'INFO');
		/*this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page', 'INFO');
		});*/
		this.waitForSelector('a[href^="/post/"]', function success() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			this.click('a[href="'+href+'"]');
			casper.waitForSelector('a.dropdown-toggle i.icon-shield', function success() {
				test.assertExists('a.dropdown-toggle i.icon-shield');
				this.click('a.dropdown-toggle i.icon-shield');
				this.waitForSelector('a[href^="/mbactions/pin?"]', function success() {
					this.click('a[href^="/mbactions/pin?"]');
				}, function fail(err) {
					casper.echo(err);
				});
				this.thenOpen(config.url, function() {
					casper.echo('go to topic listing page', 'INFO');
				});
				//verify pin topic
				casper.waitForSelector('a[href="/latest"]', function success() {
					var postTitle = json['pin/unPin'].topicTitle;
					var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
					var href = this.getElementAttribute(classVal, "href");
					test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
					casper.echo('pin topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
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

	
	

	/*****Un-Pin any topic and Verify Pin icon of topic listing page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon of topic listing page from moderator shield icon', 'INFO');
		this.waitForSelector('a[href^="/post/"]', function success() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('unpin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			this.click('a[href="'+href+'"]');
			casper.waitForSelector('a.dropdown-toggle i.icon-shield', function success() {
				test.assertExists('a.dropdown-toggle i.icon-shield');
				this.click('a.dropdown-toggle i.icon-shield');
				this.waitForSelector('a[href^="/mbactions/unpin?"]', function success() {
					this.click('a[href^="/mbactions/unpin?"]');
				}, function fail(err) {
					casper.echo(err);
				});
				this.thenOpen(config.url, function() {
					casper.echo('go to topic listing page', 'INFO');
				});
				//verify pin topic
				casper.waitForSelector('a[href="/latest"]', function success() {
					var postTitle = json['pin/unPin'].topicTitle;
					var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
					var href = this.getElementAttribute(classVal, "href");
					test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
					casper.echo('unPin topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
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


	/*****Pin any topic and Verify Pin icon of  latest topic page*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of  latest topic page', 'INFO');
		this.click('#links-nav');	
		this.click('a[href="/latest"]');
		this.waitForSelector('a[href^="/post/"]', function success() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'pin', 'Pin/Un-pin', casper, function(err) {
				if(!err) {
					//verify pin topic
					casper.waitForSelector('a[href^="/post/"]', function success() {
						var postTitle = json['pin/unPin'].topicTitle;
						var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
						var href = this.getElementAttribute(classVal, "href");
						test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
						casper.echo('pin topic is verified', 'INFO');
						casper.echo('---------------------------------------------------------------------------');
					}, function fail(err) {
						casper.echo(err);					
					});
				}
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});


	/*****Un- Pin any topic and Verify Pin icon of  latest topic page*****/
	casper.then(function() {
		casper.echo('Un- Pin any topic and Verify Pin icon of  latest topic page', 'INFO');	
		this.click('#links-nav');	
		this.click('a[href="/latest"]');
		this.waitForSelector('a[href^="/post/"]', function success() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('unpin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'unpin', 'Pin/Un-pin', casper, function(err) {
				if(!err) {
					//verify unPin topic
					casper.waitForSelector('a[href^="/post/"]', function success() {
						var postTitle = json['pin/unPin'].topicTitle;
						var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
						var href = this.getElementAttribute(classVal, "href");
						test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
						casper.echo('unPin topic is verified', 'INFO');
						casper.echo('---------------------------------------------------------------------------');
					}, function fail(err) {
						casper.echo(err);
					});
				}
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****Pin any topic and Verify Pin icon of latest topic from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of latest topic from moderator shield icon', 'INFO');
		
		this.click('#links-nav');
		this.click('a[href="/latest"]');
		this.waitForSelector('a[href^="/post/"]', function success() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			var href = this.getElementAttribute(classVal, "href");
			this.click('a[href="'+href+'"]');
			this.waitForSelector('a.dropdown-toggle i.icon-shield', function success() {
				test.assertExists('a.dropdown-toggle i.icon-shield');
				this.click('a.dropdown-toggle i.icon-shield');
				this.waitForSelector('a[href^="/mbactions/pin?"]', function success() {
					this.click('a[href^="/mbactions/pin?"]');
					this.waitForSelector('#links-nav', function success() {
						this.click('#links-nav');
						this.click('a[href="/latest"]');
						//verify pin topic
						casper.waitForSelector('a[href^="/post/"]', function success() {
							var postTitle = json['pin/unPin'].topicTitle;
							var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
							var href = this.getElementAttribute(classVal, "href");
							test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
							casper.echo('pin topic is verified', 'INFO');
							casper.echo('---------------------------------------------------------------------------');
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
	});


	/*****Un-Pin any topic and Verify Pin icon of latest topic from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon of latest topic from moderator shield icon', 'INFO');
		
		var postTitle = json['pin/unPin'].topicTitle;
		casper.echo('unpin topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		var href = this.getElementAttribute(classVal, "href");
		this.click('a[href="'+href+'"]');		
		this.waitForSelector('a.dropdown-toggle i.icon-shield', function success() {
			test.assertExists('a.dropdown-toggle i.icon-shield');
			this.click('a.dropdown-toggle i.icon-shield');
			this.waitForSelector('a[href^="/mbactions/unpin?"]', function success() {
				this.click('a[href^="/mbactions/unpin?"]');
				//verify unPin topic
				this.waitForSelector('#links-nav', function success() {
						this.click('#links-nav');
						this.click('a[href="/latest"]');
						casper.waitForSelector('a[href^="/post/"]', function success() {
							var postTitle = json['pin/unPin'].topicTitle;
							var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
							var href = this.getElementAttribute(classVal, "href");
							test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
							casper.echo('unPin topic is verified', 'INFO');
							casper.echo('---------------------------------------------------------------------------');
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
	
	/*****Pin any topic and Verify Pin icon under category page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon under category page from moderator shield icon', 'INFO');
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
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('pin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				var href = this.getElementAttribute(classVal, "href");
				this.click('a[href="'+href+'"]');
				this.waitForSelector('a.dropdown-toggle i.icon-shield', function success() {
					test.assertExists('a.dropdown-toggle i.icon-shield');
					this.click('a.dropdown-toggle i.icon-shield');
					this.waitForSelector('a[href^="/mbactions/pin?"]', function success() {
						this.click('a[href^="/mbactions/pin?"]');
						//verify pin topic
						this.waitForSelector('#links-nav', function success() {
							this.click('#links-nav');
							this.click('a[href="/latest"]');
							this.waitForSelector('a[href^="/post/"]', function success() {
								var postTitle = json['pin/unPin'].topicTitle;
								var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
								var href = this.getElementAttribute(classVal, "href");
								test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
								casper.echo('pin topic is verified', 'INFO');
								casper.echo('---------------------------------------------------------------------------');
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
			vasper.echo(err);
		});
	});

	/*****Un-Pin any topic and Verify Pin icon under category page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon under category page from moderator shield icon', 'INFO');
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
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('unpin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				var href = this.getElementAttribute(classVal, "href");
				this.click('a[href="'+href+'"]');
				this.waitForSelector('a.dropdown-toggle i.icon-shield', function success() {
					test.assertExists('a.dropdown-toggle i.icon-shield');
					this.click('a.dropdown-toggle i.icon-shield');
					this.waitForSelector('a[href^="/mbactions/unpin?"]', function success() {
						this.click('a[href^="/mbactions/unpin?"]');
						//verify unPin topic
						this.waitForSelector('#links-nav', function success() {
							this.click('#links-nav');
							this.click('a[href="/latest"]');
							this.waitForSelector('a[href^="/post/"]', function success() {
								var postTitle = json['pin/unPin'].topicTitle;
								var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
								var href = this.getElementAttribute(classVal, "href");
								test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
								casper.echo('unPin topic is verified', 'INFO');
								casper.echo('---------------------------------------------------------------------------');
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

	/*****Pin any topic and Verify Pin icon of post listing page under category*****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of post listing page under category', 'INFO');
		test.assertExists('a[href="/categories"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('a[href="/categories"]');
		casper.waitForSelector('h3 a', function success() {
			var classVal = x("//h3/a/span/parent::a");
			var href = this.getElementAttribute(classVal, "href"); 
			test.assertExists('h3 a[href="'+href+'"]');
			casper.echo('---------------------------------------------------------------------------');
			this.click('h3 a[href="'+href+'"]');
			this.waitForSelector('a[href^="/post/"]', function success() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('pin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
				selectTopic(classVal, 'pin', 'Pin/Un-Pin', casper, function(err) {
					if(!err) {
						//verify pin topic
						casper.waitForSelector('a[href^="/post/"]', function success() {
							var postTitle = json['pin/unPin'].topicTitle;
							var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
							var href = this.getElementAttribute(classVal, "href");
							test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
							casper.echo('pin topic is verified', 'INFO');
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

	/*****unPin any topic and Verify unPin icon of post listing page under category*****/
	casper.then(function() {
		casper.echo('unPin any topic and Verify unPin icon of post listing page under category', 'INFO');
		var postTitle = json['pin/unPin'].topicTitle;
		casper.echo('unpin topic title : ' +postTitle, 'INFO');
		var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
		selectTopic(classVal, 'unpin', 'Pin/Un-Pin', casper, function(err) {
			if(!err) {
				//verify unPin topic
				casper.waitForSelector('a[href^="/post/"]', function success() {
					var postTitle = json['pin/unPin'].topicTitle;
					var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
					var href = this.getElementAttribute(classVal, "href");
					test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
					casper.echo('unPin topic is verified', 'INFO');
					casper.echo('---------------------------------------------------------------------------');
				}, function fail(err) {
					casper.echo(err);
				});
			}
		});		
	});
	
	/*****Pin any topic and Verify Pin icon under sub category page from moderator shield icon *****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon under sub category page from moderator shield icon', 'INFO');
		this.click('#links-nav');
		this.click('li i.icon-right-dir');
		this.click('li a[href^="/?forum="]');
		this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
			if(this.exists('h3 a[href^="/?forum="]')) {
				this.click('h3 a[href^="/?forum="]');
				this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
					if(this.exists('span.alert-info')){
						var info = this.fetchText('span.alert-info');
						test.assertEquals(info.trim(), "This category doesn't have any topics yet.  Create a topic  to get this discussion started!", info.trim()+' info message is verified');
					} else {
						this.waitForSelector('a span', function success() {
							var postTitle = json['pin/unPin'].topicTitle;
							casper.echo('pin topic title : ' +postTitle, 'INFO');
							var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
							var href = this.getElementAttribute(classVal, "href");
							this.click('a[href="'+href+'"]');
							this.waitForSelector('a.dropdown-toggle i.icon-shield', function success() {
								test.assertExists('a.dropdown-toggle i.icon-shield');
								this.click('a.dropdown-toggle i.icon-shield');
								this.waitForSelector('a[href^="/mbactions/pin?"]', function success() {
									this.click('a[href^="/mbactions/pin?"]');
									casper.waitForSelector('span[id^="post_message_"]', function success() {
										this.thenOpen(config.url, function() {
											casper.echo('go to topic listing page : ');
										});
										//verify pin topic
										this.waitForSelector('a[href^="/post/"]', function success() {
											var postTitle = json['pin/unPin'].topicTitle;
											var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
											var href = this.getElementAttribute(classVal, "href");
											test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
											casper.echo('pin topic is verified', 'INFO');
											casper.echo('---------------------------------------------------------------------------');
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
					}
				}, function fail(err) {});
			} else {
				test.assertDoesntExist('h3 a[href^="/?forum="]');
				casper.echo('Sub Category Does not Exists', 'INFO');
			}
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****Un-Pin any topic and Verify Pin icon under sub category page from moderator shield icon*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon under sub category page from moderator shield icon', 'INFO');
		this.click('#links-nav');
		this.click('li i.icon-right-dir');
		this.click('li a[href^="/?forum="]');
		this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
			if(this.exists('h3 a[href^="/?forum="]')) {
				this.click('h3 a[href^="/?forum="]');
				this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
					if(this.exists('span.alert-info')){
						var info = this.fetchText('span.alert-info');
						test.assertEquals(info.trim(), "This category doesn't have any topics yet.  Create a topic  to get this discussion started!", info.trim()+' info message is verified');
					} else { 
						this.waitForSelector('a span', function success() {
							var postTitle = json['pin/unPin'].topicTitle;
							casper.echo('unpin topic title : ' +postTitle, 'INFO');
							var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
							var href = this.getElementAttribute(classVal, "href");
							this.click('a[href="'+href+'"]');
							this.waitForSelector('a.dropdown-toggle i.icon-shield', function success() {
								test.assertExists('a.dropdown-toggle i.icon-shield');
								this.click('a.dropdown-toggle i.icon-shield');
								this.waitForSelector('a[href^="/mbactions/unpin?"]', function success() {
									this.click('a[href^="/mbactions/unpin?"]');
									casper.waitForSelector('span[id^="post_message_"]', function success() {
										this.thenOpen(config.url, function() {
											casper.echo('go to topic listing page : ');
										});
										//verify unPin topic
										this.waitForSelector('a[href^="/post/"]', function success() {
											var postTitle = json['pin/unPin'].topicTitle;
											var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
											var href = this.getElementAttribute(classVal, "href");
											test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
											casper.echo('unPin topic is verified', 'INFO');
											casper.echo('---------------------------------------------------------------------------');
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
						}, function fail() {
							casper.echo(err);
						});
					}
				}, function fail(err) {});
			} else {
				test.assertDoesntExist('h3 a[href^="/?forum="]');
				casper.echo('Sub Category Does not Exists');
			}
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****pin topic from Profile page and verify pin topic*****/
	casper.then(function() {
		casper.echo('pin topic from Profile page and verify pin topic', 'INFO');
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
						var postTitle = json['pin/unPin'].topicTitle;
						casper.echo('pin topic title : ' +postTitle, 'INFO');
						var classVal = x("//a[text()='"+postTitle+"']"); 
						var href = casper.getElementAttribute(classVal, "href");
						if(href) {
							href = href.split('-');
							var id = href[1].split('?');
							casper.mouse.move('#complete_post_' +id[0]);
							test.assertExists('div.post-body .panel-dropdown div.dropdown');
							this.click('div.post-body .panel-dropdown div.dropdown input[value="'+id[0]+'"]');
							this.test.assertExists('a[data-original-title="Pin/Un-Pin"]');
							casper.echo('---------------------------------------------------------------------------');
							this.click('a[data-original-title="Pin/Un-Pin"]');
							this.click('#pin');
							//verify pin topic
							casper.waitForSelector('span i.glyphicon-pushpin', function success() {
								var postTitle = json['pin/unPin'].topicTitle;
								casper.echo('pin topic title : ' +postTitle, 'INFO');
								test.assertExists(x("//a[text()='"+postTitle+"']/following::span/i")); 
								casper.echo('---------------------------------------------------------------------------');
								casper.echo('pin topic is verified', 'INFO');
								casper.echo('---------------------------------------------------------------------------');
							}, function fail(err) {
								casper.echo(err);
							});		
						} else {
							casper.echo('topic '+postTitle+' does not exists ', 'INFO');
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

	
	/*****un-pin topic from Profile page and verify un-pin topic*****/
	casper.then(function() {
		casper.echo('unPin topic from Profile page and verify unPin topic', 'INFO');
		if(this.exists('div.alert-info')){
			var warningMsg = this.fetchText('div.alert-info');
			test.assertEquals(warningMsg.trim(), json['pin/unPin'].warningMessage, warningMsg.trim()+' and verified warning message');
		} else {
			casper.waitForSelector('a[href^="/post/"]', function success() {
				var postTitle = json['pin/unPin'].topicTitle;
				casper.echo('un-pin topic title : ' +postTitle, 'INFO');
				var classVal = x("//a[text()='"+postTitle+"']"); 
				var href = casper.getElementAttribute(classVal, "href");
				if(href) {
					href = href.split('-');
					var id = href[1].split('?');
					casper.mouse.move('#complete_post_' +id[0]);
					test.assertExists('div.post-body .panel-dropdown div.dropdown');
					this.click('div.post-body .panel-dropdown div.dropdown input[value="'+id[0]+'"]');
					this.test.assertExists('a[data-original-title="Pin/Un-Pin"]');
					casper.echo('---------------------------------------------------------------------------');
					this.click('a[data-original-title="Pin/Un-Pin"]');
					this.click('#unpin');
					//verify un-pin topic
					casper.waitForSelector('a[href^="/post/"]', function success() {
						var postTitle = json['pin/unPin'].topicTitle;
						casper.echo('un-pin topic title : ' +postTitle, 'INFO');
						test.assertDoesntExist(x("//a[text()='"+postTitle+"']/following::span/i[@class='glyphicon-pushpin']")); 
						casper.echo('un-pin topic is verified', 'INFO');
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
	});

	/*****Add New topic by enable pin check box and verify unpin topic option on latest topic page*****/
	casper.then(function() {
		casper.echo('Add New topic by enable pin check box and verify unpin topic option on latest topic page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to topic listing page ','INFO');
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
					if(!err) {
						casper.echo('start new topic', 'INFO');
						casper.waitForSelector('#Pin', function success() {
							this.click('#Pin');
							this.click('#post_submit');
							this.waitForSelector('span[id^="post_message_"]', function success() {
								var url = this.getCurrentUrl();
								casper.echo('url : ' +url);
								url = url.split('#');
								href = url[0].split('.com');
								casper.echo('href : ' +href[1]);
								casper.thenOpen(config.url, function() {
									casper.echo('go to topic listing page to verify pin icon ', 'INFO');
									//verify pin icon from topic listion page
									casper.waitForSelector('form[name="posts"]', function success() {
										test.assertExists(x('//a[@href="'+href[1]+'"]/following::span/i'));
										casper.echo('pin topic is verified', 'INFO');
										casper.echo('---------------------------------------------------------------------------');
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

	/*****Add New topic by disabling pin check box and verify unpin topic  on latest topic page*****/
	casper.then(function() {
		casper.echo('Add New topic by disabling pin check box and verify unpin topic  on latest topic page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to latest topic page : ' +config.url, 'INFO');
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
					if(!err) {
						casper.echo('start new topic', 'INFO');
						casper.waitForSelector('#post_submit', function success() {
							casper.click('#post_submit');
							casper.waitForSelector('span[id^="post_message_"]', function success() {
								var url = this.getCurrentUrl();
								casper.echo('url : ' +url);
								url = url.split('#');
								href = url[0].split('.com');
								casper.echo('href : ' +href[1]);
								//verify pin icon is not showing on topic listion page
								casper.thenOpen(config.url, function() {
									casper.echo('go to topic listing page to verify pin icon ', 'INFO');
									casper.waitForSelector('form[name="posts"]', function success() {
										test.assertDoesntExist(x('//a[@href="'+href[1]+'"]/following::span/i[@class="glyphicon-pushpin"]'));
										casper.echo('unPin topic is verified', 'INFO');
										casper.echo('---------------------------------------------------------------------------');
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

	/*****Add New topic by enable pin check box and verify pin topic  on forum listing page*****/
	casper.then(function() {
		casper.echo('Add New topic by enable pin check box and verify pin topic  on forum listing page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to forum listing page : ','INFO');
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				this.click('a[href="/categories"]');
				this.waitForSelector('a[href="/post/printadd"]', function success() {
					gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
						if(!err) {
							casper.echo('start new topic', 'INFO');
							casper.waitForSelector('#Pin', function success() {
								this.click('#Pin');
								this.click('#post_submit');
								casper.waitForSelector('span[id^="post_message_"]', function success() {
									var url = this.getCurrentUrl();
									casper.echo('url : ' +url);
									url = url.split('#');
									href = url[0].split('.com');
									casper.echo('href : ' +href[1]);
									casper.thenOpen(config.url, function() {
										//verify pin icon from topic listion page
										casper.echo('go to topic listing page to verify pin icon ', 'INFO');
										casper.waitForSelector('form[name="posts"]', function success() {
											test.assertExists(x('//a[@href="'+href[1]+'"]/following::span/i'));
											casper.echo('pin topic is verified', 'INFO');
											casper.echo('---------------------------------------------------------------------------');
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
			}, function fail(err) {
				casper.echo(err);
			});
		});
	});

	/*****Add New topic by disabling pin check box and verify unpin topic  on forum listing page*****/
	casper.then(function() {
		casper.echo('Add New topic by disabling pin check box and verify unpin topic  on forum listing page', 'INFO');
		var href = "";
		this.thenOpen(config.url, function() {
			casper.echo('go to forum listing page : ', 'INFO');
			this.waitForSelector('a[href="/post/printadd"]', function success() {
				this.click('a[href="/categories"]');
				this.waitForSelector('a[href="/post/printadd"]', function success() {
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
									casper.echo('href : ' +href[1]);
									casper.thenOpen(config.url, function() {
										casper.echo('go to topic listing page to verify pin icon ', 'INFO');
										//verify pin icon is not showing on topic listion page
										casper.waitForSelector('form[name="posts"]', function success() {
											test.assertDoesntExist(x('//a[@href="'+href[1]+'"]/following::span/i[@class="glyphicon-pushpin"]'));
											casper.echo('unPin topic is verified', 'INFO');
											casper.echo('---------------------------------------------------------------------------');
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
			}, function fail(err) {
				casper.echo(err);
			});
		});		
	});

	/*****Add New topic by enable pin check box and verify unpin topic option on topic listing page for sub category topic *****/
	casper.then(function() {
		casper.echo('Add New topic by enable pin check box and verify unpin topic option on topic listing page for sub category topic ', 'INFO');
		var href = "";
		this.click('#links-nav');	
		this.waitForSelector('li i.icon-right-dir', function success() {
			this.click('li i.icon-right-dir');
			this.click('li a[href^="/?forum="]');
			this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
				if(this.exists('h3 a[href^="/?forum="]')) {
					this.click('h3 a[href^="/?forum="]');
					this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
						gotoNewTopic(json['newTopic'].ValidCredential, casper, function(err) {
							if(!err) {
								casper.echo('go to new topic', 'INFO');
								casper.waitForSelector('#Pin', function success() {
									this.click('#Pin');
									this.click('#post_submit');
									casper.waitForSelector('span[id^="post_message_"]', function success() {
										var url = this.getCurrentUrl();
										casper.echo('url : ' +url);
										url = url.split('#');
										href = url[0].split('.com');
										casper.echo('href : ' +href[1]);
										casper.thenOpen(config.url, function() {
											//verify pin icon from topic listion page
											casper.echo('go to topic listing page to verify pin icon ', 'INFO');
											casper.waitForSelector('form[name="posts"]', function success() {
												test.assertExists(x('//a[@href="'+href[1]+'"]/following::span/i'));
												casper.echo('pin topic is verified', 'INFO');
												casper.echo('---------------------------------------------------------------------------');
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
				} else {
					test.assertDoesntExist('h3 a[href^="/?forum="]');
					casper.echo('Sub Category does not exist', 'INFO');
				}
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err)
		});
	});

	/*****Add New topic by disabling un pin check box and verify pin topic option on topic listing page for sub category topic *****/
	casper.then(function() {
		casper.echo('Add New topic by disabling un pin check box and verify pin topic option on topic listing page for sub category topic ', 'INFO');
		var href = "";
		this.click('#links-nav');
		this.waitForSelector('li i.icon-right-dir', function success() {
			this.click('li i.icon-right-dir');
			this.click('li a[href^="/?forum="]');
			this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
				if(this.exists('h3 a[href^="/?forum="]')) {
					this.click('h3 a[href^="/?forum="]');
					this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
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
										casper.echo('href : ' +href[1]);
										casper.thenOpen(config.url, function() {
											//verify pin icon is not showing on topic listion page
											casper.echo('go to topic listing page to verify pin icon ', 'INFO');
											casper.waitForSelector('form[name="posts"]', function success() {
												test.assertDoesntExist(x('//a[@href="'+href[1]+'"]/following::span/i[@class="glyphicon-pushpin"]'));
												casper.echo('unPin topic is verified', 'INFO');
												casper.echo('---------------------------------------------------------------------------');
												//delete newely created topic
												deleteNewlyCreatedTopic(href[1], 'delete', casper, function() {
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
							}
						});
					}, function fail(err) {
						casper.echo(err);		
					});
				} else {
					test.assertDoesntExist('h3 a[href^="/?forum="]');
					casper.echo('Sub Category does not exist', 'INFO');
				}
			}, function fail(err) {
				casper.echo(err);
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****Pin any topic and Verify Pin icon of  topic listing page under sub category *****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of  topic listing page under sub category', 'INFO');
		this.click('#links-nav');
		this.waitForSelector('li i.icon-right-dir', function success() {
			this.click('li i.icon-right-dir');
			this.click('li a[href^="/?forum="]');
			this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
				if(this.exists('h3 a[href^="/?forum="]')) {
					this.click('h3 a[href^="/?forum="]');
					this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
						if(this.exists('span.alert-info')){
							var info = this.fetchText('span.alert-info');
							var ExpInfo = "This category doesn't have any topics yet.  Create a topic  to get this discussion started!";
							test.assertEquals(info.trim(), ExpInfo.trim(), info.trim()+' info message is verified');
						} else { 
					
							var postTitle = json['pin/unPin'].topicTitle;
							casper.echo('pin topic title : ' +postTitle, 'INFO');
							var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
							selectTopic(classVal, 'pin', 'Pin/Un-pin', casper, function(err) {
								if(!err) {
									casper.waitForSelector('a[href^="/post/"]', function success() {
										//verify pin topic
										var postTitle = json['pin/unPin'].topicTitle;
										var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
										var href = this.getElementAttribute(classVal, "href");
										test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
										casper.echo('pin topic is verified', 'INFO');
										casper.echo('---------------------------------------------------------------------------');
									}, function fail(err) {
										casper.echo(err);
									});
								}
							});
						}
					}, function fail(err) {
						casper.echo(err);
					});
				} else {
					test.assertDoesntExist('h3 a[href^="/?forum="]');
					casper.echo('Sub Category does not exist', 'INFO');
				}
			}, function fail(err) {
				casper.echo(err);		
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	

	/*****Un-Pin any topic and Verify Pin icon of  topic listing page under sub category*****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon of  topic listing page under sub category', 'INFO');
		this.click('#links-nav');
		this.waitForSelector('li i.icon-right-dir', function success() {
			this.click('li i.icon-right-dir');
			this.click('li a[href^="/?forum="]');
			this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
				if(this.exists('h3 a[href^="/?forum="]')) {
					this.click('h3 a[href^="/?forum="]');
					this.waitForSelector('a[href^="/post/printadd?forum="]', function success() {
						if(this.exists('span.alert-info')){
							var info = this.fetchText('span.alert-info');
							var ExpInfo = "This category doesn't have any topics yet.  Create a topic  to get this discussion started!";
							test.assertEquals(info.trim(), ExpInfo.trim(), info.trim()+' info message is verified');
						} else {
							var postTitle = json['pin/unPin'].topicTitle;
							casper.echo('unpin topic title : ' +postTitle, 'INFO');
							var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
							selectTopic(classVal, 'unpin', 'Pin/Un-pin', casper, function(err) {
								if(!err) {
									casper.waitForSelector('a[href^="/post/"]', function success() {
										//verify unPin topic
										var postTitle = json['pin/unPin'].topicTitle;
										var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
										var href = this.getElementAttribute(classVal, "href");
										test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
										casper.echo('unPin topic is verified', 'INFO');
										casper.echo('---------------------------------------------------------------------------');
									}, function fail(err) {
										casper.echo(err);
									});
								}
							});
						}
					}, function fail(err) {
						casper.echo(err);
					});
				} else {
					test.assertDoesntExist('h3 a[href^="/?forum="]');
					casper.echo('Sub Category does not exist', 'INFO');
				}
			}, function fail(err) {
				casper.echo(err);		
			});
		}, function fail(err) {
			casper.echo(err);
		});		
	});


	/*****Pin any topic and Verify Pin icon of  category search page *****/
	casper.then(function() {
		casper.echo('Pin any topic and Verify Pin icon of  category search page ', 'INFO');
		this.click('#links-nav');
		this.click('a[href="/latest"]');	
		casper.waitForSelector('a[href^="/post/"]', function success() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('pin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'pin', 'Pin/Un-pin', casper, function(err) {
				if(!err) {
					casper.waitForSelector('#inline_search_box', function success() {
						test.assertExists('#inline_search_box');
						this.click('#inline_search_box');
						this.sendKeys('#inline_search_box', json['pin/unPin'].topicTitle);
						this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
					}, function fail(err) {
						casper.echo(err);
					});
					//verify pin topic
					casper.waitForSelector('#search_posts_menu', function success() {
						var postTitle = json['pin/unPin'].topicTitle;
						var classVal = x("//a/b[text()='"+postTitle+"']/parent::a"); 
						var href = this.getElementAttribute(classVal, "href");
						test.assertExists(x('//a[@href="'+href+'"]/following::span/i'));
						casper.echo('pin topic is verified', 'INFO');
						casper.echo('---------------------------------------------------------------------------');
					}, function fail(err) {
						casper.echo(err);
					});
				}
			});
		}, function fail(err) {
			casper.echo(err);
		});
	});

	/*****Un-Pin any topic and Verify Pin icon of  category search page  *****/
	casper.then(function() {
		casper.echo('Un-Pin any topic and Verify Pin icon of  category search page ', 'INFO');
		this.click('#links-nav');
		this.click('a[href="/latest"]');
		casper.waitForSelector('a[href^="/post/"]', function success() {
			var postTitle = json['pin/unPin'].topicTitle;
			casper.echo('unpin topic title : ' +postTitle, 'INFO');
			var classVal = x("//a/span[text()='"+postTitle+"']/parent::a"); 
			selectTopic(classVal, 'unpin', 'Pin/Un-pin', casper, function(err) {
				if(!err) {
					casper.waitForSelector('#inline_search_box', function success() {
						test.assertExists('#inline_search_box');
						this.click('#inline_search_box');
						this.sendKeys('#inline_search_box', json['pin/unPin'].topicTitle);
						this.sendKeys('#inline_search_box', casper.page.event.key.Enter , {keepFocus: true});
						//verify unPin topic
						casper.waitForSelector('#search_posts_menu', function success() {
							var postTitle = json['pin/unPin'].topicTitle;
							var classVal = x("//a/b[text()='"+postTitle+"']/parent::a"); 
							var href = this.getElementAttribute(classVal, "href");
							test.assertDoesntExist(x('//a[@href="'+href+'"]/following::span/i[class="glyphicon-pushpin"]'));
							casper.echo('unPin topic is verified', 'INFO');
							casper.echo('---------------------------------------------------------------------------');
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

//method for select topic and click on dropdown
var selectTopic = function(topicVal, eleStatus, dropdownTitle, driver, callback) {
	var href = driver.getElementAttribute(topicVal, "href");
	href = href.split('-');
	var id = href[1].split('?');
	driver.click('input[value="'+id[0]+'"]');
	driver.waitForSelector('a[data-original-title="'+dropdownTitle+'"]', function success() {
		this.test.assertExists('a[data-original-title="'+dropdownTitle+'"]');
		casper.echo('---------------------------------------------------------------------------');
		this.click('a[data-original-title="'+dropdownTitle+'"]');
		this.test.assertExists('#' +eleStatus);
		casper.echo('---------------------------------------------------------------------------');
		this.click('#' +eleStatus);
	}, function fail(err) {
		casper.echo(err);
	});
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

// method for go to new poll to application

var gotoNewTopic = function(data, driver, callback) {
	driver.click('#links-nav');
	driver.click('#latest_topics_show');
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

