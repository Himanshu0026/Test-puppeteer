/****This script is dedicated for editing user's profile and account setting on the forum. It covers testing of edit user's profile and account setting page with all defined validations****/
'use strict';
var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var json = require('../testdata/editData.json');
var config = require('../config/config.json');

var editProfile = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'editProfile/';

editProfile.featureTest = function(casper) {
	
	//Open Forum URL And Get Title 
	
	casper.start(config.url, function() {
		this.log('Title of the page : ' +this.getTitle(), 'info');
	});

	//Login To App

	casper.then(function() {
		forumLogin.loginToApp(json['userLogin'].uname, json['userLogin'].upass, casper, function() {
			casper.log('Logged-in successfully', 'info');
		});
		
	});

	//Getting Screenshot After Successfully Logged-In

	casper.wait(5000, function() {
		this.capture(screenShotsDir+ 'loggedIn_user.png');
	});

	//Clicking On User's Icon To Display User's Drop-down For Editing Profile

	casper.then(function() {
		this.click('.default-user');
		this.log('clicked on users icon successfully', 'info');
	});

	//Getting Screenshot After clicking On User's Icon

	casper.wait(5000, function() {
		this.capture(screenShotsDir+ 'userIcon.png');
	});
	
	//Clicking On 'Edit Profile' link

	casper.then(function() {
		this.click('a[href="/register/register?edit=1&userid=4535587"]');
		this.log('clicked on user edit profile link successfully', 'info');
	});

	//Getting Screenshot After Loading Edit Profile Page

	casper.wait(5000, function() {
		this.capture(screenShotsDir+ 'useredit_form.png');
	});
	
	//Edit Blank/Invalid Data On User's Edit Profile Page	 

	casper.then(function() {
		editToApp(json['userEditWithoutData'].birthday, casper, function() {
			casper.log('Mandatory Fields are necessary', 'error');
		});
	});

	//Getting Screenshot After Leaving Input Field Blank In User's Edit Profile Page

	casper.wait(5000,function(){
    		this.capture(screenShotsDir+ 'errorOnEditProfile.png');

	});
	
	//Edit Valid Data On User's Edit Profile Page

	casper.then(function() {
		editToApp(json['userEdit'].birthday, casper, function(){
			casper.log('values are successfully updated', 'info');
		});
	});
	
	//Getting Screenshot After Updated Values In User's Edit Profile Page

	casper.wait(5000,function(){
    		this.capture(screenShotsDir+ 'updatedEditProfile.png');

	});

	//Clicking On User's 'Account Settings' link For Editing User's Account Setting

	casper.then(function() {
		this.click('a[href="/register?action=preferences&userid=4535587"]');
		this.log('clicked on users account settings link successfully', 'info');
	});

	//Getting Screenshot After Loading Account Setting Page

	casper.wait(5000, function() {
		this.capture(screenShotsDir+ 'userAccountSetting_form.png');
	});

	//Editing User's Account Settings Without An Email

	casper.then(function() {
		editAccountSetting(json['editAccountSettingWithoutEmail'].upass, json['editAccountSettingWithoutEmail'].email, casper, function() {
			casper.log('Email address is required', 'error');
		});
	});

	//Getting Screenshot After Leaving Email Field Blank In Account Settings Page

	casper.wait(5000, function() {
		this.capture(screenShotsDir+ 'errorOnBlankEmail.png');
	});
	
	//Editing User's Account Settings With Invalid Email

	casper.then(function() {
		editAccountSetting(json['editAccountSettingWithInvalidEmail'].upass, json['editAccountSettingWithInvalidEmail'].email, casper, function() {
			casper.log('Email address is invalid', 'error');
		});
	});

	//Getting Screenshot After Filling-Up Invalid Email in Account Setting Page

	casper.wait(5000, function() {
		this.capture(screenShotsDir+ 'errorOnInvalidEmail.png');
	});

	//Editing user's Account Setting With Valid Data
	
	casper.then(function() {
		editAccountSetting(json['editAccountSetting'].upass, json['editAccountSetting'].email, casper, function() {
			casper.log('successfully updated account setting', 'info');
		});
	});

	//Getting Screenshot After Filling-Up Values In Account Setting Page
	
	casper.wait(5000, function() {
		this.capture(screenShotsDir+ 'updatedAccountSetting.png');
	});
	
	//Deleting User's Account. 

	casper.then(function() {
		deleteAccount(casper, function() {
			casper.log('Account deleted successfully', 'info');
		});
	});

	//Getting Screenshot After Deletion Of The User

	casper.wait(5000, function() {
		this.capture(screenShotsDir+ 'deletedAccount.png');
	});

	//Clicking On Logout Link

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.log('Successfully logout from forum', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link  

	casper.wait(5000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});
};

/************************************PRIVATE METHODS***********************************/

//Method For Editing User's Edit Profile

var editToApp = function(birthday, driver, callback) {
	driver.sendKeys('input[id="birthDatepicker"]', birthday, {reset:true});
	driver.click('form[action="/register"] button[name="submit"]');
	return callback();
};

//Method For Editing User's Account Settings

var editAccountSetting = function(password, email, driver, callback) {
	driver.click('div#usrPwd .change-value');
	driver.wait(5000, function() {
		this.sendKeys('div.editable-input input[type="password"]', password);
		this.click('div.editable-buttons button[type="submit"]');
		this.click('div#usrEmail .change-value');
		this.wait(5000, function() {
			driver.sendKeys('div.editable-input input[class="form-control input-small"]', email, {reset: true});
			driver.click('div.editable-buttons button[type="submit"]');
			driver.wait(5000, function() {
				// editing preference on the account setting page
				this.click('#option2');
				this.click('#opt1');
				this.click('#INVS', {checked : true});
				this.click('form[action="/register"] button[type="submit"]');			
			});
		});
	});
	return callback();
};

//Method For Deleting User's Account

var deleteAccount = function(driver, callback) {
	driver.click('#deleteAccountDialog');
	driver.click('#deleteAccount');
	return callback();
};
