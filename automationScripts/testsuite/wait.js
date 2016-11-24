
var wait = module.exports = {};

wait.waitForElement = function(element, driver, callback){
	driver.waitForSelector(element, function success() {
		driver.echo('Selector ' +element+ ' Found', 'INFO');
		return callback(null, true);
		}, function fail() {
			driver.echo('Selector ' +element+ ' Not Found', 'ERROR');
			return(null, false);
	});
};


wait.waitForTime = function(time , driver, callback){
	driver.wait(time,function(){
		driver.echo('Finished wait for '+ time +' ms','INFO');
		return callback(null);		
	});
};

wait.waitForVisible = function(element, driver, callback){
	driver.waitUntilVisible(element, function success(){
		driver.echo('Selector '+ element  +' appears' ,'INFO');
		return callback(null, true);		
		},function fail(){
			driver.echo('Selector ' + element + ' not appears', 'ERROR');
			return callback(null, false);	
	});
};

