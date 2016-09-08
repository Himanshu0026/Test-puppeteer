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
	
	casper.then(function() {
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
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			
			}, function fail() {
				casper.echo('ERROR OCCURRED', 'ERROR');
			});
		}, function fail() {
			casper.echo('ERROR OCCURRED', 'ERROR');
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
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			
			}, function fail() {
				casper.echo('ERROR OCCURRED', 'ERROR');
			});
		}, function fail() {
			casper.echo('ERROR OCCURRED', 'ERROR');
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
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					casper.echo('ERROR OCCURRED', 'ERROR');
				});
			}, function fail() {
				casper.echo('ERROR OCCURRED', 'ERROR');
			});
		});
	});
	
	casper.then(function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY WITH CLICK ON LIKERS/DISLIKERS USERNAME IN CASE OF REGISTERED USER', 'INFO');
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

	//Login To Forum Back-end And Change Permissions From back End
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_profiles', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO')
								try {
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
	
	//Open Front-End URL 
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hsk', 'hsk', casper, function(err) {
						if(!err) {
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.click('i.icon.icon-menu');
								test.assertExists('a[href="/latest"]');
								this.click('a[href="/latest"]');
								casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
									this.click('form[name="posts"] a.topic-title');
									casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
										try {
											test.assertExists('a.login_dialog.text-muted.voted-yes');
										}catch(e) {
											this.click('i.glyphicon.glyphicon-like-alt');
										}
										casper.waitForSelector('a[href^="#likes-modal"]', function success() {
											this.click('a[href^="#likes-modal"]');
											casper.waitForSelector('li.col-xs-3 a[href^="/profile/"]', function success() {
												this.click('li.col-xs-3 a[href^="/profile/"]');
												casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
													var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
													var errorMsg = message.substring(0, message.indexOf('<'));
													if(errorMsg && errorMsg!= '')
														verifyErrorMsg(errorMsg, "Sorry! You don't have permission to perform this action.", 'ThumsUpDown', casper, function() {});
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

	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					casper.echo('Logged-in successfully from back-end', 'INFO');
					generalPermission.viewChangePermission(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_profiles', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO')
								utils.enableorDisableCheckbox('view_profiles', true, casper, function() {
									casper.echo('checkbox is checked', 'INFO');
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									casper.waitForSelector('font[color="red"]', function success() {
										test.assertExists('font[color="red"]');
										var successMsg = this.fetchText('font[color="red"]');
										var expectedSuccessMsg = 'Your user group settings have been updated.';
										if(successMsg && successMsg!= '')
										verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
										});
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
		casper.echo('TO VERIFY WITH CLICK ON LIKERS/DISLIKERS USERNAME IN CASE OF REGISTERED USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hsk', 'hsk', casper, function(ERR) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('a.default-user', function success() {
								this.click('a.default-user');
								test.assertExists('a[href^="/profile"]');
								this.click('a[href^="/profile"]');
								casper.waitForSelector('i.icon.icon-menu', function success() {
									var id = this.getElementAttribute('input[type="hidden"][name="userid"]', 'value');
									test.assertExists('i.icon.icon-menu');
									this.click('i.icon.icon-menu');
									test.assertExists('a[href="/latest"]');
									this.click('a[href="/latest"]');
									casper.waitForSelector('a.topic-title span', function success() {
										this.click('a.topic-title span');
										casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
											try {
			
												test.assertExists('.voted-yes');
												test.assertExists('a[href^="#likes-modal"]');
												this.click('a[href^="#likes-modal"]');
												test.assertExists('a[href^="/profile/'+id+'"]');
												this.click('a[href^="/profile/'+id+'"]');
												casper.then(function() {
													test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
												});
											}catch(e) {
												test.assertExists('i.glyphicon.glyphicon-like-alt');
												this.click('i.glyphicon.glyphicon-like-alt');
													test.assertExists('a[href^="#likes-modal"]');
													this.click('a[href^="#likes-modal"]');
													test.assertExists('a[href^="/profile/'+id+'"]');
													this.click('a[href^="/profile/'+id+'"]');
													casper.then(function() {
														test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
													});
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
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY WITH CLICK ON LIKERS/DISLIKERS USERNAME IN CASE OF MODERATORS', 'INFO');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			casper.echo('Logged-in successfully from back-end', 'INFO');
			if(!err) {
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermissionForModerators(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_profiles', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO')
								utils.enableorDisableCheckbox('view_profiles', false, casper, function() {
									casper.echo('checkbox is unchecked', 'INFO');
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									casper.waitForSelector('font[color="red"]', function success() {
										var successMsg = this.fetchText('font[color="red"]');
										var expectedSuccessMsg = 'Your user group settings have been updated.';
										if(successMsg && successMsg!= '')
										verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
										});
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

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hs1', 'hh', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.click('i.icon.icon-menu');
								test.assertExists('a[href="/latest"]');
								this.click('a[href="/latest"]');
								casper.waitForSelector('a[href^="/post/holyday"]', function success() {
									test.assertExists('a[href^="/post/holyday"]');
									this.click('a[href^="/post/holyday"]');
									casper.waitForSelector('a[href^="#likes-modal"]', function success() {
										test.assertExists('a[href^="#likes-modal"]');
										this.click('a[href^="#likes-modal"]');
										casper.wait(3000, function() {
											test.assertExists('li.col-xs-3 a[href^="/profile/"]');
											this.click('li.col-xs-3 a[href^="/profile/"]');
											casper.waitForSelector('div.text-center.bmessage.alert-info.text-danger', function success() {
												var message = this.fetchText('div.text-center.bmessage.alert-info.text-danger');
												var errorMsg = message.substring(0, message.indexOf('<'));
												if(errorMsg && errorMsg!= '')
													verifyErrorMsg(errorMsg, "Sorry! You don't have permission to perform this action.", 'ThumsUpDown', casper, function() {});
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
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
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					generalPermission.viewChangePermissionForModerators(casper, test, function(err) {
						if(!err) {
							casper.waitForSelector('#view_profiles', function success() {
								casper.echo('Opened Change Permission Page Successfully', 'INFO')
								utils.enableorDisableCheckbox('view_profiles', true, casper, function() {
									casper.echo('checkbox is unchecked', 'INFO');
								});
								try {
									test.assertExists('button.button.btn-m.btn-blue');
									this.click('button.button.btn-m.btn-blue');
									casper.waitForSelector('font[color="red"]', function success() {
										var successMsg = this.fetchText('font[color="red"]');
										var expectedSuccessMsg = 'Your user group settings have been updated.';
										if(successMsg && successMsg!= '')
										verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {
										});
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
		casper.echo('                                      CASE 7', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY WITH CLICK ON LIKERS/DISLIKERS USERNAME IN CASE OF MODERATORS', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hs1', 'hh', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('a.default-user', function success() {
								this.click('a.default-user');
								test.assertExists('a[href^="/profile"]');
								this.click('a[href^="/profile"]');
								casper.waitForSelector('i.icon.icon-menu', function success() {
									var id = this.getElementAttribute('input[type="hidden"][name="userid"]', 'value');
									this.click('i.icon.icon-menu');
									test.assertExists('a[href="/latest"]');
									this.click('a[href="/latest"]');
									this.echo(id, 'INFO');
									casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
										this.click('form[name="posts"] a.topic-title');
										casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
											try {
			
												test.assertExists('.voted-yes');
												test.assertExists('a[href^="#likes-modal"]');
												this.click('a[href^="#likes-modal"]');
												test.assertExists('a[href^="/profile/'+id+'"]');
												this.click('a[href^="/profile/'+id+'"]');
												casper.then(function() {
													test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
												});
											}catch(e) {
												test.assertExists('i.glyphicon.glyphicon-like-alt');
												this.click('i.glyphicon.glyphicon-like-alt');
												test.assertExists('a[href^="#likes-modal"]');
												this.click('a[href^="#likes-modal"]');
												test.assertExists('a[href^="/profile/'+id+'"]');
												this.click('a[href^="/profile/'+id+'"]');
												casper.then(function() {
													test.assertDoesntExist('div.text-center.bmessage.alert-info.text-danger');
												});
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
		casper.echo('                                      CASE 8', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FUNCTIONALITY OF REPUTATION WHEN LIKED POST OF ANY OTHER USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hsk', 'hsk', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.click('i.icon.icon-menu');
								test.assertExists('a[href="/latest"]');
								this.click('a[href="/latest"]');
								casper.waitForSelector('span.topic-content p.text-muted.preview-text a', function success() {
									this.click('span.topic-content p.text-muted.preview-text a');
									casper.waitForSelector('li.reputation span.profile-count', function success() {
										var profileCount = this.fetchText('li.reputation span.profile-count');	
										this.echo('reputaions before like : '+profileCount, 'INFO');
										test.assertExists('a i.glyphicon.glyphicon-like-alt');
										this.click('a i.glyphicon.glyphicon-like-alt');
										casper.wait(5000, function() {
											this.reload();
											casper.waitForSelector('li.reputation span.profile-count', function success() {
												var profileCount = this.fetchText('li.reputation span.profile-count');	
												this.echo('reputaions after like : '+profileCount, 'INFO');
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
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
		casper.echo('                                      CASE 9', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FUNCTIONALITY OF REPUTATION WHEN DISLIKED POST OF ANY OTHER USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hsk', 'hsk', casper, function(err) {
						if(!err) {
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.click('i.icon.icon-menu');
								test.assertExists('a[href="/latest"]');
								this.click('a[href="/latest"]');
								casper.waitForSelector('span.topic-content p.text-muted.preview-text a', function success() {
									this.click('span.topic-content p.text-muted.preview-text a');
									casper.waitForSelector('li.reputation span.profile-count', function success() {
										var profileCount = this.fetchText('li.reputation span.profile-count');	
										this.echo('reputaions before dislike : '+profileCount, 'INFO');
										test.assertExists('a i.glyphicon.glyphicon-dislike-alt');
										this.click('a i.glyphicon.glyphicon-dislike-alt');
										casper.wait(5000, function() {
											this.reload();
											casper.waitForSelector('li.reputation span.profile-count', function success() {
												var profileCount = this.fetchText('li.reputation span.profile-count');	
												this.echo('reputaions after dislike : '+profileCount, 'INFO');
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
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
		casper.echo('                                      CASE 10', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FUNCTIONALITY OF REPUTATION WHEN DISABLED FROM BACKEND', 'INFO');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
					this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
					casper.waitForSelector('#reputation', function success() {
						utils.enableorDisableCheckbox('reputation', false, casper, function() {
							casper.echo('checkbox is unchecked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							casper.waitForSelector('font[color="red"]', function success() {
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								if(successMsg && successMsg!= '')
									verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}	
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
	
	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hsk', 'hsk', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.click('i.icon.icon-menu');
								test.assertExists('a[href="/latest"]');
								this.click('a[href="/latest"]');
								casper.waitForSelector('span.topic-content p.text-muted.preview-text a', function success() {
									this.click('span.topic-content p.text-muted.preview-text a');
									casper.then(function() {
										test.assertDoesntExist('div.pull-left.profile-menu li.reputation');
										this.echo("Reputation link not found on user's Profile", 'INFO');
										test.assertDoesntExist('i.glyphicon.glyphicon-like-alt');
										this.echo("thums up link not found on user's Profile", 'INFO');
										this.echo("test case verified when likes & reputations disabled from back-end", 'INFO');
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
	
	//Open Back-End URL And Get Title
	casper.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
					this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
					casper.waitForSelector('#reputation', function success() {
						utils.enableorDisableCheckbox('reputation', true, casper, function() {
							casper.echo('checkbox is checked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							casper.waitForSelector('font[color="red"]', function success() {
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								if(successMsg && successMsg!= '')
									verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}	
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
		casper.echo('TO VERIFY THE COUNTER OF THUMPS UP', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hsk', 'hsk', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.click('i.icon.icon-menu');
								test.assertExists('a[href="/latest"]');
								this.click('a[href="/latest"]');
								casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
									this.click('form[name="posts"] a.topic-title');
									casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
										try {
											test.assertExists('a.login_dialog.text-muted.voted-yes');
										}catch(e) {
											this.click('i.glyphicon.glyphicon-like-alt');
										}
										casper.waitForSelector('a[href^="#likes-modal"]', function success() {
											var profileCount = this.fetchText('a[href^="#likes-modal"]');	
											this.echo('count before like : '+profileCount, 'INFO');
											test.assertExists('a i.glyphicon.glyphicon-like-alt');
											this.click('a i.glyphicon.glyphicon-like-alt');
											casper.wait(5000, function() {
												this.reload();
												casper.waitForSelector('a[href^="#likes-modal"]', function success() {
													var profileCount = this.fetchText('a[href^="#likes-modal"]');	
													this.echo('count after like : '+profileCount, 'INFO');
												}, function fail() {
													casper.echo('ERROR OCCURRED', 'ERROR');
												});
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
		casper.echo('                                      CASE 12', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE COUNTER OF THUMPS DOWN', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hsk', 'hsk', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.click('i.icon.icon-menu');
								test.assertExists('a[href="/latest"]');
								this.click('a[href="/latest"]');
								casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
									this.click('form[name="posts"] a.topic-title');
									casper.then(function() {
										try {
											test.assertExists('.voted-no');
											var profileCount = this.fetchText('span.text-muted:nth-child(5)');
											this.echo('count before dislike : '+profileCount, 'INFO');
											test.assertExists('a i.glyphicon.glyphicon-dislike-alt');
											this.click('a i.glyphicon.glyphicon-dislike-alt');
											casper.wait(5000, function() {
												this.reload();
												casper.waitForSelector('span.text-muted:nth-child(5)', function success() {
													var profileCount = this.fetchText('span.text-muted:nth-child(5)');	
													this.echo('count after dislike : '+profileCount, 'INFO');
												}, function fail() {
													casper.echo('ERROR OCCURRED', 'ERROR');
												});
											});
										}catch(e) {
											test.assertExists('a i.glyphicon.glyphicon-dislike-alt');
											this.click('a i.glyphicon.glyphicon-dislike-alt');
											var profileCount = this.fetchText('span.text-muted:nth-child(5)');	
											this.echo('count before dislike : '+profileCount, 'INFO');
											test.assertExists('a i.glyphicon.glyphicon-dislike-alt');
											this.click('a i.glyphicon.glyphicon-dislike-alt');
											casper.wait(5000, function() {
												this.reload();
												casper.waitForSelector('span.text-muted:nth-child(5)', function success() {
													test.assertExists('span.text-muted:nth-child(5)');
													var profileCount = this.fetchText('span.text-muted:nth-child(5)');	
													this.echo('count after dislike : '+profileCount, 'INFO');
												}, function fail() {
													casper.echo('ERROR OCCURRED', 'ERROR');
												});
											});
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

	casper.then(function() {
		casper.echo('                                      CASE 13', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE COUNTER OF THUMPS UP TWO TIMES', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hsk', 'hsk', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('i.icon.icon-menu', function success() {
								this.click('i.icon.icon-menu');
								test.assertExists('a[href="/latest"]');
								this.click('a[href="/latest"]');
								casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
									this.click('form[name="posts"] a.topic-title');
									casper.waitForSelector('a[href^="#likes-modal"]', function success() {
										var profileCount = this.fetchText('a[href^="#likes-modal"]');	
										this.echo('count after like : '+profileCount, 'INFO');
										test.assertExists('a i.glyphicon.glyphicon-like-alt');
										this.click('a i.glyphicon.glyphicon-like-alt');
										casper.wait(5000, function() {
											this.reload();
											casper.waitForSelector('a[href^="#likes-modal"]', function success() {
												test.assertExists('a[href^="#likes-modal"]');
												var profileCount = this.fetchText('a[href^="#likes-modal"]');	
												this.echo('count after like : '+profileCount, 'INFO');
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
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

				});
			}else {
				casper.echo('Error : '+err, 'INFO');
			}
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
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('rajatk2', 'rk@123', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('a.default-user', function success() {
								this.click('a.default-user');
								test.assertExists('a[href^="/profile"]');
								this.click('a[href^="/profile"]');
								casper.waitForSelector('li.reputation span.profile-count', function success() {
									var profileCount = this.fetchText('li.reputation span.profile-count');	
									this.echo('reputaions before delete any post : '+profileCount, 'INFO');
									test.assertExists('i.glyphicon.glyphicon-chevron-down');
									this.click('i.glyphicon.glyphicon-chevron-down');
									test.assertExists('i.glyphicon.glyphicon-trash.text-muted.pull-right');
									this.click('i.glyphicon.glyphicon-trash.text-muted.pull-right');
									casper.waitForSelector('li.reputation span.profile-count', function success() {
										var profileCount = this.fetchText('li.reputation span.profile-count');	
										this.echo('reputaions before delete any post : '+profileCount, 'INFO');
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
		casper.echo('                                      CASE 15', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY UNCHECKED USER ACCOUNT FROM BACK-END', 'INFO');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
					this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
					casper.waitForSelector('#REQreg', function success() {
						utils.enableorDisableCheckbox('REQreg', false, casper, function() {
							casper.echo('checkbox is unchecked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							casper.waitForSelector('font[color="red"]', function success() {
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								if(successMsg && successMsg!= '')
									verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}	
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

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('form[name="posts"] a.topic-title', function success() {
					this.click('form[name="posts"] a.topic-title');
					casper.then(function() {
						test.assertDoesntExist('i.glyphicon.glyphicon-like-alt');
						test.assertDoesntExist('i.glyphicon.glyphicon-dislike-alt');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
					this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=General"]');
					casper.waitForSelector('#REQreg', function success() {
						utils.enableorDisableCheckbox('REQreg', true, casper, function() {
							casper.echo('checkbox is unchecked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							casper.waitForSelector('font[color="red"]', function success() {
								var successMsg = this.fetchText('font[color="red"]');
								var expectedSuccessMsg = 'Your user group settings have been updated.';
								if(successMsg && successMsg!= '')
									verifySuccessMsg(successMsg, expectedSuccessMsg, 'UncheckedViewProfile', casper, function() {});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}	
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
		casper.echo('                                      CASE 16', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY USER REPUTATION', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('hsk', 'hsk', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
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

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('rajatk2', 'rk@123', casper, function(err) {
						if(!err) {
							casper.echo('User logged-in successfully', 'INFO');
							casper.waitForSelector('p.text-muted.preview-text a[href^="/profile"]', function success() {
								this.click('p.text-muted.preview-text a[href^="/profile"]');
								casper.waitForSelector('li.reputation span.profile-count', function success() {
									var profileCount = this.fetchText('li.reputation span.profile-count');	
									this.echo('reputaions before like : '+profileCount, 'INFO');
									//test.assertExists('.voted-yes');
									test.assertExists('i.glyphicon.glyphicon-like-alt');
									this.click('i.glyphicon.glyphicon-like-alt');
									casper.wait(3000, function() {
										this.reload();
										casper.waitForSelector('li.reputation span.profile-count', function success() {
											var profileCount = this.fetchText('li.reputation span.profile-count');	
											this.echo('reputaions after like : '+profileCount, 'INFO');
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
								casper.then(function() {
									test.assertExists('li.reputation span.profile-count');
									var profileCount = this.fetchText('li.reputation span.profile-count');	
									this.echo('reputaions before like : '+profileCount, 'INFO');
									//test.assertExists('.voted-yes');
									test.assertExists('i.glyphicon.glyphicon-dislike-alt');
									this.click('i.glyphicon.glyphicon-dislike-alt');
									casper.wait(3000, function() {
										this.reload();
										casper.waitForSelector('li.reputation span.profile-count', function success() {
											var profileCount = this.fetchText('li.reputation span.profile-count');	
											this.echo('reputaions after like : '+profileCount, 'INFO');
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									});
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
		casper.echo('                                      CASE 17', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY LIKE/UNLIKE ICON FOR GUEST USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('span a.topic-title', function success() {
					this.click('span a.topic-title');
					casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
						test.assertExists('i.glyphicon.glyphicon-like-alt');
						test.assertExists('i.glyphicon.glyphicon-dislike-alt');
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
		casper.echo('                                      CASE 18', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY LIKE/UNLIKE ICON FOR GUEST USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('span a.topic-title', function success() {
					this.click('span a.topic-title');
					casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
						this.click('i.glyphicon.glyphicon-like-alt');
						forumLogin.loginToApp('hsk', 'hsk', casper, function(err) {
							if(!err) {
								casper.echo('User logged-in successfully', 'INFO');
								casper.waitForSelector('a.default-user', function success() {
									forumRegister.redirectToLogout(casper, test, function(err) {
										if(!err) {
											casper.waitForSelector('i.glyphicon.glyphicon-dislike-alt', function success() {
												this.click('i.glyphicon.glyphicon-dislike-alt');
												forumLogin.loginToApp('hsk', 'hsk', casper, function() {
													casper.echo('User logged-in successfully', 'INFO');
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
		casper.echo('                                      CASE 19', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FORGOT PASSWORD LINK ON POP UP WINDOW AFTER CLICK ON LIKE FOR GUEST USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('span a.topic-title', function success() {
					this.click('span a.topic-title');
					casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
						this.click('i.glyphicon.glyphicon-like-alt');
						test.assertExists('a[href^="/register/lost_pw"]');
						this.click('a[href^="/register/lost_pw"]');
						casper.waitForSelector('form[name="lost_pw_form"]', function success() {
							test.assertExists('form[name="lost_pw_form"]');
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
		casper.echo('                                      CASE 20', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE FORGOT PASSWORD LINK ON POP UP WINDOW AFTER CLICK ON DISLIKE FOR GUEST USER', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('span a.topic-title', function success() {
					this.click('span a.topic-title');
					casper.waitForSelector('i.glyphicon.glyphicon-dislike-alt', function success() {
						this.click('i.glyphicon.glyphicon-dislike-alt');
						test.assertExists('a[href^="/register/lost_pw"]');
						this.click('a[href^="/register/lost_pw"]');
						casper.waitForSelector('form[name="lost_pw_form"]', function success() {
							test.assertExists('form[name="lost_pw_form"]');
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
		casper.echo('                                      CASE 21', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY CREATE ACCOUNT LINK ON POP UP WINDOW WHEN NEW REGISTRATION IS DISABLED FROM BACKEND', 'INFO');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Security"]');
					this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Security"]');
					casper.waitForSelector('#new_user_registration', function success() {
						utils.enableorDisableCheckbox('new_user_registration', false, casper, function() {
							casper.echo('checkbox is unchecked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							casper.then(function() {
								this.echo('changes are saved successfully', 'INFO');
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}	
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
	
	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('span a.topic-title', function success() {
					this.click('span a.topic-title');
					casper.waitForSelector('i.glyphicon.glyphicon-like-alt', function success() {
						this.click('i.glyphicon.glyphicon-like-alt');
						casper.then(function() {
							test.assertDoesntExist('form[name="PostTopics"]');
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

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('span a.topic-title', function success() {
					this.click('span a.topic-title');
					casper.waitForSelector('i.glyphicon.glyphicon-dislike-alt', function success() {
						this.click('i.glyphicon.glyphicon-dislike-alt');
						casper.then(function() {
							test.assertDoesntExist('form[name="PostTopics"]');
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

	//Login To Forum Back-end 
	casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function(err) {
			if(!err) {
				casper.echo('Logged-in successfully from back-end', 'INFO');
				casper.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
					test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Security"]');
					this.click('div.tooltipMenu.text a[href="/tool/members/mb/settings?tab=Security"]');
					casper.waitForSelector('#new_user_registration', function success() {
						utils.enableorDisableCheckbox('new_user_registration', true, casper, function() {
							casper.echo('checkbox is unchecked', 'INFO');
						});
						try {
							test.assertExists('button.button.btn-m.btn-blue');
							this.click('button.button.btn-m.btn-blue');
							casper.then(function() {
								this.echo('changes are saved successfully', 'INFO');
							});
						}catch(e) {
							test.assertDoesntExist('button.button.btn-m.btn-blue');
						}	
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
		casper.echo('                                      CASE 22', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('TO VERIFY THE LIST OF LIKERS', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	});

	//Open Front-End URL And Get Title
	casper.thenOpen(config.url, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		forumRegister.redirectToLogout(casper, test, function(err) {
			if(!err) {
				casper.waitForSelector('a#td_tab_login', function success() {
					forumLogin.loginToApp('rajatk2', 'rk@123', casper, function() {
						casper.echo('User logged-in successfully', 'INFO');
						casper.waitForSelector('i.icon.icon-menu', function success() {
							this.click('i.icon.icon-menu');
							test.assertExists('a[href="/latest"]');
							this.click('a[href="/latest"]');
							casper.waitForSelector('span h4 a.topic-title', function success() {
								this.click('span h4 a.topic-title');
								casper.waitForSelector('a[href^="#likes-modal"]', function success() {
									this.click('a[href^="#likes-modal"]');
									test.assertExists('div#who_liked_dialog');
									//this.click('div#who_liked_dialog');
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}, function fail() {
								casper.echo('ERROR OCCURRED', 'ERROR');
							});
						}, function fail() {
							casper.echo('ERROR OCCURRED', 'ERROR');
						});
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
	return callback(null);
};

// method for goto New Topic page to application
var gotoNewTopicpage = function(driver, callback) {
	driver.click('i.icon.icon-menu');
	driver.click('a[href^="/latest"]');
	driver.click('a[href="/post/printadd"]');
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
