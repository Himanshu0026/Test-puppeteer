
//var casper = require('casper').create();

var casper = require('casper').create({
	verbose : true,
 	logLevel : "debug",
	viewportSize: { width: 1024, height: 768 }
});

var json = require('../testdata/logindata.json');
var reusable = require('ReusableFn.js');
require('utils').dump(json);

casper.start(json.url, function() {
	this.echo("Title of the page :"+this.getTitle());
});


casper.then(function(){
	reusable.loginToApp(json.username, json.password, casper, function(){
		console.log("user has successfully login to application with valid username and password");
	});

});

casper.wait(7000, function() {
	this.capture('ScreenShots/login.png');
});

casper.then(function(){
	reusable.gotoNewTopicpage(casper,function(){
		console.log("redirect to new topic");
	});
});

casper.wait(7000, function(){
	this.capture('ScreenShots/newTopic.png');
});

casper.then(function(){console.log("===================json.title : "+json.title+ " json.content : "+json.content +" json.category : "+json.category);
	reusable.postTopicpage(json.title, json.content, json.category, casper, function(){
		console.log("Topic Posted");
	});
});

casper.wait(7000,function(){
	this.capture("ScreenShots/postedTopic.png");
});

casper.then(function() {
	reusable.logoutFromApp(casper, function(){
		console.log("Successfully logout from application");
	});
});

casper.wait(7000, function() {
	this.capture('Screenshots/logout.png');
});

casper.run();
