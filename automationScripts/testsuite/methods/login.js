/***These are the function which has been called in above test cases and also will be used in other js file as per requirement**********/
'use strict';
var forumLoginMethod = module.exports = {};
var errorMessage = "";

// method for login to application by passing username and password
forumLoginMethod.loginToApp = function(username, password, driver, callback) {
	driver.echo("username : " +username+ " & password : " +password);
	try {
		driver.test.assertExists('#td_tab_login');
		driver.click('#td_tab_login');
		//driver.then(function() {});
		driver.fill('form[name="frmLogin"]', {
			'member': username,
			'pw' : password
		}, false);
		
		try {
			driver.test.assertExists('form[name="frmLogin"] input[type="submit"]');
			driver.click('form[name="frmLogin"] input[type="submit"]');
		} catch(e) {
			driver.test.assertExists('form[name="frmLogin"] button[type="submit"]');
			driver.click('form[name="frmLogin"] button[type="submit"]');
		}
	} catch(e) {
		driver.echo("The user is already logged-in.", 'INFO');
	}	 
	
	return callback(null);
};

//method for logout from application
forumLoginMethod.logoutFromApp = function(casper,callback) {
	
		//try {
			casper.test.assertExists('ul.nav.pull-right span.caret');
			casper.click('ul.nav.pull-right span.caret');
			casper.waitForSelector('ul.nav.pull-right span.caret',function success(){
				casper.capture('toggle1.png');
				casper.test.assertExists('a[href^="/register/logout"]');
				this.evaluate(function() {
					document.querySelector('a#logout').click();
				});
				casper.waitForSelector('a#td_tab_login', function() {
						casper.capture('success.png');
						return callback(null);	
				},function fail(){
					casper.capture('fail.png');
					casper.echo('Login link not found','ERROR');
				});
			
							
				
			},function fail(){
				casper.echo('Selector NOt Found','ERROR');
			});
			//try {
				/*casper.waitUntilVisible('#logout',function success(){
					casper.capture('toggle.png');
					casper.test.assertExists('#logout');
				 
                                		var user= casper.evaluate(function() {
							var id = document.querySelector('a.fb_logout').getAttribute('href');
						return id;
						});
					casper.echo('********'+user);
					casper.click('a[href="'+user+'"]');

					return callback(null);
				},function fail(){
					casper.echo('selector not found','ERROR');
					return callback(null);
				});*/
                                //driver.click('a#'+element+'');
			/*}catch(e) {
				driver.test.assertDoesntExist('#logout');
			}*/
		/*}catch(e) {
			driver.test.assertDoesntExist('ul.nav.pull-right span.caret');
		}*/
	
	
};

//Method For Verifying Error Message On Edit Profile/Account Setting Page After Submitting Form
forumLoginMethod.verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver, callback) {
	driver.echo('Actual Error message : '+errorMessage, 'INFO');
	driver.echo('Expected Error message : '+expectedErrorMsg, 'INFO');
	if((errorMessage == expectedErrorMsg) || (errorMessage.indexOf(expectedErrorMsg) > -1)) {
		driver.echo('Error message is verified when user try to edit with "' +msgTitle+'"', 'INFO');
	} else {
		driver.echo("Error Message Is Not Correct", 'ERROR');
	}
	return callback(null);
};












