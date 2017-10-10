/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict.';
var inContextLoginMethod = module.exports = {};
var loginJSON = require('../../testdata/loginData.json');
var wait = require('../wait.js');
var utils = require('../utils.js');
var forumLoginMethod = require('../methods/login.js');
inContextLoginMethod.jsErrors = [];

//Method for checked/unchecked startnewtopic for unregistered user
inContextLoginMethod.startTopicCheckedUncheckedMethod=function(status, casper , callback){
	wait.waitForVisible('input#post_threads' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('post_threads', status, casper, function(err) {
				if(!err)
					utils.log(' Successfully checked start new topic ','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForVisible('div#tab_wrapper .heading[color="red"]' , casper , function(err , isExists){
				if(isExists) {
					var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedMsg = 'Your user group settings have been updated.';
					casper.test.assertEquals(message , expectedMsg, utils.log(' Same as expected message.', 'INFO'));
					return callback(null);
				}
			});
		}else{
			utils.log(' start new topic checkbox not found','INFO');
		}
	});
};

//Method for BackEnd Permission
inContextLoginMethod.backEndSettingPermission=function(casper , callback) {
	wait.waitForVisible('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', casper , function(err , isExists) {
		if(isExists) {
			casper.evaluate(function() {
				document.querySelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"').click();
			});
			wait.waitForElement('div.tooltipMenu.text a[title="Assign permissions to user groups"]', casper , function(err , isExists) {
				if(isExists){
					casper.evaluate(function() {
						document.querySelector('div.tooltipMenu.text a[title="Assign permissions to user groups"]').click();
					});
					wait.waitForTime(1000 , casper , function(err){
						var grpName = casper.evaluate(function(){
							var rowCount = document.querySelector('table.text.fullborder').rows.length;
							for(var i=1; i<=rowCount; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Unregistered / Not Logged In') {
									document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
									return x2;
								}
							}
						});
						utils.log(" message : "+grpName, 'INFO');
						casper.click('div.tooltipMenu a[href="'+grpName+'"]');
						return callback(null);
					});
				}
			});
		}
	});
};

//Method for checked/unchecked quote from backend unregistered user
inContextLoginMethod.quoteCheckedUncheckedMethod=function(status , casper , callback){
	wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('display_icons', status , casper, function(err) {
				if(!err)
					utils.log(' Successfully checked quote on post icon ','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForVisible('div#loading_msg' , casper , function(err , isExists){
				if(isExists) {
					utils.log(' ' +casper.fetchText('div#loading_msg'),'INFO');
					wait.waitForVisible('div#ajax-msg-top' , casper , function(err , isExists){
						if(isExists) {
							utils.log(' ' +casper.fetchText('div#ajax-msg-top'),'INFO');
							return callback(null);
						}
					});
				}else{
					utils.log(' Saved not found', 'ERROR');
					wait.waitForVisible('div#ajax-msg-top', casper , function(err ,isExists){
						if(isExists) {
							utils.log(' ' +casper.fetchText('div#ajax-msg-top'),'INFO');
							return callback(null);
						}
					});
				}
			});
		}
	});
};

//Method to Enable settings display permission
inContextLoginMethod.backEndDisplayPermission=function(casper , callback){
	wait.waitForElement('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper, function(err, isExists) {
		if(isExists) {
			casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
				if(isExists) {
					casper.click('div#ddSettings a:nth-child(1)');
					wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists){
						if(isExists){
							utils.log(' display permission settings page found' ,'INFO');
							return callback(null);
						}
					});
				}
			});
		}
	});
};

//Method for Reply topic permission checked unchecked
inContextLoginMethod.replyTopicPermissioncheckedUnchecked=function(status , casper , callback){
	wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('other_post_replies',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully unchecked replytopics','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForVisible('div#tab_wrapper .heading[color="red"]' , casper , function(err , isExists){
				if(isExists) {
					var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedMsg = 'Your user group settings have been updated.';
					casper.test.assertEquals(message , expectedMsg, utils.log(' Same as expected message.', 'INFO'));
					return callback(null);
				}
		  	});
		}
	});
};

//Method for view topic permission checked unchecked
inContextLoginMethod.viewTopicPermissionCheckedUnchecked=function(status ,casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('view_thread_content',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully unchecked view topics permission','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForVisible('div#tab_wrapper .heading[color="red"]' , casper , function(err , isExists){
				if(isExists) {
						var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
						var expectedMsg = 'Your user group settings have been updated.';
						casper.test.assertEquals(message , expectedMsg, utils.log(' Same as expected message.', 'INFO'));
						return callback(null);
				}
		  });
		 }
	});
};

//Method for view forum checked/unchecked
inContextLoginMethod.viewForumCheckedUnchecked=function(status , casper , callback){
	wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('view_messageboard',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully unchecked replytopics','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForVisible('div#tab_wrapper .heading[color="red"]' , casper , function(err , isExists){
				if(isExists) {
					var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedMsg = 'Your user group settings have been updated.';
					casper.test.assertEquals(message , expectedMsg, utils.log(' Same as expected message', 'INFO'));
					return callback(null);
				}
			});
		}
	});
};

//Method for view profile checked/unchecked
inContextLoginMethod.viewProfileCheckedUnchecked=function(status ,casper , callback){
	wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('view_profiles',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully unchecked view profile','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForVisible('div#tab_wrapper .heading[color="red"]' , casper , function(err , isExists){
				if(isExists) {
					var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedMsg = 'Your user group settings have been updated.';
					casper.test.assertEquals(message , expectedMsg, utils.log(' Same as expected message.', 'INFO'));
					return callback(null);
				}
			});
		}
	});
};

//Method for backend general permission
inContextLoginMethod.backEndGeneralPermission=function(casper , callback){
	wait.waitForVisible('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper, function(err, isExists) {
		if(isExists) {
			casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
				if(isExists) {
					casper.click('div#ddSettings a:nth-child(2)');
					wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists){
						if(isExists){
							utils.log(' display permission settings page found' ,'INFO');
							return callback(null);
						}
					});
				}
			});
		}
	});
};

//Method for calendar checked/unchecked
inContextLoginMethod.viewCalenderCheckedUnchecked=function(status , casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('enable_calendar',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully unchecked calendar','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			casper.click('button.button.btn-m.btn-blue');
			casper.waitUntilVisible('div#ajax-msg-top', function success() {
				utils.log(casper.fetchText('div#ajax-msg-top'),'INFO');
				return callback(null);
			}, function fail() {
				utils.log('Saved not found', 'ERROR');

			},30000);
		}
	});
};

//Method for reputation checked/unchecked
inContextLoginMethod.viewReputationCheckedUnchecked=function(status ,casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('reputation',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully checked reputation','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			casper.waitUntilVisible('div#ajax-msg-top', function success() {
				utils.log(casper.fetchText('div#ajax-msg-top'),'INFO');
				return callback(null);
			}, function fail() {
				utils.log('Saved not found', 'ERROR');
			},30000);
		}
	});
};

//Method for backEnd settings security permission
inContextLoginMethod.viewSecurityPermission=function(casper , callback){
	wait.waitForTime(2000 , casper , function(err){
		wait.waitForVisible('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper, function(err, isExists) {
			if(isExists) {
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
				wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
					if(isExists) {
						casper.click('div#ddSettings a:nth-child(3)');
						wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists){
							if(isExists){
								utils.log(' display permission settings page found' ,'INFO');
								return callback(null);
							}
						});
					}
				});
			} else {
				utils.log(' Setting link not found on backEnd menu' ,'INFO');
				wait.waitForVisible('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', casper, function(err, isExists) {
					if(isExists) {
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
						wait.waitForElement('div#ddSettings', casper, function(err, isExists) {
							if(isExists) {
								casper.click('div#ddSettings a:nth-child(3)');
								wait.waitForElement('button.button.btn-m.btn-blue' , casper , function(err , isExists){
									if(isExists){
										utils.log(' display permission settings page found' ,'INFO');
										return callback(null);
									}
								});
							}
						});
					}
				});
			}
		});
	});
};

//Method for view-privacy-private checked/unchecked
inContextLoginMethod.viewPrivacyPrivate=function(casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists){
		if(isExists){
			wait.waitForElement('select#privacy', casper , function(err , isExists) {
				if(isExists) {
					casper.click('select#privacy');
					casper.sendKeys('select[name="privacy"] option[value="private"]', 'Private');
					casper.click('button.button.btn-m.btn-blue');
					casper.waitUntilVisible('div#ajax-msg-top', function success() {
					utils.log(casper.fetchText('div#ajax-msg-top'),'INFO');
						return callback(null);
					}, function fail() {
						utils.log('Saved not found', 'ERROR');
						return callback(null);
					},30000);
				}
			});
		}
	});
};

//Method for view-privacy-public
inContextLoginMethod.viewPrivacyPublic=function(casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists){
		if(isExists){
			wait.waitForElement('select#privacy', casper , function(err , isExists) {
				if(isExists) {
					casper.click('select#privacy');
					casper.sendKeys('select[name="privacy"] option[value="public"]', 'Public');
					casper.click('button.button.btn-m.btn-blue');
					casper.waitUntilVisible('div#ajax-msg-top', function success() {
						utils.log(casper.fetchText('div#ajax-msg-top'),'INFO');
						return callback(null);
					}, function fail() {
						utils.log('Saved not found', 'ERROR');
						return callback(null);
					},30000);
				}
			});
		}
	});
};

//Method for post Event Checked/Unchecked
inContextLoginMethod.postEventEnable=function(status ,casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('post_events',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully enable post_events method','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			wait.waitForVisible('div#tab_wrapper .heading[color="red"]' , casper , function(err , isExists){
				if(isExists) {
					var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
					var expectedMsg = 'Your user group settings have been updated.';
					casper.test.assertEquals(message , expectedMsg, utils.log(' same as expected message.', 'INFO'));
					return callback(null);
				}else{
					wait.waitForVisible('div#tab_wrapper .heading[color="red"]' , casper , function(err , isExists){
						if(isExists) {
							var message = casper.fetchText('div#tab_wrapper .heading[color="red"]');
							var expectedMsg = 'Your user group settings have been updated.';
							casper.test.assertEquals(message , expectedMsg, utils.log(' same as expected message.', 'INFO'));
							return callback(null);
						}
					});
				}
			});
		}
	});
};

//Method for user-user-emailing enable
inContextLoginMethod.viewUserToUserEmailCheckedUnchecked=function(status ,casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('aEMS',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully checked user-To-user email','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			casper.waitUntilVisible('div#ajax-msg-top', function success() {
				utils.log(casper.fetchText('div#ajax-msg-top'),'INFO');
				return callback(null);
			}, function fail() {
				utils.log('Saved not found', 'ERROR');
			},30000);
		}
	});
};

//Method to enable poll from backEnd general permission settings
inContextLoginMethod.enablePoll=function(status , casper , callback){
	wait.waitForVisible('button.button.btn-m.btn-blue' , casper , function(err , isExists) {
		if(isExists) {
			utils.enableorDisableCheckbox('enable_polls',status, casper, function(err) {
				if(!err)
					utils.log(' Successfully checked poll from backend settings','INFO');
			});
			casper.click('button.button.btn-m.btn-blue');
			casper.waitUntilVisible('div#ajax-msg-top', function success() {
				utils.log(casper.fetchText('div#ajax-msg-top'),'INFO');
			return callback(null);
			}, function fail() {
				utils.log('Saved not found', 'ERROR');
			},30000);
		}
	});
};

//-----------------------------------create poll with start a topic----------------------------------
//2.Method for create topic(and poll option)
inContextLoginMethod.startTopic = function(value1,value2,value3,data,driver,callback) {

	driver.click('a.pull-right.btn.btn-uppercase.btn-primary');
	driver.waitForSelector('div.post-body.pull-left',function success() {
		driver.sendKeys('input[name="subject"]',data.to,{reset:true});
		driver.withFrame('message_ifr', function() {
			driver.sendKeys('#tinymce', driver.page.event.key.Ctrl,driver.page.event.key.A, {keepFocus: true});
			driver.sendKeys('#tinymce', driver.page.event.key.Backspace, {keepFocus: true});
			driver.sendKeys('#tinymce',data.subject);
		});
		driver.waitForSelector('#all_forums_dropdown', function success() {
			driver.click('#all_forums_dropdown');
			driver.fill('form[name="PostTopic"]',{
				'forum' : 'General',
				'e_reply': value1,
				'pin': value2,
				'locked': value3
			},false);

			driver.then(function() {
			    driver.test.assertExists('form#PostTopic div div:nth-child(1) div ul li:nth-child(2) a', utils.log('form#PostTopic div div:nth-child(1) div ul li:nth-child(2) a selector exists', 'INFO'));
				driver.click('form#PostTopic div div:nth-child(1) div ul li:nth-child(2) a');
				driver.sendKeys('#poll_question','PM of india');
				driver.sendKeys('#public',true);
				driver.sendKeys('span#poll_option_1 div input','Modi');
				driver.sendKeys('span#poll_option_2 div input','Rahul');
				driver.sendKeys('#multiple',true);
				driver.click('#save_poll');
			});
		}, function fail() {
			driver.waitForSelector('#post_submit',function success() {
				driver.test.assertExists('#post_submit', utils.log(' #post_submit selector exists', 'INFO'));
				driver.click('#post_submit');
			},function fail() {
				utils.log('Unable to submit form','ERROR');
			});
		});
	},function fail(){
		utils.log('Unable to Open Form To Start Topic','ERROR');
	});
	driver.then(function() {
		return callback(null);
	});
};

//Method for frontEnd log for create poll topic
inContextLoginMethod.createPollTopic=function(casper , callback){
	casper.thenOpen(config.url, function() {
		utils.log(" Title of the page :"+this.getTitle(), 'INFO');
		wait.waitForElement('a#td_tab_login', casper, function(err, isExists) {
			if(isExists) {
				forumLoginMethod.loginToApp(loginJSON.userInfo.username, loginJSON.userInfo.password, casper, function(err) {
					if (err) {
						utils.log(" Error occurred in callback user not logged-in", "ERROR");
					}else {
						utils.log(' Processing to Login on forum.....','INFO');
						wait.waitForElement(' ul.nav.pull-right span.caret' , casper , function(err , isExists){
							if(isExists){
								utils.log(' user logged in successfully' ,'INFO');
								inContextLoginMethod.startTopic(false,false,false,loginJSON.topicMessage,casper,function(err){
									if(!err)
										utils.log(' poll method called successfully' ,'INFO');

								});
							}
						});
					}
				});
				casper.then(function(){
					forumLoginMethod.logoutFromApp(casper, function(err){
						if (!err)
							utils.log(' Successfully logout from application', 'INFO');
							return callback(null);
					});
				});
			}
		});
	});
};
