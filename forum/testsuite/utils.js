var utils = module.exports = {};

// method for click on user's edit profile
utils.clickOnElement = function(driver, element, callback) {
	driver.click(element);
	return callback(err, null);
};

