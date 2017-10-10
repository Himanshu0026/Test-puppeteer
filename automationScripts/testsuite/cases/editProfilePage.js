'use strict.';
var loginJSON = require('../../testdata/loginData.json');
var config = require('../../../config/config.json');
var topicMethod = require('../methods/topic.js');
var topicJSON = require('../../testdata/topic.json');
var editProfilePageJSON=require('../../testdata/editProfilePageData.json');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var profilePageMethod= require('../methods/profilePage.js');
var forumLoginMethod = require('../methods/login.js');
var editProfilePageTests = module.exports = {};

//Disable Signature  for Registered user from group Permission
editProfilePageTests.editProfileDisableSignature=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 1[Disable Signature  for Registered user from group Permission]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'allow_signature', false);
	}).then(function(){
		this.test.assertSelectorHasText('div#tab_wrapper p font','Your user group settings have been updated.');
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('button[name="submit"]', function(){
		this.test.assertDoesntExist('div#userSignature textarea', 'signature is not present on editprofilepage');
	});
};

//Enable Signature  for Registered user from group Permission
editProfilePageTests.editProfileEnableSignature=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 2[Enable Signature  for Registered user from group Permission]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'allow_signature', true);
	}).then(function(){
		this.test.assertSelectorHasText('div#tab_wrapper p font','Your user group settings have been updated.');
	}).then(function(){
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/fields"]', function(){
		this.test.assertSelectorHasText('#ddUsers', 'Profile Fields');
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
	}).waitForText('Default Profile Fields', function(){
		var setOptions = {"fullName" : "", "instantMessaging" : "", "birthday" : "", "signature" : "", "avatar" : "",
		 "visiblity_name_settings" : "",
		 "visiblity_imType_registration" : "", "visiblity_dob_registration" : "",
		 "visiblity_signature_settings" : "Yes", "visiblity_avatar_registration" : ""};
		 backEndForumRegisterMethod.changeDefaultRegistrationOptions(setOptions);
	}).thenOpen(config.url, function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('div#userSignature textarea', function(){
		this.test.assertExists('div#userSignature textarea', 'signature is present on editprofilepage');
		this.evaluate(function() {
			document.querySelector('#signature').click();
		});
		//this.click('#signature');
	}).wait(5000, function(){
		this.withFrame('signature_ifr', function(){
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce', editProfilePageJSON.signature.newSignature);
		});
	}).then(function(){
		this.click('button[type="submit"]');
	}).waitForText('Your settings have been updated.', function(){
		this.test.assertExists('a#logo_or_title');
		this.click('a#logo_or_title');
	}).then(function(){
		this.test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function(){
		this.test.assertExists('form[name="posts"] a.topic-title', 'topic found on forum');
		this.click('form[name="posts"] a.topic-title');
	}).waitForText('My new signature');
};

//Verify with add a signature greater then maximum charecter(500) limits.
editProfilePageTests.addSignatures=function(){
	casper.thenOpen(config.url, function(){
		utils.info('Case 3[Verify with add a signature greater then maximum charecter(500) limits.]');
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil', function(){
		this.test.assertExists('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil', 'edit signature icon is present on editprofilepage');
		this.click('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil');
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		this.withFrame('signature_ifr', function(){
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce', editProfilePageJSON.signature.addsignature);
		});
	}).then(function(){
		this.click('button[type="submit"]');
	}).waitForText('Your signature is 648 characters too long.');
};
//verify with edit signature
editProfilePageTests.editSignatures=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 4[Verify with edit signature]');
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil', function(){
		this.test.assertExists('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil', 'edit signature icon is present on editprofilepage');
		this.click('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil');
	}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
		this.withFrame('signature_ifr', function(){
			this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
			this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
			this.sendKeys('#tinymce', editProfilePageJSON.signature.editSignature);
		});
	}).then(function(){
		this.click('button[type="submit"]');
	}).waitForText('Your settings have been updated.', function(){
		this.test.assertExists('a#logo_or_title');
		this.click('a#logo_or_title');
	}).waitForSelector('form[name="posts"] a.topic-title', function(){
		this.click('form[name="posts"] a.topic-title');
	}).waitForText('signMy new signature');
};

//Verify with delete signature
editProfilePageTests.deleteSignature= function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 5[Verify with delete signature]');
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
		this.waitForSelector('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil', function(){
			this.test.assertExists('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil', 'edit signature icon is present on editprofilepage');
			this.click('a#edit_signature small.text-muted.glyphicon.glyphicon-pencil');
		}).waitUntilVisible('i.mce-ico.mce-i-image', function(){
			var signatureData = casper.fetchText('div#user_signature');
			if(signatureData.length!==null){
				var newsignature=signatureData.split('');
				newsignature.forEach(function(signatureData, index){
					casper.withFrame('signature_ifr', function(){
						casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
					});
				});
			}
		}).then(function(){
			this.click('button[type="submit"]');
		}).waitForText('Your settings have been updated.');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Disable CustomTitile  for Registered user from group Permission
editProfilePageTests.disableCustomTitle=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 6[Disable CustomTitile  for Registered user from group Permission]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'allow_customtitle', false);
	}).then(function(){
		this.test.assertSelectorHasText('div#tab_wrapper p font','Your user group settings have been updated.');
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('div#userSignature textarea', function(){
		this.test.assertDoesntExist('form[name="PostTopic"] div:nth-child(3) label  span', 'custom title selector not present on edit profile page');
	});
};

//Enable CustomTitile for Registered user from group Permission
editProfilePageTests.enableCustomTitle=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 7[Enable CustomTitle for Registered user from group Permission]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'allow_customtitle', true);
	}).then(function(){
		this.test.assertSelectorHasText('div#tab_wrapper p font','Your user group settings have been updated.');
	}).thenOpen(config.url, function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('div#userSignature textarea', function(){
		this.test.assertExists('form[name="PostTopic"] div:nth-child(3) label  span', 'custom title present on edit profile page');
	});
};

//Verify the shield icon for registered user  on edit profile page
editProfilePageTests.shieldIcon=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 8[Verify the shield icon for registered user  on edit profile page]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/fields"]');
	}).waitForSelector('a[href="fields?action=new_edit_field&new=1"]', function(){
		if (this.visible('input[name="custom_profile"]')){
			this.click('input[name="custom_profile"]');
			this.click('button.button');
			this.waitForSelector('input[name="allbox"]', function(){
				this.test.assertTextDoesntExist('input[name="custom_profile"]', 'selector not found on add field page');
				this.click('a[href="fields?action=new_edit_field&new=1"]');
			});
	  	}else{
	    		this.click('a[href="fields?action=new_edit_field&new=1"]');
	  	}
	}).waitForSelector('input[name="fieldname"]', function(){
		backEndForumRegisterMethod.addField('private', true);
	}).thenOpen(config.url, function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('div#userSignature textarea', function(){
		this.test.assertSelectorHasText('form[name="PostTopic"] div:nth-child(5) label span:nth-child(2)', 'hell');
	});
};

//Verify the tool tip on the shield icon
editProfilePageTests.toolTipShieldIcon=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 9[Verify the tool tip on the shield icon]');
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('form[name="PostTopic"] span.text-muted', function(){
		var actualtooltip = casper.evaluate(function(){
			var id = document.querySelector('form[name="PostTopic"] span.text-muted').getAttribute('data-original-title');
			return id;
		});
		this.test.assertEquals(actualtooltip, editProfilePageJSON.shieldIcon.expectedtooltip, 'both the tooltip are equal actual and expected');
	});
};

//Verify the shield icon for registered user  on edit profile pgae by the admin.
editProfilePageTests.shieldIconRegisteruser=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 10[Verify the shield icon for registered user  on edit profile pgae by the admin.]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'post_threads', true);
	}).thenOpen(config.url, function(){
		this.test.assertExists('a[href="/post/printadd"]');
		this.click('a[href="/post/printadd"]');
		topicMethod.createTopic(topicJSON.ValidCredential);
	}).waitForText(topicJSON.ValidCredential.content, function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
	}).then(function(){
		var userId = casper.evaluate(function(){
			var userId = document.querySelector('div#topics div div div form div div:nth-child(3) ul li span:nth-child(1) span:nth-child(1) a');
			var userHref=userId.getAttribute('href');
	    		return userHref;
		});
		this.click('a[href="'+userId+'"]');
	}).waitForSelector('a#anchor_tab_edit i', function(){
		this.click('a#anchor_tab_edit i');
	}).waitForSelector('div#userSignature textarea', function(){
		this.test.assertSelectorHasText('form[name="PostTopic"] div:nth-child(7) label span:nth-child(2)', 'hell');
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function(){
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	        this.click('a[href="/tool/members/mb/fields"]');
	}).waitForSelector('input[name="allbox"]', function(){
		this.click('input[name="allbox"]');
		this.click('button.button');
	}).waitForSelector('input[name="allbox"]', function(){
		this.test.assertTextDoesntExist('input[name="custom_profile"]', 'selector not found on add field page');
	});
};

//Verify with invalid birthday(future year)
editProfilePageTests.invalidBirthday=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 11[Verify with invalid birthday(future year)]');
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/fields"]', function(){
		this.test.assertSelectorHasText('#ddUsers', 'Profile Fields');
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
	}).waitForText('Default Profile Fields', function(){
		var setOptions = {"fullName" : "", "instantMessaging" : "", "birthday" : "", "signature" : "", "avatar" : "",
		 "visiblity_name_registration" : "",
		 "visiblity_imType_registration" : "", "visiblity_dob_settings" : "Yes",
		 "visiblity_signature_settings" : "Yes", "visiblity_avatar_registration" : ""};
		 backEndForumRegisterMethod.changeDefaultRegistrationOptions(setOptions);
	 }).thenOpen(config.url, function(){
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('div#userSignature textarea', function(){
		this.sendKeys('input#birthDatepicker', editProfilePageJSON.birthdayPicker.date);
		this.click('button[type="submit"]');
	}).waitForText('Valid years for your Birthday are from 1900 to 2017.');
};

//Verify with invalid birthday(future month)
editProfilePageTests.invalidFutureMonth=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 12[Verify with invalid birthday(future month)]');
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('div#userSignature textarea', function(){
		this.sendKeys('input#birthDatepicker', editProfilePageJSON.birthdayPicker.month);
		this.click('button[type="submit"]');
	}).waitForText('Please provide a valid Birthday.');
};

//Verify with enter full name greater then maximum limits(30)
editProfilePageTests.verifyFullName=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 13[Verify with enter full name greater then maximum limits(30)]');
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/fields"]', function(){
		this.test.assertSelectorHasText('#ddUsers', 'Profile Fields');
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
	}).waitForText('Default Profile Fields', function(){
		var setOptions = {"fullName" : "", "instantMessaging" : "", "birthday" : "", "signature" : "", "avatar" : "",
		 "visiblity_name_settings" : "Yes",
		 "visiblity_imType_registration" : "", "visiblity_dob_registration" : "",
		 "visiblity_signature_settings" : "Yes", "visiblity_avatar_registration" : ""};
		 backEndForumRegisterMethod.changeDefaultRegistrationOptions(setOptions);
	}).thenOpen(config.url, function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('div#userSignature textarea', function(){
		casper.sendKeys('input[name="name"]', editProfilePageJSON.birthdayPicker.fullName);
		this.click('button[type="submit"]');
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('a#user-nav-panel-profile');
	}).waitForSelector('a#PostsOFUser', function(){
		var fullname=this.getHTML('div#UserProfile div:nth-child(1) ul li:nth-child(1) span:nth-child(2)');
		var newfullname=fullname.trim();
		var fullnameLength=newfullname.length;
		var actuallength=parseInt(fullnameLength);
		if(actuallength===50){
			utils.info('fullname is not greater than the expected character');
		}
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	}).thenOpen(config.backEndUrl, function(){
		this.test.assertExists('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/fields"]', function(){
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
		this.test.assertSelectorHasText('#ddUsers', 'Profile Fields');
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
	}).waitForText('Default Profile Fields', function(){
		var setOptions = {"fullName" : "", "instantMessaging" : "", "birthday" : "", "signature" : "", "avatar" : "",
		 "visiblity_name_settings" : "",
		 "visiblity_imType_registration" : "", "visiblity_dob_registration" : "",
		 "visiblity_signature_settings" : "Yes", "visiblity_avatar_registration" : ""};
		 backEndForumRegisterMethod.changeDefaultRegistrationOptions(setOptions);
	});
};
