
var loginWait = module.exports = {};



loginWait.waitElement = function(elementid,driver, callback){
	driver.waitForSelector(elementid, function success() {
		return callback(null,true);
	}, function fail() {
		casper.echo('Form Selector Not Found','ERROR');
		return(null,false);
	});

};

