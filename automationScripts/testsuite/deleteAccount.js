/****This script is dedicated for deleting user's  account on the forum. It covers testing of delete user's account on account setting page with all defined validations****/
'use strict';
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var editProfile = require('./editprofile.js');
var json = require('../testdata/editData.json');
var config = require('../../config/config.json');
//var errors = [];
var deleteAccount = module.exports = {};
deleteAccount.errors = [];
var screenShotsDir = config.screenShotsLocation + 'deleteAccount/';

deleteAccount.featureTest = function(casper, test, x) {
	
	//Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		this.echo('Alert message is verified when user try to delete an account', 'INFO');
	});
	
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		deleteAccount.errors.push(msg);
	});

	casper.start();
	casper.then(function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Open Front End URL And Registering a user And Verifying Do Not Delete Account', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/register/register"]', function success() {
						this.click('a[href^="/register/register"]');
						casper.waitForSelector('form[action="/register/create_account"]', function success() {
							this.echo('registration from opened successfully', 'INFO');
							forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
								if(!err) {
									casper.echo('user registered successfully', 'INFO');
									casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
										forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
											if(!err) {
												casper.waitForSelector('a.default-user', function success() {
													this.echo('User Logged-in Successfully', 'INFO');
													this.click('a.default-user');
													test.assertExists('a[href^="/register/register?edit="]');
													this.click('a[href^="/register/register?edit="]');
													test.assertExists('a[href^="/register?action=preferences&userid="]');
													this.click('a[href^="/register?action=preferences&userid="]');
													casper.waitForSelector('a#deleteAccountDialog', function success() {
														doNotDeleteAccount(casper, function(err) {});
													}, function fail() {
														casper.echo('ERROR OCCURRED', 'ERROR');
													});
												}, function fail() {
													casper.echo('ERROR OCCURRED', 'ERROR');
												});
											}else {
												casper.echo('Error : '+err, 'INFO');
											}
										});
									}, function fail() {
										casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
											forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
												if(!err) {
													casper.waitForSelector('a.default-user', function success() {
														this.echo('User Logged-in Successfully', 'INFO');
														this.click('a.default-user');
														test.assertExists('a[href^="/register/register?edit="]');
														this.click('a[href^="/register/register?edit="]');
														test.assertExists('a[href^="/register?action=preferences&userid="]');
														this.click('a[href^="/register?action=preferences&userid="]');
														casper.waitForSelector('a#deleteAccountDialog', function success() {
															doNotDeleteAccount(casper, function(err) {});
														}, function fail() {
															casper.echo('ERROR OCCURRED', 'ERROR');
														});
													}, function fail() {
														casper.echo('ERROR OCCURRED', 'ERROR');
													});
												}else {
													casper.echo('Error : '+err, 'INFO');
												}
											});
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									});
								}else {
									casper.echo('Error : '+err, 'INFO');
								}
							});		
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Open Front End URL And Registering a user And Verifying Delete Account', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
							if(!err) {
								casper.waitForSelector('a.default-user', function success() {
									this.echo('User logged-in successfully', 'INFO');
									this.click('a.default-user');
									test.assertExists('a[href^="/register/register?edit="]');
									this.click('a[href^="/register/register?edit="]');
									test.assertExists('a[href^="/register?action=preferences&userid="]');
									this.click('a[href^="/register?action=preferences&userid="]');
									casper.waitForSelector('a#deleteAccountDialog', function success() {
										deleteAccount(casper, function(err) {
											if(!err) {
												casper.echo('Delete Account Task Completed On Account Setting Page', 'INFO');
											}else {
												casper.echo('Error : '+err, 'INFO');
											}
										});
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Login To App And An Admin Deletes An Account From Members Page', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Reopen Front-End URL  And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Back-end Url And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Make A User An Admin
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					makeAnAdminUser(casper, test, function(err) {
						if(!err) {
							casper.echo('user "hs123" has been made an admin', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});						
	});

	//Open Forum URL And Delete An Account From Members Page 
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('.icon.icon-menu', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('.icon.icon-menu');
								casper.waitForSelector('a[href^="/register/members"]', function success() {
									this.click('a[href^="/register/members"]');
									casper.waitForSelector('input[name="delete_member"][type="checkbox"]', function success() {
										this.click('input[name="delete_member"][type="checkbox"]');
										casper.waitForSelector('i.glyphicon.glyphicon-trash', function success() {
											test.assertExists('i.glyphicon.glyphicon-trash');
											this.click('i.glyphicon.glyphicon-trash');
											this.echo('member is deleted successfully','INFO');				
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Login To App And An Admin Deletes An Account From Members Page', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Reopen Front-End URL And Delete An Account From Members Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('.icon.icon-menu', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('.icon.icon-menu');
								this.click('a[href^="/register/members"]');
								casper.waitForSelector('span.col-sm-9.right-side a strong', function success() {
									this.click('span.col-sm-9.right-side a strong');
									casper.waitForSelector('a#deleteAccountDialog', function success() {
										delAccount(casper, function() {
											this.echo('member is deleted successfully', 'INFO');
										});										
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 5', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Login To App And An Admin Deletes An Account From Members List Using Search-Box', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Reopen Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And An Admin Deletes An Account From Member's List Using Search-Box
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('.icon.icon-menu', function success() {
					casper.echo('User logged-in successfully', 'INFO');
					this.click('.icon.icon-menu');
					this.click('a[href^="/register/members"]');
					casper.waitForSelector('#inline_search_box', function success() {
						test.assertExists('#inline_search_box');
						this.sendKeys('input[id="inline_search_box"]', 'hs1234');
						this.click('#inline_search_box');
						this.page.sendEvent("keypress", this.page.event.key.Enter);
						casper.then(function() {
							try {
								test.assertExists(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'), 'checkbox is verified');
								this.click(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'));
								casper.waitForSelector('i.glyphicon.glyphicon-trash', function success() {
									test.assertExists('i.glyphicon.glyphicon-trash');
									this.click('i.glyphicon.glyphicon-trash');
									this.echo('member is deleted successfully','INFO');				
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							} catch (e) {
								test.assertDoesntExist(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'), 'checkbox is not verified');
							}										
						});
						
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

//*********************************6th Test Case Verification************************************************

	casper.then(function() {
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Open Front-End URL And An Admin Deletes Other Users Account From Members Page', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//Open Back End URL	
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
				this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Make A User An Admin
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					makeAnAdminUser(casper, test, function(err) {
						if(!err) {
							casper.echo('user "hs123" has been made an admin', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});						
	});

	//Reopen Front-End URL And An Admin Deletes Other User's Account From Members Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('.icon.icon-menu', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('.icon.icon-menu');
								try {
									this.test.assertExists('a[href^="/register/members"]');
									this.click('a[href^="/register/members"]');
									casper.waitForSelector('#inline_search_box', function success() {
										test.assertExists('#inline_search_box');
										this.sendKeys('input[id="inline_search_box"]', 'hs1234');
										this.click('#inline_search_box');
										this.page.sendEvent("keypress", this.page.event.key.Enter);
										casper.then(function() {
											try {
												test.assertExists(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'), 'checkbox is verified');
												this.click(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'));
												casper.waitForSelector('i.glyphicon.glyphicon-trash', function success() {
													test.assertExists('i.glyphicon.glyphicon-trash');
													this.click('i.glyphicon.glyphicon-trash');
													this.echo('member is deleted successfully','INFO');				
												}, function fail() {
													casper.echo('ERROR OCCURRED', 'ERROR');
												});
											} catch (e) {
												test.assertDoesntExist(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'), 'checkbox is not verified');
											}										
										});
									}, function fail() {
									
									});
								}catch(e) {
									test.assertDoesntExist('a[href^="/register/members"]', 'member tab not found');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
//*******************************7th Test Case Verification**********************************************

	casper.then(function() {
		casper.echo('                                      CASE 7', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Login To App And User Deletes Own Account From Topic List', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Reopen Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//Open Back End URL
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Make A Registered User 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					editProfile.makeRegisteredUser(casper, test, function(err) {
						if(!err) {
							casper.echo('user "hs123" has been made a Registered User', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});						
	});
	
	//Reopen Front-End URL And Start New Topic
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('i.icon.icon-menu', function success() {
								gotoNewTopicpage(casper, function(err) {
									if(!err) {
										casper.echo('start new topic page opened successfully', 'INFO');
										casper.wait(5000, function() {
											postTopicpage(json.newTopic, casper, function(err) {
												if(!err) {
													casper.echo('new topic created', 'INFO');
												}else {
													casper.echo('Error : '+err, 'INFO');
												}
											});	
										});
									}else {
										casper.echo('Error : '+err, 'INFO');
									}
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And User Deletes Own Account From Topic List
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('.icon.icon-menu', function success() {
								this.click('.icon.icon-menu');
								try {
									test.assertExists('a[href^="/latest"]');
									this.click('a[href^="/latest"]');
									casper.then(function() {
										var user = x('//p/a[text()="hs1234"]/ancestor::li/span/span/p/a');
										try {
											test.assertExists(user, 'user is verified');
											this.click(user);
											casper.waitForSelector('a#deleteAccountDialog', function success() {
												deleteAccount(casper, function(err) {
													if(!err) {
														casper.echo('member is deleted successfully', 'INFO');
													}else {
														casper.echo('Error : '+err, 'INFO');
													}
												});	
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
										}catch(e) {
											test.assertDoesntExist(user, 'user is not verified');
										}
									});
								}catch(e) {
									test.assertDoesntExist('a[href^="/latest"]', 'topics tab not found');
								}
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
				
				});
			}else {
			
			}
		});
	});

//***********************************8th Test Case Verification*****************************************

	casper.then(function() {
		casper.echo('                                      CASE 8', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Login To App And User Deletes Own Account From Topic List', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Reopen Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	//Open Back End URL
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Make A User An Admin
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					editProfile.makeRegisteredUser(casper, test, function(err) {
						if(!err) {
							casper.echo('user "hs123" has been made an admin', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});						
	});
	
	//Reopen Front-End URL And Start New Topic
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('i.icon.icon-menu', function success() {
								gotoNewTopicpage(casper, function(err) {
									if(!err) {
										casper.echo('start new topic page opened successfully', 'INFO');
										casper.wait(5000, function() {
											postTopicpage(json.newTopic, casper, function(err) {
												if(!err) {
													casper.echo('new topic created', 'INFO');
												}else {
													casper.echo('Error : '+err, 'INFO');
												}
											});	
										});
									}else {
										casper.echo('Error : '+err, 'INFO');
									}
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And User Deletes Own Account From Topic List
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('i.icon.icon-menu', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('.icon.icon-menu');
								try {
									this.test.assertExists('a[href^="/latest"]');
									this.click('a[href^="/latest"]');
									casper.waitForSelector('a.topic-title span', function success() {
										this.click('a.topic-title span');
										casper.waitForSelector('a#deleteAccountDialog', function success() {
											deleteAccount(casper, function(err) {
												if(!err) {
													casper.echo('member is deleted successfully', 'INFO');
												}else {
													casper.echo('Error : '+err, 'INFO');
												}
											});	
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('a[href^="/latest"]', 'topics tab not found');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
				
				});
			}else {
			
			}
		});
	});
};

//******************************************************************************************************************************

deleteAccount.backEndTest = function(casper, test, x) {
	
	casper.start();
	
	//Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		cleanup();
		this.echo('alert message: ' + message, 'INFO');
		//var expectedErrorMsg = 'Delete the selected user?';
		//test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified when user try to delete an account', 'INFO');
		function cleanup() {
			// remove all event listeners created in this promise
			stream.removeListener('remote.alert');
			//stream.removeListener('error', onerror)
			//stream.removeListener('end', cleanup)
		  }
	});
	
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		deleteAccount.errors.push(msg);
	});


	casper.then(function() {
		casper.echo('                                      CASE 9', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('An Admin Delete An Account From Profile Page', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Reopen Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Back End URL
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Make A User An Admin
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					makeAnAdminUser(casper, test, function(err) {
						if(!err) {
							casper.echo('user "hs123" has been made an admin', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});						
	});
	

	//Reopen Front-End URL And Delete An Account From User's Profile Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('.icon.icon-menu', function success() {
								casper.echo('Admin User logged-in successfully', 'INFO');
								this.click('.icon.icon-menu');
								try {
									this.test.assertExists('a[href^="/latest"]');
									this.click('a[href^="/latest"]');
									casper.then(function() {
										var user = x('//p/a[text()="hs1234"]/ancestor::li/span/span/p/a');
										try {
											test.assertExists(user, 'user is verified');
											this.click(user);
											casper.waitForSelector('#anchor_tab_edit', function success() {
												var id = this.getElementAttribute('input[type="hidden"][name="userid"]', 'value');
												this.click('#anchor_tab_edit');
												casper.waitForSelector('a[href^="/register?action=preferences&userid='+id+'"]', function success() {
													this.click('a[href^="/register?action=preferences&userid='+id+'"]');
													//Delete User's Account.
													casper.waitForSelector('a#deleteAccountDialog', function success() {
														deleteAccount(casper, function(err) {
															if(!err) {
																casper.echo('member is deleted successfully', 'INFO');
															}else {
																casper.echo('Error : '+err, 'INFO');
															}
														});	
													}, function fail() {
														casper.echo('ERROR OCCURRED', 'ERROR');
													});
												}, function fail() {
													casper.echo('ERROR OCCURRED', 'ERROR');
												});
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
										}catch(e) {
											test.assertDoesntExist(user, 'user is not verified');
										}
									});
								}catch(e) {
									test.assertDoesntExist('a[href^="/latest"]', 'topics tab not found');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 10', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Register A User And Do Not Delete An Account From profilePage', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Reopen Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And Do Not Delete An Account From User's profilePage
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a.default-user', function success() {
					casper.echo('User logged-in successfully', 'INFO');
					this.click('a.default-user ');
					this.test.assertExists('span li a[href^="/profile/"]');
					this.click('span li a[href^="/profile/"]');
					casper.waitForSelector('div.dropdown.change-profile-pic.fadein layer-to-front', function success() {
						doNotDeleteAccount(casper, function(err) {
							if(!err) {
								casper.echo('member is deleted successfully', 'INFO');
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 11', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Register A User And Delete An Account From profile Page', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Reopen Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And Delete An Account From User's profilePage
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a.default-user', function success() {
					casper.echo('User logged-in successfully', 'INFO');
					this.click('a.default-user ');
					this.test.assertExists('span li a[href^="/profile/"]');
					this.click('span li a[href^="/profile/"]');
					casper.waitForSelector('div.dropdown.change-profile-pic.fadein layer-to-front', function success() {
						deleteAccount(casper, function(err) {
							if(!err) {
								casper.echo('member is deleted successfully', 'INFO');
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 12', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Login To Forum Back-end And Delete An Account', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Reopen Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-end And Delete An Account
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
			
				//Clicking On 'Users' Tab Under Settings And Open Group Permissions
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					try {
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
						try {
							test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
							this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
							casper.waitForSelector('#autosuggest', function success() {
								this.sendKeys('#autosuggest', 'hs1234', {keepFocus: true});
								this.click('#autosuggest');
								this.page.sendEvent("keypress", this.page.event.key.Enter);
								casper.waitForSelector('#changeUserGroupActions a.button span.delete', function success() {
									this.click('#changeUserGroupActions a.button span.delete');
									this.echo('Delete Account Task Completed Of Newly Registered User From Back-end', 'INFO');			
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							});
						}catch(e) {
							test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]', 'group permission link not found under users tab');
						}
					}catch(e) {
						test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', 'users tab not found');
					}
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 13', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Login To Forum Back-end And Delete An Account Of A Registered User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-end And Delete An Account Of A Registered User
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
	
				//Clicking On 'Users' Tab Under Settings And Open Group Permissions
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
					this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
					casper.waitForSelector('table.text.fullborder', function success() {
						//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Registered Users') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a:nth-child(2)').getAttribute('href');
									return x2;
								}
							}
						});
						var id = grpName.split('=');
						var id = id[2];
						this.click('a[data-tooltip-elm="ugManage'+id+'"]');
						this.click('a[href="'+grpName+'"]');
						casper.waitForSelector('#groupUsersList input[name="user_id"][type="checkbox"]', function success() {
							this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
							try {
								test.assertExists('#floatingActionMenu select.text');
								this.click('#floatingActionMenu select.text');
								try {
									test.assertExists('select.text option[value="delete_members"]');
									this.click('select.text option[value="delete_members"]');
									this.echo('Delete Account Task Completed For Registered User From The Back-end', 'INFO');
								}catch(e) {
								test.assertDoesntExist('select.text option[value="delete_members"]');
								}
							}catch(e) {
								test.assertDoesntExist('#floatingActionMenu select.text');
							}
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 14', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Login To Forum Back-end And Delete An Account Of A Pending Email Verification User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-end And Delete An Account Of A Pending Email Verification User
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
	
				//Clicking On 'Users' Tab Under Settings And Open Group Permissions
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
					this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
					casper.waitForSelector('table.text.fullborder', function success() {
						//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Pending Email Verification') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a:nth-child(2)').getAttribute('href');
									return x2;
								}
							}
						});
						var id = grpName.split('=');
						var id = id[2];
						this.click('a[data-tooltip-elm="ugManage'+id+'"]');
						this.click('a[href="'+grpName+'"]');
						casper.waitForSelector('#groupUsersList input[name="user_id"][type="checkbox"]', function success() {
							this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
							try {
								test.assertExists('#floatingActionMenu select.text');
								this.click('#floatingActionMenu select.text');
								try {
									test.assertExists('select.text option[value="delete_members"]');
									this.click('select.text option[value="delete_members"]');
									this.echo('Delete Account Task Completed For Pending Email Verificationm User From The Back-end', 'INFO');
								}catch(e) {
								test.assertDoesntExist('select.text option[value="delete_members"]');
								}
							}catch(e) {
								test.assertDoesntExist('#floatingActionMenu select.text');
							}
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 15', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Login To Forum Back-end And Delete An Account Of An Admin User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-end And Delete An Account Of An Admin User
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
	
				//Clicking On 'Users' Tab Under Settings And Open Group Permissions
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
					this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
					casper.waitForSelector('table.text.fullborder', function success() {
						//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
						var grpName = this.evaluate(function(){
							for(var i=1; i<=7; i++) {
								var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
								if (x1.innerText == 'Administrators') {
									var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a:nth-child(2)').getAttribute('href');
									return x2;
								}
							}
						});
						var id = grpName.split('=');
						var id = id[2];
						this.click('a[data-tooltip-elm="ugManage'+id+'"]');
						this.click('a[href="'+grpName+'"]');
						casper.waitForSelector('#groupUsersList input[name="user_id"][type="checkbox"]', function success() {
							this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
							try {
								test.assertExists('#floatingActionMenu select.text');
								this.click('#floatingActionMenu select.text');
								try {
									test.assertExists('select.text option[value="delete_members"]');
									this.click('select.text option[value="delete_members"]');
									this.echo('Delete Account Task Completed For Admin User From The Back-end', 'INFO');
								}catch(e) {
								test.assertDoesntExist('select.text option[value="delete_members"]');
								}
							}catch(e) {
								test.assertDoesntExist('#floatingActionMenu select.text');
							}
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
};

/************************************Delete Account with Settings**********************/

deleteAccount.customFieldsTest = function(casper, test) {

	casper.start();

	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		deleteAccount.errors.push(msg);
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 16', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Open Back-End URL And Change "Delete Own Profile" Permission For Pending Email Verification User Group', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});
	
	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					disableDeleteOwnProfileForPendingUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for pending user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Front-End URL And Delete An Account From Account Setting Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a.default-user', function success() {
					casper.echo('User logged-in successfully', 'INFO');
					this.click('a.default-user');
					try {
						test.assertExists('a[href^="/register?action=preferences"]');	
						this.click('a[href^="/register?action=preferences"]');	
						casper.waitForSelector('a#deleteAccountDialog', function success() {
							deleteAccount(casper, function(err) {});					
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
					}
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 17', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Open Front End URL And Registering a user And Verifying Delete Account From Account Setting page', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});


	//Open Forum Backend URL And Get Title 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-End And Change Permissions From Back End For Registered User
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					disableDeleteOwnProfileForRegisteredUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for registered user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Reopen Front-End URL And Delete An Account From Account Setting Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('a.default-user', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('a.default-user');
								try {
									test.assertExists('a[href^="/register?action=preferences"]');	
									this.click('a[href^="/register?action=preferences"]');	
									casper.waitForSelector('a#deleteAccountDialog', function success() {
										deleteAccount(casper, function(err) {});					
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 18', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Profile Page By Changing Permissions For Pending User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					disableDeleteOwnProfileForPendingUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for pending user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And Delete An Account From User's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a.default-user', function success() {
					casper.echo('User logged-in successfully', 'INFO');
					this.click('a.default-user');
					try {
						test.assertExists('a[href^="/profile"]');	
						this.click('a[href^="/profile/"]');	
						casper.waitForSelector('a#deleteAccountDialog', function success() {
							deleteAccount(casper, function(err) {});					
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('a[href^="/profile"]', 'profile link not found');
					}
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 19', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Profile Page By Changing Permissions For Registered User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Forum Backend URL And Get Title 
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					disableDeleteOwnProfileForRegisteredUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for registered user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Reopen Front-End URL And Delete An Account From User's Profile Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('a.default-user', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('a.default-user');
								try {
									test.assertExists('a[href^="/profile"]');	
									this.click('a[href^="/profile/"]');
									casper.waitForSelector('a#deleteAccountDialog', function success() {
										deleteAccount(casper, function(err) {});					
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 20', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Account Setting Page By Changing Permissions For Pending User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Forum Backend URL  
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permissions From Back End 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					enableDeleteOwnProfileForPendingUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for pending user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a.default-user', function success() {
					casper.echo('User logged-in successfully', 'INFO');
					this.click('a.default-user');
					try {
						test.assertExists('a[href^="/register?action=preferences"]');	
						this.click('a[href^="/register?action=preferences"]');	
						casper.waitForSelector('a#deleteAccountDialog', function success() {
							deleteAccount(casper, function(err) {});					
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
					}
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});


	casper.then(function() {
		casper.echo('                                      CASE 21', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Account Setting Page By Changing Permissions For Pending User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Forum Backend URL  
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permissions From Back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					enableDeleteOwnProfileForPendingUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for pending user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a.default-user', function success() {
					casper.echo('User logged-in successfully', 'INFO');
					this.click('a.default-user');
					try {
						test.assertExists('a[href^="/register?action=preferences"]');	
						this.click('a[href^="/register?action=preferences"]');	
						casper.waitForSelector('a#deleteAccountDialog', function success() {
							deleteAccount(casper, function(err) {});					
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
					}
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});
};

//*************************************************************************************************************************************

deleteAccount.customFieldsTest2 = function(casper, test) {

	casper.start();
	
	//Method For Verifying JavaScript Errors
	casper.on("page.error", function(msg, trace) {
		this.echo("Error:    " + msg, "ERROR");
		this.echo("file:     " + trace[0].file, "WARNING");
		this.echo("line:     " + trace[0].line, "WARNING");
		this.echo("function: " + trace[0]["function"], "WARNING");
		deleteAccount.errors.push(msg);
	});

	casper.then(function() {
		casper.echo('                                      CASE 22', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Account Setting Page By Changing Permissions For Pending User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Forum Backend URL  
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permissions From Back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					enableDeleteOwnProfileForPendingUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for pending user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a.default-user', function success() {
					casper.echo('User logged-in successfully', 'INFO');
					this.click('a.default-user');
					try {
						test.assertExists('a[href^="/register?action=preferences"]');	
						this.click('a[href^="/register?action=preferences"]');	
						casper.waitForSelector('a#deleteAccountDialog', function success() {
							deleteAccount(casper, function(err) {});					
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
					}
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 23', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Account Setting Page By Changing Permissions For Registered User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Forum Backend URL  
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permissions From Back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for registered user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});	

	//Reopen Front-End URL And Delete An Account From Account Setting Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('a.default-user', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('a.default-user');
								try {
									test.assertExists('a[href^="/register?action=preferences"]');	
									this.click('a[href^="/register?action=preferences"]');	
									casper.waitForSelector('a#deleteAccountDialog', function success() {
										deleteAccount(casper, function(err) {});					
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 24', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Account Setting Page By Changing Permissions For Registered User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Forum Backend URL  
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permissions From Back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for registered user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Reopen Front-End URL And Delete An Account From Account Setting Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('a.default-user', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('a.default-user');
								try {
									test.assertExists('a[href^="/register?action=preferences"]');	
									this.click('a[href^="/register?action=preferences"]');	
									casper.waitForSelector('a#deleteAccountDialog', function success() {
										deleteAccount(casper, function(err) {});					
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 25', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Account Setting Page By Changing Permissions For Registered User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Forum Backend URL  
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permissions From Back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for registered user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Reopen Front-End URL And Delete An Account From Account Setting Page
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('a.default-user', function success() {
								casper.echo('User logged-in successfully', 'INFO');
								this.click('a.default-user');
								try {
									test.assertExists('a[href^="/register?action=preferences"]');	
									this.click('a[href^="/register?action=preferences"]');	
									casper.waitForSelector('a#deleteAccountDialog', function success() {
										deleteAccount(casper, function(err) {});					
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 26', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Account Setting Page By Changing Permissions For Pending User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	//Open Forum Backend URL  
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Change Permissions From Back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					enableDeleteOwnProfileForPendingUser(casper, casper.test, function(err) {
						if(!err) {
							casper.echo('permission changed for pending user', 'INFO');
						}else {
							casper.echo('Error : '+err, 'INFO');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Open Front-End URL And Register A User
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
							if(!err) {
								casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
									casper.echo('user registered successfully', 'INFO');
								}, function fail() {
									casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a.default-user', function success() {
					casper.echo('User logged-in successfully', 'INFO');
					this.click('a.default-user');
					try {
						test.assertExists('a[href^="/profile"]');	
						this.click('a[href^="/profile/"]');	
						casper.waitForSelector('a#deleteAccountDialog', function success() {
							deleteAccount(casper, function(err) {});					
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
					}
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 27', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('Delete An Account From Profile Page By Changing Permissions For Registered User', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/register/register"]', function success() {
						this.click('a[href^="/register/register"]');
						casper.waitForSelector('form[action="/register/create_account"]', function success() {
							this.echo('registration from opened successfully', 'INFO');
							forumRegister.registerToApp(json.deleteAccount, casper, function(err) {
								if(!err) {
									casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
										casper.echo('user registered successfully', 'INFO');
									}, function fail() {
										casper.waitForSelector('div.alert.alert-danger.text-center', function success() {
											casper.echo('user registered successfully', 'INFO');
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									});
								}else {
									casper.echo('Error : '+err, 'INFO');
								}
							});		
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
		casper.thenOpen(config.backEndUrl, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
			try {
				this.click('a[href="/tool/members/login?action=logout"]');
			}catch(e) {
				test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
			}
		});
		casper.then(function() {
			forumRegister.loginToForumBackEnd(casper, test, function(err) {
				if(!err) {
					casper.echo('Logged-in successfully from back-end', 'INFO');
					casper.waitForSelector('div#my_account_forum_menu', function success() {
						enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function(err) {
							if(!err) {
								casper.echo('permission changed for registered user', 'INFO');
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});

		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
							if(!err) {
								casper.waitForSelector('a.default-user', function success() {
									casper.echo('User logged-in successfully', 'INFO');
									this.click('a.default-user');
									try {
										test.assertExists('a[href^="/profile"]');	
										this.click('a[href^="/profile/"]');	
										casper.waitForSelector('a#deleteAccountDialog', function success() {
											deleteAccount(casper, function(err) {});					
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									}catch(e) {
										test.assertDoesntExist('a[href^="/register?action=preferences"]', 'account setting tab not found');	
									}
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}else {
								casper.echo('Error : '+err, 'INFO');
							}
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
	});
};

//************************************PRIVATE METHODS***********************************

//Method For Deleting User's Account

var deleteAccount = function(driver, callback) {
	try {
		driver.test.assertExists('#deleteAccountDialog');
		driver.click('#deleteAccountDialog');
		try {
			driver.test.assertExists('#deleteAccount');
			driver.click('#deleteAccount');
			driver.echo('account is deleted successfully', 'INFO');
		}catch(e) {
			driver.test.assertDoesntExist('#deleteAccount');
		}
	}catch(e) {
		driver.test.assertDoesntExist('#deleteAccountDialog');
	}
	return callback(null);
};

//Method For Deleting User's Account 

var delAccount = function(driver, callback) {
	try {
		driver.test.assertExists('i.glyphicon.glyphicon-trash');
		driver.click('i.glyphicon.glyphicon-trash');
		try {
			driver.test.assertExists('#delUserAccount');
			driver.click('#delUserAccount');
			driver.echo('account is deleted successfully', 'INFO');
		}catch(e) {
			driver.test.assertDoesntExist('#delUserAccount');
		}
	}catch(e) {
		driver.test.assertDoesntExist('i.glyphicon.glyphicon-trash', 'delete account button not found');
	}
	return callback(null);
};

//Method For Do Not Delete User's Account

var doNotDeleteAccount = function(driver, callback) {
	try {
		driver.test.assertExists('#deleteAccountDialog');
		driver.click('#deleteAccountDialog');
		try {
			driver.test.assertExists('#doNotDelAccount');
			driver.click('#doNotDelAccount');
			driver.echo('account is not deleted', 'INFO');
		}catch(e) {
			driver.test.assertDoesntExist('#doNotDelAccount');
		}
	}catch(e) {
		driver.test.assertDoesntExist('#deleteAccountDialog');
	}
	return callback(null);
};

//Method for Verifying Success Message
var verifySuccessMsg = function(successMsg, expectedSuccessMsg, driver, callback) {
	driver.echo('Actual Success Message : '+successMsg, 'INFO');
	driver.echo('Expected Success Message : '+expectedSuccessMsg, 'INFO');
	try {
		driver.test.assertEquals(successMsg, expectedSuccessMsg);
		driver.echo('success message verified when user change permission from back-end for pending email verification user', 'INFO');
	}catch(e) {
		driver.echo('success message is not verified when user change permission from back-end for pending email verification user', 'ERROR');
	}
	return callback(null);
};

//Method For Changing User Group To Admin User
var makeAnAdminUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('#autosuggest', function success() {
				//this.sendKeys('#autosuggest', 'hs123', {keepFocus: true});
				driver.sendKeys('input[name="member"]', 'hs123', {reset : true});
				this.click('#autosuggest');
				this.page.sendEvent("keypress", this.page.event.key.Enter);
				driver.waitForSelector('form[name="ugfrm"]', function success() {
					if(this.evaluate(function () {return document.getElementById('20237479').checked;})) {           
					}else {
						this.fillSelectors('form[name="ugfrm"]', {
							'input[type="checkbox"]' :  '20237479'
						}, true);    
					}
					//this.click('input[id="20237479"]');
					//driver.click('button.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close');
					return callback(null);
				}, function fail() {
					driver.echo('ERROR OCCURRED', 'ERROR');
				});
			}, function fail() {
				driver.echo('ERROR OCCURRED', 'ERROR');
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Enabling Delete Own Profile Permission For Registered User
var enableDeleteOwnProfileForRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				//Clicking On 'Change Permissions' Link With Respect To 'Pending Email Verification Users'  
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Registered Users') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				var id = grpName.split('=');
				var id = id[2];
				this.click('a[data-tooltip-elm="ugManage'+id+'"]');
				this.click('a[href="'+grpName+'"]');
				driver.waitForSelector('#delete_profile', function success() {
					utils.enableorDisableCheckbox('delete_profile', true, driver, function() {
						driver.echo('checkbox is unchecked', 'INFO');
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						driver.waitForSelector('font[color="red"]', function success() {
							test.assertExists('font[color="red"]');
							var successMsg = this.fetchText('font[color="red"]');
							var expectedSuccessMsg = 'Your user group settings have been updated.';
							verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
								editProfile.makeRegisteredUser(driver, driver.test, function() {
									casper.echo('user group changed to registered user', 'INFO');
									return callback(null);					
								});
							});
						}, function fail() {
							driver.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
				}, function fail() {
					driver.echo('ERROR OCCURRED', 'ERROR');
				});
			}, function fail() {
				driver.echo('ERROR OCCURRED', 'ERROR');
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Enabling Delete Own Profile Permission For Pending User
var enableDeleteOwnProfileForPendingUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				//Clicking On 'Change Permissions' Link With Respect To 'Pending Users'  
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Pending Email Verification') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				var id = grpName.split('=');
				var id = id[2];
				this.click('a[data-tooltip-elm="ugManage'+id+'"]');
				this.click('a[href="'+grpName+'"]');
				driver.waitForSelector('#delete_profile', function success() {
					utils.enableorDisableCheckbox('delete_profile', true, driver, function() {
						driver.echo('checkbox is checked', 'INFO');
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						driver.waitForSelector('font[color="red"]', function success() {
							test.assertExists('font[color="red"]');
							var successMsg = this.fetchText('font[color="red"]');
							var expectedSuccessMsg = 'Your user group settings have been updated.';
							verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
								return callback(null);					
							});
						}, function fail() {
							driver.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
				}, function fail() {
					driver.echo('ERROR OCCURRED', 'ERROR');
				});
			}, function fail() {
				driver.echo('ERROR OCCURRED', 'ERROR');
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Disabling Delete Own Profile Permission For Registered User
var disableDeleteOwnProfileForRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				//Clicking On 'Change Permissions' Link With Respect To 'Pending Email Verification Users'  
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Registered Users') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				var id = grpName.split('=');
				var id = id[2];
				this.click('a[data-tooltip-elm="ugManage'+id+'"]');
				this.click('a[href="'+grpName+'"]');
				driver.waitForSelector('#delete_profile', function success() {
					utils.enableorDisableCheckbox('delete_profile', false, driver, function() {
						driver.echo('checkbox is unchecked', 'INFO');
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						driver.waitForSelector('font[color="red"]', function success() {
							test.assertExists('font[color="red"]');
							var successMsg = this.fetchText('font[color="red"]');
							var expectedSuccessMsg = 'Your user group settings have been updated.';
							verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
								editProfile.makeRegisteredUser(driver, driver.test, function() {
									casper.echo('user group changed to registered user', 'INFO');
									return callback(null);					
								});
							});
						}, function fail() {
							driver.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
				}, function fail() {
					driver.echo('ERROR OCCURRED', 'ERROR');
				});
			}, function fail() {
				driver.echo('ERROR OCCURRED', 'ERROR');
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Disabling Delete Own Profile Permission For Pending User
var disableDeleteOwnProfileForPendingUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				//Clicking On 'Change Permissions' Link With Respect To 'Pending Email Verification Users'  
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Pending Email Verification') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				var id = grpName.split('=');
				var id = id[2];
				this.click('a[data-tooltip-elm="ugManage'+id+'"]');
				this.click('a[href="'+grpName+'"]');
				driver.waitForSelector('#delete_profile', function success() {
					utils.enableorDisableCheckbox('delete_profile', false, driver, function() {
						driver.echo('checkbox is unchecked', 'INFO');
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						driver.waitForSelector('font[color="red"]', function success() {
							test.assertExists('font[color="red"]');
							var successMsg = this.fetchText('font[color="red"]');
							var expectedSuccessMsg = 'Your user group settings have been updated.';
							verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
								return callback(null);
							});
						}, function fail() {
							driver.echo('ERROR OCCURRED', 'ERROR');
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
				}, function fail() {
					driver.echo('ERROR OCCURRED', 'ERROR');
				});
			}, function fail() {
				driver.echo('ERROR OCCURRED', 'ERROR');
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

// method for goto New Topic page to application
var gotoNewTopicpage = function(driver, callback) {
	driver.test.assertExists('#links-nav');
	driver.click('#links-nav');
	driver.test.assertExists('#latest_topics_show');
	driver.click('#latest_topics_show');
	driver.waitForSelector('a[href="/post/printadd"]', function success() {
		this.click('a[href="/post/printadd"]');
		return callback(null);
	}, function fail() {
		casper.echo('Error Occurred', 'ERROR');
	});
};


// method for goto New Topic page to application
var postTopicpage = function(data, driver, callback) {
	casper.echo("data.title : "+data.title, 'INFO');
	casper.echo("data.content : "+data.content, 'INFO');
	casper.echo("data.category : "+data.category, 'INFO');
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	 driver.withFrame('message_ifr', function() {
		this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
		this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
 		this.sendKeys('#tinymce', data.content);
	});	
		driver.then(function() {});
		driver.click('#all_forums_dropdown');
		driver.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback(null);
};
