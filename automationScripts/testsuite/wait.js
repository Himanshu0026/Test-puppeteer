
var wait = module.exports = {};

wait.waitForElement = function(element, driver, callback){
	driver.waitForSelector(element, function success() {
		casper.echo('Form Selector ' +element+ ' Found', 'INFO');
		return callback(null, true);
	}, function fail() {
		casper.echo('Form Selector ' +element+ ' Not Found', 'ERROR');
		return(null, false);
	});
};

