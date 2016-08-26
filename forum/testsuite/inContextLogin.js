/****This script is dedicated for inContext login on the forum. It covers testing of inContext login page with all defined validations****/
'use strict';
var forumLogin = require('./forum_login.js');
var json = require('../testdata/inContextLogin.json');
var config = require('../config/config.json');

var inContextLogin = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'inContextLogin/';
/**************************All Fields Required Validation****************************/

inContextLogin.featureTest = function(casper, test) {

	//Open Forum Front End URL And Get Title 
	
	casper.start(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		
		/***********Incontext Login From Start New Topic ***************************/
		this.echo('Incontext Login From Start New Topic Register Link', 'INFO');
		
		//Clicking On Start New Topic Button
		this.waitForSelector('div#topics a[href="/post/printadd"]', function success() {
			this.click('div#topics a[href="/post/printadd"]');
			//Filling Valid Data On login Form
			loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
				if (err) {
					casper.echo("Error Occurred In Callback", "ERROR");
				} else {
					casper.echo('Processing to Login on forum.....', 'INFO');
					redirectToLogout(casper, test, function(err) {
						if (err) {
							casper.echo("Error Occurred In Callback", "ERROR");
						} else {
							casper.echo("User logged-out successfully", "INFO");
						}
					});
				}
			});
		}, function fail() {
			casper.echo("Error Occurred", "ERROR");
		});
	});
	
	/*******Incontext Login While Like This Topic From List Of Topics********/
	
	casper.thenOpen(config.url, function() {
		casper.echo('Incontext Login While Like This Topic From List Of Topics', 'INFO');
		
		//Clicking On 'Like' This Post Icon
		casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
			//test.assertExists('i.glyphicon.glyphicon-like-alt');
			this.click('i.glyphicon.glyphicon-like-alt');
		
			//Filling Valid Data On Login Form
			forumLogin.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
				if (err) {
					casper.echo("Error Occurred In Callback", "ERROR");
				} else {
					casper.echo('Processing to Login on forum.....', 'INFO');
					redirectToLogout(casper, test, function(err) {
						if (err) {
							casper.echo("Error Occurred In Callback", "ERROR");
						} else {
							/***********Incontext Login While Like Post From Topic Page************/
							casper.echo('Incontext Login While Like Post From Topic Page', 'INFO');
			
							//Clicking On Any Topic Present In The List
							test.assertExists('form[name="posts"] a.topic-title');
							casper.click('form[name="posts"] a.topic-title');
			
							//Clicking On 'Like' This Post Icon
							test.assertExists('i.glyphicon.glyphicon-like-alt');
							casper.click('i.glyphicon.glyphicon-like-alt');
			
							//Filling Valid Data On Login Form
							forumLogin.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
								if (err) {
									casper.echo("Error Occurred In Callback", "ERROR");
								} else {
									casper.echo('Processing to Login on forum.....', 'INFO');
									redirectToLogout(casper, test, function(err) {
										if (err) {
											casper.echo("Error Occurred In Callback", "ERROR");
										} else {
											casper.echo("User logged-out successfully", "INFO");
										}
									});
								}
							});
						}
					});
				}
			});
		}, function fail() {
			casper.echo("Error Occurred", "ERROR");
		});
	});
	
	/***********Incontext Login While Dislike Post From Topic Page************/
	casper.thenOpen(config.url, function() {
		casper.echo('Incontext Login While Dislike Post From Topic Page', 'INFO');
		
		//Clicking On Any Topic Present In The List
		casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
			//test.assertExists('form[name="posts"] a.topic-title');
			this.click('form[name="posts"] a.topic-title');
		
			//Clicking On 'Dislike' This Post Icon
			casper.waitForSelector('a.dislike_post.text-muted', function success() {
				test.assertExists('a.dislike_post.text-muted');
				this.click('a.dislike_post.text-muted');
				//Filling Valid Data On Login Form
				forumLogin.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error Occurred In Callback", "ERROR");
					} else {
						casper.echo('Processing to Login on forum.....', 'INFO');
						redirectToLogout(casper, test, function(err) {
							if (err) {
								casper.echo("Error Occurred In Callback", "ERROR");
							} else {
								casper.echo("User logged-out successfully", "INFO");
							}
						});
					}
				});
			}, function fail() {
				casper.echo("Error Occurred", "ERROR");
			});
		}, function fail() {
			casper.echo("There are currently no topics to display.", "INFO");
		});
	});
	
	/***********Incontext Login From Quote On Post From Post List************/
	casper.thenOpen(config.url, function() {
		casper.echo('Incontext Login From Quote On Post From Post List', 'INFO');
		
		//Clicking On Any Topic Present In The List
		//test.assertExists('form[name="posts"] a.topic-title');
		casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
			this.click('form[name="posts"] a.topic-title');
		
			//Clicking On 'Quote Link' Present In Post List
			casper.waitForSelector('a.text-muted.quote', function success() {
				this.click('a.text-muted.quote');

				//Filling Valid Data On Login Form
				forumLogin.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error Occurred In Callback", "ERROR");
					} else {
						casper.echo('Processing to Login on forum.....', 'INFO');
						redirectToLogout(casper, test, function(err) {
							if (err) {
								casper.echo("Error Occurred In Callback", "ERROR");
							} else {
								casper.echo("User logged-out successfully", "INFO");
							}
						});
					}
				});
			}, function fail() {
				casper.echo("Error Occurred", "ERROR");
			});
		}, function fail() {
			casper.echo("There are currently no topics to display.", "INFO");
		});
	});
	
	/***********Incontext Login From Vote On Post From Post List************/
	casper.thenOpen(config.url, function() {
		casper.echo('Incontext Login From Vote On Post From Post List', 'INFO');
		
		//Clicking On Any Topic Present In The List
		casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
			this.click('form[name="posts"] a.topic-title');
			//Clicking On 'create an account and log in' Link Present In Post List
			try {
				test.assertExists('a#guest_user_vote');
				this.click('a#guest_user_vote');
				this.echo('You have clicked on create an account and log-in link...', 'INFO');
			} catch(e) {
				test.assertDoesntExist('a#guest_user_vote');
				this.echo('You did not find create an account and log-in link...', 'INFO');
			}
			
			//Filling Valid Data On Login
			forumLogin.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
				if (err) {
					casper.echo("Error Occurred In Callback", "ERROR");
				} else {
					casper.echo('Processing to Login on forum.....', 'INFO');
					redirectToLogout(casper, test, function(err) {
						if (err) {
							casper.echo("Error Occurred In Callback", "ERROR");
						} else {
							casper.echo("User logged-out successfully", "INFO");
						}
					});
				}
			});
		}, function fail() {
			casper.echo("There are currently no topics to display.", "INFO");
		});
	});
	
	/***********Incontext New Registration From Message Mouse Mover Button************/
	/*casper.thenOpen(config.url, function() {
		casper.echo('Incontext Login From Message Mouse Mover Button', 'INFO');
	});
	
	//Clicking On 'Username' Link Against First Topic In The List
	
	casper.then(function() {
		test.assertExists('form[name="posts"] a[href^="/profile/"]');
		//this.click('form[name="posts"] a.username.usergroup946060');
		this.mouse.move('form[name="posts"] a.username.usergroup946060');
		this.waitUntilVisible('#guest_user_message', function(){
    			this.click('#guest_user_message');
		});
	});
		
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnMessage.png');
	});
	
	//Clicking On Top 'Register' Link 
	
	/*casper.then(function() {
		try {
			test.assertExists('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
			this.click('form[name="frmLogin"] div[role="alert"] a[href="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'registerLink.png');
				registerToApp(inContextRegisterJSON['usernameLink'], casper, function() {
					casper.echo('Processing to registration on forum.....', 'INFO');
				});
			});
		} catch(e) {
			test.assertExists('.pull-right a[href="/register/register"]');
			this.click('.pull-right a[href="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir + 'registerLink.png');
				forumRegister.registerToApp(inContextRegisterJSON['createAccount'], casper, function() {
					casper.echo('Processing to registration on forum.....', 'INFO');
				});
			});
		}
	});
	
	//Filling Valid Data On Login
	
	casper.then(function() {
		forumLogin.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
		});
	});

	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'login_submit.png');
	});
	
	//Handling Logout And Redirecting To The Respective Page
			
	casper.then(function() {
		redirectToLogout(casper, test, function() {});
	});*/
};


/************************************PRIVATE METHODS***********************************/


var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver) {
	driver.echo("errorMessage : " +errorMessage);
	driver.echo("expectedErrorMsg : " +expectedErrorMsg);
	driver.test.assertEquals(errorMessage.trim(), expectedErrorMsg);
	driver.capture(screenShotsDir + 'Error_RegisterWith' +msgTitle+ '.png');
};

var loginToApp = function(username, password, driver,callback) {
	try{	
		driver.test.assertExists('#td_tab_login');
		forumLogin.loginToApp(username, password, driver, function(){
			driver.echo("User "+username+" logged-in successfully.");
		});
	}catch(err){
		casper.echo("Exception is : "+err);
		forumLogin.logoutFromApp(driver, function(){
			driver.echo('Successfully logout from application', 'INFO');
			forumLogin.loginToApp(username, password, driver, function(){
				driver.echo("User "+username+" logged-in successfully.");
			});
		});
	};
	return callback(null);
};

//Logout To Forum Front End

var redirectToLogout = function(driver, test, callback) {
	try {
		test.assertExists('div.bmessage');
		var message = this.fetchText('div.bmessage');
		var successMsg = message.substring(0, message.indexOf('<'));
		var expectedSuccessMsg = json['validInfo'].expectedSuccessMsg;
		test.assertEquals(successMsg.trim(), expectedSuccessMsg.trim());
		driver.echo('Successfully done registration on forum.....', 'INFO');
		
		//Clicking On 'Back To Category' Link 

		casper.waitForSelector('a[href="/categories"]', function success() {
			test.assertExists('a[href="/categories"]');
			this.click('a[href="/categories"]');
			this.echo('Successfully back to category', 'INFO');
			forumLogin.logoutFromApp(driver, function(){
				driver.echo('Successfully logout from application', 'INFO');
			});
		}, function fail() {
			casper.echo("Error Occurred", "ERROR");
		});
	} catch(e) {
		try {
			test.assertExists('#registerEditProfile div[role="alert"]');
			var errorMessage = driver.fetchText('#registerEditProfile div[role="alert"]');
			var expectedErrorMsg = "Error: It looks like you already have a forum account!";
			test.assert(errorMessage.indexOf(expectedErrorMsg) > -1);
			driver.echo('USER ALREADY REGISTERED ON FORUM.....', 'INFO');
		} catch(e1) {
			driver.echo('Successfully done login on forum.....', 'INFO');
			
			//Click On Logout Link
			forumLogin.logoutFromApp(driver, function(){
				driver.echo('Successfully logout from application', 'INFO');
			});
		}
	}
	return callback(null);
};















