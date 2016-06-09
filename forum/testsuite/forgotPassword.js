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
	verifyForgotPasswordLink(casper, function(){
		console.log("Forgot password link is verified");
	});

});
casper.wait(3000);

/*casper.then(function() {

forgotPassword(json['ForgotPasswordwithUsername'].username, json['ForgotPasswordwithUsername'].email, casper, function() {
	console.log("Successfully sent Reset Password request with valid username only");
	});

this.wait(5000, function() {
	var ActualMessage = casper.fetchText('div.text-center.bmessage');
	var ActualMessage1 = casper.fetchText('div.text-center small');
	ActualMessage = ActualMessage.replace(ActualMessage1, "");
	console.log(ActualMessage.trim());

		if(ActualMessage.trim() == json['ForgotPasswordwithUsername'].ExpectedMessage){
			console.log("Reset password mail has been sent");
			this.click('small a[href="/categories"]');
		}else {
			console.log("Error Occurred");
			this.capture("ScreenShots/ForgotPasswordwithUsername_Error.png");
		}	
	});
});*/

/*casper.then(function() {

forgotPassword(json['invalidInfo'][2], casper, function() {
	console.log("****Submit request with blank data****");
console.log("******"+json['invalidInfo'][2].ExpectedMessage);
	casper.wait(5000, function() {
	var ActualMessage = this.getElementAttribute('form[name="lost_pw_form"] input[name="member"]', 'data-original-title');

console.log("********Actual error message**********"+json['invalidInfo'][2].ExpectedMessage);
	console.log("*******message**** "+ActualMessage);

		if(ActualMessage.trim() == json['invalidInfo'][2].ExpectedMessage){
			console.log("Reset password mail has been sent");
		}else {
			console.log("Error Occurred");
			this.capture("ScreenShots/ForgotPasswordwithUsername_Error.png");
		}	
	});
});


});*/

casper.then(function() {
this.eachThen(json['invalidInfo'], function(response) {
		console.log("=========" +JSON.stringify(response.data)+ "=================" +response.data.username);
	forgotPassword(response.data, casper, function() {
		console.log("Reset request submit with invalid username");
		if(data.response.errorType == "Invalid Username") {
			casper.wait(5000, function() {
				var ActualMessage = casper.fetchText('div.alert.alert-danger');

				if(ActualMessage.trim() == response.data.ExpectedMessage){
					casper.log("Error message in case of invalid username has been verified", "INFO");
				}else {
					casper.log("Error Occurred", "error");
					this.capture("ScreenShots/Error_ForgotPasswordwithinvalidUsername.png");
				}
			});
		  } else if(data.response.errorType == "Invalid Email") {
			casper.wait(5000, function() {
				var ActualMessage = casper.fetchText('div.alert.alert-danger');

				if(ActualMessage.trim() == response.data.ExpectedMessage){
					casper.log("Error message in case of invalid Email has been verified", "info");
				}else {
					casper.log("Error Occurred", "error");
					this.capture("ScreenShots/Error_ForgotPasswordwithinvalidEmail.png");
				}
			});
		  } else if(data.response.errorType == "Blank Username and Password") {
				casper.wait(5000, function() {
				 ActualMessage = this.getElementAttribute('form[name="lost_pw_form"] input[name="member"]', 'data-original-title');

				if(ActualMessage.trim() == response.data.ExpectedMessage){
					casper.log("Error message is verified while submit request with blank username and email", "INFO");
				}else {
					casper.log("Error Occurred", "ERROR");
					this.capture("ScreenShots/Error_ForgotPasswordwithBlankData.png");
				}
			});
		  }else if(data.response.errorType == "Invalid Username and Email") {
			casper.wait(5000, function() {
				var ActualMessage = casper.fetchText('div.alert.alert-danger');

				if(ActualMessage.trim() == response.data.ExpectedMessage){
					console.log("Error message is verified while submitting request with invalid username and email", "INFO");
				}else {
					console.log("Error Occurred", "ERROR");
					this.capture("ScreenShots/Error_ForgotPasswordwithinvalidUsernameandEmail.png");
				}
			});
		  }
		
	     });
       )};
});


//method to forgot password
var forgotPassword = function(username, Email, driver, callback) {
	driver.fill('form[name="lost_pw_form"]', {
		'member' : username,
		'email' : Email	
	}, true);
	return callback();
};

//method to verify forgot password link
var verifyForgotPasswordLink = function(driver, callback) {
	driver.click('#td_tab_login');
	driver.click('#anchor_tab_forget_password');
	driver.wait(7000, function() {
	if(driver.getTitle().indexOf("Lost Your Password?")>=0) {
		console.log("Lost Your Password page is redirected");
	}else{
		console.log("Error occurred on forgot Password");
		driver.capture("ScreenShots/ForgotPasswordError.png");
	}
	});
	return callback();

};



casper.run();

