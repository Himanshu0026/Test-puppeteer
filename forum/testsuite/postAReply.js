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

	/****************  REPLY TOPIC  ***********************************/
casper.then(function(){
	reusable.replyTopic(json['replyTopic'].content, casper, function(){
		console.log('Replied successfully');
	});
});

casper.wait(7000,function(){
	this.capture('Screenshots/replyTopic.png');
});

	/****************  CHECK POSTED REPLY TOPIC  ***********************************/
casper.then(function(){
	reusable.checkPostReply(json['replyTopic'].content, casper, function(){
		console.log("checking reply post");
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
