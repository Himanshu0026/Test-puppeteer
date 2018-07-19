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
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
          this.test.assertSelectorHasText('#ddSettings', 'Security');
	  this.evaluate(function() {
		document.querySelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]').click();
	  });
          backEndForumRegisterMethod.setApproveNewPost('0');
	}).thenOpen(config.url, function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('div#userSignature textarea', function(){
		this.test.assertExists('div#userSignature textarea', 'signature is present on editprofilepage');
		this.waitForSelector('a#edit_signature small', function(){
			utils.info('signature is already present on editProfile Page');
			this.test.assertExists('a#edit_signature small');
			this.click('a#edit_signature small');
			this.waitUntilVisible('i.mce-ico.mce-i-image', function(){
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
			}).waitForText('Your settings have been updated.', function(){
				this.evaluate(function(){
					document.querySelector('#signature').click();
				});
				this.wait(3000, function(){
					this.withFrame('signature_ifr', function(){
						this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
						this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
						this.sendKeys('#tinymce', editProfilePageJSON.signature.newSignature);
					});
				}).then(function(){
					this.click('button[type="submit"]');
				}).waitForText('Your settings have been updated.');
			});
		}, function(){
			this.test.assertExists('#signature');
			this.evaluate(function(){
				document.querySelector('#signature').click();
			});
			this.wait(3000, function(){
				this.withFrame('signature_ifr', function(){
					this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
					this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
					this.sendKeys('#tinymce', editProfilePageJSON.signature.newSignature);
				});
			}).then(function(){
				this.click('button[type="submit"]');
			}).waitForText('Your settings have been updated.');
		}).then(function(){
			this.test.assertExists('i.icon.icon-menu');
			this.click('i.icon.icon-menu');
			this.test.assertExists('li#latest_topics_show a');
			this.click('li#latest_topics_show a');
		}).waitForSelector('a[href="/post/printadd"]', function(){
			this.test.assertExists('a[href="/post/printadd"]');
			this.evaluate(function() {
				document.querySelector('a[href="/post/printadd"]').click();
			});
			topicMethod.createTopic(topicJSON.ValidCredential);
		}).waitForText(topicJSON.ValidCredential.content, function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).then(function(){
			this.test.assertExists('form[name="posts"] a.topic-title', 'topic found on forum');
			this.click('form[name="posts"] a.topic-title');
		}).waitForText('My new signature');
	});
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
		this.evaluate(function() {
			document.querySelector('a#logo_or_title').click();
		});
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
		this.test.assertDoesntExist('div#custom_user_title', 'custom title selector not present on edit profile page');
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
		this.test.assertExists('div#custom_user_title', 'custom title present on edit profile page');
	});
};

editProfilePageTests.editCustomTitle=function(){

	casper.thenOpen(config.url , function(){
		utils.info('Case 8[Verify with edit custom member title]');
		this.waitForSelector('ul.nav.pull-right span.caret', function(){
			this.test.assertExists('ul.nav.pull-right span.caret');
			this.click('ul.nav.pull-right span.caret');
			this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
			this.waitForSelector('a#change_user_title small', function(){
				var message = casper.fetchText('a#change_user_title');
				utils.info('value is '+message);
				this.test.assertTextExists(message);
			}, function(){
				casper.test.assertExists('div#custom_user_title input');
				casper.click('div#custom_user_title input');
				casper.sendKeys('div#custom_user_title input', editProfilePageJSON.customTitle.addTitle);
				this.wait(1000, function(){
					this.click('button[type="submit"]');
					this.wait(1000, function(){
						this.evaluate(function() {
							document.querySelector('form[name="PostTopic"] div:nth-child(9) div button').click();
						});
					});
				});
			}).then(function(){
				forumLoginMethod.logoutFromApp();
			}).thenOpen(config.url, function(){
				forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
			}).then(function(){
				this.test.assertExists('ul.nav.pull-right span.caret');
				this.click('ul.nav.pull-right span.caret');
				this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
				this.waitForSelector('button[type="submit"]', function(){
					this.click('a#change_user_title small');
					this.sendKeys('form.form-inline.editableform div div div:nth-child(1) input', editProfilePageJSON.customTitle.addTitle);
					this.wait(1000, function(){
						this.click('button[type="submit"]');
						this.wait(1000, function(){
							this.click('button[type="submit"]');
						});
					});
				});
			}).then(function(){
				forumLoginMethod.logoutFromApp();
			});
		});
	});
};

editProfilePageTests.deleteCustomTitle=function(){

	casper.thenOpen(config.url , function(){
		utils.info('Case 9[Verify with delete custom user title]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('ul.nav.pull-right span.caret', function() {
		this.test.assertExists('ul.nav.pull-right span.caret');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('button[type="submit"]', function(){
		this.click('a#change_user_title small');
		var str = casper.fetchText('form.form-inline.editableform div div div:nth-child(1) input');
		this.wait(1000, function(){
			if(str.length !==null) {
				for(var i =0; i<str.length;i++) {
					this.sendKeys('form.form-inline.editableform div div div:nth-child(1) input', casper.page.event.key.Backspace, {keepFocus: true});
				}
			}
		}).then(function(){
			this.wait(3000, function(){
				this.click('button.btn.btn-primary.btn-sm.editable-submit');
				this.wait(3000, function(){
					this.click('form.form-horizontal  button[name="submit"]');
				}).waitForSelector('div#custom_user_title input:nth-child(1)', function(){
					this.test.assertTextDoesntExist(str);
				}).waitForText('Your settings have been updated.');
			});
		});
	});
};
//Verify the shield icon for registered user  on edit profile page
editProfilePageTests.shieldIcon=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 10[Verify the shield icon for registered user  on edit profile page]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/fields"]');
	}).waitForSelector('a[href="fields?action=new_edit_field&new=1"]', function(){
		if (this.visible('input[name="allbox"]')){
			this.click('input[name="allbox"]');
			this.then(function(){
				this.click('button.button');
				casper.wait(3000, function(){
					this.waitForSelector('input[name="allbox"]', function(){
						this.test.assertTextDoesntExist('input[name="custom_profile"]', 'selector not found on add field page');
						this.click('a[href="fields?action=new_edit_field&new=1"]');
					});
				});
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
		this.test.assertSelectorHasText('label[for="customField"]', 'hell');
	});
};

//Verify the tool tip on the shield icon
editProfilePageTests.toolTipShieldIcon=function(){
	var actualtooltip="";
	casper.thenOpen(config.url, function(){
		utils.info('Case 11[Verify the tool tip on the shield icon]');
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('form[name="PostTopic"] span.text-muted', function(){
		actualtooltip = casper.evaluate(function(){
			var id = document.querySelector('form[name="PostTopic"] span.text-muted').getAttribute('data-original-title');
			return id;
		});
	}).then(function(){
		this.test.assertEquals(actualtooltip, editProfilePageJSON.shieldIcon.expectedtooltip, 'both the tooltip are equal actual and expected');
	});
};

//Verify the shield icon for registered user  on edit profile pgae by the admin.
editProfilePageTests.shieldIconRegisteruser=function(){

	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 12[Verify the shield icon for registered user  on edit profile pgae by the admin.]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
                this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
                this.click('a[href="/tool/members/mb/usergroup"]');
	}).waitForSelector('div#tab_wrapper', function(){
        	backEndForumRegisterMethod.viewGroupPermissions('Registered Users');
	}).waitForText('Save', function(){
		backEndForumRegisterMethod.editGroupPermissions('Registered Users', 'post_threads', true);
	}).thenOpen(config.url, function(){
		this.test.assertExists('a[href="/post/printadd"]');
		this.evaluate(function() {
			document.querySelector('a[href="/post/printadd"]').click();
		});
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
		this.evaluate(function(userId) {
			document.querySelector('a[href="'+userId+'"]').click();
		}, userId);
		//this.click('a[href="'+userId+'"]');
	}).waitForSelector('a#anchor_tab_edit i', function(){
		this.click('a#anchor_tab_edit i');
	}).waitForSelector('div#userSignature textarea', function(){
		this.test.assertSelectorHasText('label[for="customField"]', 'hell');
	}).then(function(){
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
		utils.info('Case 13[Verify with invalid birthday(future year)]');
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
	}).waitForText('Valid years for your Birthday are from 1900 to 2018.');
};

//Verify with invalid birthday(future month)
editProfilePageTests.invalidFutureMonth=function(){

	casper.thenOpen(config.url, function(){
		utils.info('Case 14[Verify with invalid birthday(future month)]');
	}).then(function(){
		this.test.assertExists('ul.nav.pull-right span.caret', 'dropdown toggle button present');
		this.click('ul.nav.pull-right span.caret');
		this.click('span.pull-right.user-nav-panel li:nth-child(4) a');
	}).waitForSelector('div#userSignature textarea', function(){
		var date = casper.evaluate(function() {
			var today = new Date();
	    		var tomorrow = new Date(today);
	    	tomorrow.setDate(today.getDate()+4);
	    	if(today.getDate() > 28) {
			tomorrow.setMonth(today.getMonth()+1);
	    	}
			var day = tomorrow.getDate();
			var month = tomorrow.getMonth()+1;
			var year = tomorrow.getFullYear();
			var bdaydate = month + "/" + day + "/" + year;
			return bdaydate;
		});
		utils.info('date ='+date);
		casper.sendKeys('input[name="birthDatepicker"]', date, {reset : true});
	}).then(function(){
		this.click('button[type="submit"]');
	}).waitForText('Please provide a valid Birthday.');
};

//Verify with enter full name greater then maximum limits(30)
editProfilePageTests.verifyFullName=function(){
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('Case 15[Verify with enter full name greater then maximum limits(30)]');
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
		this.test.assertSelectorHasText('#ddUsers', 'Profile Fields');
		this.evaluate(function() {
			document.querySelector('div#ddUsers a[href="/tool/members/mb/fields"]').click();
		});
	}).waitForText('Default Profile Fields',function() {
		var setOptions = {"fullName" : "", "instantMessaging" : "", "birthday" : "", "signature" : "", "avatar" : "",		 	 	 "visiblity_name_registration" : "Yes",
		"visiblity_imType_registration" : "Yes",
		"visiblity_dob_registration" : "Yes",
		"visiblity_signature_registration" : "Yes",
		"visiblity_avatar_registration" : "Yes"};
		backEndForumRegisterMethod.changeDefaultRegistrationOptions(setOptions);
	});
};
