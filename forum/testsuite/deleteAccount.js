/****This script is dedicated for deleting user's  account on the forum. It covers testing of delete user's account on account setting page with all defined validations****/
'use strict';
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var json = require('../testdata/editData.json');
var config = require('../config/config.json');

var deleteAccount = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'deleteAccount/';

deleteAccount.featureTest = function(casper, test) {
	
	//Open Forum URL And Get Title 
	casper.start(config.url, function() {
		test.assertTitle('Automation Forum');
		console.log('Title of the page : ' +this.getTitle(), 'info');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['userLogin'].uname, json['userLogin'].upass, casper, function() {
			casper.echo('User logged-in successfully', 'info');
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
			});
		});

	});

	//Clicking On User's Icon To Display User's Drop-down For Editing Profile
	casper.then(function() {
		test.assertExists('.default-user');
		this.click('.default-user');
		this.echo('clicked on users icon successfully', 'info');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'userIcon.png');
		});
	});
	
	//Clicking On 'Edit Profile' link
	casper.then(function() {
		test.assertExists('a[href^="/register/register?edit="]');
		this.click('a[href^="/register/register?edit="]');
		this.echo('clicked on user edit profile link successfully', 'info');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'useredit_form.png');
		});
	});

	//Clicking On User's 'Account Settings' link For Editing User's Account Setting
	casper.then(function() {
		test.assertExists('a[href^="/register?action=preferences&userid="]');
		this.click('a[href^="/register?action=preferences&userid="]');
		this.echo('clicked on users account settings link successfully', 'info');
		casper.wait(5000, function() {
			this.capture(screenShotsDir+ 'userAccountSetting_form.png');
		});
	});
	
	//Deleting User's Account. 
	casper.then(function() {
		test.assertExists('#deleteAccountDialog');
		test.assertExists('#deleteAccount');
		deleteAccount(casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'deletedAccount.png');
				this.log('Account deleted successfully', 'info');
			});
		});
	});

	casper.run(function(){
	test.done();
	test.assert(true);
	});
};

/************************************PRIVATE METHODS***********************************/

//Method For Deleting User's Account

var deleteAccount = function(driver, callback) {
	driver.click('#deleteAccountDialog');
	driver.click('#deleteAccount');
	return callback();
};
