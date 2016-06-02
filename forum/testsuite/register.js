//var casper = require('casper').create();

var casper = require('casper').create({
	verbose: true,
	logLevel: "debug",
	viewportSize: {
		width: 1024,
		height: 768
	}
});

var json = require('../testdata/registerData.json');
var reusable = require('ReusableFn.js');
require('utils').dump(json);

/*
* Open URL And Get Title
*/ 

casper.start(json['URL'], function() {
	this.echo("Title of the page : " +this.getTitle());
});

/*
* Click On 1st Register Link
*/  

casper.then(function() {
	reusable.clickOnRegisterLink(casper, function(){
		console.log("Successfully open register form.....");
	});
});

casper.wait(5000, function() {
	this.capture('Screenshots/register_form.png');
});

/*
* Fill Data On Registration Form
*/  

casper.then(function() {
	reusable.registerToApp(json['userExists'].uname, json['userExists'].uemail, json['userExists'].upass, json['userExists'].usignature, casper, function(){
		console.log("User has successfully register to application with valid username and password");
	});

});

casper.wait(5000,function(){
    this.capture('Screenshots/register_submit.png');

});

/*
* Click On Logout Link
*/

casper.then(function() {
	reusable.logoutFromApp(casper, function(){
		console.log("Successfully logout from application");
	});
});

casper.wait(5000, function() {
	this.capture('Screenshots/logout.png');
});

casper.run();


