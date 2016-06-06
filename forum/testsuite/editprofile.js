var casper = require('casper').create({
	verbose: true,
	logLevel: "debug",
	viewportSize: {
		width: 1024,
		height: 768
	}
});

var json = require('../testdata/editData.json');
var reusable = require('ReusableFn.js');
require('utils').dump(json);

casper.start(json['URL'], function() {
	this.echo("Title of the page : " +this.getTitle());
});

/*
* user's login
*/

casper.then(function() {
	reusable.loginToApp(json['userLogin'].Uname, json['userLogin'].upass, casper, function() {
		casper.log("successfully login", 'error');
	});
});

casper.wait(5000, function() {
	this.capture('Screenshots/editProfile/loggedIn_user.png');
});

/*
* click on user's icon
*/

casper.then(function() {
	reusable.clickOnUserIcon(casper, function() {
		casper.log("successfully clicked on user's icon", 'error');
	});
});

casper.wait(5000, function() {
	this.capture('Screenshots/editProfile/userIcon.png');
});

/*
* click on user's edit prfile
*/

casper.then(function() {
	reusable.clickOnEditProfile(casper, function() {
		casper.log("successfully clicked on user's edit profile link", 'error');
	});
});

casper.wait(5000, function() {
	this.capture('Screenshots/editProfile/useredit_form.png');
});

/*
* Edit data on user's edit profile
*/  

casper.then(function() {
	//this.echo("ufullName : " +json['userEdit'].ufullName);
	reusable.editToApp(json['userEdit'].usertitle, json['userEdit'].whoIsRobot, json['userEdit'].whoAreYou, casper, function(){
		console.log("values are successfully updated");
	});
});

casper.wait(5000,function(){
    this.capture('Screenshots/editProfile/edit.png');

});

/*
* click on user's account settings
*/

casper.then(function() {
	reusable.clickOnAccountSetting(casper, function() {
		casper.log("successfully clicked on user's account settings link", 'error');
	});
});

casper.wait(5000, function() {
	this.capture('Screenshots/editProfile/userAccountSetting_form.png');
});

/*
* Edit data on user's edit profile account setting.
*/  

casper.then(function() {
	reusable.editToAccount(json['accountEdit'].userName, json['accountEdit'].password, json['accountEdit'].email, casper, function(){
		console.log("values are successfully updated");
	});
});

casper.wait(5000,function(){
    this.capture('Screenshots/editProfile/editAccount.png');

});

/*
* Click On Logout Link
*/

casper.then(function() {
	reusable.logoutFromApp(casper, function(){
		casper.log("Successfully logout from application", 'error');
	});
});

casper.wait(5000, function() {
	this.capture('Screenshots/editProfile/logout.png');
});

casper.run();
