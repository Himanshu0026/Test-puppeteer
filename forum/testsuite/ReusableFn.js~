
// method for login to application
exports.loginToApp = function(username, password, driver,callback) {
driver.click('#td_tab_login');
driver.fill('form[name="frmLogin"]', {
        'member': username,
	'pw' : password
    }, false); //incase of true, it will submit the form and for false, it will not submit form

        driver.click('form[name="frmLogin"] button');
	return callback();
};

// method for click on user's icon
exports.clickOnUserIcon = function(driver,callback) {
	driver.click('.default-user');
	return callback();
};

// method for click on user's edit profile
exports.clickOnEditProfile = function(driver,callback) {
	driver.click('a[href="/register/register?edit=1&userid=24440696"]');
	return callback();
};

// method for click on user's account setting
exports.clickOnAccountSetting = function(driver,callback) {
	driver.click('a[href="/register?action=preferences&userid=24440696"]');
	return callback();
};

//method for logout from application
exports.logoutFromApp = function(driver, callback) {
	driver.click('button.dropdown-toggle span span.username');
	driver.click('#logout');
	return callback();
};

//method to go to new Topic page
exports.gotoNewTopicpage = function(driver, callback) {
	driver.click('#links-nav');
	//driver.wait(3000);
	driver.click('#latest_topics_show');
	driver.click('a[href="/post/printadd"]');
	return callback();
};

exports.postTopicpage = function(title, content, category, driver, callback){
driver.fill('form[name="PostTopic"]',{
		'subject' : title,
		'message' : content
	},false);
	
	driver.click('#post_submit');
	return callback();
};

//method for clicking on register link
exports.clickOnRegisterLink = function(driver, callback) {
	driver.click('.pull-right a');
	return callback();
};

// method for registration to application
exports.registerToApp = function(username, email, password, signature, birthday, driver, callback) {
	//driver.click('#td_tab_login');
	driver.fill('form[action="/register/create_account"]', {
		'member' : username,
		'email': email,
		'pw' : password,
		'signature' : signature,
		'input[name=birthDatepicker]' : birthday
	}, false); 
	//driver.sendKeys('input[name=birthDatepicker]', birthday);
	driver.click('form[action="/register/create_account"] button');
	return callback();
};

// method for editing user's profile page
exports.editToApp = function(usertitle, whoIsRobot, whoAreYou, driver, callback){
	driver.fill('form[action="/register"]', {
			'field102611' : whoAreYou
		}, false); 
		driver.sendKeys('input[id="field102587_1"]', true);
		driver.click('#change_user_title small');
		driver.fill('form[action="/register"]',{
			'usertitle' : usertitle
		},false);
		driver.click('.editable-buttons');
		driver.click('form[action="/register"] button[name="submit"]');
		return callback();
};

//method for editing user's account setting.
exports.editToAccount = function(userName, password, email, driver, callback) {
	driver.click('#change_user_name small');
	driver.fill('form[action="/register"]',{
		'new_username' : userName
	},false);
	driver.click('.editable-buttons');
	return callback();
};


//method to forgot password
exports.forgotPassword = function(username, Email, driver, callback) {
	driver.fill('form[name="lost_pw_form"]', {
		'member' : username,
		'email' : Email	
	}, true);
	return callback();
};

//method to verify forgot password link
exports.verifyForgotPasswordLink = function(driver, callback) {
	driver.click('#td_tab_login');
	driver.click('#anchor_tab_forget_password');
	driver.wait(7000, function() {
	if(driver.getTitle().indexOf("Lost Your Password?")>=0) {
		console.log("Lost Your Password page is redirected");
	}else{
		console.log("Error occurred on forgot Password");
		driver.capture("ScreenShots/ForgotPasswordError.png");
	}
	});
	return callback();

};

