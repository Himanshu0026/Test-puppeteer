// This file includes all methids of wait family
var utils = require('./utils.js');

var wait = module.exports = {};

wait.waitForElement = function(element, callback){
	casper.waitForSelector(element, function success() {
		utils.info(' Selector ' +element+ ' Found');
		return callback(null, true);
	}, function fail() {
		utils.error(' Selector ' +element+ ' Not Found');
		return callback(null, false);
	});
};

wait.waitForTime = function(time , callback){
	casper.wait(time,function(){
		utils.info(' Finished wait for '+ time +' ms');
		return callback(null);
	});
};

wait.waitForVisible = function(element, callback){
	casper.waitUntilVisible(element, function success(){
		utils.info(' Selector '+ element  +' appears');
		return callback(null, true);
	},function fail(){
		utils.error(' Selector ' + element + ' not appears');
		return callback(null, false);
	} ,50000);
};
