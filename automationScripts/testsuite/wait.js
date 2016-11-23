
var wait = module.exports = {};

wait.waitForElement = function(element, driver, callback){

	driver.waitForSelector(element, function success() {
		return callback(null, true);
		}, function fail() {
			return callback(null, false);
	});
};



			
