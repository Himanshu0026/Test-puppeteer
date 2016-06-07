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
	reusable.clickOnRegisterLink(casper, function() {
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
	this.eachThen(json['invalidInfo'], function(response) {
		console.log("=========" +JSON.stringify(response.data)+ "=================" +response.data.uemail);
		reusable.registerToApp(response.data, casper, function() {
			if (response.data.uname == "") {
				var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="member"]', 'data-original-title');
				if(errorMessage == response.data.expectedErrorMsg) {
					casper.echo("**Error message is verified when user try to login with blank username**");
				} else {
					console.log("**Error : Error Message Is Not Correct**");
				}
				casper.capture("Screenshots/Error_RegisterWithBlankUsername.png");
			} else if (response.data.uemail == "") {
				var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
				if(errorMessage == response.data.expectedErrorMsg) {
					casper.echo("**Error message is verified when user try to login with blank email**");
				} else {
					console.log("**Error : Error Message Is Not Correct**");
				}
				casper.capture("Screenshots/Error_RegisterWithBlankEmail.png");
			} else if (response.data.upass == "") {
				var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="pw"]', 'data-original-title');
				if(errorMessage == response.data.expectedErrorMsg) {
					casper.echo("**Error message is verified when user try to login with blank password**");
				} else {
					console.log("**Error : Error Message Is Not Correct**");
				}
				casper.capture("Screenshots/Error_RegisterWithBlankPassword.png");
			} else if (response.data.fullName == "") {
				var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="name"]', 'data-original-title');
				if(errorMessage == response.data.expectedErrorMsg) {
					casper.echo("**Error message is verified when user try to login with blank fullname**");
				} else {
					console.log("**Error : Error Message Is Not Correct**");
				}
				casper.capture("Screenshots/Error_RegisterWithBlankFullName.png");
			} else if (response.data.imID == "") {
				var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="imID"]', 'data-original-title');
				if(errorMessage == response.data.expectedErrorMsg) {
					casper.echo("**Error message is verified when user try to login with blank im-ID**");
				} else {
					console.log("**Error : Error Message Is Not Correct**");
				}
				casper.capture("Screenshots/Error_RegisterWithBlankImID.png");
			} else if (response.data.birthday == "") {
				var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="birthDatepicker"]', 'data-original-title');
				if(errorMessage == response.data.expectedErrorMsg) {
					casper.echo("**Error message is verified when user try to login with blank birth-date**");
				} else {
					console.log("**Error : Error Message Is Not Correct**");
				}
				casper.capture("Screenshots/Error_RegisterWithBlankBirthday.png");
			} else if (response.data.usignature == "") {
				var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="signature"]', 'data-original-title');
				if(errorMessage == response.data.expectedErrorMsg) {
					casper.echo("**Error message is verified when user try to login with blank signature**");
				} else {
					console.log("**Error : Error Message Is Not Correct**");
				}
				casper.capture("Screenshots/Error_RegisterWithBlankSignature.png");
			} else if (response.data.errorType == "existWithName") {console.log("+++++++++existWithName+++++++");
				var errorMessage = casper.getElementAttribute('form[name="PostTopic"] #userAvailStatus', 'data-original-title');
				console.log("========errorMessage===============================" +errorMessage);
				if(errorMessage == response.data.expectedErrorMsg) {
					casper.echo("**Error message is verified when user try to login with existing username**");
				} else {
					console.log("**Error : Error Message Is Not Correct**");
				}
				casper.capture("Screenshots/Error_RegisterWithExistUsername.png");
			} else {
				var errorMessage = casper.getElementAttribute('form[name="PostTopic"] input[name="email"]', 'data-original-title');
				if(errorMessage == response.data.expectedErrorMsg) {
					casper.echo("**Error message is verified when user try to login with invalid email**");
				} else {
					console.log("**Error : Error Message Is Not Correct**");
				}
				casper.capture("Screenshots/Error_RegisterWithInvalidEmail.png");
			}
		});
	});
});   

casper.wait(5000,function(){
	this.capture('Screenshots/register_submit.png');
});


casper.then(function() {
	reusable.registerToApp(json['validInfo'], casper, function() {
		console.log("Successfully registered on forum....");
	});
});

casper.wait(5000,function(){
	this.capture('Screenshots/register_submit.png');
});

casper.then(function() {
	var message = this.fetchText('div.bmessage');
	var successMsg = message.substring(0, message.indexOf('<'));
	var expectedSuccessMsg = json['validInfo'].expectedSuccessMsg;
	if(successMsg.trim() == expectedSuccessMsg.trim()) {
		casper.echo("**Error message is verified when user successfully registered**");
	} else {
		console.log("**Error : Error Message Is Not Correct**");
	}
});

casper.then(function() {
	reusable.backToCategory(casper, function(){
		console.log("Successfully back to category");
	});
});

casper.wait(5000, function() {
	this.capture('Screenshots/backToCategory.png');
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


