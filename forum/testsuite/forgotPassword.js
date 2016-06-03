var casper = require('casper').create({
	verbose : true,
 	logLevel : "debug",
	viewportSize: { width: 1024, height: 768 }
});

var json = require('../testdata/loginData.json');
var reusable = require('ReusableFn.js');

casper.start(json['url'], function() {
	this.echo("Title of the page :"+this.getTitle());
});

// verify title of the forgot password page
casper.then(function() {

	this.click('#td_tab_login');
	this.click('#anchor_tab_forget_password');
	this.wait(7000, function() {
		console.log(this.getTitle());
	if(this.getTitle().indexOf("Lost Your Password?")>=0) {
		console.log("Lost Your Password page is redirected");
	}else{
		console.log("Error occurred on forgot Password");
		this.capture("ScreenShots/ForgotPasswordError.png");
	}
	});
});

casper.run();

