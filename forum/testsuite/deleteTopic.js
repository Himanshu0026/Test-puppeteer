/****This script is dedicated for user to delete topic from forum. It covers testing of topic page with all defined validations****/

"use strict";

var utils = require('./utils.js');
var forumRegister = require('./register.js');
var json = require('../testdata/topic.json');
var forumLogin = require('./forum_login.js');
var config = require('../config/config.json');

var deleteTopic = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'deleteTopic/';

deleteTopic.deleteTopicFeature = function(casper, test, x, callback) {
		
	//Open Forum URL And Get Title 
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and disable Delete Own Topic checkbox', 'INFO');
			this.then(function() {
				casper.echo('Title of the page :' +this.getTitle(), 'INFO');
				casper.echo('---------------------------------------------------------------------------');		
			});
	});

	//login to backend url (rm)
	/*casper.then(function() {
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('User has been successfuly login to backend', 'INFO');
		});
	});*/

	//go to edit user group setting permission
	casper.then(function() {
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
			casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
			casper.then(function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});
		});
	});

	//click on checkbox to disable delete topic	
	casper.then(function() {
		utils.enableorDisableCheckbox('delete_threads', false, casper, function() {
			casper.echo('Delete Own Tpoic checkbox has been disabled', 'INFO');
		});
	});

	//click on save button
	casper.then(function() {
		utils.clickOnElement(casper, '.btn-blue', function() {
			casper.echo('Saving Changes', 'INFO');
		});
	});

	//verify update setting message
	casper.then(function() {
		var msg  = this.fetchText('p[align="center"] font.heading');
		test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and verified message.');
		casper.echo('---------------------------------------------------------------------------');
	});

	//getting screenshot after change permission
	casper.then(function() {
		this.capture(screenShotsDir+'afterChangePermission.png');
	});		
		
	// start from forum url
	casper.thenOpen(config.url, function() {
		casper.echo('Title of the page :' +this.getTitle(), 'INFO');
	});
	

	// trying to delete other post when delete own topic checkbox is disable 
	casper.then(function() {
		test.assertDoesntExist('div.panel-body input.entry-checkbox');
		casper.echo('topic is not deleted go to backed and change the permission', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	// reopen backend to enable permission
	casper.thenOpen(config.backEndUrl,function() {
		casper.echo('Login To Backend URL and enable start topic checkbox', 'INFO');
		this.then(function() {
			casper.echo('Title of the page :' +this.getTitle(), 'INFO');
			casper.echo('---------------------------------------------------------------------------');
		});
	});	

	//go to edit user group permission setting.
	casper.then(function() {
		utils.gotoEditUserGroupPermissionpage(x, "Registered Users", casper, function() {
			casper.echo('Successfully navigated to Edit User group Permission page', 'INFO');
			casper.then(function(){
				this.capture(screenShotsDir+'EditUserPermissionpage.png');
			});
		});
	});

	//click on checkbox to enable delete topic	
	casper.then(function() {
		utils.enableorDisableCheckbox('delete_threads', true, casper, function() {
			casper.echo('Starts Tpoic checkbox has been enabled', 'INFO');
		});
	});

	//click on save button
	casper.then(function() {
		utils.clickOnElement(casper, '.btn-blue', function() {
			casper.echo('Saving Changes', 'INFO');
		});
	});

	//verify update setting message
	casper.then(function() {
		var msg  = this.fetchText('p[align="center"] font.heading');
		test.assertEquals(msg.trim(), config.permissionSettingMsg.trim(), msg.trim()+' and verified message');
		casper.echo('---------------------------------------------------------------------------');
	});

	//getting screenshot after change permission
	casper.then(function() {
		this.capture(screenShotsDir+'afterChangePermission.png');
	});		

	//got to forum url
	casper.thenOpen(config.url, function() {
		casper.echo('Hit on URL : '+config.url, 'INFO');
	});

	//getting screenshot after hit on  forum url
	casper.then(function() {
		this.capture(screenShotsDir+'forumUrl.png');
	});		

	//Delete others Topic
	casper.then(function() {
		test.assertDoesntExist('div.panel-body input.entry-checkbox');
		casper.echo('you can not delete others topic', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});

	//Log Out From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.log('Successfully logout from application', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Logout' Link
	casper.then(function() {
		this.capture(screenShotsDir+ 'logout.png');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp(json['newTopic'].username, json['newTopic'].password, casper, function() {
			casper.echo('User has been successfuly login to application with register user', 'INFO');
		});
	});

	//Getting Screenshot After Clicking On 'Log In' Link 
	casper.then(function() {
		this.capture(screenShotsDir+ 'login.png');
	});
	
	//delete own topic 
	casper.then(function() {
		deleteTopic(x, json.deleteTopic.topicName, casper, function() {
			casper.echo('deleting selected topic', 'INFO');
		});			
	});
	
	//Getting Screenshot After Clicking On 'Delete' Icon
	casper.then(function() {
		this.capture(screenShotsDir+ 'deletedTopic.png');
	});
	
	/*//Delete All Topic
	casper.then(function(){
		casper.echo('deleting all topic', 'INFO');
		var checked = this.click('div.panel-heading input[name = "allbox"]');
		this.capture(screenShotsDir+ 'SelectAllForDelete.png');	
		console.log('checked : '+checked, 'INFO');
		test.assertEquals(checked,true);
		this.click('a#delete');
	});
	
	//Getting Screenshot After Clicking On 'Delete' Icon
 
	casper.then(function() {
		this.capture(screenShotsDir+ 'deletedAllTopic.png');
	});*/

	//Log Out From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully logout from application', 'INFO');
		});

		//Getting Screenshot After Clicking On 'Logout' Link
		casper.then(function() {
			this.capture(screenShotsDir+ 'logout.png');
		});
	});
	return callback();
};

/************************************PRIVATE METHODS***********************************/

//method to delete topic

var deleteTopic = function(x, topicName, driver, callback){
	
	var href = "";
	driver.click(x('//a/span[text()="'+topicName+'"]'));
	driver.then(function() {
		var url = this.getCurrentUrl();
		href = url.split('.com');
	});
	driver.thenOpen(config.url, function() {
		casper.echo('Hit on url : '+config.url, 'INFO');
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
		this.then(function() {
			driver.capture(screenShotsDir+ 'Delete.png');
		});
	});
	driver.then(function() {
		this.test.assertDoesntExist('a[href="'+href[1].trim()+'"]');
		casper.echo('verified deleted topic', 'INFO');
		casper.echo('---------------------------------------------------------------------------');
	});
	
	return callback();
};

var getCheckboxVal = function(href, driver, callback){
	
		var val = href;
		val = val.split('-');
		val = val[1].split('?');
		val = val[0].replace('?','');
		return val;
};


