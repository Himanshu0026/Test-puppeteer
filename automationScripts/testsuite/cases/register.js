//'use strict';
var utils = require('../utils.js');
var forumLogin = require('../forum_login.js');
var json = require('../../testdata/registerData.json');
var config = require('../../../config/config.json');
var registerMethod = require('../methods/register.js');
var wait = require('../wait.js');
var registerTests=module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'register/';


/************************************PRIVATE METHODS***********************************/

	//Getting 'User Accounts' Field Valu If, Enabled, Then Filling Data For Testing
    registerTests.userAccountsEnable  = function() {
    casper.echo('Getting User Accounts Field Valu If, Enabled, Then Filling Data For Testing');
	casper.echo('********************************************');
		//Login To Forum BackEnd 
		registerMethod.loginToForumBackEnd(casper, casper.test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			//Clicking On "General" Tab Under Settings 
			wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper, function(err, isExist) {
				if(!err){
					if(isExist) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
						casper.test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
						casper.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
						casper.echo('Successfully open forum settings form.....', 'INFO');
						//Getting 'User Accounts' Field Value, If, Enabled, Then Filling Data For Testing
						wait.waitForElement('#REQreg', casper, function(err, isExist) {
							if(!err){
								if(isExist) {
									utils.enableorDisableCheckbox('REQreg', true, casper, function(err) {
										if (!err){
											casper.echo("User Accounts Checkbox Has Been Enabled For Registered User", 'INFO');
											casper.test.assertExists('.button.btn-m.btn-blue');
											casper.click('.button.btn-m.btn-blue');
											
										}	
									});	
								} else {
									casper.echo('User Accounts Checkbox Not Found', ERROR);
								}	
						    }
						});
					} else {
						casper.echo('Setting Link Not Found', ERROR);
					}
				}
			});
		});
        casper.thenOpen(config.url, function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			wait.waitForElement('.pull-right a[href="/register/register"]', casper, function(err, isExist) {
			    if(!err){
					if(isExist) {
						casper.test.assertExists('.pull-right a[href="/register/register"]');
						casper.click('.pull-right a[href="/register/register"]');
						casper.echo('Successfully open register form.....', 'INFO');
					} else {
						casper.echo('register Link Not Found', ERROR);
					}
				}
			});
		});
			
	}
	

	
	//test case for register to application by leaving blank username and verify error message
    registerTests.blankUsername = function() {
	casper.echo('test case for register to application by leaving blank username and verify error message');
	casper.echo('********************************************');
		registerMethod.registerToApp(json['blankUsername'], casper, function(err){
			if(!err) {
				casper.echo('register by leaving blank username and verify error message', 'INFO');
				casper.capture(screenShotsDir+ '1.png');
				wait.waitForElement('form[name="PostTopic"] input[name="member"]', casper, function(err, isExist){ 
					 if(!err){
						 if(isExist) {
							var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="member"]', 'data-original-title');
							errorMessage = errorMessage.trim();
							if(errorMessage && errorMessage!= '')
								registerMethod.verifyErrorMsg(errorMessage, 'Please enter a username.', 'blankUsername', casper, function() {});
						} else {
							casper.echo('postTopic form  Not Found', ERROR);
						}
					}
				});
			}
		});	
	   	
    }

	





