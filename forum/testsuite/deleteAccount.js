/****This script is dedicated for deleting user's  account on the forum. It covers testing of delete user's account on account setting page with all defined validations****/
'use strict';
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var json = require('../testdata/editData.json');
var config = require('../config/config.json');

var deleteAccount = module.exports = {};
//var forumRegister = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'deleteAccount/';

deleteAccount.featureTest = function(casper, test, x) {
	
	//Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = 'Delete the selected user?';
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified when user try to delete an account', 'INFO');
	});

	//Open Forum URL And Get Title 
	casper.start(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
	
	//Open Registration Form
	casper.then(function() {
		test.assertExists('a[href^="/register/register"]');
		this.click('a[href^="/register/register"]');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ '1_registerFrom.png');
			this.echo('registration from opened successfully', 'INFO');		
		});	
	});

	//Registering a user And Verifying Do Not Delete Account
	casper.then(function () {
		forumRegister.registerToApp(json.deleteAccount, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '1_registeredUser.png');
				this.echo('user registered successfully', 'INFO');
				//Clicking On User's Icon To Display User's Drop-down For Editing Profile
				casper.then(function() {
					try {
						test.assertExists('.default-user');
						this.click('.default-user');
						this.echo('clicked on users icon successfully', 'INFO');
						test.assertExists('a[href^="/register/register?edit="]');
						this.click('a[href^="/register/register?edit="]');
						test.assertExists('a[href^="/register?action=preferences&userid="]');
						this.click('a[href^="/register?action=preferences&userid="]');
					} catch (e) {
						forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function() {
							casper.wait(5000, function() {
								casper.echo('User Logged-in Successfully', 'INFO');	
								test.assertExists('.default-user');
								this.click('.default-user');
								test.assertExists('a[href^="/register/register?edit="]');
								this.click('a[href^="/register/register?edit="]');
								test.assertExists('a[href^="/register?action=preferences&userid="]');
								this.click('a[href^="/register?action=preferences&userid="]');
							
							}); 						
						});
					}
							
					//Do Not Delete User's Account. 
					casper.then(function() {
							test.assertExists('#deleteAccountDialog');

							test.assertExists('#doNotDelAccount');
						doNotDeleteAccount(casper, function() {
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '1_doNotDeleteAccount.png');
								this.echo('Account is not deleted', 'INFO');
							});
						});
						
					});
				});		
			});
			forumRegister.redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '1_logout.png');
					this.echo('Do Not Delete Account Task Completed', 'INFO');
				});
			});
		});
	});

	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And Delete User's Account
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '2_loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
				//Clicking On User's Icon To Display User's Drop-down For Editing Profile
				casper.then(function() {
					try {
						test.assertExists('.default-user');
						this.click('.default-user');
						try {
							test.assertExists('a[href^="/register/register?edit="]');
							this.click('a[href^="/register/register?edit="]');
							try {
								test.assertExists('a[href^="/register?action=preferences&userid="]');
								this.click('a[href^="/register?action=preferences&userid="]');
							} catch(e) {
								this.echo('account setting link not found', 'ERROR');
							}
						} catch(e) {
							this.echo('edit profile link not found', 'ERROR');
						}
						
					} catch (e) {
						this.echo('.default-user not found', 'ERROR');
					}
					
						
					//Delete User's Account. 
					casper.then(function() {
						deleteAccount(casper, function() {
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '2_delete.png');
								this.echo('Delete Account Task Completed On Account Setting Page', 'INFO');
							});
						});
					});
				});
			});
		});

	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And An Admin Deletes An Account From Member's List By Selecting 		   		Checkbox 
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Members's List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '3_memberList.png');
								casper.then(function() {
									try {
										test.assertExists('input[name="delete_member"][type="checkbox"]');
										this.click('input[name="delete_member"][type="checkbox"]');
										casper.wait(5000, function() {
											try {
												test.assertExists('i.glyphicon.glyphicon-trash');
												this.click('i.glyphicon.glyphicon-trash');
											}catch(e) {
												this.echo('delete account dialogue not found', 'ERROR');
											}
											casper.wait(5000, function() {
												this.capture(screenShotsDir+ '3_delete.png');
												this.echo('member is deleted successfully','INFO');				
											});
										});
									} catch (e) {
										this.echo('No user remained in the default list', 'ERROR');
									}
								});
							});
						}catch(e) {
							this.echo('members tab not found','ERROR');
						}
					}catch(e) {
						this.echo('menu icon not found','ERROR');
					}
				});
			});
			forumRegister.redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '3_logout.png');
					this.echo('Delete Account Task Completed When User deletes an Account From Member List By Check-Box', 'INFO');
				});
			});
				
		});

	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And An Admin Deletes An Account From Member's List By Selecting 		  		Member's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '4_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Members's List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '4_memberList.png');
								casper.then(function() {
									try {
										test.assertExists('span.col-sm-9.right-side a strong');
										this.click('span.col-sm-9.right-side a strong');
										casper.then(function() {
											delAccount(casper, function() {
												casper.wait(5000, function() {
	this.echo('member is deleted successfully', 'INFO');
	this.capture(screenShotsDir+ '4_delete.png');
});
											});										
										});
									} catch (e) {
										this.echo('No user remained in the default list', 'ERROR');
									}
								});
							});
						}catch(e) {
							this.echo('members tab not found','ERROR');
						}
					}catch(e) {
						this.echo('menu icon not found','ERROR');
					}
				});
			});
			forumRegister.redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '4_logout.png');
					this.echo('Delete Account Task Completed When Admin deletes an Account From Member List By Selecting Profile Page', 'INFO');
				});
			});
		});

	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A user
	casper.then(function() {
		test.assertExists('a[href^="/register/register"]');
		this.click('a[href^="/register/register"]');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ '5_registerFrom.png');
			this.echo('registration from opened successfully', 'INFO');
			forumRegister.registerToApp(json.deleteAccount, casper, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '5_registeredUser.png');
					this.echo('user registered successfully', 'INFO');
				});
			});		
		});	
	});

	//Login To App And An Admin Deletes An Account From Member's List Using Search-Box
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '5_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Members's List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '5_memberList.png');
								casper.then(function() {
									try {
										test.assertExists('#inline_search_box');
										this.sendKeys('input[id="inline_search_box"]', 'hs1234');
										this.click('#inline_search_box');
										this.page.sendEvent("keypress", this.page.event.key.Enter);
										casper.wait(3000, function() {
											this.capture(screenShotsDir+ '5_search.png');
											try {
												test.assertExists(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'), 'checkbox is verified');
												this.click(x('//a/strong[text()="hs1234"]/ancestor::li/span/input'));
												casper.wait(5000, function() {
												try {
													test.assertExists('i.glyphicon.glyphicon-trash');
												this.click('i.glyphicon.glyphicon-trash');
												}catch(e) {
													this.echo('delete account dialogue not found', 'ERROR');
												}
												casper.wait(5000, function() {
													this.capture(screenShotsDir+ '5_delete.png');
													this.echo('member is deleted successfully','INFO');				
													});
												});
											} catch (e) {
												this.echo('There is currently no members to display with the specified user name', 'ERROR');
											}										
										});
										
									} catch (e) {
										this.echo('search box not found', 'ERROR');
									}
								});
							});
						}catch(e) {
							this.echo('members tab not found','ERROR');
						}
					}catch(e) {
						this.echo('menu icon not found','ERROR');
					}
				});
			});
			forumRegister.redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '5_logout.png');
					this.echo('Account Delete task Completed From Members List By Searching iN Search Box','INFO');
				});
			});
		});

	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
	
	//Registering A user
	casper.then(function() {
		test.assertExists('a[href^="/register/register"]');
		this.click('a[href^="/register/register"]');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ '5_registerFrom.png');
			this.echo('registration from opened successfully', 'INFO');
			forumRegister.registerToApp(json.deleteAdmin, casper, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '5_registeredUser.png');
					this.echo('user registered successfully', 'INFO');
				});
			});		
		});	
	});

	//Login To App And An Admin Deletes Own Account From Member's List
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAdmin'].uname, json['deleteAdmin'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '6_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Members's List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '6_memberList.png');
								test.assertExists('#inline_search_box');
								this.sendKeys('input[id="inline_search_box"]', 'hsk');
								this.click('#inline_search_box');
								this.page.sendEvent("keypress", this.page.event.key.Enter);
								casper.wait(5000, function() {
									try {
										test.assertExists(x('//a/strong[text()="hsk"]/ancestor::li/span/input'), 'checkbox is verified');
										this.click(x('//a/strong[text()="hsk"]/ancestor::li/span/input'));
										casper.wait(5000, function() {
											try {
												test.assertExists('i.glyphicon.glyphicon-trash');
												this.click('i.glyphicon.glyphicon-trash');
											}catch(e) {
												this.echo('delete account dialogue not found', 'ERROR');
											}
											casper.wait(5000, function() {
												this.capture(screenShotsDir+ '6_delete.png');
												this.echo('member is deleted successfully','INFO');				
											});
										});
									} catch (e) {
										this.echo('user not found', 'ERROR');
									}
								});
							});
						}catch(e) {
							this.echo('member tab not found', 'ERROR');
						}
					}catch(e) {
						this.echo('menu icon not found', 'ERROR');
					}
				});
			});
			redirectToLogout(casper, test, function() {
				casper.echo('Account Delete task Completed From Members List When Admin Deletes Own Account','INFO');
			});
		});

	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And User Deletes Own Account From Topic List
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '7_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							test.assertExists('a[href^="/latest"]');
							this.click('a[href^="/latest"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '7_topicList.png');
								var user = x('//p/a[text()="hs1234"]/ancestor::li/span/span/p/a');
								try {
									test.assertExists(user, 'user is verified');
									this.click(user);
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ '7_topicListUser.png');
										deleteAccount(casper, function() {
											casper.wait(5000, function() {
	this.echo('member is deleted successfully', 'INFO');
	this.capture(screenShotsDir+ '7_delete.png');
											});
										});	
									});
								}catch(e) {
									casper.echo('user not found in topic list', 'ERROR');
								}
							});
						}catch(e) {
							this.echo('topic tab not found', 'ERROR');
						}
					}catch(e) {
						this.echo('menu icon not found', 'ERROR');
					}
				});
			});
			redirectToLogout(casper, test, function() {
				casper.echo('Account Delete task Completed When A User Deletes Own Account From Topic List','INFO');	
			});
		});

	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And User Deletes Own Account From Post Reply Topic List
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '8_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/latest"]');
							this.click('a[href^="/latest"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '8_topicList.png');
								try {
									test.assertExists('a.topic-title span');
									this.click('a.topic-title span');
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ '8_topicListUser.png');
										deleteAccount(casper, function() {
											casper.wait(5000, function() {
this.echo('member is deleted successfully', 'INFO');
this.capture(screenShotsDir+ '8_delete.png');
											});
										});	
									});
								}catch(e) {
									casper.echo('user not found', 'ERROR');
								}						
							});
						}catch(e) {
							casper.echo('topic tab not found', 'ERROR');
						}
					}catch(e) {
						casper.echo('menu icon not found', 'ERROR');
					}
				});
			});
			forumRegister.redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '8_logout.png');
					this.echo('Account Delete task Completed When A User Deletes Own Account From Post Reply Topic List','INFO');
				});
			});
		});
	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And An Admin Deletes Other user's Account From Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '9_loggedIn_user.png');
				casper.echo('Admin User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						this.test.assertExists('.icon.icon-menu');
						this.click('.icon.icon-menu');
						try {
							this.test.assertExists('a[href^="/latest"]');
							this.click('a[href^="/latest"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '9_topicList.png');
								var user = x('//p/a[text()="hs1234"]/ancestor::li/span/span/p/a');
								try {
									test.assertExists(user, 'user is verified');
									this.click(user);
									casper.wait(5000, function() {
										var id = this.getElementAttribute('input[type="hidden"][name="userid"]', 'value');
										this.capture(screenShotsDir+ '9_topicListUser.png');
										try {
											test.assertExists('#anchor_tab_edit');
											this.click('#anchor_tab_edit');
											casper.wait(5000, function() {
												this.capture(screenShotsDir+ '9_editProfile.png');
												try {
													test.assertExists('a[href^="/register?action=preferences&userid='+id+'"]');
																		this.click('a[href^="/register?action=preferences&userid='+id+'"]');
																		//Delete User's Account.
																		casper.wait(5000, function() { 
	this.capture(screenShotsDir+ '9_accountSetting.png');
	deleteAccount(casper, function() {
		casper.wait(5000, function() {
			this.echo('member is deleted successfully', 'INFO');
			this.capture(screenShotsDir+ '9_delete.png');
		});	
	}			);																		});
												}catch(e) {
													casper.echo('account setting link not found', 'ERROR');
												}																				
											});
										}catch(e) {
											casper.echo('edit button not found on user profile page', 'ERROR');
										}							
									});
								}catch(e) {
									casper.echo('user not found', 'ERROR');
								}
							});
						}catch(e) {
							casper.echo('topic tab not found', 'ERROR');
						}
					}catch(e) {
						casper.echo('menu icon not found', 'ERROR');
					}						
				});
			});
			forumRegister.redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '9_logout.png');
					this.echo('Account Delete task Completed From Members List When Admin Deletes Own Account','INFO');
				});
			});
		});
	});	

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And Do Not Delete An Account From User's profilePage
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '10_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						this.test.assertExists('a.default-user ');
						this.click('a.default-user ');
						try {
							this.test.assertExists('span li a[href^="/profile/"]');
							this.click('span li a[href^="/profile/"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '10_profile.png');
								casper.then(function() { 
									deleteAccount(casper, function() {
										casper.wait(5000, function() {
											this.echo('member is deleted successfully', 'INFO');
											this.capture(screenShotsDir+ '10_delete.png');
										});
									});
								});				
							});
						}catch(e) {
							this.echo('profile link not found', 'ERROR');
						}
					}catch(e) {
						this.echo('.default-user not found', 'ERROR');
					}						
				});
			});
			forumRegister.redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '10_logout.png');
					this.echo('Account Delete task Completed From Members List When Admin Deletes Own Account','INFO');
				});
			});
		});
	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And Delete An Account From User's profilePage
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '11_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');

				//Getting Topic List
				casper.then(function() {
					try {
						this.test.assertExists('a.default-user ');
						this.click('a.default-user ');
						try {
							this.test.assertExists('span li a[href^="/profile/"]');
							this.click('span li a[href^="/profile/"]');
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ '11_profile.png');
								casper.then(function() { 
									deleteAccount(casper, function() {
										casper.wait(5000, function() {
											this.echo('member is deleted successfully', 'INFO');
											this.capture(screenShotsDir+ '11_delete.png');
										});
									});
								});					
							});
						}catch(e) {
							this.echo('profile link not found', 'ERROR');
						}
					}catch(e) {
						this.echo('.default-user not found', 'ERROR');
					}						
				});
			});
			forumRegister.redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ '11_logout.png');
					this.echo('Account Delete task Completed From Members List When Admin Deletes Own Account','INFO');
				});
			});
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Registering a user
	casper.then(function () {
		forumRegister.registerToApp(json.deleteAccount, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '12_registeredUser.png');
				this.echo('User registered successfully', 'INFO');
			});
		});
	});

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Login To Forum Back-end And Delete An Account
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			
			//Clicking On 'Users' Tab Under Settings And Open Group Permissions
			casper.then(function() {
				try {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
					test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
					this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
					casper.wait(5000,function(){
						this.sendKeys('#autosuggest', 'hs1234', {keepFocus: true});
						this.click('#autosuggest');
						this.page.sendEvent("keypress", this.page.event.key.Enter);
						casper.wait(3000, function() {
							this.capture(screenShotsDir + '12_forum_popup.png');
							test.assertExists('#changeUserGroupActions a.button span.delete');
							this.click('#changeUserGroupActions a.button span.delete');
							casper.wait(3000, function() {
								this.capture(screenShotsDir + '12_delete.png');
								this.echo('Delete Account Task Completed Of Newly Registered User From Back-end', 'INFO');			
								this.click('a[href="/tool/members/login?action=logout"]');
							});
						});
					});
				}catch(e) {
					this.echo('users tab not found', 'ERROR');
				}
			});		
		});
	});

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Login To Forum Back-end And Delete An Account Of A Registered User
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
	
			//Clicking On 'Users' Tab Under Settings And Open Group Permissions
			casper.then(function() {
				test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				casper.wait(5000,function() {
					this.capture(screenShotsDir+ '13_groupPermission.png');
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946060"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946060"]');
					test.assertExists('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946060"]');
					this.click('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946060"]');
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ '13_registeredUserList.png');
						test.assertExists('#groupUsersList input[name="user_id"][type="checkbox"]');
						this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
						test.assertExists('#floatingActionMenu select.text');
						this.click('#floatingActionMenu select.text');
						test.assertExists('select.text option[value="delete_members"]');
						this.click('select.text option[value="delete_members"]');
						casper.wait(3000, function() {
							this.capture(screenShotsDir+ '13_delete.png');
							this.echo('Delete Account Task Completed For Registered User From The Back-end', 'INFO');
							this.click('a[href="/tool/members/login?action=logout"]');
						});
					});
				});
			});		
		});
	});
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Login To Forum Back-end And Delete An Account Of A Pending Email Verification
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			
			//Clicking On 'Users' Tab Under Settings And Open Group Permissions
			casper.then(function() {
				test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				casper.wait(5000,function() {
					this.capture(screenShotsDir+ '14_groupPermission.png');
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946055"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946055"]');
					test.assertExists('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946055"]');
					this.click('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946055"]');
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ '14_pendingUserList.png');
						test.assertExists('#groupUsersList input[name="user_id"][type="checkbox"]');
						this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
						test.assertExists('#floatingActionMenu select.text');
						this.click('#floatingActionMenu select.text');
						test.assertExists('select.text option[value="delete_members"]');
						this.click('select.text option[value="delete_members"]');
						casper.wait(3000, function() {
							this.capture(screenShotsDir+ '14_delete.png');
							this.echo('Delete Account Task Completed For Pending Email Verification From The Back-end', 'INFO');
							this.click('a[href="/tool/members/login?action=logout"]');
						});
					});
				});
			});		
		});
	});

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Login To Forum Back-end And Delete An Account Of An Administrator Users
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			
			//Clicking On 'Users' Tab Under Settings And Open Group Permissions
			casper.then(function() {
				test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
				test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				casper.wait(5000,function() {
					this.capture(screenShotsDir+ '15_groupPermission.png');
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946062"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946062"]');
					test.assertExists('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946062"]');
					this.click('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946062"]');
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ '15_adminUserList.png');
						test.assertExists('#groupUsersList input[name="user_id"][type="checkbox"]');
						this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
						test.assertExists('#floatingActionMenu select.text');
						this.click('#floatingActionMenu select.text');
						test.assertExists('select.text option[value="delete_members"]');
						this.click('select.text option[value="delete_members"]');
						casper.wait(3000, function() {
							this.capture(screenShotsDir+ '15_delete.png');
							this.echo('Delete Account Task Completed For Administrator User From The Back-end', 'INFO');
							this.click('a[href="/tool/members/login?action=logout"]');
						});
					});
				});
			});		
		});
	});		
};

/************************************Delete Account with Settings**********************/

deleteAccount.customFieldsTest = function(casper, test) {
	
	/******************1st Test Case Verification With Back-End Settings**************/
	
	//Open Back-End URL And Get Title
	casper.start(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Login To Forum BackEnd And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');	
				});
			});		
		});
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
		
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('account setting page is not opened', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
		});
	});

	/******************2nd Test Case Verification With Back-End Settings**************/	

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				disableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');
			
				});
			});		
		});
	});

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'A_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'A_delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('account setting page is not opened', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
			redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'C_logout.png');
					this.echo('Account Delete task Completed From Account Setting Page While Changing Setting From Back-End For Pending Email Verification User Group And Disable Disable Delete Account Button','INFO');
				});
			});
		});
	});

	/******************3rd Test Case Verification With Back-End Settings**************/	

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');
			
				});
			});		
		});
	});

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'A_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'A_delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('account setting page is not opened', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
			redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'C_logout.png');
					this.echo('Account Delete task Completed From Account Setting Page While Changing Setting From Back-End For Pending Email Verification User Group And Disable Disable Delete Account Button','INFO');
				});
			});
		});
	});

	/******************4th Test Case Verification With Back-End Settings**************/	

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');
				});
			});		
		});		
	});
	

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('account setting page is not opened', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
		});
	});

	/******************5th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
						casper.then(function() {
							this.click('a[href^="/register/register"]');
							forumRegister.redirectToLogout(casper, test, function() {});
						});
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});

		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
					casper.echo('permission changed for registered user', 'INFO');
				
				});
			});		
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
		this.capture(screenShotsDir+ '11.png');
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('account setting page is not opened', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
		});
	});

	/******************6th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
						casper.then(function() {
							this.click('a[href^="/register/register"]');
							forumRegister.redirectToLogout(casper, test, function() {});
						});
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});

		//Login To Forum Back-End
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				disableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
					casper.echo('permission changed for registered user', 'INFO');
				
				});
			});		
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
		this.capture(screenShotsDir+ '11.png');
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'A_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'A_delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('account setting page is not opened', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
			redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'C_logout.png');
					this.echo('Account Delete task Completed From Account Setting Page While Changing Setting From Back-End For Pending Email Verification User Group And Disable Disable Delete Account Button','INFO');
				});
			});
		});
	});

	/******************7th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
						casper.then(function() {
							this.click('a[href^="/register/register"]');
							forumRegister.redirectToLogout(casper, test, function() {});
						});
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});

		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
					casper.echo('permission changed for registered user', 'INFO');
				
				});
			});		
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'A_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'A_delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('account setting page is not opened', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
			redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'C_logout.png');
					this.echo('Account Delete task Completed From Account Setting Page While Changing Setting From Back-End For Pending Email Verification User Group And Disable Disable Delete Account Button','INFO');
				});
			});
		});
	});

	/******************8th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
						casper.then(function() {
							this.click('a[href^="/register/register"]');
							forumRegister.redirectToLogout(casper, test, function() {});
						});
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
	
		casper.thenOpen(config.backEndUrl, function() {
			test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});

		//Login To Forum Back-End
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
	
			//Clicking On 'Users' Tab Under Settings And Open Group Permissions
			casper.then(function() {
				enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
					casper.echo('permission changed for registered user', 'INFO');
				
				});
			});		
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And Delete An Account From Account Setting Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/register?action=preferences"]');	
							this.click('a[href^="/register?action=preferences"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('account setting page is not opened', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
		});
	});

	/******************9th Test Case Verification With Back-End Settings**************/
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Login To Forum BackEnd And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');	
				});
			});		
		});
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum home page', 'ERROR');
		}
	});

	//Login To App And Delete An Account From User's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/profile"]');	
							this.click('a[href^="/profile/"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('profile link not found', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
		});
	});

	/******************10th Test Case Verification With Back-End Settings**************/	

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Pending Email 		Verification User Group
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				disableDeleteOwnProfileForPendingUser(casper, casper.test, function() {
					casper.echo('permission changed for pending user', 'INFO');
			
				});
			});		
		});
	});

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum home page', 'ERROR');
		}
	});

	//Login To App And Delete An Account From User's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'A_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/profile"]');	
							this.click('a[href^="/profile/"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'A_delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('profile link not found', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
			redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'C_logout.png');
					this.echo('Account Delete task Completed From Account Setting Page While Changing Setting From Back-End For Pending Email Verification User Group And Disable Disable Delete Account Button','INFO');
				});
			});
		});
	});

	/******************11th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
						casper.then(function() {
							this.click('a[href^="/register/register"]');
							forumRegister.redirectToLogout(casper, test, function() {});
						});
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});

		//Login To Forum Back-End
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				enableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
					casper.echo('permission changed for registered user', 'INFO');
				
				});
			});		
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
		this.capture(screenShotsDir+ '11.png');
	});

	//Login To App And Delete An Account From User's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/profile"]');	
							this.click('a[href^="/profile/"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('profile link not found', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
		});
	});

	/******************12th Test Case Verification With Back-End Settings**************/

	//Open Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});
		
	//Registering A User On Forum
	casper.then(function () {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'registeredUser.png');
						this.echo('User registered successfully', 'INFO');
						casper.then(function() {
							this.click('a[href^="/register/register"]');
							forumRegister.redirectToLogout(casper, test, function() {});
						});
					});
				});		
			});
		}catch(e) {
			casper.echo('register link not found on forum', 'ERROR');
		}
	});	

	//Open Back-End URL And Change 'Delete Own Profile' Permission For Registered User Group
	casper.then(function() {

		//Open Forum Backend URL And Get Title 
		casper.thenOpen(config.backEndUrl, function() {
			test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});

		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			casper.then(function() {
				disableDeleteOwnProfileForRegisteredUser(casper, casper.test, function() {
					casper.echo('permission changed for registered user', 'INFO');
				
				});
			});		
		});
	});

	//Reopen Front-End URL
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
		this.capture(screenShotsDir+ '11.png');
	});

	//Login To App And Delete An Account From User's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'A_loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
				casper.then(function() {
					try {
						test.assertExists('a.default-user');	
						this.click('a.default-user');
						try {
							test.assertExists('a[href^="/profile"]');	
							this.click('a[href^="/profile/"]');	
							casper.wait(5000, function() {
								this.capture(screenShotsDir+ 'A_accountSetting.png');
								deleteAccount(casper, function() {
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'A_delete.png');
									});						
								});					
							});
						}catch(e) {
							casper.echo('profile link not found', 'ERROR');
						}
					}catch(e) {
						casper.echo('.default-user not found', 'ERROR');
					}	
				});
			});
			redirectToLogout(casper, test, function() {
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'C_logout.png');
					this.echo('Account Delete task Completed From Account Setting Page While Changing Setting From Back-End For Pending Email Verification User Group And Disable Disable Delete Account Button','INFO');
				});
			});
		});
	});	
};

/************************************PRIVATE METHODS***********************************/

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
			driver.echo('delete account Button(yes) not found', 'ERROR');
		}
	}catch(e) {
		driver.echo('delete account dialogue not found', 'ERROR');
	}
	return callback();
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
			driver.echo('delete account Button(yes) not found', 'ERROR');
		}
	}catch(e) {
		driver.echo('delete account dialogue not found', 'ERROR');
	}
	return callback();
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
			driver.echo('delete account Button(yes) not found', 'ERROR');
		}
	}catch(e) {
		driver.echo('delete account dialogue not found', 'ERROR');
	}
	return callback();
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
	return callback();
};

//Method For Logout From Front End
var redirectToLogout = function(driver, test, callback) {
	driver.then(function() {
		try {
			this.test.assertExists('button.dropdown-toggle span.caret');
			this.test.assertExists('#logout');
			forumLogin.logoutFromApp(driver, function() {
				casper.echo('Successfully logout from forum', 'INFO');
				return callback();
			});
		}catch(e) {
			this.echo('logout link not found', 'ERROR');
		}
	});
};

//Method For Changing User Group To Registered User
var makeRegisteredUser = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.wait(5000, function() {
				try {
					this.test.assertExists('#autosuggest');
					this.sendKeys('#autosuggest', 'hs1234', {keepFocus: true});
					this.click('#autosuggest');
					this.page.sendEvent("keypress", this.page.event.key.Enter);
					driver.wait(3000, function() {
						driver.then(function() {
							this.fillSelectors('form[name="ugfrm"]', {
								'select[name="usergroupid"]' :  '946060'
							}, true);
						});
						driver.wait(3000, function() {
							this.capture(screenShotsDir + 'popUp.png');
							return callback();
						});
					});
				}catch(e) {
					driver.echo('search box not found on group permission page', 'ERROR');
				}
			});
		}catch(e) {
			driver.echo('Group Permission link not found', 'ERROR');
		}
	}catch(e) {
		driver.echo('users tab not found', 'ERROR');
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
			driver.wait(5000,function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				try {
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946060"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946060"]');
					try {
						test.assertExists('a[href^="/tool/members/mb/usergroup?action=edit&usergroupid=946060"]');
						this.click('a[href^="/tool/members/mb/usergroup?action=edit&usergroupid=946060"]');
						driver.wait(5000, function() {
							this.capture(screenShotsDir+ 'changePermission.png');
							try {
								test.assertExists('#delete_profile');
								utils.enableorDisableCheckbox('delete_profile', true, driver, function() {
									driver.echo('checkbox is checked', 'INFO');
									driver.capture(screenShotsDir+ 'checked.png');			
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									driver.wait(5000, function() {
										this.capture(screenShotsDir+ 'updatedChangePermission.png');
										try {
											test.assertExists('font[color="red"]');
											var successMsg = this.fetchText('font[color="red"]');
											var expectedSuccessMsg = 'Your user group settings have been updated.';
											verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
												driver.capture(screenShotsDir+ 'success.png');
												makeRegisteredUser(driver, driver.test, function() {
													casper.echo('user group changed to registered user', 'INFO');
													test.assertExists('a[href="/tool/members/login?action=logout"]');
													driver.click('a[href="/tool/members/login?action=logout"]');
													return callback();					
												});
											});
										}catch(e) {
											driver.echo('success message not found', 'ERROR');
										}
									});
								}catch(e) {
									driver.echo('save button not found on change permission page', 'ERROR');
								}
								
							}catch(e) {
								driver.echo('checkbox for delete own profile not found', 'ERROR');
							}
						});
					}catch(e) {
						driver.echo('change permission link not found', 'ERROR');
					}
				}catch(e) {
					driver.echo('manage link not found on group permission page', 'ERROR');
				}
			});
		}catch(e) {
			driver.echo('group permission not found under users tab', 'ERROR');
		}
	}catch(e) {
		driver.echo('users tab not found on forum back-end', 'ERROR');
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
			driver.wait(5000,function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				try {
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946055"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946055"]');
					try {
						test.assertExists('a[href^="/tool/members/mb/usergroup?action=edit&usergroupid=946055"]');
						this.click('a[href^="/tool/members/mb/usergroup?action=edit&usergroupid=946055"]');
						driver.wait(5000, function() {
							this.capture(screenShotsDir+ 'changePermission.png');
							try {
								test.assertExists('#delete_profile');
								utils.enableorDisableCheckbox('delete_profile', true, driver, function() {
									driver.echo('checkbox is checked', 'INFO');
									driver.capture(screenShotsDir+ 'checked.png');			
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									driver.wait(5000, function() {
										this.capture(screenShotsDir+ 'updatedChangePermission.png');
										try {
											test.assertExists('font[color="red"]');
											var successMsg = this.fetchText('font[color="red"]');
											var expectedSuccessMsg = 'Your user group settings have been updated.';
											verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
												driver.capture(screenShotsDir+ 'success.png');
												test.assertExists('a[href="/tool/members/login?action=logout"]');
												driver.click('a[href="/tool/members/login?action=logout"]');
												return callback();
											});
										}catch(e) {
											driver.echo('success message not found', 'ERROR');
										}
									});
								}catch(e) {
									driver.echo('save button not found on change permission page', 'ERROR');
								}
							}catch(e) {
								driver.echo('checkbox for delete own profile not found', 'ERROR');
							}
						});
					}catch(e) {
						driver.echo('change permission link not found', 'ERROR');
					}
				}catch(e) {
					driver.echo('manage link not found on group permission page', 'ERROR');
				}
			});
		}catch(e) {
			driver.echo('group permission not found under users tab', 'ERROR');
		}
	}catch(e) {
		driver.echo('users tab not found on forum back-end', 'ERROR');
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
			driver.wait(5000,function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				try {
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946060"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946060"]');
					try {
						test.assertExists('a[href^="/tool/members/mb/usergroup?action=edit&usergroupid=946060"]');
						this.click('a[href^="/tool/members/mb/usergroup?action=edit&usergroupid=946060"]');
						driver.wait(5000, function() {
							this.capture(screenShotsDir+ 'changePermission.png');
							try {
								test.assertExists('#delete_profile');
								utils.enableorDisableCheckbox('delete_profile', false, driver, function() {
									driver.echo('checkbox is unchecked', 'INFO');
									driver.capture(screenShotsDir+ 'checked.png');			
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									driver.wait(5000, function() {
										this.capture(screenShotsDir+ 'updatedChangePermission.png');
										try {
											test.assertExists('font[color="red"]');
											var successMsg = this.fetchText('font[color="red"]');
											var expectedSuccessMsg = 'Your user group settings have been updated.';
											verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
												driver.capture(screenShotsDir+ 'success.png');
												makeRegisteredUser(driver, driver.test, function() {
													casper.echo('user group changed to registered user', 'INFO');
													test.assertExists('a[href="/tool/members/login?action=logout"]');
													driver.click('a[href="/tool/members/login?action=logout"]');
													return callback();					
												});
											});
										}catch(e) {
											driver.echo('success message not found', 'ERROR');
										}
									});
								}catch(e) {
									driver.echo('save button not found on change permission page', 'ERROR');
								}
								
							}catch(e) {
								driver.echo('checkbox for delete own profile not found', 'ERROR');
							}
						});
					}catch(e) {
						driver.echo('change permission link not found', 'ERROR');
					}
				}catch(e) {
					driver.echo('manage link not found on group permission page', 'ERROR');
				}
			});
		}catch(e) {
			driver.echo('group permission not found under users tab', 'ERROR');
		}
	}catch(e) {
		driver.echo('users tab not found on forum back-end', 'ERROR');
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
			driver.wait(5000,function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				try {
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946055"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946055"]');
					try {
						test.assertExists('a[href^="/tool/members/mb/usergroup?action=edit&usergroupid=946055"]');
						this.click('a[href^="/tool/members/mb/usergroup?action=edit&usergroupid=946055"]');
						driver.wait(5000, function() {
							this.capture(screenShotsDir+ 'changePermission.png');
							try {
								test.assertExists('#delete_profile');
								utils.enableorDisableCheckbox('delete_profile', true, driver, function() {
									driver.echo('checkbox is checked', 'INFO');
									driver.capture(screenShotsDir+ 'checked.png');			
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									driver.wait(5000, function() {
										this.capture(screenShotsDir+ 'updatedChangePermission.png');
										try {
											test.assertExists('font[color="red"]');
											var successMsg = this.fetchText('font[color="red"]');
											var expectedSuccessMsg = 'Your user group settings have been updated.';
											verifySuccessMsg(successMsg, expectedSuccessMsg, driver, function() {
												driver.capture(screenShotsDir+ 'success.png');
												test.assertExists('a[href="/tool/members/login?action=logout"]');
												driver.click('a[href="/tool/members/login?action=logout"]');
												return callback();
											});
										}catch(e) {
											driver.echo('success message not found', 'ERROR');
										}
									});
								}catch(e) {
									driver.echo('save button not found on change permission page', 'ERROR');
								}
							}catch(e) {
								driver.echo('checkbox for delete own profile not found', 'ERROR');
							}
						});
					}catch(e) {
						driver.echo('change permission link not found', 'ERROR');
					}
				}catch(e) {
					driver.echo('manage link not found on group permission page', 'ERROR');
				}
			});
		}catch(e) {
			driver.echo('group permission not found under users tab', 'ERROR');
		}
	}catch(e) {
		driver.echo('users tab not found on forum back-end', 'ERROR');
	}
};
