
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


//method for logout from application
exports.logoutFromApp = function(driver, callback) {
	driver.click('button.dropdown-toggle');
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
