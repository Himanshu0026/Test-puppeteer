'use strict';
var utils = require('./utils.js');
var forumRegister = require('./register.js');
var generalPermission = require('./generalPermission.js');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');
var json = require('../testdata/editData.json');

var thumpsUpDown = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'thumpsUpDown/';

thumpsUpDown.featureTest = function(casper, test, x) {

	//Open Forum Front End URL And Get Title 
	casper.start(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	/*casper.then(function() {
		this.echo('                                      CASE 1', 'INFO');
		this.echo('************************************************************************************', 'INFO');
		this.echo('LIKE POST FROM TOPIC PAGE', 'INFO');
		this.echo('************************************************************************************', 'INFO');
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
		casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
			this.click('form[name="posts"] a.topic-title');
			casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
				this.click('i.glyphicon.glyphicon-like-alt');
				casper.waitForSelector('div#form-dialog[aria-hidden="false"]', function success() {
					test.assertExists('div#form-dialog[aria-hidden="false"]');
					test.assertExists('button#bootstrap_close_register_dialog');
					this.click('button#bootstrap_close_register_dialog');
				}, function fail() {

				});
			
			}, function fail() {

			});
		}, function fail() {

		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('DISLIKE POST FROM TOPIC PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
		casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
			this.click('form[name="posts"] a.topic-title');
			casper.waitForSelector('a.dislike_post.text-muted', function success() {
				this.click('a.dislike_post.text-muted');
				casper.waitForSelector('div#form-dialog[aria-hidden="false"]', function success() {
					test.assertExists('div#form-dialog[aria-hidden="false"]');
					test.assertExists('button#bootstrap_close_register_dialog');
					this.click('button#bootstrap_close_register_dialog');
				}, function fail() {

				});
			
			}, function fail() {

			});
		}, function fail() {

		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE CLICK OF THUMBS UP FROM TOPIC PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	casper.then(function() {
		test.assertExists('a[href="/register/login"]');
		this.click('a[href="/register/login"]');
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.echo('Processing to Login on forum.....', 'INFO');
			casper.waitForSelector('i.icon.icon-menu', function success() {
				this.click('i.icon.icon-menu');
				test.assertExists('a[href="/latest"]');
				this.click('a[href="/latest"]');
				casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
					this.click('form[name="posts"] a.topic-title');
					casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
						this.click('i.glyphicon.glyphicon-like-alt');
						casper.then(function() {
							try {
								test.assertExists('a.login_dialog.text-muted.voted-yes');
								casper.echo('CLICK OF THUMBS UP FROM TOPIC PAGE.....', 'INFO');
							} catch(e) {
								test.assertExists('a.login_dialog.text-muted');
							};
						});
		
					}, function fail() {

					});
				}, function fail() {

				});
			}, function fail() {

			});
		});
	});*/
	
	casper.then(function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY WITH CLICK ON LIKERS/DISLIKERS USERNAME IN CASE OF REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Logout From Back-End
	casper.then(function() {
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
		});
	});
	
	//Open Change Permission From Back-End And Disable View Profile
	casper.then(function() {
		generalPermission.viewChangePermission(casper, test, function() {
			casper.then(function() {
				casper.echo('Opened Change Permission Page Successfully', 'INFO')
				try {
					test.assertExists('#view_profiles');
					utils.enableorDisableCheckbox('view_profiles', false, casper, function() {
						casper.echo('checkbox is unchecked', 'INFO');
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.waitForSelector('font[color="red"]', function() {
							var successMsg = this.fetchText('font[color="red"]');
							var expectedSuccessMsg = 'Your user group settings have been updated.';
							if(successMsg && successMsg!= '')
							verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
							});
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

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
	});

	//Logout From App
	casper.then(function() {
		forumRegister.redirectToLogout(casper, test, function() {
		});
			
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
		casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
			this.click('form[name="posts"] a.topic-title');
			try {
				test.assertExists('a[href^="#likes-modal"]');
				this.click('a[href^="#likes-modal"]');
				casper.waitForSelector('li.col-xs-3 a[href^="/profile/"]', function success() {
					this.click('li.col-xs-3 a[href^="/profile/"]');
					casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
						var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
						var errorMsg = message.substring(0, message.indexOf('<'));
						if(errorMsg && errorMsg!= '')
							verifyErrorMsg(errorMsg, "Sorry! You don't have permission to perform this action.", 'ThumsUpDown', casper, function() {});
					}, function fail() {

					});
				}, function fail() {

				});
			}catch(err) {
				test.assertExists('a i.glyphicon.glyphicon-like-alt');
				this.click('a i.glyphicon.glyphicon-like-alt');
			}
		}, function fail() {

		});
	});
	
	//Click On Likers/Disliker's User Name	
	casper.then(function() {
		casper.wait(5000, function() {
			test.assertExists('a[href^="#likes-modal"]');
			this.click('a[href^="#likes-modal"]');
			casper.wait(3000, function() {
				test.assertExists('li.col-xs-3 a[href^="/profile/"]');
				this.click('li.col-xs-3 a[href^="/profile/"]');
				casper.wait(5000, function() {
					test.assertExists('div.text-center.bmessage.alert-info.text-danger');
					var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
					var errorMsg = message.substring(0, message.indexOf('<'));
					if(errorMsg && errorMsg!= '')
						verifyErrorMsg(errorMsg, "Sorry! You don't have permission to perform this action.", 'ThumsUpDown', casper, function() {});
				});
			});
		});
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
			});
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}			
	});

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
			});
		});
	});
	
	//Open Change Permission From Back-End And Disable View Profile
	casper.then(function() {
		generalPermission.viewChangePermission(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Opened Change Permission Page Successfully', 'INFO')
				try {
					test.assertExists('#view_profiles');
					utils.enableorDisableCheckbox('view_profiles', true, casper, function() {
						casper.echo('checkbox is checked', 'INFO');
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							test.assertExists('font[color="red"]');
							var successMsg = this.fetchText('font[color="red"]');
							var expectedSuccessMsg = 'Your user group settings have been updated.';
							if(successMsg && successMsg!= '')
							verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
							});
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

	/*casper.then(function() {
		casper.echo('                                      CASE 5', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY WITH CLICK ON LIKERS/DISLIKERS USERNAME IN CASE OF REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});

	casper.then(function() {
		test.assertExists('a.default-user');
		this.click('a.default-user');
		casper.wait(5000, function() {
			test.assertExists('a[href^="/profile"]');
			this.click('a[href^="/profile"]');
			casper.wait(5000, function() {
				//Click on Topic
				casper.then(function() {
					test.assertExists('i.icon.icon-menu');
					this.click('i.icon.icon-menu');
					test.assertExists('a[href="/latest"]');
					this.click('a[href="/latest"]');
				});
				var id = this.getElementAttribute('input[type="hidden"][name="userid"]', 'value');
				//this.echo(id, 'INFO');
				casper.wait(5000, function() {
					test.assertExists('a.topic-title span');
					this.click('a.topic-title span');
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ '1.png');
						try {
				
							test.assertExists('.voted-yes');
							test.assertExists('a[href^="#likes-modal"]');
							this.click('a[href^="#likes-modal"]');
							casper.wait(3000, function() {
								test.assertExists('a[href^="/profile/'+id+'"]');
								this.click('a[href^="/profile/'+id+'"]');
								casper.wait(5000, function() {
									this.capture(screenShotsDir+ '2.png');
									test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
								});
							});
						}catch(e) {
							test.assertExists('i.glyphicon.glyphicon-like-alt');
							this.click('i.glyphicon.glyphicon-like-alt');
							casper.wait(3000, function() {
								this.capture(screenShotsDir+ '2.png');
								//test.assertExists('a.text-muted.voted-yes');
								test.assertExists('a[href^="#likes-modal"]');
								this.click('a[href^="#likes-modal"]');
								casper.wait(3000, function() {
									test.assertExists('a[href^="/profile/'+id+'"]');
									this.click('a[href^="/profile/'+id+'"]');
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ '2.png');
										test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
									});
								});
							});
						}
					});
				});
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY WITH CLICK ON LIKERS/DISLIKERS USERNAME IN CASE OF MODERATORS', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open Change Permission From Back-End And Disable View Profile
	casper.then(function() {
		generalPermission.viewChangePermissionForModerators(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '2_backEndChangePermission.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO')
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
							test.assertExists('font[color="red"]');
							var successMsg = this.fetchText('font[color="red"]');
							var expectedSuccessMsg = 'Your user group settings have been updated.';
							if(successMsg && successMsg!= '')
							verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
								casper.capture(screenShotsDir+ 'success.png');
							});
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

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hs1', 'hh', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});
	
	//Clicking On Any Topic Present In The List
	casper.then(function() {
		//test.assertExists('form[name="posts"] a.topic-title');
		//this.click('form[name="posts"] a.topic-title');
		//var user = x('//a/span[text()="HolyDay"]/ancestor::li/span/span/h4/a');
		test.assertExists('a[href^="/post/holyday"]');
		this.click('a[href^="/post/holyday"]');
		
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});
	
	//Click On Likers/Disliker's User Name	
	casper.then(function() {
		//test.assertExists('i.glyphicon.glyphicon-step-backward');
		//this.click('i.glyphicon.glyphicon-step-backward');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ '1.png');
			test.assertExists('a[href^="#likes-modal"]');
			this.click('a[href^="#likes-modal"]');
			casper.wait(3000, function() {
				this.capture(screenShotsDir+ '2.png');
				test.assertExists('li.col-xs-3 a[href^="/profile/"]');
				this.click('li.col-xs-3 a[href^="/profile/"]');
				casper.wait(5000, function() {
					this.capture(screenShotsDir + 'uncheckedViewProfile.png');
					test.assertExists('div.text-center.bmessage.alert-info.text-danger');
					var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
					var errorMsg = message.substring(0, message.indexOf('<'));
					if(errorMsg && errorMsg!= '')
						verifyErrorMsg(errorMsg, "Sorry! You don't have permission to perform this action.", 'ThumsUpDown', casper, function() {});
				});
			});
		});
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open Change Permission From Back-End And Disable View Profile
	casper.then(function() {
		generalPermission.viewChangePermissionForModerators(casper, test, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ '2_backEndChangePermission.png');
				casper.echo('Opened Change Permission Page Successfully', 'INFO')
				try {
					test.assertExists('#view_profiles');
					utils.enableorDisableCheckbox('view_profiles', true, casper, function() {
						casper.echo('checkbox is unchecked', 'INFO');
						casper.capture(screenShotsDir+ 'unchecked.png');			
					});
					try {
						test.assertExists('button.button.btn-m.btn-blue');
						this.click('button.button.btn-m.btn-blue');
						casper.wait(5000, function() {
							this.capture(screenShotsDir+ '3_updatedChangePermission.png');
							test.assertExists('font[color="red"]');
							var successMsg = this.fetchText('font[color="red"]');
							var expectedSuccessMsg = 'Your user group settings have been updated.';
							if(successMsg && successMsg!= '')
							verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
								casper.capture(screenShotsDir+ 'success.png');
							});
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

	casper.then(function() {
		casper.echo('                                      CASE 7', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY WITH CLICK ON LIKERS/DISLIKERS USERNAME IN CASE OF MODERATORS', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hs1', 'hh', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});
	
	//Clicking On Any Topic Present In The List
	casper.then(function() {
		
	});
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir + 'clickOnTopic.png');
	});

	casper.then(function() {
		test.assertExists('a.default-user');
		this.click('a.default-user');
		casper.wait(5000, function() {
			test.assertExists('a[href^="/profile"]');
			this.click('a[href^="/profile"]');
			casper.wait(5000, function() {
				//Click on Topic
				casper.then(function() {
					test.assertExists('i.icon.icon-menu');
					this.click('i.icon.icon-menu');
					test.assertExists('a[href="/latest"]');
					this.click('a[href="/latest"]');
				});
				var id = this.getElementAttribute('input[type="hidden"][name="userid"]', 'value');
				//this.echo(id, 'INFO');
				casper.wait(5000, function() {
					test.assertExists('a[href^="/post/holyday"]');
					this.click('a[href^="/post/holyday"]');
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ '1.png');
						try {
				
							test.assertExists('.voted-yes');
							test.assertExists('a[href^="#likes-modal"]');
							this.click('a[href^="#likes-modal"]');
							casper.wait(3000, function() {
								test.assertExists('a[href^="/profile/'+id+'"]');
								this.click('a[href^="/profile/'+id+'"]');
								casper.wait(5000, function() {
									this.capture(screenShotsDir+ '2.png');
									test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
								});
							});
						}catch(e) {
							test.assertExists('i.glyphicon.glyphicon-like-alt');
							this.click('i.glyphicon.glyphicon-like-alt');
							casper.wait(3000, function() {
								this.capture(screenShotsDir+ '2.png');
								//test.assertExists('a.text-muted.voted-yes');
								test.assertExists('a[href^="#likes-modal"]');
								this.click('a[href^="#likes-modal"]');
								casper.wait(3000, function() {
									test.assertExists('a[href^="/profile/'+id+'"]');
									this.click('a[href^="/profile/'+id+'"]');
									casper.wait(5000, function() {
										this.capture(screenShotsDir+ '2.png');
										test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
									});
								});
							});
						}
					});
				});
			});
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 8', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FUNCTIONALITY OF REPUTATION WHEN LIKED POST OF ANY OTHER USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});
	
	//Clicking On Other User's Profile
	casper.then(function() {
		test.assertExists('span.topic-content p.text-muted.preview-text a');
		this.click('span.topic-content p.text-muted.preview-text a');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'reputationBeforeLike.png');
			test.assertExists('li.reputation span.profile-count');
			var profileCount = this.fetchText('li.reputation span.profile-count');	
			this.echo('reputaions before like : '+profileCount, 'INFO');
			test.assertExists('a i.glyphicon.glyphicon-like-alt');
			this.click('a i.glyphicon.glyphicon-like-alt');
			casper.wait(5000, function() {
				this.reload();
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'reputationAfterLike.png');
					test.assertExists('li.reputation span.profile-count');
					var profileCount = this.fetchText('li.reputation span.profile-count');	
					this.echo('reputaions after like : '+profileCount, 'INFO');
				});
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 9', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FUNCTIONALITY OF REPUTATION WHEN DISLIKED POST OF ANY OTHER USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});
	
	//Clicking On Other User's Profile
	casper.then(function() {
		test.assertExists('span.topic-content p.text-muted.preview-text a');
		this.click('span.topic-content p.text-muted.preview-text a');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'reputationBeforeLike.png');
			test.assertExists('li.reputation span.profile-count');
			var profileCount = this.fetchText('li.reputation span.profile-count');	
			this.echo('reputaions before dislike : '+profileCount, 'INFO');
			test.assertExists('a i.glyphicon.glyphicon-dislike-alt');
			this.click('a i.glyphicon.glyphicon-dislike-alt');
			casper.wait(5000, function() {
				this.reload();
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'reputationAfterLike.png');
					test.assertExists('li.reputation span.profile-count');
					var profileCount = this.fetchText('li.reputation span.profile-count');	
					this.echo('reputaions after dislike : '+profileCount, 'INFO');
				});
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 10', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FUNCTIONALITY OF REPUTATION WHEN DISABLED FROM BACKEND', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open settings From Back-End And Disable Likes & reputation
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
		this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
		casper.wait(5000, function() {
			test.assertExists('#reputation');
			utils.enableorDisableCheckbox('reputation', false, casper, function() {
				casper.echo('checkbox is unchecked', 'INFO');
				casper.capture(screenShotsDir+ 'unchecked.png');			
			});
			try {
				test.assertExists('button.button.btn-m.btn-blue');
				this.click('button.button.btn-m.btn-blue');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'updatedChangePermission.png');
					this.echo('changes are saved successfully', 'INFO');
				});
			}catch(e) {
				test.assertDoesntExist('button.button.btn-m.btn-blue');
			}	
		});
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});
	
	//Clicking On Other User's Profile
	casper.then(function() {
		test.assertExists('span.topic-content p.text-muted.preview-text a');
		this.click('span.topic-content p.text-muted.preview-text a');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'reputationBeforeLike.png');
			test.assertDoesntExist('div.pull-left.profile-menu li.reputation');
			this.echo("Reputation link not found on user's Profile", 'INFO');
			test.assertDoesntExist('i.glyphicon.glyphicon-like-alt');
			this.echo("thums up link not found on user's Profile", 'INFO');
			this.echo("test case verified when likes & reputations disabled from back-end", 'INFO');
		});
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open settings From Back-End And Disable Likes & reputation
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
		this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
		casper.wait(5000, function() {
			test.assertExists('#reputation');
			utils.enableorDisableCheckbox('reputation', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
				casper.capture(screenShotsDir+ 'checked.png');			
			});
			try {
				test.assertExists('button.button.btn-m.btn-blue');
				this.click('button.button.btn-m.btn-blue');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'updatedChangePermission.png');
					this.echo('changes are saved successfully', 'INFO');
				});
			}catch(e) {
				test.assertDoesntExist('button.button.btn-m.btn-blue');
			}	
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 11', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE COUNTER OF THUMPS UP', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});

	//Clicking On Other User's Profile
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'reputationBeforeLike.png');
			test.assertExists('a[href^="#likes-modal"]');
			var profileCount = this.fetchText('a[href^="#likes-modal"]');	
			this.echo('count before like : '+profileCount, 'INFO');
			test.assertExists('a i.glyphicon.glyphicon-like-alt');
			this.click('a i.glyphicon.glyphicon-like-alt');
			casper.wait(5000, function() {
				this.reload();
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'reputationAfterLike.png');
					test.assertExists('a[href^="#likes-modal"]');
					var profileCount = this.fetchText('a[href^="#likes-modal"]');	
					this.echo('count after like : '+profileCount, 'INFO');
				});
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 12', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE COUNTER OF THUMPS DOWN', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});

	//Clicking On Other User's Profile
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
		casper.wait(5000, function() {
			try {
				this.capture(screenShotsDir+ 'reputationBeforeLike.png');
				test.assertExists('.voted-no');
				var profileCount = this.fetchText('span.text-muted:nth-child(5)');
				var profileCount = this.fetchText('span.text-muted:nth-child(5)');	
				this.echo('count before dislike : '+profileCount, 'INFO');
				test.assertExists('a i.glyphicon.glyphicon-dislike-alt');
				this.click('a i.glyphicon.glyphicon-dislike-alt');
				casper.wait(5000, function() {
					this.reload();
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'reputationAfterLike.png');
						test.assertExists('span.text-muted:nth-child(5)');
						var profileCount = this.fetchText('span.text-muted:nth-child(5)');	
						this.echo('count after dislike : '+profileCount, 'INFO');
					});
				});
			}catch(e) {
				test.assertExists('a i.glyphicon.glyphicon-dislike-alt');
				this.click('a i.glyphicon.glyphicon-dislike-alt');
				this.capture(screenShotsDir+ 'reputationBeforeLike.png');
				var profileCount = this.fetchText('span.text-muted:nth-child(5)');	
				this.echo('count before dislike : '+profileCount, 'INFO');
				test.assertExists('a i.glyphicon.glyphicon-dislike-alt');
				this.click('a i.glyphicon.glyphicon-dislike-alt');
				casper.wait(5000, function() {
					this.reload();
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'reputationAfterLike.png');
						test.assertExists('span.text-muted:nth-child(5)');
						var profileCount = this.fetchText('span.text-muted:nth-child(5)');	
						this.echo('count after dislike : '+profileCount, 'INFO');
					});
				});
			}
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 13', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE COUNTER OF THUMPS UP TWO TIMES', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
		
	//Click on Topic
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});

	//Clicking On Other User's Profile
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'reputationBeforeLike.png');
			test.assertExists('a[href^="#likes-modal"]');
			var profileCount = this.fetchText('a[href^="#likes-modal"]');	
			this.echo('count after like : '+profileCount, 'INFO');
			test.assertExists('a i.glyphicon.glyphicon-like-alt');
			this.click('a i.glyphicon.glyphicon-like-alt');
			this.click('a i.glyphicon.glyphicon-like-alt');
			casper.wait(5000, function() {
				this.reload();
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'reputationAfterLike.png');
					test.assertExists('a[href^="#likes-modal"]');
					var profileCount = this.fetchText('a[href^="#likes-modal"]');	
					this.echo('count after like : '+profileCount, 'INFO');
				});
			});
		});
	});

	// Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		//var expectedErrorMsg = 'Please provide a signature.';
		//test.assertEquals(message, expectedErrorMsg);
		this.echo('Alert message is verified', 'INFO');
	});

	casper.then(function() {
		casper.echo('                                      CASE 14', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FUNCTIONALITY OF REPUTATION ON PROFILE PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});
	
	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('rajatk2', 'rk@123', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});

	//Clicking On User's Profile
	casper.then(function() {
		test.assertExists('a.default-user');	
		this.click('a.default-user');
		casper.wait(5000, function() {
			test.assertExists('a[href^="/profile"]');
			this.click('a[href^="/profile"]');
			casper.wait(5000, function() {
				test.assertExists('li.reputation span.profile-count');
				var profileCount = this.fetchText('li.reputation span.profile-count');	
				this.echo('reputaions before delete any post : '+profileCount, 'INFO');
				test.assertExists('i.glyphicon.glyphicon-chevron-down');
				this.click('i.glyphicon.glyphicon-chevron-down');
				test.assertExists('i.glyphicon.glyphicon-trash.text-muted.pull-right');
				this.click('i.glyphicon.glyphicon-trash.text-muted.pull-right');
				casper.wait(5000, function() {
					test.assertExists('li.reputation span.profile-count');
					var profileCount = this.fetchText('li.reputation span.profile-count');	
					this.echo('reputaions before delete any post : '+profileCount, 'INFO');
				});
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 15', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY UNCHECKED USER ACCOUNT FROM BACK-END', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open settings From Back-End And Disable User Accounts
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
		this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
		casper.wait(5000, function() {
			test.assertExists('#REQreg');
			utils.enableorDisableCheckbox('REQreg', false, casper, function() {
				casper.echo('checkbox is unchecked', 'INFO');
				casper.capture(screenShotsDir+ 'unchecked.png');			
			});
			try {
				test.assertExists('button.button.btn-m.btn-blue');
				this.click('button.button.btn-m.btn-blue');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'updatedChangePermission.png');
					this.echo('changes are saved successfully', 'INFO');
				});
			}catch(e) {
				test.assertDoesntExist('button.button.btn-m.btn-blue');
			}	
		});
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Click On Likes/Dislikes
	casper.then(function() {
		test.assertExists('form[name="posts"] a.topic-title');
		this.click('form[name="posts"] a.topic-title');
		casper.wait(5000, function() {
			test.assertDoesntExist('i.glyphicon.glyphicon-like-alt');
			test.assertDoesntExist('i.glyphicon.glyphicon-dislike-alt');
		});
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open settings From Back-End And Disable User Accounts
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
		this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
		casper.wait(5000, function() {
			test.assertExists('#REQreg');
			utils.enableorDisableCheckbox('REQreg', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
				casper.capture(screenShotsDir+ 'checked.png');			
			});
			try {
				test.assertExists('button.button.btn-m.btn-blue');
				this.click('button.button.btn-m.btn-blue');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'updatedChangePermission.png');
					this.echo('changes are saved successfully', 'INFO');
				});
			}catch(e) {
				test.assertDoesntExist('button.button.btn-m.btn-blue');
			}	
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 16', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY USER REPUTATION', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App And Create A Topic
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	casper.then(function() {
		gotoNewTopicpage(casper, function() {
			casper.wait(5000, function() {
				this.echo('start new topic page opened successfully', 'INFO');								
			});							
		});
	});

	//Post A Topic
	casper.then(function() {
		postTopicpage(json.newTopic, casper, function() {
			casper.wait(5000, function() {
				this.echo('new topic created', 'INFO');
			});
		});	
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App 
	casper.then(function() {
		forumLogin.loginToApp('rajatk2', 'rk@123', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});

	//Go To Other User's Profile And Click On like/Dislike
	casper.then(function() {
		test.assertExists('p.text-muted.preview-text a[href^="/profile"]');
		this.click('p.text-muted.preview-text a[href^="/profile"]');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ '1.png');
			test.assertExists('li.reputation span.profile-count');
			var profileCount = this.fetchText('li.reputation span.profile-count');	
			this.echo('reputaions before like : '+profileCount, 'INFO');
			//test.assertExists('.voted-yes');
			test.assertExists('i.glyphicon.glyphicon-like-alt');
			this.click('i.glyphicon.glyphicon-like-alt');
			casper.wait(3000, function() {
				this.reload();
				casper.wait(5000, function() {
					test.assertExists('li.reputation span.profile-count');
					var profileCount = this.fetchText('li.reputation span.profile-count');	
					this.echo('reputaions after like : '+profileCount, 'INFO');
				});
			});
		});
		casper.then(function() {
			this.capture(screenShotsDir+ '1.png');
			test.assertExists('li.reputation span.profile-count');
			var profileCount = this.fetchText('li.reputation span.profile-count');	
			this.echo('reputaions before like : '+profileCount, 'INFO');
			//test.assertExists('.voted-yes');
			test.assertExists('i.glyphicon.glyphicon-dislike-alt');
			this.click('i.glyphicon.glyphicon-dislike-alt');
			casper.wait(3000, function() {
				this.reload();
				casper.wait(5000, function() {
					test.assertExists('li.reputation span.profile-count');
					var profileCount = this.fetchText('li.reputation span.profile-count');	
					this.echo('reputaions after like : '+profileCount, 'INFO');
				});
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 17', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY LIKE/UNLIKE ICON FOR GUEST USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	casper.then(function() {
		test.assertExists('span a.topic-title');
		this.click('span a.topic-title');
		casper.wait(5000, function() {
			test.assertExists('i.glyphicon.glyphicon-like-alt');
			test.assertExists('i.glyphicon.glyphicon-dislike-alt');
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 18', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY LIKE/UNLIKE ICON FOR GUEST USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	casper.then(function() {
		test.assertExists('span a.topic-title');
		this.click('span a.topic-title');
		casper.wait(5000, function() {
			//Logout From App
			casper.then(function() {
				forumRegister.redirectToLogout(casper, test, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'logout.png');
					});		
				});
			
			});
			//Login To App 
			casper.then(function() {
				test.assertExists('i.glyphicon.glyphicon-like-alt');
				this.click('i.glyphicon.glyphicon-like-alt');
				forumLogin.loginToApp('rajatk2', 'rk@123', casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'loggedInUser.png');
						this.echo('User logged-in successfully', 'INFO');
					});
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
			//Login To App 
			casper.then(function() {
				test.assertExists('i.glyphicon.glyphicon-dislike-alt');
				this.click('i.glyphicon.glyphicon-dislike-alt');
				forumLogin.loginToApp('rajatk2', 'rk@123', casper, function() {
					casper.wait(5000, function() {
						this.capture(screenShotsDir+ 'loggedInUser.png');
						this.echo('User logged-in successfully', 'INFO');
					});
				});
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 19', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FORGOT PASSWORD LINK ON POP UP WINDOW AFTER CLICK ON LIKE FOR GUEST USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	casper.then(function() {
		test.assertExists('span a.topic-title');
		this.click('span a.topic-title');
		casper.wait(5000, function() {
			casper.then(function() {
				test.assertExists('i.glyphicon.glyphicon-like-alt');
				this.click('i.glyphicon.glyphicon-like-alt');
				test.assertExists('a[href^="/register/lost_pw"]');
				this.click('a[href^="/register/lost_pw"]');
				casper.wait(5000, function() {
					test.assertExists('form[name="lost_pw_form"]');
				});
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 20', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FORGOT PASSWORD LINK ON POP UP WINDOW AFTER CLICK ON DISLIKE FOR GUEST USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	casper.then(function() {
		test.assertExists('span a.topic-title');
		this.click('span a.topic-title');
		casper.wait(5000, function() {
			casper.then(function() {
				test.assertExists('i.glyphicon.glyphicon-dislike-alt');
				this.click('i.glyphicon.glyphicon-dislike-alt');
				test.assertExists('a[href^="/register/lost_pw"]');
				this.click('a[href^="/register/lost_pw"]');
				casper.wait(5000, function() {
					test.assertExists('form[name="lost_pw_form"]');
				});
			});
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 21', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY CREATE ACCOUNT LINK ON POP UP WINDOW WHEN NEW REGISTRATION IS DISABLED FROM BACKEND', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open settings From Back-End And Disable Likes & reputation
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Security"]');
		this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Security"]');
		casper.wait(5000, function() {
			test.assertExists('#new_user_registration');
			utils.enableorDisableCheckbox('new_user_registration', false, casper, function() {
				casper.echo('checkbox is unchecked', 'INFO');
				casper.capture(screenShotsDir+ 'unchecked.png');			
			});
			try {
				test.assertExists('button.button.btn-m.btn-blue');
				this.click('button.button.btn-m.btn-blue');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'updatedChangePermission.png');
					this.echo('changes are saved successfully', 'INFO');
				});
			}catch(e) {
				test.assertDoesntExist('button.button.btn-m.btn-blue');
			}	
		});
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	casper.then(function() {
		test.assertExists('span a.topic-title');
		this.click('span a.topic-title');
		casper.wait(5000, function() {
			casper.then(function() {
				test.assertExists('i.glyphicon.glyphicon-like-alt');
				this.click('i.glyphicon.glyphicon-like-alt');
				casper.wait(5000, function() {
					test.assertDoesntExist('form[name="PostTopics"]');
				});
			});
		});
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	casper.then(function() {
		test.assertExists('span a.topic-title');
		this.click('span a.topic-title');
		casper.wait(5000, function() {
			casper.then(function() {
				test.assertExists('i.glyphicon.glyphicon-dislike-alt');
				this.click('i.glyphicon.glyphicon-dislike-alt');
				casper.wait(5000, function() {
					test.assertDoesntExist('form[name="PostTopics"]');
				});
			});
		});
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open settings From Back-End And Disable Likes & reputation
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Security"]');
		this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Security"]');
		casper.wait(5000, function() {
			test.assertExists('#new_user_registration');
			utils.enableorDisableCheckbox('new_user_registration', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
				casper.capture(screenShotsDir+ 'checked.png');			
			});
			try {
				test.assertExists('button.button.btn-m.btn-blue');
				this.click('button.button.btn-m.btn-blue');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'updatedChangePermission.png');
					this.echo('changes are saved successfully', 'INFO');
				});
			}catch(e) {
				test.assertDoesntExist('button.button.btn-m.btn-blue');
			}	
		});
	});

	casper.then(function() {
		casper.echo('                                      CASE 22', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE LIST OF LIKERS', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App 
	casper.then(function() {
		forumLogin.loginToApp('rajatk2', 'rk@123', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});

	//Move On Topics Page
	casper.then(function() {
		test.assertExists('i.icon.icon-menu');
		this.click('i.icon.icon-menu');
		test.assertExists('a[href="/latest"]');
		this.click('a[href="/latest"]');
	});
	
	//Click On Topic
	casper.then(function() {
		test.assertExists('span h4 a.topic-title');
		this.click('span h4 a.topic-title');
		casper.wait(5000, function() {
			test.assertExists('a[href^="#likes-modal"]');
			this.click('a[href^="#likes-modal"]');
			test.assertExists('div#who_liked_dialog');
			//this.click('div#who_liked_dialog');
		});
	});

	/*casper.then(function() {
		casper.echo('                                      PENDING CASE 23', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY REPUTATION COUNT OF FACEBOOK USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open settings From Back-End And Enable Facebook Connect
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Single+Sign+On"]');
		this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Single+Sign+On"]');
		casper.wait(5000, function() {
			test.assertExists('#facebook_connect');
			utils.enableorDisableCheckbox('facebook_connect', true, casper, function() {
				casper.echo('checkbox is checked', 'INFO');
				casper.capture(screenShotsDir+ 'checked.png');			
			});
			try {
				test.assertExists('button.button.btn-m.btn-blue');
				this.click('button.button.btn-m.btn-blue');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'updatedChangePermission.png');
					this.echo('changes are saved successfully', 'INFO');
				});
			}catch(e) {
				test.assertDoesntExist('button.button.btn-m.btn-blue');
			}	
		});
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App 
	casper.then(function() {
		test.assertExists('a#fb_login');
		this.click('a#fb_login');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ '11.png');
			this.fill('form[id="login_form"]', {
				'email': "8954743384",
				'pass' : "8954743384"
			}, false);
			test.assertExists('input#u_0_2');
			this.click('input#u_0_2');
			casper.wait(5000, function() {});	
		});
	});
	
	casper.then(function() {
		test.assertExists('a#fb_login');
		this.click('a#fb_login');
		casper.wait(5000, function() {
			var page = require('webpage').create();
			var address = "https://beta12.websitetoolbox.com/";
			page.open(address, function (status) {
			    if (status !== 'success') {
				console.log('Unable to load the address!');
				phantom.exit();
			    } else {
				page.onPageCreated = function(newPage){
				    newPage.onLoadFinished = function(){
					console.log(newPage.url);
					phantom.exit();
				    };
				};
				page.evaluate(function(url){
				    window.open(url+"?something=other", "_blank");
				}, address);
			    }
			});
		});
	});

	//Create A Topic
	casper.then(function() {
		gotoNewTopicpage(casper, function() {
			casper.wait(5000, function() {
				this.echo('start new topic page opened successfully', 'INFO');								
			});							
		});
	});

	//Post A Topic
	casper.then(function() {
		postTopicpage(json.newTopic, casper, function() {
			casper.wait(5000, function() {
				this.echo('new topic created', 'INFO');
			});
		});	
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		casper.wait(5000, function() {
			this.echo('Title of the page :' +this.getTitle(), 'INFO');
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

	//Login To App 
	casper.then(function() {
		forumLogin.loginToApp('hsk', 'hsk', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedInUser.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});

	//Like Other user's Post
	casper.then(function() {
		test.assertExists('span h4 a.topic-title');
		this.click('span h4 a.topic-title');
		casper.wait(5000, function() {
			test.assertExists('li.reputation span.profile-count');
			var profileCount = this.fetchText('li.reputation span.profile-count');	
			this.echo('reputaions before like : '+profileCount, 'INFO');
			test.assertExists('i.glyphicon.glyphicon-like-alt');
			this.click('i.glyphicon.glyphicon-like-alt');
			this.reload();
			casper.wait(3000, function() {
				test.assertExists('li.reputation span.profile-count');
				var profileCount = this.fetchText('li.reputation span.profile-count');	
				this.echo('reputaions after like : '+profileCount, 'INFO');
			});
		});
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.wait(5000, function() {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				this.capture(screenShotsDir+ 'backEndLoggedIn.png');
			});
		});
	});
	
	//Open settings From Back-End And Disable Facebook Connect
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Single+Sign+On"]');
		this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Single+Sign+On"]');
		casper.wait(5000, function() {
			test.assertExists('#facebook_connect');
			utils.enableorDisableCheckbox('facebook_connect', false, casper, function() {
				casper.echo('checkbox is unchecked', 'INFO');
				casper.capture(screenShotsDir+ 'unchecked.png');			
			});
			try {
				test.assertExists('button.button.btn-m.btn-blue');
				this.click('button.button.btn-m.btn-blue');
				casper.wait(5000, function() {
					this.capture(screenShotsDir+ 'updatedChangePermission.png');
					this.echo('changes are saved successfully', 'INFO');
				});
			}catch(e) {
				test.assertDoesntExist('button.button.btn-m.btn-blue');
			}	
		});
	});*/
};

//*************************************************PRIVATE METHODS***********************************************

//Method For Verifying Error Message On Thums UP/DOWN
var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	driver.capture(screenShotsDir + 'Error_OnEdit' +msgTitle+ '.png');
	return callback(null);
};

//Method For Verifying Success Message On Thums UP/DOWN
var verifySuccessMsg = function(successMsg, expectedSuccessMsg, msgTitle, driver, callback) {
	driver.echo('Actual Success message : '+successMsg, 'INFO');
	driver.echo('Expected Success message : '+expectedSuccessMsg, 'INFO');
	if((successMsg == expectedSuccessMsg) || (successMsg.indexOf(expectedSuccessMsg) > -1)) {
		driver.echo('Success message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	driver.capture(screenShotsDir + 'Error_OnEdit' +msgTitle+ '.png');
	return callback(null);
};

// method for goto New Topic page to application
var gotoNewTopicpage = function(driver, callback) {
	driver.click('i.icon.icon-menu');
	driver.click('a[href^="/latest"]');
	driver.click('a[href="/post/printadd"]');
	driver.wait(7000, function() {
		this.capture(screenShotsDir+ 'startTopic.png');
	});
	return callback(null);
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
		this.capture(screenShotsDir+ 'content.png');	
	});	
		driver.wait(3000);
		driver.click('#all_forums_dropdown');
		driver.fill('form[name="PostTopic"]',{
			'forum' : data.category
		},false);
	
	driver.then(function() {
		driver.click('#post_submit');
	});
	
	return callback(null);
};
