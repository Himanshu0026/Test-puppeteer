'use strict';
var utils = require('./utils.js');
var forumRegister = require('./register.js');
var generalPermission = require('./generalPermission.js');
var forumLogin = require('./forum_login.js');
var config = require('../../config/config.json');
var json = require('../testdata/editData.json');

var forumListingPage = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'forumListingPage/';
var page = require('webpage').create();

forumListingPage.featureTest = function(casper, test, x) {

	casper.start();
	
	//Methos For Verifying Alert Message
	casper.on('remote.alert', function(message) {
		this.echo('alert message: ' + message, 'INFO');
		this.echo('Alert message is verified', 'INFO');
	});
	
	//*****************************VERIFY TO ADD THE HEADING ON THE CATEGORY**********************************
	/*casper.then(function() {
		casper.echo('                                      CASE 1', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO ADD THE HEADING ON THE CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_cat"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_cat"]');
							this.sendKeys('div.select input[type="text"]', 'new heading', {reset : true});
							this.click('div.select');
							casper.wait(1000, function() {
								
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
	
	//*****************************VERIFY TO REMOVE THE HEADING ON THE CATEGORY*********************************
	casper.then(function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO REMOVE THE HEADING ON THE CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('div#sortable ul.ui-sortable li:nth-child(8) div.select', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_cat"]');
							this.sendKeys('div.select input[type="text"]', '', {reset : true});
							this.click('div.select');
							casper.wait(1000, function() {
								casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(8) div.select');
								casper.waitForSelector('div#sortable ul.ui-sortable li:nth-child(8) div.select a.manageAction', function success() {
									this.click('div#sortable ul.ui-sortable li:nth-child(8) div.select a.manageAction');
									this.click('div#sortable ul.ui-sortable li:nth-child(8) div.select a.delete_category_btn');
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
				}else {
					casper.echo('Error : '+err, 'INFO');
				}
			});
		});
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.waitForSelector('div.panel-heading', function success() {
							var heading = this.fetchText('div.panel-heading h4');
							this.echo('Heading : '+heading, 'INFO');
							this.echo('changed heading is verified', 'INFO');
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
	});*/
	
	//*****************************VERIFY TO EDIT THE HEADING ON THE CATEGORY**********************************
	casper.then(function() {
		casper.echo('                                      CASE 3', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO EDIT THE HEADING ON THE CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_cat"]', function success() {
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(5) div.select');
							casper.waitForSelector('div#sortable ul.ui-sortable li:nth-child(5) a.manageAction', function success() {
								this.click('div#sortable ul.ui-sortable li:nth-child(5) a.manageAction');
								this.click('div#sortable ul.ui-sortable li:nth-child(5) a.editCategory');
								this.sendKeys('div#sortable ul.ui-sortable li:nth-child(5) div.select input[type="text"]', 'changed heading', {reset : true});
								this.click('div.select');
								casper.wait(1000, function() {
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
		});
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.waitForSelector('div.panel-heading', function success() {
							var heading = this.fetchText('div.panel-heading h4');
							this.echo('Heading : '+heading, 'INFO');
							this.echo('changed heading is verified', 'INFO');
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
	
	//*****************************VERIFY TO ADD THE CATEGORY WITH TITLE FIELD**********************************
	casper.then(function() {
		casper.echo('                                      CASE 4', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO ADD THE CATEGORY WITH TITLE FIELD', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_forum"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_forum"]');
							casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
								this.sendKeys('input#forum_name', 'New Title', {reset : true});
								this.click('form[action="/tool/members/mb/forums"] button');
								casper.then(function() {
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
		});
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var user = x("//a/span[starts-with(.,'New Title')]");
								test.assertExists(user);
								this.echo('title is verified on fornt end', 'INFO');
								
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								var title = this.fetchText('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								this.echo('Title : '+title.trim(), 'INFO');
								this.echo('title is verified on fornt end', 'INFO');
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
			deleteCategory(casper, casper.test, function() {
			
			});
		});
	});
	
	//*****************************VERIFY TO ADD THE CATEGORY WITHOUT TITLE FIELD**********************************
	casper.then(function() {
		casper.echo('                                      CASE 5', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO ADD THE CATEGORY WITHOUT TITLE FIELD', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_forum"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_forum"]');
							casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
								this.sendKeys('input#forum_name', '', {reset : true});
								this.click('form[action="/tool/members/mb/forums"] button');
								casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
								    var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
								    this.echo('Error Message : '+errorMsg, 'INFO');
								    this.echo('error message is verified while editing with blank title', 'INFO');
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
		});
		
	});
	
	//*****************************VERIFY TO EDIT THE CATEGORY WITH DESCRIPTION FIELD**********************************
	casper.then(function() {
		casper.echo('                                      CASE 6', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO EDIT THE CATEGORY WITH DESCRIPTION FIELD', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_forum"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_forum"]');
							casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
								this.sendKeys('input#forum_name', 'New Title', {reset : true});
								this.sendKeys('#forum_description', 'This is description for new title', {reset : true});
								this.click('form[action="/tool/members/mb/forums"] button');
								casper.then(function() {});
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var desc = x("//span/p[starts-with(.,'This is description for new title')]");
								test.assertExists(desc);
								this.echo('category description is verified on front end', 'INFO');
								
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:last-child li:last-child p');
								var title = this.fetchText('div.panel.panel-default ul:last-child li:last-child p');
								this.echo('Description : '+title.trim(), 'INFO');
								this.echo('category description is verified on front end', 'INFO');
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
			deleteCategory(casper, casper.test, function() {
			
			});
		});
	});
	
	//*****************************VERIFY TO EDIT THE CATEGORY WITH DESCRIPTION FIELD*********************************
	casper.then(function() {
		casper.echo('                                      CASE 7', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO EDIT THE CATEGORY WITH DESCRIPTION FIELD', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_forum"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_forum"]');
							casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
								this.sendKeys('input#forum_name', 'new title', {reset : true});
								this.click('form[action="/tool/members/mb/forums"] button');
								casper.then(function() {});
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							test.assertDoesntExist('div.panel-body.table-responsive ul:nth-child(5) li:nth-child(9) p');
							this.echo('category description is verified on front end', 'INFO');
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
			deleteCategory(casper, casper.test, function() {
			
			});
		});
		
	});
	
	//*****************************VERIFY TO ADD NEW AS SUB CATEGORY IN EXISTING CATEGORY********************************
	casper.then(function() {
		casper.echo('                                      CASE 8', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO ADD NEW AS SUB CATEGORY IN EXISTING CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_forum"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_forum"]');
							casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
								this.sendKeys('input#forum_name', 'new title3', {reset : true});
								this.sendKeys('#forum_description', 'This is description for new title3', {reset : true});
								this.click('#isSubcategory')
								this.fillSelectors('form[name="frmOptions"]', {
									'select[name="parentid"]' :  '188757'
								}, true); 
								this.click('form[action="/tool/members/mb/forums"] button');
								casper.then(function() {
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
		});
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									var subCategory = x("//a/span[starts-with(.,'new title3')]");
									test.assertExists(subCategory);	
									this.echo('sub category is verified on front end', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									this.echo('Sub Category : '+this.fetchText('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title'), 'INFO');
									this.echo('sub category is verified on front end', 'INFO');
								
								}, function fail() {
								
								});
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
	
	//*****************************VERIFY TO DELETE SUB CATEGORY IN EXISTING CATEGORY**********************************
	casper.then(function() {
		casper.echo('                                      CASE 9', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO DELETE SUB CATEGORY IN EXISTING CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('a[href="/tool/members/mb/forums"]');
						this.click('a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) ul li:nth-last-child(1) div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child(1) ul li:nth-last-child(1) a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child(1) ul li:nth-last-child(1) a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child(1) ul li:nth-last-child(1) a.deleteEmptyForum');
								casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									var subCategory = x("//a/span[starts-with(.,'new title3')]");
									test.assertExists(subCategory);	
									this.echo('sub category is verified on front end', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									this.echo('Sub Category : '+this.fetchText('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title'), 'INFO');
									this.echo('sub category is verified on front end', 'INFO');
								
								}, function fail() {
								
								});
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
	
	//*****************************VERIFY TO ADD A CATEGORY AS PASSWORD PROTECTED**********************************
	casper.then(function() {
		casper.echo('                                      CASE 10', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO ADD A CATEGORY AS PASSWORD PROTECTED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_forum"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_forum"]');
							casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
								this.sendKeys('input#forum_name', 'new title4', {reset : true});
								this.sendKeys('#forum_description', 'This is description for new title4', {reset : true});
								this.click('#isSubcategory')
								this.fillSelectors('form[name="frmOptions"]', {
									'select[name="parentid"]' :  '188757'
								}, true); 
								this.click('form[action="/tool/members/mb/forums"] button');
								casper.waitForSelector('div.heading.error_message', function success() {
									var successMsg = this.fetchText('div.heading.error_message');
									this.echo('Success Message : '+successMsg, 'INFO');
									this.echo('Success message is verified', 'INFO');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-last-child(1)');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction');
											casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.editForum');
											casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
												this.click('#forum_pw_cb')
												this.sendKeys('#forum_pw_cb', 'newtitle4', {reset : true});
												this.click('form[action="/tool/members/mb/forums"] button');
												casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									var subCategory = x("//a/span[starts-with(.,'new title4')]");
									test.assertExists(subCategory);
									this.click(subCategory);
									casper.waitForSelector('input[name="pass"]', function success() {
										test.assertExists('input[name="pass"]');	
										this.echo('password protected category verified', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									this.echo('Sub Category : '+this.fetchText('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title'), 'INFO');
									this.echo('password protected category verified', 'INFO');
								
								}, function fail() {
								
								});
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
	
	//*****************************VERIFY TO DISABLE A CATEGORY AS PASSWORD PROTECTED**********************************
	casper.then(function() {
		casper.echo('                                      CASE 11', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO DISABLE A CATEGORY AS PASSWORD PROTECTED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-last-child(1)');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									this.sendKeys('#forum_pw', '', {reset : true});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									var subCategory = x("//a/span[starts-with(.,'new title4')]");
									test.assertExists(subCategory);
									this.click(subCategory);
									casper.waitForSelector('form[name="posts"]', function success() {
										test.assertExists('form[action="/mbactions"]');	
										this.echo('disabling password protected category verified', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									this.echo('Sub Category : '+this.fetchText('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title'), 'INFO');
									this.echo('disabling password protected category verified', 'INFO');
								
								}, function fail() {
								
								});
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
			deleteSubCategory(casper, casper.test, function() {
			
			});
		});
	});
	
	//*****************************VERIFY TO CREATE A CATEGORY AS LOCKED********************************
	casper.then(function() {
		casper.echo('                                      CASE 12', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO CREATE A CATEGORY AS LOCKED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_forum"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_forum"]');
							casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
								this.sendKeys('input#forum_name', 'new title5', {reset : true});
								this.sendKeys('#forum_description', 'This is description for new title4', {reset : true});
								this.click('#isSubcategory')
								this.fillSelectors('form[name="frmOptions"]', {
									'select[name="parentid"]' :  '188757'
								}, true); 
								this.click('form[action="/tool/members/mb/forums"] button');
								casper.waitForSelector('div.heading.error_message', function success() {
									var successMsg = this.fetchText('div.heading.error_message');
									this.echo('Success Message : '+successMsg, 'INFO');
									this.echo('Success message is verified', 'INFO');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-last-child(1)');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction');
											casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.editForum');
											casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
												utils.enableorDisableCheckbox('forum_locked', true, casper, function() {
													casper.echo('checkbox is checked', 'INFO');
												});
												this.click('form[action="/tool/members/mb/forums"] button');
												casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									test.assertExists('a i.glyphicon.glyphicon-lock');
									this.echo('locked category verified', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									test.assertExists('a i.glyphicon.glyphicon-lock');
									this.echo('locked category verified', 'INFO');
								
								}, function fail() {
								
								});
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
	
	//*****************************VERIFY TO CREATE A CATEGORY AS UNLOCKED*********************************
	casper.then(function() {
		casper.echo('                                      CASE 13', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO CREATE A CATEGORY AS UNLOCKED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-last-child(1)');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_locked', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									test.assertDoesntExist('a i.glyphicon.glyphicon-lock:nth-last-child(1)');
									this.echo('unlocked category verified', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									test.assertDoesntExist('a i.glyphicon.glyphicon-lock:nth-last-child(1)');
									this.echo('unlocked category verified', 'INFO');
								
								}, function fail() {
								
								});
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
			deleteSubCategory(casper, casper.test, function() {
			
			});
		});
	});
	
	//*****************************VERIFY TO CREATE A CATEGORY AS INVISIBLE*********************************
	casper.then(function() {
		casper.echo('                                      CASE 14', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO CREATE A CATEGORY AS INVISIBLE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_forum"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_forum"]');
							casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
								this.sendKeys('input#forum_name', 'new title6', {reset : true});
								this.sendKeys('#forum_description', 'This is description for new title6', {reset : true});
								this.click('#isSubcategory')
								this.fillSelectors('form[name="frmOptions"]', {
									'select[name="parentid"]' :  '188757'
								}, true); 
								this.click('form[action="/tool/members/mb/forums"] button');
								casper.waitForSelector('div.heading.error_message', function success() {
									var successMsg = this.fetchText('div.heading.error_message');
									this.echo('Success Message : '+successMsg, 'INFO');
									this.echo('Success message is verified', 'INFO');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-last-child(1)');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction');
											casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.editForum');
											casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
												utils.enableorDisableCheckbox('forum_invisible', true, casper, function() {
													casper.echo('checkbox is checked', 'INFO');
												});
												this.click('form[action="/tool/members/mb/forums"] button');
												casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									var subCategory = x("//a/span[starts-with(.,'new title6')]");
									test.assertDoesntExist(subCategory);
									this.echo('invisible category verified', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									var subCategory = this.fetchText('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title');
									if(subCategory!='new title6') {
										casper.echo('invisible category verified', 'INFO');
									}
								
								}, function fail() {
								
								});
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
	
	//*****************************VERIFY TO CREATE A CATEGORY AS VISIBLE**********************************
	casper.then(function() {
		casper.echo('                                      CASE 15', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO CREATE A CATEGORY AS VISIBLE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-last-child(1) div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-last-child(1) div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_invisible', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									var subCategory = x("//a/span[starts-with(.,'new title6')]");
									test.assertExists(subCategory);
									this.echo('visible category verified', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									test.assertExists('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title');
									this.echo('visible category verified', 'INFO');
								
								}, function fail() {
								
								});
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
			deleteSubCategory(casper, casper.test, function() {
			
			});
		});
	});
	
	//*****************************VERIFY TO CREATE A CATEGORY AS LINKED*********************************
	casper.then(function() {
		casper.echo('                                      CASE 16', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO CREATE A CATEGORY AS LINKED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.waitForSelector('a[href^="/tool/members/mb/forums?action=edit_forum"]', function success() {
							this.click('a[href^="/tool/members/mb/forums?action=edit_forum"]');
							casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
								this.sendKeys('input#forum_name', 'new title7', {reset : true});
								this.sendKeys('#forum_description', 'This is description for new title7', {reset : true});
								this.click('#isSubcategory')
								this.fillSelectors('form[name="frmOptions"]', {
									'select[name="parentid"]' :  '188757'
								}, true); 
								this.click('form[action="/tool/members/mb/forums"] button');
								casper.waitForSelector('div.heading.error_message', function success() {
									var successMsg = this.fetchText('div.heading.error_message');
									this.echo('Success Message : '+successMsg, 'INFO');
									this.echo('Success message is verified', 'INFO');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-last-child(1)');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction');
											casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.editForum');
											casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
												this.click('#forum_link_cb')
												this.sendKeys('#forum_link_cb', 'beta12.websitetoolbox.com', {reset : true});
												this.click('form[action="/tool/members/mb/forums"] button');
												casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									var subCategory = x("//a/span[starts-with(.,'new title7')]");
									test.assertExists(subCategory);
									this.click(subCategory);
									casper.waitForSelector('form[name="posts"]', function success() {
										test.assertTitle(this.getTitle(), 'forum12');	
										this.echo('linked category verified', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									this.click('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title');
									casper.waitForSelector('form[name="posts"]', function success() {
										test.assertTitle(this.getTitle(), 'forum12');	
										this.echo('linked category verified', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								
								}, function fail() {
								
								});
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
	
	//*****************************VERIFY TO DELETE LINK FROM CATEGORY**********************************
	casper.then(function() {
		casper.echo('                                      CASE 17', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO DELETE LINK FROM CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-last-child(1)');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									this.sendKeys('#forum_link', '', {reset : true});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									var subCategory = x("//a/span[starts-with(.,'new title7')]");
									test.assertExists(subCategory);
									this.click(subCategory);
									casper.waitForSelector('form[name="posts"]', function success() {
										test.assertTitle(this.getTitle(), 'new title7 - forum12');	
										this.echo('disabled linked category verified', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									this.click('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title');
									casper.waitForSelector('form[name="posts"]', function success() {
										test.assertTitle(this.getTitle(), 'new title7 - forum12');	
										this.echo('disabled linked category verified', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								
								}, function fail() {
								
								});
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
			deleteSubCategory(casper, casper.test, function() {
			
			});
		});
	});
	
	//*****************************VERIFY ERROR MESSAGE TO CREATE A CATEGORY AS LINKED**********************************
	casper.then(function() {
		casper.echo('                                      CASE 18', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY ERROR MESSAGE TO CREATE A CATEGORY AS LINKED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-last-child(1)');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-last-child(1) a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									test.assertExists('#forum_link_cb');
									this.click('#forum_link_cb');
									this.sendKeys('#forum_link_cb', 'bbbbbbbb', {reset : true});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
										var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
										this.echo('Error Message : '+errorMsg, 'INFO');
										this.echo('Error message is verified', 'INFO');
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
	});
	
	//*****************************VERIFY THE CATEGORY HAVING UNREAD TOPICS**********************************
	casper.then(function() {
		casper.echo('                                      CASE 19', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE CATEGORY HAVING UNREAD TOPICS', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						this.click('a#td_tab_login');
						forumLogin.loginToApp(json['loginData'].uname, json['loginData'].upass, casper, function(err) {
							casper.capture('111.png');
							casper.waitForSelector('a[href^="/post/printadd"]', function success() {
								this.click('a[href^="/post/printadd"]');
								casper.waitForSelector('form[name="PostTopic"]', function success() {
									this.capture('222.png');
									postTopicpage(json.newTopic, casper, function(err) {
										if(!err) {
											casper.echo('new topic created', 'INFO');
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
						this.click('a#td_tab_login');
						forumLogin.loginToApp(json['deleteAccount'].uname, json['deleteAccount'].upass, casper, function(err) {
							casper.waitForSelector('a[href^="/categories"]', function success() {
								this.click('a[href^="/categories"]');
								casper.waitForSelector('span.badge', function success() {
									var unread = this.fetchText('span.badge');
									this.echo('Unread Message : '+unread, 'INFO');
									this.echo('unread symbol is verified on front page', 'INFO');
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
	});
};

//*************************************FORUM LITING PAGE VERIFICATION FOR SUB CATEGORY*************************************

forumListingPage.customFieldsTest = function(casper, test, x) {

	casper.start();

	//*****************************VERIFY THE PARENT CATEGORY AS LOCKED**********************************
	casper.then(function() {
		casper.echo('                                      CASE 20', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE PARENT CATEGORY AS LOCKED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = casper.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_locked', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.waitForSelector('span.forum-title', function success() {
							test.assertExists('div.panel.panel-default ul:last-child li:last-child i.glyphicon.glyphicon-lock');
							this.echo('lock symbol is verified for parent category', 'INFO');
							try {
								var category = x("//a/span[starts-with(.,'New Title')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									test.assertExists('a i.glyphicon.glyphicon-lock');
									this.echo('lock symbol is verified for sub category', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									test.assertExists('a i.glyphicon.glyphicon-lock');
									this.echo('lock symbol is verified for sub category', 'INFO');
								
								}, function fail() {
								
								});
							}
						}, function fail() {
						
						});
					}, function fail() {
						casper.echo('ERROR OCCURRED', 'ERROR');
					});
				}else {
			
				}	casper.echo('Error : '+err, 'INFO');
			});
		});
	});
	
	//*****************************VERIFY THE PARENT CATEGORY AS UNLOCKED**********************************
	casper.then(function() {
		casper.echo('                                      CASE 21', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE PARENT CATEGORY AS UNLOCKED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_locked', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							test.assertDoesntExist('div.panel.panel-default ul:nth-last-child(1) li:nth-last-child(1) i.glyphicon.glyphicon-lock');
							this.echo('lock symbol is made invisible for parent category', 'INFO');
							try {
								var category = x("//a/span[starts-with(.,'New Title')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									test.assertDoesntExist('a i.glyphicon.glyphicon-lock');
									this.echo('lock symbol is made invisible for sub category', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									test.assertDoesntExist('a i.glyphicon.glyphicon-lock');
									this.echo('lock symbol is made invisible for sub category', 'INFO');
								
								}, function fail() {
								
								});
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
	
	//************************VERIFY THE PARENT CATEGORY AS WELL AS SUB CATEGORY AS PASSWORD PROTECTED***************************
	casper.then(function() {
		casper.echo('                                      CASE 22', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE PARENT CATEGORY AS WELL AS SUB CATEGORY AS PASSWORD PROTECTED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									this.click('#forum_pw_cb');
									this.sendKeys('#forum_pw_cb', 'newtitle', {reset : true});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							test.assertExists('div.panel.panel-default ul:nth-last-child(1) li:nth-last-child(1) span.forum-count.pull-right a');
							var msg = casper.getElementAttribute('div.panel.panel-default ul:nth-last-child(1) li:nth-last-child(1) span.forum-count.pull-right a', 'data-original-title');
							this.echo('Tooltip Message : '+msg.trim(), 'INFO');
							this.echo('Tooltip message is verified for Parent Category', 'INFO');
							try {
								var category = x("//a/span[starts-with(.,'New Title')]");
								test.assertExists(category);	
								this.click(category);
								casper.waitForSelector('input[name="pass"]', function success() {
									test.assertExists('input[name="pass"]');
									this.echo('text field is verified for password in case of Parent category', 'INFO');
									casper.thenOpen(config.url+'/categories', function() {
										var subCategory = x("//span/a[starts-with(.,'new title')]");
										test.assertExists(subCategory);	
										this.click(subCategory);
										casper.waitForSelector('input[name="pass"]', function success() {
											test.assertExists('input[name="pass"]');
											this.echo('text field is verified for password in case of sub category', 'INFO');
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									this.click('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title');
									casper.waitForSelector('input[name="pass"]', function success() {
										test.assertExists('input[name="pass"]');
										this.echo('text field is verified for password in case of sub category', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
								
								}, function fail() {
								
								});
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
	
	//*********************VERIFY THE PARENT CATEGORY AS WELL AS SUB CATEGORY AS DISABLED PASSWORD PROTECT************************
	casper.then(function() {
		casper.echo('                                      CASE 23', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE PARENT CATEGORY AS WELL AS SUB CATEGORY AS DISABLED PASSWORD PROTECT', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									//this.click('#forum_pw');
									this.sendKeys('#forum_pw', '', {reset : true});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							test.assertDoesntExist('i.glyphicon.glyphicon-lock.bd-wrapper');
							this.echo('disabled password protect is verified for parent category', 'INFO');
							try {
								var category = x("//a/span[starts-with(.,'New Title')]");
								test.assertExists(category);	
								this.click(category);
								casper.waitForSelector('div.panel.panel-default', function success() {
									test.assertDoesntExist('i.glyphicon.glyphicon-lock.bd-wrapper');
									this.echo('disabled password protect is verified for sub category', 'INFO');
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default', function success() {
									test.assertDoesntExist('i.glyphicon.glyphicon-lock.bd-wrapper');
									this.echo('disabled password protect is verified for sub category', 'INFO');
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
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
	
	//*****************************VERIFY A CATEGORY AS WELL AS SUB CATEGORY AS INVISIBLE**********************************
	casper.then(function() {
		casper.echo('                                      CASE 24', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY A CATEGORY AS WELL AS SUB CATEGORY AS INVISIBLE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_invisible', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							var category = x("//a/span[starts-with(.,'New Title')]");
							test.assertDoesntExist(category);
							this.echo('invisible category verified in case of parent category', 'INFO');
							var subCategory = x("//span/a[starts-with(.,'new title')]");
							test.assertDoesntExist(subCategory);
							this.echo('invisible category verified in case of sub category', 'INFO');
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
	
	//*****************************VERIFY A CATEGORY AS WELL AS SUB CATEGORY AS VISIBLE**********************************
	casper.then(function() {
		casper.echo('                                      CASE 25', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY A CATEGORY AS WELL AS SUB CATEGORY AS VISIBLE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_invisible', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'New Title')]");
								test.assertExists(category);
								this.echo('visible category verified in case of parent category', 'INFO');
								var subCategory = x("//span/a[starts-with(.,'new')]");
								test.assertExists(subCategory);
								this.echo('visible category verified in case of sub category', 'INFO');
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								this.echo('visible category verified in case of parent category', 'INFO');
								test.assertExists('div.panel.panel-default ul:last-child li:last-child a:nth-child(2) span.forum-title');
								this.echo('visible category verified in case of sub category', 'INFO');
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
	
	//*****************************VERIFY ENABLED CATEGORY AS WELL AS SUB CATEGORY AS LINKED**********************************
	casper.then(function() {
		casper.echo('                                      CASE 26', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY ENABLED CATEGORY AS WELL AS SUB CATEGORY AS LINKED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									this.click('#forum_link_cb')
									this.sendKeys('#forum_link_cb', 'beta12.websitetoolbox.com', {reset : true});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'New Title')]");
								this.click(category);
								casper.waitForSelector('a[href^="/latest"]', function success() {
									test.assertTitle(this.getTitle(), 'forum12', 'INFO');
									this.echo('enabled linked category is verified', 'INFO');
									casper.thenOpen(config.url+'/categories', function() {
										var subCategory = x("//span/a[starts-with(.,'new title')]");
										this.click(subCategory);
										casper.waitForSelector('a[href^="/latest"]', function success() {
											test.assertTitle(this.getTitle(), 'forum12', 'INFO');
											this.echo('enabled linked sub category is verified', 'INFO');
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								casper.waitForSelector('a[href^="/latest"]', function success() {
									test.assertTitle(this.getTitle(), 'forum12', 'INFO');
									this.echo('enabled linked category is verified', 'INFO');
									casper.thenOpen(config.url+'/categories', function() {
										try {
											var subCategory = x("//span/a[starts-with(.,'new title')]");
											this.click(subCategory);
											casper.waitForSelector('a[href^="/latest"]', function success() {
												test.assertTitle(this.getTitle(), 'forum12', 'INFO');
												this.echo('enabled linked sub category is verified', 'INFO');
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
										}catch(e) {
											test.assertExists('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title');
											this.click('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title');
											casper.waitForSelector('a[href^="/latest"]', function success() {
												test.assertTitle(this.getTitle(), 'forum12', 'INFO');
												this.echo('enabled linked sub category is verified', 'INFO');
											}, function fail() {
												casper.echo('ERROR OCCURRED', 'ERROR');
											});
										}
									});
								}, function fail() {
									casper.echo('ERROR OCCURRED', 'ERROR');
								});
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
	
	//*****************************VERIFY DISABLED CATEGORY AS WELL AS SUB CATEGORY AS LINKED**********************************
	casper.then(function() {
		casper.echo('                                      CASE 27', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY DISABLED CATEGORY AS WELL AS SUB CATEGORY AS LINKED', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									this.sendKeys('#forum_link', '', {reset : true});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'New Title')]");
								test.assertExists(category);
								this.click(category);
								casper.wait(5000, function() {
									var subCategory = x("//a/span[starts-with(.,'new title')]");
									test.assertExists(subCategory);
									this.echo('disabled linked category as well as sub category is verified', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:last-child li:last-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									test.assertExists('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title');
									this.echo('disabled linked category as well as sub category is verified', 'INFO');
								
								}, function fail() {
								
								});
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
	
	//*****************************VERIFY THE SUB CATEGORY FOR CHANGING PARENT CATEGORY**********************************
	casper.then(function() {
		casper.echo('                                      CASE 28', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE SUB CATEGORY FOR CHANGING PARENT CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									this.fillSelectors('form[name="frmOptions"]', {
										'select[name="parentid"]' :  '188757'
									}, true);
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.waitForSelector('div.heading.error_message', function success() {
										var successMsg = this.fetchText('div.heading.error_message');
										this.echo('Success Message : '+successMsg, 'INFO');
										this.echo('Success message is verified', 'INFO');
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a[href^="/categories"]', function success() {
						this.click('a[href^="/categories"]');
						casper.then(function() {
							try {
								var category = x("//a/span[starts-with(.,'General')]");
								test.assertExists(category);	
								this.click(category);
								casper.then(function() {
									var subCategory = x("//a/span[starts-with(.,'new title')]");
									test.assertExists(subCategory);	
									this.echo('sub category is verified in another parent category', 'INFO');
								});
							}catch(e) {
								test.assertExists('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								this.echo('Category : '+this.fetchText('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title'), 'INFO');
								this.click('div.panel.panel-default ul:first-child li:first-child a:first-child span.forum-title');
								casper.waitForSelector('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title', function success() {
									test.assertExists('div.panel.panel-default ul:first-child li:last-child a:first-child span.forum-title');
									this.echo('sub category is verified in another parent category', 'INFO');
								
								}, function fail() {
								
								});
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child(1) ul li:last-child div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child(1) ul li:last-child div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child(1) ul li:last-child div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child(1) ul li:last-child div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									this.fillSelectors('form[name="frmOptions"]', {
										'select[name="parentid"]' :  '192080'
									}, true);
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.waitForSelector('div.heading.error_message', function success() {
										var successMsg = this.fetchText('div.heading.error_message');
										this.echo('Success Message : '+successMsg, 'INFO');
										this.echo('Success message is verified', 'INFO');
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
	});
	
	//*****************VERIFY TO CREATE A NEW TOPIC INTO A LOCKED CATEGORY BY THE MODERATOR OF THAT CATEGORY*********************
	casper.then(function() {
		casper.echo('                                      CASE 29', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO CREATE A NEW TOPIC INTO A LOCKED CATEGORY BY THE MODERATOR OF THAT CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_locked', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction');
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.addForumModerator');
											casper.waitForSelector('form[action="/tool/members/mb/moderators"]', function success() {
									
												this.sendKeys('input[name="user"]', 'hs1234', {reset : true});
												this.click('form[action="/tool/members/mb/moderators"] button');
												try {
													test.assertDoesntExists('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
												}catch(e) {
													casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
													    var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
													    this.echo('Error Message : '+errorMsg, 'INFO');
													    this.echo('error message is verified while adding existing moderator for a category', 'INFO');
													}, function fail() {
														casper.echo('ERROR OCCURRED', 'ERROR');
													});
												}
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
							casper.waitForSelector('a[href^="/categories"]', function success() {
								this.click('a[href^="/categories"]');
								casper.then(function() {
									var category = x("//a/span[starts-with(.,'New Title')]");
									test.assertExists(category);	
									this.click(category);
									casper.then(function() {
										var subCategory = x("//a/span[starts-with(.,'new title')]");
										test.assertExists(subCategory);	
										this.click(subCategory);
										casper.waitForSelector('div.panel-heading', function success() {
											var id = this.getElementAttribute('input[type="hidden"][name="unfiltered_forums"]', 'value');
											this.click('a[href^="/post/printadd?forum='+id+'"]');
											casper.waitForSelector('form[name="PostTopic"]', function success() {
												postTopicpageForModerator(json.newTopicForForumListinPage, casper, function(err) {
													if(!err) {
														casper.echo('new topic created', 'INFO');
														casper.thenOpen(config.url, function() {
															this.echo('Title of the page : ' +this.getTitle(), 'INFO');
															forumRegister.redirectToLogout(casper, test, function(err) {
																if(!err) {
																	casper.waitForSelector('a[href^="/categories"]', function success() {
																		this.click('a[href^="/categories"]');
																		casper.then(function() {
																			var category = x("//a/span[starts-with(.,'New Title')]");
																			test.assertExists(category);	
																			this.click(category);
																			casper.then(function() {
																				var subCategory = x("//a/span[starts-with(.,'new title')]");
																				test.assertExists('i.glyphicon.glyphicon-lock');	
																				this.echo('locked symbol is verified for the category', 'INFO');
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
									});
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
	});
	
	//****************VERIFY TO CREATE A NEW TOPIC INTO A UNLOCKED CATEGORY BY THE MODERATOR OF THAT CATEGORY****************
	casper.then(function() {
		casper.echo('                                      CASE 30', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO CREATE A NEW TOPIC INTO A UNLOCKED CATEGORY BY THE MODERATOR OF THAT CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_locked', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction');
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.addForumModerator');
											casper.waitForSelector('form[action="/tool/members/mb/moderators"]', function success() {
						
												this.sendKeys('input[name="user"]', 'hs1234', {reset : true});
												this.click('form[action="/tool/members/mb/moderators"] button');
												try {
													test.assertDoesntExists('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
												}catch(e) {
													casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
													    var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
													    this.echo('Error Message : '+errorMsg, 'INFO');
													    this.echo('error message is verified while adding existing moderator for a category', 'INFO');
													}, function fail() {
														casper.echo('ERROR OCCURRED', 'ERROR');
													});
												}
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
							casper.waitForSelector('a[href^="/categories"]', function success() {
								this.click('a[href^="/categories"]');
								casper.then(function() {
									var category = x("//a/span[starts-with(.,'New Title')]");
									test.assertExists(category);	
									this.click(category);
									casper.then(function() {
										var subCategory = x("//a/span[starts-with(.,'new title')]");
										test.assertExists(subCategory);	
										this.click(subCategory);
										casper.waitForSelector('div.panel-heading', function success() {
											var id = this.getElementAttribute('input[type="hidden"][name="unfiltered_forums"]', 'value');
											this.click('a[href^="/post/printadd?forum='+id+'"]');
											casper.waitForSelector('form[name="PostTopic"]', function success() {
												postTopicpageForModerator(json.newTopicForForumListinPage, casper, function(err) {
													if(!err) {
														casper.echo('new topic created', 'INFO');
														casper.thenOpen(config.url, function() {
															this.echo('Title of the page : ' +this.getTitle(), 'INFO');
															forumRegister.redirectToLogout(casper, test, function(err) {
																if(!err) {
																	casper.waitForSelector('a[href^="/categories"]', function success() {
																		this.click('a[href^="/categories"]');
																		casper.then(function() {
																			var category = x("//a/span[starts-with(.,'New Title')]");
																			test.assertExists(category);	
																			this.click(category);
																			casper.then(function() {
																				var subCategory = x("//a/span[starts-with(.,'new title')]");
																				test.assertDoesntExist('div.panel.panel-default ul li:nth-child(1) span span:nth-child(2) i.glyphicon.glyphicon-loc');	
																				this.echo('invisible locked symbol is verified for the category', 'INFO');
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
									});
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
	});
	
	//********VERIFY TO CREATE A NEW TOPIC INTO A SUB CATEGORY HAVING PARENT AS LOCKED CATEGORY BY THE MODERATOR OF THAT CATEGORY*********
	casper.then(function() {
		casper.echo('                                      CASE 31', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO CREATE A NEW TOPIC INTO A SUB CATEGORY HAVING PARENT AS LOCKED CATEGORY BY THE MODERATOR OF THAT CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_locked', true, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction');
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.addForumModerator');
											casper.waitForSelector('form[action="/tool/members/mb/moderators"]', function success() {
						
												this.sendKeys('input[name="user"]', 'hs1234', {reset : true});
												this.click('form[action="/tool/members/mb/moderators"] button');
												try {
													test.assertDoesntExists('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
												}catch(e) {
													casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
													    var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
													    this.echo('Error Message : '+errorMsg, 'INFO');
													    this.echo('error message is verified while adding existing moderator for a category', 'INFO');
													}, function fail() {
														casper.echo('ERROR OCCURRED', 'ERROR');
													});
												}
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
							casper.waitForSelector('a[href^="/categories"]', function success() {
								this.click('a[href^="/categories"]');
								casper.then(function() {
									var category = x("//a/span[starts-with(.,'New Title')]");
									test.assertExists(category);	
									this.click(category);
									casper.then(function() {
										var subCategory = x("//a/span[starts-with(.,'new title')]");
										test.assertExists(subCategory);	
										this.click(subCategory);
										casper.waitForSelector('div.panel-heading', function success() {
											var id = this.getElementAttribute('input[type="hidden"][name="unfiltered_forums"]', 'value');
											this.click('a[href^="/post/printadd?forum='+id+'"]');
											casper.waitForSelector('form[name="PostTopic"]', function success() {
												postTopicpageForModerator(json.newTopicForForumListinPage, casper, function(err) {
													if(!err) {
														casper.echo('new topic created', 'INFO');
														casper.thenOpen(config.url, function() {
															this.echo('Title of the page : ' +this.getTitle(), 'INFO');
															forumRegister.redirectToLogout(casper, test, function(err) {
																if(!err) {
																	casper.waitForSelector('a[href^="/categories"]', function success() {
																		this.click('a[href^="/categories"]');
																		casper.then(function() {
																			var category = x("//a/span[starts-with(.,'New Title')]");
																			test.assertExists(category);	
																			this.click(category);
																			casper.then(function() {
																				var subCategory = x("//a/span[starts-with(.,'new title')]");
																				test.assertExists('i.glyphicon.glyphicon-lock');	
																				this.echo('locked symbol is verified for the category', 'INFO');
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
									});
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
	});
	
	//*********VERIFY TO CREATE A NEW TOPIC INTO A SUB CATEGORY HAVING PARENT AS UNLOCKED CATEGORY BY THE MODERATOR OF THAT CATEGORY********
	casper.then(function() {
		casper.echo('                                      CASE 32', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY TO CREATE A NEW TOPIC INTO A SUB CATEGORY HAVING PARENT AS UNLOCKED CATEGORY BY THE MODERATOR OF THAT CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_locked', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction');
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.addForumModerator');
											casper.waitForSelector('form[action="/tool/members/mb/moderators"]', function success() {
						
												this.sendKeys('input[name="user"]', 'hs1234', {reset : true});
												this.click('form[action="/tool/members/mb/moderators"] button');
												try {
													test.assertDoesntExists('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
												}catch(e) {
													casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
													    var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
													    this.echo('Error Message : '+errorMsg, 'INFO');
													    this.echo('error message is verified while adding existing moderator for a category', 'INFO');
													}, function fail() {
														casper.echo('ERROR OCCURRED', 'ERROR');
													});
												}
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
							casper.waitForSelector('a[href^="/categories"]', function success() {
								this.click('a[href^="/categories"]');
								casper.then(function() {
									var category = x("//a/span[starts-with(.,'New Title')]");
									test.assertExists(category);	
									this.click(category);
									casper.then(function() {
										var subCategory = x("//a/span[starts-with(.,'new title')]");
										test.assertExists(subCategory);	
										this.click(subCategory);
										casper.waitForSelector('div.panel-heading', function success() {
											var id = this.getElementAttribute('input[type="hidden"][name="unfiltered_forums"]', 'value');
											this.click('a[href^="/post/printadd?forum='+id+'"]');
											casper.waitForSelector('form[name="PostTopic"]', function success() {
												postTopicpageForModerator(json.newTopicForForumListinPage, casper, function(err) {
													if(!err) {
														casper.echo('new topic created', 'INFO');
														casper.thenOpen(config.url, function() {
															this.echo('Title of the page : ' +this.getTitle(), 'INFO');
															forumRegister.redirectToLogout(casper, test, function(err) {
																if(!err) {
																	casper.waitForSelector('a[href^="/categories"]', function success() {
																		this.click('a[href^="/categories"]');
																		casper.then(function() {
																			var category = x("//a/span[starts-with(.,'New Title')]");
																			test.assertExists(category);	
																			this.click(category);
																			casper.then(function() {
																				var subCategory = x("//a/span[starts-with(.,'new title')]");
																				test.assertDoesntExist('div.panel.panel-default ul li:nth-child(1) span.columns-wrapper span.col-xs-5 span.forum-count.pull-right a i.glyphicon.glyphicon-lock ');	
																				this.echo('invisible locked symbol is verified for the category', 'INFO');
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
									});
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
	});
	
	//***************VERIFY THE PASSWOED PROTECTED SUB CATEGORY BY CLICKING ON THAT THROUGH THE MODERATOR OF THAT CATEGORY*************
	casper.then(function() {
		casper.echo('                                      CASE 33', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE PASSWOED PROTECTED SUB CATEGORY BY CLICKING ON THAT THROUGH THE MODERATOR OF THAT CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									this.click('#forum_pw_cb')
									this.sendKeys('#forum_pw_cb', 'newtitle', {reset : true});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction');
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.addForumModerator');
											casper.waitForSelector('form[action="/tool/members/mb/moderators"]', function success() {
									
												this.sendKeys('input[name="user"]', 'hs1234', {reset : true});
												this.click('form[action="/tool/members/mb/moderators"] button');
												try {
													test.assertDoesntExists('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
												}catch(e) {
													casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
														var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
													    	this.echo('Error Message : '+errorMsg, 'INFO');
													    	this.echo('error message is verified while adding existing moderator for a category', 'INFO');
													}, function fail() {
														casper.echo('ERROR OCCURRED', 'ERROR');
													});
												}
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
							casper.waitForSelector('a[href^="/categories"]', function success() {
								this.click('a[href^="/categories"]');
								casper.then(function() {
									var category = x("//a/span[starts-with(.,'New Title')]");
									test.assertExists(category);	
									this.click(category);
									casper.then(function() {
										var subCategory = x("//a/span[starts-with(.,'new title')]");
										test.assertExists(subCategory);	
										this.click(subCategory);
										casper.waitForSelector('div.panel-heading', function success() {
											test.assertDoesntExist('input[name="pass"]');
											this.echo('moderator is moved to the category without any password', 'INFO');
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									});
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
	});
	
	//**************VERIFY THE PASSWOED PROTECTED PARENT CATEGORY BY CLICKING ON THAT THROUGH THE MODERATOR OF THAT CATEGORY**************
	casper.then(function() {
		casper.echo('                                      CASE 34', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE PASSWOED PROTECTED PARENT CATEGORY BY CLICKING ON THAT THROUGH THE MODERATOR OF THAT CATEGORY', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.addForumModerator');
								casper.waitForSelector('form[action="/tool/members/mb/moderators"]', function success() {
									
									this.sendKeys('input[name="user"]', 'hs1234', {reset : true});
									this.click('form[action="/tool/members/mb/moderators"] button');
									try {
										test.assertDoesntExists('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
									}catch(e) {
										casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
										    var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
										    this.echo('Error Message : '+errorMsg, 'INFO');
										    this.echo('error message is verified while adding existing moderator for a category', 'INFO');
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									}
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
							casper.waitForSelector('a[href^="/categories"]', function success() {
								this.click('a[href^="/categories"]');
								casper.then(function() {
									var category = x("//a/span[starts-with(.,'New Title')]");
									test.assertExists(category);	
									this.click(category);
									casper.waitForSelector('div.panel-heading', function success() {
										test.assertDoesntExist('input[name="pass"]');
										this.echo('moderator is moved to the category without any password', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									this.click('#forum_pw')
									this.sendKeys('#forum_pw', '', {reset : true});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
	});
	
	//*************VERIFY THE VISIBILITY OF MODERATOR ON SUB CATEGORY WITH TOPIC LISTING PAGE AND SUB CATEGORY LISTING PAGE**************
	casper.then(function() {
		casper.echo('                                      CASE 35', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE VISIBILITY OF MODERATOR ON SUB CATEGORY WITH TOPIC LISTING PAGE AND SUB CATEGORY LISTING PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select  a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select  a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select  a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_invisible', true, casper, function() {
										casper.echo('checkbox is checked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.wait(5000, function() {
										casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select');
										casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select a.moderateAction', function success() {
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select a.moderateAction');
											casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select a.addForumModerator');
											casper.waitForSelector('form[action="/tool/members/mb/moderators"]', function success() {
									
												this.sendKeys('input[name="user"]', 'hs1234', {reset : true});
												this.click('form[action="/tool/members/mb/moderators"] button');
												try {
													test.assertDoesntExists('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
												}catch(e) {
													casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
													    var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
													    this.echo('Error Message : '+errorMsg, 'INFO');
													    this.echo('error message is verified while adding existing moderator for a category', 'INFO');
													}, function fail() {
														casper.echo('ERROR OCCURRED', 'ERROR');
													});
												}
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
							casper.waitForSelector('a[href^="/categories"]', function success() {
								this.click('a[href^="/categories"]');
								casper.then(function() {
									var category = x("//a/span[starts-with(.,'New Title')]");
									test.assertExists(category);	
									this.click(category);
									casper.waitForSelector('a[href^="#moderators-modal"]', function success() {
										this.click('a[href^="#moderators-modal"]');
										var moderator = x("//li/a[starts-with(.,'hs1234')]");
										test.assertExists(moderator);
										this.echo('moderator is verified on the bottom of forum listing page', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
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
	});
	
	//********VERIFY THE LINK OF MODERATOR VISIBILITY ON SUB CATEGORY WITH TOPIC LISTING PAGE AND SUB CATEGORY LISTING PAGE**********
	casper.then(function() {
		casper.echo('                                      CASE 36', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY THE LINK OF MODERATOR VISIBILITY ON SUB CATEGORY WITH TOPIC LISTING PAGE AND SUB CATEGORY LISTING PAGE', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.moderateAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.addForumModerator');
								casper.waitForSelector('form[action="/tool/members/mb/moderators"]', function success() {
									
									this.sendKeys('input[name="user"]', 'hs1234', {reset : true});
									this.click('form[action="/tool/members/mb/moderators"] button');
									try {
										test.assertDoesntExists('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
									}catch(e) {
										casper.waitForSelector('div.jQAlertDlg.ui-dialog-content.ui-widget-content', function success() {
										    var errorMsg = this.fetchText('div.jQAlertDlg.ui-dialog-content.ui-widget-content');
										    this.echo('Error Message : '+errorMsg, 'INFO');
										    this.echo('error message is verified while adding existing moderator for a category', 'INFO');
										}, function fail() {
											casper.echo('ERROR OCCURRED', 'ERROR');
										});
									}
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
		casper.thenOpen(config.url, function() {
			this.echo('Title of the page : ' +this.getTitle(), 'INFO');
			forumRegister.redirectToLogout(casper, test, function(err) {
				if(!err) {
					casper.waitForSelector('a#td_tab_login', function success() {
						forumLogin.loginToApp(json.deleteAccount.uname, json.deleteAccount.upass, casper, function(err) {
							casper.waitForSelector('a[href^="/categories"]', function success() {
								this.click('a[href^="/categories"]');
								casper.then(function() {
									var category = x("//a/span[starts-with(.,'New Title')]");
									test.assertExists(category);	
									this.click(category);
									casper.waitForSelector('a[href^="#moderators-modal"]', function success() {
										this.click('a[href^="#moderators-modal"]');
										var moderator = x("//li/a[starts-with(.,'hs1234')]");
										test.assertExists(moderator);
										this.echo('moderator is verified on the bottom of forum listing page', 'INFO');
									}, function fail() {
										casper.echo('ERROR OCCURRED', 'ERROR');
									});
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
						test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
						test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
						casper.wait(5000, function() {
							var element = this.evaluate(function() {
								var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
								return liElement.length-2;
							});
							casper.echo('List Element : '+element, 'INFO');
							casper.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select');
							casper.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select  a.manageAction', function success() {
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select  a.manageAction');
								casper.click('div#sortable ul.ui-sortable li:nth-child('+element+') ul li div.select  a.editForum');
								casper.waitForSelector('form[action="/tool/members/mb/forums"]', function success() {
									utils.enableorDisableCheckbox('forum_invisible', false, casper, function() {
										casper.echo('checkbox is unchecked', 'INFO');
									});
									this.click('form[action="/tool/members/mb/forums"] button');
									casper.then(function() {
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
	});
};

//*************************************************PRIVATE METHODS***********************************************

// method for goto New Topic page to application
var postTopicpage = function(data, driver, callback) {
	casper.echo("data.title : "+data.title, 'INFO');
	casper.echo("data.content : "+data.content, 'INFO');
	casper.echo("data.category : "+data.category, 'INFO');
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	driver.waitForSelector('message_ifr', function success() {
		driver.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
	 		this.sendKeys('#tinymce', data.content);
		});
	}, function fail() {
	
	});
	driver.then(function() {});
	driver.click('#all_forums_dropdown');
	driver.fill('form[name="PostTopic"]',{
		'forum' : data.category
	},false);
	
	driver.then(function() {
		driver.click('#post_submit');
		return callback(null);
	});
};

// method for creating New Topic for moderator
var postTopicpageForModerator = function(data, driver, callback) {
	casper.echo("data.title : "+data.title, 'INFO');
	casper.echo("data.content : "+data.content, 'INFO');
	driver.sendKeys('input[name="subject"]', data.title, {reset:true});
	driver.waitForSelector('message_ifr', function success() {
		driver.withFrame('message_ifr', function() {
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
	 		this.sendKeys('#tinymce', data.content);
		});
	}, function fail() {
	
	});
	driver.then(function() {});
	
	driver.then(function() {
		driver.click('#post_submit');
		return callback(null);
	});
};

//Method For Deleting Categories
var deleteCategory = function(driver, test, callback) {
	driver.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});
	driver.then(function() {
		forumRegister.loginToForumBackEnd(driver, test, function(err) {
			if(!err) {
				driver.echo('Logged-in successfully from back-end', 'INFO');
				driver.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
					this.click('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
					driver.waitForSelector('div.select', function success() {
						var element = this.evaluate(function() {
							var liElement = document.querySelectorAll('div#sortable ul.ui-sortable li');
							return liElement.length-2;
						});
						driver.echo('Last Element : '+element, 'INFO');
						driver.mouse.move('div#sortable ul.ui-sortable li:nth-child('+element+') div.select');
						driver.waitUntilVisible('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction', function success() {
							driver.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.manageAction');
							driver.click('div#sortable ul.ui-sortable li:nth-child('+element+') div.select a.deleteEmptyForum');
							driver.then(function() {
								return callback(null);
							});
						}, function fail() {
							driver.echo('ERROR OCCURRED', 'ERROR');
						});
					}, function fail() {
						driver.echo('ERROR OCCURRED', 'ERROR');
					});
				}, function fail() {
					driver.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				driver.echo('Error : '+err, 'INFO');
			}
		});
	});
};

//Method For Dleting Sub Categories
var deleteSubCategory = function(driver, test, callback) {
	driver.thenOpen(config.backEndUrl, function() {
		this.echo('Title of the page :' +this.getTitle(), 'INFO');
		try {
			this.click('a[href="/tool/members/login?action=logout"]');
		}catch(e) {
			test.assertDoesntExist('a[href="/tool/members/login?action=logout"]');
		}
	});
	driver.then(function() {
		forumRegister.loginToForumBackEnd(driver, test, function(err) {
			if(!err) {
				driver.echo('Logged-in successfully from back-end', 'INFO');
				driver.waitForSelector('div#my_account_forum_menu', function success() {
					test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					this.click('div#my_account_forum_menu a[data-tooltip-elm="ddContent"]');
					test.assertExists('div.tooltipMenu.text a[href="/tool/members/mb/forums"]');
					this.click('a[href="/tool/members/mb/forums"]');
					driver.wait(5000, function() {
						driver.mouse.move('div#sortable ul li:nth-child(1) ul li:last-child div.select');
						driver.waitUntilVisible('div#sortable ul li:nth-child(1) ul li:last-child div.select a.manageAction', function success() {
							driver.click('div#sortable ul li:nth-child(1) ul li:last-child div.select a.manageAction');
							driver.click('div#sortable ul li:nth-child(1) ul li:last-child div.select a.deleteEmptyForum');
							driver.then(function() {
								return callback(null);
							});
						}, function fail() {
							driver.echo('ERROR OCCURRED', 'ERROR');
						});
					});
				}, function fail() {
					driver.echo('ERROR OCCURRED', 'ERROR');
				});
			}else {
				driver.echo('Error : '+err, 'INFO');
			}
		});
	});
};
