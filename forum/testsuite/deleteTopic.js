var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var deleteTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + "deleteTopic/";

deleteTopic.featureTest = function(casper) {
		
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
	});

		/****************  LOGIN TO APP  ***********************************/
	casper.then(function(){
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(){
			casper.log("user has successfully login to application with valid username and password");
		});
	});
	casper.wait(7000, function() {
		this.capture(screenShotsDir+'login.png');
	});

		/****************  DELETE TOPIC TOPIC  ***********************************/
	casper.then(function(){
		deleteTopic(casper, function(){
			casper.log("topic deleted");		
		});
	});

	casper.wait(10000,function(){
		this.capture(screenShotsDir+'deletedTopic.png');
	});

		/****************  LOGOUT  ***********************************/
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function(){
			casper.log("Successfully logout from application");
		});
	});
	casper.wait(7000, function() {
		this.capture(screenShotsDir+'logout.png');
	});
};


// method for delete topic 

var deleteTopic = function(driver, callback){
	driver.click('div.panel-body input.entry-checkbox');
	driver.then(function(){
		var topicTitle = driver.fetchText('.topic-title');
		casper.log('++++++++++++++++++++++++++++++++++++topic Title : '+topicTitle);
	});
	driver.then(function(){
		driver.click('a#delete');
	});
	return callback();
};


