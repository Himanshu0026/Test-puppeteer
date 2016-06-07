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

	/****************  GO TO POLL PAGE  ***********************************/
casper.then(function(){
	reusable.gotoNewPollpage(casper,function(){
		console.log("redirect to Poll");
	});
});

casper.wait(7000, function(){
	this.capture('Screenshots/newPoll.png');
});

	/****************  POST POLL DATA  ***********************************/
casper.then(function(){
	reusable.savePollPage(json['poll'].pollQues, json['poll'].publicCheckbox, json['poll'].option1, json['poll'].option2, json['poll'].multiple, json['poll'].timeoutFormate, casper, function(){
		console.log("poll posted successfully");
	});
});

/*casper.wait(7000,function(){
	this.capture('Screenshots/savePoll.png');
});*/
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
