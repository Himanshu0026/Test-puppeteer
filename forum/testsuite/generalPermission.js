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
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/register/register"]', function success() {
					this.click('a[href^="/register/register"]');
					casper.waitForSelector('form[action="/register/create_account"]', function success() {
						this.echo('registration from opened successfully', 'INFO');
						forumRegister.registerToApp(json.deleteAccount, casper, function() {
						});		
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');			
			}
		});
	});
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			test.assertExists('a[href="/tool/members/login?action=logout"]');
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});
	
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					editProfile.makeRegisteredUser(casper, test, function(err) {
						if(!err) {
							casper.echo('user "hs123" has been made a registered user', 'INFO');
							casper.waitForSelector('div#my_account_forum_menu', function success() {
							generalPermission.viewChangePermission(casper, test, function(err) {
								if(!err) {
									casper.echo('Opened Change Permission Page Successfully', 'INFO');
									casper.waitForSelector('#view_messageboard', function success() {
										utils.enableorDisableCheckbox('view_messageboard', false, casper, function() {
											casper.echo('checkbox is unchecked', 'INFO');
										});
										try {
											test.assertExists('button.button.btn-m.btn-blue');
											this.click('button.button.btn-m.btn-blue');
											casper.waitForSelector('font[color="red"]', function success() {
												this.emit('waitForSuccess');
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
										}catch(e) {
											test.assertDoesntExist('button.button.btn-m.btn-blue');
										}
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}else {
									casper.echo('Error : '+err, 'ERROR');	
								}
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
						}else {
							casper.echo('Error : '+err, 'ERROR');			
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');			
			}
		});						
	});
	
	casper.on('waitForSuccess', function() {
		casper.then(function() {
			try {
				test.assertExists('font[color="red"]');
				var successMsg = this.fetchText('font[color="red"]');
				var expectedSuccessMsg = 'Your user group settings have been updated.';
				verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewForum', casper, function() {
				});
			}catch(e) {
				test.assertDoesntExist('font[color="red"]');
			}
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.echo('User Logged In Successfully', 'INFO');
							casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
								var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
								var errorMsg = message.substring(0, message.indexOf('<'));
								var expectedErrorMsg = "Sorry! You don't have permission to perform this action.";
								if(errorMsg&&errorMsg!= '')
								verifyErrorMsg(errorMsg, expectedErrorMsg, 'GeneralGroupPermission', casper, function() {});
								this.echo('Disabled View Profile Is Verified', 'INFO');
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});
	

//***********************************2nd Test Case Verification**********************************
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_messageboard', function success() {
							casper.echo('Opened Change Permission Page Successfully', 'INFO');
							utils.enableorDisableCheckbox('view_messageboard', true, casper, function() {
								casper.echo('checkbox is checked', 'INFO');
							});
							try {
								test.assertExists('button.button.btn-m.btn-blue');
								this.click('button.button.btn-m.btn-blue');
								casper.waitForSelector('font[color="red"]', function success() {
									this.emit('waitForSuccess');
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}catch(e) {
								test.assertDoesntExist('button.button.btn-m.btn-blue');
							}
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('a.default-user', function success() {
								this.echo('User Logged In Successfully', 'INFO');
								try {
									test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
									this.echo('Enabled View Forum Is Verified', 'INFO');
								}catch(e) {
									test.assertExists('div.text-center.bmessage.alert-info.text-danger');
									this.echo('View Forum Is Disabled From The Back-end', 'ERROR');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

//***********************************3rd Test Case Verification**********************************
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});
	
	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_profiles', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO');
								utils.enableorDisableCheckbox('view_profiles', false, casper, function() {
									casper.echo('checkbox is unchecked', 'INFO');
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									casper.waitForSelector('font[color="red"]', function success() {
										this.emit('waitForSuccess');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('button.button.btn-m.btn-blue');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.echo('User Logged In Successfully', 'INFO');
								this.click('i.icon.icon-menu');
								test.assertExists('a[href^="/register/members"]');
								this.click('a[href^="/register/members"]');
								casper.waitForSelector('span.col-sm-9.right-side a strong', function success() {
									this.click('span.col-sm-9.right-side a strong');	
									casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
										var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
										var errorMsg = message.substring(0, message.indexOf('<'));
										var expectedErrorMsg = "Sorry! You don't have permission to perform this action.";
										verifyErrorMsg(errorMsg, expectedErrorMsg, 'ViewProfile', casper, function() {});
										this.echo('Disabled View Profile Is Verified', 'INFO');
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
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

//***********************************4th Test Case Verification**********************************

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_profiles', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO');
								utils.enableorDisableCheckbox('view_profiles', true, casper, function() {
									casper.echo('checkbox is checked', 'INFO');
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									casper.waitForSelector('font[color="red"]', function success() {
										this.emit('waitForSuccess');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('button.button.btn-m.btn-blue');
								}
					
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('ERROR OCCURRED', 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			} 
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.echo('User Logged In Successfully', 'INFO');
								this.click('i.icon.icon-menu');
								test.assertExists('a[href^="/register/members"]');
								this.click('a[href^="/register/members"]');
								casper.waitForSelector('span.col-sm-9.right-side a strong', function success() {
									this.click('span.col-sm-9.right-side a strong');	
									this.echo('Enabled View Profile Verified Successfully', 'INFO');
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

//***********************************5th Test Case Verification**********************************
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#memberslist_viewable', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO');
								utils.enableorDisableCheckbox('memberslist_viewable', false, casper, function() {
									casper.echo('checkbox is unchecked', 'INFO');
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									casper.waitForSelector('font[color="red"]', function success() {
										this.emit('waitForSuccess');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('button.button.btn-m.btn-blue');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
								
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.echo('User Logged In Successfully', 'INFO');
								this.click('i.icon.icon-menu');
								test.assertExists('a[href^="/register/members"]');
								this.click('a[href^="/register/members"]');
								casper.waitForSelector('a[href^="/register/members?sort=joindate&reverse=true&list=&search=&fieldid_fields="]', function success() {
									this.click('a[href^="/register/members?sort=joindate&reverse=true&list=&search=&fieldid_fields="]');
									casper.then(function() {
										test.assertExists(x('//a/strong[text()="hs1234"]/ancestor::li/span'));
										this.echo('Disabled Viewable On Member List Verified Successfully', 'INFO');
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

//***********************************6th Test Case Verification**********************************

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#memberslist_viewable', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO');
								utils.enableorDisableCheckbox('memberslist_viewable', true, casper, function() {
									casper.echo('checkbox is checked', 'INFO');
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									casper.waitForSelector('font[color="red"]', function success() {
										this.emit('waitForSuccess');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('button.button.btn-m.btn-blue');
								}
					
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

	//Open Fornt-End URL
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
						if(!err) {
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.echo('User Logged In Successfully', 'INFO');
								this.click('i.icon.icon-menu');
								test.assertExists('a[href^="/register/members"]');
								this.click('a[href^="/register/members"]');
								casper.waitForSelector('a[href^="/register/members?sort=joindate&reverse=true&list=&search=&fieldid_fields="]', function success() {
									this.click('a[href^="/register/members?sort=joindate&reverse=true&list=&search=&fieldid_fields="]');
									casper.then(function() {
										test.assertExists(x('//a/strong[text()="hs1234"]/ancestor::li/span'));
										this.echo('Disabled Viewable On Member List Verified Successfully', 'INFO');
									});
								}, function fail() {

								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

//***********************************7th Test Case Verification**********************************
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_invisible', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO');
								utils.enableorDisableCheckbox('view_invisible', false, casper, function() {
									casper.echo('checkbox is unchecked for view invisible members', 'INFO');
								});
								utils.enableorDisableCheckbox('allow_invisible', true, casper, function() {
									casper.echo('checkbox is checked for set self invisible', 'INFO');
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									casper.waitForSelector('font[color="red"]', function success() {
										this.emit('waitForSuccess');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('button.button.btn-m.btn-blue');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
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
				casper.waitForSelector('form[name="frmSkinSearch"] input#inline_search_textbox', function success() {
					this.sendKeys('form[name="frmSkinSearch"] input#inline_search_textbox', 'Elegance');
					this.click('form[name="frmSkinSearch"] input#inline_search_textbox');
					this.page.sendEvent("keypress", this.page.event.key.Enter);
					casper.waitForSelector('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=50&search_skin=Elegance&sorted="]', function success() {
						this.click('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=50&search_skin=Elegance&sorted="]');
						casper.then(function() {
							this.on('remote.alert', testAlert2);
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
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
								casper.waitForSelector('#online_user_list', function success() {
									utils.enableorDisableCheckbox('online_user_list', true, casper, function() {
											casper.echo('checkbox is checked', 'INFO');
									});
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');	
									casper.then(function() {
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}catch(e) {
								test.assertDoesntExist('a[href^="/tool/members/mb/settings?tab=Display"]');
							}
						}catch(e) {
							test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
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
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		try {
			test.assertExists('a[href^="/register/logout"]');
			this.click('a[href^="/register/logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/logout"]');
		}
	});
	
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/profile"]', function success() {
					this.click('a[href^="/profile"]');
					casper.waitForSelector('a[href^="/register/register?edit"]', function success() {
						this.click('a[href^="/register/register?edit"]');	
						casper.waitForSelector('a[href^="/register?action=preferences"]', function seccess() {
							this.click('a[href^="/register?action=preferences"]');
							casper.waitForSelector('#INVS', function success() {
								utils.enableorDisableCheckbox('INVS', true, casper, function() {
									casper.echo('checkbox is checked for invisible mode', 'INFO');
								});
								test.assertExists('td input.global_button_middle');	
								this.click('td input.global_button_middle');	
								casper.waitForSelector('a[href^="/categories"]', function success() {
									this.click('a[href^="/categories"]');
									this.echo('view invisible member is verified successfully', 'INFO');
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
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});

//***********************************8th Test Case Verification**********************************

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_invisible', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO');
								utils.enableorDisableCheckbox('view_invisible', true, casper, function() {
									casper.echo('checkbox is checked', 'INFO');
								});
								utils.enableorDisableCheckbox('allow_invisible', true, casper, function() {
									casper.echo('checkbox is checked for set self invisible', 'INFO');
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									casper.waitForSelector('font[color="red"]', function success() {
										this.emit('waitForSuccess');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								}catch(e) {
									test.assertDoesntExist('button.button.btn-m.btn-blue');
								}
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}else {
							casper.echo('Error : '+err, 'ERROR');
						}
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
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
				casper.waitForSelector('#online_user_list', function success() {
					test.assertExists('#online_user_list');
					utils.enableorDisableCheckbox('online_user_list', true, casper, function() {
							casper.echo('checkbox is checked', 'INFO');
					});
					test.assertExists('button.button.btn-m.btn-blue');
					this.click('button.button.btn-m.btn-blue');	
					this.then(function() {});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
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
		this.echo('Title of the page : ' +this.getTitle(), 'INFO');
		try {
			test.assertExists('a[href^="/register/logout"]');
			this.click('a[href^="/register/logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href^="/register/logout"]');
		}
	});

	//Login To Front-End And Click On Other User's Profile
	casper.then(function() {
		forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
			if(!err) {
				casper.waitForSelector('a[href^="/profile"]', function success() {
					this.click('a[href^="/profile"]');
					casper.waitForSelector('a[href^="/register/register?edit"]', function success() {
						this.click('a[href^="/register/register?edit"]');	
						casper.waitForSelector('a[href^="/register?action=preferences"]', function seccess() {
							this.click('a[href^="/register?action=preferences"]');
							casper.waitForSelector('#INVS', function success() {
								utils.enableorDisableCheckbox('INVS', true, casper, function() {
									casper.echo('checkbox is checked for invisible mode', 'INFO');
								});
								test.assertExists('td input.global_button_middle');	
								this.click('td input.global_button_middle');	
								casper.waitForSelector('a[href^="/categories"]', function success() {
									this.click('a[href^="/categories"]');
									this.echo('view invisible member is verified successfully', 'INFO');
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
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
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

	//Login To Forum Back-End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					try {
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddAppearance"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddAppearance"]');
						try {
							test.assertExists('a[href^="/tool/members/mb/skins"]');
							this.click('a[href^="/tool/members/mb/skins"]');
							casper.waitForSelector('form[name="frmSkinSearch"] input#inline_search_textbox', function success() {
								this.sendKeys('form[name="frmSkinSearch"] input#inline_search_textbox', 'Angela');
								this.click('form[name="frmSkinSearch"] input#inline_search_textbox');
								this.page.sendEvent("keypress", this.page.event.key.Enter);
								casper.waitForSelector('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=51&search_skin=Angela&sorted="]', function success() {
									this.click('a[href^="/tool/members/mb/skins?action=install_skin&subaction=skins&skin_id=51&search_skin=Angela&sorted="]');
									casper.then(function() {
										this.on('remote.alert', testAlert2);
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
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
											casper.waitForSelector('#online_user_list', function success() {
												utils.enableorDisableCheckbox('online_user_list', true, casper, function() {
														casper.echo('checkbox is checked', 'INFO');
												});
												test.assertExists('button.button.btn-m.btn-blue');
												this.click('button.button.btn-m.btn-blue');	
												casper.then(function() {
												});
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
										}catch(e) {
											test.assertDoesntExist('a[href^="/tool/members/mb/settings?tab=Display"]');
										}
									}catch(e) {
										test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
									}
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}catch(e) {
							test.assertDoesntExist('a[href^="/tool/members/mb/skins"]');
						}
					}catch(e) {
						test.assertDoesntExist('div#my_account_forum_menu a[data-tooltip-elm="ddAppearance"]');
					}
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				casper.echo('Error : '+err, 'ERROR');
			}
		});
	});
};

//************************************PRIVATE METHODS***********************************

//Method For Enabling View Profile For Registered User
generalPermission.viewChangePermission = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Registered Users') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				this.click('a[href="'+grpName+'"]');
				return callback(null);
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

//Method To Disable View Profile For Moderators
generalPermission.viewChangePermissionForModerators = function(driver, test, callback) {
	try {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		driver.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		try {
			test.assertExists('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			driver.waitForSelector('table.text.fullborder', function success() {
				var grpName = this.evaluate(function(){
					for(var i=1; i<=7; i++) {
						var x1 = document.querySelector('tr:nth-child('+i+') td:nth-child(1)');
						if (x1.innerText == 'Moderators') {
							var x2 = document.querySelector('tr:nth-child('+i+') td:nth-child(3) div.tooltipMenu a').getAttribute('href');
							return x2;
						}
					}
				});
				this.click('a[href="'+grpName+'"]');
				return callback(null);
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

//Method For Verifying Error Message On General Group Permission
var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
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
	return callback(null);
};

function testAlert2(message) {
	casper.echo('message : '+message, 'INFO');
	casper.test.assertEquals(message, 'Activate the Black N White theme?');
	casper.echo('Alert message is verified', 'INFO');
};
