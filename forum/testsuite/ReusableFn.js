
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
exports.editToApp = function(fullName, name_private, imType, imID, usertitle, birthday, whoIsRobot, whoAreYou, signature, driver, callback){
	driver.fill('form[action="/register"]', {
			'name' : fullName,
			'name_private' : name_private,
			'field102611' : whoAreYou
		}, false); 
		driver.sendKeys('input[id="field102587_1"]', true);
		driver.sendKeys('input[id="birthDatepicker"]', birthday);
		driver.click('#imType');
		driver.fill('form[action="/register"]',{
			'imType' : imType,
			'imID' : imID
		},false);
		driver.click('#change_user_title small');
		driver.fill('form[action="/register"]',{
			'usertitle' : usertitle
		},false);
		driver.click('.editable-buttons');
		driver.click('#edit_signature small');
		driver.fill('form[action="/register"]',{
			'signature' : signature
		},false);
		//driver.click('.editable-buttons');
		driver.click('form[action="/register"] button[name="submit"]');
		return callback();
};

// method for validating user's edit profile page
exports.validateEditing = function(driver,callback) {
	driver.log('validating', 'error');
	var status = driver.exists('#edit_signature small');
	console.log("=============================" +status);
	return callback();
};
