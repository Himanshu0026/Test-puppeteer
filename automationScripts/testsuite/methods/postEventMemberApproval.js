/***These are the function which has been called in thumpsUpDown.js and also will be used in other js file as per requirement**********/

'use strict.';
var registerMethod = require('./register.js');
var utils = require('../utils.js');
var wait = require('../wait.js');
var postEventMemberApprovalJSON = require('../../testdata/postEventMemberApproval.json');
var forumLoginMethod = require('../methods/login.js');
var postEventMemberApprovalMethod = module.exports = {};
var currentUrl;
var topic;
var postId;
var eventId;
var memberId;
//*************************************************PRIVATE METHODS***********************************************

//method to set the user permission to Administration
postEventMemberApprovalMethod.setAdmin = function(user) {
	casper.test.assertExist('#autosuggest', 'Found username autosuggest input field');
	casper.fill('form#frmChangeUsersGroup', {
		'member' : user
	}, true);
	casper.waitForSelector('form[name="ugfrm"]',  function() {
		this.test.assertSelectorHasText('.ui-dialog-title', 'Change User Group');
		casper.fillLabels('form#frmChangeUsersGroupFinal', {
			'Administrators' : 'checked',
			'Registered Users' : ''
		}, true);
	}).waitUntilVisible('#loading_msg', function() {
		if (this.visible('#loading_msg')) {
      utils.info(' Loading....');
    } else {
			utils.info(' Loading is not displayed.');
		}
	});
};

//method to set the user permission to Administration
postEventMemberApprovalMethod.setUserGroupToRegisteredUser = function(user) {
	casper.test.assertExist('#autosuggest', 'Found username autosuggest input field');
	casper.fill('form#frmChangeUsersGroup', {
		'member' : user
	}, true);
	casper.waitForSelector('form[name="ugfrm"]',  function() {
		this.test.assertSelectorHasText('.ui-dialog-title', 'Change User Group');
		casper.fillLabels('form#frmChangeUsersGroupFinal', {
			'Administrators' : '',
			'Registered Users' : 'checked'
		}, true);
	}).waitUntilVisible('#loading_msg', function() {
		if (this.visible('#loading_msg')) {
      utils.info(' Loading....');
    } else {
			utils.info(' Loading is not displayed.');
		}
	});
};

//*************************method to compose a post by register user ************************************
postEventMemberApprovalMethod.composePost = function() {
	utils.info(' Inside the composePost method');
	casper.click('a[id^="topic_"]');
	casper.waitForSelector('#posts-list', function() {
		currentUrl = this.getCurrentUrl();
		this.test.assertSelectorHasText('#sub_post_reply', 'Post a reply');
		this.click('#sub_post_reply');
		this.wait('5000', function() {
			this.withFrame('message_ifr', function() {
				this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
				this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
				this.sendKeys('#tinymce', 'Hello I am Register user');
			});
		});
	}).then(function() {
		this.test.assertVisible('#reply_submit');
		this.click('#reply_submit');
		this.wait('6000', function() {
		});
	});
};

// method to get the id of the post
postEventMemberApprovalMethod.getPostId = function(callback) {
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password);
	}).waitForSelector('ul.nav.nav-tabs li:nth-child(2) a', function() {
		casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a', 'Category link found');
		casper.click('ul.nav.nav-tabs li:nth-child(2) a');
	}).waitForSelector('li[id^="forum_"]', function() {
		casper.test.assertExists('li#approvalQueue a', 'Approval Queue found');
		casper.click('li#approvalQueue a');
	}).waitForSelector('form#approveMembers', function() {
		var post_id = casper.evaluate(function() {
			var element=document.querySelectorAll("div[id^='post_message_']");
			var id = element[element.length-1].id;
			return id;
		});
		postId = post_id.split("_");
		utils.info('post id ; '+postId[2]);
		return callback(null, postId[2]);
	});
};

// method to get the id of the post
postEventMemberApprovalMethod.getPostIdForCombineForum = function(callback) {
	casper.then(function() {
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function() {
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON.adminUserLogin.username, postEventMemberApprovalJSON.adminUserLogin.password);
	}).waitForSelector('li.pull-right.user-panel', function() {
		utils.info('User has been successfuly login to application with admin user');
		this.test.assertExists('li#approvalQueue a', 'Approval Queue found');
		this.click('li#approvalQueue a');
	}).waitForSelector('form#approveMembers', function() {
		var post_id = this.evaluate(function() {
			var element=document.querySelectorAll("div[id^='post_message_']");
			var id = element[element.length-1].id;
			return id;
		});
		postId = post_id.split("_");
		utils.info('post id ; '+postId[2]);
		return callback(null, postId[2]);
	});
};

//****************** method to delete the approved post*************************
postEventMemberApprovalMethod.deletePost = function() {
	casper.thenOpen(currentUrl, function() {
		utils.info('Inside the deletePost method');
		this.test.assertExists('form[name="posts"] div#post_list_'+postId[2] + ' input', 'Post to be deleted found');
		this.click('form[name="posts"] div#post_list_'+postId[2] + ' input');
	}).waitForSelector('input#deleteposts', function() {
		this.click('input#deleteposts');
	}).wait(2000, function() {
	});
};

//*************************Method for calendar functionality ***************************************

//*************************Method to enable the event approval from backend ************************
postEventMemberApprovalMethod.enableEventApproval = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]', utils.log('Content tab found','INFO'));
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					wait.waitForElement('div#ddContent', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddContent a:nth-child(2)');
							wait.waitForElement('div#tab_wrapper', function(err, isExists) {
								if(isExists) {
									casper.click('tr:nth-child(2) td:nth-child(3) a');
									wait.waitForElement('a.menuOpened', function(err, isExists) {
										if(isExists) {
											casper.click('div[id^="calendarAction"] a');
											wait.waitForElement('input#f', function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('f', true, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
												}
												casper.test.assertExists('button.button.btn-m.btn-blue');
												casper.click('button.button.btn-m.btn-blue');
												wait.waitForElement('font[color="red"]', function(err, isExists) {
													if(isExists) {
														casper.echo("Permission changed",'INFO');
													}
												});
											});
										}
									});
									casper.then(function() {
										casper.click('li.inactive_tab a');
										wait.waitForElement('td.userGroupActions', function(err, isExists) {
											if(isExists) {
												var grpName = casper.evaluate(function(){
													for(var i=3; i<=7; i++) {
														var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1) li'); // change li
														if (group.innerText == 'Registered Users') {
															document.querySelector('tr:nth-child('+i+') td:nth-child(2) a').click();
															return (group.innerText);
														}
													}
												});
												casper.echo('group ='+grpName,"INFO");
												wait.waitForElement('input#t', function(err, isExists) {
													if(isExists) {
														utils.enableorDisableCheckbox('t', true, function() {
															casper.echo('checkbox is checked', 'INFO');
														});
														utils.enableorDisableCheckbox('o', true, function() {
															casper.echo('checkbox is checked', 'INFO');
														});
														casper.test.assertExists('button.button.btn-m.btn-blue');
														casper.click('button.button.btn-m.btn-blue');
														wait.waitForElement('font[color="red"]', function(err, isExists) {
															if(isExists) {
																casper.echo("Permission changed",'INFO');
															}
														});
													} else {
														casper.echo(' Require event approval checkbox not found', 'ERROR');
													}
												});
											} else {
												casper.echo('Table not found', 'ERROR');
											}
										});
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : '+err, 'INFO');
		}
	});
	casper.then(function() {
		forumLoginMethod.backEndLogout(function() {
		});
		return callback(null);
	});
};

//*************************Method to disable the event approval from backend ************************
postEventMemberApprovalMethod.disableEventApproval = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					wait.waitForElement('div#ddContent', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddContent a:nth-child(2)');
							wait.waitForElement('div#tab_wrapper', function(err, isExists) {
								if(isExists) {
									casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', function(err, isExists) {
										if(isExists) {
											casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (group.innerText == 'Registered Users') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(2) a').click();
													}
												}
											});
											wait.waitForElement('font[color="red"]', function(err, isExists) {
												if(isExists) {
													casper.echo("Permission unchanged",'INFO');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
	casper.then(function() {
		forumLoginMethod.backEndLogout(function() {
		});
		return callback(null);
	});
};

//*************************method to compose a event and got id ************************************
postEventMemberApprovalMethod.composeEvent = function(callback) {
	casper.echo('Inside the composeEvent method','INFO');
	try {
		casper.test.assertExists('ul.nav.pull-right span.caret');
		casper.then(function() {
			forumLoginMethod.logoutFromApp(function() { });
		});
	} catch (e) {
		casper.echo('No user logged in','INFO');
	}
	casper.then(function() {
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON["registeredUserLogin"].username, postEventMemberApprovalJSON["registeredUserLogin"].password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.click('i.icon.icon-menu');
						try {
							casper.test.assertExists('ul#calendars_toggle_link i','calender menu found');
							casper.click('ul#calendars_toggle_link i');
							casper.test.assertExists('a[href^="/calendar/display?from_month=&from_year=&view="]','First calender found');
							casper.click('a[href^="/calendar/display?from_month=&from_year=&view="]');
						} catch (e) {
							//casper.wait(2000, function() {
								casper.test.assertExists('li#calenders_show a','calender menu found');
								casper.click('li#calenders_show a');
							//});
						}
						wait.waitForElement('div.bd-wrapper.calendar-add-event a', function(err, isExists) {
							if(isExists) {
								casper.click('div.bd-wrapper.calendar-add-event a');
								casper.then(function() {
									casper.sendKeys('form#PostCalEvent input[name="event_title"]', 'New event');
									casper.fillSelectors('form#PostCalEvent', {
											'input#allDay' : 1
									}, false);
									casper.then(function() {
										wait.waitForElement('#message_ifr', function(err, isExists) {
											if(isExists) {
												casper.test.assertExists('#message_ifr','message-ifr found');
												casper.withFrame('message_ifr', function() {
													try{
														casper.test.assertExists('#tinymce');
														casper.sendKeys('#tinymce', "This is a new event");
													}catch(e) {
														casper.test.assertDoesntExist('#tinymce');
													}
												});

												// code get the id of event
												casper.then(function() {
													casper.click('#post_event_buttton');
													wait.waitForTime(5000, function(err) {
														if(!err) {
															eventId = casper.evaluate( function(eventUrl) {
																var index = eventUrl.indexOf('eventid=');
																var string = 'eventid=';
																var string_length = string.length;
																var idIndex = index+string_length;
																var subStringUrl=eventUrl.substring(idIndex);
																var indexAmpersand = subStringUrl.indexOf('&');
																var id = subStringUrl.substring(0,indexAmpersand);
																return id;
															}, casper.getCurrentUrl());
															casper.echo('*******event_id='+eventId,'INFO');
															return callback(null, eventId);
														}
													});
												});
											}else{
												casper.echo('message_ifr not found','ERROR');
											}
										});
									});
								});
							} else {
								casper.echo('Calendar tab not found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'INFO');
			}
		});
	});
};

// method to go to approval queue page
postEventMemberApprovalMethod.goToApprovalQueuePage = function(callback) {
	try {
		casper.test.assertExists('ul.nav.pull-right span.caret');
		casper.then(function() {
			forumLoginMethod.logoutFromApp(function() { });
		});
	} catch (e) {
		casper.echo('No user logged in','INFO');
	}
	casper.thenOpen(config.url, function() {
		//login with admin user to get the id of the post and to approve it
		casper.echo('Title of the page :' +casper.getTitle(), 'INFO');
		forumLoginMethod.loginToApp(postEventMemberApprovalJSON["adminUserLogin"].username, postEventMemberApprovalJSON["adminUserLogin"].password, function(err) {
			if(!err) {
				wait.waitForElement('li.pull-right.user-panel', casper,function(err, isExists) {
					if(isExists) {
						casper.echo('User has been successfuly login to application with admin user', 'INFO');
						wait.waitForElement('ul.nav.nav-tabs li:nth-child(2) a', function(err, isExists) {
							if(isExists) {
								casper.test.assertExists('ul.nav.nav-tabs li:nth-child(2) a','Category link found');
								casper.click('ul.nav.nav-tabs li:nth-child(2) a');
								wait.waitForElement('li[id^="forum_"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('li#approvalQueue a','Approval Queue found');
										casper.click('li#approvalQueue a');
										wait.waitForElement('form#approveMembers', function(err, isExists) {
											if(isExists) {
												return callback(null);
											}
										});
									}else{
										casper.echo('Approval Queue not Found','INFO');
									}
								});
							}else {
								casper.echo('Categories not Found','ERROR');
							}
						});
					} else {
						casper.echo('User not logged in','ERROR');
					}
				});
			}else {
				casper.echo('Admin user not logged in', 'INFO');
			}
		});
	});
};

//*************************Method for Member functionality ***************************************

//*************************Method to Enable - Approve New Registrations And Disable - Email verification" ************************
postEventMemberApprovalMethod.enableApproveRegistrationsAndDisableEmail = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#confirm_email', function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('confirm_email', false, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									casper.then(function() {
										utils.enableorDisableCheckbox('reqregapp', true, function() {
											casper.echo('checkbox is checked', 'INFO');
										});
										casper.then(function() {
											utils.enableorDisableCheckbox('captcha_registration', false, function() {
												casper.echo('checkbox is unchecked', 'INFO');
											});
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											}, function fail() {
												casper.waitUntilVisible('div#ajax-msg-top', function success() {
													casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
												}, function fail() {
													casper.echo('Saved not found', 'ERROR');
												});
											}, 30000);
										});
									});
								} else {
									casper.echo('Email Address Verification checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error ', 'ERROR');
		}
	});
	casper.thenOpen(config.backEndUrl, function() {
		wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found');
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
				casper.click('div#ddUsers a');
				wait.waitForElement('table.text.fullborder', function(err, isExists) {
					if(isExists) {
						var text = casper.evaluate(function() {
									var group1, group2;
									for(var i=1; i<=7; i++) {
										var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (group.innerText == 'Pending Approval') {
											group1=group.innerText;
											break;
										}
									}
									for(var i=1; i<=7; i++) {
										var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (group.innerText == 'Pending Email Verification') {
											group2 = group.innerText;
											break;
										}
									}
									if(group1 == 'Pending Approval' && group2 !== 'Pending Email Verification'){
										return "On Default User Groups Pending Email Verification-disappear Pending Approval-appear";
									}
									else {
									return "Error";
									}
								});
						casper.echo(text,'INFO');
					}else{
						casper.echo('User table not found','ERROR');
					}
				});
			} else {
				casper.echo('Backend Menu not found', 'ERROR');
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.backEndLogout(function() {
		});
		return callback(null);
	});
};

//*************************Method to Disable - Approve New Registrations And Enable - Email verification" ************************
postEventMemberApprovalMethod.disableApproveRegistrationsAndEnableEmail = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#confirm_email', function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('confirm_email', true, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									casper.then(function() {
										utils.enableorDisableCheckbox('reqregapp', false, function() {
											casper.echo('checkbox is unchecked', 'INFO');
										});
										casper.then(function() {
											utils.enableorDisableCheckbox('captcha_registration', false, function() {
												casper.echo('checkbox is unchecked', 'INFO');
											});
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											/*casper.wait(40000, function() {
											});*/
											casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											}, function fail() {
												casper.waitUntilVisible('div#ajax-msg-top', function success() {
													casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
												}, function fail() {
													casper.echo('Saved not found', 'ERROR');
												});
											}, 30000);
										});
									});
								} else {
									casper.echo('Email Address Verification checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error ', 'ERROR');
		}
	});
	casper.thenOpen(config.backEndUrl, function() {
		wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found');
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
				casper.click('div#ddUsers a');
				wait.waitForElement('table.text.fullborder', function(err, isExists) {
					if(isExists) {
						var text = casper.evaluate(function() {
									var group1, group2;
									for(var i=1; i<=7; i++) {
										var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (group.innerText == 'Pending Approval') {
											group1=group.innerText;
											break;
										}
									}
									for(var i=1; i<=7; i++) {
										var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (group.innerText == 'Pending Email Verification') {
											group2 = group.innerText;
											break;
										}
									}
									if(group1 !== 'Pending Approval' && group2 == 'Pending Email Verification'){
										return "On Default User Groups Pending Email Verification-appear Pending Approval-disappear";
									}
									else {
									return "Error";
									}
								});
						casper.echo(text,'INFO');
					}else{
						casper.echo('User table not found','ERROR');
					}
				});
			} else {
				casper.echo('Backend Menu not found', 'ERROR');
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.backEndLogout(function() {
		});
		return callback(null);
	});
};

//*************************Method to Enable - Approve New Registrations And Enable - Email verification" ************************
postEventMemberApprovalMethod.enableApproveRegistrationsAndEnableEmail = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#confirm_email', function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('confirm_email', true, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									casper.then(function() {
										utils.enableorDisableCheckbox('reqregapp', true, function() {
											casper.echo('checkbox is checked', 'INFO');
										});
										casper.then(function() {
											utils.enableorDisableCheckbox('captcha_registration', false, function() {
												casper.echo('checkbox is unchecked', 'INFO');
											});
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											}, function fail() {
												casper.waitUntilVisible('div#ajax-msg-top', function success() {
													casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
												}, function fail() {
													casper.echo('Saved not found', 'ERROR');
												});
											}, 30000);
										});
									});
								} else {
									casper.echo('Email Address Verification checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error ', 'ERROR');
		}
	});
	casper.thenOpen(config.backEndUrl, function() {
		wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found');
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
				casper.click('div#ddUsers a');
				wait.waitForElement('table.text.fullborder', function(err, isExists) {
					if(isExists) {
						var text = casper.evaluate(function() {
									var group1, group2;
									for(var i=1; i<=7; i++) {
										var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (group.innerText == 'Pending Approval') {
											group1=group.innerText;
											break;
										}
									}
									for(var i=1; i<=7; i++) {
										var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (group.innerText == 'Pending Email Verification') {
											group2 = group.innerText;
											break;
										}
									}
									if(group1 == 'Pending Approval' && group2 == 'Pending Email Verification'){
										return "On Default User Groups Pending Email Verification-- appear Pending Approval-- appear";
									}
									else {
									return "Error";
									}
								});
						casper.echo(text,'INFO');
					}else{
						casper.echo('User table not found','ERROR');
					}
				});
			} else {
				casper.echo('Backend Menu not found', 'ERROR');
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.backEndLogout(function() {
		});
		return callback(null);
	});
};

//*************************Method to Disable - Approve New Registrations And Disable - Email verification" ************************
postEventMemberApprovalMethod.disableApproveRegistrationsAndDisableEmail = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					wait.waitForElement('div#ddSettings', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddSettings a:nth-child(3)');
							wait.waitForElement('input#confirm_email', function(err, isExists) {
								if(isExists) {
									utils.enableorDisableCheckbox('confirm_email', false, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									casper.then(function() {
										utils.enableorDisableCheckbox('reqregapp', false, function() {
											casper.echo('checkbox is unchecked', 'INFO');
										});
										casper.then(function() {
											utils.enableorDisableCheckbox('captcha_registration', false, function() {
												casper.echo('checkbox is unchecked', 'INFO');
											});
											casper.test.assertExists('button.button.btn-m.btn-blue');
											casper.click('button.button.btn-m.btn-blue');
											/*casper.wait(40000, function() {
											});*/
											casper.waitUntilVisible('div#ajax-msg-top', function success() {
												casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
											}, function fail() {
												casper.waitUntilVisible('div#ajax-msg-top', function success() {
													casper.echo(casper.fetchText('div#ajax-msg-top'),'INFO');
												}, function fail() {
													casper.echo('Saved not found', 'ERROR');
												});
											}, 30000);
										});
									});
								} else {
									casper.echo('Email Address Verification checkbox not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Setting  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error ', 'ERROR');
		}
	});
	casper.thenOpen(config.backEndUrl, function() {
		wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
			if(isExists) {
				casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found');
				casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
				casper.click('div#ddUsers a');
				wait.waitForElement('table.text.fullborder', function(err, isExists) {
					if(isExists) {
						var text = casper.evaluate(function() {
									var group1, group2;
									for(var i=1; i<=7; i++) {
										var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (group.innerText == 'Pending Approval') {
											group1=group.innerText;
											break;
										}
									}
									for(var i=1; i<=7; i++) {
										var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
										if (group.innerText == 'Pending Email Verification') {
											group2 = group.innerText;
											break;
										}
									}
									if(group1 !== 'Pending Approval' && group2 !== 'Pending Email Verification') {
										return "On Default User Groups Pending Email Verification-- disappear Pending Approval-- disappear";
									}
									else {
									return "Error";
									}
								});
						casper.echo(text,'INFO');
					}else{
						casper.echo('User table not found','ERROR');
					}
				});
			} else {
				casper.echo('Backend Menu not found', 'ERROR');
			}
		});
	});
	casper.then(function() {
		forumLoginMethod.backEndLogout(function() {
		});
		return callback(null);
	});
};

//*************************Method to Register member ************************
postEventMemberApprovalMethod.registerMember = function(data,callback) {
	casper.thenOpen(config.url, function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret');
			casper.then(function() {
				forumLoginMethod.logoutFromApp(function() { });
			});
		} catch (e) {
			casper.echo('No user logged in','INFO');
		}
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
		wait.waitForElement('li.pull-right a[href="/register/register"]', function(err, isExist) {
			if(!err){
				if(isExist) {
					casper.test.assertExists('li.pull-right a[href="/register/register"]');
					casper.click('li.pull-right a[href="/register/register"]');
					wait.waitForElement('form[name="PostTopic"] input[name="member"]', function(err, isExist){
						 if(isExist) {
							casper.echo('Successfully open register form.....', 'INFO');
							casper.then(function() {
								registerMethod.registerToApp(data, function(err) {
									if(!err) {
										casper.echo('Processing to registration on forum.....', 'INFO');
										wait.waitForElement('div.panel-body.table-responsive', function(err, isExist) {
											if(isExist) {
												casper.then(function() {
													registerMethod.redirectToLogout(function(err) {
														if(!err) {
															casper.echo('User logout successfully', 'INFO');
														}
													});
												});
											} else {
												casper.echo('Message Not Found', 'ERROR');
											}
										});
									}
								});
							});
						} else {
							casper.echo('postTopic form  Not Found', 'ERROR');
						}
					});
				} else {
					casper.echo("User didn't not found any register link", 'ERROR');
				}
			}
		});
	});
	casper.then(function() {
		return callback(null);
	});
};

//******************method to find the id of member*******************************************
postEventMemberApprovalMethod.memberId = function(callback) {
	wait.waitForElement('div#pendingMembers', function(err, isExists) {
		if(isExists) {
			var member_id = casper.evaluate(function() {
				var element=document.querySelectorAll("li[id^='member_']");
				var id = element[element.length-1].id;
				return id;
			});
			memberId = member_id.split("_");
			casper.echo('Member id is = '+memberId[1], 'INFO');
			return callback(null, memberId);
		}else {
			casper.echo('pending member not found','ERROR');
		}
	});
};

//****************** method to delete the Register user after approval*************************
postEventMemberApprovalMethod.deleteMember = function(callback) {
	casper.thenOpen(config.backEndUrl,function() {
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found');
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										casper.test.assertExists('a#delete_user', '******Delete user button found ******');
										casper.click('a#delete_user');
										casper.waitWhileVisible('div#dlgChangeUsersGroup', function() {
											casper.echo('Successfully deleted user', 'INFO');
										});
									}else{
										casper.echo('Delete user button not found','ERROR');
									}
								});
							}else{
								casper.echo('Change user group permission not found','ERROR');
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			forumLoginMethod.backEndLogout(function() {
			});
			return callback(null);
		});
	});
};

//****************** method to check pending user moved to Register user after approval*************************
postEventMemberApprovalMethod.checkPendingUser = function(callback) {
	casper.thenOpen(config.backEndUrl,function() { // code to verify  user moved to Registered group
		forumLoginMethod.loginToForumBackEnd(function(err) {
			if(!err) {
				wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
					if(isExists) {
						casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'Users Link Found');
						casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						casper.test.assertExists('div#ddUsers a', '*****Group permission is found****');
						casper.click('div#ddUsers a');
						wait.waitForElement('form#frmChangeUsersGroup', function(err, isExists) {
							if(isExists) {
								casper.fill('form#frmChangeUsersGroup', {
									'member' : postEventMemberApprovalJSON.userToDelete
								}, true);
								wait.waitForElement('form[name="ugfrm"]', function(err, isExists) {
									if(isExists) {
										var checked = casper.evaluate(function() {
											var totalUserGroup = document.querySelectorAll('form#frmChangeUsersGroupFinal input[type="checkbox"]');
											for(var i=2; i<=totalUserGroup.length; i++) {
												var userGroup = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') label');
												if (userGroup.innerText == 'Registered Users') {
													var userGroupId = document.querySelector('form#frmChangeUsersGroupFinal div:nth-child('+i+') input').getAttribute('id');
													var element = document.getElementById(userGroupId).checked;
													return element;
												}
											}
										});
										casper.echo('the value of checked = '+checked,'INFO');
										if(checked === true) {
											casper.echo('The pending user is moved to Register user, Verified','INFO');
										}
										else {
											casper.echo('The pending user is not moved to Register user, Verified','ERROR');
										}
									}
								});
							}
						});
					} else {
						casper.echo('Backend Menu not found', 'ERROR');
					}
				});
			}else {
				casper.echo('Error ', 'ERROR');
			}
		});
		casper.then(function() {
			forumLoginMethod.backEndLogout(function() {
			});
		});
	});
};

//*************************Method to enable Viewable on Members List for pending approval from backend ************************
postEventMemberApprovalMethod.enableViewableMembersPendingApproval = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (group.innerText == 'Pending Approval') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var groupId = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return groupId;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#memberslist_viewable', function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('memberslist_viewable', true, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													/*casper.wait(40000, function() {
													});*/
													wait.waitForElement('font[color="red"]', function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
	casper.then(function() {
		forumLoginMethod.backEndLogout(function() {
		});
		return callback(null);
	});
};

//*************************Method to enable Viewable on Members List for pending email verification from backend ************************
postEventMemberApprovalMethod.enableViewableMembersPendingEmailVerification = function(callback) {
	forumLoginMethod.loginToForumBackEnd(function(err) {
		if(!err) {
			wait.waitForElement('div#my_account_forum_menu', function(err, isExists) {
				if(isExists) {
					casper.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					wait.waitForElement('div#ddUsers', function(err, isExists) {
						if(isExists) {
							casper.click('div#ddUsers a:nth-child(1)');
							wait.waitForElement('div#tab_wrapper', function(err, isExists) {
								if(isExists) {
									//casper.click('li.inactive_tab a');
									wait.waitForElement('table.text.fullborder', function(err, isExists) {
										if(isExists) {
											var id = casper.evaluate(function(){
												for(var i=1; i<=7; i++) {
													var group = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
													if (group.innerText == 'Pending Email Verification') {
														document.querySelector('tr:nth-child('+i+') td:nth-child(3) a').click();
														var groupId = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('id');
														return groupId;
													}
												}
											});
											casper.click('a[id="'+id+'"]');
											wait.waitForElement('input#memberslist_viewable', function(err, isExists) {
												if(isExists) {
													utils.enableorDisableCheckbox('memberslist_viewable', true, function() {
														casper.echo('checkbox is checked', 'INFO');
													});
													casper.test.assertExists('button.button.btn-m.btn-blue');
													casper.click('button.button.btn-m.btn-blue');
													/*casper.wait(40000, function() {
													});*/
													wait.waitForElement('font[color="red"]', function(err, isExists) {
														if(isExists) {
															casper.echo("Permission unchanged",'INFO');
														}
													});
												}else {
													casper.echo(' Viewable on Members List  not found', 'ERROR');
												}
											});
										} else {
											casper.echo('Table not found', 'ERROR');
										}
									});
								} else {
									casper.echo('Calendar Permissions tab not found', 'ERROR');
								}
							});
						} else {
							casper.echo('Content  tooltip menu not found', 'ERROR');
						}
					});
				} else {
					casper.echo('Backend Menu not found', 'ERROR');
				}
			});
		}else {
			casper.echo('Error : ', 'ERROR');
		}
	});
	casper.then(function() {
		forumLoginMethod.backEndLogout(function() {
		});
		return callback(null);
	});
};
