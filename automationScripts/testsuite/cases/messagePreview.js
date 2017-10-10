'use strict.';
var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var pmJSON = require('../../testdata/privateMessage.json');
var registerMethod = require('../methods/register.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var messagePreviewJSON = require('../../testdata/messagePreview.json');
var messagePreviewMethod=require('../methods/messagePreview.js');
var privateMessageMethod = require('../methods/privateMessage.js');
var forumLoginMethod = require('../methods/login.js');
var messagePreviewTests = module.exports = {};
var recipients = [];

messagePreviewTests.verifyNoMessage=function(){

	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 1 [Verify with message preview when there is no messsages in the inbox]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('a[href="/tool/members/mb/settings?tab=General"]');
	}).waitForSelector('button.button.btn-m.btn-blue', function(){
		backEndForumRegisterMethod.enableDisableMessages(true);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('a[href="/tool/members/mb/settings?tab=Security"]');
	}).then(function(){
		backEndForumRegisterMethod.enableDisableEmailAddressVerification(false);
	}).thenOpen(config.url, function(){
		this.click('a[href="/register/register"]');
		registerMethod.registerToApp(1, function(users){
			recipients = users;
		});
	}).then(function(){
		forumLoginMethod.loginToApp(recipients, recipients);
		this.waitForSelector('i#private_message_notification', function(){
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertTextExist('Your inbox is empty.');
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForText('Your inbox is empty.');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with message preview when there is one message when you recieve a message
messagePreviewTests.verifyReceiveSingleMessage = function() {
	casper.thenOpen(config.url, function(){
		utils.info('case 2[Verify with message preview when there is one message when you recieve a message]');
		utils.info('case-4[-Verify with message preview when you reply back in 2nd case]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('i#private_message_notification', function(){
		this.click('i#private_message_notification');
		this.waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitForSelector('div[class="modal fade in"]', function(){
			this.test.assertSelectorHasText('div[class="modal fade in"]', 'New Message');
			var pmessage = utils.randomString();
			var senderMsgInfo = {
				"to" : recipients,
				"subject" : "Send message to " +recipients+ " recipients",
				"pmessage" : pmessage
			};
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function(){
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(recipients, recipients);
		}).waitForSelector('i#private_message_notification', function(){
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox (1)');
			this.test.assertTextExist(loginJSON.validInfo.username);
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('input#select_allbox', function(){
			this.test.assertElementCount('ul#pmsg_inbox_listing li', 1);
			this.test.assertTextExist(loginJSON.validInfo.username);
			this.test.assertExists('textarea#pmessage_reply');
			this.click('textarea#pmessage_reply');
			this.waitForSelector('iframe#pmessage_reply_ifr', function() {
				this.withFrame('pmessage_reply_ifr', function() {
					casper.sendKeys('#tinymce', casper.page.event.key.Ctrl, casper.page.event.key.A, {keepFocus: true});
					casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
					casper.sendKeys('#tinymce', 'Reply with one receiver message....!!!');
				});
			}).then(function() {
				this.evaluate(function() {
					$('div#message_options').show();
					document.querySelector('a#reply_msg_button').click();
				});
				this.waitUntilVisible('div.message-entry.sent', function() {
					this.test.assertSelectorHasText('div.message-entry.sent', 'Reply with one receiver message....!!!');
				});
			}).thenOpen(config.url, function() {
				this.waitForSelector('i#private_message_notification', function(){
					this.click('i#private_message_notification');
				}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
					this.test.assertTextExist('Reply with one receiver message....!!!');
					this.test.assertTextExist(loginJSON.validInfo.username);
					this.click('ul#private_message_dropdown a.pull-left');
				}).waitForSelector('input#select_allbox', function() {
					this.test.assertSelectorHasText('ul#pmsg_inbox_listing li', 'Reply with one receiver message....!!!');
				}).then(function() {
					forumLoginMethod.logoutFromApp();
				});
			});
		});
	});
};

//Verify with message preview when there is one message(when you send a message)
messagePreviewTests.verifySenderSingleMessage = function() {
	casper.thenOpen(config.url, function(){
		utils.info('case-3[-Verify with message preview when there is one message(when you send a message)]');
		this.click('a[href="/register/register"]');
		registerMethod.registerToApp(1, function(users){
			recipients = users;
		});
	}).then(function(){
		forumLoginMethod.loginToApp(recipients, recipients);
	}).waitForSelector('i#private_message_notification', function(){
		this.click('i#private_message_notification');
	}).waitForSelector('ul#private_message_dropdown span.pull-right', function(){
		this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
		this.click('a.send_new_pmsg');
	}).waitForSelector('div[class="modal fade in"]', function() {
		this.test.assertSelectorHasText('div[class="modal fade in"]', 'New Message');
		privateMessageMethod.newMessage(pmJSON.newMsgInfo);
	}).waitUntilVisible('div#ajax-msg-top', function() {
		this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
	}).thenOpen(config.url, function() {
		this.then(function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		});
	}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
		this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
		this.test.assertTextExist(pmJSON.newMsgInfo.subject);
		this.test.assertTextExist(pmJSON.newMsgInfo.pmessage);
		this.click('ul#private_message_dropdown a.pull-left');
	}).waitForSelector('input#select_allbox', function(){
		this.test.assertElementCount('ul#pmsg_inbox_listing li', 1);
		this.test.assertTextExist(pmJSON.newMsgInfo.subject);
		this.test.assertTextExist(pmJSON.newMsgInfo.pmessage);
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with the sequence on message pre view send 4 messages to 4 different sender
messagePreviewTests.messagePreviewSendMessageFourUsers= function(){
	var pmessage = '';
	casper.thenOpen(config.backEndUrl, function(){
		utils.info('case-6[Verify with the sequence on message pre view(send 4 messages to 4 different sender )]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]', function(){
		this.test.assertSelectorHasText('#ddUsers', 'Default Options');
		this.click('div#ddUsers a[href="/tool/members/mb/fields?action=default_registration_option"]');
		var setOptions = {"fullName" : "No", "instantMessaging" : "No", "birthday" : "No", "signature" : "No", "avatar" : "No"};
		backEndregisterMethod.changeDefaultRegistrationOptions(setOptions);
	}).thenOpen(config.url, function(){
		registerMethod.registerToApp(3, function(users){
			recipients = users;
		});
		this.waitForSelector('#inline_search_box', function(){
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function(){
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function(){
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.eachThen(recipients, function(receiver) {
				//utils.error("......receiver.data......" +receiver.data);
				pmessage = utils.randomString();
				var senderMsgInfo = {
					"to" : [receiver.data],
					"subject" : "Send message to " +recipients.length+ " recipients",
					"pmessage" : pmessage
				};
				utils.error("......senderMsgInfo......" +JSON.stringify(senderMsgInfo));
				this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
				this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
				this.waitForSelector('div[class="modal fade in"]', function() {
					this.test.assertSelectorHasText('div[class="modal fade in"]', 'New Message');
					this.then(function() {
						privateMessageMethod.newMessage(senderMsgInfo);
					});
				}).waitUntilVisible('div#ajax-msg-top', function() {
					this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
				});
			});
		}).waitForSelector('input#select_allbox', function(){
			utils.error(recipients[0]+ "............" +recipients[1]);
			this.test.assertSelectorHasText('ul#pmsg_inbox_listing li:nth-child(1)', recipients[recipients.length-1]);
			//this.test.assertTextExist(pmJSON.newMsgInfo.subject);
			//this.test.assertTextExist(pmJSON.newMsgInfo.pmessage);
			forumLoginMethod.logoutFromApp();
		});
	});
};

//----Verify with the sequence on message pre view(send 4 messages to user 1 from 4 different send.
messagePreviewTests.messagePreviewSendMessageSingleUser= function(){

	var pmessage = '';
	var senderMsgInfo;
	casper.thenOpen(config.url, function(){
		utils.info('Case 8[Verify with the sequence on message pre view(send 4 messages to user 1 from 4 different send.]');
		utils.info('Case-9[Verify with reply back to first recieved message in case of 8th]');
		registerMethod.registerToApp(1, function(users){
			recipients = users;
			pmessage = utils.randomString();
			senderMsgInfo = {
				"to" : recipients,
				"subject" : "Send message to " +recipients.length+ " recipients",
				"pmessage" : pmessage
			};
		});
	}).thenOpen(config.url, function(){
		this.waitForSelector('#inline_search_box', function(){
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function(){
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitForSelector('div[class="modal fade in"]', function(){
			this.test.assertSelectorHasText('div[class="modal fade in"]', 'New Message');
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function(){
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url, function(){
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
		}).waitForSelector('i#private_message_notification', function(){
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitForSelector('div[class="modal fade in"]', function(){
			this.test.assertSelectorHasText('div[class="modal fade in"]', 'New Message');
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url, function(){
		this.waitForSelector('#inline_search_box', function(){
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.ValidCredential.username, loginJSON.ValidCredential.password);
		}).waitForSelector('i#private_message_notification', function(){
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitForSelector('div[class="modal fade in"]', function(){
			this.test.assertSelectorHasText('div[class="modal fade in"]', 'New Message');
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function(){
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url , function(){
		this.waitForSelector('#inline_search_box', function(){
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validUser.username, loginJSON.validUser.password);
		}).waitForSelector('i#private_message_notification', function(){
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitForSelector('div[class="modal fade in"]', function(){
			this.test.assertSelectorHasText('div[class="modal fade in"]', 'New Message');
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function(){
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(recipients, recipients);
			this.waitForSelector('i#private_message_notification', function(){
			this.click('i#private_message_notification');
		}).waitForText('See all', function(){
			this.click('a[href="/pm/inbox"]');
		}).waitForSelector('form#pmsg_list', function(){
			var checkUser=casper.evaluate(function(){
				var element = document.querySelector('ul#pmsg_inbox_listing li strong').innerHTML;
				return element;
			});
			var element=checkUser.trim();
			this.test.assertEquals(element, loginJSON.validUser.username);
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			forumLoginMethod.loginToApp(recipients, recipients);
			this.waitForSelector('i#private_message_notification', function(){
				this.click('i#private_message_notification');
			}).waitForText('See all', function(){
				this.click('a[href="/pm/inbox"]');
			}).waitForSelector('form#pmsg_list', function(){
				this.test.assertExists('#messages-menu');
				var countElement=casper.evaluate(function(){
					var element = document.querySelector('ul#pmsg_inbox_listing li:nth-child(4)').getAttribute('data-conv_user_id');
					return element;
				});
				this.click('li[data-conv_user_id="'+countElement+'"]');
				this.click('textarea#pmessage_reply');
			}).waitForSelector('i.mce-ico.mce-i-image', function(){
				this.withFrame('pmessage_reply_ifr', function(){
					this.sendKeys('#tinymce', casper.page.event.key.Ctrl,casper.page.event.key.A, {keepFocus: true});
					this.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
					this.sendKeys('#tinymce', messagePreviewJSON.frame.data);
				});
			}).then(function(){
				this.test.assertExists('a#reply_msg_button', ' a#reply_msg_button selector exists');
				this.evaluate(function(){
					document.querySelector('a#reply_msg_button').click();
				});
			}).waitForText('hello');
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
     	  });
      });
};













//verify with message preview when you send same message for 4 user at same time
messagePreviewTests.messagePreviewSameMessageFourUser= function(){

	var pmessage = '';
	casper.thenOpen(config.url, function(){
		utils.info('case-10[Verify with message preview when you send same message for 4 user at same time]');
		registerMethod.registerToApp(4, function(users){
			recipients = users;
		});
		this.waitForSelector('#inline_search_box', function(){
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function(){
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function(){
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function(){
			this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
			this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
		}).waitForSelector('div[class="modal fade in"]', function(){
			this.test.assertSelectorHasText('div[class="modal fade in"]', 'New Message');
			pmessage = utils.randomString();
			var senderMsgInfo = {
				"to" : recipients,
				"subject" : "Send message to " +recipients.length+ " recipients",
				"pmessage" : pmessage
			};
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitForSelector('div#current_msg_details', function() {
			this.test.assertSelectorDoesntHaveText('div#current_msg_details', recipients[4]);
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.backEndUrl , function(){
			this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function(){
				this.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
			}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function(){
				this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
				this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
				backEndForumRegisterMethod.viewUsers('Registered Users');
			});
		}).then(function(){
			backEndForumRegisterMethod.editUserActions('Registered Users', 'Delete', recipients.length);
		});
	});
};

//Verify message preview for unread message
messagePreviewTests.unreadMessagePreview= function(){

	casper.thenOpen(config.url , function(){
		utils.info('case-11[Verify with the sequence on message pre view(send 4 messages to 4 different sender)]');
		forumLoginMethod.loginToApp(recipients, recipients);
		this.waitForSelector('i#private_message_notification', function(){
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span li:nth-child(1) a strong', function(){
			this.click('ul#private_message_dropdown span li:nth-child(1) a strong');
		}).waitForSelector('li.user-nav-list.unread ', function(){
			utils.info('unread messages are found');
		}, function(){
			utils.error('none of the messages are unread');
		});
	});
};
