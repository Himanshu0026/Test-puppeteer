var json = require('../testdata/forgotpasswordData.json');
var config = require('../config/config.json');

var forgotpwd = module.exports = {};

forgotpwd.featureTest = function(casper) {
	var screenShotsDir = config.screenShotsLocation + "forgotPwd/";
	casper.start(config.url, function() {
		this.echo("Title of the page :"+this.getTitle());
	});

// verify title of the forgot password page
casper.then(function() {
	forgotpwd.verifyForgotPasswordLink(casper, function(){
		console.log("Forgot password link is verified");
	});

});
casper.wait(3000);

//***********This code has been commented because it is incomplete***********************

//verify success message while submitting request for forgot password with valid data
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
			this.capture(screenShotsDir+"Username_Error.png");
		}	
	});
});*/



//verify forgot password functionality with invalid scenarios and verify error message
casper.then(function() {
this.eachThen(json['invalidInfo'], function(response) {
		console.log("=========" +JSON.stringify(response.data));
	forgotpwd.forgotPassword(response.data, casper, function() {
	var ActualMessage="";
		console.log("********************************************************");
		var responseData = response.data;
		if(responseData.errorType == "Blank Username and Email") {
				//casper.wait(3000, function() {
				 ActualMessage = casper.getElementAttribute('form[name="lost_pw_form"] input[name="member"]', 'data-original-title');
				console.log("******invalid username******"+ActualMessage.trim());
				if(ActualMessage.trim() == responseData.ExpectedMessage){
					casper.log("Error message is verified while submit request with blank username and email", 'info');
				}else {
					casper.log("Error Occurred", "ERROR");
					casper.capture(screenShotsDir+"Error_BlankData.png");
				}
			//});
		  }else if(responseData.errorType == "Invalid Username") {
			casper.wait(5000, function() {
				var ActualMessage = casper.fetchText('div.alert.alert-danger');
				console.log("******invalid username******"+ActualMessage.trim());
				if(ActualMessage.trim() == responseData.ExpectedMessage){
					casper.log("Error message in case of invalid username has been verified", 'info');
				}else {
					casper.log("Error Occurred", "error");
					this.capture(screenShotsDir+"Error_invalidUsername.png");
				}
			});
		  } else if(response.data.errorType == "Invalid Email") {
			casper.wait(5000, function() {
				var ActualMessage = casper.fetchText('div.alert.alert-danger');
				console.log("******invalid username******"+ActualMessage.trim());
				if(ActualMessage.trim() == responseData.ExpectedMessage){
					casper.log("Error message in case of invalid Email has been verified", 'info');
				}else {
					casper.log("Error Occurred", "error");
					this.capture("ScreenShots/Error_ForgotPasswordwithinvalidEmail.png");
				}
			});
		  } else if(response.data.errorType == "Invalid Username and Email") {
			casper.wait(5000, function() {
				var ActualMessage = casper.fetchText('div.alert.alert-danger');
				console.log("******invalid username******"+ActualMessage.trim());
				if(ActualMessage.trim() == responseData.ExpectedMessage){
					casper.log("Error message is verified while submitting request with invalid username and email", 'info');
				}else {
					casper.log("Error Occurred", "ERROR");
					this.capture(screenShotsDir+"Error_invalidUsernameandEmail.png");
				}
			});
		  }
		
	     });
       });
});

};


//method to send forgot password request after filling username/email
forgotpwd.forgotPassword = function(data, driver, callback) {
	driver.fill('form[name="lost_pw_form"]', {
		'member' : data.username,
		'email' : data.email	
	}, false);
	driver.click('input[name="Submit"]');
	return callback();
};

//method to verify forgot password link
forgotpwd.verifyForgotPasswordLink = function(driver, callback) {
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



