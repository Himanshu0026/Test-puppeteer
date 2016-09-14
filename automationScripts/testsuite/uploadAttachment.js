/****This script is dedicated for upload attachments on the forum. It covers testing of all defined validations****/
'use strict';
var utils = require('./utils.js');
var forumRegister = require('./register.js');
var forumLogin = require('./forum_login.js');
var config = require('../../config/config.json');
var topicJSON = require('../testdata/topic.json');

var uploadAttachment = module.exports = {};
var screenShotsDir = config.screenShotsLocation + 'uploadAttachment/';

/**************************All Fields Required Validation****************************/

uploadAttachment.featureTest = function(casper, test) {

	/*casper.echo('                                      CASE 1                                                 ', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	casper.echo('DISABLE ATTACHMENT CHAECKBOX FROM BACKEND', 'INFO');
	casper.echo('VERIFY ATTACHMENT ICON ON ADD NEW TOPIC OR ON REPLY TOPIC', 'INFO');
	casper.echo('************************************************************************************', 'INFO');
	
	//Login To Forum BackEnd 
	casper.start(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox', this.getTitle());
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});
	
	//Clicking On 'File Uploading' Link Under 'Settings' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=File+Uploading"]');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=File+Uploading"]');
	});
	
	//Getting Screenshot After Clicking On 'File Uploading' Link Under 'Settings' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'fileUploading.png');
	});
	
	//Disabling 'Attachments' Checkbox And 'Save'
	casper.then(function(){
		test.assertExists('#FU');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('FU', false, casper, function() {
			casper.echo("Attachments Checkbox Has Been Disabled", 'INFO');
		});
	});
	
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
			test.assertExists('a[href="/tool/members/login?action=logout"]');
			this.click('a[href="/tool/members/login?action=logout"]');
		});
	});
	
	//Open Forum URL And Get Title 
	casper.thenOpen(config.url, function() {
		test.assertTitle('Automation Forum');
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	//Clicking On 'Start New Topic' Tab
	casper.then(function() {
		test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
		this.wait(5000, function() {
			this.capture(screenShotsDir+ 'new_topic.png');
			test.assertDoesntExist('#message-options a#insert_image_dialog_');
			test.assertDoesntExist('#message-options a#fancy_attach_');
			test.assertExists('.icon.icon-menu');
			this.click('.icon.icon-menu');
			test.assertExists('a[href="/latest"]');
			this.click('a[href="/latest"]');
			this.wait(5000,function(){
				this.click('form[name="posts"] h4 a');
				this.wait(5000,function(){
					test.assertExists('#message');
					this.click('#message');
					this.wait(3000,function(){
						test.assertDoesntExist('a#insert_image_dialog_');
						test.assertDoesntExist('a#fancy_attach_');
						this.capture(screenShotsDir+ 'reply_topic.png');
					});
				});
			});
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});*/
	
	//casper.then(function() {
		casper.echo('                                      CASE 2', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
		casper.echo('VERIFY ATTACHING DOCUMENTS FILETYPE AFTER ADDING DOCUMENTS FILE TYPE IN FILE UPLOADING SETTING', 'INFO');
		casper.echo('************************************************************************************', 'INFO');
	//});
	
	casper.start('file:///home/shiprag/Desktop/fileUpload.html', function() {
	});
	
	casper.then(function() {
  this.evaluate( function() {
    console.log('hello'); 
  });
});
	casper.then(function() {
		//this.evaluate(function() {
			/*var y = document.createElement("img");
			y.setAttribute("src", ""); 
			y.setAttribute("height", "200"); 
			y.setAttribute("alt", "Image preview..."); 
			document.body.append(y);*/
			//var files = [];
			//files[0] = '../Screenshots/uploadAttachment/1.png';
			//document.getElementsByTagName('input[type=file]').push(files);
			//var preview = document.querySelector('img'); //selects the query named img
			//var file    = document.querySelector('input[type=file]').files[0]; //sames as here
			//var reader  = new FileReader();
casper.page.uploadFile('input[type="file"]', '../Screenshots/uploadAttachment/1.png');
			/*reader.onloadend = function () {
				preview.src = reader.result;
				return file;
			}

			if (file) {
				reader.readAsDataURL(file); //reads the data as a URL
				return '22222';
			} else {
				preview.src = "";
				return '33333';
			}*/
			
		//});
		
		this.wait(5000, function() {
			this.echo('status : ' +status);
			this.capture(screenShotsDir+ 'browse.png');
			
		});
	});
	
	//Login To Forum BackEnd 
	/*casper.start(config.backEndUrl, function() {
		test.assertTitle('The Easiest Way to Create a Forum | Website Toolbox', this.getTitle());
		this.echo('Title Of The Page :' +this.getTitle(), 'INFO');
		
		//Login To Forum BackEnd 
		forumRegister.loginToForumBackEnd(casper, test, function() {
			casper.echo('Successfully Login To Forum Back End...........', 'INFO');
		});
	});
	
	//Clicking On 'File Uploading' Link Under 'Settings' Tab 
	casper.then(function() {
		test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		test.assertExists('div#ddSettings a[href="/tool/members/mb/settings?tab=File+Uploading"]');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=File+Uploading"]');
	});
	
	//Getting Screenshot After Clicking On 'File Uploading' Link Under 'Settings' Tab 
	casper.wait(5000,function(){
		this.capture(screenShotsDir + 'fileUploading.png');
	});
	
	//Disabling 'Attachments' Checkbox And 'Save'
	casper.then(function(){
		test.assertExists('#FU');
		test.assertExists('textarea[name="file_types"]');
	});
	
	casper.then(function() {
		utils.enableorDisableCheckbox('FU', true, casper, function() {
			casper.echo("Attachments Checkbox Has Been Enabled", 'INFO');
		});
		this.sendKeys('textarea[name="file_types"]', 'png', {reset : true});
	});
	
	casper.then(function() {
		this.click('button.button.btn-m.btn-blue');
		this.wait(5000,function(){
			this.capture(screenShotsDir + 'actions_saved.png');
			test.assertExists('a[href="/tool/members/login?action=logout"]');
			this.click('a[href="/tool/members/login?action=logout"]');
		});
	});*/
	
	//Open Forum URL And Get Title 
	/*casper.start(config.url, function() {
		test.assertTitle('Automation Forum');
		this.echo('Title Of The Page : ' +this.getTitle(), 'INFO');
	});

	//Login To App
	casper.then(function() {
		forumLogin.loginToApp('100', '1234', casper, function() {
			casper.wait(5000, function() {
				this.capture(screenShotsDir+ 'loggedIn_user.png');
				this.echo('User logged-in successfully', 'INFO');
			});
		});
	});
	
	//Clicking On 'Start New Topic' Tab
	casper.then(function() {
		test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
		this.wait(5000, function() {
			this.capture(screenShotsDir+ 'new_topic.png');
			test.assertExists('#message-options a#insert_image_dialog_');
			test.assertExists('#message-options a#fancy_attach_');
			this.click('i.glyphicon.glyphicon-paperclip');
			var status = this.evaluate(function() {
				var x = document.createElement("input");
				x.setAttribute("type", "file");
				var y = document.createElement("img");
				y.setAttribute("src", ""); 
				y.setAttribute("height", "200"); 
				y.setAttribute("alt", "Image preview..."); 
				var preview = document.querySelector('img'); //selects the query named img
				var file    = '../Screenshots/uploadAttachment/1.png'; //sames as here
				var reader  = new FileReader();

				reader.onloadend = function () {
					preview.src = reader.result;
				}

				if (file) {
					reader.readAsDataURL(file); //reads the data as a URL
				} else {
					preview.src = "";
				}
				return true;
			});
			
			this.wait(5000, function() {
				this.capture(screenShotsDir+ 'browse.png');
				
			});
		});
	});
	
	//Logout From App
	casper.then(function() {
		forumLogin.logoutFromApp(casper, function() {
			casper.echo('Successfully Logout From Application', 'INFO');
		});
	});*/
};
