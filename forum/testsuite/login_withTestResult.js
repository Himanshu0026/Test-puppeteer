
//var casper = require('casper').create();

/*var casper = require('casper').create({
	verbose : true,
 	//logLevel : "debug",
	viewportSize: { width: 1024, height: 768 }
});*/

var json = require('../testdata/loginData.json');
var reusable = require('ReusableFn.js');

casper.test.begin("Verify login functionality with invalid password", function(test) {

casper.start(json['url'], function() {
	this.echo("Title of the page :"+this.getTitle());
});
casper.then(function(){
	reusable.loginToApp(json['InvalidPassowrd'].username, json['InvalidPassowrd'].password, casper, function(){
		console.log("*****login with valid username and invalid password and verify error message*****");
	});
});
casper.wait(5000);
casper.then(function() {
var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
this.echo(errorMessage.indexOf(json['InvalidPassowrd'].ExpectedErrorMessage));
    	this.echo(errorMessage);
	this.test.assert(true, (errorMessage.trim() == json['InvalidPassowrd'].ExpectedErrorMessage));
	console.log('Error message is verified when user try to login with invalid password');
	/*if(errorMessage.indexOf(json['InvalidPassowrd'].ExpectedErrorMessage)>=0){
		this.echo('Error message is verified when user try to login with invalid password');
	}else{
		console.log("Error occurred");
		this.capture("ScreenShots/ErrorOnInvalidPassword.png");
	}*/
});
casper.run(function() {
        test.done();
    });
});

//************************************************************************************
casper.test.begin("Verify login functionality with invalid username", function(test) {
casper.start(json['url']);
casper.then(function(){
	reusable.loginToApp(json['InvalidUsername'].username, json['InvalidUsername'].password, casper, function(){
		console.log("*****login with invalid username and password and verify error message*****");
	});
});
casper.wait(5000);
casper.then(function() {
var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
	this.echo(errorMessage);
	casper.test.assert(errorMessage.trim() == json['InvalidUsername'].ExpectedErrorMessage);
	this.echo('Error message is verified when user try to login with invalid username');
	/*if(errorMessage.indexOf(json['InvalidUsername'].ExpectedErrorMessage)>=0){
		this.echo('Error message is verified when user try to login with invalid username');
	}else{
		console.log("Error occurred");
		this.capture("ScreenShots/Error_ErrorOnInvalidUsername.png");
	}*/
});
casper.run(function() {
        test.done();
	test.assert(true);
    });
});
//************************************************************************************

casper.test.begin("Verify login functionality with blank data", function(test) {
casper.start(json['url']);
casper.then(function(){
	reusable.loginToApp(json['BlankField'].username, json['BlankField'].password, casper, function(){
		console.log("*****login by leaving blank username and password and verify error message*****");
	});
});
casper.wait(5000);
casper.then(function() {
var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
	this.echo(errorMessage);
	casper.test.assert(errorMessage.trim() == json['BlankField'].ExpectedErrorMessage);
	this.echo('Error message is verified when user try to login with blank data');
	/*if(errorMessage.indexOf(json['BlankField'].ExpectedErrorMessage)>=0){
		this.echo('Error message is verified when user try to login with blank data');
	}else{
		console.log("Error occurred");
		this.capture("ScreenShots/Error_LoginwithBlankfield.png");
	}*/
});
casper.run(function() {
        test.done();
	test.assert(true);
    });
});
//************************************************************************************

casper.test.begin("Verify login functionality with blank password", function(test) {
casper.start(json['url']);
casper.then(function(){
	reusable.loginToApp(json['BlankPassword'].username, json['BlankPassword'].password, casper, function(){
		console.log("*****login by leaving blank username and password and verify error message*****");
	});
});
casper.wait(5000);
casper.then(function() {
var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
	this.echo(errorMessage);
	casper.test.assert(errorMessage.trim() == json['BlankPassword'].ExpectedErrorMessage);
	this.echo('Error message is verified when user try to login with blank password');
	/*if(errorMessage.indexOf(json['BlankPassword'].ExpectedErrorMessage)>=0){
		this.echo('Error message is verified when user try to login with blank password');
	}else{
		console.log("Error occurred");
		this.capture("ScreenShots/Error_LoginwithBlankPassword.png");
	}*/
});
casper.run(function() {
        test.done();
	test.assert(true);
    });
});
//**************************************************************************************

casper.test.begin("Verify login functionality with valid username nad password",function(test) {
casper.start(json['url']);
casper.then(function(){
	reusable.loginToApp(json['ValidCredential'].username, json['ValidCredential'].password, casper, function(){
		console.log("User has been successfuly login to application");
	});
});
casper.wait(5000);
casper.then(function() {
	reusable.logoutFromApp(casper, function(){
		console.log("Successfully logout from application");
	});
casper.wait(3000);
});
casper.run(function() {
        test.done();
	test.assert(true);
    });
});
//****************************************************************************************
casper.test.begin("Verify login functionality with valid email and password", function(test) {
casper.start(json['url']);
casper.then(function(){
	reusable.loginToApp(json['ValidEmail'].username, json['ValidEmail'].password, casper, function(){
		casper.echo("User has been successfuly login to application");
	});
});
casper.wait(3000);
casper.then(function() {
	reusable.logoutFromApp(casper, function(){
		casper.echo("Successfully logout from application");
	});
});
casper.run(function() {
        test.done();
	test.assert(true);
    });
});
//****************************************************************************************



