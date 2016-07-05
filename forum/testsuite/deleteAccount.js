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

deleteAccount.featureTest = function(casper, test) {
	
	//Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		var expectedErrorMsg = "Delete the selected user?";
		test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified when user try to delete an account', 'INFO');
	});

	//Open Forum URL And Get Title 
	casper.start(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Registering a user And Verifying Do Not Delete Account
	casper.then(function () {
		forumRegister.registerToApp(json.deleteAccount, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registeredUser.png');
				casper.echo('User registered successfully', 'INFO');
				//Clicking On User's Icon To Display User's Drop-down For Editing Profile
				casper.then(function() {
					try {
						test.assertExists('.default-user');
						this.click('.default-user');
						this.echo('clicked on users icon successfully', 'info');
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
								this.capture(screenShotsDir+ 'doNotDeleteAccount.png');
								this.echo('Account is not deleted', 'INFO');
							});
						});
						
					});
				});		
			});
			redirectToLogout(casper, test, function() {
				casper.echo('Do Not Delete Account Task Completed', 'INFO');
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
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				casper.echo('User logged-in successfully', 'INFO');
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
								this.capture(screenShotsDir+ 'deletedAccount.png');
								this.echo('Delete Account Task Completed From Front-end', 'INFO');
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
				this.capture(screenShotsDir+ 'loggedIn_user.png');
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
								this.capture(screenShotsDir+ 'memberList.png');
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
												this.capture(screenShotsDir+ 'deletedMember.png');
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
			redirectToLogout(casper, test, function() {
				casper.echo('Delete Account Task Completed When User deletes an Account From Member List By Check-Box', 'INFO');
			});
		});

	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And An Admin Deletes An Account From Member's List By Selecting 		Member's Profile Page
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
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
								this.capture(screenShotsDir+ 'memberList.png');
								casper.then(function() {
									try {
										test.assertExists('span.col-sm-9.right-side a strong');
										this.click('span.col-sm-9.right-side a strong');
										casper.then(function() {
											deleteAccount(casper, function() {
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
			redirectToLogout(casper, test, function() {
				casper.echo('Delete Account Task Completed When Admin deletes an Account From Member List By Selecting Profile Page', 'INFO');
			});
		});

	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And An Admin Deletes An Account From Member's List Using Search-Box
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
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
								this.capture(screenShotsDir+ 'memberList.png');
								casper.then(function() {
									try {
										test.assertExists('#inline_search_box');
										this.sendKeys('input[id="inline_search_box"]', 'hs1234');
										this.click('#inline_search_box');
										this.page.sendEvent("keypress", this.page.event.key.Enter);
										casper.wait(3000, function() {
											this.capture(screenShotsDir+ 'search.png');
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
													this.capture(screenShotsDir+ 'deletedMember.png');
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
			redirectToLogout(casper, test, function() {
				casper.echo('Account Delete task Completed From Members List By Searching iN Search Box','INFO');
			});
		});

	});

	//Reopen Front-End URL 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		casper.echo('Title of the page : ' +this.getTitle(), 'INFO');
	});

	//Login To App And An Admin Deletes Own Account From Member's List
	casper.then(function() {
		forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
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
								this.capture(screenShotsDir+ 'memberList.png');
								casper.then(function() {
									try {
										test.assertExists(x('//a/strong[text()="hs123"]/ancestor::li/span/input'), 'checkbox is verified');
										this.click(x('//a/strong[text()="hs123"]/ancestor::li/span/input'));
										casper.wait(5000, function() {
											try {
												test.assertExists('i.glyphicon.glyphicon-trash');
												this.click('i.glyphicon.glyphicon-trash');
											}catch(e) {
												this.echo('delete account dialogue not found', 'ERROR');
											}
											casper.wait(5000, function() {
												this.capture(screenShotsDir+ 'deletedMember.png');
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
				this.capture(screenShotsDir+ 'loggedIn_user.png');
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
								this.capture(screenShotsDir+ 'topicList.png');
								var user = x('//p/a[text()="hs1234"]/ancestor::li/span/span/p/a');
								test.assertExists(user, 'user is verified');
								this.click(user);
								casper.wait(5000, function() {
									this.capture(screenShotsDir+ 'topicListUser.png');
									deleteAccount(casper, function() {
										casper.echo('delete account task completed when admin deletes an account from member list', 'INFO');
									});	
								});
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
				this.capture(screenShotsDir+ 'loggedIn_user.png');
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
								this.capture(screenShotsDir+ 'topicList.png');
								try {
									test.assertExists('a.topic-title span');
									this.click('a.topic-title span');
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'topicListUser.png');
										var user = x('//span/a[text()="hs1234"]/ancestor::div/span/a');
										try {
											test.assertExists(user, 'user is verified');
											this.click(user);
											casper.wait(5000, function() {
												this.capture(screenShotsDir+ 'topicListUser.png');
												try {
													test.assertExists('i.glyphicon.glyphicon-trash');
													this.click('i.glyphicon.glyphicon-trash');	
													casper.wait(5000, function() {
														this.capture(screenShotsDir+ 'deletedUser.png');
														this.echo('member is deleted successfully', 'INFO');								
													});
												}catch(e) {
													casper.echo('delete account dialogue not found', 'ERROR');
												}
											});
										}catch(e) {
											casper.echo('user not found', 'ERROR');		
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
			redirectToLogout(casper, test, function() {
				casper.echo('Account Delete task Completed When A User Deletes Own Account From Post Reply Topic List','INFO');
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
				this.capture(screenShotsDir+ 'loggedIn_user.png');
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
								this.capture(screenShotsDir+ 'topicList.png');
								var user = x('//p/a[text()="hh"]/ancestor::li/span/span/p/a');
								try {
									test.assertExists(user, 'user is verified');
									this.click(user);
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'topicListUser.png');
										try {
											test.assertExists('#anchor_tab_edit');
											this.click('#anchor_tab_edit');
											casper.wait(5000, function() {
												try {
													test.assertExists('a[href^="/register?action=preferences"]');
																		this.click('a[href^="/register?action=preferences"]');
																		//Delete User's Account.
																		casper.then(function() { 
																			try {
																				test.assertExists('#deleteAccountDialog');
																				try {
																					test.assertExists('#deleteAccount');
																					deleteAccount(casper, function() {
																						casper.wait(5000, function() {
																							this.capture(screenShotsDir+ 'deletedAccount.png');
																							this.echo('Account is deleted successfully', 'INFO');
																						});
																					});
																				} catch (e) {
																					test.assertDoesntExist('#deleteAccount');
																				}
																			} catch (e) {
																				test.assertDoesntExist('#deleteAccountDialog');
																			}										
																		});
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

	//Login To App And Do Not Delete An Account From User's profilePage
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
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
								this.capture(screenShotsDir+ 'profile.png');
								try {
									test.assertExists('i.glyphicon.glyphicon-trash');
									this.click('i.glyphicon.glyphicon-trash');
									try {
										test.assertExists('a#doNotDelAccount');
										this.click('a#doNotDelAccount');
										casper.wait(5000, function() {
											this.capture(screenShotsDir+ 'deletedUser.png');
											this.echo('user is not deleted', 'INFO');			
										});
									}catch(e) {
										this.echo('delete button(no) not found', 'ERROR');
									}
								}catch(e) {
									this.echo('delete account dialogue not found', 'ERROR');
								}					
							});
						}catch(e) {
							this.echo('profile link not found', 'ERROR');
						}
					}catch(e) {
						this.echo('.default-user not found', 'ERROR');
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

	//Login To App And Delete An Account From User's profilePage
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
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
								this.capture(screenShotsDir+ 'profile.png');
								try {
									test.assertExists('i.glyphicon.glyphicon-trash');
									this.click('i.glyphicon.glyphicon-trash');
									try {
										test.assertExists('a#deleteAccount');
										this.click('a#deleteAccount');
										casper.wait(5000, function() {
											this.capture(screenShotsDir+ 'deletedUser.png');
											this.echo('user is not deleted', 'INFO');			
										});
									}catch(e) {
										this.echo('delete button(yes) not found', 'ERROR');
									}
								}catch(e) {
									this.echo('delete account dialogue not found', 'ERROR');
								}					
							});
						}catch(e) {
							this.echo('profile link not found', 'ERROR');
						}
					}catch(e) {
						this.echo('.default-user not found', 'ERROR');
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

	//Registering a user
	casper.then(function () {
		forumRegister.registerToApp(json.deleteAccount, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'registeredUser.png');
				this.echo('User registered successfully', 'INFO');
			});
		});
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
							this.capture(screenShotsDir + 'forum_popup.png');
							test.assertExists('#changeUserGroupActions a.button span.delete');
							this.click('#changeUserGroupActions a.button span.delete');
							casper.wait(3000, function() {
								this.capture(screenShotsDir + 'deletedUser.png');
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
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946060"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946060"]');
					test.assertExists('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946060"]');
					this.click('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946060"]');
					casper.wait(5000, function() {
						test.assertExists('#groupUsersList input[name="user_id"][type="checkbox"]');
						this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
						test.assertExists('#floatingActionMenu select.text');
						this.click('#floatingActionMenu select.text');
						test.assertExists('select.text option[value="delete_members"]');
						this.click('select.text option[value="delete_members"]');
						casper.wait(3000, function() {
							this.capture(screenShotsDir+ 'deletedRegistered.png');
							this.echo('Delete Account Task Completed For Registered User From The Back-end', 'INFO');
							this.click('a[href="/tool/members/login?action=logout"]');
						});
					});
				});
			});		
		});
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
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946055"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946055"]');
					test.assertExists('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946055"]');
					this.click('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946055"]');
					casper.wait(5000, function() {
						test.assertExists('#groupUsersList input[name="user_id"][type="checkbox"]');
						this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
						test.assertExists('#floatingActionMenu select.text');
						this.click('#floatingActionMenu select.text');
						test.assertExists('select.text option[value="delete_members"]');
						this.click('select.text option[value="delete_members"]');
						casper.wait(3000, function() {
							this.capture(screenShotsDir+ 'deletedPendingUser.png');
							this.echo('Delete Account Task Completed For Pending Email Verification From The Back-end', 'INFO');
							this.click('a[href="/tool/members/login?action=logout"]');
						});
					});
				});
			});		
		});
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
					test.assertExists('table.text.fullborder a[data-tooltip-elm="ugManage946062"]');
					this.click('table.text.fullborder a[data-tooltip-elm="ugManage946062"]');
					test.assertExists('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946062"]');
					this.click('a[href^="/tool/members/mb/usergroup?action=show_all_primary_users&usergroupid=946062"]');
					casper.wait(5000, function() {
						test.assertExists('#groupUsersList input[name="user_id"][type="checkbox"]');
						this.click('#groupUsersList input[name="user_id"][type="checkbox"]');
						test.assertExists('#floatingActionMenu select.text');
						this.click('#floatingActionMenu select.text');
						test.assertExists('select.text option[value="delete_members"]');
						this.click('select.text option[value="delete_members"]');
						casper.wait(3000, function() {
							this.capture(screenShotsDir+ 'deletedAdmin.png');
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

/*deleteAccount.customFieldsTest = function(casper, test) {

	

	//Delete Account Of A Registered User From Member's List
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/members?letter=H"]');
			this.click('a[href^="/register/members?letter=H"]');
			casper.wait(5000, function() {
				var Usercheckbox = x('//a/strong[text()="hs1234"]/ancestor::li/span/a');
				try {
					test.assertExists(x('//a/strong[text()="hs1234"]/ancestor::li/span/a'), 'checkbox is verified');
					this.click(x('//a/strong[text()="hs1234"]/ancestor::li/span/a'));
					casper.wait(5000, function() {
						test.assertExists('i.glyphicon.glyphicon-trash');
						this.click('i.glyphicon.glyphicon-trash');
						test.assertExists('#delUserAccount');
						this.click('#delUserAccount');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ 'deletedMember.png');
							this.echo('member is deleted successfully','INFO');				
						});
					});
				} catch (e) {
					this.echo('user not found', 'ERROR');
				}
			});
		} catch(e) {
			this.echo('H tab not found', 'ERROR');
		}
	});
};*/

/************************************PRIVATE METHODS***********************************/

//Method For Deleting User's Account

var deleteAccount = function(driver, callback) {
	try {
		driver.test.assertExists('i.glyphicon.glyphicon-trash');
		driver.click('i.glyphicon.glyphicon-trash');
		try {
			driver.test.assertExists('#delUserAccount');
			driver.click('#delUserAccount');
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
		driver.test.assertExists('i.glyphicon.glyphicon-trash');
		driver.click('i.glyphicon.glyphicon-trash');
		try {
			driver.test.assertExists('#doNotDelAccount');
			driver.click('#doNotDelAccount');
		}catch(e) {
			driver.echo('delete account Button(yes) not found', 'ERROR');
		}
	}catch(e) {
		driver.echo('delete account dialogue not found', 'ERROR');
	}
	return callback();
};

//Method For Logout From Front End
var redirectToLogout = function(driver, test, callback) {
	driver.then(function() {
		this.test.assertExists('button.dropdown-toggle span.caret');
		this.test.assertExists('#logout');
		forumLogin.logoutFromApp(driver, function() {
			driver.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
				this.echo('Successfully logout from forum', 'INFO');
				return callback();
			});
		});
	});
};
