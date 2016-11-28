
var wait = module.exports = {};

wait.waitForElement = function(element, driver, callback){
	driver.waitForSelector(element, function success() {
		driver.echo('Form Selector ' +element+ ' Found', 'INFO');
		return callback(null, true);
	}, function fail() {
		driver.echo('Form Selector ' +element+ ' Not Found', 'ERROR');
		return(null, false);
	});
};

wait.waitForTime = function(time , driver, callback){
	driver.wait(time,function(){
		driver.echo('Finished wait for '+ time +' ms','INFO');
		return callback(null);		
	});
};

