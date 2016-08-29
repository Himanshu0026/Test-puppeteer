/****This script is dedicated for View Category Permission on the forum. It covers testing of all defined validations****/
'use strict';
var utils = require('./utils.js');
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');
var topicJSON = require('../testdata/topic.json');

var verifyCategoryPermissions = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'verifyCategoryPermissions/';

/**************************All Fields Required Validation****************************/

verifyCategoryPermissions.featureTest = function(casper, test) {
	
	casper.echo('                                      CASE 1', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	casper.echo('DISABLE VIEW CATEGORY FOR REGISTERED USER FROM GROUP PERMISSION', 'INFO');
	casper.echo('CHECK PERMISSION TO VIEW CATEGORY AFTER DISABLEING PERMISSION FOR REGISTERED USER', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	
	//Login To Forum BackEnd 
	casper.start(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			
			//Clicking On "General" Tab Under Settings
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function success() {
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=Display"]');
				this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Display"]');
				this.echo('Successfully open forum settings form.....', 'INFO');
				
				//Getting 'Show Private Forums' Field Value
				casper.waitForSelector('#show_private_forums', function success() {
					test.assertExists('#show_private_forums');
					utils.enableorDisableCheckbox('show_private_forums', false, casper, function() {
						casper.echo("Show Private Forums Has Been Disabled For Registered User", 'INFO');
						test.assertExists('.button.btn-m.btn-blue');
						casper.click('.button.btn-m.btn-blue');
						
						//Clicking On 'Group Permissions' Link Under 'Users' Tab 
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
						casper.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
					});
				}, function fail() {
					this.echo('ERROR OCCURRED', 'ERROR');
				}); 
			}, function fail() {
				this.echo('ERROR OCCURRED', 'ERROR');
			}); 
		});
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Registered Users') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		casper.click('a[href="'+grpName+'"]');
		
		//Disabling 'View Category' Option And 'Save'
		casper.waitForSelector('#view_forum', function success() {
			utils.enableorDisableCheckbox('view_forum', false, casper, function() {
				casper.echo("View Category Checkbox Has Been Disabled For Registered User", 'INFO');
				casper.click('button.button.btn-m.btn-blue');
				
				//Verifying 'Success Message' After Saving Settings	
				casper.waitForSelector('div#tab_wrapper .heading[color="red"]', function success() {
					var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedErrorMsg = 'Your user group settings have been updated.';
					test.assertEquals(message, expectedErrorMsg);
					test.assertExists('a[href="/tool/members/login?action=logout"]');
					casper.click('a[href="/tool/members/login?action=logout"]');
					
					// start from forum url
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						
						//Login To App
						forumLogin.loginToApp('100', '1234', casper, function() {
							casper.echo('User logged-in successfully', 'INFO');
							
							//Clicking On 'Categories' Tab
							test.assertExists('a[href="/categories"]');
							casper.click('a[href="/categories"]');
							
							//Verifying 'Error Messages' And Then Logout From Application
							casper.waitForSelector('span.alert.alert-info p', function success() {
								var message = casper.fetchText('span.alert.alert-info p');
								var expectedMsg = 'There are currently no categories to display.';
								test.assertEquals(message, expectedMsg);
								forumLogin.logoutFromApp(casper, function() {
									casper.echo('Successfully logout from application', 'INFO');
								});
							}, function fail() {
								this.echo('ERROR OCCURRED', 'ERROR');
							});
						});
					});
				}, function fail() {
					this.echo('ERROR OCCURRED', 'ERROR');
				});
			});
		}, function fail() {
			this.echo('ERROR OCCURRED', 'ERROR');
		});
	});
	
	//Login To Forum BackEnd 
	/*casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE VIEW CATEGORY FOR  UN-REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO VIEW CATEGORY AFTER DISABLEING PERMISSION FOR UN-REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			
			//Clicking On 'Group Permissions' Link Under 'Users' Tab 
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function success() {
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			}, function fail() {
				this.echo('ERROR OCCURRED', 'ERROR');
			});
		});
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Un-Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Unregistered / Not Logged In') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		casper.click('a[href="'+grpName+'"]');
		
		//Disabling 'View Category' Option And 'Save'
		casper.waitForSelector('#view_forum', function success() {
			utils.enableorDisableCheckbox('view_forum', false, casper, function() {
				casper.echo("View Category Checkbox Has Been Disabled For Un-Registered User", 'INFO');
				casper.click('button.button.btn-m.btn-blue');
				
				//Verifying 'Success Message' After Saving Settings
				casper.waitForSelector('div#tab_wrapper .heading[color="red"]', function success() {	
					var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedErrorMsg = 'Your user group settings have been updated.';
					test.assertEquals(message, expectedErrorMsg);
					test.assertExists('a[href="/tool/members/login?action=logout"]');
					casper.click('a[href="/tool/members/login?action=logout"]');
					
					// start from forum url
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						
						//Clicking On 'Categories' Tab
						test.assertExists('a[href="/categories"]');
						this.click('a[href="/categories"]');
						
						//Verifying 'Error Messages' And Then Logout From Application
						casper.waitForSelector('span.alert.alert-info p', function success() {
							var message = this.fetchText('span.alert.alert-info p');
							var expectedMsg = 'There are currently no categories to display.';
							test.assertEquals(message, expectedMsg);
						}, function fail() {
							this.echo('ERROR OCCURRED', 'ERROR');
						});
					});
				}, function fail() {
					this.echo('ERROR OCCURRED', 'ERROR');
				});
			});
		}, function fail() {
			this.echo('ERROR OCCURRED', 'ERROR');
		});
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE VIEW CATEGORY FOR  PENDING EMAIL VERIFICATION USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO VIEW CATEGORY AFTER DISABLEING PERMISSION FOR PENDING EMAIL VERIFICATION USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			
			//Clicking On 'Group Permissions' Link Under 'Users' Tab 
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function success() {
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			}, function fail() {
				this.echo('ERROR OCCURRED', 'ERROR');
			});
		});
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Pending Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Pending Email Verification') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		casper.click('a[href="'+grpName+'"]');
		
		//Disabling 'View Category' Option And 'Save'
		casper.waitForSelector('#view_forum', function success() {
			utils.enableorDisableCheckbox('view_forum', false, casper, function() {
				casper.echo("View Category Checkbox Has Been Disabled For Pending User", 'INFO');
				casper.click('button.button.btn-m.btn-blue');
				
				//Verifying 'Success Message' After Saving Settings
				casper.waitForSelector('div#tab_wrapper .heading[color="red"]', function success() {
					var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedErrorMsg = 'Your user group settings have been updated.';
					test.assertEquals(message, expectedErrorMsg);
					test.assertExists('a[href="/tool/members/login?action=logout"]');
					this.click('a[href="/tool/members/login?action=logout"]');
					
					//start from forum url
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						
						//Login To App
						forumLogin.loginToApp('90', '1234', casper, function() {
							casper.echo('User logged-in successfully', 'INFO');
							
							//Clicking On 'Categories' Tab
							test.assertExists('a[href="/categories"]');
							casper.click('a[href="/categories"]');
							
							//Verifying 'Error Messages' And Then Logout From Application
							casper.waitForSelector('span.alert.alert-info p', function success() {
								var message = casper.fetchText('span.alert.alert-info p');
								var expectedMsg = 'There are currently no categories to display.';
								test.assertEquals(message, expectedMsg);
							}, function fail() {
								this.echo('ERROR OCCURRED', 'ERROR');
							});
						});
					});
				}, function fail() {
					this.echo('ERROR OCCURRED', 'ERROR');
				});
			});
		}, function fail() {
			this.echo('ERROR OCCURRED', 'ERROR');
		});
	});

	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE START TOPICS FOR REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO START TOPICS AFTER DISABLEING PERMISSION FOR REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			
			//Clicking On 'Group Permissions' Link Under 'Users' Tab 
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function success() {
				test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				casper.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			}, function fail() {
				this.echo('ERROR OCCURRED', 'ERROR');
			});
		});
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Registered Users') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		casper.click('a[href="'+grpName+'"]');
		
		//Disabling 'Start Topics' Option And 'Save'
		casper.waitForSelector('#post_threads', function success() {
			utils.enableorDisableCheckbox('post_threads', false, casper, function() {
				casper.echo("Start Topic Checkbox Has Been Disabled For Registered User", 'INFO');
				casper.click('button.button.btn-m.btn-blue');
				
				//Verifying 'Success Message' After Saving Settings
				casper.waitForSelector('div#tab_wrapper .heading[color="red"]', function success() {
					var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedErrorMsg = 'Your user group settings have been updated.';
					test.assertEquals(message, expectedErrorMsg);
					test.assertExists('a[href="/tool/members/login?action=logout"]');
					casper.click('a[href="/tool/members/login?action=logout"]');
					
					// start from forum url
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						
						//Login To App
						forumLogin.loginToApp('100', '1234', casper, function() {
							casper.echo('User Logged-In Successfully', 'INFO');
							
							casper.click('a[href="/post/printadd"]');
							
							//Verifying 'Error Messages' And Then Logout From Application
							casper.waitForSelector('div.alert.alert-info.text-center', function success() {
								var message = casper.fetchText('div.alert.alert-info.text-center');
								var expectedMsg = "Sorry! You don't have permission to perform this action.";
								test.assert(message.indexOf(expectedMsg) > -1);
								forumLogin.logoutFromApp(casper, function() {
									casper.echo('Successfully Logout From Application', 'INFO');
								});
							}, function fail() {
								this.echo('ERROR OCCURRED', 'ERROR');
							});
						});
					});
				}, function fail() {
					this.echo('ERROR OCCURRED', 'ERROR');
				});
			});
		}, function fail() {
			this.echo('ERROR OCCURRED', 'ERROR');
		});
	});

	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 5', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE START TOPICS FOR  UN-REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO START TOPICS AFTER DISABLEING PERMISSION FOR UN-REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			
			//Clicking On 'Group Permissions' Link Under 'Users' Tab 
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function success() {
				test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				casper.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			}, function fail() {
				this.echo('ERROR OCCURRED', 'ERROR');
			});
		});
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Un-Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Unregistered / Not Logged In') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		
		//Disabling 'Start Topics' Option And 'Save'
		casper.waitForSelector('#post_threads', function success() {
			utils.enableorDisableCheckbox('post_threads', false, casper, function() {
				casper.echo("Start Topic Checkbox Has Been Disabled For Un-Registered User", 'INFO');
				casper.click('button.button.btn-m.btn-blue');
				
				//Verifying 'Success Message' After Saving Settings
				casper.waitForSelector('div#tab_wrapper .heading[color="red"]', function success() {
					var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedErrorMsg = 'Your user group settings have been updated.';
					test.assertEquals(message, expectedErrorMsg);
					test.assertExists('a[href="/tool/members/login?action=logout"]');
					this.click('a[href="/tool/members/login?action=logout"]');
					
					// start from forum url
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						this.click('a[href="/post/printadd"]');
						
						//Verifying 'Error Messages' And Then Logout From Application
						casper.waitForSelector('div.alert.alert-info.text-center', function success() {
							var message = this.fetchText('div.alert.alert-info.text-center');
							var expectedMsg = "Please login or register";
							test.assert(message.indexOf(expectedMsg) > -1);
						}, function fail() {
							this.echo('ERROR OCCURRED', 'ERROR');
						});
					});
				}, function fail() {
					this.echo('ERROR OCCURRED', 'ERROR');
				});
			});
		}, function fail() {
			this.echo('ERROR OCCURRED', 'ERROR');
		});
	});
		
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('ENABLE START TOPICS FOR  UN-REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO START TOPICS AFTER ENABLEING PERMISSION FOR UN-REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			
			//Clicking On 'Group Permissions' Link Under 'Users' Tab 
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function success() {
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			}, function fail() {
				this.echo('ERROR OCCURRED', 'ERROR');
			});
		});
	});

	//Clicking On 'Change Permissions' Link With Respect To 'Un-Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function() {
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Unregistered / Not Logged In') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		
		//Enabling 'Start Topics' Option And 'Save'
		casper.waitForSelector('#post_threads', function success() {
			utils.enableorDisableCheckbox('view_forum', true, casper, function() {
				casper.echo("View Category Checkbox Has Been Enabled For Un-Registered User", 'INFO');
				utils.enableorDisableCheckbox('post_threads', true, casper, function() {
					casper.echo("Start Topic Checkbox Has Been Enabled For Un-Registered User", 'INFO');
					casper.click('button.button.btn-m.btn-blue');
					
					//Verifying 'Success Message' After Saving Settings	
					casper.waitForSelector('div#tab_wrapper .heading[color="red"]', function success() {
						var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
						var expectedErrorMsg = 'Your user group settings have been updated.';
						test.assertEquals(message, expectedErrorMsg);
						test.assertExists('a[href="/tool/members/login?action=logout"]');
						this.click('a[href="/tool/members/login?action=logout"]');
						
						// start from forum url
						casper.thenOpen(config.url, function() {
							this.echo('Title of the page :' +this.getTitle(), 'INFO');
							
							test.assertExists('a[href="/post/printadd"]');
							this.click('a[href="/post/printadd"]');
							
							//Verifying 'Topic Details' Page
							casper.waitForSelector('form[id="PostTopic"]', function success() {
								test.assertExists('form[id="PostTopic"]');
								this.echo('POST TOPIC PAGE DISPLAYED................', 'INFO');
							}, function fail() {
								this.echo('ERROR OCCURRED', 'ERROR');
							});
						});
					}, function fail() {
						this.echo('ERROR OCCURRED', 'ERROR');
					});
				});
			});
		}, function fail() {
			this.echo('ERROR OCCURRED', 'ERROR');
		});
	});*/
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		casper.echo('                                      CASE 7', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE START TOPICS FOR PENDING EMAIL VERIFICATION USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO START TOPICS AFTER DISABLEING PERMISSION FOR PENDING EMAIL VERIFICATION USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
			
			//Clicking On 'Group Permissions' Link Under 'Users' Tab 
			casper.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function success() {
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			}, function fail() {
				this.echo('ERROR OCCURRED', 'ERROR');
			});
		});
	});

	//Clicking On 'Change Permissions' Link With Respect To 'Pending Email Verification'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Pending Email Verification') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		
		//Disabling 'Start Topics' Option And 'Save'
		casper.waitForSelector('#post_threads', function success() {
			utils.enableorDisableCheckbox('post_threads', false, casper, function() {
				casper.echo("Start Topic Checkbox Has Been Disabled For Pending User", 'INFO');
				casper.click('button.button.btn-m.btn-blue');
				
				//Verifying 'Success Message' After Saving Settings
				casper.waitForSelector('div#tab_wrapper .heading[color="red"]', function success() {
					var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedErrorMsg = 'Your user group settings have been updated.';
					test.assertEquals(message, expectedErrorMsg);
					test.assertExists('a[href="/tool/members/login?action=logout"]');
					this.click('a[href="/tool/members/login?action=logout"]');
					
					// start from forum url
					casper.thenOpen(config.url, function() {
						this.echo('Title of the page :' +this.getTitle(), 'INFO');
						
						//Login To App
						forumLogin.loginToApp('90', '1234', casper, function() {
							//casper.wait(5000, function() {
							casper.echo('User logged-in successfully', 'INFO');
							
							//Clicking On 'Start New Topic' Tab
							test.assertExists('a[href="/post/printadd"]');
							casper.click('a[href="/post/printadd"]');
							
							//Verifying 'Error Messages' And Then Logout From Application
							casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {casper.echo('success', 'INFO');
							casper.capture(screenShotsDir + '1.png');
								var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
								var expectedMsg = "Sorry! You don't have permission to perform this action. Please check your email for instructions on how to begin using your account. You can resend the email if you didn't receive it.";
								test.assert(message.indexOf(expectedMsg) > -1);
								forumLogin.logoutFromApp(casper, function() {
									casper.echo('Successfully Logout From Application', 'INFO');
								});
							}, function fail() {casper.echo('fail', 'INFO');
								casper.capture(screenShotsDir + '1.png');
								this.echo('ERROR OCCURRED', 'ERROR');
							});
							//});
						});
					});
					
					
				}, function fail() {
					this.echo('ERROR OCCURRED', 'ERROR');
				});
			});
		}, function fail() {
			this.echo('ERROR OCCURRED', 'ERROR');
		});
	});

		
	/*casper.then(function() {
		casper.echo('                                      CASE 8', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('ENABLE START TOPICS FOR PENDING EMAIL VERIFICATION USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO START TOPICS AFTER ENABLEING PERMISSION FOR PENDING EMAIL VERIFICATION USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Pending Email Verification'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Pending Email Verification') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_Pending_Email_Verification.png');
		});
	});

	//Enabling 'Start Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#post_threads');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Pending User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_threads', true, casper, function() {
			casper.echo("Start Topic Checkbox Has Been Disabled For Pending User", 'INFO');
		});
	});
	
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
		
	// start from forum url
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('90', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
			});
		});
	});

	//Clicking On 'Start New Topic' Tab
	casper.then(function() {
		test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
	});

	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'Pending_Email_Verification_topics.png');
	});

	//Verifying 'Topic Details' Page
	casper.then(function() {
		test.assertExists('form[id="PostTopic"]');
		this.echo('POST TOPIC PAGE DISPLAYED................', 'INFO');
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 9', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE REPLY TOPICS FOR REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO REPLY TOPICS AFTER DISABLEING PERMISSION FOR REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});
	
	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
	
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Registered Users') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		casper.click('a[href="'+grpName+'"]');
		casper.wait(5000,function(){
			this.capture(screenShotsDir + 'group_Registered.png');
		});
	});
	
	//Disabling 'Reply Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#other_post_replies');
		test.assertExists('#post_replies');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_replies', false, casper, function() {
			casper.echo("Reply Topic Checkbox Has Been Disabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('other_post_replies', false, casper, function() {
			casper.echo("Reply Own Topic Checkbox Has Been Disabled For Registered User", 'INFO');
		});
	});
		
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
		
	// start from forum url
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.echo('User Has Been Successfuly Login To Application With Register User', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 
	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});

	// post reply on own Topics when permission false	
	casper.then(function(){
		this.click('form[name="posts"] h4 a');
		this.wait(5000,function(){
			test.assertDoesntExist('#message');
			this.echo('Registered User Dont Have Permission To Reply Post On Own Topic', 'INFO');
		});
	});
		
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link
	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});

	casper.then(function() {
		casper.echo('                                      CASE 10', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE REPLY TOPICS FOR  UN-REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO REPLY TOPICS AFTER DISABLEING PERMISSION FOR UN-REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});
	
	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
	
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
		
	//Clicking On 'Change Permissions' Link With Respect To 'Un-Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Unregistered / Not Logged In') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_un-registered.png');
		});
	});
	
	//Disabling 'Reply Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#other_post_replies');
		test.assertExists('#post_replies');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Un-Registered User", 'INFO');
		});
	}); 
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_replies', false, casper, function() {
			casper.echo("Reply Topic Checkbox Has Been Disabled For Un-Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('other_post_replies', false, casper, function() {
			casper.echo("Reply Own Topic Checkbox Has Been Disabled For Un-Registered User", 'INFO');
		});
	});
		
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});	
	
	// start from forum url
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	// post reply on own Topics when permission false	
	casper.then(function(){
		this.click('form[name="posts"] h4 a');
		this.wait(5000,function(){
			test.assertDoesntExist('#message');
			this.echo('Un-Registered User Dont Have Permission To Reply Post On Own Topic', 'INFO');
		});	
	});
	
	/*casper.then(function() {
		casper.echo('                                      CASE 11', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('ENABLE REPLY TOPICS FOR  UN-REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO REPLY TOPICS AFTER ENABLEING PERMISSION FOR UN-REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
		
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Un-Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function() {
			for(var i=1; i<=7; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Unregistered / Not Logged In') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_un-registered.png');
		});
	});
	
	//Enabling 'Reply Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#other_post_replies');
		test.assertExists('#post_replies');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Un-Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_replies', true, casper, function() {
			casper.echo("Reply Topic Checkbox Has Been Enabled For Un-Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('other_post_replies', true, casper, function() {
			casper.echo("Reply Own Topic Checkbox Has Been Enabled For Un-Registered User", 'INFO');
		});
	});
		
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Sstart From Forum URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	// post reply on own Topics when permission true	
	casper.then(function(){
		this.click('form[name="posts"] h4 a');
		this.wait(5000,function(){
			test.assertExists('#reply_submit');
			this.echo('Un-Registered User Have Permission To Reply Post On Topic', 'INFO');	
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 12', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE REPLY TOPICS FOR PENDING EMAIL VERIFICATION USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO REPLY TOPICS AFTER DISABLEING PERMISSION FOR PENDING EMAIL VERIFICATION USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Pending Email Verification'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Pending Email Verification') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_Pending_Email_Verification.png');
		});
	});

	//Disabling 'Reply Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#other_post_replies');
		test.assertExists('#post_replies');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Pending User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_replies', false, casper, function() {
			casper.echo("Reply Topic Checkbox Has Been Disabled For Pending User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('other_post_replies', false, casper, function() {
			casper.echo("Reply Own Topic Checkbox Has Been Disabled For Pending User", 'INFO');
		});
	});
		
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('90', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	// post reply on others Topic when permission false	
	casper.then(function(){
		this.click('form[name="posts"] h4 a');
		this.wait(5000,function(){
			test.assertDoesntExist('#message');
			this.echo('Pending User Do Not Have Permission To Reply Post On Topic', 'INFO');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 13', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('ENABLE REPLY TOPICS FOR PENDING EMAIL VERIFICATION USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO REPLY TOPICS AFTER ENABLEING PERMISSION FOR PENDING EMAIL VERIFICATION USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Pending Email Verification'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Pending Email Verification') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_Pending_Email_Verification.png');
		});
	});

	//Enabling 'Reply Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#other_post_replies');
		test.assertExists('#post_replies');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Pending User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_replies', true, casper, function() {
			casper.echo("Reply Topic Checkbox Has Been Enabled For Pending User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('other_post_replies', true, casper, function() {
			casper.echo("Reply Own Topic Checkbox Has Been Enabled For Pending User", 'INFO');
		});
	});
		
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('90', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	// post reply on others Topic when permission false	
	casper.then(function(){
		this.click('form[name="posts"] h4 a');
		this.wait(5000,function(){
			test.assertExists('#message');
			this.echo('Pending User Have Permission To Reply Post On Topic', 'INFO');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 14', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE UPLOAD ATTACHMENTS AND ENABLE START TOPICS FOR REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO UPLOAD ATTACHMENTS AND START TOPICS AFTER DISABLING/ENABLEING PERMISSION FOR REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Registered Users') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_registered_user.png');
		});
	});

	//Disabling 'Upload Attachments' And Enabling 'Start Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#post_threads');
		test.assertExists('#upload_attachments');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_threads', true, casper, function() {
			casper.echo("Start Topic Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('upload_attachments', false, casper, function() {
			casper.echo("Upload Attachments Checkbox Has Been Disabled For Registered User", 'INFO');
		});
	});
		
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	//Clicking On 'Start New Topic' Tab
	casper.then(function() {
		test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
		this.wait(5000, function() {
			test.assertDoesntExist('#message-options a#insert_image_dialog_');
			test.assertDoesntExist('#message-options a#fancy_attach_');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 15', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('ENABLE UPLOAD ATTACHMENTS AND START TOPICS FOR REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO UPLOAD ATTACHMENTS AND START TOPICS AFTER ENABLEING PERMISSION FOR REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Registered Users') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_registered_user.png');
		});
	});

	//Enabling 'Upload Attachments' And 'Start Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#post_threads');
		test.assertExists('#upload_attachments');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_threads', true, casper, function() {
			casper.echo("Start Topic Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('upload_attachments', true, casper, function() {
			casper.echo("Upload Attachments Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	//Clicking On 'Start New Topic' Tab
	casper.then(function() {
		test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
		this.wait(5000, function() {
			test.assertExists('#message-options a#insert_image_dialog_');
			test.assertExists('#message-options a#fancy_attach_');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 16', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE UPLOAD ATTACHMENTS AND ENABLE REPLY TOPICS FOR REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO UPLOAD ATTACHMENTS AND REPLY TOPICS AFTER DISABLING/ENABLEING PERMISSION FOR REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Registered Users') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_registered_user.png');
		});
	});

	//Disabling 'Upload Attachments' And Enabling 'Reply Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#other_post_replies');
		test.assertExists('#upload_attachments');
		test.assertExists('#post_replies');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('other_post_replies', true, casper, function() {
			casper.echo("Reply Other Topic Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('upload_attachments', false, casper, function() {
			casper.echo("Upload Attachments Checkbox Has Been Disabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_replies', true, casper, function() {
			casper.echo("Reply Own Topic Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	//Clicking On 'Start New Topic' Tab
	casper.then(function() {
		try {
			test.assertExists('form[name="posts"] h4 a');
			this.click('form[name="posts"] h4 a');
			this.wait(5000,function(){
				test.assertExists('#message');
				this.click('#message');
				test.assertDoesntExist('a#insert_image_dialog_');
				test.assertDoesntExist('a#fancy_attach_');
			});
		} catch(e) {
			test.assertDoesntExist('form[name="posts"] h4 a');
			this.echo('There is no topic to display', 'INFO');
		}
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 17', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('ENABLE UPLOAD ATTACHMENTS AND REPLY TOPICS FOR REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO UPLOAD ATTACHMENTS AND REPLY TOPICS AFTER ENABLEING PERMISSION FOR REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Registered Users') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_registered_user.png');
		});
	});

	//Disabling 'Upload Attachments' And Enabling 'Reply Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#other_post_replies');
		test.assertExists('#upload_attachments');
		test.assertExists('#post_replies');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_forum', true, casper, function() {
			casper.echo("View Category Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('other_post_replies', true, casper, function() {
			casper.echo("Reply Other Topic Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('upload_attachments', true, casper, function() {
			casper.echo("Upload Attachments Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_replies', true, casper, function() {
			casper.echo("Reply Own Topic Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	//Clicking On 'Start New Topic' Tab
	casper.then(function() {
		try {
			test.assertExists('form[name="posts"] h4 a');
			this.click('form[name="posts"] h4 a');
			this.wait(5000,function(){
				test.assertExists('#message');
				this.click('#message');
				test.assertExists('a#insert_image_dialog_');
				test.assertExists('a#fancy_attach_');
			});
		} catch(e) {
			test.assertDoesntExist('form[name="posts"] h4 a');
			this.echo('There is no topic to display', 'INFO');
		}
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 18', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISABLE VIEW ATTACHMENTS AND ENABLE START TOPICS FOR REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO VIEW ATTACHMENTS AND START TOPICS AFTER DISABLING/ENABLEING PERMISSION FOR REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Registered Users') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_registered_user.png');
		});
	});

	//Disabling 'View Attachments' And Enabling 'Start Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#post_threads');
		test.assertExists('#view_attachments');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_threads', true, casper, function() {
			casper.echo("Start Topic Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_attachments', false, casper, function() {
			casper.echo("View Attachments Checkbox Has Been Disabled For Registered User", 'INFO');
		});
	});
		
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	//Clicking On 'Any Topic' 
	casper.then(function() {
		this.click('form[name="posts"] h4 a');
		this.wait(5000,function(){
			this.capture(screenShotsDir+ 'view_attachments.png');
			//test.assertDoesntExist('span.post-image');
			test.assertExists('ul.post-attachments');
			this.echo('Registered User Dont Have Permission To View Attachments', 'INFO');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 19', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('ENABLE VIEW ATTACHMENTS AND ENABLE START TOPICS FOR REGISTERED USER FROM GROUP PERMISSION', 'INFO');
		casper.echo('CHECK PERMISSION TO VIEW ATTACHMENTS AND START TOPICS AFTER ENABLEING PERMISSION FOR REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Login To Forum BackEnd 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');

		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});

	//Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
	});
		
	//Getting Screenshot After Clicking On 'Group Permissions' Link Under 'Users' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'group_permissions.png');
	});
	
	//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
	casper.then(function() {
		var grpName = this.evaluate(function(){
			for(var i=1; i<=6; i++) {
				var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
				if (x1.innerText == 'Registered Users') {
					var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
					return x2;
				}
			}
		});
		this.click('a[href="'+grpName+'"]');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'group_registered_user.png');
		});
	});

	//Enabling 'View Attachments' And Enabling 'Start Topics' Option And 'Save'
	casper.then(function(){
		test.assertExists('#post_threads');
		test.assertExists('#view_attachments');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('post_threads', true, casper, function() {
			casper.echo("Start Topic Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('view_attachments', true, casper, function() {
			casper.echo("View Attachments Checkbox Has Been Enabled For Registered User", 'INFO');
		});
	});
		
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
		});
	});
	
	//Verifying 'Success Message' After Saving Settings			
	casper.then(function() {
		var message = this.fetchText('div#tab_wrapper .heading[color="red"]');
		var expectedErrorMsg = 'Your user group settings have been updated.';
		test.assertEquals(message, expectedErrorMsg);
		test.assertExists('a[href="/tool/members/login?action=logout"]');
		this.click('a[href="/tool/members/login?action=logout"]');
	});
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	//Clicking On 'Any Topic' 
	casper.then(function() {
		this.click('form[name="posts"] h4 a');
		this.wait(5000,function(){
			this.capture(screenShotsDir+ 'view_attachments.png');
			//test.assertDoesntExist('span.post-image');
			test.assertExists('span.post-image');
			this.echo('Registered User Have Permission To View Attachments', 'INFO');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});*/
};
