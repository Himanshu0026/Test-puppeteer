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
		casper.echo('Incontext Login while Like this post from Topic page ','INFO');
		wait.waitForElement('form[name="posts"] a.topic-title', casper , function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('form[name="posts"] a.topic-title');
				casper.click('form[name="posts"] a.topic-title');
				wait.waitForElement('i.glyphicon.glyphicon-like-alt', casper , function(err, isExists) {						
					casper.test.assertExists('i.glyphicon.glyphicon-like-alt');
					casper.click('i.glyphicon.glyphicon-like-alt');
					inContextLoginMethod.loginToApp(json['validInfo'].username, json['validInfo'].password, casper, function(err) {
						if (err) {
							casper.echo("Error occurred in callback user not logged-in", "ERROR");	
						}else {
							casper.echo('Processing to Login on forum.....', 'INFO');
							wait.waitForElement('ul.nav.pull-right span.caret', casper , function(err, isExists){
								if(isExists) {
									inContextLoginMethod.logoutFromApp(casper, function(err){
										if (!err)
											casper.echo('Successfully logout from application', 'INFO');
									});
								}
							});
						}
					});
				});
			}else {
				casper.echo('Topics not found on frontend element not found form[name="posts"] a.topic-title','ERROR');
			}
		});
	});
};









