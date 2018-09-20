'use strict.';
var forumLoginMethod = require('../methods/login.js');
var utils = require('../utils.js');
var registerMethod = module.exports = {};

/************************************PRIVATE METHODS***********************************/

//1.Method For Filling Data In Registration Form
registerMethod.registerToApp = function(data) {
	casper.fill('form[name="PostTopic"]', {
		'member' : data.uname,
		'email': data.uemail,
		'pw' : data.upass,
		'name' : data.fullName,
		'name_private' : true,
		'imID' : data.imID,
		'signature' : data.usignature
	}, false);
	casper.test.assertExists('form[name="PostTopic"] input[name="rules_checkbox"]', ' Rules checkbox exists');
	utils.enableorDisableCheckbox('rules_checkbox', true);
	casper.wait(1000,function() {
		casper.test.assertExists('form[name="PostTopic"] button', ' form[name="PostTopic"] button selector exists');
		casper.click('form[name="PostTopic"] button');
	});
};

//2.Logout after registration
registerMethod.redirectToLogout = function() {
	var emailSuccessStartMsg = "Thank you for registering! We sent a verification email to";
	var ExistingUserMsg = "It looks like you already have a forum account! A forum account for that username and email address combination already exists";
	var approvalSuccessMsg = "Thank you for registering! Your account will need to be approved before you have full access to the forums. You will be notified via email once your account has been reviewed.";
	casper.waitForSelector('span.registration_msg', function() {
		this.test.assertExists('div.back-message a:nth-child(1)');
		this.click('div.back-message a:nth-child(1)');
		utils.info('User successfully registered and added in the email verification group');
		this.waitForSelector('ul.nav.pull-right span.caret', function() {
			forumLoginMethod.logoutFromApp();
		});
	}, function() {
			if(this.exists('#errorMsgForSameEmailOrName')){
				utils.info('User already exists on the forum');
			}else {
				this.test.assertExists('ul.nav.pull-right span.caret');
				utils.info('User successfully registered and added registered group');
				forumLoginMethod.logoutFromApp();
			}
	});
};

//3.Method For Multiple Users Registration
registerMethod.registerMultipleUsers = function(usersCount, callback) {
	var users = [];
	var userName;
	for(var i=0; i<usersCount; i++) {
		var name = Math.random().toString(36).substring(7);
		var timestamp = Math.round(new Date().getTime()/1000);
		uname=name+timestamp;
		users.push(uname);
	}
	casper.eachThen(users, function(user) {
		userName = user.data;
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('a[href="/register/register"]', 'Register');
			this.click('a[href="/register/register"]');
		}).waitForSelector('form[name="PostTopic"]', function() {
			this.test.assertSelectorHasText('h2', 'Member Registration');
			this.fill('form[name="PostTopic"]', {
				'member' : userName,
				'email': userName+ '@wt.com',
				'pw' : userName
			}, false);
			this.test.assertExists('form[name="PostTopic"] input[name="rules_checkbox"]');
			utils.enableorDisableCheckbox('rules_checkbox', true);
			this.test.assertExists('form[name="PostTopic"] button');
			this.click('form[name="PostTopic"] button');
		}).waitForSelector('button span.image-wrapper', function() {
			if(this.exists('button span.image-wrapper')) {
				forumLoginMethod.logoutFromApp();
			}
		});
	}).then(function() {
		callback(users);
	});
};

//*************************Method to Register member ************************
registerMethod.registerMember = function(data) {
	casper.thenOpen(config.url, function() {
		try {
			casper.test.assertExists('ul.nav.pull-right span.caret', 'User icon found');
			forumLoginMethod.logoutFromApp();
		} catch (e) {
			utils.info(' No user logged in');
		}
		casper.waitForSelector('li.pull-right a[href="/register/register"]', function() {
			this.test.assertExists('li.pull-right a[href="/register/register"]', 'Register button found');
			this.click('li.pull-right a[href="/register/register"]');
		}).waitForSelector('form[name="PostTopic"] input[name="member"]', function() {
			registerMethod.registerToApp(data, function(err) {
				if(!err) {
					casper.waitForSelector('div.panel-body.table-responsive', function() {
						registerMethod.redirectToLogout(function(err) {
							if(!err) {
								utils.info(' User logout successfully');
							}
						});
					});
				}
			});
		});
	});
};

registerMethod.getUname = function(callback) {
	var username="";
	casper.then(function(){
		var uname = Math.random().toString(36).substring(7);
		var timestamp = Math.round(new Date().getTime()/1000);
		username=uname+timestamp;
	}).then(function(){
		return callback(username);
	});
};
