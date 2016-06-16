var utils = module.exports = {};

// method for click on user's edit profile
utils.clickOnElement = function(driver, element, callback) {
	driver.click(element);
	return callback(err, null);
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

	return callback();

};

