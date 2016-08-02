/****This script is dedicated for verifying general permission on the forum. It covers testing of general permission with all defined validations****/
'use strict';
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var editProfile = require('./editprofile.js');
var json = require('../testdata/editData.json');
var config = require('../config/config.json');

var generalPermission = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'generalPermission/';

generalPermission.featureTest = function(casper, test, x) {
	
//***********************************1st Test Case Verification**********************************
	
	//Open Fornt-End URL
	casper.start(config.url, function() {
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'demo1.png');
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Registering A User 
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/register"]');
			this.click('a[href^="/register/register"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '1_registerFrom.png');
				this.echo('registration from opened successfully', 'INFO');
				forumRegister.registerToApp(json.deleteAccount, casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ '1_registeredUser.png');
						this.echo('user registered successfully', 'INFO');
						casper.thenOpen(config.backEndUrl, function() {
							casper.wait(5000, function() {
								this.echo('Title of the page :' +this.getTitle(), 'INFO');
							});	
							//Logout From Back-End
							casper.then(function() {
								try {
									this.click('a[href="/tool/members/login?action=logout"]');
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'logoutFromBackend.png');
									});
								}catch(e) {
									test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
								}			
							});
							casper.then(function() {
								forumRegister.loginToForumBackEnd(casper, test, function() {
									casper.echo('user logged-in successfully on forum back-end', 'INFO');
									casper.wait(5000, function() {
										editProfile.makeRegisteredUser(casper, test, function() {
											casper.echo('user "hs123" has been made a registered user', 'INFO');
										});
									});
								});						
							});
						});
					});
				});		
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/register"]');
		}	
	});

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '2_backEndLoggedIn.png');
				this.echo('Logged-in successfully from back-end', 'INFO');
			});		
		});
	});

	//Open Change Permission From Back-End And Disable View Forum
	casper.then(function() {
		viewChangePermission(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '2_backEndChangePermission.png');
				this.capture(screenShotsDir+ 'demo4.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO');
				try {
					test.assertExists('#view_messageboard');
					utils.enableorDisableCheckbox('view_messageboard', false, casper, function() {
						casper.echo('checkbox is unchecked', 'INFO');
						casper.capture(screenShotsDir+ 'checked.png');			
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ 'updatedChangePermission.png');
							try {
								test.assertExists('font[color="red"]');
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewForum', casper, function() {
									casper.capture(screenShotsDir+ 'success.png');
								});
							}catch(e) {
								test.assertDoesntExist('font[color="red"]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
					
				}catch(e) {
					test.assertDoesntExist('#view_messageboard');
				}
			});		
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To Front-End
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'frontEndLoggedIn.png');
				this.capture(screenShotsDir+ 'demo5.png');
				this.echo('User Logged In Successfully', 'INFO');
				try {
					test.assertExists('div.text-center.bmessage.alert-info.text-danger');
					var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
					var errorMsg = message.substring(0, message.indexOf('<'));
					var expectedErrorMsg = "Sorry! You don't have permission to perform this action.";
					verifyErrorMsg(errorMsg, expectedErrorMsg, 'GeneralGroupPermission', casper, function() {});
					this.echo('Disabled View Profile Is Verified', 'INFO');
				}catch(e) {
					test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
					this.echo('View Profile Is Enabled From The Back-end', 'ERROR');
				}
			});
		});
	});

	

//***********************************2nd Test Case Verification**********************************
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '1_backEndLoggedIn.png');
				this.echo('Logged-in successfully from back-end', 'INFO');
			});		
		});
	});

	//Open Change Permission From Back-End And Enablie View Forum
	casper.then(function() {
		viewChangePermission(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '1_backEndChangePermission.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO');
				try {
					test.assertExists('#view_messageboard');
					utils.enableorDisableCheckbox('view_messageboard', true, casper, function() {
						casper.echo('checkbox is checked', 'INFO');
						casper.capture(screenShotsDir+ 'checked.png');			
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ 'updatedChangePermission.png');
							try {
								test.assertExists('font[color="red"]');
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'CheckedViewForum', casper, function() {
									casper.capture(screenShotsDir+ 'success.png');
								});
							}catch(e) {
								test.assertDoesntExist('font[color="red"]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
					
				}catch(e) {
					test.assertDoesntExist('#view_messageboard');
				}
			});		
		});
	});
		
	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To Front-End
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '1_frontEndLoggedIn.png');
				this.echo('User Logged In Successfully', 'INFO');
				try {
					test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
					this.echo('Enabled View Forum Is Verified', 'INFO');
				}catch(e) {
					test.assertExists('div.text-center.bmessage.alert-info.text-danger');
					this.echo('View Forum Is Disabled From The Back-end', 'ERROR');
				}
			});
		});
	});

//***********************************3rd Test Case Verification**********************************
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});
	
	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndLoggedIn.png');
				this.echo('Logged-in successfully from back-end', 'INFO');
			});		
		});
	});

	//Open Change Permission From Back-End And Enablie View Profile
	casper.then(function() {
		viewChangePermission(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndChangePermission.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO');
				try {
					test.assertExists('#view_profiles');
					utils.enableorDisableCheckbox('view_profiles', false, casper, function() {
						casper.echo('checkbox is unchecked', 'INFO');
						casper.capture(screenShotsDir+ 'unchecked.png');			
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ '3_updatedChangePermission.png');
							try {
								test.assertExists('font[color="red"]');
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'unheckedViewProfile', casper, function() {
									casper.capture(screenShotsDir+ 'success.png');
								});
							}catch(e) {
								test.assertDoesntExist('font[color="red"]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
					
				}catch(e) {
					test.assertDoesntExist('#view_messageboard');
				}
			});		
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To Front-End And Click On Other User's Profile
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '1_frontEndLoggedIn.png');
				this.echo('User Logged In Successfully', 'INFO');
				try {
					test.assertExists('i.icon.icon-menu');
					this.click('i.icon.icon-menu');
					casper.wait(5000, function() {
						try {
							test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.wait(5000, function() {
								try {
									test.assertExists('span.col-sm-9.right-side a strong');
									this.click('span.col-sm-9.right-side a strong');	
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ '3_profile.png');
										try {
											test.assertExists('div.text-center.bmessage.alert-info.text-danger');
											var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
											var errorMsg = message.substring(0, message.indexOf('<'));
											var expectedErrorMsg = "Sorry! You don't have permission to perform this action.";
											verifyErrorMsg(errorMsg, expectedErrorMsg, 'ViewProfile', casper, function() {});
											this.echo('Disabled View Profile Is Verified', 'INFO');
										}catch(e) {
											test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
											this.echo('View Profile Is Enabled From The Back-end', 'ERROR');
										}
				
									});
								}catch(e) {
									test.assertDoesntExist('span.col-sm-9.right-side a strong');
								}			
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register/members"]');
						}
					});
				}catch(e) {
					test.assertDoesntExist('i.icon.icon-menu');
				}
			});
		});
	});

//***********************************4th Test Case Verification**********************************

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndLoggedIn.png');
				this.echo('Logged-in successfully from back-end', 'INFO');
			});		
		});
	});

	//Open Change Permission From Back-End And Enablie View Profile
	casper.then(function() {
		viewChangePermission(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndChangePermission.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO');
				try {
					test.assertExists('#view_profiles');
					utils.enableorDisableCheckbox('view_profiles', true, casper, function() {
						casper.echo('checkbox is checked', 'INFO');
						casper.capture(screenShotsDir+ 'checked.png');			
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ '3_updatedChangePermission.png');
							try {
								test.assertExists('font[color="red"]');
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'CheckedViewProfile', casper, function() {
									casper.capture(screenShotsDir+ 'success.png');
								});
							}catch(e) {
								test.assertDoesntExist('font[color="red"]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
					
				}catch(e) {
					test.assertDoesntExist('#view_messageboard');
				}
			});		
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To Front-End And Click On Other User's Profile
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '1_frontEndLoggedIn.png');
				this.echo('User Logged In Successfully', 'INFO');
				try {
					test.assertExists('i.icon.icon-menu');
					this.click('i.icon.icon-menu');
					casper.wait(5000, function() {
						try {
							test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.wait(5000, function() {
								try {
									test.assertExists('span.col-sm-9.right-side a strong');
									this.click('span.col-sm-9.right-side a strong');	
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ '3_profile.png');
										this.echo('Enabled View Profile Verified Successfully', 'INFO');
				
									});
								}catch(e) {
									test.assertDoesntExist('span.col-sm-9.right-side a strong');
								}			
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register/members"]');
						}
					});
				}catch(e) {
					test.assertDoesntExist('i.icon.icon-menu');
				}
			});
		});
	});

//***********************************5th Test Case Verification**********************************
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndLoggedIn.png');
				this.echo('Logged-in successfully from back-end', 'INFO');
			});		
		});
	});

	//Open Change Permission From Back-End And Disable View Profile
	casper.then(function() {
		viewChangePermission(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndChangePermission.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO');
				try {
					test.assertExists('#memberslist_viewable');
					utils.enableorDisableCheckbox('memberslist_viewable', false, casper, function() {
						casper.echo('checkbox is unchecked', 'INFO');
						casper.capture(screenShotsDir+ 'unchecked.png');			
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ '3_updatedChangePermission.png');
							try {
								test.assertExists('font[color="red"]');
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'ViewableMemberList', casper, function() {
									casper.capture(screenShotsDir+ 'success.png');
								});
							}catch(e) {
								test.assertDoesntExist('font[color="red"]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
					
				}catch(e) {
					test.assertDoesntExist('#view_messageboard');
				}
			});		
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To Front-End And Click On Other User's Profile
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '1_frontEndLoggedIn.png');
				this.echo('User Logged In Successfully', 'INFO');
				try {
					test.assertExists('i.icon.icon-menu');
					this.click('i.icon.icon-menu');
					casper.wait(5000, function() {
						try {
							test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.wait(5000, function() {
								try {
									var user = x('//a/strong[text()="hs1234"]/ancestor::li/span');
									test.assertDoesntExist(x('//a/strong[text()="hs1234"]/ancestor::li/span'));
									//this.click(x('//a/strong[text()="hs1234"]/ancestor::li/span'));	
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ '3_profile.png');
										this.echo('Disabled Viewable On Member List Verified Successfully', 'INFO');
				
									});
								}catch(e) {
									test.assertExists(x('//a/strong[text()="hs1234"]/ancestor::li/span'));
								}			
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register/members"]');
						}
					});
				}catch(e) {
					test.assertDoesntExist('i.icon.icon-menu');
				}
			});
		});
	});

//***********************************6th Test Case Verification**********************************

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndLoggedIn.png');
				this.echo('Logged-in successfully from back-end', 'INFO');
			});		
		});
	});

	//Open Change Permission From Back-End And Enablie View Profile
	casper.then(function() {
		viewChangePermission(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndChangePermission.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO');
				try {
					test.assertExists('#memberslist_viewable');
					utils.enableorDisableCheckbox('memberslist_viewable', true, casper, function() {
						casper.echo('checkbox is checked', 'INFO');
						casper.capture(screenShotsDir+ 'checked.png');			
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ '3_updatedChangePermission.png');
							try {
								test.assertExists('font[color="red"]');
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'CheckedEditProfile', casper, function() {
									casper.capture(screenShotsDir+ 'success.png');
								});
							}catch(e) {
								test.assertDoesntExist('font[color="red"]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
					
				}catch(e) {
					test.assertDoesntExist('#view_messageboard');
				}
			});		
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
			});		
		});
			
	});

	//Login To Front-End And Click On Other User's Profile
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '1_frontEndLoggedIn.png');
				this.echo('User Logged In Successfully', 'INFO');
				try {
					test.assertExists('i.icon.icon-menu');
					this.click('i.icon.icon-menu');
					casper.wait(5000, function() {
						try {
							test.assertExists('a[href^="/register/members"]');
							this.click('a[href^="/register/members"]');
							casper.wait(5000, function() {
								try {
									var user = x('//a/strong[text()="hs1234"]/ancestor::li/span');
									test.assertExists(x('//a/strong[text()="hs1234"]/ancestor::li/span'));
									this.click(x('//a/strong[text()="hs1234"]/ancestor::li/span'));	
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ '3_profile.png');
										this.echo('Enabled Viewable On Member List Verified Successfully', 'INFO');
				
									});
								}catch(e) {
									test.assertDoesntExist('//a/strong[text()="hs1234"]/ancestor::li/span');
								}			
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/register/members"]');
						}
					});
				}catch(e) {
					test.assertDoesntExist('i.icon.icon-menu');
				}
			});
		});
	});

//***********************************7th Test Case Verification**********************************
	
	//Open Back-End URL And Get Title
	/*casper.thenOpen(config.backEndUrl, function() {
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'demo2.png');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndLoggedIn.png');
				this.echo('Logged-in successfully from back-end', 'INFO');
			});		
		});
	});

	//Open Change Permission From Back-End And Disable View Invisible Member
	casper.then(function() {
		viewChangePermission(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndChangePermission.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO');
				try {
					test.assertExists('#view_invisible');
					utils.enableorDisableCheckbox('view_invisible', false, casper, function() {
						casper.echo('checkbox is unchecked for view invisible members', 'INFO');
						casper.capture(screenShotsDir+ 'unchecked.png');			
					});
					utils.enableorDisableCheckbox('allow_invisible', true, casper, function() {
						casper.echo('checkbox is checked for set self invisible', 'INFO');
						casper.capture(screenShotsDir+ 'checked.png');			
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ '3_updatedChangePermission.png');
							try {
								test.assertExists('font[color="red"]');
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'CheckedEditProfile', casper, function() {
									casper.capture(screenShotsDir+ 'success.png');
								});
							}catch(e) {
								test.assertDoesntExist('font[color="red"]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
					
				}catch(e) {
					test.assertDoesntExist('#view_messageboard');
				}
			});		
		});
	});

	//Change Theme From The Back-End
	casper.then(function() {
		try {
			test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddAppearance"]');
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddAppearance"]');
			try {
				test.assertExists('a[href^="/tool/members/mb/skins"]');
				this.click('a[href^="/tool/members/mb/skins"]');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'demo.png');
					try {
						test.assertExists('#inline_search_textbox');
						this.sendKeys('#inline_search_textbox', 'Elegance');
						this.click('#inline_search_textbox');
						this.page.sendEvent("keypress", this.page.event.key.Enter);
						casper.wait(5000, function() {
							try {
								test.assertExists('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=50&search_skin=Elegance&sorted="]');
								this.click('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=50&search_skin=Elegance&sorted="]');
								casper.then(function() {
									this.on('remote.alert', testAlert2);
								});
							}catch(e) {
								test.assertDoesntExist('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=50&search_skin=Elegance&sorted="]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('#inline_search_textbox');
					}	
					casper.wait(5000, function() {
						this.then(function() {
							this.removeListener('remote.alert', testAlert2);
						});
						try {
							test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
							this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
							try {
								test.assertExists('a[href^="/tool/members/mb/settings?tab=Display"]');
								this.click('a[href^="/tool/members/mb/settings?tab=Display"]');	
								casper.wait(5000, function() {
									try {
										test.assertExists('#online_user_list');
									utils.enableorDisableCheckbox('online_user_list', true, casper, function() {
											casper.echo('checkbox is checked', 'INFO');
											casper.capture(screenShotsDir+ 'checked.png');
									});
													
										test.assertExists('button.button.btn-m.btn-blue');
										this.click('button.button.btn-m.btn-blue');	
										casper.wait(5000, function() {
										});
									}catch(e) {
										test.assertDoesntExist('#online_user_list');
									}	
								});
							}catch(e) {
								test.assertDoesntExist('a[href^="/tool/members/mb/settings?tab=Display"]');
							}
						}catch(e) {
							test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
						}
					});
				});
			}catch(e) {
				test.assertDoesntExist('a[href^="/tool/members/mb/skins"]');
			}
		}catch(e) {
			test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddAppearance"]');
		}
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/logout"]');
			this.click('a[href^="/register/logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/logout"]');
		}
	});

	//Login To Front-End And Click On Other User's Profile
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				test.assertExists('a[href^="/profile"]');
				this.click('a[href^="/profile"]');
				casper.wait(5000, function() {
					test.assertExists('a[href^="/register/register?edit"]');
					this.click('a[href^="/register/register?edit"]');	
					casper.wait(5000, function() {
						test.assertExists('a[href^="/register?action=preferences"]');
						this.click('a[href^="/register?action=preferences"]');
						casper.wait(5000, function() {
							utils.enableorDisableCheckbox('INVS', true, casper, function() {
								casper.echo('checkbox is checked for invisible mode', 'INFO');
								casper.capture(screenShotsDir+ 'checked.png');	
							});
							casper.wait(5000, function() {
								test.assertExists('input.global_button_middle');	
								this.click('input.global_button_middle');	
								casper.wait(5000, function() {
									test.assertExists('a[href^="/categories"]');
									this.click('a[href^="/categories"]');
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'showInvisible.png');
										this.echo('view invisible member is verified successfully', 'INFO');
									});									
								});						
							});		
						});
					});	
				});		
			});
		});
	});

//***********************************8th Test Case Verification**********************************

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndLoggedIn.png');
				this.echo('Logged-in successfully from back-end', 'INFO');
			});		
		});
	});

	//Open Change Permission From Back-End And Enablie View Invisible Member
	casper.then(function() {
		viewChangePermission(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndChangePermission.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO');
				try {
					test.assertExists('#view_invisible');
					utils.enableorDisableCheckbox('view_invisible', true, casper, function() {
						casper.echo('checkbox is checked', 'INFO');
						casper.capture(screenShotsDir+ 'checked.png');			
					});
					utils.enableorDisableCheckbox('allow_invisible', true, casper, function() {
						casper.echo('checkbox is checked for set self invisible', 'INFO');
						casper.capture(screenShotsDir+ 'checked.png');			
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ '3_updatedChangePermission.png');
							try {
								test.assertExists('font[color="red"]');
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								verifySuccessMsg(successMsg, expectedSuccessMsg, 'CheckedEditProfile', casper, function() {
									casper.capture(screenShotsDir+ 'success.png');
								});
							}catch(e) {
								test.assertDoesntExist('font[color="red"]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('button.button.btn-m.btn-blue');
					}
					
				}catch(e) {
					test.assertDoesntExist('#view_messageboard');
				}
			});		
		});
	});
	
	//Change Display Setting From The Back-End
	casper.then(function() {
				
		try {
			test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
			try {
				test.assertExists('a[href^="/tool/members/mb/settings?tab=Display"]');
				this.click('a[href^="/tool/members/mb/settings?tab=Display"]');	
				casper.wait(5000, function() {
					try {
						test.assertExists('#online_user_list');
					utils.enableorDisableCheckbox('online_user_list', true, casper, function() {
							casper.echo('checkbox is checked', 'INFO');
							casper.capture(screenShotsDir+ 'checked.png');
					});
									
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');	
						casper.wait(5000, function() {
						});
					}catch(e) {
						test.assertDoesntExist('#online_user_list');
					}	
				});
			}catch(e) {
				test.assertDoesntExist('a[href^="/tool/members/mb/settings?tab=Display"]');
			}
		}catch(e) {
			test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		}
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		});
	});

	//Logout From App
	casper.then(function() {
		try {
			test.assertExists('a[href^="/register/logout"]');
			this.click('a[href^="/register/logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logout.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/logout"]');
		}		
	});

	//Login To Front-End And Click On Other User's Profile
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function() {
			casper.wait(5000, function() {
				test.assertExists('a[href^="/profile"]');
				this.click('a[href^="/profile"]');
				casper.wait(5000, function() {
					test.assertExists('a[href^="/register/register?edit"]');
					this.click('a[href^="/register/register?edit"]');	
					casper.wait(5000, function() {
						test.assertExists('a[href^="/register?action=preferences"]');
						this.click('a[href^="/register?action=preferences"]');
						casper.wait(5000, function() {
							utils.enableorDisableCheckbox('INVS', true, casper, function() {
								casper.echo('checkbox is checked for invisible mode', 'INFO');
								casper.capture(screenShotsDir+ 'checked.png');	
							});
							casper.wait(5000, function() {
								test.assertExists('input.global_button_middle');	
								this.click('input.global_button_middle');	
								casper.wait(5000, function() {
									test.assertExists('a[href^="/categories"]');
									this.click('a[href^="/categories"]');
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ 'showInvisible.png');
										this.echo('view invisible member is verified successfully', 'INFO');
									});									
								});						
							});		
						});
					});	
				});		
			});
		});
	});

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'demo2.png');
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
		});	
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'logoutFromBackend.png');
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '3_backEndLoggedIn.png');
				this.echo('Logged-in successfully from back-end', 'INFO');
			});		
		});
	});

	//Change Theme From The Back-End
	casper.then(function() {
		try {
			test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddAppearance"]');
			this.click('div#my_account_forum_menu a[data-tooltip-elm="ddAppearance"]');
			try {
				test.assertExists('a[href^="/tool/members/mb/skins"]');
				this.click('a[href^="/tool/members/mb/skins"]');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'demo.png');
					try {
						test.assertExists('#inline_search_textbox');
						this.sendKeys('#inline_search_textbox', 'Angela');
						this.click('#inline_search_textbox');
						this.page.sendEvent("keypress", this.page.event.key.Enter);
						casper.wait(5000, function() {
							try {
								test.assertExists('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=51&search_skin=angela&sorted="]');
								this.click('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=51&search_skin=angela&sorted="]');
								casper.then(function() {
									this.on('remote.alert', testAlert2);
								});
							}catch(e) {
								test.assertDoesntExist('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=51&search_skin=angela&sorted="]');
							}
						});
					}catch(e) {
						test.assertDoesntExist('#inline_search_textbox');
					}	
					casper.wait(5000, function() {
						this.then(function() {
							this.removeListener('remote.alert', testAlert2);
						});
					});
				});
			}catch(e) {
				test.assertDoesntExist('a[href^="/tool/members/mb/skins"]');
			}
		}catch(e) {
			test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddAppearance"]');
		}
	});*/
};

//************************************PRIVATE METHODS***********************************

//Method For Enabling View Profile For Registered User
var viewChangePermission = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.wait(5000,function() {
				this.capture(screenShotsDir+ 'groupPermission.png');
				//Clicking On 'Change Permissions' Link With Respect To 'Registered Users'  
				driver.then(function() {
					var grpName = this.evaluate(function(){
						for(var i=1; i<=7; i++) {
							var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
							if (x1.innerText == 'Registered Users') {
								var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(4) div.tooltipMenu a').getAttribute('href');
								return x2;
							}
						}
					});
					this.click('a[href="'+grpName+'"]');
					return callback();
				});
			});
		}catch(e) {
			test.assertDoesntExist('div#ddUsers a[href="/tool/members/mb/usergroup"]');
		}
	}catch(e) {
		test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}
};

//Method For Verifying Error Message On General Group Permission
var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	driver.capture(screenShotsDir + 'Error_OnEdit' +msgTitle+ '.png');
	return callback();
};

//Method For Verifying Success Message On General Group Permission
var verifySuccessMsg = function(successMessage, expectedSuccessMsg, msgTitle, driver, callback) {
	driver.echo('Actual Success message : '+successMessage, 'INFO');
	driver.echo('Expected Success message : '+expectedSuccessMsg, 'INFO');
	if((successMessage == expectedSuccessMsg) || (successMessage.indexOf(expectedSuccessMsg) > -1)) {
		driver.echo('Success message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Success Message Is Not Correct", 'ERROR');
	}
	driver.capture(screenShotsDir + 'Success_OnEdit' +msgTitle+ '.png');
	return callback();
};

function testAlert2(message) {
	casper.echo('message : '+message, 'INFO');
	casper.test.assertEquals(message, 'Activate the Black N White theme?');
	casper.echo('Alert message is verified', 'INFO');
};
