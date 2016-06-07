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

	/****************  EDIT TOPIC  ***********************************/
casper.then(function(){
	reusable.editTopic(json['editTopic'].content, casper, function(){
		console.log("Topic edited");
	});
});
casper.wait(7000,function(){
	this.capture('Screenshots/editTopic.png');
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
