'use strict.';
var config = require('../../../config/config.json');
var loginJSON = require('../../testdata/loginData.json');
var pmJSON = require('../../testdata/privateMessage.json');
var registerMethod = require('../methods/register.js');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var messagePreviewJSON = require('../../testdata/messagePreview.json');
var registerMethod = require('../methods/register.js');
var privateMessageMethod = require('../methods/privateMessage.js');
var backEndForumRegisterMethod = require('../methods/backEndRegistration.js');
var privateMessageMethod = require('../methods/privateMessage.js');
var forumLoginMethod = require('../methods/login.js');
var messagePreviewTests = module.exports = {};
var recipients = [];


//Verify with message preview when there is no messsages in the inbox using option inbox
//Verify with message preview when there is no messsages in the inbox using see all options
messagePreviewTests.verifyNoMessage=function(username, password){

	casper.thenOpen(config.url, function(){
		utils.info('case-1[-Verify with message preview when there is no messsages in the inbox using option inbox]');
		utils.info('case-2[-delete register user messages]');
		forumLoginMethod.loginToApp(username, password);
	}).waitForSelector('i#private_message_notification', function(){
		this.click('i#private_message_notification');
	}).waitForSelector('ul#private_message_dropdown a.pull-left' , function() {
		this.click('ul#private_message_dropdown a.pull-left');
	}).waitForSelector('form#pmsg_list', function() {
		try{
			this.test.assertTextExist('Your inbox is empty.', 'Text Found On Page');
		}catch(e){
			privateMessageMethod.deleteAllPrivateMessage();
		}
	}).then(function(){
		//check from see all options
		this.test.assertTextExist('Your inbox is empty.', 'Text Found On Page');
		this.test.assertExists('i#private_message_notification');
		this.click('i#private_message_notification');
	}).waitForSelector('li.user-nav-list-all a', function(){
		this.click('li.user-nav-list-all a');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};


//Verify with message preview when there is one message(when you send a message)using see all
//Verify with message preview when there is one message(when you send a message)using inbox
messagePreviewTests.verifySenderSingleMessage = function() {

	casper.thenOpen(config.url, function(){
		utils.info('case-2[-Verify with message preview when there is one message(when you send a message)]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.username);
	}).waitForSelector('i#private_message_notification', function(){
		this.click('i#private_message_notification');
	}).waitForSelector('ul#private_message_dropdown span.pull-right', function(){
		this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
		this.click('a.send_new_pmsg');
	}).waitForSelector('div[class="modal fade in"]', function(){
		this.test.assertSelectorHasText('div[class="modal fade in"]', 'New Message');
		privateMessageMethod.newMessage(messagePreviewJSON.msgPreview);
	}).waitUntilVisible('div#ajax-msg-top', function() {
		this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
	}).thenOpen(config.url, function() {
		this.then(function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		});
	}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
		this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
		this.test.assertTextExist(messagePreviewJSON.msgPreview.subject);
		this.click('ul#private_message_dropdown a.pull-left');
	}).waitForSelector('input#select_allbox', function(){
		this.test.assertElementCount('ul#pmsg_inbox_listing li', 1);
		this.test.assertTextExist(messagePreviewJSON.msgPreview.subject);
		this.test.assertTextExist(messagePreviewJSON.msgPreview.pmessage);
		this.test.assertExists('i#private_message_notification');
		this.click('i#private_message_notification');
		//check from see all option
	}).waitForSelector('li.user-nav-list-all a', function(){
		this.click('li.user-nav-list-all a');
		this.test.assertElementCount('ul#pmsg_inbox_listing li', 1);
		this.test.assertTextExist(messagePreviewJSON.msgPreview.subject);
		this.test.assertTextExist(messagePreviewJSON.msgPreview.pmessage);
	}).waitForSelector('input#select_allbox', function(){
		this.test.assertExists('input#select_allbox');
		this.click('input#select_allbox');
	}).waitUntilVisible('#messages-menu', function() {
		this.test.assertExists('#messages-menu');
		this.test.assertExists('a#delete_conversation i');
		this.click('a#delete_conversation i');
	}).then(function(){
		this.test.assertTextExists('Your inbox is empty', 'Text found on the page');
		utils.info('All messages has been deleted');
	}).then(function(){
		forumLoginMethod.logoutFromApp();
	});
};

//Verify with message preview when there is one message when you recieve a message
messagePreviewTests.verifyReceiveSingleMessage = function() {
	casper.thenOpen(config.url, function(){
		utils.info('case 3[Verify with message preview when there is one message when you recieve a message]');
		forumLoginMethod.loginToApp(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password);
	}).waitForSelector('i#private_message_notification', function(){
		this.click('i#private_message_notification');
		this.waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('input#select_allbox', function(){
			this.test.assertElementCount('ul#pmsg_inbox_listing li', 1);
			this.test.assertTextExist(messagePreviewJSON.msgPreview.subject);
			this.test.assertTextExist(messagePreviewJSON.msgPreview.pmessage);
		}).then(function(){
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('li.user-nav-list-all a', function(){
			this.click('li.user-nav-list-all a');
		}).waitForSelector('input#select_allbox', function(){
			this.test.assertElementCount('ul#pmsg_inbox_listing li', 1);
			this.test.assertTextExist(messagePreviewJSON.msgPreview.subject);
			this.test.assertTextExist(messagePreviewJSON.msgPreview.pmessage);
		}).then(function(){
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
					this.test.assertExists('form#pmsg_list', 'checkbox found on inbox page');
					privateMessageMethod.deleteAllPrivateMessage();
				}).then(function(){
					forumLoginMethod.logoutFromApp();
				});
			});
		});
	});
};
//already covered in privateMessage
//Verify with the sequence on message pre view send 4 messages to 4 different sender check from inbox
//Verify with the sequence on message pre view send 4 messages to 4 different sender check from see all options
messagePreviewTests.messagePreviewSendMessageFourUsers= function(){
	var pmessage = '';
	casper.thenOpen(config.url, function(){
		utils.info('case 6[Verify with the sequence on message pre view send 4 messages to 4 different sender check from inbox]');
		this.waitForSelector('#inline_search_box', function(){
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password);
		}).waitForSelector('i#private_message_notification', function(){
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function(){
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			var recipients =[];
			recipients =['shipra','hani','hani12','sangita'];
			this.eachThen(recipients, function(receiver) {
				pmessage = utils.randomString();
				var senderMsgInfo = {
					"to" : [receiver.data],
					"subject" : "Send message to " +recipients.length+ " recipients",
					"pmessage" : pmessage
				};
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
			this.waitForSelector('i#private_message_notification', function(){
				this.click('i#private_message_notification');
			}).waitForSelector('ul#private_message_dropdown a.pull-left', function(){
				this.click('ul#private_message_dropdown a.pull-left');
			}).waitForSelector('input#select_allbox', function(){
				this.test.assertExists('ul#pmsg_inbox_listing li:nth-child(4)');
				this.test.assertExists('i#private_message_notification');
				this.click('i#private_message_notification');
			}).waitForSelector('li.user-nav-list-all a', function(){
				this.test.assertExists('li.user-nav-list-all a');
				this.click('li.user-nav-list-all a');
			}).waitForSelector('input#select_allbox', function(){
				this.test.assertExists('ul#pmsg_inbox_listing li:nth-child(4)');
				this.test.assertExists('input#select_allbox');
				this.click('input#select_allbox');
			}).waitUntilVisible('#messages-menu', function() {
				this.test.assertExists('#messages-menu');
				this.test.assertExists('a#delete_conversation i');
				this.click('a#delete_conversation i');
			}).then(function(){
				this.test.assertTextExists('Your inbox is empty', 'Text found on the page');
				utils.info('All messages has been deleted');
				forumLoginMethod.logoutFromApp();
			});
		});
	});
};

//Verify with the sequence on message pre view(send 4 messages to user 1 from 4 different send.
//Verify with reply back to first recieved message in case of 8th
messagePreviewTests.messagePreviewSendMessageSingleUser= function(){

	var pmessage = '';
	var senderMsgInfo;
	casper.thenOpen(config.url, function(){
		utils.info('Case 8[Verify with the sequence on message pre view(send 4 messages to user 1 from 4 different send.]');
		utils.info('Case-9[Verify with reply back to first recieved message in case of 8th]');
		pmessage = utils.randomString();
		senderMsgInfo = {
			"to" : ["haniuser"],
			"subject" : "One-to-many message",
			"pmessage" : pmessage
		};
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
			forumLoginMethod.loginToApp(loginJSON.adminUser.username, loginJSON.adminUser.password);
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
			forumLoginMethod.loginToApp(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password);
			this.waitForSelector('i#private_message_notification', function(){
			this.click('i#private_message_notification');
			utils.info('checked from see all options for case->8');
		//checked from see all options
		}).waitForText('See all', function(){
			this.click('a[href="/pm/inbox"]');
		}).waitForSelector('form#pmsg_list', function(){
			var checkUser=casper.evaluate(function(){
				var element = document.querySelector('strong[id^="user_name_"]').innerHTML;
				return element;
			});
			var element=checkUser.trim();
			this.test.assertEquals(element, loginJSON.adminUser.username);
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
			utils.info('checked from checked from inbox options for case->8');
		//checked from inbox options
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function(){
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('input#select_allbox', function(){
			var checkUser=casper.evaluate(function(){
				var element = document.querySelector('strong[id^="user_name_"]').innerHTML;
				return element;
			});
			var element=checkUser.trim();
			this.test.assertEquals(element, loginJSON.adminUser.username);
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url, function(){
			utils.info('Case-9[Verify with reply back to first recieved message in case of 8th]');
			forumLoginMethod.loginToApp(loginJSON.deleteTopicUser.username, loginJSON.deleteTopicUser.password);
			this.waitForSelector('i#private_message_notification', function(){
				this.click('i#private_message_notification');
			}).waitForText('See all', function(){
				this.click('a[href="/pm/inbox"]');
			}).waitForSelector('form#pmsg_list', function(){
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
			}).waitForText('hello', function(){
				this.test.assertExists('i#private_message_notification');
				this.click('i#private_message_notification');
				utils.info('checked from inbox options for case->9');
				//checked from inbox options
			}).waitForSelector('ul#private_message_dropdown a.pull-left', function(){
				this.click('ul#private_message_dropdown a.pull-left');
			}).waitForSelector('input#select_allbox', function(){
				this.waitForText('hello');
			});
		}).then(function(){
			//privateMessageMethod.deleteAllPrivateMessage();
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
			var senderMsgInfo = {
				"to" : ["sangita", "shipra", "hani", "hani12"],
				"subject" : "One-to-many message",
				"pmessage" : "hiiiiii"
			};
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function(){
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		}).then(function(){
			//check using see all msg
			this.waitForSelector('i#private_message_notification', function() {
				this.click('i#private_message_notification');
			}).waitForSelector('li.user-nav-list-all a', function(){
				this.click('li.user-nav-list-all a');
			}).waitForSelector('input#select_allbox', function(){
				this.test.assertTextExists('shipra', 'sangita', 'hani12', 'all users exists');
			}).then(function(){
				this.test.assertExists('span.badge.blue', 'unread messages found');
				this.click('span.badge.blue');
			}).waitUntilVisible('#messages-menu', function() {
				//read the messages
				this.test.assertExists('#messages-menu');
			});
		}).then(function(){
			forumLoginMethod.logoutFromApp();
		});
	});
};

//already covered in privateMessage
//Verify message preview for unread message
messagePreviewTests.unreadMessagePreview= function(){

	casper.thenOpen(config.url , function(){
		utils.info('case-11[Verify with the sequence on message pre view(send 4 messages to 4 different sender)]');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).waitForSelector('i#private_message_notification', function(){
		this.click('i#private_message_notification');
	}).waitForSelector('ul#private_message_dropdown a.pull-left', function(){
		this.click('ul#private_message_dropdown a.pull-left');
	}).waitForSelector('span.badge.blue', function(){
		this.test.assertExists('span.badge.blue', 'unread messages found');
		this.test.assertExists('i#private_message_notification');
		this.click('i#private_message_notification');
	//check using see all messages
	}).waitForSelector('li.user-nav-list-all a', function(){
		this.click('li.user-nav-list-all a');
	}).waitForSelector('input#select_allbox', function(){
		this.test.assertExists('span.badge.blue', 'unread messages found');
	}).then(function() {
		this.test.assertExists('form#pmsg_list', 'checkbox found on inbox page');
		privateMessageMethod.deleteAllPrivateMessage();
	});
};
