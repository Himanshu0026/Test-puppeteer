var json = require('../testdata/loginData.json');
var reusable = require('./ReusableFn.js');
var config = require('../config/config.json');

var forumLogin = module.exports = {};

forumLogin.featureTest = function(casper) {
	var screenShotsDir = config.screenShotsLocation + "login/";
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
	});
	
	//**************************************************************************
	casper.then(function(){
		reusable.loginToApp(json['InvalidPassowrd'].username, json['InvalidPassowrd'].password, casper, function(){
			console.log("*****login with valid username and invalid password and verify error message*****");
		});
	});
	casper.wait(5000);
	casper.then(function() {
	this.capture(screenShotsDir + "ErrorOnInvalidPassword.png");
	var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
	this.echo(errorMessage.indexOf(json['InvalidPassowrd'].ExpectedErrorMessage));
	    	this.echo(errorMessage);
		if(errorMessage.indexOf(json['InvalidPassowrd'].ExpectedErrorMessage)>=0){
			this.echo('Error message is verified when user try to login with invalid password');
		}else{
			console.log("Error occurred");
			this.capture(screenShotsDir + "ErrorOnInvalidPassword.png");
		}
	});

	//************************************************************************************

	casper.thenOpen(json['url']);
	casper.then(function(){
		reusable.loginToApp(json['InvalidUsername'].username, json['InvalidUsername'].password, casper, function(){
			console.log("*****login with invalid username and password and verify error message*****");
		});
	});
	casper.wait(5000);
	casper.then(function() {
	var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
		this.echo(errorMessage);
		if(errorMessage.indexOf(json['InvalidUsername'].ExpectedErrorMessage)>=0){
			this.echo('Error message is verified when user try to login with invalid username');
		}else{
			console.log("Error occurred");
			this.capture(screenShotsDir + "Error_ErrorOnInvalidUsername.png");
		}
	});

	//************************************************************************************

	casper.thenOpen(json['url']);
	casper.then(function(){
		reusable.loginToApp(json['BlankField'].username, json['BlankField'].password, casper, function(){
			console.log("*****login by leaving blank username and password and verify error message*****");
		});
	});
	casper.wait(5000);
	casper.then(function() {
	var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
		this.echo(errorMessage);
		if(errorMessage.indexOf(json['BlankField'].ExpectedErrorMessage)>=0){
			this.echo('Error message is verified when user try to login with blank data');
		}else{
			console.log("Error occurred");
			this.capture(screenShotsDir + "Error_LoginwithBlankfield.png");
		}
	});

	//************************************************************************************

	casper.thenOpen(json['url']);
	casper.then(function(){
		reusable.loginToApp(json['BlankPassword'].username, json['BlankPassword'].password, casper, function(){
			console.log("*****login by leaving blank username and password and verify error message*****");
		});
	});
	casper.wait(5000);
	casper.then(function() {
	var errorMessage = this.fetchText('form[name="frmLogin"] [role="alert"]');
		this.echo(errorMessage);
		if(errorMessage.indexOf(json['BlankPassword'].ExpectedErrorMessage)>=0){
			this.echo('Error message is verified when user try to login with blank password');
		}else{
			console.log("Error occurred");
			this.capture(screenShotsDir + "Error_LoginwithBlankPassword.png");
		}
	});

	//**************************************************************************************

	casper.thenOpen(json['url']);
	casper.then(function(){
		reusable.loginToApp(json['ValidCrdential'].username, json['ValidCredential'].password, casper, function(){
			console.log("User has been successfuly login to application");
		});
	});

	casper.then(function() {
		reusable.logoutFromApp(casper, function(){
			console.log("Successfully logout from application");
		});
	});

	//****************************************************************************************

	casper.thenOpen(json['url']);
	casper.then(function(){
		reusable.loginToApp(json['ValidEmail'].username, json['ValidEmail'].password, casper, function(){
			console.log("User has been successfuly login to application");
		});
	});

	casper.then(function() {
		reusable.logoutFromApp(casper, function(){
			console.log("Successfully logout from application");
		});
	});
};



forumLogin.featureTest1 = function(casper) {

};
