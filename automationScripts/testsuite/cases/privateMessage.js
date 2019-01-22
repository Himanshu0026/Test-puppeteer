/***These are the function which has been called in privateMessage.js and also will be used in other js file as per requirement**********/
'use strict.';
var config = require('../../../config/config.json');
var backEndregisterMethod = require('../methods/backEndRegistration.js');
var forumLoginMethod = require('../methods/login.js');
var privateMessageMethod = require('../methods/privateMessage.js');
var registerMethod = require('../methods/register.js');
var utils = require('../utils.js');
var loginJSON = require('../../testdata/loginData.json');
var pmJSON = require('../../testdata/privateMessage.json');
var privateMessageTestcases = module.exports = {};

privateMessageTestcases.disablePM = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 1[Private Message while disabled from forum backend]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableMessages(false);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		this.test.assertDoesntExist('i#private_message_notification');
		forumLoginMethod.logoutFromApp();
	});
};

privateMessageTestcases.enablePM = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 2[Private Message while enabled from forum backend]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableMessages(true);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		});
	}).then(function() {
		this.test.assertExists('i#private_message_notification');
		forumLoginMethod.logoutFromApp();
	});
};

// method to create a message
privateMessageTestcases.sendPMByMsgIcon = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 3[To compose a message by scenario 1]');
	}).then(function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function() {
		this.test.assertExists('i#private_message_notification');
		this.click('i#private_message_notification');
		this.waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(pmJSON.newMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		});
	}).then(function() {
		/*var content = this.fetchText(this.getPageContent());
		this.reload(function() {
			var contentAfterRefresh = this.fetchText(this.getPageContent());
			this.test.assert(contentAfterRefresh.indexOf(content) > -1);
		});*/
	}).then(function() {
		utils.info('Case 3[To compose a message by scenario 2]');
		this.test.assertExists('i#private_message_notification');
		this.click('i#private_message_notification');
		this.waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
			this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(pmJSON.newMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		});
	}).then(function() {
		/*var content = this.fetchText(this.getPageContent());
		this.reload(function() {
			var contentAfterRefresh = this.fetchText(this.getPageContent());
			this.test.assert(contentAfterRefresh.indexOf(content) > -1);
		});*/
	}).waitForSelector('ul.nav.pull-right span.caret', function() {
		utils.info('Case 3[To compose a message by scenario 3]');
		this.click('ul.nav.pull-right span.caret');
	}).waitForSelector('a#user-nav-panel-profile', function() {
    this.test.assertSelectorHasText('a#user-nav-panel-profile', 'Profile');
		this.click('a#user-nav-panel-profile');
  }).waitForSelector('div.pull-left.profile-menu a#send_message', function() {
    this.test.assertSelectorHasText('div.pull-left.profile-menu a#send_message', 'Message');
		this.click('div.pull-left.profile-menu a#send_message');
  }).waitUntilVisible('#pmsg_dialog_heading', function() {
		this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
		privateMessageMethod.newMessage(pmJSON.newMsgInfo);
	}).waitUntilVisible('div#ajax-msg-top', function() {
		this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
	}).then(function() {
		/*var content = this.fetchText(this.getPageContent());
		this.reload(function() {
			var contentAfterRefresh = this.fetchText(this.getPageContent());
			this.test.assert(contentAfterRefresh.indexOf(content) > -1);
		});*/
	});
};

// method to verify when we enter invalid recipients name
privateMessageTestcases.sendPMToInvalidRecipient = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 4[To verify when we enter invalid recipients name]');
		this.test.assertExists('i#private_message_notification');
		this.click('i#private_message_notification');
		this.waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(pmJSON.invalidRecipient);
		}).waitUntilVisible('div#pm_error_msg', function() {
			this.test.assertSelectorHasText('div#pm_error_msg', 'The member "gfgh" was not found');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
		});
	});
};

// method to verify when we leave blank reciepients name
privateMessageTestcases.sendPMToBlankRecipient = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 5[To verify when we leave blank reciepient name]');
		this.waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(pmJSON.blankRecipient);
		}).waitUntilVisible('div#pm_error_msg', function() {
			this.test.assertSelectorHasText('div#pm_error_msg', 'Please specify a recipient');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
		});
	});
};

// method to verify when leave blank subject
privateMessageTestcases.sendPMWithBlankSubject = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 6[To verify when leave blank subject]');
		this.waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(pmJSON.blankSubject);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
		});
	});
};

// method to verify when leave blank message body
privateMessageTestcases.sendPMWithBlankMessage = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 7[To verify when leave blank message body]');
		this.waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(pmJSON.blankMessage);
		}).waitUntilVisible('div#pm_error_msg', function() {
			this.test.assertSelectorHasText('div#pm_error_msg', 'Please enter your message');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
		});
	});
};

// method To verify auto drop down in reciver's field
privateMessageTestcases.sendPMByAutoDropdown = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 9[To verify auto drop down in reciver field]');
		this.waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			//casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', 'sangita');
			//casper.sendKeys('input[id="tokenfield_typeahead-tokenfield"]', casper.page.event.key.Enter );
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
			//forumLoginMethod.logoutFromApp();
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
		});
	});
};

// method To verify Attachement /Insert Photo link when disable/enable
privateMessageTestcases.enableDisableAttachementAndPhotoLink = function() {
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 11 a[To verify Attachement /Insert Photo link when disable]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableAttachments(false);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			this.test.assertDoesntExist('a#fancy_attach_pmsDialog i');
			this.test.assertDoesntExist('a#insert_image_dialog_pmsDialog');
		});
	}).thenOpen(config.backEndUrl , function() {
		utils.info('Case 11 b[To verify Attachement /Insert Photo link when enable]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'General');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=General"]');
		backEndregisterMethod.enableDisableAttachments(true);
	}).thenOpen(config.url ,function() {
		this.waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			this.test.assertExists('a#fancy_attach_pmsDialog i');
			this.test.assertExists('a#insert_image_dialog_pmsDialog');
		});
	});
};

// Test Cases to verify Reply
// method to verify with reply option
// method to Verify profile link on user name
privateMessageTestcases.verifyReplyOption = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 1[To verify with reply option]');
		this.waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.test.assertExists('textarea#pmessage_reply');
			this.click('textarea#pmessage_reply');
			this.waitForSelector('iframe#pmessage_reply_ifr', function() {
				this.wait('2000', function() {
					this.withFrame('pmessage_reply_ifr', function() {
						casper.sendKeys('#tinymce', casper.page.event.key.Ctrl, casper.page.event.key.A, {keepFocus: true});
						casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
						casper.sendKeys('#tinymce', 'MessageReplied');
					});
				});
			}).then(function() {
				this.evaluate(function() {
					$('div#message_options').show();
					document.querySelector('#reply_msg_button').click();
				});

				this.waitUntilVisible('div.message-entry.sent', function() {
					//this.test.assertSelectorHasText('div.message-entry.sent', 'Reply with message....!!!');
				});
			}).then(function() {
				this.click('div#current_msg_details a.username');
				this.waitForSelector('div#UserProfile', function() {
					utils.info('profile page found');
				});
			});
		});
	});
};

// method To verify one to one conversation between sender and and single recipient
// method To verify Avtar
privateMessageTestcases.verifyOneToOneConversation = function() {
	var pmessage = "";
	var senderImageUrlOnSenderEnd = "";
	casper.thenOpen(config.url, function() {
		utils.info('Case 2[To verify one to one conversation between sender and and single recipient]');
		this.test.assertExists('i#private_message_notification');
		this.click('i#private_message_notification');
		this.waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
			this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			pmessage = utils.randomString();
			var senderMsgInfo = {
				"to" : ["sangita"],
				"subject" : "One-to-one message",
				"pmessage" : pmessage
			};
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
		}).then(function() {
			this.click('div#current_msg_details a.username');
			this.waitForSelector('div#UserProfile', function() {
				utils.info('profile page found');
			});
			senderImageUrlOnSenderEnd = casper.evaluate(function() {
				var styleAttr = document.querySelector('div#feed-main span.image-wrapper.normal a').getAttribute('style');
				return styleAttr;
			});
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url ,function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.ValidCredential.username, loginJSON.ValidCredential.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.test.assertSelectorHasText('ul#pmsg_inbox_listing', pmessage);
			var senderImageUrlOnReceiverEnd = casper.evaluate(function() {
				var styleAttr = document.querySelector('div#feed-main span.image-wrapper.normal a').getAttribute('style');
				return styleAttr;
			});
			this.test.assertEquals(senderImageUrlOnSenderEnd, senderImageUrlOnReceiverEnd);
			forumLoginMethod.logoutFromApp();
		});
	});
};

// method To verify one to one conversation between sender and multiple recipient
// method verify when:If user S1 sent a message to R1, R2 but reply coming only from R2 only
// To verify participant name on conversation panel
privateMessageTestcases.verifyOneToManyConversation = function() {
	var pmessage = "";
	casper.thenOpen(config.url, function() {
		utils.info('Case 4[To verify one to one conversation between sender and multiple recipient]');
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
			this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			pmessage = utils.randomString();
			var senderMsgInfo = {
				"to" : ["sangita", "shipra"],
				"subject" : "One-to-many message",
				"pmessage" : pmessage
			};
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url ,function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.ValidCredential.username, loginJSON.ValidCredential.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.test.assertSelectorHasText('ul#pmsg_inbox_listing', pmessage);
			this.test.assertSelectorDoesntHaveText('div#current_msg_details', 'sangita');
			this.test.assertSelectorHasText('div#current_msg_details', 'shipra');
			this.test.assertSelectorHasText('div#current_msg_details', 'hani');
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url ,function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.test.assertSelectorHasText('ul#pmsg_inbox_listing', pmessage);
			this.test.assertSelectorDoesntHaveText('div#current_msg_details', 'shipra');
			this.test.assertSelectorHasText('div#current_msg_details', 'sangita');
			this.test.assertSelectorHasText('div#current_msg_details', 'hani');
			this.test.assertExists('textarea#pmessage_reply');
			this.click('textarea#pmessage_reply');
			this.waitForSelector('iframe#pmessage_reply_ifr', function() {
				this.wait('2000', function() {
					this.withFrame('pmessage_reply_ifr', function() {
						casper.sendKeys('#tinymce', casper.page.event.key.Ctrl, casper.page.event.key.A, {keepFocus: true});
						casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
						casper.sendKeys('#tinymce', 'MessageReplied');
					});
				});
			}).wait('2000', function() {
				this.evaluate(function() {
					$('div#message_options').show();
					document.querySelector('#reply_msg_button').click();
				});
				this.waitUntilVisible('div.message-entry.sent', function() {
					this.test.assertSelectorHasText('div.message-entry.sent', 'MessageReplied');
				}).then(function() {
					/*var content = this.fetchText(this.getPageContent());
					this.reload(function() {
						var contentAfterRefresh = this.fetchText(this.getPageContent());
						this.test.assert(contentAfterRefresh.indexOf(content) > -1);
					});*/
					forumLoginMethod.logoutFromApp();
				});
			});
		});
	}).thenOpen(config.url ,function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.test.assertSelectorHasText('ul#pmsg_inbox_listing', 'MessageReplied');
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url ,function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.ValidCredential.username, loginJSON.ValidCredential.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.test.assertSelectorHasText('ul#pmsg_inbox_listing', 'MessageReplied');
			forumLoginMethod.logoutFromApp();
		});
	});
};

// method To verify  send PM conversation to 26 recipient at the same time
// method To verify  send PM conversation to 25 recipient at the same time
privateMessageTestcases.sendPMToMaxAndMoreThanMaxRecipient = function() {
	var recipients = ['neha', 'hani12', 'haniuser', 'isneha', 'isneha12', 'sangita', 'sangita.digi', 'hsk', 'abc', 'abc1', 'abc2', 'abc3', 'abc4', 'abc5', 'abc6', 'abc7', 'abc8',	'abc9', 'abc10', 'abc11', 'abc12', 'abc13', 'abc14', 'abc15', 'shipra', 'emailUser'];
	/*var recipients = [];
	var pmessage = '';
	casper.thenOpen(config.backEndUrl , function() {
		utils.info('Case 7[To verify  send PM conversation to 25 recipient at the same time]');
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]', function() {
		this.click('div#my_account_forum_menu a[data-tooltip-elm="ddSettings"]');
	}).waitForSelector('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]', function() {
		this.test.assertSelectorHasText('#ddSettings', 'Security');
		this.click('div#ddSettings a[href="/tool/members/mb/settings?tab=Security"]');
		backEndregisterMethod.enableDisableEmailAddressVerification(false);
	}).then(function() {
		backEndregisterMethod.enableDisableApproveNewRegistrations(false);
	}).then(function() {
		backEndregisterMethod.enableDisableHumanVerification(false);
	}).waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function() {
		casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/fields"]', function() {
		this.test.assertSelectorHasText('#ddUsers', 'Profile Fields');
		this.click('div#ddUsers a[href="/tool/members/mb/fields"]');
	}).waitForText('Default Profile Fields',function() {
		var setOptions = {"fullName" : "", "instantMessaging" : "", "birthday" : "", "signature" : "", "avatar" : "",
		"visiblity_name_registration" : "Yes",
		"visiblity_imType_registration" : "Yes", "visiblity_dob_registration" : "Yes",
		"visiblity_signature_registration" : "Yes", "visiblity_avatar_registration" : "Yes"};
		backEndregisterMethod.changeDefaultRegistrationOptions(setOptions);
	}).thenOpen(config.url, function() {
		registerMethod.registerMultipleUsers(26, function(users) {
			recipients = users;
		});
	}).thenOpen(config.url, function() {*/
	casper.thenOpen(config.url, function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
			this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			pmessage = utils.randomString();
			var senderMsgInfo = {
				"to" : recipients,
				"subject" : "Send message to " +recipients.length+ " recipients",
				"pmessage" : pmessage
			};
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitForSelector('div#current_msg_details', function() {
			this.test.assertSelectorDoesntHaveText('div#current_msg_details', recipients[25]);
		}).reload(function() {
			this.waitForSelector('#inline_search_box', function() {
				this.test.assertExists('#inline_search_box', 'Search bar present');
				this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
				this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
			}).waitUntilVisible('#pmsg_dialog_heading', function() {
				this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
				recipients.pop(recipients[25]);
				pmessage = utils.randomString();
				var senderMsgInfo = {
					"to" : recipients,
					"subject" : "Send message to " +recipients.length+ " recipients",
					"pmessage" : pmessage
				};
				privateMessageMethod.newMessage(senderMsgInfo);
			}).waitUntilVisible('div#ajax-msg-top', function() {
				this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
				forumLoginMethod.logoutFromApp();
			});
		});
	});
	/*}).thenOpen(config.backEndUrl , function() {
		this.waitForSelector('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]', function() {
			casper.click('div#my_account_forum_menu a[data-tooltip-elm="ddUsers"]');
  	}).waitForSelector('div#ddUsers a[href="/tool/members/mb/usergroup"]', function() {
			this.test.assertSelectorHasText('#ddUsers', 'Group Permissions');
			this.click('div#ddUsers a[href="/tool/members/mb/usergroup"]');
			backEndregisterMethod.viewUsers('General');
		}).then(function() {
			backEndregisterMethod.editUserActions('General', 'Delete', recipients.length);
		});
	});*/
};

// method To verify mark as read-unread(check box)(single)
// method To verify mark as read-unread(check box)(multiple)
// method To verify mark as read-unread(check box)(all)
// method to verify mark as read(coversation page)
privateMessageTestcases.read_unreadCheckbox = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 1[To verify mark as unread(check box)(single)]');
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('div#messages-menu a.dropdown-toggle');
			this.click('div#messages-menu a.dropdown-toggle');
			this.test.assertExists('li#markunread_msg_btn a');
			this.test.assertSelectorHasText('li#markunread_msg_btn a', 'Mark as Unread');
			this.click('li#markunread_msg_btn a');
		}).waitForText('The conversation has been marked as unread', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'The conversation has been marked as unread');
			this.test.assertExists('span.badge.blue');
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('div#messages-menu a.dropdown-toggle');
			this.click('div#messages-menu a.dropdown-toggle');
			this.test.assertExists('li#markread_msg_btn a');
			this.test.assertSelectorHasText('li#markread_msg_btn a', 'Mark as Read');
			this.click('li#markread_msg_btn a');
		}).waitForText('The conversation has been marked as read', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'The conversation has been marked as read.');
			this.test.assertDoesntExist('span.badge.blue');
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(3) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('div#messages-menu a.dropdown-toggle');
			this.click('div#messages-menu a.dropdown-toggle');
			this.test.assertExists('li#markunread_msg_btn a');
			this.test.assertSelectorHasText('li#markunread_msg_btn a', 'Mark as Unread');
			this.click('li#markunread_msg_btn a');
		}).waitForText('2 conversations have been marked as unread.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', '2 conversations have been marked as unread.');
			this.test.assertExists('span.badge.blue');
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(3) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('div#messages-menu a.dropdown-toggle');
			this.click('div#messages-menu a.dropdown-toggle');
			this.test.assertExists('li#markread_msg_btn a');
			this.test.assertSelectorHasText('li#markread_msg_btn a', 'Mark as Read');
			this.click('li#markread_msg_btn a');
		}).waitForText('2 conversations have been marked as read.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', '2 conversations have been marked as read.');
			this.test.assertDoesntExist('span.badge.blue');
			this.evaluate(function() {
				document.querySelector('input#select_allbox').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('div#messages-menu a.dropdown-toggle');
			this.click('div#messages-menu a.dropdown-toggle');
			this.test.assertExists('li#markunread_msg_btn a');
			this.test.assertSelectorHasText('li#markunread_msg_btn a', 'Mark as Unread');
			this.click('li#markunread_msg_btn a');
		}).waitForText('conversations have been marked as unread.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'conversations have been marked as unread.');
			this.test.assertExists('span.badge.blue');
			this.evaluate(function() {
				document.querySelector('input#select_allbox').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('div#messages-menu a.dropdown-toggle');
			this.click('div#messages-menu a.dropdown-toggle');
			this.test.assertExists('li#markread_msg_btn a');
			this.test.assertSelectorHasText('li#markread_msg_btn a', 'Mark as Read');
			this.click('li#markread_msg_btn a');
		}).waitForText('conversations have been marked as read.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'conversations have been marked as read.');
			this.test.assertDoesntExist('span.badge.blue');
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('div#messages-menu a.dropdown-toggle');
			this.click('div#messages-menu a.dropdown-toggle');
			this.test.assertExists('li#markunread_msg_btn a');
			this.test.assertSelectorHasText('li#markunread_msg_btn a', 'Mark as Unread');
			this.click('li#markunread_msg_btn a');
		}).waitForText('The conversation has been marked as unread', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'The conversation has been marked as unread');
			this.test.assertExists('span.badge.blue');
			this.evaluate(function() {
				document.querySelector('a#mark_all_pmread').click();
			});
		}).waitUntilVisible('div#ajax-msg-top', function success() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'All private messages have been marked as read.');
			forumLoginMethod.logoutFromApp();
		});
	});
};

// Test cases to verify with move conversation, archeive message/move or inbox message/move
// method to Move single conversation(inbox to archieve)
// method to move multiple conversation(inbox to archieve)
// method to move multiple conversation(archieve to inbox)
// method to move all coversation(inbox to archieve)
// method to move all coversation(archieve to inbox)
privateMessageTestcases.moveSingleToArchieve = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 1[To Move single conversation(inbox to archieve)]');
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.test.assertExists('li#move_to_saved_btn a');
			this.click('li#move_to_saved_btn a');
		}).waitForText('The conversation has been archived.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'The conversation has been archived.');
			this.click('form#pmsg_list a.profile-active.dropdown-toggle span');
			this.click('div.dropdown.open ul.dropdown-menu.left.check-select li:nth-child(2) a');
		}).then(function() {
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.test.assertExists('li#move_to_inbox_btn a');
			this.click('li#move_to_inbox_btn a');
		}).waitForText('The conversation has been moved to Inbox.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'The conversation has been moved to Inbox.');
			this.click('form#pmsg_list a.profile-active.dropdown-toggle span');
			this.click('div.dropdown.open ul.dropdown-menu.left.check-select li:nth-child(1) a');
		}).then(function() {
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.test.assertExists('li#move_to_saved_btn a');
			this.click('li#move_to_saved_btn a');
		}).waitForText('2 conversations have been archived.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', '2 conversations have been archived.');
			this.click('form#pmsg_list a.profile-active.dropdown-toggle span');
			this.click('div.dropdown.open ul.dropdown-menu.left.check-select li:nth-child(2) a');
		}).then(function() {
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.test.assertExists('li#move_to_inbox_btn a');
			this.click('li#move_to_inbox_btn a');
		}).waitForText('2 conversations have been moved to Inbox.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', '2 conversations have been moved to Inbox.');
			this.click('form#pmsg_list a.profile-active.dropdown-toggle span');
			this.click('div.dropdown.open ul.dropdown-menu.left.check-select li:nth-child(1) a');
		}).then(function() {
			this.evaluate(function() {
				document.querySelector('input#select_allbox').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.test.assertExists('li#move_to_saved_btn a');
			this.click('li#move_to_saved_btn a');
		}).waitForText('conversations have been archived.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'conversations have been archived.');
			this.click('form#pmsg_list a.profile-active.dropdown-toggle span');
			this.click('div.dropdown.open ul.dropdown-menu.left.check-select li:nth-child(2) a');
		}).then(function() {
			this.evaluate(function() {
				document.querySelector('input#select_allbox').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.click('span#move_conversation_dropdown a i.glyphicon.glyphicon-right-arrow');
			this.test.assertExists('li#move_to_inbox_btn a');
			this.click('li#move_to_inbox_btn a');
		}).waitForText('conversations have been moved to Inbox.', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'conversations have been moved to Inbox.');
			this.click('form#pmsg_list a.profile-active.dropdown-toggle span');
			this.click('div.dropdown.open ul.dropdown-menu.left.check-select li:nth-child(1) a');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
			forumLoginMethod.logoutFromApp();
		});
	});
};

// Test cases to Ignored user
// method To verify ignored member (check box)
// method to verify with unignore user
privateMessageTestcases.ignore_unIgnoreUser = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 1[To verify ignored member (check box)]');
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.test.assertExists('a[href="/pm/ignoreuser"]');
			this.click('a[href="/pm/ignoreuser"]');
			this.waitForSelector('div#ignore-box', function() {
				this.sendKeys('input[id="ignore_user_field-tokenfield"]', loginJSON.pmMsgUser.username, {keepFocus:true});
				this.sendKeys('input[id="ignore_user_field-tokenfield"]', casper.page.event.key.Enter , {keepFocus: true});
				this.test.assertSelectorHasText('div#ignore-box input[name="save"]', 'Ignore Users');
				this.click('div#ignore-box input[name="save"]');
			});
		}).waitForSelector('div.ignore-list', function() {
			this.test.assertSelectorHasText('div.ignore-list', loginJSON.pmMsgUser.username);
			this.click('input[value="shipra"]');
			this.waitUntilVisible('div#ignore-menu', function() {
				this.click('a#unignoreUser');
			});
		}).waitForSelector('div.ignore-list', function() {
			this.test.assertSelectorDoesntHaveText('div.ignore-list', loginJSON.pmMsgUser.username);
			this.sendKeys('input[id="ignore_user_field-tokenfield"]', loginJSON.pmMsgUser.username, {keepFocus:true});
			this.sendKeys('input[id="ignore_user_field-tokenfield"]', casper.page.event.key.Enter , {keepFocus: true});
			this.test.assertSelectorHasText('div#ignore-box input[name="save"]', 'Ignore Users');
			this.click('div#ignore-box input[name="save"]');
		}).waitForSelector('div.ignore-list', function() {
			this.test.assertSelectorHasText('div.ignore-list', loginJSON.pmMsgUser.username);
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
			this.waitForSelector('ul#private_message_dropdown span.pull-right', function() {
				this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
				this.click('a.send_new_pmsg');
			}).waitUntilVisible('#pmsg_dialog_heading', function() {
				this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
				privateMessageMethod.newMessage(pmJSON.ignoredUser);
			}).waitUntilVisible('div#ajax-msg-top', function() {
				this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
			}).then(function() {
				/*var content = this.fetchText(this.getPageContent());
				this.reload(function() {
					var contentAfterRefresh = this.fetchText(this.getPageContent());
					this.test.assert(contentAfterRefresh.indexOf(content) > -1);
				});*/
				forumLoginMethod.logoutFromApp();
			});
		});
	});
};

// method To verify with send message whos ignored you
// method to verify with send reply on previous message after ignoring
privateMessageTestcases.sendMessageWhoIgnoredYou = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 2[To verify with send message whos ignored you]');
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
			this.waitForSelector('ul#private_message_dropdown a.pull-left', function() {
				this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
				this.click('ul#private_message_dropdown a.pull-left');
			}).waitForSelector('form#pmsg_list', function() {
				this.test.assertSelectorDoesntHaveText('div#current_msg_details', 'shipra');
				this.test.assertSelectorHasText('div#current_msg_details', 'hani');
				this.test.assertExists('textarea#pmessage_reply');
				this.click('textarea#pmessage_reply');
				this.waitForSelector('iframe#pmessage_reply_ifr', function() {
					this.wait('2000', function() {
						this.withFrame('pmessage_reply_ifr', function() {
							casper.sendKeys('#tinymce', casper.page.event.key.Ctrl, casper.page.event.key.A, {keepFocus: true});
							casper.sendKeys('#tinymce', casper.page.event.key.Backspace, {keepFocus: true});
							casper.sendKeys('#tinymce', 'MessageReplied');
						});
					});
				}).then(function() {
					this.evaluate(function() {
						$('div#message_options').show();
						document.querySelector('#reply_msg_button').click();
					});
					this.waitUntilVisible('div.message-entry.sent', function() {
						this.test.assertSelectorHasText('div.message-entry.sent', 'MessageReplied');
					});
				});
				this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
				this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
			}).waitUntilVisible('#pmsg_dialog_heading', function() {
				this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
				privateMessageMethod.newMessage(pmJSON.ignoredByUser);
			}).waitUntilVisible('div#pm_error_msg', function() {
				this.test.assertSelectorHasText('div#pm_error_msg', 'The recipient "' +pmJSON.ignoredByUser.to+ '" cannot receive the message');
				forumLoginMethod.logoutFromApp();
			});
		}).waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.test.assertExists('a[href="/pm/ignoreuser"]');
			this.click('a[href="/pm/ignoreuser"]');
		}).waitForSelector('div.ignore-list', function() {
			this.test.assertSelectorHasText('div.ignore-list', loginJSON.pmMsgUser.username);
			this.click('input[value="shipra"]');
			this.waitUntilVisible('div#ignore-menu', function() {
				this.click('a#unignoreUser');
			});
		}).waitForSelector('div.ignore-list', function() {
			this.test.assertSelectorDoesntHaveText('div.ignore-list', loginJSON.pmMsgUser.username);
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
			forumLoginMethod.logoutFromApp();
		});
	});
};

// method to verify count of message icon -> send 3 messages from  s1 >log in with r1 and verify the message icon count.
privateMessageTestcases.verifyMessageIconCountCaseOne = function() {
	var recipients = [];
	var pmessage = '';
	casper.thenOpen(config.url, function() {
		utils.info('Case 5a[To verify count of message icon -> send 3 messages from  s1 >log in with r1 and verify the message icon count.]');
		registerMethod.registerMultipleUsers(1, function(users) {
			recipients = users;
		});
	}).thenOpen(config.url, function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.repeat(3, function() {
				pmessage = utils.randomString();
				var senderMsgInfo = {
					"to" : recipients,
					"subject" : "Send message to " +recipients.length+ " recipients",
					"pmessage" : pmessage
				};
				this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
				this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
				this.waitUntilVisible('#pmsg_dialog_heading', function() {
					this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
					this.then(function() {
						privateMessageMethod.newMessage(senderMsgInfo);
					});
				}).waitUntilVisible('div#ajax-msg-top', function() {
					this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
				}).then(function() {
					/*var content = this.fetchText(this.getPageContent());
					this.reload(function() {
						var contentAfterRefresh = this.fetchText(this.getPageContent());
						this.test.assert(contentAfterRefresh.indexOf(content) > -1);
					});*/
				});
			});
		}).reload(function() {
			forumLoginMethod.logoutFromApp();
		}).thenOpen(config.url , function() {
			this.waitForSelector('#inline_search_box', function() {
				this.test.assertExists('#inline_search_box', 'Search bar present');
				forumLoginMethod.loginToApp(recipients, recipients);
			}).waitForSelector('span.badge.notif', function() {
				this.test.assertExists('span.badge.notif');
				this.test.assertSelectorHasText('span.badge.notif', '3');
				this.click('i#private_message_notification');
			}).waitForText('See all', function() {
				this.click('a[href="/pm/inbox"]');
			}).waitForSelector('form#pmsg_list', function() {
				this.evaluate(function() {
					document.querySelector('input#select_allbox').click();
				});
			}).waitUntilVisible('#messages-menu', function() {
				this.test.assertExists('#messages-menu');
				this.test.assertExists('div#messages-menu a.dropdown-toggle');
				this.click('div#messages-menu a.dropdown-toggle');
				this.test.assertExists('li#markread_msg_btn a');
				this.test.assertSelectorHasText('li#markread_msg_btn a', 'Mark as Read');
				this.click('li#markread_msg_btn a');
			}).waitForText('conversations have been marked as read.', function() {
				this.test.assertDoesntExist('span.badge.notif');
				forumLoginMethod.logoutFromApp();
			});
		});
	});
};

// method to verify count of message icon -> verify when 4 user send 1 message to r1>log in with r1 and verify the message icon count.
privateMessageTestcases.verifyMessageIconCountCaseTwo = function() {
	var recipients = [];
	var pmessage = '';
	var senderMsgInfo;
	casper.thenOpen(config.url, function() {
		utils.info('Case 5b[To verify count of message icon -> verify when 4 user send 1 message to r1>log in with r1 and verify the message icon count.]');
		registerMethod.registerMultipleUsers(1, function(users) {
			recipients = users;
			pmessage = utils.randomString();
			senderMsgInfo = {
				"to" : recipients,
				"subject" : "Send message to " +recipients.length+ " recipients",
				"pmessage" : pmessage
			};
		});

	}).thenOpen(config.url, function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url, function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.pmMsgUser.username, loginJSON.pmMsgUser.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url, function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.ValidCredential.username, loginJSON.ValidCredential.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown span.pull-right', function() {
			this.test.assertSelectorHasText('a.send_new_pmsg', 'Send a New Message');
			this.click('a.send_new_pmsg');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(senderMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
			forumLoginMethod.logoutFromApp();
		});
	}).thenOpen(config.url , function() {
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(recipients, recipients);
		}).waitForSelector('span.badge.notif', function() {
			this.test.assertExists('span.badge.notif');
			this.test.assertSelectorHasText('span.badge.notif', '3');
			this.click('i#private_message_notification');
		}).waitForText('See all', function() {
			this.click('a[href="/pm/inbox"]');
		}).waitForSelector('form#pmsg_list', function() {
			this.evaluate(function() {
				document.querySelector('input#select_allbox').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('div#messages-menu a.dropdown-toggle');
			this.click('div#messages-menu a.dropdown-toggle');
			this.test.assertExists('li#markread_msg_btn a');
			this.test.assertSelectorHasText('li#markread_msg_btn a', 'Mark as Read');
			this.click('li#markread_msg_btn a');
		}).waitForText('conversations have been marked as read.', function() {
			this.reload(function() {//It should be removed
				this.test.assertDoesntExist('span.badge.notif');
			});//It should be removed
		}).then(function() {
			forumLoginMethod.logoutFromApp();
		});
	});
};

// Test cases to verify leave conversation
// method To verify leave conversation( single)
// method To verify leave conversation (Multiple)
// method To verify leave conversation (all)
privateMessageTestcases.leaveConversation = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 1[To verify leave conversation]');
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('a#leave_conversation i');
			this.click('a#leave_conversation i');
		}).waitForText('You have left the conversation.', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top', 'You have left the conversation.');
			var date = this.evaluate(function() {
				return document.querySelector('time').getAttribute('title');
			});
			this.test.assertSelectorHasText('div.alert.alert-info.cleared', 'You left the conversation ');
   		//this.test.assertSelectorHasText('div.alert.alert-info.cleared', date.substr(0, date.indexOf(',')));
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('a#leave_conversation i');
			this.click('a#leave_conversation i');
		}).waitForText('You have left the 2 selected conversations.', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top', 'You have left the 2 selected conversations.');
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.evaluate(function() {
				document.querySelector('input#select_allbox').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('a#leave_conversation i');
			this.click('a#leave_conversation i');
		}).waitForText('You have left', function() {
			this.test.assertSelectorHasText('#ajax-msg-top', 'You have left the ');
			this.test.assertSelectorHasText('#ajax-msg-top', ' selected conversations.');
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			});*/
			forumLoginMethod.logoutFromApp();
		});
	});
};

// Test cases to verify Delete conversation
// method To verify delete Conversation
// method To verify delete multiple Conversation
// method Delete coversation from conversation page
// method To verify delete all Conversation
// method To verify "Go to inbox" link when there are no conversation.
privateMessageTestcases.deleteConversation = function() {
	var msgBeforeDelete = '';
	var msgAfterDelete = '';
	casper.thenOpen(config.url, function() {
		utils.info('Case 1[To verify delete Conversation]');
		this.waitForSelector('#inline_search_box', function() {
			this.test.assertExists('#inline_search_box', 'Search bar present');
			forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('a#delete_conversation i');
			this.click('a#delete_conversation i');
		}).waitForText('The conversation has been deleted', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', 'The conversation has been deleted');
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.evaluate(function() {
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(1) input').click();
				document.querySelector('ul#pmsg_inbox_listing li:nth-child(2) input').click();
			});
		}).waitUntilVisible('#messages-menu', function() {
			this.test.assertExists('#messages-menu');
			this.test.assertExists('a#delete_conversation i');
			this.click('a#delete_conversation i');
		}).waitForText('2 conversations have been deleted', function() {
			this.test.assertSelectorHasText('div.alert.alert-success.text-center', '2 conversations have been deleted');
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			msgBeforeDelete = this.fetchText('span.text-block');
			this.test.assertExists('a#delete_curr_conversation i');
			this.click('a#delete_curr_conversation i');
		}).waitUntilVisible('div#ajax-msg-top', function() {
			if (this.visible('div#ajax-msg-top')) {
	      utils.info(' Deleted....');
				msgAfterDelete = this.fetchText('span.text-block');
				this.test.assertNotEquals(msgBeforeDelete, msgAfterDelete);
	    } else {
				utils.info(' Deleted is not displayed.');
			}
		}).waitForSelector('i#private_message_notification', function() {
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			privateMessageMethod.deleteAllPrivateMessage();
		}).then(function() {
			this.test.assertDoesntExist('input#select_allbox');
			this.test.assertSelectorHasText('ul#pmsg_inbox_listing span', 'Your inbox is empty');
			this.test.assertExists('i#private_message_notification');
			this.click('i#private_message_notification');
		}).waitForText('Go to inbox', function() {
		}).then(function() {
			/*var content = this.fetchText(this.getPageContent());
			this.reload(function() {
				var contentAfterRefresh = this.fetchText(this.getPageContent());
				this.test.assert(contentAfterRefresh.indexOf(content) > -1);
				forumLoginMethod.logoutFromApp();
			});*/
		});
	});
};

// method to verify Refresh pm page after sending message
privateMessageTestcases.refreshPmPageAfterSendingMessage = function() {
	casper.thenOpen(config.url, function() {
		utils.info('Case 15[Refresh pm page after sending message]');
	}).then(function() {
		this.test.assertExists('#inline_search_box', 'Search bar present');
		forumLoginMethod.loginToApp(loginJSON.validInfo.username, loginJSON.validInfo.password);
	}).then(function() {
		this.test.assertExists('i#private_message_notification');
		this.click('i#private_message_notification');
		this.waitForSelector('ul#private_message_dropdown a.pull-left', function() {
			this.test.assertSelectorHasText('ul#private_message_dropdown a.pull-left', 'Inbox');
			this.click('ul#private_message_dropdown a.pull-left');
		}).waitForSelector('form#pmsg_list', function() {
			this.mouse.move('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
			this.click('form#pmsg_list a.pull-right.btn-primary.send_new_pmsg small');
		}).waitUntilVisible('#pmsg_dialog_heading', function() {
			this.test.assertSelectorHasText('#pmsg_dialog_heading', 'New Message');
			privateMessageMethod.newMessage(pmJSON.newMsgInfo);
		}).waitUntilVisible('div#ajax-msg-top', function() {
			this.test.assertSelectorHasText('div#ajax-msg-top p', 'Sent');
		});
	}).then(function() {
	}).reload(function() {
		this.click('li[id^="pmsg_list_"]:nth-child(3)');
	}).then(function() {
		/*var content = this.fetchText(this.getPageContent());
		this.reload(function() {
			var contentAfterRefresh = this.fetchText(this.getPageContent());
			this.test.assert(contentAfterRefresh.indexOf(content) > -1);
			//forumLoginMethod.logoutFromApp();
		});*/
		forumLoginMethod.logoutFromApp();
	});
};
