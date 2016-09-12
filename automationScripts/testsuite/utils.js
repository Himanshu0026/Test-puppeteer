var utils = module.exports = {};

// method for click on user's edit profile
utils.clickOnElement = function(driver, element, callback) {
	driver.click(element);
	return callback(null);
};


//pass the id of the element in element parameter and for status true or false
utils.enableorDisableCheckbox = function(element, status, driver, callback){

	var checkbox_value = driver.evaluate(function (element) {
	      return document.getElementById(element).checked;
	}, element);
		if (checkbox_value) {
			if (checkbox_value != status) {
				driver.click('#'+element);
			}
		} else {
			if (status) {
				driver.click('#'+element);
			}
		}

	return callback(null);

};

/*function to go to user group permission for any user type in backend by sending parameter for xpath as x and user type as "Registered Users" and also need to initialize for xpath in mainTest.js file inside the particular feature*/
utils.gotoEditUserGroupPermissionpage = function(x,userType, driver, callback) {
	driver.waitForSelector('a[data-tooltip-elm="ddUsers"]', function(){
		this.click('a[data-tooltip-elm="ddUsers"]');
			
	});
	driver.waitForSelector('a[href="/tool/members/mb/usergroup"]', function(){
		this.click('a[href="/tool/members/mb/usergroup"]');
			
	});

	driver.waitForSelector(x('//td[text()="'+userType+'"]/following::td[2]/a'), function(){
		this.click(x('//td[text()="'+userType+'"]/following::td[2]/a'));
		casper.echo("***inner text*** : "+this.fetchText(x('//td[text()="'+userType+'"]/following::td[2]/a')));
		this.wait(3000, function(){
			this.click(x('//td[text()="'+userType+'"]/parent::tr/td[3]/div/a[1]'));
			casper.echo("** Sublinks ** : "+this.fetchText(x('//td[text()="'+userType+'"]/parent::tr/td[3]/div/a[1]')));	
		});
	});
	return callback(null);
};


