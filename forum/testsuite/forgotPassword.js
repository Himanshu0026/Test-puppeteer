var casper = require('casper').create({
	verbose : true,
 	logLevel : "debug",
	viewportSize: { width: 1024, height: 768 }
});

var json = require('../testdata/forgotpasswordData.json');
var reusable = require('ReusableFn.js');

casper.start(json['url'], function() {
	this.echo("Title of the page :"+this.getTitle());
});

// verify title of the forgot password page
casper.then(function() {
	console.log("**********************************");
	reusable.verifyForgotPasswordLink(casper, function(){
		console.log("Forgot password link is verified");
	});

});
casper.wait(3000);

casper.then(function() {
/*this.fill('form[name="lost_pw_form"]', {
		'member' : 'username',
		'email' : 'Email@gmail.com'	
	}, true);

//this.click('a[href="/categories"]');	*/


reusable.forgotPassword(json['ForgotPasswordwithUsername'].username, json['ForgotPasswordwithUsername'].email, casper, function() {
	this.capture("ScreenShots/success123.png");
	var ActualResult = casper.fetchText('div[class="text-center bmessage text-danger"]');
	console.log(ActualMessage);

		if(ActualMessage.trim() == json['ForgotPasswordwithUsername'].ExpectedMessage){
			console.log("Reset password mail has been sent");
		}else {
			console.log("Error Occurred");
			this.capture("ScreenShots/ForgotPasswordwithUsername_Error.png");
		}
	});
});

casper.wait(5000, function() {
console.log("*********************************************************************");
this.capture("ScreenShots/success.png");
var ele = this.evaluate(function() {
//return document.querySelector('.text-center.bmessage.text-danger');
 return this.exists('div[class="text-center bmessage text-danger"]');
});
console.log(ele);
//var element = $('div.text-center.bmessage.text-danger');
console.log("Element found*****"+this.exists('div[class="text-center bmessage text-danger"]'));
var ActualResult = this.fetchText('div.text-center.bmessage.text-danger');
	console.log(ActualMessage);
});


casper.run();

