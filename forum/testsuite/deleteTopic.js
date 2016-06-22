/****This script is dedicated for user to delete topic from forum. It covers testing of topic page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var deleteTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'deleteTopic/';

deleteTopic.featureTest = function(casper, test, x) {
		


	//Open Forum URL And Get Title 

	casper.start(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable Delete Own Topic checkbox');
			this.wait(7000, function() {
				casper.echo('Title of the page :' +this.getTitle(), 'info');
				test.assertTitle('Website Toolbox - Account Login', 'The page has correct title');		
			});
	});
	casper.then(function() {
		forumRegister.loginToForumBackEnd(config.backendCred, casper, function() {
			casper.echo('User has been successfuly login to backend', 'info');
		});
	});
	//Getting Screenshot After Clicking On 'Log In' Link 
	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'backendLogin.png');
	});

	casper.then(function() {
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
			casper.echo("Successfully navigated to Edit User group Permission page");
			casper.wait(4000, function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});
		});
	});	
	casper.then(function() {
		utils.enableorDisableCheckbox('delete_threads', false, casper, function() {
			casper.echo("Delete Own Tpoic checkbox has been disabled", 'info');
		});
	});
	casper.then(function() {
		utils.clickOnElement(casper, '.btn-blue', function() {
			casper.echo('Saving Changes');
		});
	});
	casper.then(function() {
		var msg  = this.fetchText('p[align="center"] font.heading');
		casper.echo('msg : ' +msg, 'info');
		casper.echo('config.permissionSettingMsg : ' +config.permissionSettingMsg, 'info');
		test.assertEquals(msg.trim(), config.permissionSettingMsg.trim());
	});
	casper.wait(2000, function() {
		this.capture(screenShotsDir+'afterChangePermission.png');
	});		
		
	// start from forum url
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'info');
		test.assertTitle('Automation Forum', 'page has the correct title');
	});
		
	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username1, json['newTopic'].password1, casper, function() {
			casper.echo('User has been successfuly login to application with register user', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 
	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});

	// trying to delete other post when delete own topic checkbox is disable 
	casper.then(function() {
		//this.click('div.panel-body input.entry-checkbox');
		test.assertDoesntExist('div.panel-body input.entry-checkbox');
		casper.echo('topic is not deleted go to backed and change the permission');
	});

	// reopen backend to enable permission
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable start topic checkbox');
		this.wait(7000, function() {
			casper.echo('Title of the page :' +this.getTitle(), 'info');
			test.assertTitle('Website Toolbox', 'The page has correct title');		
		});
	});	
	casper.then(function() {
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
			casper.echo("Successfully navigated to Edit User group Permission page");
			casper.wait(4000, function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});
		});
	});	
	casper.then(function() {
		utils.enableorDisableCheckbox('delete_threads', true, casper, function() {
			casper.echo("Starts Tpoic checkbox has been enabled", 'info');
		});
	});
	casper.then(function() {
		utils.clickOnElement(casper, '.btn-blue', function() {
			casper.echo('Saving Changes');
		});
	});
	casper.then(function() {
		var msg  = this.fetchText('p[align="center"] font.heading');
		casper.echo('msg : ' +msg, 'info');
		casper.echo('config.permissionSettingMsg : ' +config.permissionSettingMsg, 'info');
		test.assertEquals(msg.trim(), config.permissionSettingMsg.trim());
	});
	casper.wait(2000, function() {
		this.capture(screenShotsDir+'afterChangePermission.png');
	});		

	//got to forum url
	casper.thenOpen(config.url, function() {
		casper.echo('Hit on URL : '+config.url);
	});
	casper.wait(7000, function() {
		this.capture(screenShotsDir+'forumUrl.png');
	});		


	//Delete others Topic
	casper.then(function() {
		test.assertDoesntExist('div.panel-body input.entry-checkbox');
		casper.echo('you can not delete others topic');
	});

	//Log Out From App

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.log('Successfully logout from application', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.echo('User has been successfuly login to application with register user', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 
	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'login.png');
	});
	
	//delete own topic 
	casper.then(function() {
		deleteTopic(x, json.deleteTopic.topicName, casper, function() {
			casper.echo('deleting selected topic');
		});			
	});
	
	//Getting Screenshot After Clicking On 'Delete' Icon
 
	casper.wait(10000,function() {
		this.capture(screenShotsDir+ 'deletedTopic.png');
	});
	
	/*//Delete All Topic
	casper.then(function(){
		casper.echo('deleting all topic');
		var checked = this.click('div.panel-heading input[name = "allbox"]');
		this.capture(screenShotsDir+ 'SelectAllForDelete.png');	
		console.log('checked : '+checked);
		test.assertEquals(checked,true);
		this.click('a#delete');
	});
	
	//Getting Screenshot After Clicking On 'Delete' Icon
 
	casper.wait(10000,function() {
		this.capture(screenShotsDir+ 'deletedAllTopic.png');
	});*/

	//Log Out From App

	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.log('Successfully logout from application', 'info');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link

	casper.wait(7000, function() {
		this.capture(screenShotsDir+ 'logout.png');
	});
};

/************************************PRIVATE METHODS***********************************/

var deleteTopic = function(x, topicName, driver, callback){
	
	var href = "";
	driver.click(x('//a/span[text()="'+topicName+'"]'));
	driver.wait(7000, function() {
		var url = this.getCurrentUrl();
		casper.echo('url : '+url);
		href = url.split('.com');
	});
	driver.thenOpen(config.url, function() {
		casper.echo('Hit on url : '+config.url);
	});
	
	driver.then(function() {
		var val = getCheckboxVal(href[1], driver, function() {});
		driver.click('input[value="'+val+'"]');
		var val1 = driver.evaluate(function(){
			var elm = document.querySelector('.entry-checkbox:checked');
			var checkedValue = elm.value;
			return checkedValue;
		});
		if(driver.test.assertExists('li.selectedRow span.topic-content a.topic-title span')) {
			driver.click('a#delete');
		}
	});
	driver.then(function() {
		this.wait(5000, function() {
			driver.capture(screenShotsDir+ 'Delete.png');
		});
	});
	driver.then(function() {
		casper.echo('href = : ' +'a[href="'+href[1]+'"]');
		this.test.assertDoesntExist('a[href="'+href[1].trim()+'"]');
		casper.echo('verified deleted topic');
	});
	
	return callback();
};

var getCheckboxVal = function(href, driver, callback){
	
		var val = href;
		casper.echo('value : '+val);
	
		val = val.split('-');
		val = val[1].split('?');
		val = val[0].replace('?','');
		casper.echo('value : '+val);
		return val;
}; 

/*var deleteAllTopic = function(driver, callback){
	
	driver.click('div.panel-heading input[name = "allbox"]');
	driver.capture(screenShotsDir+ 'SelectAllForDelete.png');
	driver.then(function() {
		this.click('a#delete');
	});
	return callback();
};*/


