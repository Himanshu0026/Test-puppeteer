/****This script is dedicated for inContext login on the forum. It covers testing of inContext login page with all defined validations****/
'use strict';
var forumLogin = require('./forum_login.js');
var json = require('../testdata/inContextLogin.json');
var config = require('../config/config.json');

var inContextLogin = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'inContextLogin/';
/**************************All Fields Required Validation****************************/

inContextLogin.featureTest = function(casper, test) {

	casper.start(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	
	//Incontext Login while Like this post from Topic page
	casper.then(function() {
		casper.echo('Incontext Login while Like this post from Topic page', 'INFO');
		this.click('span.topic-content h4 a.topic-title');
		this.wait(7000, function() {
			this.capture(screenShotsDir +'selectTopic.png');		
		});
		casper.then(function() {
			this.click('div.post-options a.text-muted');
		});
		this.wait(3000, function() {
			this.capture(screenShotsDir +'loginModel.png');		
		});

		/*casper.then(function() {
			forumLogin.loginToApp(json['validInfo'].username, json['validInfo'].password, casper,function() {
				casper.echo('login to app', 'INFO');
			});
		});
		this.wait(7000, function() {
			this.capture(screenShotsDir +'afterLogin.png');		
		});*/

		casper.then(function() {
			this.eachThen(json['invalidInfo'], function() {
				forumLogin.loginToApp(json['invalidInfo'].username, json['invalidInfo'].password, casper,function() {

					casper.echo(JSON.stringify(json['invalidInfo']));
					var errorMessage = '';
					var msgTitle = '';
					var expectedErrorMsg = '';

					if(json['invalidInfo'].expectedErrorMsg){
						expectedErrorMsg = json['invalidInfo'].expectedErrorMsg;
					}
					if((json['invalidInfo'].username == '') && (json['invalidInfo'].password == '')){
						errorMessage = this.fetchText('form[name="frmLogin"] div.alert-danger');
						msgTitle = 'BlankUsernameAndPassword';
					
					} else if(json['invalidInfo'].username == ''){
						errorMessage = this.fetchText('form[name="frmLogin"] div.alert-danger');
						msgTitle = 'BlankUsername';

					} else if(json['invalidInfo'].password == ''){
						errorMessage = this.fetchText('form[name="frmLogin"] div.alert-danger');
						msgTitle = 'BlankPassword';

					}
					//Called Method For Verifying Error Messages
		
						casper.wait('3000', function() {
							if(errorMessage && errorMessage != "") {
								verifyErrorMsg(errorMessage, expectedErrorMsg, msgTitle, casper);
							}
						});
				});
			});
		});

	});
};


/************************************PRIVATE METHODS***********************************/


var verifyErrorMsg = function(errorMessage, expectedErrorMsg, msgTitle, driver) {
	driver.echo("errorMessage : " +errorMessage);
	driver.echo("expectedErrorMsg : " +expectedErrorMsg);
	driver.test.assertEquals(errorMessage.trim(), expectedErrorMsg);
	driver.capture(screenShotsDir + 'Error_RegisterWith' +msgTitle+ '.png');
};

















