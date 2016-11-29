//'use strict';
var json = require('../../testdata/inContextLogin.json');
var config = require('../../../config/config.json');
var inContextLoginMethod = require('../methods/inContextLogin.js');
inContextLoginTests = module.exports = {};
var wait=require('../wait.js');

//Testcase Incontext login from Start New Topic button

inContextLoginTests.inContextLoginfrmStartTopic=function(){
	
	wait.waitForElement('div#topics a[href="/post/printadd"]', casper , function(err, isExists) {
		if(isExists) {
			casper.click('div#topics a[href="/post/printadd"]');
			inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
				if (err) {
					casper.echo("Error occurred in callback user not logged-in", "ERROR");
				}else {
					casper.echo('Processing to Login on forum.....', 'INFO');
					wait.waitForElement('div#topics a[href="/post/printadd"]', casper , function(err , isExists){
						if(isExists) {
							casper.test.assertExists('div#topics a[href="/post/printadd"]');
							casper.evaluate(function() {
								document.querySelector('div#topics a[href="/post/printadd"]').click();
							});
							inContextLoginMethod.logoutFromApp(casper, function(err){
								if (!err)
									casper.echo('Successfully logout from application', 'INFO');
							});
						}else {
							casper.echo('Starttopic button selector not found on frontend div#topics a[href="/post/printadd"','ERROR');
						}
					});
			        }
			 });
		}else {
			casper.echo('Start topic button selector not found div#topics a[href="/post/printadd','ERROR');
		}
	});
};

//Incontext Login while Like this post from Topic page 

inContextLoginTests.inContextLoginLikePostTopicPage=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('***************************Incontext Login while Like this post from Topic page****************************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		wait.waitForElement('form[name="posts"] a.topic-title', casper , function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('form[name="posts"] a.topic-title');
				casper.click('form[name="posts"] a.topic-title');
				wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper , function(err, isExists) { 						
					if(isExists) {
						casper.test.assertExists('i.glyphicon.glyphicon-like-alt');
						casper.click('i.glyphicon.glyphicon-like-alt');
						inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
							if (err) {
								casper.echo("Error occurred in callback user not logged-in", "ERROR");	
							}else {
								casper.echo('Processing to Login on forum.....', 'INFO');
								wait.waitForTime(1000 , casper , function(err){
									wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
										if(isExists) {
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										}else {
											casper.echo('Toggle selector not found after login ul.nav.pull-right span.caret','ERROR');
										}
									});
						    		});
							}
						});
					}else {
						casper.echo('Like selector not found i.glyphicon.glyphicon-like-alt','ERROR');
					}
				});
			}else {
				casper.echo('Topics not found on frontend element not found form[name="posts"] a.topic-title','ERROR');
			}
		});
	});
};

//Incontext Login while Dislike this post from Topic page

inContextLoginTests.inContextLoginDisLikePostTopicPage=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('*******************Incontext Login while Dislike this post from Topic page************************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		wait.waitForElement('form[name="posts"] a.topic-title', casper , function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('form[name="posts"] a.topic-title');
				casper.click('form[name="posts"] a.topic-title');	
				wait.waitForElement('a.dislike_post.text-muted', casper , function(err, isExists) {					
					if(isExists) {	
						casper.click('a.dislike_post.text-muted');
						inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
							if (err) {
								casper.echo("Error occurred in callback user not logged-in", "ERROR");	
							}else {
								casper.echo('Processing to Login on forum.....', 'INFO');
								wait.waitForTime(1000 , casper , function(err){
									wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
										if(isExists) {
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										}
									});
								});
							}	
						});
					}else {
						casper.echo('Dislike selector not found a.dislike_post.text-muted','ERROR');
					}
			
				});
			}else {
				casper.echo('Topics not found on frontend element not found form[name="posts"] a.topic-title','ERROR');
			}

		});
	});
};

//Incontext Login while Like this Topic from list of topics 

inContextLoginTests.inContextLoginLikeTopicHome=function(){
	casper.thenOpen(config.url, function() {	
		casper.echo('*********************Incontext Login while Like this Topic from list of topics*****************','INFO');	
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper , function(err, isExists) {					
			if(isExists) {
				casper.test.assertExists('i.glyphicon.glyphicon-like-alt');
				casper.click('i.glyphicon.glyphicon-like-alt');
				inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
					if (err) {
						casper.echo("Error occurred in callback user not logged-in", "ERROR");	
					}else {
						casper.echo('Processing to Login on forum.....', 'INFO');
						wait.waitForTime(1000 , casper , function(err){
							wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
								if(isExists) {
									inContextLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
											casper.echo('Successfully logout from application', 'INFO');
									});
									
								}else {
									casper.echo('Logout toggle selector not found ul.nav.pull-right span.caret','ERROR');
								}
							});
					   	 });
					}	
				});
			}else {
				casper.echo('Like post selector not found i.glyphicon.glyphicon-like-alt','ERROR');
			}
		});
	});
};

//Verify Forgot Password link on InContext Login popup
inContextLoginTests.inContextLoginForgotpassword=function(){
	casper.thenOpen(config.url, function() {
		casper.echo('*******************Verify Forgot Password link on InContext Login popup*******************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
		wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper , function(err, isExists) {	
			if(isExists){
				casper.click('i.glyphicon.glyphicon-like-alt');
				casper.evaluate(function() {
					document.querySelector('a[href="/register/lost_pw"]').click();
				});
			}else {
				casper.echo('Like post selector not found i.glyphicon.glyphicon-like-alt','ERROR');
			}
		});
	});
};

//inContext Login from vote on post from post list 

inContextLoginTests.inContextLoginVoteOnpost=function(){
	casper.thenOpen(config.url, function() {	
		casper.echo('*********************inContext Login from vote on post from post list *****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');
	   	wait.waitForElement('form[name="posts"] a.topic-title', casper , function(err, isExists) {
			if(isExists) {
				casper.click('form[name="posts"] a.topic-title');		
				wait.waitForElement('a.dislike_post.text-muted', casper , function(err, isExists){
					if(isExists) {
						try {
							casper.click('textarea#message');
							wait.waitForTime(1000 , casper , function(err){
								wait.waitForElement('input#reply_submit.pull-left.btn.btn-uppercase.btn-primary', casper , function(err, isExists){
									if(isExists) {
										wait.waitForElement('a[href="#form-dialog"]', casper, function(err){
											casper.test.assertExists('a[href="#form-dialog"]');
											casper.click('a[href="#form-dialog"]');
											casper.echo('You have clicked on create an account and log-in link...', 'INFO');
											inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
												if (err) {
													casper.echo("Error occurred in callback user not logged-in", "ERROR");	
												}else {
													casper.echo('Processing to Login on forum.....', 'INFO');
													wait.waitForTime(1000 , casper, function(){	
														wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
															if(isExists) {
															inContextLoginMethod.logoutFromApp(casper, function(err){
																	if (!err)
																		casper.echo('Successfully logout from application', 'INFO');
																	});
															}else {
																casper.echo('Logout toggle selector not found ul.nav.pull-right span.caret','ERROR');
															}		
														});
						   					 		});
												}	
											});
										});
									}else {
										casper.echo('Post button not found topics post page','ERROR');
									}
								});
							});
						}catch(e) {
							casper.test.assertDoesntExist('a#guest_user_vote');
							casper.echo('You did not find create an account and log-in link...', 'INFO');
						}
					}else {
						casper.echo('dislike post selector not found a.dislike_post.text-muted','ERROR');
					}
				});
			}
		});
	});
};

//inContext Login from Quote on post from post list 

inContextLoginTests.inContextLoginQuote=function(){
	casper.thenOpen(config.url, function() {		
		casper.echo('*********************inContext Login from Quote on post from post list*****************','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');	
		wait.waitForElement('form[name="posts"] a.topic-title', casper , function(err, isExists) {
			if(isExists) {	
				casper.click('form[name="posts"] a.topic-title');
				wait.waitForElement('a.text-muted.quote', casper , function(err, isExists){	
					if(isExists) {
						casper.evaluate(function() {
							document.querySelector('a.text-muted.quote').click();
						});
						casper.test.assertExists('a[href="#form-dialog"]');
						casper.click('a[href="#form-dialog"]');
						inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
							if (err) {
								casper.echo("Error occurred in callback user not logged-in", "ERROR");	
							}else {
								casper.echo('Processing to Login on forum.....', 'INFO');
								wait.waitForTime(1000 , casper, function(){	
									wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
										if(isExists) {
																				inContextLoginMethod.logoutFromApp(casper, function(err){
											if (!err)
												casper.echo('Successfully logout from application', 'INFO');
											});
										}else {
											casper.echo('Logout toggle selector not found ul.nav.pull-right span.caret','ERROR');
										}		
									});
						   		});
							}	
						});
					}else {
						casper.echo('quote selector not found on post topic page','ERROR');
					}
				});
			}else {
				casper.echo('Topics not found on frontend element not found form[name="posts"] a.topic-title','ERROR');
			}
		});
	});
};

//inContext Login from Email button on Profile view screen of any user

inContextLoginTests.inContextLoginEmailButton=function(){
	casper.thenOpen(config.url, function() {		
		casper.echo('***********inContext Login from Email button on Profile view screen of any user**********','INFO');
		casper.echo("Title of the page :"+this.getTitle(), 'INFO');		
		wait.waitForElement('a[href="/profile/24525197"]', casper , function(err, isExists) {
			if(isExists) {	
				casper.evaluate(function() {
					document.querySelector('a[href="/profile/24525197"]').click();
				});	
				wait.waitForElement('a#send_email', casper ,function(err , isExists) {
					if(isExists) {
						casper.evaluate(function() {
							document.querySelector('a#send_email').click();
						});
						inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
							if (err) {
								casper.echo("Error occurred in callback user not logged-in", "ERROR");	
							}else {
								casper.echo('Processing to Login on forum.....', 'INFO');
								wait.waitForTime(1000 , casper , function(err){
									wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
										if(isExists) {
											inContextLoginMethod.logoutFromApp(casper, function(err){
												if (!err)
													casper.echo('Successfully logout from application', 'INFO');
											});
										}else {
											casper.echo('Toggle button selector not found on frontend','ERROR');
										}
									});
						    		});
							}
						});
					}else {
						casper.echo('Email button selector not found on user profile page a#send_email','ERROR');
					}
				});
			}else {
				casper.echo('user hs1234 not found a[href="/profile/24525197"]','ERROR');
			}
		});
	});
};
