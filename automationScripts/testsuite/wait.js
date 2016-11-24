
var wait = module.exports = {};

wait.waitForElement = function(element, driver, callback){
	driver.waitForSelector(element, function success() {
		return callback(null, true);
	}, function fail() {
		casper.echo('Form Selector Not Found','ERROR');
		return(null, false);
	});
};

