var casper = require('casper').create({
	verbose : true,
 	logLevel : "debug",
	viewportSize: { width: 1024, height: 768 }
});

var json = require('../testdata/topic.json');
var reusable = require('ReusableFn.js');

casper.start(json['url'], function() {
	this.echo("Title of the page :"+this.getTitle());
});

	/****************  LOGIN TO APP  ***********************************/
casper.then(function(){
	reusable.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function(){
		console.log("user has successfully login to application with valid username and password");
	});

});

casper.wait(7000, function() {
	this.capture('Screenshots/login.png');
});

	/****************  GO TO NEW TOPIC PAGE  ***********************************/
casper.then(function(){
	reusable.gotoNewTopicpage(casper,function(){
		console.log("redirect to new topic");
	});
});

casper.wait(7000, function(){
	this.capture('Screenshots/newTopic.png');
});

/****************  POST TOPIC PAGE  ***********************************/
casper.then(function(){console.log("json.title : "+json['newTopic'].title+ " json.content : "+json['newTopic'].content +" json.category : "+json['newTopic'].category);
	reusable.postTopicpage(json['newTopic'].title, json['newTopic'].content, json['newTopic'].category, casper, function(){
		console.log("Topic Posted");
	});
});

casper.wait(7000,function(){
	this.capture("Screenshots/postedTopic.png");
});

/****************  CHECK POST CONTENT  ***********************************/
casper.then(function(){
	reusable.checkPostTopicContent(json['newTopic'].content, casper, function(){
		console.log("content post topic");
	});
});

/****************  LOGOUT  ***********************************/
casper.then(function() {
	reusable.logoutFromApp(casper, function(){
		console.log("Successfully logout from application");
	});
});

casper.wait(7000, function() {
	this.capture('Screenshots/logout.png');
});

casper.run();
