// This file is used for testing purpose for editing user's profile and account setting. Screenshots are taken for each step.

var forumLogin = require('./forum_login.js');
var utils = require('./utils.js');
var json = require('../testdata/editData.json');


var config = require('../config/config.json');

var editProfile = module.exports = {};

editProfile.featureTest = function(casper) {
	var screenShotsDir = config.screenShotsLocation + "editProfile/";
	// Staring testing with configured URL
	casper.start(config.url, function() {
		this.echo("Title of the page : " +this.getTitle());
	});

	/*
	* user's login
	*/

	casper.then(function() {
		forumLogin.loginToApp(json['userLogin'].uname, json['userLogin'].upass, casper, function() {
			casper.log("Logged-in successfully", 'info');
		});
		
	});

	// After click on log-in button, this methos is used for taking screenshot after loading the page
	casper.wait(5000, function() {
		this.capture(screenShotsDir+"loggedIn_user.png");
	});

	/*
	* click on user's icon to display pop-up for editing profile
	*/

	casper.then(function() {
		utils.clickOnElement(casper, '.default-user', function() {
			casper.log("clicked on user's icon successfully ", 'info');
		});
	});

	// After click on user's icon, this methos is used for taking screenshot after a given specific time.
	casper.wait(5000, function() {
		this.capture(screenShotsDir+"userIcon.png");
	});

	/*
	* click on user's edit prfile link.
	*/

	casper.then(function() {
		var element = 'a[href="/register/register?edit=1&userid=4533234"]';
		utils.clickOnElement(casper, element, function() {
			casper.log("clicked on user's edit profile link successfully", 'info');
		});
	});

	// After click on edit profile link, this methos is used for taking screenshot after loading the page
	casper.wait(5000, function() {
		this.capture(screenShotsDir+"useredit_form.png");
	});

	/*
	* Edit data on user's edit profile with invalid data. Edit prfile page is changed after 	  implementation. This code is commented for backup.
	*/  

	/*casper.then(function() {
		editToApp(json['userEditWithoutData'].birthday, casper, function(){
			casper.log("Mandatory Fields are necessary", 'error');
		});
	});

	casper.wait(5000,function(){
    		this.capture(screenShotsDir+"errorOnEditProfile.png");

	});*/

	/*
	* Edit data on user's edit profile with valid data
	*/  

	/*casper.then(function() {
		editToApp(json['userEdit'].birthday, casper, function(){
			casper.log("values are successfully updated", 'info');
		});
	});

	casper.wait(5000,function(){
    		this.capture(screenShotsDir+"updatedEditProfile.png");

	});*/

	/*
	* click on user's account settings link for editing user's account setting
	*/

	casper.then(function() {
		var element = 'a[href="/register?action=preferences&userid=4533234"]';
		utils.clickOnElement(casper,element, function() {
			casper.log("clicked on user's account settings linkb successfully", 'info');
		});
	});

	// After click on account setting link, this methos is used for taking screenshot after loading the page
	casper.wait(5000, function() {
		this.capture(screenShotsDir+"userAccountSetting_form.png");
	});

	/*
	* edit user's account settings without email
	*/

	casper.then(function() {
		editProfile.editAccountSetting(json['editAccountSettingWithoutEmail'].upass, json['editAccountSettingWithoutEmail'].email, casper, function() {
			casper.log("Email address is required", 'error');
		});
	});

	// this method is used for taking screenshot after filling-up values in account setting page
	casper.wait(5000, function() {
		this.capture(screenShotsDir+"errorOnBlankEmail.png");
	});

	/*
	* edit user's account settings with invalid email
	*/

	casper.then(function() {
		editProfile.editAccountSetting(json['editAccountSettingWithInvalidEmail'].upass, json['editAccountSettingWithInvalidEmail'].email, casper, function() {
			casper.log("Email address is invalid", 'error');
		});
	});

	// this method is used for taking screenshot after filling-up values in account setting page
	casper.wait(5000, function() {
		this.capture(screenShotsDir+"errorOnInvalidEmail.png");
	});

	/*
	* edit user's account settings with valid data
	*/

	casper.then(function() {
		editProfile.editAccountSetting(json['editAccountSetting'].upass, json['editAccountSetting'].email, casper, function() {
			casper.log("successfully updated account setting", 'info');
		});
	});

	// this method is used for taking screenshot after filling-up values in account setting page
	casper.wait(5000, function() {
		this.capture(screenShotsDir+"updatedAccountSetting.png");
	});

	/*
	* delete user's account. This method is commented because of deletion of account every time
	*/

	/*casper.then(function() {
		deleteAccount(casper, function() {
			casper.log("Account deleted successfully", 'info');
		});
	});

	casper.wait(5000, function() {
		this.capture(screenShotsDir+"deletedAccount.png");
	});*/

	/*
	* Click On Logout Link for log-out
	*/

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(){
			casper.log("Successfully logout from forum", 'info');
		});
	});

	// this method is used for taking screenshot after successfully logged-out from forum
	casper.wait(5000, function() {
		this.capture(screenShotsDir+"logout.png");
	});
};

//***************************************************************************************************

// method definitions are written here 

// method for editing user's profile page
editProfile.editToApp = function(birthday, driver, callback){
	driver.sendKeys('input[id="birthDatepicker"]', birthday);
	driver.click('form[action="/register"] button[name="submit"]');
	return callback();
};

// method for editing user's account setting
editProfile.editAccountSetting = function(password, email, driver, callback) {
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
				driver.click('#option2');
				driver.click('#opt1');
				driver.click('#INVS', {checked : true});
				driver.click('form[action="/register"] button[type="submit"]');			
			});
		});
	});
	return callback();
};

//method for deleting user's account
editProfile.deleteAccount = function(driver, callback) {
	driver.click('#deleteAccountDialog');
	driver.click('#deleteAccount');
	return callback();
};
